"use server";

import { requireAppUserIdAction } from "@/lib/clerk-auth-helpers";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// === READ ACTIONS ===

export async function getUserLists() {
    const authResult = await requireAppUserIdAction();
    if (!authResult.ok) return [];

    return prisma.movieList.findMany({
        where: { userId: authResult.userId, isSystem: false }, // Only user lists
        include: {
            _count: { select: { items: true } },
            items: {
                take: 5,
                orderBy: [
                    { position: 'asc' },
                    { addedAt: 'desc' }
                ],
                select: {
                    movie: {
                        select: {
                            posterPath: true
                        }
                    }
                }
            }
        },
        orderBy: { updatedAt: 'desc' }
    });
}

export async function getCollectionLists() {
    // Publicly accessible system lists
    return prisma.movieList.findMany({
        where: { isSystem: true, isPublic: true },
        include: {
            _count: { select: { items: true } },
            items: {
                take: 5,
                orderBy: [
                    { position: 'asc' }, // System lists usually ranked/ordered
                    { addedAt: 'asc' }
                ],
                select: {
                    movie: {
                        select: {
                            posterPath: true
                        }
                    }
                }
            }
        },
        orderBy: { title: 'asc' } // Or by a specific order field if added
    });
}

export async function getMovieListsStatus(movieId: number) {
    const authResult = await requireAppUserIdAction();
    if (!authResult.ok) return [];

    const lists = await prisma.movieList.findMany({
        where: { userId: authResult.userId, isSystem: false },
        include: {
            items: {
                where: { movieId },
                select: { movieId: true }
            }
        }
    });

    return lists.map(list => ({
        id: list.id,
        title: list.title,
        isInList: list.items.length > 0
    }));
}

export async function getListDetails(listId: string) {
    // Allow reading if public system list OR user owns it
    const authResult = await requireAppUserIdAction();
    // Note: We might want allow public read without auth for system lists later, 
    // but for now let's assume authenticated app.

    const list = await prisma.movieList.findUnique({
        where: { id: listId },
        include: {
            items: {
                orderBy: [
                    { position: 'asc' },
                    { addedAt: 'desc' }
                ],
                include: {
                    movie: {
                        select: {
                            title: true,
                            posterPath: true,
                            tmdbId: true
                        }
                    }
                }
            }
        }
    });

    if (!list) return null;

    if (list.isSystem) {
        if (!list.isPublic) return null; // Hidden system list
        return list;
    }

    // User list: ownership check
    if (authResult.ok && list.userId === authResult.userId) {
        return list;
    }

    return null;
}

// === WRITE ACTIONS (MUTATIONS) ===

export async function createList(title: string, description?: string, tags?: string, isRanked: boolean = false) {
    const authResult = await requireAppUserIdAction();
    if (!authResult.ok) return { error: "Unauthorized" };

    try {
        const list = await prisma.movieList.create({
            data: {
                userId: authResult.userId,
                title,
                description,
                tags,
                isRanked
            }
        });
        revalidatePath("/lists");
        revalidatePath("/profile");
        return { success: true, list };
    } catch (e) {
        return { error: "List already exists or title is invalid" };
    }
}

export async function copyListToUser(sourceListId: string) {
    const authResult = await requireAppUserIdAction();
    if (!authResult.ok) return { error: "Unauthorized" };

    // 1. Validate Source
    const sourceList = await prisma.movieList.findUnique({
        where: { id: sourceListId },
        include: { items: true } // Need items to copy
    });

    if (!sourceList || !sourceList.isSystem || !sourceList.isPublic) {
        return { error: "Invalid source list" };
    }

    // 2. Generate Title (Handle Duplicates)
    let baseTitle = `${sourceList.title} (Copy)`;
    let targetTitle = baseTitle;
    let counter = 2;

    while (true) {
        const existing = await prisma.movieList.count({
            where: { userId: authResult.userId, title: targetTitle }
        });
        if (existing === 0) break;
        targetTitle = `${baseTitle.replace(" (Copy)", "")} (Copy ${counter})`;
        counter++;
    }

    // 3. Transactional Copy
    const newList = await prisma.$transaction(async (tx) => {
        // Create List
        const created = await tx.movieList.create({
            data: {
                userId: authResult.userId,
                title: targetTitle,
                description: sourceList.description,
                isRanked: sourceList.isRanked, // Match source ranking
                sourceListId: sourceList.id,
                sourceType: "SYSTEM"
            }
        });

        // Create Items
        if (sourceList.items.length > 0) {
            // Sort to ensure stable insertion order if unranked
            const sortedItems = [...sourceList.items].sort((a, b) => {
                if (sourceList.isRanked && a.position !== null && b.position !== null) {
                    return a.position - b.position;
                }
                // Fallback to insertion order
                return a.addedAt.getTime() - b.addedAt.getTime();
            });

            await tx.movieListItem.createMany({
                data: sortedItems.map((item, index) => ({
                    listId: created.id,
                    movieId: item.movieId,
                    position: sourceList.isRanked ? item.position : null, // Preserve position if ranked
                    // Note: We strip 'note' and 'addedAt' to start fresh? 
                    // Or keep 'note'? Let's start fresh for now as notes might be system specific.
                }))
            });
        }

        return created;
    });

    revalidatePath("/lists");
    return { success: true, listId: newList.id };
}

