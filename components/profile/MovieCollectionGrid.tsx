import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getTMDBImage } from '@/lib/tmdb';
import { Star } from 'lucide-react';

interface Movie {
    id: number;
    title: string;
    poster_path?: string | null;
    posterPath?: string | null; // Support different data sources
    vote_average?: number;
    release_date?: string;
    releaseYear?: number;
}

interface MovieCollectionGridProps {
    title: string;
    subtitle?: string;
    movies: Movie[];
    limit?: number;
}

export default function MovieCollectionGrid({ title, subtitle, movies, limit = 10 }: MovieCollectionGridProps) {
    if (movies.length === 0) return null;

    const displayedMovies = movies.slice(0, limit);

    return (
        <section className="space-y-6">
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

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-10 gap-3">
                {displayedMovies.map((movie) => {
                    const poster = movie.poster_path || movie.posterPath;
                    return (
                        <Link
                            key={movie.id}
                            href={`/movie/${movie.id}`}
                            className="group relative aspect-[2/3] overflow-hidden rounded-[4px] border border-white/5 bg-[#1b2228] transition-all hover:scale-[1.03] hover:border-brand/40 hover:shadow-2xl"
                        >
                            {poster ? (
                                <Image
                                    src={getTMDBImage(poster, 'w300')}
                                    alt={movie.title}
                                    fill
                                    className="object-cover transition-transform group-hover:scale-110"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                                    <span className="text-[10px] font-bold text-[#556677] uppercase tracking-widest leading-tight">
                                        {movie.title}
                                    </span>
                                </div>
                            )}

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                                <div className="flex items-center gap-1">
                                    <Star className="w-3 h-3 fill-brand text-brand" />
                                    <span className="text-[10px] font-black text-white tracking-widest uppercase">
                                        {movie.vote_average?.toFixed(1) || 'NR'}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
