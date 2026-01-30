"use client";

import { Movie } from "@/lib/tmdb";
import PosterCard from "@/components/movie/PosterCard";
import { ChevronLeft, ChevronRight, LayoutGrid, LayoutList, Eye, Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface WatchlistRailProps {
    movies: Movie[];
    userRatings: Record<number, number | null>;
}

/**
 * Watchlist rail for home page - shows user's saved movies.
 * Includes empty state with CTA to discover/search.
 */
export default function WatchlistRail({ movies, userRatings }: WatchlistRailProps) {
    const [layout, setLayout] = useState<"grid" | "carousel">("grid");
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const saved = localStorage.getItem("feed-layout-watchlist-rail");
        if (saved === "grid" || saved === "carousel") {
            setLayout(saved);
        }
    }, []);

    const toggleLayout = () => {
        const next = layout === "grid" ? "carousel" : "grid";
        setLayout(next);
        localStorage.setItem("feed-layout-watchlist-rail", next);
    };

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === "left"
                ? scrollLeft - clientWidth * 0.8
                : scrollLeft + clientWidth * 0.8;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    // Empty state
    if (movies.length === 0) {
        return (
            <section className="py-10">
                <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                    <div>
                        <h2 className="text-lg md:text-xl font-black text-white italic uppercase tracking-tighter">
                            Your Watchlist
                        </h2>
                        <p className="text-xs text-[#667788] mt-1">Saved for later</p>
                    </div>
                </div>
                <div className="bg-[#1b2228]/50 border border-white/5 rounded-xl p-8 text-center">
                    <Eye className="w-12 h-12 text-[#556677] mx-auto mb-4" />
                    <p className="text-[#99aabb] text-sm mb-2">
                        Your watchlist is empty
                    </p>
                    <p className="text-[#667788] text-xs mb-6">
                        Add movies from any poster to save them for later
                    </p>
                    <div className="flex justify-center gap-3">
                        <Link
                            href="/discover"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-brand text-black rounded-md text-xs font-bold hover:bg-brand/90 transition-colors"
                        >
                            Discover Movies
                        </Link>
                        <Link
                            href="/?search=open"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-md text-xs font-medium text-[#99aabb] hover:text-white hover:border-white/20 transition-colors"
                        >
                            <Search className="w-3.5 h-3.5" />
                            Search
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-10">
            <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                <div>
                    <h2 className="text-lg md:text-xl font-black text-white italic uppercase tracking-tighter">
                        Your Watchlist
                    </h2>
                    <p className="text-xs text-[#667788] mt-1">Saved for later</p>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleLayout}
                        className="flex items-center gap-1.5 text-[10px] tracking-widest text-[#99aabb] hover:text-white transition-colors uppercase font-bold"
                    >
                        {layout === "grid" ? <LayoutList className="h-3 w-3" /> : <LayoutGrid className="h-3 w-3" />}
                        {layout === "grid" ? "Carousel View" : "Grid View"}
                    </button>
                    <Link
                        href="/watchlist"
                        className="text-[10px] tracking-widest text-brand hover:text-white transition-colors font-bold uppercase"
                    >
                        View All
                    </Link>
                </div>
            </div>

            <div className="relative">
                {layout === "carousel" ? (
                    <div className="relative group/carousel">
                        <div
                            ref={scrollRef}
                            className="flex gap-4 md:gap-5 overflow-x-auto pb-6 scrollbar-hide snap-x scroll-smooth"
                        >
                            {movies.map((movie) => (
                                <div key={movie.id} className="snap-start flex-shrink-0 w-[140px] md:w-[180px]">
                                    <PosterCard
                                        movie={movie}
                                        isWatchlist={true}
                                        userRating={userRatings[movie.id] != null ? userRatings[movie.id]! / 2 : undefined}
                                    />
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => scroll("left")}
                            className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-10 h-10 bg-black/80 rounded-full flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity border border-white/10 text-white z-20 hover:scale-110 active:scale-95"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-10 h-10 bg-black/80 rounded-full flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity border border-white/10 text-white z-20 hover:scale-110 active:scale-95"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8 transition-all duration-500">
                        {movies.map((movie) => (
                            <PosterCard
                                key={movie.id}
                                movie={movie}
                                isWatchlist={true}
                                userRating={userRatings[movie.id] != null ? userRatings[movie.id]! / 2 : undefined}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
