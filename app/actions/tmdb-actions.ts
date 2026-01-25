"use server";

import { searchMovies } from "@/lib/tmdb";

/**
 * Server action wrapper for TMDb search to be used in client components.
 */
export async function searchMoviesAction(query: string) {
    return searchMovies(query);
}
