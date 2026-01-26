"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { getFollowersByHandle, FollowerUser } from "@/app/actions/followers";
import { Loader2 } from "lucide-react";

interface FollowersListProps {
    handle: string;
    initialUsers: FollowerUser[];
    initialNextCursor: string | null;
}

export default function FollowersList({
    handle,
    initialUsers,
    initialNextCursor
}: FollowersListProps) {
    const [users, setUsers] = useState<FollowerUser[]>(initialUsers);
    const [nextCursor, setNextCursor] = useState<string | null>(initialNextCursor);
    const [isPending, startTransition] = useTransition();

    const loadMore = () => {
        if (!nextCursor || isPending) return;

        startTransition(async () => {
            const result = await getFollowersByHandle(handle, nextCursor, 30);
            if (result && !result.isPrivate) {
                setUsers((prev) => [...prev, ...result.users]);
                setNextCursor(result.nextCursor);
            }
        });
    };

    return (
        <div className="space-y-4">
            {/* Followers grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {users.map((user) => (
                    <Link
                        key={user.userId}
                        href={`/u/${user.handle}`}
                        className="group flex items-center gap-4 p-4 rounded-lg bg-[#1b2228] hover:bg-[#2a3440] border border-white/5 transition-colors"
                    >
                        {/* Avatar */}
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-[#2a3440] flex-shrink-0">
                            {user.avatarUrl ? (
                                <Image
                                    src={user.avatarUrl}
                                    alt={`@${user.handle}`}
                                    width={48}
                                    height={48}
                                    className="object-cover w-full h-full"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-lg font-black text-[#556677]">
                                    {user.handle.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>

                        {/* Handle */}
                        <div className="min-w-0">
                            <p className="text-white font-medium truncate group-hover:text-brand transition-colors">
                                @{user.handle}
                            </p>
                            <p className="text-[#556677] text-xs">
                                Followed {formatRelativeTime(user.followedAt)}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Load more button */}
            {nextCursor && (
                <div className="flex justify-center pt-4">
                    <button
                        onClick={loadMore}
                        disabled={isPending}
                        className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 transition-colors disabled:opacity-50"
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Loading...
                            </>
                        ) : (
                            "Load more"
                        )}
                    </button>
                </div>
            )}
        </div>
    );
}

// Helper to format relative time
function formatRelativeTime(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return "today";
    if (days === 1) return "yesterday";
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    if (days < 365) return `${Math.floor(days / 30)} months ago`;
    return `${Math.floor(days / 365)} years ago`;
}
