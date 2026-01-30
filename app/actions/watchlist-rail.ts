"use server";

import { prisma } from "@/lib/prisma";
import { getAppUserId } from "@/lib/clerk-auth-helpers";
import { Movie } from "@/lib/tmdb";

/**
 * Single-query fetch for user's watchlist with movie data for PosterCard.
 * Returns movies in "most recently updated" order (reorders on any flag change).
 * For v1, accepts this caveat; future could add watchlistedAt column.
 */
export async function getWatchlistRailItems(): Promise<{
    movies: Movie[];
    userRatings: Record<number, number | null>;
}> {
    const userId = await getAppUserId();

    if (!userId) {
        return { movies: [], userRatings: {} };
    }

    // Single query: MovieInteraction + related Movie
    const interactions = await prisma.movieInteraction.findMany({
        where: {
            userId,
            watchlisted: true,
        },
        include: {
            movie: true, // Include related Movie for poster data
        },
        orderBy: {
            updatedAt: "desc",
        },
        take: 18,
    });

    // Map to PosterCard Movie contract + collect ratings
    const userRatings: Record<number, number | null> = {};
    const movies: Movie[] = [];

    for (const interaction of interactions) {
        const movie = interaction.movie;

        // Skip if movie record doesn't exist (orphaned interaction)
        if (!movie) continue;

        // Store user rating for this movie (ratingHalf is 0-10)
        userRatings[movie.tmdbId] = interaction.ratingHalf;

        // Map to Movie interface expected by PosterCard
        // Only include required fields - PosterCard handles missing fields gracefully
        movies.push({
            id: movie.tmdbId,
            title: movie.title,
            poster_path: movie.posterPath,
            backdrop_path: movie.backdropPath,
            vote_average: 0, // Movie table doesn't store this; TMDb score shown from PosterCard's movie.vote_average fallback
            release_date: "", // Not stored in our Movie table
            genre_ids: movie.genreIds ? movie.genreIds.split(",").map(Number) : [],
            overview: "",
            runtime: 0,
            release_dates: { results: [] },
        });
    }

    return { movies, userRatings };
}
