"use client";

import { useState, useEffect, useRef, useTransition } from "react";
import { Movie } from "@/lib/tmdb";
import PosterCard from "./PosterCard";
import { ChevronLeft, ChevronRight, LayoutGrid, LayoutList, Loader2 } from "lucide-react";
import { loadMoreMovies } from "@/app/actions/feed";

interface FeedProps {
    title: string;
    movies: Movie[];
    id: string; // Required for local storage persistence and pagination
    activeProviderIds?: number[];
    watchlistIds?: Set<number>; // For persistent watchlist badge
}

export default function Feed({ title, movies: initialMovies, id, activeProviderIds = [], watchlistIds }: FeedProps) {
    const [layout, setLayout] = useState<"grid" | "carousel">("grid");
    const [movies, setMovies] = useState(initialMovies);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const saved = localStorage.getItem(`feed-layout-${id}`);
        if (saved === "grid" || saved === "carousel") {
            setLayout(saved);
        }
    }, [id]);

    // Update movies when initialMovies changes (e.g., from server refresh)
    useEffect(() => {
        setMovies(initialMovies);
        setPage(1);
        setHasMore(true);
    }, [initialMovies]);

    const toggleLayout = () => {
        const next = layout === "grid" ? "carousel" : "grid";
        setLayout(next);
        localStorage.setItem(`feed-layout-${id}`, next);
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


    const handleLoadMore = () => {
        setError(null);
        startTransition(async () => {
            const nextPage = page + 1;
            const result = await loadMoreMovies(id, nextPage);

            if (result.error) {
                setError(result.error);
                return;
            }

            // Append new movies, avoiding duplicates
            const existingIds = new Set(movies.map(m => m.id));
            const newMovies = result.movies.filter(m => !existingIds.has(m.id));

            setMovies(prev => [...prev, ...newMovies]);
            setPage(nextPage);
            setHasMore(result.hasMore);
        });
    };

    if (!movies || movies.length === 0) return null;

    return (
        <section className="py-8">
            <div className="section-header flex items-center justify-between">
                <span>{title}</span>
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleLayout}
                        className="flex items-center gap-1.5 text-[10px] tracking-widest text-[#99aabb] hover:text-white transition-colors uppercase font-bold"
                    >
                        {layout === "grid" ? <LayoutList className="h-3 w-3" /> : <LayoutGrid className="h-3 w-3" />}
                        {layout === "grid" ? "Carousel View" : "Grid View"}
                    </button>
                    {(hasMore || error) && (
                        <button
                            onClick={handleLoadMore}
                            disabled={isPending}
                            className={`text-[10px] tracking-widest cursor-pointer hover:text-white transition-colors font-bold uppercase disabled:opacity-50 flex items-center gap-1 ${error ? 'text-red-400 hover:text-red-300' : 'text-[#99aabb]'}`}
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="h-3 w-3 animate-spin" />
                                    Loading
                                </>
                            ) : error ? (
                                "RETRY"
                            ) : (
                                "MORE"
                            )}
                        </button>
                    )}
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
                                    <PosterCard movie={movie} isWatchlist={watchlistIds?.has(movie.id)} />
                                </div>
                            ))}
                        </div>
                        {/* Custom Navigation Buttons */}
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
                            <PosterCard key={movie.id} movie={movie} isWatchlist={watchlistIds?.has(movie.id)} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
