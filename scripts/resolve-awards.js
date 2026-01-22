// scripts/resolve-awards.js
// "Agent" script to resolve awards data to TMDb IDs
// Using native fetch (Node 18+)

// Manually passing key to avoid env parsing issues in quick script
const TMDB_API_KEY = "dc7f09ac82e5dc2d63f7c545e320bde5";

async function search(query) {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`);
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();
        if (data.results && data.results.length > 0) {
            // Prefer exact matches or recent years if possible, but taking first result for MVP agent speed
            const m = data.results[0];
            console.log(`FOUND: "${query}" -> ID: ${m.id}, Title: "${m.title}" (${m.release_date?.split('-')[0]})`);
            return m;
        } else {
            console.log(`MISSING: "${query}"`);
            return null;
        }
    } catch (e) {
        console.error(`ERROR searching "${query}":`, e.message);
        return null;
    }
}

async function main() {
    const targets = [
        // Golden Globes 2026
        "Hamnet",
        "One Battle After Another",
        "K-Pop: Demon Hunters",
        "The Secret Agent",
        "If I Had Legs I'd Kick You",
        "Marty Supreme",
        "Sinners",

        // Cannes 2025
        "It Was Just an Accident", // Palme d'Or
        "Sentimental Value", // Grand Prix
        "The Secret Agent", // Best Director (Duplicate check)
        "Sound of Falling", // Jury Prize

        // Sundance 2025
        "Atropia", // US Dramatic
        "Seeds", // US Doc
        "Sabar Bonda", // World Cinema

        // Venice 2025
        "Father Mother Sister Brother", // Golden Lion (Jim Jarmusch)

        // TIFF 2025
        "The Life of Chuck", // Often recent winners, checking user specific 'Hamnet' overlap too
        "No Other Choice"
    ];

    console.log("--- AGENT RESOLUTION START ---");
    const results = {};
    for (const t of targets) {
        const movie = await search(t);
        if (movie) {
            results[t] = {
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path, // We will use getTMDBImage client side, but here just ID matters
                overview: movie.overview,
                release_date: movie.release_date
            };
        }
    }
    console.log("--- RESULTS JSON ---");
    console.log(JSON.stringify(results, null, 2));
}

main();
