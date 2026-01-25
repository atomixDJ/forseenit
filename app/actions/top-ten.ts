"use server";

import { prisma } from "@/lib/prisma";
import { requireAppUserIdAction } from "@/lib/clerk-auth-helpers";
import { revalidatePath } from "next/cache";
import { getMovieDetails } from "@/lib/tmdb";

/**
 * Publicly get a user's Top Ten movies, ordered by position.
 */
export async function getTopTen(targetUserId: string) {
    const topTen = await prisma.userTopTen.findMany({
        where: { userId: targetUserId },
        orderBy: { position: 'asc' },
        select: {
            id: true,
            tmdbId: true,
            position: true,
            createdAt: true
        }
    });

    // Hydrate with Movie metadata
    const tmdbIds = topTen.map(t => t.tmdbId);
    const movies = await prisma.movie.findMany({
        where: { tmdbId: { in: tmdbIds } },
        select: { tmdbId: true, title: true, posterPath: true }
    });

    const movieMap = new Map(movies.map(m => [m.tmdbId, m]));

    return topTen.map(item => ({
        ...item,
        movie: movieMap.get(item.tmdbId) || null
    }));
}

/**
 * Add a movie to the user's Top Ten (Max 10).
 * Appends to the end of the list.
 */
export async function addToTopTen(tmdbId: number) {
    const authResult = await requireAppUserIdAction();
    if (!authResult.ok) return { error: "Unauthorized" };
    const userId = authResult.userId;

    // Check count
    const count = await prisma.userTopTen.count({
        where: { userId }
    });

    if (count >= 10) {
        return { error: "Limit reached: You can only have 10 movies in your Top Ten." };
    }

    // Check if already exists
    const existing = await prisma.userTopTen.findUnique({
        where: { userId_tmdbId: { userId, tmdbId } }
    });

    if (existing) {
        return { error: "Movie is already in your Top Ten." };
    }

    // Add at position = count (0-indexed append)
    // Note: Concurrency might cause race condition but unique constraint on [userId, position] will prevent corruption (fail fast).
    try {
        // Ensure Movie metadata exists locally to prevent "ghost items"
        try {
            const movieDetails = await getMovieDetails(tmdbId);
            if (movieDetails) {
                await prisma.movie.upsert({
                    where: { tmdbId },
                    update: {
                        title: movieDetails.title,
                        posterPath: movieDetails.poster_path,
                        backdropPath: movieDetails.backdrop_path,
                    },
                    create: {
                        tmdbId: movieDetails.id,
                        title: movieDetails.title,
                        posterPath: movieDetails.poster_path,
                        backdropPath: movieDetails.backdrop_path,
                    }
                });
            }
        } catch (tmdbError) {
            console.warn(`Failed to fetch/upsert TMDB data for ${tmdbId} during addToTopTen`, tmdbError);
            // Proceed anyway, the UI now handles ghost items via placeholders
        }

        await prisma.userTopTen.create({
            data: {
                userId,
                tmdbId,
                position: count
            }
        });

        revalidatePath(`/profile/${userId}`); // Assuming profile page
        return { success: true };
    } catch (e) {
        // Retry logic or simpler failure if unique constraint fails
        return { error: "Failed to add movie. Please try again." };
    }
}

/**
 * Remove a movie from Top Ten and compact positions.
 */
export async function removeFromTopTen(tmdbId: number) {
    const authResult = await requireAppUserIdAction();
    if (!authResult.ok) return { error: "Unauthorized" };
    const userId = authResult.userId;

    try {
        await prisma.$transaction(async (tx) => {
            // 1. Delete the item
            const deleted = await tx.userTopTen.delete({
                where: { userId_tmdbId: { userId, tmdbId } }
            });

            // 2. Initial Fetch remaining items ordered
            const remaining = await tx.userTopTen.findMany({
                where: { userId },
                orderBy: { position: 'asc' }
            });

            // 3. Re-assign positions 0..N
            // We must update them one by one or carefully to avoid unique constraint collisions 
            // during the intermediate state if we just did a batch update?
            // Actually, if we compact, we are only shifting items DOWN (decreasing position index).
            // E.g. [0, 1, 2, 3, 4]. Delete 2. -> [0, 1, 3, 4]. Update 3->2, 4->3.
            // Since 2 is free (deleted), 3->2 is safe. Then 3 is free, 4->3 is safe.
            // Order matters: Ascending order updates are safe for compaction.

            for (let i = 0; i < remaining.length; i++) {
                if (remaining[i].position !== i) {
                    await tx.userTopTen.update({
                        where: { id: remaining[i].id },
                        data: { position: i }
                    });
                }
            }
        });

        revalidatePath(`/profile/${userId}`);
        return { success: true };
    } catch (e) {
        return { error: "Failed to remove movie." };
    }
}

/**
 * Reorder the Top Ten list.
 * Expects an array of tmdbIds in the desired order.
 */
export async function reorderTopTen(orderedTmdbIds: number[]) {
    const authResult = await requireAppUserIdAction();
    if (!authResult.ok) return { error: "Unauthorized" };
    const userId = authResult.userId;

    if (orderedTmdbIds.length > 10) return { error: "Too many items" };

    // Verify all IDs belong to user
    const currentItems = await prisma.userTopTen.findMany({
        where: { userId },
        select: { tmdbId: true }
    });

    const currentIds = new Set(currentItems.map(i => i.tmdbId));
    const incomingIds = new Set(orderedTmdbIds);

    if (currentIds.size !== incomingIds.size) return { error: "Item mismatch" };
    for (const id of orderedTmdbIds) {
        if (!currentIds.has(id)) return { error: "Invalid item in list" };
    }

    // Transactional Reorder
    // Strategy: To avoid unique constraint violations (swapping 0 and 1),
    // we can temporarily move them to negative positions or use a complex update strategy.
    // Simpler strategy: 
    // 1. Set all positions to -1 * (position + 100) (temporary space)
    // 2. Set strict positions based on array index.

    try {
        await prisma.$transaction(async (tx) => {
            // 1. Shift to temporary Safe Zone to avoid collisions
            const items = await tx.userTopTen.findMany({ where: { userId } });
            for (const item of items) {
                await tx.userTopTen.update({
                    where: { id: item.id },
                    data: { position: -1 * (item.position + 1000) }
                });
            }

            // 2. Apply new order
            for (let i = 0; i < orderedTmdbIds.length; i++) {
                await tx.userTopTen.update({
                    where: { userId_tmdbId: { userId, tmdbId: orderedTmdbIds[i] } },
                    data: { position: i }
                });
            }
        });

        revalidatePath(`/profile/${userId}`);
        return { success: true };
    } catch (e) {
        console.error(e);
        return { error: "Failed to reorder." };
    }
}
