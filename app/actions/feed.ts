"use server";

import { discoverMovies } from "@/lib/tmdb";
import { getUserSeenMovieIds } from "@/app/actions/interactions";
import { Movie } from "@/lib/tmdb";

// TMDb API limits pages to 1-500
const MIN_PAGE = 1;
const MAX_PAGE = 500;

// Valid feed IDs that support runtime pagination
const PAGINATABLE_FEEDS = new Set(["trending", "popular", "stream-these"]);

export interface LoadMoreResult {
    movies: Movie[];
    hasMore: boolean;
    error?: string;
}

/**
 * Load more movies for a specific feed.
 * 
 * Guardrails:
 * - Validates page is within TMDb limits (1-500)
 * - Only allows pagination for specific feed types (not seeded pages)
 * - Filters using canonical exclude set (watched OR rated OR favorited)
 * - Returns error message instead of throwing on failure
 */
export async function loadMoreMovies(
    feedId: string,
    page: number
): Promise<LoadMoreResult> {
    // Validate feed type - only allow runtime pagination for Home/Feed pages
    if (!PAGINATABLE_FEEDS.has(feedId)) {
        return {
            movies: [],
            hasMore: false,
            error: `Feed "${feedId}" does not support pagination`
        };
    }

    // Validate page number
    if (!Number.isInteger(page) || page < MIN_PAGE || page > MAX_PAGE) {
        return {
            movies: [],
            hasMore: false,
            error: `Invalid page number (must be ${MIN_PAGE}-${MAX_PAGE})`
        };
    }

    try {
        // Get user's seen movies (canonical: watched OR rated OR favorited)
        const seenIds = await getUserSeenMovieIds();
        const seenSet = new Set(seenIds);

        let data: { results: Movie[]; total_pages?: number };

        switch (feedId) {
            case "trending":
                data = await fetchTrendingPage(page);
                break;
            case "popular":
                data = await fetchNowPlayingPage(page);
                break;
            case "stream-these":
                data = await discoverMovies({ page });
                break;
            default:
                return { movies: [], hasMore: false, error: "Unknown feed" };
        }

        // Filter out already-seen movies
        const filtered = data.results.filter((m) => !seenSet.has(m.id));
        const hasMore = (data.total_pages ?? 1) > page && page < MAX_PAGE;

        return { movies: filtered, hasMore };

    } catch (err) {
        console.error(`[loadMoreMovies] Error for ${feedId} page ${page}:`, err);
        return {
            movies: [],
            hasMore: true, // Allow retry
            error: "Failed to load movies. Tap to retry."
        };
    }
}

// Helper to fetch trending with page parameter
async function fetchTrendingPage(page: number) {
    const API_KEY = process.env.TMDB_API_KEY;
    const res = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=en-US&page=${page}`,
        { next: { revalidate: 3600 } }
    );
    if (!res.ok) {
        throw new Error(`TMDb API error: ${res.status}`);
    }
    return res.json();
}

// Helper to fetch now playing with page parameter
async function fetchNowPlayingPage(page: number) {
    const API_KEY = process.env.TMDB_API_KEY;
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page}`,
        { next: { revalidate: 3600 } }
    );
    if (!res.ok) {
        throw new Error(`TMDb API error: ${res.status}`);
    }
    return res.json();
}
