import Link from "next/link";
import Image from "next/image";
import { getMovieRaters } from "@/app/actions/raters";
import { Star } from "lucide-react";

interface MovieRatersProps {
    tmdbId: number;
    isLoggedIn?: boolean;
}

export default async function MovieRaters({ tmdbId, isLoggedIn = false }: MovieRatersProps) {
    const raters = await getMovieRaters(tmdbId, 20);

    // Format rating from half-stars to stars
    const formatRating = (ratingHalf: number | null) => {
        if (ratingHalf === null) return null;
        return (ratingHalf / 2).toFixed(1);
    };

    return (
        <section className="mt-12 pt-8 border-t border-white/5">
            <h3 className="text-lg font-bold text-white mb-4">
                People who rated this<span className="text-brand">.</span>
            </h3>

            {raters.length === 0 ? (
                <div className="text-center py-8 bg-[#1b2228] rounded-lg border border-white/5">
                    <p className="text-[#556677] text-sm mb-2">
                        No ratings from ForSeenIt viewers yet.
                    </p>
                    {isLoggedIn && (
                        <button
                            className="text-brand text-sm font-medium hover:underline"
                        >
                            Be the first to rate this
                        </button>
                    )}
                </div>
            ) : (
                <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {raters.map((rater) => (
                        <Link
                            key={rater.userId}
                            href={`/u/${rater.handle}`}
                            className="group flex flex-col items-center flex-shrink-0"
                        >
                            {/* Avatar with rating overlay */}
                            <div className="relative">
                                <div className="w-14 h-14 rounded-full overflow-hidden bg-[#1b2228] border-2 border-white/10 group-hover:border-brand transition-colors">
                                    {rater.avatarUrl ? (
                                        <Image
                                            src={rater.avatarUrl}
                                            alt={`@${rater.handle}`}
                                            width={56}
                                            height={56}
                                            className="object-cover w-full h-full"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-lg font-black text-[#556677]">
                                            {rater.handle.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                </div>
                                {/* Rating indicator */}
                                {rater.rating !== null && (
                                    <div className="absolute -bottom-1 -right-1 flex items-center gap-0.5 px-1.5 py-0.5 bg-[#14181c] rounded-full border border-white/10 text-[10px]">
                                        <Star className="w-2.5 h-2.5 fill-brand text-brand" />
                                        <span className="text-white font-bold">{formatRating(rater.rating)}</span>
                                    </div>
                                )}
                            </div>
                            {/* Handle */}
                            <p className="text-[10px] text-[#99aabb] mt-1.5 truncate max-w-[60px] group-hover:text-white transition-colors">
                                @{rater.handle}
                            </p>
                        </Link>
                    ))}
                </div>
            )}
        </section>
    );
}
