"use server";

import { requireAppUserIdAction, getClerkUserId } from "@/lib/clerk-auth-helpers";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { syncMovie } from "./movies";

/**
 * Toggle favorite (like) status.
 * Rule: Favoriting auto-sets watched=true.
 */
export async function toggleFavorite(movieId: number) {
    const authResult = await requireAppUserIdAction();
    if (!authResult.ok) return { error: "Unauthorized" };
    const userId = authResult.userId;

    const existing = await prisma.movieInteraction.findUnique({
        where: { userId_movieId: { userId, movieId } }
    });

    const isFavorited = !existing?.favorited;
    if (isFavorited) await syncMovie(movieId);

    await prisma.movieInteraction.upsert({
        where: { userId_movieId: { userId, movieId } },
        create: {
            userId,
            movieId,
            favorited: isFavorited,
            favoritedAt: isFavorited ? new Date() : null,
            watched: isFavorited ? true : false,
            watchedAt: isFavorited ? new Date() : null
        },
        update: {
            favorited: isFavorited,
            favoritedAt: isFavorited ? new Date() : null,
            watched: isFavorited ? true : undefined
        }
    });

    revalidatePath(`/movie/${movieId}`);
    return { favorite: isFavorited, watched: isFavorited ? true : !!existing?.watched };
}

/**
 * Toggle watched status manually.
 */
export async function toggleWatched(movieId: number) {
    const authResult = await requireAppUserIdAction();
    if (!authResult.ok) return { error: "Unauthorized" };
    const userId = authResult.userId;

    const existing = await prisma.movieInteraction.findUnique({
        where: { userId_movieId: { userId, movieId } }
    });

    const isWatched = !existing?.watched;
    if (isWatched) await syncMovie(movieId);

    await prisma.movieInteraction.upsert({
        where: { userId_movieId: { userId, movieId } },
        create: { userId, movieId, watched: isWatched, watchedAt: isWatched ? new Date() : null },
        update: { watched: isWatched, watchedAt: isWatched ? new Date() : null },
    });

    revalidatePath(`/movie/${movieId}`);
    return { watched: isWatched };
}

/**
 * Toggle watchlist status.
 */
export async function toggleWatchlist(movieId: number) {
    const authResult = await requireAppUserIdAction();
    if (!authResult.ok) return { error: "Unauthorized" };
    const userId = authResult.userId;

    const existing = await prisma.movieInteraction.findUnique({
        where: { userId_movieId: { userId, movieId } }
    });

    const isWatchlisted = !existing?.watchlisted;
    if (isWatchlisted) await syncMovie(movieId);

    await prisma.movieInteraction.upsert({
        where: { userId_movieId: { userId, movieId } },
        create: { userId, movieId, watchlisted: isWatchlisted },
        update: { watchlisted: isWatchlisted },
    });

    revalidatePath(`/movie/${movieId}`);
    return { watchlisted: isWatchlisted };
}

/**
 * Save rating (0-10 scale). 
 * Rule: Rating auto-sets watched=true.
 */
export async function saveRating(movieId: number, ratingHalf: number) {
    const authResult = await requireAppUserIdAction();
    if (!authResult.ok) return { error: "Unauthorized" };
    const userId = authResult.userId;

    await syncMovie(movieId);

    await prisma.movieInteraction.upsert({
        where: { userId_movieId: { userId, movieId } },
        create: {
            userId,
            movieId,
            ratingHalf,
            ratedAt: new Date(),
            watched: true,
            watchedAt: new Date()
        },
        update: {
            ratingHalf,
            ratedAt: new Date(),
            watched: true
        },
    });

    revalidatePath(`/movie/${movieId}`);
    return { success: true };
}

/**
 * Add a watch log (diary entry).
 */
export async function logWatch(movieId: number, date: Date, rewatch: boolean = false, note?: string) {
    const authResult = await requireAppUserIdAction();
    if (!authResult.ok) return { error: "Unauthorized" };
    const userId = authResult.userId;

    await syncMovie(movieId);

    await prisma.$transaction([
        prisma.movieInteraction.upsert({
            where: { userId_movieId: { userId, movieId } },
            create: { userId, movieId, watched: true, watchedAt: date },
            update: { watched: true }
        }),
        prisma.watchLog.create({
            data: { userId, movieId, watchedAt: date, rewatch, note: note || undefined }
        })
    ]);

    revalidatePath(`/movie/${movieId}`);
    return { success: true };
}

/**
 * Get unified interaction status for a movie.
 */
