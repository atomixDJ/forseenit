"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getMovieDetails } from "@/lib/tmdb";

export async function getUserAnalytics() {
    const session = await auth();
    if (!session?.user?.id) return null;

    const userId = session.user.id;

    // 1. Get basic counts
    const [watchlistCount, ratings] = await Promise.all([
        prisma.watchlistMovie.count({ where: { userId } }),
        prisma.rating.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' }
        })
    ]);

    const totalRated = ratings.length;
    const averageRating = totalRated > 0
        ? ratings.reduce((acc, r) => acc + r.value, 0) / totalRated
        : 0;

    // 2. Rating Distribution (0.5 to 5.0 in 0.5 steps)
    const distribution: Record<number, number> = {};
    for (let i = 0.5; i <= 5.0; i += 0.5) {
        distribution[i] = ratings.filter(r => r.value === i).length;
    }

    // 3. Genre Affinity (fetch top genres from rated movies)
    // To keep it fast for now, we only fetch details for the latest 20 rated movies
    const recentRated = ratings.slice(0, 20);
    const genreCounts: Record<string, number> = {};

    await Promise.all(recentRated.map(async (r) => {
        const movie = await getMovieDetails(r.movieId.toString());
        if (movie && movie.genres) {
            movie.genres.forEach((g: any) => {
                genreCounts[g.name] = (genreCounts[g.name] || 0) + 1;
            });
        }
    }));

    const topGenres = Object.entries(genreCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([name, count]) => ({ name, count }));

    return {
        stats: {
            watchlistCount,
            totalRated,
            averageRating: Number(averageRating.toFixed(1))
        },
        distribution,
        topGenres
    };
}
