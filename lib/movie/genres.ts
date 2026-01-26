export const GENRE_MAP: Record<number, string> = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western"
};

export function getGenreName(id: number): string {
    return GENRE_MAP[id] || "Unknown";
}

/**
 * Canonical top genre calculation.
 * 
 * @param genreIdLists - Array of comma-separated genre ID strings (e.g., "18,80" for Drama,Crime)
 *                       This matches the Movie.genreIds column format.
 * 
 * Returns:
 * - The dominant genre name if there's a clear winner
 * - "Mixed" only if there's an exact tie for #1 (top count equals runner-up count)
 * - null if insufficient data
 * 
 * Used by both Profile (analytics.ts) and Compare (compare.ts) for consistency.
 * After DB reset, run `npx tsx scripts/backfill-genre-ids.ts` to populate genreIds.
 */
export function getTopGenre(genreIdLists: (string | null)[]): string | null {
    const counts: Record<number, number> = {};

    genreIdLists.forEach(list => {
        if (!list) return;
        const ids = list.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id));
        ids.forEach(id => {
            counts[id] = (counts[id] || 0) + 1;
        });
    });

    // Sort genres by count descending
    const sorted = Object.entries(counts)
        .map(([id, count]) => ({ id: parseInt(id), count }))
        .sort((a, b) => b.count - a.count);

    if (sorted.length === 0) return null;
    if (sorted.length === 1) return getGenreName(sorted[0].id);

    const top = sorted[0];
    const runnerUp = sorted[1];

    // Only show "Mixed" on exact tie for #1
    if (top.count === runnerUp.count) {
        return "Mixed";
    }

    return getGenreName(top.id);
}
