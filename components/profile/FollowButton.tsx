"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { followUser, unfollowUser } from "@/app/actions/follow";
import { UserPlus, UserCheck, Loader2 } from "lucide-react";

interface FollowButtonProps {
    targetUserId: string;
    initialIsFollowing: boolean;
    initialFollowerCount: number;
    isLoggedIn: boolean;
    isOwnProfile: boolean;
    onFollowerCountChange?: (count: number) => void;
}

export default function FollowButton({
    targetUserId,
    initialIsFollowing,
    initialFollowerCount,
    isLoggedIn,
    isOwnProfile,
    onFollowerCountChange,
}: FollowButtonProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
    const [followerCount, setFollowerCount] = useState(initialFollowerCount);

    // Don't render on own profile
    if (isOwnProfile) {
        return null;
    }

    // Not logged in - show sign in prompt
    if (!isLoggedIn) {
        return (
            <button
                onClick={() => router.push("/login")}
                className="flex items-center gap-2 px-4 py-2 rounded-[4px] bg-white/5 border border-white/10 text-[#99aabb] text-[11px] font-bold uppercase tracking-wider hover:bg-white/10 transition-all"
            >
                <UserPlus className="w-4 h-4" />
                Sign in to follow
            </button>
        );
    }

    const handleClick = () => {
        // Optimistic update
        const newIsFollowing = !isFollowing;
        const newCount = newIsFollowing ? followerCount + 1 : followerCount - 1;

        setIsFollowing(newIsFollowing);
        setFollowerCount(newCount);
        onFollowerCountChange?.(newCount);

        startTransition(async () => {
            const result = newIsFollowing
                ? await followUser(targetUserId)
                : await unfollowUser(targetUserId);

            if (!result.success) {
                // Revert on error
                setIsFollowing(!newIsFollowing);
                setFollowerCount(followerCount);
                onFollowerCountChange?.(followerCount);
                console.error(result.error);
            } else {
                // Sync with server state
                setIsFollowing(result.isFollowing);
                setFollowerCount(result.followerCount);
                onFollowerCountChange?.(result.followerCount);
            }
        });
    };

    if (isFollowing) {
        return (
            <button
                onClick={handleClick}
                disabled={isPending}
                className="group flex items-center gap-2 px-4 py-2 rounded-[4px] bg-brand/20 border border-brand/30 text-brand text-[11px] font-bold uppercase tracking-wider hover:bg-red-500/20 hover:border-red-500/30 hover:text-red-400 transition-all disabled:opacity-50"
            >
                {isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                    <>
                        <UserCheck className="w-4 h-4 group-hover:hidden" />
                        <span className="group-hover:hidden">Following</span>
                        <span className="hidden group-hover:inline">Unfollow</span>
                    </>
                )}
            </button>
        );
    }

    return (
        <button
            onClick={handleClick}
            disabled={isPending}
            className="flex items-center gap-2 px-4 py-2 rounded-[4px] bg-brand text-black text-[11px] font-bold uppercase tracking-wider hover:bg-brand/90 transition-all disabled:opacity-50"
        >
            {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
                <>
                    <UserPlus className="w-4 h-4" />
                    Follow
                </>
            )}
        </button>
    );
}
