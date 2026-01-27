"use server";

import { prisma } from "@/lib/prisma";
import { getMovieDetails } from "@/lib/tmdb";

/**
 * Ensures a movie exists in the local database by fetching its metadata from TMDb.
 * This is used to hydrate local interactions with posters/titles for efficient profile rails.
 */
export async function syncMovie(tmdbId: number) {
    // Check if it already exists
    const existing = await prisma.movie.findUnique({
        where: { tmdbId }
    });

    if (existing && existing.posterPath) return existing;

    try {
        const details = await getMovieDetails(tmdbId.toString());
        return await prisma.movie.upsert({
            where: { tmdbId },
            create: {
                tmdbId,
                title: details.title,
                posterPath: details.poster_path,
                backdropPath: details.backdrop_path,
                voteAverage: details.vote_average ?? null,
            },
            update: {
                title: details.title,
                posterPath: details.poster_path,
                backdropPath: details.backdrop_path,
                voteAverage: details.vote_average ?? null,
            }
        });
    } catch (e) {
        console.error(`Failed to sync movie ${tmdbId}:`, e);
        return null;
    }
}
/**
 * Search movies from TMDb for the inline list editor.
 */
export async function searchMoviesAction(query: string) {
    const { searchMovies } = await import("@/lib/tmdb");
    const data = await searchMovies(query);
    return data.results.slice(0, 5); // Return top 5 matches
}
