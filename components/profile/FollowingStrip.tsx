import Link from "next/link";
import Image from "next/image";

interface FollowingUser {
    userId: string;
    handle: string;
    avatarUrl: string | null;
}

interface FollowingStripProps {
    following: FollowingUser[];
    handle?: string; // Profile owner's handle for "View all" link
    emptyMessage?: string;
}

export default function FollowingStrip({
    following,
    handle,
    emptyMessage = "Not following anyone yet."
}: FollowingStripProps) {
    if (following.length === 0) {
        return (
            <section>
                <h3 className="text-lg font-bold text-white mb-4">
                    Following<span className="text-brand">.</span>
                </h3>
                <div className="text-center py-8 bg-[#1b2228] rounded-lg border border-white/5">
                    <p className="text-[#556677] text-sm">{emptyMessage}</p>
                </div>
            </section>
        );
    }

    return (
        <section>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">
                    Following<span className="text-brand">.</span>
                </h3>
                {handle && following.length >= 12 && (
                    <Link
                        href={`/u/${handle}/following`}
                        className="text-[10px] text-[#99aabb] uppercase tracking-wider hover:text-white transition-colors"
                    >
                        View all →
                    </Link>
                )}
            </div>
            <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {following.map((user) => (
                    <Link
                        key={user.userId}
                        href={`/u/${user.handle}`}
                        className="group flex flex-col items-center flex-shrink-0"
                    >
                        <div className="w-14 h-14 rounded-full overflow-hidden bg-[#1b2228] border-2 border-white/10 group-hover:border-brand transition-colors">
                            {user.avatarUrl ? (
                                <Image
                                    src={user.avatarUrl}
                                    alt={`@${user.handle}`}
                                    width={56}
                                    height={56}
                                    className="object-cover w-full h-full"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-lg font-black text-[#556677]">
                                    {user.handle.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>
                        <p className="text-[10px] text-[#99aabb] mt-1.5 truncate max-w-[60px] group-hover:text-white transition-colors">
                            @{user.handle}
                        </p>
                    </Link>
                ))}
            </div>
        </section>
    );
}

