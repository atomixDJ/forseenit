"use server";

import { prisma } from "@/lib/prisma";

interface MovieRater {
    userId: string;
    handle: string;
    avatarUrl: string | null;
    rating: number | null;
}

/**
 * Get users who rated a specific movie
 * Returns users with their handle and rating, ordered by most recent first
 */
export async function getMovieRaters(tmdbId: number, limit = 20): Promise<MovieRater[]> {
    const interactions = await prisma.movieInteraction.findMany({
        where: {
            movieId: tmdbId,
            ratingHalf: { not: null },
        },
        select: {
            userId: true,
            ratingHalf: true,
            ratedAt: true,
            user: {
                select: {
                    id: true,
                    handle: true,
                    image: true,
                },
            },
        },
        orderBy: {
            ratedAt: "desc",
        },
        take: limit,
    });

    return interactions.map((interaction) => ({
        userId: interaction.userId,
        handle: interaction.user.handle,
        avatarUrl: interaction.user.image,
        rating: interaction.ratingHalf,
    }));
}
