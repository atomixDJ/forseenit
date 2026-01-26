"use client";

import Image from "next/image";
import Link from "next/link";
import { type Movie, getTMDBImage } from "@/lib/tmdb";
import { Star } from "lucide-react";

interface PosterCardProps {
    movie: Movie;
    priority?: boolean;
    streamingService?: string;
    awardStatus?: string;
    noLink?: boolean;
    userRating?: number | null;
    isAvailable?: boolean;
    className?: string;
    hideRatingUntilHover?: boolean;
}

export default function PosterCard({
    movie,
    priority = false,
    streamingService,
    awardStatus,
    noLink = false,
    userRating,
    isAvailable = false,
    className = "",
    hideRatingUntilHover = false
}: PosterCardProps) {
    // TMDB Trending movies don't have runtime or status in the list view data usually
    // but the getMovieDetails does.

    const content = (
        <div className={`movie-poster-frame shadow-md group-hover:shadow-brand/20 transition-all duration-300 ${noLink ? className : ""}`}>
            <Image
                src={getTMDBImage(movie.poster_path, 'w500')}
                fill
                alt={movie.title}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority={priority}
                sizes="(max-width: 768px) 140px, 180px"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" // Dark gray blur
            />

            {/* Badges Overlay */}
            <div className="absolute top-2 left-2 flex flex-col gap-1.5 z-10">
                {awardStatus && (
                    <div className="bg-brand text-black text-[8px] font-black px-1.5 py-0.5 rounded-[2px] tracking-tighter shadow-lg uppercase">
                        {awardStatus}
                    </div>
                )}
                {streamingService && (
                    <div className="bg-[#1b2228]/90 backdrop-blur-sm border border-white/10 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-[2px] tracking-tight shadow-lg uppercase">
                        {streamingService}
                    </div>
                )}
                {userRating && (
                    <div className={`bg-brand text-black text-[9px] font-black px-1.5 py-0.5 rounded-[2px] tracking-tighter shadow-lg flex items-center gap-0.5 transition-opacity ${hideRatingUntilHover ? 'opacity-0 group-hover:opacity-100' : ''}`}>
                        <span>{userRating.toFixed(1)}</span>
                        <Star className="w-2 h-2 fill-black" strokeWidth={3} />
                    </div>
                )}
                {isAvailable && (
                    <div className="bg-brand text-black text-[8px] font-black px-1.5 py-0.5 rounded-[2px] tracking-tighter shadow-lg uppercase">
                        Available
                    </div>
                )}
            </div>

            {/* Rating Badge */}
            {movie.vote_average > 0 && (
                <div className="absolute top-2 right-2 flex items-center gap-0.5 bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded-[2px] border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[9px] font-bold text-white">{(movie.vote_average).toFixed(1)}</span>
                    <Star className="h-2 w-2 fill-brand text-brand" />
                </div>
            )}

            {/* Hover Text Overlay */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-[10px] text-white font-bold uppercase tracking-wider text-left line-clamp-2 leading-tight">
                    {movie.title}
                </span>
                <span className="text-[9px] text-[#99aabb] font-bold mt-1 block">
                    {movie.release_date ? new Date(movie.release_date).getFullYear() : 'TBA'}
                </span>
            </div>
        </div>
    );

    if (noLink) {
        return content;
    }

    return (
        <Link
            href={`/movie/${movie.id}`}
            className={`block group w-full ${className}`}
        >
            {content}
        </Link>
    );
}
