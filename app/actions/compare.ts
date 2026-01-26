"use server";

import { prisma } from "@/lib/prisma";
import { requireAppUserIdAction } from "@/lib/clerk-auth-helpers";
import { getTopGenre } from "@/lib/movie/genres";

export interface CompareUserData {
    handle: string;
    name: string | null;
    image: string | null;
    stats: {
        avgRating: number;
        count: number;
    };
    topGenre: string | null;
    topTen: number[];
    ratingMap: Record<number, number>;
    recent: {
        tmdbId: number;
        ratingHalf: number;
        ratedAt: Date;
    }[];
}

export interface ComparisonResult {
    self: CompareUserData;
    peer: CompareUserData;
    overlaps: {
        topTen: number[];
        highRatings: {
            "4.0": number[];
            "4.5": number[];
            "5.0": number[];
        };
        favorites: number[];
    };
    movieMap: Record<number, { title: string; posterPath: string | null }>;
}

/**
 * Fetches all necessary data to compare two users.
 * Validates that the current user follows the peer.
 */
export async function getCompareData(peerHandle: string): Promise<ComparisonResult> {
    const authResult = await requireAppUserIdAction();
    if (!authResult.ok) {
        throw new Error("Unauthorized");
    }
    const currentUserId = authResult.userId;

    // 1. Resolve Peer and Validate Follow
    const peer = await prisma.user.findUnique({
        where: { handle: peerHandle },
        select: { id: true, handle: true, name: true, image: true }
    });

    if (!peer) {
        throw new Error("User not found");
    }

    const isFollowing = await prisma.follow.findUnique({
        where: {
            followerId_followingId: {
                followerId: currentUserId,
                followingId: peer.id
            }
        }
    });

    if (!isFollowing && currentUserId !== peer.id) {
        throw new Error("You must follow a user to compare with them.");
    }

    // 2. Resolve Self
    const self = await prisma.user.findUnique({
        where: { id: currentUserId },
        select: { id: true, handle: true, name: true, image: true }
    });

    if (!self) throw new Error("Self not found");

    // 3. Fetch Full Payloads
    const [selfFull, peerFull] = await Promise.all([
        fetchComparisonPayload(self.id),
        fetchComparisonPayload(peer.id)
    ]);

    // 4. Calculate Overlaps with server-side deduping
    const sharedTopTen = selfFull.topTen.filter(id => peerFull.topTen.includes(id));
    const sharedFavorites = selfFull.favorites.filter(id => peerFull.favorites.includes(id));

    // Dedupe rule: 5.0 is exclusive, 4.5+ excludes 5.0, 4.0+ excludes 4.5+ and 5.0
    const overlap50 = intersect(selfFull.ratings["10"], peerFull.ratings["10"]);
    const set50 = new Set(overlap50);
    const overlap45 = intersect(selfFull.ratings["9"], peerFull.ratings["9"]).filter(id => !set50.has(id));
    const set45 = new Set(overlap45);
    const overlap40 = intersect(selfFull.ratings["8"], peerFull.ratings["8"]).filter(id => !set50.has(id) && !set45.has(id));

    // 5. Aggregate Movie IDs for Poster Mapping
    const allIds = new Set([
        ...selfFull.topTen,
        ...peerFull.topTen,
        ...overlap40,
        ...selfFull.recent.map(r => r.tmdbId),
        ...peerFull.recent.map(r => r.tmdbId)
    ]);

    const movies = await prisma.movie.findMany({
        where: { tmdbId: { in: Array.from(allIds) } },
        select: { tmdbId: true, title: true, posterPath: true }
    });

    const movieMap: Record<number, { title: string; posterPath: string | null }> = {};
    movies.forEach(m => {
        movieMap[m.tmdbId] = { title: m.title, posterPath: m.posterPath };
    });

    return {
        self: {
            handle: self.handle,
            name: self.name,
            image: self.image,
            ...selfFull
        },
        peer: {
            handle: peer.handle,
            name: peer.name,
            image: peer.image,
            ...peerFull
        },
        overlaps: {
            topTen: sharedTopTen,
            favorites: sharedFavorites,
            highRatings: {
                "4.0": overlap40,
                "4.5": overlap45,
                "5.0": overlap50
            }
        },
        movieMap
    };
}

async function fetchComparisonPayload(userId: string) {
    // Fetch all rated movies for genre affinity (all-time history)
    const [topTen, allRatings, highRatings, favorites, interactions] = await Promise.all([
        prisma.userTopTen.findMany({
            where: { userId },
            orderBy: { position: "asc" },
            select: { tmdbId: true }
        }),
        // All-time rated movies for genre affinity calculation
        prisma.movieInteraction.findMany({
            where: { userId, ratedAt: { not: null } },
            select: {
                movieId: true,
                ratingHalf: true,
                movie: { select: { genreIds: true } }
            }
        }),
        // High ratings (>= 4.0 stars) for overlap calculation
        prisma.movieInteraction.findMany({
            where: { userId, ratedAt: { not: null }, ratingHalf: { gte: 8 } },
            select: {
                movieId: true,
                ratingHalf: true
            }
        }),
        prisma.movieInteraction.findMany({
            where: { userId, favorited: true },
            select: { movieId: true }
        }),
        prisma.movieInteraction.aggregate({
            where: { userId, ratedAt: { not: null } },
            _avg: { ratingHalf: true },
            _count: { ratingHalf: true }
        })
    ]);

    const recent = await prisma.movieInteraction.findMany({
        where: { userId, ratedAt: { not: null } },
        orderBy: { ratedAt: "desc" },
        take: 6,
        select: { movieId: true, ratingHalf: true, ratedAt: true }
    });

    // Calculate Top Genre from ALL rated movies (all-time history)
    const genreIdLists = allRatings.map(r => r.movie?.genreIds || null);
    const topGenre = getTopGenre(genreIdLists);

    // Map of all ratings for the comparison context (use highRatings for ratingMap)
    const ratingMap: Record<number, number> = {};
    allRatings.forEach(r => {
        ratingMap[r.movieId] = r.ratingHalf! / 2;
    });

    return {
        stats: {
            avgRating: interactions._avg.ratingHalf ?? 0,
            count: interactions._count.ratingHalf ?? 0
        },
        topGenre,
        topTen: topTen.map(t => t.tmdbId),
        ratingMap,
        favorites: favorites.map(f => f.movieId),
        ratings: {
            "8": highRatings.filter(r => r.ratingHalf! >= 8).map(r => r.movieId),
            "9": highRatings.filter(r => r.ratingHalf! >= 9).map(r => r.movieId),
            "10": highRatings.filter(r => r.ratingHalf === 10).map(r => r.movieId)
        },
        recent: recent.map(r => ({
            tmdbId: r.movieId,
            ratingHalf: r.ratingHalf!,
            ratedAt: r.ratedAt!
        }))
    };
}

function intersect(a: number[], b: number[]) {
    const setB = new Set(b);
    return a.filter(x => setB.has(x));
}
