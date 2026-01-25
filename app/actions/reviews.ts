"use server";

import { prisma } from "@/lib/prisma";
import { requireAppUserIdAction, getClerkUserId } from "@/lib/clerk-auth-helpers";
import { revalidatePath } from "next/cache";

/**
 * Fetch all reviews for a specific movie.
 * Includes like counts and isLikedByUser flag if a user is logged in.
 */
export async function getMovieReviews(movieId: number) {
    // For read-only, try to get userId but don't require it
    const authResult = await requireAppUserIdAction();
    const currentUserId = authResult.ok ? authResult.userId : null;

    const reviews = await prisma.review.findMany({
        where: { movieId },
        include: {
            user: {
                select: { name: true, image: true }
            },
            watchLog: {
                select: { watchedAt: true, rewatch: true }
            },
            _count: {
                select: { favorites: true }
            }
        },
        orderBy: { createdAt: 'desc' }
    });

    if (!currentUserId || reviews.length === 0) {
        return reviews.map(r => ({ ...r, isLikedByUser: false }));
    }

    // Optimization: Fetch all favorites for the current user for these reviews in one query
    const userFavorites = await prisma.reviewFavorite.findMany({
        where: {
            userId: currentUserId,
            reviewId: { in: reviews.map(r => r.id) }
        },
        select: { reviewId: true }
    });

    const likedReviewIds = new Set(userFavorites.map(f => f.reviewId));

    return reviews.map(r => ({
        ...r,
        isLikedByUser: likedReviewIds.has(r.id)
    }));
}

/**
 * Toggle "Like" (Favorite) for a review.
 * Returns the new state and updated count.
 */
export async function toggleReviewFavorite(reviewId: string) {
    const authResult = await requireAppUserIdAction();
    if (!authResult.ok) return { error: "Unauthorized" };
    const userId = authResult.userId;

    const existing = await prisma.reviewFavorite.findUnique({
        where: { reviewId_userId: { reviewId, userId } }
    });

    let favorited: boolean;

    if (existing) {
        await prisma.reviewFavorite.delete({
            where: { reviewId_userId: { reviewId, userId } }
        });
        favorited = false;
    } else {
        // Idempotent creation (handled by @@id uniqueness if race condition occurs)
        try {
            await prisma.reviewFavorite.create({
                data: { reviewId, userId }
            });
            favorited = true;
        } catch (e) {
            // If already created, treat as success/favorited
            favorited = true;
        }
    }

    // Re-fetch the count to ensure accuracy
    const review = await prisma.review.findUnique({
        where: { id: reviewId },
        select: { _count: { select: { favorites: true } } }
    });

    return { favorited, likeCount: review?._count.favorites || 0 };
}

/**
 * Transactional action to log a watch, update interactions, and optionally create a review.
 */
export async function createLogEntry({
    movieId,
    watchedAt,
    rewatch = false,
    favorited = false,
    ratingHalf = null,
    bodyRaw = "",
    bodyFormat = "markdown",
    tags = ""
}: {
    movieId: number;
    watchedAt: Date;
    rewatch?: boolean;
    favorited?: boolean;
    ratingHalf?: number | null;
    bodyRaw?: string;
    bodyFormat?: string;
    tags?: string;
}) {
    const authResult = await requireAppUserIdAction();
    if (!authResult.ok) return { error: "Unauthorized" };
    const userId = authResult.userId;

    const result = await prisma.$transaction(async (tx) => {
        // 1. Create Watch Log
        const watchLog = await tx.watchLog.create({
            data: {
                userId,
                movieId,
                watchedAt,
                rewatch,
                tags: tags || undefined
            }
        });

        // 2. Update Movie Interaction Invariants
        const interaction = await tx.movieInteraction.upsert({
            where: { userId_movieId: { userId, movieId } },
            create: {
                userId,
                movieId,
                watched: true,
                watchedAt,
                favorited,
                favoritedAt: favorited ? new Date() : null,
                ratingHalf,
                ratedAt: ratingHalf !== null ? new Date() : null
            },
            update: {
                watched: true,
                watchedAt: { set: watchedAt },
                favorited: favorited ? true : undefined,
                favoritedAt: favorited ? new Date() : undefined,
                ratingHalf: ratingHalf !== null ? ratingHalf : undefined,
                ratedAt: ratingHalf !== null ? new Date() : undefined
            }
        });

        // 3. Create Review if body is provided
        let review = null;
        if (bodyRaw.trim()) {
            review = await tx.review.create({
                data: {
                    userId,
                    movieId,
                    watchLogId: watchLog.id,
                    bodyRaw,
                    bodyFormat,
                    ratingHalf, // Rating at time of review
                    tags
                }
            });
        }

        return { watchLog, interaction, review };
    });

    revalidatePath(`/movie/${movieId}`);
    revalidatePath(`/profile`);
    return { success: true, data: result };
}
