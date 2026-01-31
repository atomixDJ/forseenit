/**
 * Server-side genre fetching for discovery filters.
 * 
 * This is the canonical source for genre data, used by:
 * - /discover page (server-side, passed to FilterBar)
 * - /api/genres route (client-accessible endpoint for Search modal)
 * 
 * Both surfaces receive the same normalized { id, name } shape.
 */

import type { Genre } from "./filters";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.TMDB_API_KEY;

interface TMDBGenreResponse {
    genres: Array<{ id: number; name: string }>;
}

/**
 * Fetch movie genres from TMDb.
 * Server-side only - uses Next.js fetch caching for 24 hours.
 * 
 * @returns Normalized array of { id, name } genres
 */
export async function getMovieGenres(): Promise<Genre[]> {
    if (!API_KEY) {
        console.warn("TMDB_API_KEY is not set");
        return [];
    }

    try {
        const res = await fetch(
            `${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`,
            {
                next: { revalidate: 86400 }, // Cache for 24 hours
            }
        );

        if (!res.ok) {
            throw new Error(`TMDB Error: ${res.status}`);
        }

        const data: TMDBGenreResponse = await res.json();

        // Normalize to { id, name } shape
        return data.genres.map(g => ({ id: g.id, name: g.name }));
    } catch (error) {
        console.error("Failed to fetch genres:", error);
        return [];
    }
}
