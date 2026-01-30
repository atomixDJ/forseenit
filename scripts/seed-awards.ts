import { prisma } from '../lib/prisma';
import fs from 'fs';
import path from 'path';

// =============================================================================
// SEED AWARDS - RESILIENT VERSION
// - Option B failure policy: event-scoped skip, exit non-zero if any failed
// - Preflight resolve OUTSIDE transaction (all TMDb calls)
// - Per-event atomic transaction (DB-only, fast)
// - If ANY category in an event fails preflight → entire event skipped
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
const TMDB_API_KEY = env.TMDB_API_KEY;

// =============================================================================
// TMDb Helpers (ONLY used in preflight, NEVER inside transaction)
// =============================================================================

async function fetchTMDB(path: string, params: Record<string, string> = {}) {
    if (!TMDB_API_KEY) throw new Error("Missing TMDB_API_KEY");
    const query = new URLSearchParams({ api_key: TMDB_API_KEY, ...params });
    const url = `https://api.themoviedb.org/3${path}?${query}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`TMDb API Error: ${res.status} for ${path}`);
    return res.json();
}

async function getEligibleDate(movieId: number) {
    try {
        const data: any = await fetchTMDB(`/movie/${movieId}/release_dates`);
        if (!data?.results) return null;
        const usRelease = data.results.find((r: any) => r.iso_3166_1 === 'US');
        if (!usRelease) return null;
        const choices = usRelease.release_dates;
        const chosen = choices.find((r: any) => r.type === 3) || choices.find((r: any) => r.type === 2) || choices[0];
        return chosen ? new Date(chosen.release_date) : null;
    } catch {
        return null;
    }
}

// Manual overrides for movies that are hard to resolve via search
// Format: { expectedTitle, expectedYear, tmdbId } - validates during preflight
const MANUAL_OVERRIDE: Record<string, { tmdbId: number; expectedYear: number }> = {
    "Frankenstein": { tmdbId: 1062722, expectedYear: 2025 },
    "Sentimental Value": { tmdbId: 1124566, expectedYear: 2025 },
    "F1": { tmdbId: 911430, expectedYear: 2025 },
    "Sinners": { tmdbId: 1233413, expectedYear: 2025 },
};

// Validate all manual overrides before any seeding (catches wrong IDs early)
async function validateManualOverrides(): Promise<void> {
    console.log("  Validating manual TMDb ID overrides...");
    for (const [expectedTitle, { tmdbId, expectedYear }] of Object.entries(MANUAL_OVERRIDE)) {
        try {
            const details = await fetchTMDB(`/movie/${tmdbId}`);
            const releaseYear = details.release_date ? new Date(details.release_date).getFullYear() : null;

            // Check title matches (case-insensitive)
            const titleMatch = details.title?.toLowerCase() === expectedTitle.toLowerCase();
            // Check year is within 1 year tolerance
            const yearMatch = releaseYear && Math.abs(releaseYear - expectedYear) <= 1;

            if (!titleMatch) {
                throw new Error(`TMDb ID ${tmdbId} is "${details.title}" (${releaseYear}), expected "${expectedTitle}" (${expectedYear})`);
            }
            if (!yearMatch) {
                console.warn(`    ⚠ "${expectedTitle}": TMDb shows ${releaseYear}, expected ${expectedYear}`);
            }
        } catch (error: any) {
            if (error.message?.includes('expected')) throw error;
            throw new Error(`Failed to validate TMDb ID ${tmdbId} for "${expectedTitle}": ${error.message}`);
        }
    }
    console.log("  ✓ All manual overrides validated");
}

// =============================================================================
// Preflight Resolver - resolves full payload BEFORE any DB writes
// =============================================================================

interface ResolvedNominee {
    tmdbId: number;
    title: string;
    posterPath: string | null;
    personName: string | null;
    prizeName: string;
}

async function resolveMovie(title: string, targetYear: number, explicitId?: number): Promise<{ id: number; title: string; posterPath: string | null }> {
    // 1. Explicit ID (fast path)
    if (explicitId) {
        const details = await fetchTMDB(`/movie/${explicitId}`);
        return { id: explicitId, title: details.title || title, posterPath: details.poster_path || null };
    }

    // 2. Manual override
    if (MANUAL_OVERRIDE[title]) {
        const overrideId = MANUAL_OVERRIDE[title].tmdbId;
        const details = await fetchTMDB(`/movie/${overrideId}`);
        return { id: overrideId, title: details.title || title, posterPath: details.poster_path || null };
    }

    // 3. Search with year guard
    let searchData: any = await fetchTMDB('/search/movie', {
        query: title,
        primary_release_year: targetYear.toString(),
        language: 'en-US',
        include_adult: 'false',
        region: 'US'
    });

    // 4. Fallback without year
    if (!searchData?.results?.length) {
        searchData = await fetchTMDB('/search/movie', {
            query: title,
            language: 'en-US',
            include_adult: 'false',
            region: 'US'
        });
    }

    if (!searchData?.results?.length) {
        throw new Error(`Could not resolve "${title}" on TMDb`);
    }

    const candidates = searchData.results.slice(0, 5);
    const exactMatches = candidates.filter((c: any) =>
        c.title.toLowerCase() === title.toLowerCase() ||
        c.original_title.toLowerCase() === title.toLowerCase()
    );

    const chosen = exactMatches[0] || candidates[0];
    const details = await fetchTMDB(`/movie/${chosen.id}`);
    return { id: chosen.id, title: details.title || chosen.title, posterPath: details.poster_path || null };
}

// =============================================================================
// Event Definitions
// =============================================================================

interface EventDef {
    event: string;
    slug: string;
    type: "FESTIVAL" | "AWARD_SHOW";
    year: number;
    season: string;
    phase: "COMING_SOON" | "NOMINATIONS" | "WINNERS";
    date: Date;
    categories?: Array<{
        name: string;
        type?: "person" | "song";
        nominees: Array<string | { person: string; film: string } | { song: string; film: string }>;
    }>;
    prizes?: Array<{ name: string; movieTitle: string; movieId: number; isWinner: boolean }>;
}

const OSCARS_2026: EventDef = {
    event: "Oscars",
    slug: "oscars",
    type: "AWARD_SHOW",
    year: 2026,
    season: "2025_2026",
    phase: "NOMINATIONS",
    date: new Date("2026-03-08T17:00:00Z"),
    categories: [
        {
            name: "Best Picture",
            nominees: [
                "Bugonia", "F1", "Frankenstein", "Hamnet", "Marty Supreme",
                "One Battle After Another", "The Secret Agent", "Sentimental Value", "Sinners", "Train Dreams"
            ]
        },
        {
            name: "Best Director",
            type: "person",
            nominees: [
                { person: "Chloé Zhao", film: "Hamnet" },
                { person: "Josh Safdie", film: "Marty Supreme" },
                { person: "Paul Thomas Anderson", film: "One Battle After Another" },
                { person: "Joachim Trier", film: "Sentimental Value" },
                { person: "Ryan Coogler", film: "Sinners" }
            ]
        },
        {
            name: "Best Actor",
            type: "person",
            nominees: [
                { person: "Timothée Chalamet", film: "Marty Supreme" },
                { person: "Leonardo DiCaprio", film: "One Battle After Another" },
                { person: "Ethan Hawke", film: "Blue Moon" },
                { person: "Michael B. Jordan", film: "Sinners" },
                { person: "Wagner Moura", film: "The Secret Agent" }
            ]
        },
        {
            name: "Best Actress",
            type: "person",
            nominees: [
                { person: "Jessie Buckley", film: "Hamnet" },
                { person: "Rose Byrne", film: "If I Had Legs I'd Kick You" },
                { person: "Kate Hudson", film: "Song Sung Blue" },
                { person: "Renate Reinsve", film: "Sentimental Value" },
                { person: "Emma Stone", film: "Bugonia" }
            ]
        },
        {
            name: "Best Supporting Actor",
            type: "person",
            nominees: [
                { person: "Benicio del Toro", film: "One Battle After Another" },
                { person: "Jacob Elordi", film: "Frankenstein" },
                { person: "Delroy Lindo", film: "Sinners" },
                { person: "Sean Penn", film: "One Battle After Another" },
                { person: "Stellan Skarsgård", film: "Sentimental Value" }
            ]
        },
        {
            name: "Best Supporting Actress",
            type: "person",
            nominees: [
                { person: "Elle Fanning", film: "Sentimental Value" },
                { person: "Inga Ibsdotter Lilleaas", film: "Sentimental Value" },
                { person: "Amy Madigan", film: "Weapons" },
                { person: "Wunmi Mosaku", film: "Sinners" },
                { person: "Teyana Taylor", film: "One Battle After Another" }
            ]
        },
        { name: "Best Original Screenplay", nominees: ["Blue Moon", "It Was Just an Accident", "Marty Supreme", "Sentimental Value", "Sinners"] },
        { name: "Best Adapted Screenplay", nominees: ["Bugonia", "Frankenstein", "Hamnet", "One Battle After Another", "Train Dreams"] },
        { name: "Best Animated Feature Film", nominees: ["Arco", "Elio", "KPop Demon Hunters", "Little Amélie or the Character of Rain", "Zootopia 2"] },
        { name: "Best International Feature Film", nominees: ["It Was Just an Accident", "The Secret Agent", "Sentimental Value", "Sirāt", "The Voice of Hind Rajab"] },
        { name: "Best Documentary Feature", nominees: ["The Alabama Solution", "Come See Me in the Good Light", "Cutting Through Rocks", "Mr. Nobody Against Putin", "The Perfect Neighbor"] },
        { name: "Best Casting", nominees: ["Hamnet", "Marty Supreme", "One Battle After Another", "The Secret Agent", "Sinners"] },
        { name: "Best Original Score", nominees: ["Bugonia", "Frankenstein", "Hamnet", "One Battle After Another", "Sinners"] },
        {
            name: "Best Original Song",
            type: "song",
            nominees: [
                { song: "Dear Me", film: "Diane Warren: Relentless" },
                { song: "Golden", film: "KPop Demon Hunters" },
                { song: "I Lied to You", film: "Sinners" },
                { song: "Sweet Dreams of Joy", film: "Viva Verdi!" },
                { song: "Train Dreams", film: "Train Dreams" }
            ]
        },
        { name: "Best Sound", nominees: ["F1", "Frankenstein", "One Battle After Another", "Sinners", "Sirāt"] },
        { name: "Best Production Design", nominees: ["Frankenstein", "Hamnet", "Marty Supreme", "One Battle After Another", "Sinners"] },
        { name: "Best Cinematography", nominees: ["Frankenstein", "Marty Supreme", "One Battle After Another", "Sinners", "Train Dreams"] },
        { name: "Best Makeup and Hairstyling", nominees: ["Frankenstein", "Kokuho", "Sinners", "The Smashing Machine", "The Ugly Stepsister"] },
        { name: "Best Costume Design", nominees: ["Avatar: Fire and Ash", "Frankenstein", "Hamnet", "Marty Supreme", "Sinners"] },
        { name: "Best Film Editing", nominees: ["F1", "Marty Supreme", "One Battle After Another", "Sentimental Value", "Sinners"] },
        { name: "Best Visual Effects", nominees: ["Avatar: Fire and Ash", "F1", "Jurassic World Rebirth", "The Lost Bus", "Sinners"] }
    ]
};

const OTHER_EVENTS: EventDef[] = [
    {
        event: "Cannes Film Festival",
        slug: "cannes",
        type: "FESTIVAL",
        year: 2025,
        season: "2025_2026",
        phase: "WINNERS",
        date: new Date("2025-05-24T20:00:00Z"),
        prizes: [
            { name: "Palme d'Or", movieTitle: "One Battle After Another", movieId: 1054867, isWinner: true }
        ]
    }
];

// =============================================================================
// Preflight: Resolve ALL nominees for an event BEFORE any DB writes
// If any resolve fails, the entire event fails
// =============================================================================

interface PreflightResult {
    success: boolean;
    error?: string;
    nominees: ResolvedNominee[];
}

async function preflightEvent(eventDef: EventDef): Promise<PreflightResult> {
    const nominees: ResolvedNominee[] = [];

    try {
        if (eventDef.categories) {
            for (const cat of eventDef.categories) {
                for (const nominee of cat.nominees) {
                    let filmTitle: string;
                    let personName: string | null = null;

                    if (typeof nominee === 'string') {
                        filmTitle = nominee;
                    } else if ('person' in nominee) {
                        personName = nominee.person;
                        filmTitle = nominee.film;
                    } else if ('song' in nominee) {
                        filmTitle = nominee.film;
                    } else {
                        throw new Error(`Unknown nominee type in ${cat.name}`);
                    }

                    const movie = await resolveMovie(filmTitle, eventDef.year - 1);
                    nominees.push({
                        tmdbId: movie.id,
                        title: movie.title,
                        posterPath: movie.posterPath,
                        personName,
                        prizeName: cat.name
                    });
                }
            }
        }

        if (eventDef.prizes) {
            for (const prize of eventDef.prizes) {
                // Use explicit movieId (fast path)
                const movie = await resolveMovie(prize.movieTitle, eventDef.year, prize.movieId);
                nominees.push({
                    tmdbId: movie.id,
                    title: movie.title,
                    posterPath: movie.posterPath,
                    personName: null,
                    prizeName: prize.name
                });
            }
        }

        return { success: true, nominees };
    } catch (e: any) {
        return { success: false, error: e.message, nominees: [] };
    }
}

// =============================================================================
// Main: Per-event atomic transaction
// =============================================================================

async function main() {
    console.log('=== SEED AWARDS (Resilient) ===\n');

    // Validate all manual TMDb IDs before any seeding
    try {
        await validateManualOverrides();
    } catch (e: any) {
        console.error(`\n❌ Manual override validation failed: ${e.message}`);
        console.error('Fix the TMDb ID in MANUAL_OVERRIDE before seeding.\n');
        process.exit(1);
    }

    const allEvents: EventDef[] = [OSCARS_2026, ...OTHER_EVENTS];
    const results: { event: string; success: boolean; error?: string }[] = [];

    for (const eventDef of allEvents) {
        console.log(`\n--- Processing: ${eventDef.event} (${eventDef.season}) ---`);

        // PREFLIGHT (all network calls here, outside transaction)
        console.log('  Preflight resolving...');
        const preflight = await preflightEvent(eventDef);

        if (!preflight.success) {
            console.error(`  ❌ SKIPPING ${eventDef.event}: ${preflight.error}`);
            results.push({ event: eventDef.event, success: false, error: preflight.error });
            continue; // Skip this event, keep existing data
        }

        console.log(`  ✓ Preflight resolved ${preflight.nominees.length} nominees`);

        // ATOMIC TRANSACTION (DB-only, no network calls)
        try {
            await prisma.$transaction(async (tx) => {
                // 1. Upsert event
                const event = await tx.awardEvent.upsert({
                    where: { slug: eventDef.slug },
                    update: { name: eventDef.event, type: eventDef.type },
                    create: { name: eventDef.event, slug: eventDef.slug, type: eventDef.type }
                });

                // 2. Upsert season using named unique
                const season = await tx.awardSeason.upsert({
                    where: { eventId_season_unique: { eventId: event.id, season: eventDef.season } },
                    update: { year: eventDef.year, phase: eventDef.phase, date: eventDef.date },
                    create: {
                        eventId: event.id,
                        year: eventDef.year,
                        season: eventDef.season,
                        phase: eventDef.phase,
                        date: eventDef.date
                    }
                });

                // 3. Delete winners ONLY for this season
                await tx.awardWinner.deleteMany({ where: { seasonId: season.id } });

                // 4. Create movies + winners
                for (const nom of preflight.nominees) {
                    // Safe movie upsert (don't overwrite good data with null)
                    await tx.movie.upsert({
                        where: { tmdbId: nom.tmdbId },
                        update: {
                            title: nom.title,
                            ...(nom.posterPath ? { posterPath: nom.posterPath } : {})
                        },
                        create: {
                            tmdbId: nom.tmdbId,
                            title: nom.title,
                            posterPath: nom.posterPath
                        }
                    });

                    await tx.awardWinner.create({
                        data: {
                            seasonId: season.id,
                            prizeName: nom.prizeName,
                            movieId: nom.tmdbId,
                            movieTitle: nom.title,
                            posterPath: nom.posterPath,
                            personName: nom.personName,
                            isWinner: eventDef.phase === "WINNERS",
                            sourceUrl: "#"
                        }
                    });
                }

                console.log(`  ✓ Transaction committed: ${preflight.nominees.length} winners`);
            });

            results.push({ event: eventDef.event, success: true });
        } catch (e: any) {
            console.error(`  ❌ Transaction failed for ${eventDef.event}: ${e.message}`);
            results.push({ event: eventDef.event, success: false, error: e.message });
        }
    }

    // =============================================================================
    // Summary
    // =============================================================================
    console.log('\n=== SEED SUMMARY ===');
    const succeeded = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);

    console.log(`✓ Succeeded: ${succeeded.map(r => r.event).join(', ') || 'none'}`);
    if (failed.length > 0) {
        console.log(`✗ Failed: ${failed.map(r => `${r.event} (${r.error})`).join(', ')}`);
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
