/**
 * Unified Discovery Filters
 * 
 * Central source of truth for all filter definitions used by:
 * - /discover page (full power filters)
 * - Search modal (compact filters)
 * - What to Watch Tonight engine (future)
 * 
 * FILTER COMBINATION SEMANTICS:
 * When applying filters server-side, combine with AND logic:
 * genre AND decade AND rating AND mood AND length AND providers
 * 
 * MOOD vs GENRE:
 * - `genreId` is a single user-selected genre (e.g., "Action")
 * - `moodKey` maps to multiple genres via MOODS[].genreIds (e.g., "uplifting" → Comedy, Animation, Family)
 * - Both are sent to TMDb as `with_genres`; if both set, combine with comma (AND in TMDb logic)
 */

// =============================================================================
// TYPES
// =============================================================================

export interface DiscoveryFilters {
    genreId: number | null;
    decadeKey: string | null;       // "2020s" | "2010s" | "2000s" | "1990s" | "1980s" | "classic"
    minRating: number | null;       // 9, 8, 7, 6
    moodKey: string | null;         // "uplifting" | "dark" | "epic" | "thoughtful" | "intense"
    lengthKey: string | null;       // "short" | "standard" | "long"
    streamingProviderIds: number[]; // TMDb provider IDs
}

export interface Genre {
    id: number;
    name: string;
}

// =============================================================================
// CONSTANTS
// =============================================================================

/**
 * Decade options with explicit year ranges for TMDb query.
 * Maps to `primary_release_date.gte` and `primary_release_date.lte`.
 */
export const DECADES = [
    { key: "2020s", label: "2020s", minYear: 2020, maxYear: 2029 },
    { key: "2010s", label: "2010s", minYear: 2010, maxYear: 2019 },
    { key: "2000s", label: "2000s", minYear: 2000, maxYear: 2009 },
    { key: "1990s", label: "1990s", minYear: 1990, maxYear: 1999 },
    { key: "1980s", label: "1980s", minYear: 1980, maxYear: 1989 },
    { key: "classic", label: "Classic", minYear: null, maxYear: 1979 },
] as const;

export type DecadeKey = typeof DECADES[number]["key"];

/**
 * Rating filter options.
 * Maps to `vote_average.gte` in TMDb query.
 */
export const RATINGS = [
    { key: 9, label: "9+" },
    { key: 8, label: "8+" },
    { key: 7, label: "7+" },
    { key: 6, label: "6+" },
] as const;

/**
 * Mood definitions with mapped genre IDs.
 * Genre IDs are TMDb IDs combined with comma for `with_genres` param.
 * These are ADDITIONAL genre constraints layered on top of any explicit genreId.
 */
export const MOODS = [
    { key: "uplifting", label: "Uplifting", icon: "Smile", genreIds: "35,16,10751" },
    { key: "dark", label: "Dark", icon: "Moon", genreIds: "27,53,80" },
    { key: "epic", label: "Epic", icon: "Rocket", genreIds: "12,878,14" },
    { key: "thoughtful", label: "Thoughtful", icon: "Brain", genreIds: "9648,18,99" },
    { key: "intense", label: "Intense", icon: "Flame", genreIds: "28,10752,53" },
] as const;

export type MoodKey = typeof MOODS[number]["key"];

/**
 * Length/runtime filter options.
 * Maps to `with_runtime.gte` and `with_runtime.lte` in TMDb query.
 * Separate axis from decade (decade = release year, length = runtime minutes).
 */
export const LENGTHS = [
    { key: "short", label: "< 90m", minRuntime: undefined, maxRuntime: 90 },
    { key: "standard", label: "90-120m", minRuntime: 90, maxRuntime: 120 },
    { key: "long", label: "> 120m", minRuntime: 120, maxRuntime: undefined },
] as const;

export type LengthKey = typeof LENGTHS[number]["key"];

