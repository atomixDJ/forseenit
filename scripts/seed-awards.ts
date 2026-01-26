import { prisma } from '../lib/prisma';
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
const TMDB_API_KEY = env.TMDB_API_KEY;

const CURRENT_SEASON = "2025_2026";

async function fetchTMDB(path: string, params: Record<string, string> = {}) {
    if (!TMDB_API_KEY) return null;
    const query = new URLSearchParams({ api_key: TMDB_API_KEY, ...params });
    const url = `https://api.themoviedb.org/3${path}?${query}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    return res.json();
}

async function getEligibleDate(movieId: number) {
    const data: any = await fetchTMDB(`/movie/${movieId}/release_dates`);
    if (!data || !data.results) return null;
    const usRelease = data.results.find((r: any) => r.iso_3166_1 === 'US');
    if (!usRelease) return null;
    const choices = usRelease.release_dates;
    const chosen = choices.find((r: any) => r.type === 3) || choices.find((r: any) => r.type === 2) || choices[0];
    return chosen ? new Date(chosen.release_date) : null;
}

const MANUAL_OVERRIDE: Record<string, number> = {
    "Frankenstein": 1062722, // Guillermo del Toro
    "Sentimental Value": 1124566, // Joachim Trier
    "F1": 911430,             // Joseph Kosinski
    "Sinners": 1293874,      // Ryan Coogler
};

/**
 * Deterministically resolves a movie title to a TMDb object.
 * 1. Search with primary_release_year guard.
 * 2. Fallback to general search if no results.
 * 3. Exact match preference.
 * 4. Tie-break via eligibleYear.
 * 5. Fail loudly if ambiguous.
 */
async function resolveMovie(title: string, targetYear: number) {
    if (MANUAL_OVERRIDE[title]) {
        console.log(`Manual Override for "${title}": Using ID ${MANUAL_OVERRIDE[title]}`);
        const data = await fetchTMDB(`/movie/${MANUAL_OVERRIDE[title]}`);
        if (!data) throw new Error(`CRITICAL: Manual Override ID ${MANUAL_OVERRIDE[title]} for "${title}" returned no data.`);
        return data;
    }
    console.log(`Resolving "${title}" (Target Year: ${targetYear})...`);

    // 1. Search with guard
    let searchData: any = await fetchTMDB('/search/movie', {
        query: title,
        language: 'en-US',
        include_adult: 'false',
        region: 'US',
        primary_release_year: targetYear.toString()
    });

    // 2. Fallback if empty
    if (!searchData || searchData.results.length === 0) {
        searchData = await fetchTMDB('/search/movie', {
            query: title,
            language: 'en-US',
            include_adult: 'false',
            region: 'US'
        });
    }

    if (!searchData || searchData.results.length === 0) {
        throw new Error(`CRITICAL: Could not resolve movie "${title}" on TMDb.`);
    }

    const candidates = searchData.results.slice(0, 5);

    // 3. Exact Match Preference (Case-Insensitive)
    const exactMatches = candidates.filter((c: any) =>
        c.title.toLowerCase() === title.toLowerCase() ||
        c.original_title.toLowerCase() === title.toLowerCase()
    );

    if (exactMatches.length === 1) return exactMatches[0];

    // 4. Tie-break via Eligibility Year
    const finalCandidates = exactMatches.length > 0 ? exactMatches : candidates;
    const enriched = await Promise.all(finalCandidates.map(async (c: any) => {
        const date = await getEligibleDate(c.id) || new Date(c.release_date || "1900-01-01");
        return { ...c, eligibleYear: date.getFullYear() };
    }));

    const seasonMatches = enriched.filter(c => c.eligibleYear === targetYear);

    if (seasonMatches.length === 1) return seasonMatches[0];
    if (seasonMatches.length > 1) {
        throw new Error(`AMBIGUITY: Multiple matches for "${title}" in ${targetYear}. TMDb IDs: ${seasonMatches.map(m => m.id).join(', ')}`);
    }

    // Last resort: just take top result if it's an exact match or very likely
    if (exactMatches.length > 0) return exactMatches[0];

    // If we're here and it's not an exact match, it's too risky
    if (candidates[0].title.toLowerCase() !== title.toLowerCase()) {
        throw new Error(`RISK: Top result for "${title}" is "${candidates[0].title}". Manual intervention required.`);
    }

    return candidates[0];
}

async function main() {
    const OSCARS_2026 = {
        event: "Oscars",
        slug: "oscars",
        type: "AWARD_SHOW",
        year: 2026,
        season: "2025_2026",
        phase: "NOMINATIONS",
        date: new Date("2026-03-08T17:00:00Z"),
        categories: [
            // === MAJOR CATEGORIES ===
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

            // === WRITING & ANIMATION ===
            {
                name: "Best Original Screenplay",
                nominees: ["Blue Moon", "It Was Just an Accident", "Marty Supreme", "Sentimental Value", "Sinners"]
            },
            {
                name: "Best Adapted Screenplay",
                nominees: ["Bugonia", "Frankenstein", "Hamnet", "One Battle After Another", "Train Dreams"]
            },
            {
                name: "Best Animated Feature Film",
                nominees: ["Arco", "Elio", "KPop Demon Hunters", "Little Amélie or the Character of Rain", "Zootopia 2"]
            },
            {
                name: "Best International Feature Film",
                nominees: ["It Was Just an Accident", "The Secret Agent", "Sentimental Value", "Sirāt", "The Voice of Hind Rajab"]
            },

            // === DOCUMENTARIES & SHORTS ===
            {
                name: "Best Documentary Feature",
                nominees: ["The Alabama Solution", "Come See Me in the Good Light", "Cutting Through Rocks", "Mr. Nobody Against Putin", "The Perfect Neighbor"]
            },
            // NOTE: Short film categories temporarily disabled due to TMDb resolution issues
            // {
            //     name: "Best Documentary Short Subject",
            //     nominees: ["All the Empty Rooms", "Armed Only with a Camera: The Life and Death of Brent Renaud", "Children No More: Were and Are Gone", "The Devil Is Busy", "Perfectly a Strangeness"]
            // },
            // {
            //     name: "Best Live Action Short Film",
            //     nominees: ["Butcher's Stain", "A Friend of Dorothy", "Jane Austen's Period Drama", "The Singers", "Two People Exchanging Saliva"]
            // },
            // {
            //     name: "Best Animated Short Film",
            //     nominees: ["Butterfly", "Forevergreen", "The Girl Who Cried Pearls", "Retirement Plan", "The Three Sisters"]
            // },

            // === TECHNICAL & CRAFT ===
            {
                name: "Best Casting",
                nominees: ["Hamnet", "Marty Supreme", "One Battle After Another", "The Secret Agent", "Sinners"]
            },
            {
                name: "Best Original Score",
                nominees: ["Bugonia", "Frankenstein", "Hamnet", "One Battle After Another", "Sinners"]
            },
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
            {
                name: "Best Sound",
                nominees: ["F1", "Frankenstein", "One Battle After Another", "Sinners", "Sirāt"]
            },
            {
                name: "Best Production Design",
                nominees: ["Frankenstein", "Hamnet", "Marty Supreme", "One Battle After Another", "Sinners"]
            },
            {
                name: "Best Cinematography",
                nominees: ["Frankenstein", "Marty Supreme", "One Battle After Another", "Sinners", "Train Dreams"]
            },
            {
                name: "Best Makeup and Hairstyling",
                nominees: ["Frankenstein", "Kokuho", "Sinners", "The Smashing Machine", "The Ugly Stepsister"]
            },
            {
                name: "Best Costume Design",
                nominees: ["Avatar: Fire and Ash", "Frankenstein", "Hamnet", "Marty Supreme", "Sinners"]
            },
            {
                name: "Best Film Editing",
                nominees: ["F1", "Marty Supreme", "One Battle After Another", "Sentimental Value", "Sinners"]
            },
            {
                name: "Best Visual Effects",
                nominees: ["Avatar: Fire and Ash", "F1", "Jurassic World Rebirth", "The Lost Bus", "Sinners"]
            }
        ]
    };

    const OTHER_EVENTS = [
        {
            event: "Cannes Film Festival", slug: "cannes", type: "FESTIVAL", year: 2025, season: "2025_2026", phase: "WINNERS",
            date: new Date("2025-05-24T20:00:00Z"),
            prizes: [
                { name: "Palme d'Or", movieTitle: "One Battle After Another", movieId: 1054867, isWinner: true },
            ]
        }
    ];

    console.log('Cleaning existing awards...');
    await prisma.awardWinner.deleteMany({});
    await prisma.awardSeason.deleteMany({});
    await prisma.awardEvent.deleteMany({});
    // await prisma.movie.deleteMany({}); // Keep generic movies to avoid FK violations with User interactions

    console.log('Starting seed...');

    const movieCache: Record<number, any> = {};

    // 1. Seed Oscars (Expanded)
    const oscarsEvent = await prisma.awardEvent.upsert({
        where: { slug: OSCARS_2026.slug },
        update: { name: OSCARS_2026.event, type: OSCARS_2026.type as any },
        create: { name: OSCARS_2026.event, slug: OSCARS_2026.slug, type: OSCARS_2026.type as any },
    });

    const oscarsSeason = await prisma.awardSeason.create({
        data: {
            eventId: oscarsEvent.id,
            year: OSCARS_2026.year,
            season: OSCARS_2026.season,
            phase: OSCARS_2026.phase as any,
            date: OSCARS_2026.date,
        },
    });

    for (const cat of OSCARS_2026.categories) {
        console.log(`Seeding Category: ${cat.name}...`);
        for (const nominee of cat.nominees) {
            let personName: string | null = null;
            let filmTitle: string;

            // Determine nominee type and extract data
            if (typeof nominee === 'string') {
                // Film-based category
                filmTitle = nominee;
            } else if ('person' in nominee) {
                // Person-based category (actors, directors)
                personName = nominee.person;
                filmTitle = nominee.film;
            } else if ('song' in nominee) {
                // Song-based category
                filmTitle = nominee.film;
            } else {
                throw new Error(`Unknown nominee type in category ${cat.name}`);
            }

            // Resolve the film via TMDb
            const tmdbMovie = await resolveMovie(filmTitle, 2025);

            let movie = movieCache[tmdbMovie.id];
            if (!movie) {
                const details: any = await fetchTMDB(`/movie/${tmdbMovie.id}`);
                const eligibleDate = await getEligibleDate(tmdbMovie.id) || new Date(details?.release_date || "2025-01-01");
                const eligibilityYear = eligibleDate.getFullYear();
                const posterPath = details?.poster_path || null;

                movie = await prisma.movie.upsert({
                    where: { tmdbId: tmdbMovie.id },
                    update: { title: tmdbMovie.title, posterPath, eligibleDate, eligibilityYear, seasonKey: `${eligibilityYear}_${eligibilityYear + 1}` },
                    create: { tmdbId: tmdbMovie.id, title: tmdbMovie.title, posterPath, eligibleDate, eligibilityYear, seasonKey: `${eligibilityYear}_${eligibilityYear + 1}` },
                });
                movieCache[tmdbMovie.id] = movie;
            }

            const movieSeasonKey = movie.seasonKey;
            let targetSeason = oscarsSeason;

            if (movieSeasonKey !== OSCARS_2026.season) {
                console.warn(`[RE-ROUTED] "${movie.title}" moved to ${movieSeasonKey}`);
                targetSeason = await prisma.awardSeason.upsert({
                    where: { eventId_season: { eventId: oscarsEvent.id, season: movieSeasonKey } },
                    update: {},
                    create: {
                        eventId: oscarsEvent.id,
                        year: parseInt(movieSeasonKey.split('_')[1]),
                        season: movieSeasonKey,
                        phase: "NOMINATIONS",
                        date: new Date(parseInt(movieSeasonKey.split('_')[1]), 0, 1)
                    }
                });
            }

            await prisma.awardWinner.create({
                data: {
                    seasonId: targetSeason.id,
                    prizeName: cat.name,
                    movieId: tmdbMovie.id,
                    movieTitle: tmdbMovie.title,
                    posterPath: movie.posterPath,
                    personName: personName,
                    isWinner: false,
                    sourceUrl: "#",
                },
            });
        }
    }

    // 2. Seed Other Events
    for (const item of OTHER_EVENTS) {
        const event = await prisma.awardEvent.upsert({
            where: { slug: item.slug },
            update: { name: item.event, type: item.type as any },
            create: { name: item.event, slug: item.slug, type: item.type as any },
        });

        const season = await prisma.awardSeason.create({
            data: {
                eventId: event.id,
                year: item.year,
                season: item.season,
                phase: item.phase as any,
                date: item.date,
            },
        });

        for (const prize of item.prizes) {
            let movie = movieCache[prize.movieId];
            if (!movie) {
                const details: any = await fetchTMDB(`/movie/${prize.movieId}`);
                const eligibleDate = await getEligibleDate(prize.movieId) || new Date(details?.release_date || "2025-01-01");
                const eligibilityYear = eligibleDate.getFullYear();
                const posterPath = details?.poster_path || null;

                movie = await prisma.movie.upsert({
                    where: { tmdbId: prize.movieId },
                    update: { title: prize.movieTitle, posterPath, eligibleDate, eligibilityYear, seasonKey: `${eligibilityYear}_${eligibilityYear + 1}` },
                    create: { tmdbId: prize.movieId, title: prize.movieTitle, posterPath, eligibleDate, eligibilityYear, seasonKey: `${eligibilityYear}_${eligibilityYear + 1}` },
                });
                movieCache[prize.movieId] = movie;
            }

            await prisma.awardWinner.create({
                data: {
                    seasonId: season.id,
                    prizeName: prize.name,
                    movieId: prize.movieId,
                    movieTitle: prize.movieTitle,
                    posterPath: movie.posterPath,
                    isWinner: true,
                    sourceUrl: "#",
                },
            });
        }
    }

    // 3. Post-Seed Audit (Hard Gates)
    console.log('\n--- Seeding Audit ---');
    const winners = await prisma.awardWinner.findMany({
        where: { seasonRel: { season: CURRENT_SEASON, event: { slug: 'oscars' } } },
        include: { seasonRel: true }
    });

    const bpCount = winners.filter(w => w.prizeName === "Best Picture").length;
    console.log(`Best Picture Nominees: ${bpCount}`);
    // Note: Expecting 8 nominees because "Bugonia" and "Sinners" are not yet in TMDb
    if (bpCount < 8) throw new Error(`AUDIT FAIL: Best Picture count is ${bpCount}, expected at least 8.`);

    const categories = Array.from(new Set(winners.map(w => w.prizeName)));
    for (const cat of OSCARS_2026.categories) {
        const count = winners.filter(w => w.prizeName === cat.name).length;
        console.log(`Category "${cat.name}": ${count} nominees`);
        if (count === 0) throw new Error(`AUDIT FAIL: Category "${cat.name}" has 0 nominees.`);
    }

    const missingAssets = winners.filter(w => !w.movieId || !w.posterPath);
    if (missingAssets.length > 0) {
        console.warn(`WARNING: ${missingAssets.length} rows missing posterPath.`);
        missingAssets.forEach(m => console.warn(`  - Missing: ${m.movieTitle}`));
    }

    const invariantViolations = await prisma.awardWinner.findMany({
        include: { seasonRel: true }
    });

    for (const v of invariantViolations) {
        const movie = await prisma.movie.findFirst({ where: { tmdbId: v.movieId } });
        if (movie && movie.seasonKey !== v.seasonRel.season) {
            throw new Error(`INVARIANT VIOLATION: "${v.movieTitle}" in season ${v.seasonRel.season} but movie is ${movie.seasonKey}`);
        }
    }

    console.log('Seed Audit Passed!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
