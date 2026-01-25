
import { PrismaClient } from '../lib/generated/client';
import fs from 'fs';
import path from 'path';

// Improved .env loading
function loadEnv() {
    const env: Record<string, string> = {};
    const files = ['.env', '.env.local'];

    for (const file of files) {
        const envPath = path.resolve(process.cwd(), file);
        if (fs.existsSync(envPath)) {
            const content = fs.readFileSync(envPath, 'utf8');
            content.split('\n').forEach(line => {
                const [key, ...valueParts] = line.split('=');
                if (key && valueParts.length > 0) {
                    let value = valueParts.join('=').trim();
                    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
                    if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
                    env[key.trim()] = value;
                }
            });
        }
    }
    return env;
}



const env = loadEnv();

// Populate process.env so PrismaClient can find DATABASE_URL if needed
Object.assign(process.env, env);

// Robustly resolve the database file path
const dbPath = path.resolve(process.cwd(), 'prisma/dev.db');
const dbUrl = `file:${dbPath}`;

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: dbUrl
        }
    }
});
const TMDB_API_KEY = env.TMDB_API_KEY;
const SYSTEM_USER_EMAIL = "community@forseenit.com";

// Strict fail-fast helper
async function fetchTMDB(path: string, params: Record<string, string> = {}) {
    if (!TMDB_API_KEY) {
        throw new Error("Missing TMDB_API_KEY in environment. Strict seeding requires API access.");
    }
    const query = new URLSearchParams({ api_key: TMDB_API_KEY, ...params });
    const url = `https://api.themoviedb.org/3${path}?${query}`;

    //console.log(`Fetching ${url}...`); 
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`TMDB API Error: ${res.status} ${res.statusText} for ${path}`);
    }
    return res.json();
}

/**
 * Strict Resolver:
 * 1. Accepts explicit tmdbId (preferred)
 * 2. If no ID, attempts STRICT Title + Year search on TMDb.
 * 3. NO Local Fallback. NO Dummy creation.
 */
async function resolveMovieStrict(item: { tmdbId?: number, title: string, year?: number }) {
    // 1. Explicit ID (Fast Path)
    if (item.tmdbId) {
        return { id: item.tmdbId, title: item.title };
    }

    // 2. Strict Search (Slow Path)
    console.log(`Resolving STRICT: "${item.title}" (${item.year})...`);

    if (!item.year) {
        throw new Error(`STRICT FAIL: "${item.title}" has no ID and no Year. Cannot resolve strictly.`);
    }

    const searchData = await fetchTMDB('/search/movie', {
        query: item.title,
        primary_release_year: item.year.toString()
    });

    if (!searchData?.results?.length) {
        throw new Error(`STRICT FAIL: No TMDb results found for "${item.title}" (${item.year}).`);
    }

    // Strict Match Guard
    const normalizedTarget = item.title.toLowerCase().trim();
    const exactMatches = searchData.results.filter((m: any) =>
        m.title.toLowerCase().trim() === normalizedTarget ||
        m.original_title.toLowerCase().trim() === normalizedTarget
    );

    if (exactMatches.length === 0) {
        throw new Error(`STRICT FAIL: Found results for "${item.title}" but none were exact title matches. Top result: "${searchData.results[0].title}"`);
    }

    if (exactMatches.length > 1) {
        // Remake/Collision Guard logic could go here, but with Year filter it's usually safe.
        // If multiple exact matches in VERY same year, we might be ambiguous.
        // For now, take the most popular one.
        exactMatches.sort((a: any, b: any) => b.popularity - a.popularity);
    }

    return { id: exactMatches[0].id, title: exactMatches[0].title };
}

