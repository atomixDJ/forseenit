"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { getTMDBImage } from "@/lib/tmdb";
import { Shuffle, X, ChevronDown, ChevronUp, History } from "lucide-react";
import { cn } from "@/lib/utils";
import AltOptionThumb from "./AltOptionThumb";
import {
    randomizeWhatToWatch,
    resetWhatToWatch,
    promoteAlt,
    type MovieWithReasons,
    type ActiveSessionDTO
} from "@/app/actions/what-to-watch";
import { useRouter } from "next/navigation";

interface WhatToWatchRailProps {
    session: ActiveSessionDTO;
}

/**
 * Persistent rail showing the generated hero movie and alternative options.
 * Gold treatment, controls for randomize/reset, collapsible alts drawer.
 */
export default function WhatToWatchRail({ session }: WhatToWatchRailProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [showAlts, setShowAlts] = useState(false);

    const { hero, alts, sessionId, mode, partnerName, resultId } = session;

    const handleRandomize = () => {
        startTransition(async () => {
            await randomizeWhatToWatch();
            router.refresh();
        });
    };

    const handleReset = () => {
        startTransition(async () => {
            await resetWhatToWatch();
            router.refresh();
        });
    };

    const handlePromoteAlt = (altIndex: 1 | 2 | 3) => {
        if (!resultId) return;
        startTransition(async () => {
            await promoteAlt(resultId, altIndex);
            router.refresh();
        });
    };

    // Dynamic title
    const displayTitle = mode === "with_someone" && partnerName
        ? `You + ${partnerName.toUpperCase()}`
        : "JUST YOU";

    if (!hero) {
        return (
            <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-900/30 to-orange-900/30 border border-amber-500/20">
                <p className="text-amber-200/80 text-center">Generating your recommendation...</p>
            </div>
        );
    }

    return (
        <section className="rounded-2xl overflow-hidden bg-gradient-to-br from-amber-900/40 via-[#1a1510] to-orange-900/20 border border-amber-500/30">
            {/* Header */}
            <div className="px-6 py-4 flex items-center justify-between border-b border-amber-500/20">
                <div>
                    <p className="text-amber-400 text-[10px] font-black uppercase tracking-[0.3em] mb-1">{displayTitle}</p>
                    <h2 className="text-2xl md:text-3xl font-black text-white italic uppercase tracking-tighter">What to Watch</h2>
                </div>
                <button
                    type="button"
                    onClick={handleReset}
                    disabled={isPending}
                    className="p-2 text-amber-300/60 hover:text-amber-300 hover:bg-amber-500/10 
                               rounded-lg transition-colors disabled:opacity-50"
                    title="Reset"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Hero section */}
            <div className="p-6">
                <div className="flex gap-5">
                    {/* Hero poster */}
                    <Link
                        href={`/movie/${hero.id}`}
                        className="relative w-32 h-48 flex-shrink-0 rounded-lg overflow-hidden 
                                   ring-2 ring-amber-400/50 hover:ring-amber-400 transition-all"
                    >
                        {hero.posterPath ? (
                            <Image
                                src={getTMDBImage(hero.posterPath, "w342")}
                                alt={hero.title}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-[#1b2228] flex items-center justify-center">
                                <span className="text-white/50 text-sm text-center px-2">{hero.title}</span>
                            </div>
                        )}
                    </Link>

                    {/* Hero details */}
                    <div className="flex-1 min-w-0">
                        <Link href={`/movie/${hero.id}`} className="block group">
                            <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter group-hover:text-amber-300 transition-colors truncate">
                                {hero.title}
                            </h3>
                            {hero.year && (
                                <p className="text-amber-300/60 text-sm">{hero.year}</p>
                            )}
                        </Link>

                        {/* Reasons */}
                        {hero.reasons.length > 0 && (
                            <ul className="mt-3 space-y-1">
                                {hero.reasons.slice(0, 3).map((reason, i) => (
                                    <li key={i} className="text-[#99aabb] text-sm flex items-start gap-2">
                                        <span className="text-amber-400 mt-0.5">✓</span>
                                        {reason}
                                    </li>
                                ))}
                            </ul>
                        )}

                        {/* Controls */}
                        <div className="mt-4 flex gap-3">
                            <button
                                type="button"
                                onClick={handleRandomize}
                                disabled={isPending}
                                className={cn(
                                    "px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all",
                                    "bg-amber-500/20 text-amber-300 border border-amber-500/30",
                                    "hover:bg-amber-500/30 disabled:opacity-50"
                                )}
                            >
                                <Shuffle className={cn("w-4 h-4", isPending && "animate-spin")} />
                                {isPending ? "Finding..." : "Shuffle"}
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowAlts(!showAlts)}
                                className="px-4 py-2 rounded-lg font-medium flex items-center gap-2 
                                           bg-white/5 text-white/80 border border-white/10
                                           hover:bg-white/10 transition-all"
                            >
                                {showAlts ? (
                                    <>
                                        <ChevronUp className="w-4 h-4" />
                                        Hide options
                                    </>
                                ) : (
                                    <>
                                        <ChevronDown className="w-4 h-4" />
                                        More options
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Alts drawer */}
                {showAlts && alts.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-amber-500/20">
                        <p className="text-[#99aabb] text-xs uppercase tracking-wider mb-3">
                            Alternative picks
                        </p>
                        <div className="flex gap-4">
                            {alts.map((alt, i) => (
                                <AltOptionThumb
                                    key={alt.id}
                                    id={alt.id}
                                    title={alt.title}
                                    posterPath={alt.posterPath}
                                    reasons={alt.reasons}
                                    onSelect={() => handlePromoteAlt((i + 1) as 1 | 2 | 3)}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