export async function toggleMovieInList(listId: string, movieId: number) {
    const authResult = await requireAppUserIdAction();
    if (!authResult.ok) return { error: "Unauthorized" };

    const list = await prisma.movieList.findUnique({ where: { id: listId }, select: { isSystem: true, userId: true } });
    if (!list) return { error: "List not found" };
    if (list.isSystem) return { error: "Cannot modify system lists" };
    if (list.userId !== authResult.userId) return { error: "Forbidden" };

    const existing = await prisma.movieListItem.findUnique({
        where: { listId_movieId: { listId, movieId } }
    });

    if (existing) {
        await prisma.movieListItem.delete({
            where: { listId_movieId: { listId, movieId } }
        });
        revalidatePath(`/movie/${movieId}`);
        revalidatePath(`/profile`);
        return { inList: false };
    } else {
        const { syncMovie } = await import("./movies");
        await syncMovie(movieId);

        await prisma.movieListItem.create({
            data: { listId, movieId }
        });
        revalidatePath(`/movie/${movieId}`);
        revalidatePath(`/lists/${listId}`);
        revalidatePath(`/profile`);
        return { inList: true };
    }
}

export async function removeMovieFromList(listId: string, movieId: number) {
    const authResult = await requireAppUserIdAction();
    if (!authResult.ok) throw new Error("Unauthorized");

    const list = await prisma.movieList.findUnique({ where: { id: listId }, select: { isSystem: true, userId: true } });
    if (!list) throw new Error("List not found");
    if (list.isSystem) throw new Error("Cannot modify system lists");
    if (list.userId !== authResult.userId) throw new Error("Forbidden");

    await prisma.movieListItem.delete({
        where: { listId_movieId: { listId, movieId } }
    });

    revalidatePath(`/lists/${listId}`);
    revalidatePath(`/profile`);
}

export async function updateListMetadata(listId: string, data: { title?: string, description?: string, tags?: string }) {
    const authResult = await requireAppUserIdAction();
    if (!authResult.ok) throw new Error("Unauthorized");

    const list = await prisma.movieList.findUnique({ where: { id: listId } });
    if (!list || list.userId !== authResult.userId) throw new Error("Forbidden");
    if (list.isSystem) throw new Error("Cannot modify system lists");

    await prisma.movieList.update({
        where: { id: listId },
        data
    });

    revalidatePath(`/lists/${listId}`);
    revalidatePath("/lists");
}

export async function toggleRanked(listId: string) {
    const authResult = await requireAppUserIdAction();
    if (!authResult.ok) throw new Error("Unauthorized");

    const list = await prisma.movieList.findUnique({
        where: { id: listId },
        include: { items: { orderBy: { addedAt: 'asc' } } }
    });

    if (!list || list.userId !== authResult.userId) throw new Error("Forbidden");
    if (list.isSystem) throw new Error("Cannot modify system lists");

    const newRanked = !list.isRanked;

    await prisma.$transaction(async (tx) => {
        await tx.movieList.update({
            where: { id: listId },
            data: { isRanked: newRanked }
        });

        if (newRanked) {
            // Assign sequential positions 1..N
            for (let i = 0; i < list.items.length; i++) {
                await tx.movieListItem.update({
                    where: { listId_movieId: { listId, movieId: list.items[i].movieId } },
                    data: { position: i + 1 }
                });
            }
        } else {
            // Set all positions to NULL
            await tx.movieListItem.updateMany({
                where: { listId },
                data: { position: null }
            });
        }
    });

    revalidatePath(`/lists/${listId}`);
    return { isRanked: newRanked };
}

export async function updateListPositions(listId: string, movieIds: number[]) {
    const authResult = await requireAppUserIdAction();
    if (!authResult.ok) throw new Error("Unauthorized");

    const list = await prisma.movieList.findUnique({
        where: { id: listId }
    });

    if (!list || list.userId !== authResult.userId) throw new Error("Forbidden");
    if (list.isSystem) throw new Error("Cannot modify system lists");

    await prisma.$transaction(async (tx) => {
        // Step 1: Set all to NULL to avoid unique collision during reassignment
        await tx.movieListItem.updateMany({
            where: { listId },
            data: { position: null }
        });

        // Step 2: Assign new sequential positions
        for (let i = 0; i < movieIds.length; i++) {
            await tx.movieListItem.update({
                where: { listId_movieId: { listId, movieId: movieIds[i] } },
                data: { position: i + 1 }
            });
        }
    });

    revalidatePath(`/lists/${listId}`);
}
