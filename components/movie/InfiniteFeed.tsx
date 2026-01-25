"use client";

import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { Movie, DiscoverParams } from "@/lib/tmdb";
import { getMoreMovies } from "@/app/actions/tmdb";
import PosterCard from "./PosterCard";
import { Loader2 } from "lucide-react";
interface InfiniteFeedProps {
    initialMovies: Movie[];
    params: DiscoverParams;
    seenIds?: number[];
}

export default function InfiniteFeed({ initialMovies, params, seenIds = [] }: InfiniteFeedProps) {
    const [movies, setMovies] = useState<Movie[]>(initialMovies);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    // Store seenIds in a ref for stable access in loadMore
    const seenSetRef = useRef(new Set(seenIds));

    // Listen for live interactions to update the seen set
    useEffect(() => {
        const handleInteraction = (e: any) => {
            if (e.detail?.movieId) {
                seenSetRef.current.add(e.detail.movieId);
            }
        };

        window.addEventListener('movieInteraction', handleInteraction);
        return () => window.removeEventListener('movieInteraction', handleInteraction);
    }, []);

    // Intersection Observer for the bottom of the feed
    const { ref, inView } = useInView({
        threshold: 0,
        rootMargin: "400px", // Load more before reaching the absolute bottom
    });

    // Reset when params change (filter update)
    useEffect(() => {
        setMovies(initialMovies);
        setPage(1);
        setHasMore(true);
    }, [initialMovies, params]);

    const loadMore = async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        const nextPage = page + 1;

        try {
            const result = await getMoreMovies({ ...params, page: nextPage });

            if (result.results.length === 0) {
                setHasMore(false);
            } else {
                // Append new movies, avoiding duplicates just in case
                setMovies(prev => {
                    const existingIds = new Set(prev.map(m => m.id));
                    const newMovies = result.results.filter(m =>
                        !existingIds.has(m.id) && !seenSetRef.current.has(m.id)
                    );
                    return [...prev, ...newMovies];
                });
                setPage(nextPage);
            }
        } catch (error) {
            console.error("Failed to load more movies:", error);
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (inView && hasMore && !loading) {
            loadMore();
        }
    }, [inView]);

    return (
        <div className="space-y-12">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6 md:gap-8 transition-all duration-500">
                {movies.map((movie) => (
                    <PosterCard key={movie.id} movie={movie} />
                ))}
            </div>

            {/* Loading Trigger & Indicator */}
            <div ref={ref} className="py-20 flex justify-center">
                {loading && (
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="h-8 w-8 text-brand animate-spin" />
                        <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#556677]">Loading More</span>
                    </div>
                )}
                {!hasMore && movies.length > 0 && (
                    <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#556677]">End of the line.</span>
                )}
            </div>
        </div>
    );
}
