"use server";

import { discoverMovies as tmdbDiscover, DiscoverParams } from "@/lib/tmdb";

/**
 * Server action to proxy discoverMovies requests.
 * This ensures the TMDB_API_KEY remains secure on the server.
 */
export async function getMoreMovies(params: DiscoverParams) {
    try {
        return await tmdbDiscover(params);
    } catch (error) {
        console.error("Discovery action failed:", error);
        throw error;
    }
}
