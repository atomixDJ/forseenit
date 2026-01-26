"use server";

import { requireAppUserIdAction } from "@/lib/clerk-auth-helpers";
import { prisma } from "@/lib/prisma";
import { getTopGenre } from "@/lib/movie/genres";

export async function getUserAnalytics() {
    const authResult = await requireAppUserIdAction();
    if (!authResult.ok) return null;

    const userId = authResult.userId;

    const interactions = await prisma.movieInteraction.findMany({
        where: { userId },
        include: {
            movie: {
                select: {
                    title: true,
                    posterPath: true,
                    backdropPath: true,
                    genreIds: true
                }
            }
        }
    });

    const watched = interactions.filter(i => i.watched);
    const watchlist = interactions.filter(i => i.watchlisted);
    const ratings = interactions.filter(i => i.ratingHalf !== null);
    const favorites = interactions.filter(i => i.favorited);

    const totalWatched = watched.length;
    const totalRated = ratings.length;
    const averageRating = totalRated > 0
        ? ratings.reduce((acc, r) => acc + (r.ratingHalf! / 2), 0) / totalRated
        : 0;

    // stats calculation (approximation for minutes if not in DB)
    const totalHours = Math.round((totalWatched * 105) / 60); // Heuristic 1h45m per movie if missing

    // 4. Rating Distribution
    const distribution: Record<number, number> = {};
    for (let i = 0.5; i <= 5.0; i += 0.5) {
        distribution[i] = ratings.filter(r => (r.ratingHalf! / 2) === i).length;
    }

    // Compute top genre from all rated movies using canonical logic
    const genreIdLists = ratings.map(r => r.movie?.genreIds || null);
    const favoriteGenre = getTopGenre(genreIdLists) || "—";

    const collectionsCount = 10;

    return {
        stats: {
            totalHours,
            favoriteGenre,
            averageRating: Number(averageRating.toFixed(1)),
            watchlistCount: watchlist.length,
            watchedCount: totalWatched,
            ratedCount: totalRated
        },
        distribution,
        collections: {
            watchlist: watchlist.slice(0, collectionsCount).map(i => ({
                movieId: i.movieId,
                title: i.movie?.title || "Unknown",
                posterPath: i.movie?.posterPath,
                backdropPath: i.movie?.backdropPath
            })),
            masterpieces: ratings.filter(r => r.ratingHalf === 10).slice(0, collectionsCount).map(i => ({
                id: i.movieId,
                title: i.movie?.title || "Unknown",
                posterPath: i.movie?.posterPath
            })),
            forgottenGems: favorites.slice(0, collectionsCount).map(i => ({
                id: i.movieId,
                title: i.movie?.title || "Unknown",
                posterPath: i.movie?.posterPath
            }))
        }
    };
}
