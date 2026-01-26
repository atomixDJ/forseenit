"use server";

import { prisma } from "@/lib/prisma";
import { getAppUserId } from "@/lib/clerk-auth-helpers";

// ─────────────────────────────────────────────────────────────────
// Follower types
// ─────────────────────────────────────────────────────────────────
export interface FollowerUser {
    userId: string;
    handle: string;
    avatarUrl: string | null;
    followedAt: Date;
}

export interface FollowersResult {
    users: FollowerUser[];
    nextCursor: string | null;
    isPrivate: boolean;
    totalCount: number;
}

// ─────────────────────────────────────────────────────────────────
// Get followers by handle with cursor pagination and privacy gating
// ─────────────────────────────────────────────────────────────────
export async function getFollowersByHandle(
    handle: string,
    cursor?: string,
    limit: number = 30
): Promise<FollowersResult | null> {
    // Look up user by handle
    const targetUser = await prisma.user.findUnique({
        where: { handle },
        select: {
            id: true,
            settings: {
                select: { showFollowersPublic: true }
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
    const isPublic = targetUser.settings?.showFollowersPublic ?? true;
    if (!isOwner && !isPublic) {
        // Return private indicator with count only
        const totalCount = await prisma.follow.count({
            where: { followingId: targetUser.id },
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
        where: { followingId: targetUser.id },
    });

    // Fetch followers with cursor pagination
    const followers = await prisma.follow.findMany({
        where: { followingId: targetUser.id },
        select: {
            id: true,
            createdAt: true,
            follower: {
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
    const hasMore = followers.length > limit;
    const results = hasMore ? followers.slice(0, limit) : followers;
    const nextCursor = hasMore ? results[results.length - 1].id : null;

    return {
        users: results.map((f) => ({
            userId: f.follower.id,
            handle: f.follower.handle,
            avatarUrl: f.follower.image,
            followedAt: f.createdAt,
        })),
        nextCursor,
        isPrivate: false,
        totalCount,
    };
}
