"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getAppUserId } from "@/lib/clerk-auth-helpers";

export interface FollowResult {
    success: boolean;
    isFollowing: boolean;
    followerCount: number;
    error?: string;
}

export interface FollowCounts {
    followers: number;
    following: number;
}

export interface FollowStatus {
    isFollowing: boolean;
}

/**
 * Follow a user. Requires auth. Cannot follow self.
 * Handles duplicate follows gracefully (no 500s).
 */
export async function followUser(targetUserId: string): Promise<FollowResult> {
    const currentUserId = await getAppUserId();

    if (!currentUserId) {
        return {
            success: false,
            isFollowing: false,
            followerCount: 0,
            error: "Not authenticated",
        };
    }

    if (currentUserId === targetUserId) {
        return {
            success: false,
            isFollowing: false,
            followerCount: 0,
            error: "Cannot follow yourself",
        };
    }

    try {
        // Upsert to handle duplicates gracefully
        await prisma.follow.upsert({
            where: {
                followerId_followingId: {
                    followerId: currentUserId,
                    followingId: targetUserId,
                },
            },
            create: {
                followerId: currentUserId,
                followingId: targetUserId,
            },
            update: {}, // No update needed, just ensure it exists
        });

        // Get updated follower count
        const followerCount = await prisma.follow.count({
            where: { followingId: targetUserId },
        });

        revalidatePath(`/u/${targetUserId}`);
        revalidatePath("/profile");

        return {
            success: true,
            isFollowing: true,
            followerCount,
        };
    } catch (error) {
        console.error("Error following user:", error);
        return {
            success: false,
            isFollowing: false,
            followerCount: 0,
            error: "Failed to follow user",
        };
    }
}

/**
 * Unfollow a user. Requires auth.
 * Safe to call even if not currently following.
 */
export async function unfollowUser(targetUserId: string): Promise<FollowResult> {
    const currentUserId = await getAppUserId();

    if (!currentUserId) {
        return {
            success: false,
            isFollowing: false,
            followerCount: 0,
            error: "Not authenticated",
        };
    }

    try {
        // Delete if exists, ignore if doesn't
        await prisma.follow.deleteMany({
            where: {
                followerId: currentUserId,
                followingId: targetUserId,
            },
        });

        // Get updated follower count
        const followerCount = await prisma.follow.count({
            where: { followingId: targetUserId },
        });

        revalidatePath(`/u/${targetUserId}`);
        revalidatePath("/profile");

        return {
            success: true,
            isFollowing: false,
            followerCount,
        };
    } catch (error) {
        console.error("Error unfollowing user:", error);
        return {
            success: false,
            isFollowing: true,
            followerCount: 0,
            error: "Failed to unfollow user",
        };
    }
}

/**
 * Get follower and following counts for a user. Public (no auth required).
 */
export async function getFollowCounts(userId: string): Promise<FollowCounts> {
    const [followers, following] = await Promise.all([
        prisma.follow.count({ where: { followingId: userId } }),
        prisma.follow.count({ where: { followerId: userId } }),
    ]);

    return { followers, following };
}

/**
 * Get whether the current user is following the target user.
 * Returns null if not authenticated.
 */
export async function getFollowStatus(targetUserId: string): Promise<FollowStatus | null> {
    const currentUserId = await getAppUserId();

    if (!currentUserId) {
        return null;
    }

    if (currentUserId === targetUserId) {
        // Own profile - not applicable
        return null;
    }

    const follow = await prisma.follow.findUnique({
        where: {
            followerId_followingId: {
                followerId: currentUserId,
                followingId: targetUserId,
            },
        },
    });

    return { isFollowing: !!follow };
}

/**
 * Get the current user's ID (for client components to determine if viewing own profile)
 */
export async function getCurrentUserId(): Promise<string | null> {
    return await getAppUserId();
}

/**
 * Get the list of users the current user is following.
 */
export async function getFollowingList() {
    const currentUserId = await getAppUserId();
    if (!currentUserId) return [];

    const following = await prisma.follow.findMany({
        where: { followerId: currentUserId },
        include: {
            following: {
                select: {
                    id: true,
                    handle: true,
                    name: true,
                    image: true
                }
            }
        },
        take: 10, // Limit for performance
        orderBy: { createdAt: 'desc' } // Most recent follows first
    });

    return following.map(f => f.following);
}
