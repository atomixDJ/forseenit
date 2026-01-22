'use server'

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function toggleWatchlist(movie: {
    id: number;
    title: string;
    poster_path: string | null;
    backdrop_path: string | null;
}) {
    const session = await auth();
    if (!session?.user?.id) {
        throw new Error("Unauthorized");
    }

    const userId = session.user.id;
    const movieId = movie.id;

    const existing = await prisma.watchlistMovie.findUnique({
        where: {
            userId_movieId: {
                userId,
                movieId,
            },
        },
    });

    if (existing) {
        await prisma.watchlistMovie.delete({
            where: {
                userId_movieId: {
                    userId,
                    movieId,
                },
            },
        });
        revalidatePath(`/movie/${movieId}`);
        return { added: false };
    } else {
        await prisma.watchlistMovie.create({
            data: {
                userId,
                movieId,
                title: movie.title,
                posterPath: movie.poster_path,
                backdropPath: movie.backdrop_path,
            },
        });
        revalidatePath(`/movie/${movieId}`);
        return { added: true };
    }
}

export async function getWatchlistStatus(movieId: number) {
    const session = await auth();
    if (!session?.user?.id) return false;

    const count = await prisma.watchlistMovie.count({
        where: {
            userId: session.user.id,
            movieId,
        },
    });

    return count > 0;
}