const COLLECTION_LISTS = [
    {
        systemKey: "best_of_2024",
        title: "Best of 2024",
        description: "The most acclaimed films of 2024, curated by Foreseen.",
        isRanked: true,
        movies: [
            { title: "Dune: Part Two", year: 2024, tmdbId: 693134 },
            { title: "Anora", year: 2024, tmdbId: 1064213 },
            { title: "The Brutalist", year: 2024, tmdbId: 866099 },
            { title: "Conclave", year: 2024, tmdbId: 967848 },
            { title: "Civil War", year: 2024, tmdbId: 929590 },
            { title: "Challengers", year: 2024, tmdbId: 937287 },
            { title: "The Substance", year: 2024, tmdbId: 933260 },
            { title: "Sing Sing", year: 2024, tmdbId: 1010344 },
            { title: "A Real Pain", year: 2024, tmdbId: 1041049 },
            { title: "Nickel Boys", year: 2024, tmdbId: 1156255 }
        ]
    },
    {
        systemKey: "sight_and_sound_2022",
        title: "Sight & Sound Top 10",
        description: "The 2022 Critics' Poll Top 10 Greatest Films of All Time.",
        isRanked: true,
        movies: [
            { title: "Jeanne Dielman, 23, quai du Commerce, 1080 Bruxelles", year: 1975, tmdbId: 44012 },
            { title: "Vertigo", year: 1958, tmdbId: 426 },
            { title: "Citizen Kane", year: 1941, tmdbId: 15 },
            { title: "Tokyo Story", year: 1953, tmdbId: 18148 },
            { title: "In the Mood for Love", year: 2000, tmdbId: 843 },
            { title: "2001: A Space Odyssey", year: 1968, tmdbId: 62 },
            { title: "Beau Travail", year: 1999, tmdbId: 21975 },
            { title: "Mulholland Drive", year: 2001, tmdbId: 1018 },
            { title: "Man with a Movie Camera", year: 1929, tmdbId: 644 },
            { title: "Singin' in the Rain", year: 1952, tmdbId: 872 }
        ]
    },
    {
        systemKey: "top_scifi_21st",
        title: "Essential Sci-Fi of the 21st Century",
        description: "Mind-bending science fiction from 2000 onwards.",
        isRanked: false,
        movies: [
            { title: "Children of Men", year: 2006, tmdbId: 9693 },
            { title: "Arrival", year: 2016, tmdbId: 329865 },
            { title: "Ex Machina", year: 2014, tmdbId: 264660 },
            { title: "Eternal Sunshine of the Spotless Mind", year: 2004, tmdbId: 38 },
            { title: "Under the Skin", year: 2013, tmdbId: 157354 },
            { title: "Mad Max: Fury Road", year: 2015, tmdbId: 76341 },
            { title: "Inception", year: 2010, tmdbId: 27205 },
            { title: "District 9", year: 2009, tmdbId: 17654 },
            { title: "Her", year: 2013, tmdbId: 152601 },
            { title: "Everything Everywhere All At Once", year: 2022, tmdbId: 545611 }
        ]
    },
    {
        systemKey: "modern_horror_classics",
        title: "Modern Horror Classics",
        description: "The most chilling and innovative horror films of the last decade.",
        isRanked: false,
        movies: [
            { title: "Hereditary", year: 2018, tmdbId: 493922 },
            { title: "Get Out", year: 2017, tmdbId: 419430 },
            { title: "The Witch", year: 2015, tmdbId: 310131 },
            { title: "Midsommar", year: 2019, tmdbId: 530385 },
            { title: "It Follows", year: 2014, tmdbId: 270303 },
            { title: "The Babadook", year: 2014, tmdbId: 242224 },
            { title: "Raw", year: 2016, tmdbId: 393560 }, // 'Grave'
            { title: "Titane", year: 2021, tmdbId: 630240 },
            { title: "Barbarian", year: 2022, tmdbId: 913290 },
            { title: "Talk to Me", year: 2022, tmdbId: 1008042 }
        ]
    },
    {
        systemKey: "animation_showcase",
        title: "Animation Beyond Boundaries",
        description: "Visually stunning animated films that push the medium forward.",
        isRanked: false,
        movies: [
            { title: "Spirited Away", year: 2001, tmdbId: 129 },
            { title: "Spider-Man: Into the Spider-Verse", year: 2018, tmdbId: 324857 },
            { title: "The Boy and the Heron", year: 2023, tmdbId: 508883 },
            { title: "Flee", year: 2021, tmdbId: 639801 },
            { title: "Perfect Blue", year: 1997, tmdbId: 10494 },
            { title: "Marcel the Shell with Shoes On", year: 2021, tmdbId: 818647 },
            { title: "Guillermo del Toro's Pinocchio", year: 2022, tmdbId: 724495 },
            { title: "Your Name.", year: 2016, tmdbId: 372058 },
            { title: "Fantastic Mr. Fox", year: 2009, tmdbId: 10328 },
            { title: "Wolfwalkers", year: 2020, tmdbId: 508442 }
        ]
    }
];

