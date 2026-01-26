"use server";

import { prisma } from "@/lib/prisma";
import { getTMDBImage } from "@/lib/tmdb";

// ─────────────────────────────────────────────────────────────────
// Get users that a user is following
// ─────────────────────────────────────────────────────────────────
interface FollowingUser {
    userId: string;
    handle: string;
    avatarUrl: string | null;
}

export async function getFollowing(userId: string, limit = 12): Promise<FollowingUser[]> {
    const follows = await prisma.follow.findMany({
        where: { followerId: userId },
        select: {
            following: {
                select: {
                    id: true,
                    handle: true,
                    image: true,
                },
            },
            createdAt: true,
        },
        orderBy: { createdAt: "desc" }, // Most recently followed first
        take: limit,
    });

    return follows.map((f) => ({
        userId: f.following.id,
        handle: f.following.handle,
        avatarUrl: f.following.image,
    }));
}

// ─────────────────────────────────────────────────────────────────
// Get user's recently rated movies
// ─────────────────────────────────────────────────────────────────
interface RecentRating {
    tmdbId: number;
    posterPath: string | null;
    rating: number; // Half-star rating (1-10)
    ratedAt: Date;
    title: string;
}

export async function getRecentlyRatedMovies(userId: string, limit = 12): Promise<RecentRating[]> {
    const interactions = await prisma.movieInteraction.findMany({
        where: {
            userId,
            ratingHalf: { not: null },
        },
        select: {
            movieId: true,
            ratingHalf: true,
            ratedAt: true,
            movie: {
                select: {
                    title: true,
                    posterPath: true,
                },
            },
        },
        orderBy: { ratedAt: "desc" },
        take: limit,
    });

    return interactions
        .filter((i) => i.ratingHalf !== null && i.ratedAt !== null)
        .map((i) => ({
            tmdbId: i.movieId,
            posterPath: i.movie?.posterPath || null,
            rating: i.ratingHalf!,
            ratedAt: i.ratedAt!,
            title: i.movie?.title || "Unknown",
        }));
}

// ─────────────────────────────────────────────────────────────────
// Get users that follow a user
// ─────────────────────────────────────────────────────────────────
interface FollowerUser {
    userId: string;
    handle: string;
    avatarUrl: string | null;
}

export async function getFollowers(userId: string, limit = 12): Promise<FollowerUser[]> {
    const follows = await prisma.follow.findMany({
        where: { followingId: userId },
        select: {
            follower: {
                select: {
                    id: true,
                    handle: true,
                    image: true,
                },
            },
            createdAt: true,
        },
        orderBy: { createdAt: "desc" }, // Most recent followers first
        take: limit,
    });

    return follows.map((f) => ({
        userId: f.follower.id,
        handle: f.follower.handle,
        avatarUrl: f.follower.image,
    }));
}
