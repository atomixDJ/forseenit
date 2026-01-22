const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.TMDB_API_KEY;

type TMDBImageSize = 'w300' | 'w500' | 'w780' | 'w1280' | 'original';

export function getTMDBImage(path: string | null, size: TMDBImageSize = 'w780') {
    if (!path) return 'https://placehold.co/500x750/121212/ffffff?text=No+Poster';
    return `https://image.tmdb.org/t/p/${size}${path}`;
}

async function fetchTMDB<T>(path: string, params: Record<string, string> = {}): Promise<T> {
    if (!API_KEY) {
        console.warn('TMDB_API_KEY is not set');
        // return null as unknown as T; // Or throw?
    }

    const query = new URLSearchParams({
        api_key: API_KEY || '',
        language: 'en-US',
        ...params,
    });

    const res = await fetch(`${TMDB_BASE_URL}${path}?${query}`, {
        next: { revalidate: 3600 }, // Cache for 1 hour
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
    runtime: number; // in minutes
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
        }>;
        crew: Array<{
            id: number;
            name: string;
            job: string;
        }>;
    };
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
    return fetchTMDB<Movie & { credits: any; videos: any; "watch/providers": any }>(`/movie/${id}`, {
        append_to_response: 'credits,videos,release_dates,watch/providers',
    });
}

export async function getRecommendations(id: number | string) {
    return fetchTMDB<{ results: Movie[] }>(`/movie/${id}/recommendations`);
}