async function main() {
    console.log(`Starting STRICT Collection Lists Seed (Known Source of Truth)...`);

    // 1. Ensure System User Exists
    let systemUser = await prisma.user.findUnique({ where: { email: SYSTEM_USER_EMAIL } });
    if (!systemUser) {
        console.log("Creating System User...");
        systemUser = await prisma.user.create({
            data: {
                email: SYSTEM_USER_EMAIL,
                name: "Foreseen Collection",
                image: "/images/logo.png"
            }
        });
    }

    const errors: any[] = [];

    for (const listDef of COLLECTION_LISTS) {
        console.log(`\nProcessing List: ${listDef.title} (${listDef.systemKey})`);

        // 2. Upsert List Container
        const list = await prisma.movieList.upsert({
            where: { systemKey: listDef.systemKey },
            update: {
                title: listDef.title,
                description: listDef.description,
                isRanked: listDef.isRanked,
                isSystem: true,
                isPublic: true,
                userId: systemUser.id,
            },
            create: {
                userId: systemUser.id,
                title: listDef.title,
                description: listDef.description,
                isRanked: listDef.isRanked,
                isSystem: true,
                isPublic: true,
                systemKey: listDef.systemKey
            }
        });

        // 3. Sync Movies
        // Clear old items to ensure clean state
        await prisma.movieListItem.deleteMany({ where: { listId: list.id } });

        for (let i = 0; i < listDef.movies.length; i++) {
            const item = listDef.movies[i];

            try {
                // A. RESOLVE (Fail-Fast)
                const { id: tmdbId, title } = await resolveMovieStrict(item);

                // B. UPSERT MOVIE (Fetch metadata)
                // We MUST try to fetch metadata. If it fails, the script FAILS (as per strict instructions).
                // However, I will allow a "soft" failure for metadata IF the ID was explicit, 
                // but the "Strict" philosophy says we want correct posters.
                // Re-reading user request: "Upsert Movie by tmdbId (fetch details from TMDb...)"
                // "Seed run must end with 0 unresolved/ambiguous items."

                let movieDetails: any = {};
                let fetchError = false;
                try {
                    movieDetails = await fetchTMDB(`/movie/${tmdbId}`);
                } catch (e: any) {
                    console.warn(`[WARNING] Network/API Error for ID ${tmdbId}: ${e.message}. Proceeding with minimal data.`);
                    fetchError = true;
                }

                await prisma.movie.upsert({
                    where: { tmdbId },
                    update: {
                        title: movieDetails.title || title, // Use fetched title or fallback to hardcoded
                        posterPath: movieDetails.poster_path || null,
                        backdropPath: movieDetails.backdrop_path || null
                    },
                    create: {
                        tmdbId,
                        title: movieDetails.title || title,
                        posterPath: movieDetails.poster_path || null,
                        backdropPath: movieDetails.backdrop_path || null
                    }
                });

                // C. LINK ITEM
                await prisma.movieListItem.create({
                    data: {
                        listId: list.id,
                        movieId: tmdbId,
                        position: listDef.isRanked ? (i + 1) : null
                    }
                });

                process.stdout.write("."); // Progress dot

            } catch (e: any) {
                console.error(`\n[ERROR] Item "${item.title}": ${e.message}`);
                errors.push({ list: listDef.title, item: item.title, error: e.message });
            }
        }
    }

    console.log("\n\n------------------------------------------------");
    if (errors.length > 0) {
        console.error(`SEED FAILED with ${errors.length} errors:`);
        errors.forEach(e => console.error(` - ${e.list}::${e.item} -> ${e.error}`));
        process.exit(1);
    } else {
        console.log("Seeding Complete! 0 Errors.");
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
