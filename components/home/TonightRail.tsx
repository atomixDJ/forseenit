import React from "react";
import { TonightResult } from "@/app/actions/recommendations";
import Feed from "@/components/movie/Feed";
import Link from "next/link";
import { Settings, Film } from "lucide-react";

/**
 * Get time-based title for the recommendation rail.
 */
function getTimeBasedTitle(): string {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
        return "Stream These This Morning";
    } else if (hour >= 12 && hour < 17) {
        return "Stream These Today";
    } else if (hour >= 17 && hour < 21) {
        return "Stream These Tonight";
    } else {
        return "Stream These Tonight";
    }
}

interface TonightRailProps {
    result: TonightResult;
    watchlistIds?: Set<number>;
}

/**
 * TonightRail component renders personalized recommendations with dynamic label and optional "Filters relaxed" pill.
 */
export default function TonightRail({ result, watchlistIds }: TonightRailProps) {
    const { movies, meta } = result;
    const title = getTimeBasedTitle();

    // Empty state when all movies filtered out
    if (meta.isEmpty || movies.length === 0) {
        return (
            <section className="mb-12">
                <h2 className="text-2xl md:text-3xl font-black text-white italic uppercase tracking-tighter mb-4">{title}</h2>
                <div className="bg-[#1b2228]/50 border border-white/5 rounded-lg p-8 text-center">
                    <Film className="w-12 h-12 text-[#556677] mx-auto mb-4" />
                    <p className="text-[#99aabb] text-sm mb-4">
                        {meta.emptyReason || "You've seen everything! Check back later for new recommendations."}
                    </p>
                    <div className="flex justify-center gap-3">
                        <Link
                            href="/settings"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-md text-xs font-medium text-[#99aabb] hover:text-white hover:border-white/20 transition-colors"
                        >
                            <Settings className="w-3.5 h-3.5" />
                            Update Services
                        </Link>
                        <Link
                            href="/discover"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-brand text-black rounded-md text-xs font-bold hover:bg-brand/90 transition-colors"
                        >
                            Explore
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <Feed id="stream-these" title={title} movies={movies} watchlistIds={watchlistIds} />
    );
}
