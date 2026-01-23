"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/**
 * Toggle favorite status for a movie.
 * Refined rule: On favorite ON, auto-set watched=true. On favorite OFF, do nothing to watched.
 */
export async function toggleFavorite(movieId: number) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Unauthorized" };
    const userId = session.user.id;

    try {
        const existing = await prisma.userFavorite.findUnique({
            where: { userId_movieId: { userId, movieId } }
        });

        if (existing) {
            // Unfavorite
            await prisma.userFavorite.delete({
                where: { userId_movieId: { userId, movieId } }
            });
            revalidatePath(`/movie/${movieId}`);
            return { favorite: false };
        } else {
            // Favorite + Auto-Watched (Transactional)
            await prisma.$transaction([
                prisma.userFavorite.create({
                    data: { userId, movieId }
                }),
                prisma.userWatched.upsert({
                    where: { userId_movieId: { userId, movieId } },
                    update: {}, // No change if already watched
                    create: { userId, movieId }
                })
            ]);
            revalidatePath(`/movie/${movieId}`);
            return { favorite: true, watched: true };
        }
    } catch (error) {
        console.error("Failed to toggle favorite:", error);
        return { error: "Failed to update favorite" };
    }
}

/**
 * Toggle watched status manually.
 */
export async function toggleWatched(movieId: number) {
    const session = await auth();
    if (!session?.user?.id) return { error: "Unauthorized" };
    const userId = session.user.id;

    try {
        const existing = await prisma.userWatched.findUnique({
            where: { userId_movieId: { userId, movieId } }
        });

        if (existing) {
            await prisma.userWatched.delete({
                where: { userId_movieId: { userId, movieId } }
            });
            revalidatePath(`/movie/${movieId}`);
            return { watched: false };
        } else {
            await prisma.userWatched.create({
                data: { userId, movieId }
            });
            revalidatePath(`/movie/${movieId}`);
            return { watched: true };
        }
    } catch (error) {
        console.error("Failed to toggle watched:", error);
        return { error: "Failed to update watched status" };
    }
}

/**
 * Get unified interaction status for a movie.
 */
export async function getMovieInteractionStatus(movieId: number) {
    const session = await auth();
    if (!session?.user?.id) return { favorite: false, watched: false };
    const userId = session.user.id;

    const [favorite, watched] = await Promise.all([
        prisma.userFavorite.findUnique({ where: { userId_movieId: { userId, movieId } } }),
        prisma.userWatched.findUnique({ where: { userId_movieId: { userId, movieId } } })
    ]);

    return {
        favorite: !!favorite,
        watched: !!watched
    };
}

/**
 * Efficiently get all TMDB IDs of movies the user has "seen".
 * "Seen" = Watched OR Rated OR Favorited.
 */
export async function getUserSeenMovieIds() {
    const session = await auth();
    if (!session?.user?.id) return [];
    const userId = session.user.id;

    const [watched, rated, favorited] = await Promise.all([
        prisma.userWatched.findMany({ where: { userId }, select: { movieId: true } }),
        prisma.rating.findMany({ where: { userId }, select: { movieId: true } }),
        prisma.userFavorite.findMany({ where: { userId }, select: { movieId: true } })
    ]);

    const seenSet = new Set<number>();
    watched.forEach(w => seenSet.add(w.movieId));
    rated.forEach(r => seenSet.add(r.movieId));
    favorited.forEach(f => seenSet.add(f.movieId));

    return Array.from(seenSet);
}
