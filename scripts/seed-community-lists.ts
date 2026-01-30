import { prisma } from '../lib/prisma';
import fs from 'fs';
import path from 'path';

// =============================================================================
// SEED COMMUNITY LISTS - RESILIENT VERSION
// - Per-list preflight: resolve all movies BEFORE any DB writes
// - Per-list atomic transaction: skip list on failure, keep existing data
// - position = null when !isRanked (@@unique constraint on listId, position)
// - Exit non-zero if any list failed
// =============================================================================

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
Object.assign(process.env, env);

const TMDB_API_KEY = env.TMDB_API_KEY;
const SYSTEM_USER_EMAIL = "community@forseenit.com";

// =============================================================================
// TMDb Helpers (ONLY used in preflight, NEVER inside transaction)
// =============================================================================

async function fetchTMDB(path: string, params: Record<string, string> = {}) {
    if (!TMDB_API_KEY) {
        throw new Error("Missing TMDB_API_KEY in environment.");
    }
    const query = new URLSearchParams({ api_key: TMDB_API_KEY, ...params });
    const url = `https://api.themoviedb.org/3${path}?${query}`;
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`TMDB API Error: ${res.status} for ${path}`);
    }
    return res.json();
}

// =============================================================================
// Preflight Resolver - strict, uses explicit tmdbId when provided
// =============================================================================

interface MovieItem {
    title: string;
    year?: number;
    tmdbId?: number;
}

interface ResolvedMovie {
    tmdbId: number;
    title: string;
    posterPath: string | null;
    backdropPath: string | null;
}

async function resolveMovieStrict(item: MovieItem): Promise<ResolvedMovie> {
    // Fast path: explicit tmdbId
    if (item.tmdbId) {
        const details = await fetchTMDB(`/movie/${item.tmdbId}`);
        return {
            tmdbId: item.tmdbId,
            title: details.title || item.title,
            posterPath: details.poster_path || null,
            backdropPath: details.backdrop_path || null
        };
    }

    // Slow path: search by title + year
    if (!item.year) {
        throw new Error(`No tmdbId and no year for "${item.title}"`);
    }

    const searchData = await fetchTMDB('/search/movie', {
        query: item.title,
        primary_release_year: item.year.toString()
    });

    if (!searchData?.results?.length) {
        throw new Error(`No TMDb results for "${item.title}" (${item.year})`);
    }

    const normalizedTarget = item.title.toLowerCase().trim();
    const exactMatches = searchData.results.filter((m: any) =>
        m.title.toLowerCase().trim() === normalizedTarget ||
        m.original_title.toLowerCase().trim() === normalizedTarget
    );

    if (exactMatches.length === 0) {
        throw new Error(`No exact match for "${item.title}". Top result: "${searchData.results[0].title}"`);
    }

    const chosen = exactMatches[0];
    const details = await fetchTMDB(`/movie/${chosen.id}`);
    return {
        tmdbId: chosen.id,
        title: details.title || chosen.title,
        posterPath: details.poster_path || null,
        backdropPath: details.backdrop_path || null
    };
}

// =============================================================================
// List Definitions
// =============================================================================

interface ListDef {
    systemKey: string;
    title: string;
    description: string;
    isRanked: boolean;
    movies: MovieItem[];
}

