const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.TMDB_API_KEY;

type TMDBImageSize = 'w300' | 'w500' | 'w780' | 'w1280' | 'original';

export function getTMDBImage(path: string | null, size: TMDBImageSize = 'w780') {
    if (!path) return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9Ijc1MCIgdmlld0JveD0iMCAwIDUwMCA3NTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjUwMCIgaGVpZ2h0PSI3NTAiIGZpbGw9IiMxYTIyMjgiLz48cGF0aCBkPSJNMjUwIDMwMExDMjUwIDMwMCAyMjUgMzUwIDIwMCAzNTBDMTc1IDM1MCAxNzUgMzAwIDE3NSAzMDBMMjUwIDMwMFoiIGZpbGw9IiMzMzQ0NTUiLz48L3N2Zz4='; // Dark slate premium placeholder
    return `https://image.tmdb.org/t/p/${size}${path}`;
}

async function fetchTMDB<T>(path: string, params: Record<string, string> = {}, revalidate: number = 3600): Promise<T> {
    if (!API_KEY) {
        console.warn('TMDB_API_KEY is not set');
    }

    const query = new URLSearchParams({
        api_key: API_KEY || '',
        language: 'en-US',
        ...params,
    });

    const res = await fetch(`${TMDB_BASE_URL}${path}?${query}`, {
        next: { revalidate },
    });

    if (!res.ok) {
        throw new Error(`TMDB Error: ${res.status} ${res.statusText}`);
    }

    return res.json();
}

export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    vote_average: number;
    genre_ids: number[];
    genres?: Array<{ id: number; name: string }>;
    runtime: number; // in minutes
    popularity?: number;
    release_dates: {
        results: Array<{
            iso_3166_1: string;
            release_dates: Array<{
                certification: string;
                release_date: string;
            }>;
        }>;
    };
    credits?: {
        cast: Array<{
            id: number;
            name: string;
            character: string;
            profile_path: string | null;
            popularity?: number;
        }>;
        crew: Array<{
            id: number;
            name: string;
            job: string;
        }>;
    };
}

export interface Person {
    id: number;
    name: string;
    biography: string;
    birthday: string | null;
    place_of_birth: string | null;
    profile_path: string | null;
    known_for_department: string;
    imdb_id: string | null;
}

export interface PersonCredits {
    cast: Array<Movie & { media_type: string; character: string }>;
    crew: Array<Movie & { media_type: string; job: string }>;
}

export async function getTrendingMovies() {
    return fetchTMDB<{ results: Movie[] }>('/trending/movie/week');
}

export async function getNowPlaying() {
    return fetchTMDB<{ results: Movie[] }>('/movie/now_playing');
}

export async function searchMovies(query: string) {
    return fetchTMDB<{ results: Movie[] }>('/search/movie', { query });
}

export async function getMovieDetails(id: number | string) {
    return fetchTMDB<Movie & { status: string; credits: any; videos: any; "watch/providers": any }>(`/movie/${id}`, {
        append_to_response: 'credits,videos,release_dates,watch/providers',
    });
}

export async function getRecommendations(id: number | string) {
    return fetchTMDB<{ results: Movie[] }>(`/movie/${id}/recommendations`);
}

export async function getPersonDetails(id: number | string) {
    return fetchTMDB<Person>(`/person/${id}`, {}, 86400); // 24 hours
}

export async function getPersonCombinedCredits(id: number | string) {
    return fetchTMDB<PersonCredits>(`/person/${id}/combined_credits`, {}, 86400); // 24 hours
}

export async function getPersonImages(id: number | string) {
    return fetchTMDB<{ profiles: any[] }>(`/person/${id}/images`, {}, 86400); // 24 hours
}

export interface DiscoverParams {
    page?: number;
    with_genres?: string;
    with_watch_providers?: string;
    watch_region?: string;
    'with_runtime.gte'?: number;
    'with_runtime.lte'?: number;
    sort_by?: string;
    with_keywords?: string;
    with_watch_monetization_types?: string;
}

/**
 * Advanced movie discovery with filtering.
 */
export async function discoverMovies(params: DiscoverParams) {
    const searchParams: Record<string, string> = {};

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            searchParams[key] = value.toString();
        }
    });

    return fetchTMDB<{ results: Movie[]; total_pages: number; total_results: number }>(
        '/discover/movie',
        searchParams
    );
}


export interface WatchProvider {
    provider_id: number;
    provider_name: string;
    logo_path: string;
}

export interface WatchProvidersResult {
    link: string;
    flatrate: WatchProvider[];
    rent: WatchProvider[];
    buy: WatchProvider[];
    free: WatchProvider[];
    ads: WatchProvider[];
    usedRegion: string;
}

/**
 * Get available watch providers with region fallback.
 */
