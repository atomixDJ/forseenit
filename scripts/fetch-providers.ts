/**
 * Standalone script to fetch watch provider list from TMDb
 */

const API_KEY = process.env.TMDB_API_KEY;

interface ProviderInfo {
    provider_id: number;
    provider_name: string;
    logo_path: string;
}

async function main() {
    if (!API_KEY) {
        console.error("TMDB_API_KEY is not set");
        process.exit(1);
    }

    const url = `https://api.themoviedb.org/3/watch/providers/movie?api_key=${API_KEY}&watch_region=US`;
    const res = await fetch(url);

    if (!res.ok) {
        console.error(`API Error: ${res.status} ${res.statusText}`);
        process.exit(1);
    }

    const data: { results: ProviderInfo[] } = await res.json();
    const popular = [8, 337, 119, 1899, 350, 15, 2, 3];
    const filtered = data.results.filter((p) => popular.includes(p.provider_id));
    console.log(JSON.stringify(filtered, null, 2));
}

main().catch(console.error);