export async function getMovieInteractionStatus(movieId: number) {
    const authResult = await requireAppUserIdAction();
    if (!authResult.ok) return { favorite: false, watched: false, watchlisted: false, ratingHalf: null };
    const userId = authResult.userId;

    const interaction = await prisma.movieInteraction.findUnique({
        where: { userId_movieId: { userId, movieId } }
    });

    return {
        favorite: interaction?.favorited || false,
        watched: interaction?.watched || false,
        watchlisted: interaction?.watchlisted || false,
        ratingHalf: interaction?.ratingHalf || null
    };
}

/**
 * Efficiently get all TMDB IDs of movies the user has "seen".
 * "Seen" = Watched OR Rated OR Favorited.
 */
export async function getUserSeenMovieIds() {
    const authResult = await requireAppUserIdAction();
    if (!authResult.ok) return [];

    const interactions = await prisma.movieInteraction.findMany({
        where: {
            userId: authResult.userId,
            OR: [
                { watched: true },
                { ratingHalf: { not: null } },
                { favorited: true }
            ]
        },
        select: { movieId: true }
    });

    return interactions.map(i => i.movieId);
}

/**
 * Get all movies the user has watched, with pagination.
 */
export async function getUserWatchedMovies(limit: number = 20, cursor?: number) {
    const authResult = await requireAppUserIdAction();
    if (!authResult.ok) return { items: [], nextCursor: null };
    const userId = authResult.userId;

    const interactions = await prisma.movieInteraction.findMany({
        where: { userId, watched: true },
        take: limit + 1,
        cursor: cursor ? { userId_movieId: { userId, movieId: cursor } } : undefined,
        skip: cursor ? 1 : 0,
        orderBy: [
            { watchedAt: 'desc' },
            { movieId: 'desc' }
        ],
        select: {
            movieId: true,
            watchedAt: true,
            movie: {
                select: {
                    title: true,
                    posterPath: true
                }
            }
        }
    });

    const hasNextPage = interactions.length > limit;
    const items = interactions.slice(0, limit);
    const nextCursor = hasNextPage ? items[items.length - 1].movieId : null;

    return {
        items: items.map(i => ({
            id: i.movieId,
            title: i.movie?.title || "Unknown Title",
            posterPath: i.movie?.posterPath,
            poster_path: i.movie?.posterPath,
            watchedAt: i.watchedAt
        })),
        nextCursor
    };
}

/**
 * Get all movies the user has rated, with pagination.
 */
export async function getUserRatedMovies(limit: number = 20, cursor?: number) {
    const authResult = await requireAppUserIdAction();
    if (!authResult.ok) return { items: [], nextCursor: null };
    const userId = authResult.userId;

    const interactions = await prisma.movieInteraction.findMany({
        where: { userId, ratingHalf: { not: null } },
        take: limit + 1,
        cursor: cursor ? { userId_movieId: { userId, movieId: cursor } } : undefined,
        skip: cursor ? 1 : 0,
        orderBy: [
            { ratedAt: 'desc' },
            { movieId: 'desc' }
        ],
        select: {
            movieId: true,
            ratingHalf: true,
            movie: {
                select: {
                    title: true,
                    posterPath: true
                }
            }
        }
    });

    const hasNextPage = interactions.length > limit;
    const items = interactions.slice(0, limit);
    const nextCursor = hasNextPage ? items[items.length - 1].movieId : null;

    return {
        items: items.map(i => ({
            id: i.movieId,
            title: i.movie?.title || "Unknown Title",
            posterPath: i.movie?.posterPath,
            poster_path: i.movie?.posterPath,
            rating: i.ratingHalf ? i.ratingHalf / 2 : null
        })),
        nextCursor
    };
}

/**
 * Get all movies in the user's watchlist, with pagination.
 */
export async function getUserWatchlistMovies(limit: number = 20, cursor?: number) {
    const authResult = await requireAppUserIdAction();
    if (!authResult.ok) return { items: [], nextCursor: null };
    const userId = authResult.userId;

    const interactions = await prisma.movieInteraction.findMany({
        where: { userId, watchlisted: true },
        take: limit + 1,
        cursor: cursor ? { userId_movieId: { userId, movieId: cursor } } : undefined,
        skip: cursor ? 1 : 0,
        orderBy: [
            { updatedAt: 'desc' },
            { movieId: 'desc' }
        ],
        select: {
            movieId: true,
            movie: {
                select: {
                    title: true,
                    posterPath: true
                }
            }
        }
    });

    const hasNextPage = interactions.length > limit;
    const items = interactions.slice(0, limit);
    const nextCursor = hasNextPage ? items[items.length - 1].movieId : null;

    return {
        items: items.map(i => ({
            id: i.movieId,
            title: i.movie?.title || "Unknown Title",
            posterPath: i.movie?.posterPath,
            poster_path: i.movie?.posterPath
        })),
        nextCursor
    };
}
