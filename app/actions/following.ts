"use server";

import { prisma } from "@/lib/prisma";
import { getAppUserId } from "@/lib/clerk-auth-helpers";

// ─────────────────────────────────────────────────────────────────
// Following types
// ─────────────────────────────────────────────────────────────────
export interface FollowingUser {
    userId: string;
    handle: string;
    avatarUrl: string | null;
    followedAt: Date;
}

export interface FollowingResult {
    users: FollowingUser[];
    nextCursor: string | null;
    isPrivate: boolean;
    totalCount: number;
}

// ─────────────────────────────────────────────────────────────────
// Get following by handle with cursor pagination and privacy gating
// ─────────────────────────────────────────────────────────────────
export async function getFollowingByHandle(
    handle: string,
    cursor?: string,
    limit: number = 30
): Promise<FollowingResult | null> {
    // Look up user by handle
    const targetUser = await prisma.user.findUnique({
        where: { handle },
        select: {
            id: true,
            settings: {
                select: { showFollowingPublic: true }
            }
        },
    });

    if (!targetUser) {
        return null; // User not found
    }

    // Get current viewer's userId (if logged in)
    const currentUserId = await getAppUserId();
    const isOwner = currentUserId === targetUser.id;

    // Privacy check: if not owner and list is private, return private result
    const isPublic = targetUser.settings?.showFollowingPublic ?? true;
    if (!isOwner && !isPublic) {
        // Return private indicator with count only
        const totalCount = await prisma.follow.count({
            where: { followerId: targetUser.id },
        });
        return {
            users: [],
            nextCursor: null,
            isPrivate: true,
            totalCount,
        };
    }

    // Get total count
    const totalCount = await prisma.follow.count({
        where: { followerId: targetUser.id },
    });

    // Fetch following with cursor pagination
    const follows = await prisma.follow.findMany({
        where: { followerId: targetUser.id },
        select: {
            id: true,
            createdAt: true,
            following: {
                select: {
                    id: true,
                    handle: true,
                    image: true,
                },
            },
        },
        orderBy: { createdAt: "desc" },
        take: limit + 1, // Fetch one extra to detect if there's more
        ...(cursor && {
            cursor: { id: cursor },
            skip: 1, // Skip the cursor item itself
        }),
    });

    // Determine if there are more results
    const hasMore = follows.length > limit;
    const results = hasMore ? follows.slice(0, limit) : follows;
    const nextCursor = hasMore ? results[results.length - 1].id : null;

    return {
        users: results.map((f) => ({
            userId: f.following.id,
            handle: f.following.handle,
            avatarUrl: f.following.image,
            followedAt: f.createdAt,
        })),
        nextCursor,
        isPrivate: false,
        totalCount,
    };
}
