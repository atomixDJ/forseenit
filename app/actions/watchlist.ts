"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function toggleWatchlist(movie: {
    id: number;
    title: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_year?: number;
}) {
    const supabase = await createClient();

    // 1. Get User
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: "Unauthorized" };
    }

    // 2. Find User's "Watchlist" Collection
    let { data: watchlist } = await supabase
        .from("collections")
        .select("id")
        .eq("user_id", user.id)
        .eq("type", "user")
        .eq("title", "Watchlist")
        .single();

    // If not exists, create it
    if (!watchlist) {
        const { data: newCollection, error: createError } = await supabase
            .from("collections")
            .insert({
                title: "Watchlist",
                type: "user",
                user_id: user.id
            })
            .select()
            .single();

        if (createError) {
            console.error("Error creating watchlist:", createError);
            return { error: "Failed to create watchlist" };
        }
        watchlist = newCollection;
    }

    // Guard check
    if (!watchlist?.id) {
        return { error: "Failed to resolve watchlist ID" };
    }

    // 3. Ensure Movie Exists in `movies` table
    const { data: existingMovie } = await supabase
        .from("movies")
        .select("id")
        .eq("tmdb_id", movie.id)
        .single();

    let movieUuid = existingMovie?.id;

    if (!existingMovie) {
        const { data: newMovie, error: movieError } = await supabase
            .from("movies")
            .insert({
                tmdb_id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
                backdrop_path: movie.backdrop_path,
                release_year: movie.release_year
            })
            .select()
            .single();

        if (movieError) {
            console.error("Error inserting movie:", movieError);
            return { error: "Failed to track movie" };
        }
        movieUuid = newMovie.id;
    }

    // 4. Toggle Item in Collection
    const { data: existingItem } = await supabase
        .from("collection_items")
        .select("*")
        .eq("collection_id", watchlist.id)
        .eq("movie_id", movieUuid)
        .single();

    if (existingItem) {
        // Remove
        await supabase
            .from("collection_items")
            .delete()
            .eq("collection_id", watchlist.id)
            .eq("movie_id", movieUuid);

        revalidatePath(`/movie/${movie.id}`);
        return { added: false };
    } else {
        // Add
        await supabase
            .from("collection_items")
            .insert({
                collection_id: watchlist.id,
                movie_id: movieUuid,
                rank: 0,
            });

        revalidatePath(`/movie/${movie.id}`);
        return { added: true };
    }
}

export async function getWatchlistStatus(tmdbId: number) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { count } = await supabase
        .from("collection_items")
        .select(`
            id,
            collections!inner(user_id),
            movies!inner(tmdb_id)
        `, { count: 'exact', head: true })
        .eq("collections.user_id", user.id)
        .eq("movies.tmdb_id", tmdbId);

    return (count || 0) > 0;
}
