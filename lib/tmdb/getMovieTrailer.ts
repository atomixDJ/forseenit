const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.TMDB_API_KEY;

export interface TrailerInfo {
    key: string;
    name: string;
}

interface TMDBVideo {
    key: string;
    name: string;
    site: string;
    type: string;
    official: boolean;
    published_at: string;
}

export async function getMovieTrailer(movieId: number | string): Promise<TrailerInfo | null> {
    if (!API_KEY) {
        console.warn('TMDB_API_KEY is not set');
        return null;
    }

    const query = new URLSearchParams({
        api_key: API_KEY,
        language: 'en-US',
    });

    try {
        const res = await fetch(`${TMDB_BASE_URL}/movie/${movieId}/videos?${query}`, {
            next: { revalidate: 3600 }, // Cache for 1 hour
        });

        if (!res.ok) {
            console.error(`TMDB Trailer Fetch Error: ${res.status} ${res.statusText}`);
            return null;
        }

        const data = await res.json();
        const videos: TMDBVideo[] = data.results || [];

        // Filter to YouTube only
        const youtubeVideos = videos.filter(v => v.site === 'YouTube');

        if (youtubeVideos.length === 0) return null;

        // Deterministic selection:
        // 1. Prefer type === "Trailer" over "Teaser"
        // 2. Prefer official === true
        // 3. Fallback to first in list (stable sort)

        const sorted = youtubeVideos.sort((a, b) => {
            // Priority 1: Type (Trailer > Teaser > others)
            const getPriority = (v: TMDBVideo) => {
                if (v.type === 'Trailer') return 2;
                if (v.type === 'Teaser') return 1;
                return 0;
            };

            const pA = getPriority(a);
            const pB = getPriority(b);

            if (pA !== pB) return pB - pA;

            // Priority 2: Official
            if (a.official !== b.official) {
                return a.official ? -1 : 1;
            }

            // Priority 3: Stable fallback (latest first)
            return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
        });

        const best = sorted[0];
        return {
            key: best.key,
            name: best.name
        };
    } catch (error) {
        console.error('Error fetching trailer:', error);
        return null;
    }
}
