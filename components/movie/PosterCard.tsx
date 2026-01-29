"use client";

import Image from "next/image";
import Link from "next/link";
import { type Movie, getTMDBImage } from "@/lib/tmdb";
import { Star, Tv2, CircleDot } from "lucide-react";

/**
 * Badge Layout Rules:
 * 
 * TOP-LEFT (persistent, stacked vertically):
 *   1. Watchlist badge (blue bookmark ribbon) - always visible if in watchlist
 *   2. System/Foreseenit badge (orange half-circle) - curated lists, official content
 * 
 * TOP-RIGHT (hover/focus only, single badge):
 *   - If user has rated: yellow badge + star + user rating
 *   - Else if TMDb rating: green badge + film icon + TMDb score
 * 
 * Max 2 badges top-left to prevent clutter.
 */

interface PosterCardProps {
    movie: Movie;
    priority?: boolean;
    noLink?: boolean;
    className?: string;
    // User state
    isWatchlist?: boolean;      // Blue bookmark ribbon (persistent)
    userRating?: number | null; // Yellow star badge (hover)
    tmdbScore?: number;         // Explicit TMDb score override
    // System state
    isSystem?: boolean;         // Orange Foreseenit badge (persistent)
    systemLabel?: string;       // e.g., "Curated", "Official", rank number
}

export default function PosterCard({
    movie,
    priority = false,
    noLink = false,
    className = "",
    isWatchlist = false,
    userRating,
    tmdbScore,
    isSystem = false,
    systemLabel
}: PosterCardProps) {

    // ─────────────────────────────────────────────────────────────────────────
    // Top-Left Badges (persistent, stacked)
    // ─────────────────────────────────────────────────────────────────────────

    // Watchlist bookmark ribbon (rendered separately - needs top-0 positioning)
    const watchlistBookmark = isWatchlist ? (
        <div
            className="absolute top-0 left-2 z-10"
            title="In your Watchlist"
        >
            {/* Bookmark ribbon with folded corner */}
            <svg width="20" height="32" viewBox="0 0 20 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Main bookmark body */}
                <path
                    d="M0 0H20V28L16 24L10 32L10 28H0V0Z"
                    fill="#3B82F6"
                />
                {/* Folded corner at bottom-right */}
                <path
                    d="M20 24V28L16 24H20Z"
                    fill="#1D4ED8"
                />
                {/* White star near bottom center */}
                <path
                    d="M10 12L11.5 16.5L16 17L12.5 20L13.5 24.5L10 22L6.5 24.5L7.5 20L4 17L8.5 16.5L10 12Z"
                    fill="white"
                />
            </svg>
        </div>
    ) : null;

    // Other top-left badges (positioned below the bookmark)
    const topLeftBadges: React.ReactNode[] = [];

    // System/Foreseenit badge (orange with half-circle mark)
    if (isSystem) {
        topLeftBadges.push(
            <div
                key="system"
                className="bg-orange-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-[2px] tracking-tighter shadow-lg flex items-center gap-0.5 uppercase"
                title="Foreseenit Curated"
            >
                <CircleDot className="w-2.5 h-2.5" strokeWidth={2.5} />
                {systemLabel && <span>{systemLabel}</span>}
            </div>
        );
    }

    // Top-Right Rating Badge (hover/focus only, single badge)
    // ─────────────────────────────────────────────────────────────────────────
    const hasUserRating = userRating !== null && userRating !== undefined;
    const effectiveTmdbScore = tmdbScore ?? movie.vote_average;
    const hasTmdbRating = effectiveTmdbScore > 0;

    let ratingBadge: React.ReactNode = null;

    if (hasUserRating) {
        // Yellow badge with star for user rating
        ratingBadge = (
            <div className="absolute top-2 right-2 flex items-center gap-0.5 bg-yellow-400 text-black px-1.5 py-0.5 rounded-[2px] shadow-lg opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200 z-10">
                <span className="text-[9px] font-black">{userRating.toFixed(1)}</span>
                <Star className="h-2.5 w-2.5 fill-black" strokeWidth={2.5} />
            </div>
        );
    } else if (hasTmdbRating) {
        // Green badge with film icon for TMDb rating
        ratingBadge = (
            <div className="absolute top-2 right-2 flex items-center gap-0.5 bg-emerald-500 text-white px-1.5 py-0.5 rounded-[2px] shadow-lg opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200 z-10">
                <span className="text-[9px] font-bold">{effectiveTmdbScore.toFixed(1)}</span>
                <Tv2 className="h-2.5 w-2.5" strokeWidth={2} />
            </div>
        );
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Render
    // ─────────────────────────────────────────────────────────────────────────
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
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
            />

            {/* Watchlist Bookmark Ribbon (persistent, extends to top) */}
            {watchlistBookmark}

            {/* Other Top-Left Badges (persistent) */}
            {topLeftBadges.length > 0 && (
                <div className={`absolute left-2 flex flex-col gap-1 z-10 ${isWatchlist ? 'top-10' : 'top-2'}`}>
                    {topLeftBadges}
                </div>
            )}

            {/* Top-Right Rating Badge (hover/focus only) */}
            {ratingBadge}

            {/* Hover Text Overlay */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3 translate-y-2 group-hover:translate-y-0 group-focus-visible:translate-y-0 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-all duration-300">
                <span className="text-[10px] text-white font-bold uppercase tracking-wider text-left line-clamp-2 leading-tight">
                    {movie.title}
                </span>
                <span className="text-[9px] text-[#99aabb] font-bold mt-1 block">
                    {movie.release_date ? new Date(movie.release_date).getFullYear() : '—'}
                </span>
            </div>
        </div>
    );

    if (noLink) {
        // Wrap in group div to enable group-hover/focus states
        return <div className={`group w-full ${className}`}>{content}</div>;
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