const COLLECTION_LISTS: ListDef[] = [
    {
        systemKey: "best_of_2024",
        title: "Best of 2024",
        description: "The most acclaimed films of 2024, curated by Foreseen.",
        isRanked: true,
        movies: [
            { title: "Dune: Part Two", year: 2024, tmdbId: 693134 },
            { title: "Anora", year: 2024, tmdbId: 1064213 },
            { title: "The Brutalist", year: 2024, tmdbId: 1198727 },
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
            { title: "Beau Travail", year: 1999, tmdbId: 53838 },
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
            { title: "Raw", year: 2016, tmdbId: 393560 },
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

// =============================================================================
// Main: Per-list preflight + per-list atomic transaction
// =============================================================================

async function main() {
    console.log('=== SEED COMMUNITY LISTS (Resilient) ===\n');

    // Ensure system user exists
    let systemUser = await prisma.user.findUnique({ where: { email: SYSTEM_USER_EMAIL } });
    if (!systemUser) {
        console.log("Creating system user...");
        systemUser = await prisma.user.create({
            data: {
                email: SYSTEM_USER_EMAIL,
                handle: "foreseen",
                name: "Foreseen Collection",
                image: "/images/logo.png"
            }
        });
    }

    const results: { list: string; success: boolean; error?: string }[] = [];

    for (const listDef of COLLECTION_LISTS) {
        console.log(`\n--- Processing: ${listDef.title} (${listDef.systemKey}) ---`);

        // PREFLIGHT (all network calls here, outside transaction)
        console.log('  Preflight resolving...');
        const resolved: ResolvedMovie[] = [];
        let prefightFailed = false;
        let prefightError = '';

        for (const item of listDef.movies) {
            try {
                const movie = await resolveMovieStrict(item);
                resolved.push(movie);
            } catch (e: any) {
                prefightError = e.message;
                prefightFailed = true;
                break;
            }
        }

        if (prefightFailed) {
            console.error(`  ❌ SKIPPING ${listDef.title}: ${prefightError}`);
            results.push({ list: listDef.title, success: false, error: prefightError });
            continue; // Skip this list, keep existing data
        }

        console.log(`  ✓ Preflight resolved ${resolved.length} movies`);

        // ATOMIC TRANSACTION (DB-only, no network calls)
        try {
            await prisma.$transaction(async (tx) => {
                // 1. Upsert list container
                const list = await tx.movieList.upsert({
                    where: { systemKey: listDef.systemKey },
                    update: {
                        title: listDef.title,
                        description: listDef.description,
                        isRanked: listDef.isRanked,
                        isSystem: true,
                        isPublic: true,
                        userId: systemUser!.id
                    },
                    create: {
                        userId: systemUser!.id,
                        title: listDef.title,
                        description: listDef.description,
                        isRanked: listDef.isRanked,
                        isSystem: true,
                        isPublic: true,
                        systemKey: listDef.systemKey
                    }
                });

                // 2. Delete existing items (atomic within transaction)
                await tx.movieListItem.deleteMany({ where: { listId: list.id } });

                // 3. Upsert movies + create items
                for (let i = 0; i < resolved.length; i++) {
                    const movie = resolved[i];

                    // Safe movie upsert
                    await tx.movie.upsert({
                        where: { tmdbId: movie.tmdbId },
                        update: {
                            title: movie.title,
                            ...(movie.posterPath ? { posterPath: movie.posterPath } : {}),
                            ...(movie.backdropPath ? { backdropPath: movie.backdropPath } : {})
                        },
                        create: {
                            tmdbId: movie.tmdbId,
                            title: movie.title,
                            posterPath: movie.posterPath,
                            backdropPath: movie.backdropPath
                        }
                    });

                    // Position is null for unranked lists (@@unique constraint)
                    await tx.movieListItem.create({
                        data: {
                            listId: list.id,
                            movieId: movie.tmdbId,
                            position: listDef.isRanked ? (i + 1) : null
                        }
                    });
                }

                console.log(`  ✓ Transaction committed: ${resolved.length} items`);
            });

            results.push({ list: listDef.title, success: true });
        } catch (e: any) {
            console.error(`  ❌ Transaction failed for ${listDef.title}: ${e.message}`);
            results.push({ list: listDef.title, success: false, error: e.message });
        }
    }

    // =============================================================================
    // Summary
    // =============================================================================
    console.log('\n=== SEED SUMMARY ===');
    const succeeded = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);

    console.log(`✓ Succeeded: ${succeeded.map(r => r.list).join(', ') || 'none'}`);
    if (failed.length > 0) {
        console.log(`✗ Failed: ${failed.map(r => `${r.list} (${r.error})`).join(', ')}`);
    }

    // Exit non-zero if any failed
    if (failed.length > 0) {
        console.log('\nExiting with error code 1 due to failures.');
        process.exit(1);
    }

    console.log('\nSeed completed successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