export async function getWatchProviders(tmdbId: number | string, preferredRegion: string = 'US'): Promise<WatchProvidersResult | null> {
    try {
        const data = await fetchTMDB<{ results: Record<string, any> }>(`/movie/${tmdbId}/watch/providers`);
        const results = data.results || {};

        // 1. Try preferred region
        let regionData = results[preferredRegion];
        let usedRegion = preferredRegion;

        // 2. Fallback: First available region if preferred is missing
        if (!regionData) {
            const availableRegions = Object.keys(results);
            if (availableRegions.length > 0) {
                usedRegion = availableRegions[0];
                regionData = results[usedRegion];
            }
        }

        if (!regionData) {
            return null;
        }

        // 3. Normalize Data
        return {
            link: regionData.link || '',
            flatrate: regionData.flatrate || [],
            rent: regionData.rent || [],
            buy: regionData.buy || [],
            free: regionData.free || [],
            ads: regionData.ads || [],
            usedRegion
        };
    } catch (error) {
        console.error("Error fetching watch providers:", error);
        return null; // Graceful failure
    }
}

function normalizeTitle(title: string): string {
    return title
        .toLowerCase()
        .replace(/^(the|a|an)\s+/i, '')
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, ' ')
        .trim();
}

export type ResolverCache = Map<string, { id: number | null, isAmbiguous: boolean }>;

/**
 * Resolve a TMDb movie ID from a title and year using tiered matching logic.
 */
export async function resolveMovieId(
    title: string,
    year: number | string | null,
    cache?: ResolverCache
): Promise<{ id: number | null, isAmbiguous: boolean }> {
    const cacheKey = `${title}|${year}`;
    if (cache?.has(cacheKey)) return cache.get(cacheKey)!;

    const normalizedOriginal = normalizeTitle(title);
    const targetYear = year ? parseInt(year.toString()) : null;

    const run = async () => {
        // TIER 1: Search with Year (Search API primary_release_year)
        // This is the cleanest way to find matches when years align perfectly.
        const tier1 = await fetchTMDB<{ results: Movie[] }>('/search/movie', {
            query: title,
            ...(year && { primary_release_year: year.toString() })
        });

        // Check for exact normalized matches in Tier 1
        const t1Exact = tier1.results.filter(m => normalizeTitle(m.title) === normalizedOriginal);
        if (t1Exact.length === 1) return { id: t1Exact[0].id, isAmbiguous: false };
        if (t1Exact.length > 1) return { id: t1Exact[0].id, isAmbiguous: true }; // remakes/collisions in same year

        // TIER 2: Search Title Only (Fallback for festival/release year drift)
        // If Tier 1 fails, the year provided might be off by ±1 (common in imports).
        const tier2 = await fetchTMDB<{ results: Movie[] }>('/search/movie', { query: title });

        // Match against normalized titles
        const t2Exact = tier2.results.filter(m => normalizeTitle(m.title) === normalizedOriginal);

        if (t2Exact.length > 0) {
            // REMAKE COLLISION GUARD: multiple candidates same normalized title
            const distinctYears = new Set(t2Exact.map(m => m.release_date?.split('-')[0] || 'unknown'));
            if (distinctYears.size > 1) {
                // If we have a target year, try to pick the closest one but STAY AMBIGUOUS
                if (targetYear) {
                    const sortedByProximity = [...t2Exact].sort((a, b) => {
                        const ya = parseInt(a.release_date?.split('-')[0] || '0');
                        const yb = parseInt(b.release_date?.split('-')[0] || '0');
                        return Math.abs(ya - targetYear) - Math.abs(yb - targetYear);
                    });
                    return { id: sortedByProximity[0].id, isAmbiguous: true };
                }
                return { id: t2Exact[0].id, isAmbiguous: true };
            }

            // YEAR TOLERANCE: auto-resolve only if year matches or is ±1
            if (targetYear) {
                const withinTolerance = t2Exact.filter(m => {
                    const y = parseInt(m.release_date?.split('-')[0] || '0');
                    return Math.abs(y - targetYear) <= 1;
                });
                if (withinTolerance.length === 1) return { id: withinTolerance[0].id, isAmbiguous: false };
            } else if (t2Exact.length === 1) {
                // No year provided? Only auto-resolve if exactly one match exists and it's popular enough
                // Applying a soft popularity threshold for no-year auto-matches
                if ((t2Exact[0].popularity || 0) > 1.0) {
                    return { id: t2Exact[0].id, isAmbiguous: false };
                }
            }

            // If we have matches but don't meet high confidence threshold
            return { id: t2Exact[0].id, isAmbiguous: true };
        }

        // TIER 3: Popularity-based ranking of non-exact query results
        // Never auto-resolve Tier 3; always require manual audit.
        if (tier2.results.length > 0) {
            const sorted = [...tier2.results].sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
            return { id: sorted[0].id, isAmbiguous: true };
        }

        return { id: null, isAmbiguous: false };
    };

    const result = await run();
    if (cache) cache.set(cacheKey, result);
    return { ...result };
}
