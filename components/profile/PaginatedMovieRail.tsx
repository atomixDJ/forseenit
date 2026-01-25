"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getTMDBImage } from "@/lib/tmdb";
import { Star, Plus, Loader2 } from "lucide-react";

interface Movie {
    id: number;
    title: string;
    posterPath?: string | null;
    rating?: number | null;
}

interface PaginatedMovieRailProps {
    title: string;
    subtitle?: string;
    initialMovies: Movie[];
    initialNextCursor: number | null;
    fetchAction: (limit: number, cursor: number) => Promise<{ items: Movie[], nextCursor: number | null }>;
}

export default function PaginatedMovieRail({
    title,
    subtitle,
    initialMovies,
    initialNextCursor,
    fetchAction
}: PaginatedMovieRailProps) {
    const [movies, setMovies] = useState(initialMovies);
    const [nextCursor, setNextCursor] = useState(initialNextCursor);
    const [isLoading, setIsLoading] = useState(false);

    const handleLoadMore = async () => {
        if (!nextCursor || isLoading) return;
        setIsLoading(true);
        try {
            const res = await fetchAction(20, nextCursor);
            setMovies(prev => [...prev, ...res.items]);
            setNextCursor(res.nextCursor);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    if (movies.length === 0 && !isLoading) return null;

    return (
        <section className="space-y-6">
            <div className="flex items-baseline justify-between">
                <div className="flex items-baseline gap-4">
                    <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase">
                        {title}
                    </h2>
                    {subtitle && (
                        <span className="text-sm font-bold text-[#556677] uppercase tracking-widest">
                            {subtitle}
                        </span>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-3">
                {movies.map((movie, idx) => (
                    <Link
                        key={`${movie.id}-${idx}`}
                        href={`/movie/${movie.id}`}
                        className="group relative aspect-[2/3] overflow-hidden rounded-[4px] border border-white/5 bg-[#1b2228] transition-all hover:scale-[1.03] hover:border-brand/40 hover:shadow-2xl"
                    >
                        {movie.posterPath ? (
                            <Image
                                src={getTMDBImage(movie.posterPath, 'w300')}
                                alt={movie.title}
                                fill
                                className="object-cover transition-transform group-hover:scale-110"
                                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 10vw"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                                <span className="text-[10px] font-bold text-[#556677] uppercase tracking-widest leading-tight line-clamp-3">
                                    {movie.title}
                                </span>
                            </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                            <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 fill-brand text-brand" />
                                <span className="text-[10px] font-black text-white tracking-widest uppercase font-mono">
                                    {movie.rating ? (movie.rating * 1).toFixed(1) : 'NR'}
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}

                {nextCursor && (
                    <button
                        onClick={handleLoadMore}
                        disabled={isLoading}
                        className="aspect-[2/3] flex flex-col items-center justify-center gap-3 rounded-[4px] border border-dashed border-white/10 bg-white/5 hover:bg-white/10 hover:border-brand/40 transition-all group cursor-pointer"
                    >
                        {isLoading ? (
                            <Loader2 className="w-6 h-6 text-brand animate-spin" />
                        ) : (
                            <Plus className="w-6 h-6 text-[#556677] group-hover:text-brand transition-colors" />
                        )}
                        <span className="text-[10px] font-black text-[#556677] group-hover:text-white uppercase tracking-widest">More</span>
                    </button>
                )}
            </div>
        </section>
    );
}
