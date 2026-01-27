"use client";

import { useEffect, useState } from "react";
import PosterCard from "@/components/movie/PosterCard";
import { ComparisonResult } from "@/app/actions/compare";
import { Star, Trophy, Clock } from "lucide-react";

interface ComparePanelsProps {
    result: ComparisonResult;
    watchlistIds?: Set<number>;
}

export default function ComparePanels({ result, watchlistIds }: ComparePanelsProps) {
    const [reveal, setReveal] = useState(false);

    useEffect(() => {
        // Trigger reveal after a tiny mount delay to ensure CSS transitions play
        const timer = setTimeout(() => setReveal(true), 50);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="space-y-24">
            <CompareTopTen result={result} reveal={reveal} watchlistIds={watchlistIds} />
            <CompareTasteSync result={result} reveal={reveal} watchlistIds={watchlistIds} />
            <CompareRecent result={result} reveal={reveal} watchlistIds={watchlistIds} />
        </div>
    );
}

function CompareTopTen({ result, reveal, watchlistIds }: { result: ComparisonResult, reveal: boolean, watchlistIds?: Set<number> }) {
    const { self, peer, overlaps, movieMap } = result;

    return (
        <section className={`compare-panel stagger-1 ${reveal ? 'reveal' : ''}`}>
            <SectionHeader title="Top Ten Shelves" icon={<Trophy className="w-4 h-4" />} count={overlaps.topTen.length} label="Matches" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 relative">
                <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px bg-white/5 -translate-x-1/2" />

                <Shelf items={self.topTen} shared={overlaps.topTen} movieMap={movieMap} ratingMap={self.ratingMap} watchlistIds={watchlistIds} />
                <Shelf items={peer.topTen} shared={overlaps.topTen} movieMap={movieMap} ratingMap={peer.ratingMap} watchlistIds={watchlistIds} />
            </div>
        </section>
    );
}

function CompareTasteSync({ result, reveal, watchlistIds }: { result: ComparisonResult, reveal: boolean, watchlistIds?: Set<number> }) {
    const { self, overlaps, movieMap } = result;

    const syncLevels = [
        { label: "5.0 Masterpieces", ids: overlaps.highRatings["5.0"], color: "text-[#00e054]" },
        { label: "4.5+ Favorites", ids: overlaps.highRatings["4.5"], color: "text-[#40bcf4]" },
        { label: "4.0+ Strong Sync", ids: overlaps.highRatings["4.0"], color: "text-[#ff8000]" }
    ];

    const hasAnySync = syncLevels.some(l => l.ids.length > 0);

    if (!hasAnySync) return null;

    return (
        <section className={`compare-panel stagger-2 ${reveal ? 'reveal' : ''}`}>
            <SectionHeader title="Taste Sync Overlaps" icon={<Star className="w-4 h-4" />} />

            <div className="space-y-8">
                {syncLevels.map((level) => (
                    level.ids.length > 0 && (
                        <div key={level.label} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
                            <div className="flex items-center justify-center gap-4 mb-6">
                                <h4 className={`text-[10px] font-black uppercase tracking-[0.2em] ${level.color}`}>{level.label}</h4>
                                <div className="text-[#445566] text-[10px] font-bold uppercase tracking-widest">{level.ids.length} Shared</div>
                            </div>
                            <div className="flex gap-4 justify-center flex-wrap">
                                {level.ids.map(id => (
                                    <div key={id} className="w-24">
                                        <PosterItem id={id} movie={movieMap[id]} rating={self.ratingMap[id]} linkable isWatchlist={watchlistIds?.has(id)} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                ))}
            </div>
        </section>
    );
}

function CompareRecent({ result, reveal, watchlistIds }: { result: ComparisonResult, reveal: boolean, watchlistIds?: Set<number> }) {
    const { self, peer, movieMap } = result;

    return (
        <section className={`compare-panel stagger-3 ${reveal ? 'reveal' : ''}`}>
            <SectionHeader title="Recent Activity" icon={<Clock className="w-4 h-4" />} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 relative">
                <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px bg-white/5 -translate-x-1/2" />
                <RecentGrid recent={self.recent} movieMap={movieMap} watchlistIds={watchlistIds} />
                <RecentGrid recent={peer.recent} movieMap={movieMap} watchlistIds={watchlistIds} />
            </div>
        </section>
    );
}

// Sub-components
function SectionHeader({ title, icon, count, label }: { title: string, icon: any, count?: number, label?: string }) {
    return (
        <header className="flex justify-between items-center border-b border-white/5 pb-4 mb-8">
            <div className="flex items-center gap-3">
                <span className="text-brand">{icon}</span>
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#667788]">{title}</h3>
            </div>
            {count !== undefined && (
                <div className="text-white font-black text-[10px] uppercase italic tracking-tight bg-white/5 px-2.5 py-1 rounded flex items-center gap-2">
                    <span className="text-brand">{count}</span>
                    <span className="opacity-40">{label}</span>
                </div>
            )}
        </header>
    );
}

function Shelf({ items, shared, movieMap, ratingMap, watchlistIds }: { items: number[], shared: number[], movieMap: any, ratingMap: Record<number, number>, watchlistIds?: Set<number> }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {items.map(id => {
                const isShared = shared.includes(id);
                return (
                    <div key={id} className={`transition-all duration-500 ${!isShared ? 'opacity-20 grayscale scale-90 blur-[1px]' : 'scale-105 z-10'}`}>
                        <PosterItem
                            id={id}
                            movie={movieMap[id]}
                            rating={ratingMap[id]}
                            className={isShared ? "border-2 border-brand shadow-[0_0_15px_rgba(0,224,84,0.4)]" : ""}
                            linkable
                            isWatchlist={watchlistIds?.has(id)}
                        />
                    </div>
                );
            })}
            {items.length === 0 && <div className="col-span-full py-8 text-center text-[#445566] text-xs font-medium italic bg-white/[0.02] rounded-xl border border-dashed border-white/5">Shelf is empty</div>}
        </div>
    );
}

function RecentGrid({ recent, movieMap, watchlistIds }: { recent: any[], movieMap: any, watchlistIds?: Set<number> }) {
    return (
        <div className="grid grid-cols-3 gap-3">
            {recent.map((r: any) => (
                <div key={r.tmdbId} className="relative group">
                    <PosterItem id={r.tmdbId} movie={movieMap[r.tmdbId]} rating={r.ratingHalf / 2} isWatchlist={watchlistIds?.has(r.tmdbId)} />
                </div>
            ))}
            {recent.length === 0 && <div className="col-span-full py-8 text-center text-[#445566] text-xs font-medium italic bg-white/[0.02] rounded-xl border border-dashed border-white/5">No recent ratings</div>}
        </div>
    );
}

function PosterItem({ id, movie, rating, className = "", linkable = false, isWatchlist = false }: { id: number, movie: any, rating?: number, className?: string, linkable?: boolean, isWatchlist?: boolean }) {
    if (!movie) return <div className={`aspect-[2/3] bg-white/5 rounded-lg shimmer ${className}`} />;

    // Construct a Movie-like object for PosterCard
    const movieObj: any = {
        id: id,
        title: movie.title,
        poster_path: movie.posterPath,
        vote_average: 0
    };

    // New PosterCard always hides ratings until hover by design
    return <PosterCard movie={movieObj} userRating={rating} className={className} noLink={!linkable} isWatchlist={isWatchlist} />;
}