/**
 * Streaming provider options.
 * IDs MUST match TMDb provider IDs exactly for `with_watch_providers` param.
 * logo_path values are from TMDb's watch provider API (providers.json).
 */
export const PROVIDERS = [
    { id: 8, name: "Netflix", logo_path: "/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg" },
    { id: 337, name: "Disney+", logo_path: "/97yvRBw1GzX7fXprcF80er19ot.jpg" },
    { id: 1899, name: "Max", logo_path: "/jbe4gVSfRlbPTdESXhEKpornsfu.jpg" },
    { id: 9, name: "Prime", logo_path: "/pvske1MyAoymrs5bguRfVqYiM9a.jpg" },
    { id: 350, name: "Apple TV", logo_path: "/mcbz1LgtErU9p4UdbZ0rG6RTWHX.jpg" },
] as const;

/**
 * Default empty filter state.
 */
export const EMPTY_FILTERS: DiscoveryFilters = {
    genreId: null,
    decadeKey: null,
    minRating: null,
    moodKey: null,
    lengthKey: null,
    streamingProviderIds: [],
};

// =============================================================================
// HELPERS
// =============================================================================

/**
 * Get TMDb date range params for a decade key.
 * Returns { gte, lte } where values are YYYY-MM-DD strings or undefined.
 */
export function getDecadeYearRange(key: string | null): { gte?: string; lte?: string } {
    if (!key) return {};
    const decade = DECADES.find(d => d.key === key);
    if (!decade) return {};
    return {
        gte: decade.minYear ? `${decade.minYear}-01-01` : undefined,
        lte: `${decade.maxYear}-12-31`,
    };
}

/**
 * Get runtime range params for a length key.
 * Returns { min, max } where values are numbers or undefined.
 */
export function getLengthRuntimeRange(key: string | null): { min?: number; max?: number } {
    if (!key) return {};
    const length = LENGTHS.find(l => l.key === key);
    if (!length) return {};
    return {
        min: length.minRuntime,
        max: length.maxRuntime,
    };
}

/**
 * Get genre IDs string for a mood key.
 */
export function getMoodGenreIds(key: string | null): string | undefined {
    if (!key) return undefined;
    const mood = MOODS.find(m => m.key === key);
    return mood?.genreIds;
}

/**
 * Parse DiscoveryFilters from URL search params.
 */
export function parseFiltersFromParams(params: URLSearchParams): DiscoveryFilters {
    const providerStr = params.get("providers");
    return {
        genreId: params.get("genre") ? parseInt(params.get("genre")!, 10) : null,
        decadeKey: params.get("decade"),
        minRating: params.get("rating") ? parseInt(params.get("rating")!, 10) : null,
        moodKey: params.get("mood"),
        lengthKey: params.get("length"),
        streamingProviderIds: providerStr
            ? providerStr.split(",").map(Number).filter(n => !isNaN(n) && n > 0)
            : [],
    };
}

/**
 * Serialize DiscoveryFilters to URL search params.
 * Only includes non-empty values.
 */
export function filtersToParams(filters: DiscoveryFilters): URLSearchParams {
    const params = new URLSearchParams();
    if (filters.genreId !== null) params.set("genre", filters.genreId.toString());
    if (filters.decadeKey) params.set("decade", filters.decadeKey);
    if (filters.minRating !== null) params.set("rating", filters.minRating.toString());
    if (filters.moodKey) params.set("mood", filters.moodKey);
    if (filters.lengthKey) params.set("length", filters.lengthKey);
    if (filters.streamingProviderIds.length > 0) {
        params.set("providers", filters.streamingProviderIds.join(","));
    }
    return params;
}

/**
 * Check if any filters are active.
 */
export function hasActiveFilters(filters: DiscoveryFilters): boolean {
    return (
        filters.genreId !== null ||
        filters.decadeKey !== null ||
        filters.minRating !== null ||
        filters.moodKey !== null ||
        filters.lengthKey !== null ||
        filters.streamingProviderIds.length > 0
    );
}
