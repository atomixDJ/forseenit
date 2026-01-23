"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/**
 * Save or update a user's rating for a movie.
 * @param movieId TMDB ID of the movie
 * @param value Rating from 0.5 to 5.0
 */
export async function saveRating(movieId: number, value: number) {
    const session = await auth();
    if (!session?.user?.id) {
        return { error: "Unauthorized" };
    }

    const userId = session.user.id;

    try {
        const rating = await prisma.rating.upsert({
            where: {
                userId_movieId: {
                    userId,
                    movieId,
                },
            },
            update: {
                value,
            },
            create: {
                userId,
                movieId,
                value,
            },
        });

        revalidatePath(`/movie/${movieId}`);
        return { success: true, rating };
    } catch (error) {
        console.error("Failed to save rating:", error);
        return { error: "Failed to save rating" };
    }
}

/**
 * Remove a user's rating for a movie.
 * @param movieId TMDB ID of the movie
 */
export async function deleteRating(movieId: number) {
    const session = await auth();
    if (!session?.user?.id) {
        return { error: "Unauthorized" };
    }

    try {
        await prisma.rating.delete({
            where: {
                userId_movieId: {
                    userId: session.user.id,
                    movieId,
                },
            },
        });

        revalidatePath(`/movie/${movieId}`);
        return { success: true };
    } catch (error) {
        console.error("Failed to delete rating:", error);
        return { error: "Failed to delete rating" };
    }
}

/**
 * Get the current user's rating for a specific movie.
 */
export async function getMovieRating(movieId: number) {
    const session = await auth();
    if (!session?.user?.id) return null;

    const rating = await prisma.rating.findUnique({
        where: {
            userId_movieId: {
                userId: session.user.id,
                movieId,
            },
        },
    });

    return rating?.value || null;
}

/**
 * Get all movies the user has rated, with movie details from TMDB.
 */
export async function getUserRatedMovies() {
    const session = await auth();
    if (!session?.user?.id) return [];

    const ratings = await prisma.rating.findMany({
        where: { userId: session.user.id },
        orderBy: { updatedAt: 'desc' }
    });

    if (ratings.length === 0) return [];

    // Fetch movie details for each rating from TMDB
    const { getMovieDetails } = await import("@/lib/tmdb");

    // We fetch in parallel but limit if needed (TMDB has rate limits but for a profile page it's usually fine)
    const moviesWithRatings = await Promise.all(
        ratings.map(async (r) => {
            try {
                const movie = await getMovieDetails(r.movieId);
                return {
                    ...movie,
                    userRating: r.value
                };
            } catch (error) {
                console.error(`Failed to fetch TMDB data for movie ${r.movieId}:`, error);
                return null;
            }
        })
    );

    return moviesWithRatings.filter((m): m is any => m !== null);
}
