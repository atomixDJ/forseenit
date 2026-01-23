"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function toggleWatchlist(movie: {
    id: number;
    title: string;
    poster_path: string | null;
    backdrop_path: string | null;
}) {
    const session = await auth();
    if (!session?.user?.id) {
        return { error: "Unauthorized" };
    }

    const userId = session.user.id;

    try {
        // Find if already in watchlist
        const existing = await prisma.watchlistMovie.findUnique({
            where: {
                userId_movieId: {
                    userId,
                    movieId: movie.id,
                },
            },
        });

        if (existing) {
            // Remove
            await prisma.watchlistMovie.delete({
                where: {
                    userId_movieId: {
                        userId,
                        movieId: movie.id,
                    },
                },
            });
            revalidatePath(`/movie/${movie.id}`);
            return { added: false };
        } else {
            // Add
            await prisma.watchlistMovie.create({
                data: {
                    userId,
                    movieId: movie.id,
                    title: movie.title,
                    posterPath: movie.poster_path,
                    backdropPath: movie.backdrop_path,
                },
            });
            revalidatePath(`/movie/${movie.id}`);
            return { added: true };
        }
    } catch (error) {
        console.error("Watchlist action failed:", error);
        return { error: "Failed to update watchlist" };
    }
}

export async function getWatchlistStatus(tmdbId: number) {
    const session = await auth();
    if (!session?.user?.id) return false;

    const count = await prisma.watchlistMovie.count({
        where: {
            userId: session.user.id,
            movieId: tmdbId,
        },
    });

    return count > 0;
}

export async function getWatchlist() {
    const session = await auth();
    if (!session?.user?.id) return [];

    const watchlist = await prisma.watchlistMovie.findMany({
        where: {
            userId: session.user.id,
        },
        orderBy: {
            addedAt: 'desc',
        },
    });

    return watchlist;
}
