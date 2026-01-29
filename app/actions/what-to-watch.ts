"use server";

import { requireAppUserIdAction, getAppUserId } from "@/lib/clerk-auth-helpers";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// =============================================================================
// Canonical Exclusion Helper
// =============================================================================

/**
 * Canonical helper: Get all TMDb IDs the user has "processed".
 * Processed = Watched OR Rated OR Favorited OR Top Ten'd
 * 
 * This is the ONLY source of exclusion logic — no per-feature exclusions allowed.
 */
export async function getProcessedTmdbIds(userId: string): Promise<Set<number>> {
    const [interactions, topTen] = await Promise.all([
        prisma.movieInteraction.findMany({
            where: {
                userId,
                OR: [
                    { watched: true },
                    { ratingHalf: { not: null } },
                    { favorited: true }
                ]
            },
            select: { movieId: true }
        }),
        prisma.userTopTen.findMany({
            where: { userId },
            select: { tmdbId: true }
        })
    ]);

    const ids = new Set<number>();
    for (const i of interactions) ids.add(i.movieId);
    for (const t of topTen) ids.add(t.tmdbId);
    return ids;
}

// =============================================================================
// Types
// =============================================================================

export interface WizardSettings {
    mode: "just_you" | "with_someone";
    partnerId?: string;
    pace: number;      // 0-100
    tone: number;      // 0-100
    era: number;       // 0-100
    fairness?: -1 | 0 | 1;  // Required when mode === "with_someone"
}

export interface MovieWithReasons {
    id: number;
    title: string;
    posterPath: string | null;
    year: number | null;
    reasons: string[];
}

export interface WhatToWatchResultDTO {
    sessionId: string;
    resultId: string;
    hero: MovieWithReasons;
    alts: MovieWithReasons[];
    settingsEcho: WizardSettings;
    partnerName?: string;
}

export interface ActiveSessionDTO {
    sessionId: string;
    mode: "just_you" | "with_someone";
    partnerName?: string;
    hero: MovieWithReasons | null;
    alts: MovieWithReasons[];
    resultId: string | null;
}

// =============================================================================
// Server Actions
// =============================================================================

/**
 * Generate What to Watch recommendations.
 * Creates or updates active session, runs engine, writes result + exposures.
 */
export async function generateWhatToWatch(settings: WizardSettings): Promise<WhatToWatchResultDTO | { error: string }> {
    const authResult = await requireAppUserIdAction();
    if (!authResult.ok) return { error: "Unauthorized" };
    const userId = authResult.userId;

    // Validate settings
    if (settings.mode === "with_someone") {
        if (!settings.partnerId) return { error: "Partner required for two-user mode" };
        if (settings.fairness === undefined) return { error: "Fairness required for two-user mode" };
    }
    if (settings.pace < 0 || settings.pace > 100) return { error: "Pace must be 0-100" };
    if (settings.tone < 0 || settings.tone > 100) return { error: "Tone must be 0-100" };
    if (settings.era < 0 || settings.era > 100) return { error: "Era must be 0-100" };

    // Check for providers
    const userProviders = await prisma.streamingSubscription.findMany({
        where: { userId },
        select: { providerId: true }
    });
    if (userProviders.length === 0) {
        return { error: "Please select your streaming services in Settings first" };
    }

    // Upsert active session (deactivate any existing active session first)
    await prisma.whatToWatchSession.updateMany({
        where: { userId, isActive: true },
        data: { isActive: false }
    });

    const session = await prisma.whatToWatchSession.create({
        data: {
            userId,
            partnerId: settings.partnerId || null,
            mode: settings.mode,
            pace: settings.pace,
            tone: settings.tone,
            era: settings.era,
            fairness: settings.fairness ?? null,
            region: "US",
            isActive: true
        }
    });

    // Run recommendation engine
    const engineResult = await runRecommendationEngine(userId, settings, userProviders.map(p => p.providerId));

    if ("error" in engineResult) {
        return { error: engineResult.error };
    }

    const { hero, alts, seed } = engineResult;

    // Write result
    const result = await prisma.whatToWatchResult.create({
        data: {
            sessionId: session.id,
            heroMovieId: hero.id,
            alt1MovieId: alts[0]?.id || 0,
            alt2MovieId: alts[1]?.id || 0,
            alt3MovieId: alts[2]?.id || 0,
            reasonsJson: JSON.stringify({ hero: hero.reasons, alts: alts.map(a => a.reasons) }),
            seed
        }
    });

    // Write exposures for initiator (and partner if applicable)
    const exposureUserIds = [userId];
    if (settings.partnerId) exposureUserIds.push(settings.partnerId);

    const allMovieIds = [hero.id, ...alts.map(a => a.id)];
    const exposureData = exposureUserIds.flatMap(uid =>
        allMovieIds.map(movieId => ({
            userId: uid,
            movieId,
            sessionId: session.id
        }))
    );
    await prisma.whatToWatchExposure.createMany({ data: exposureData });

    // Cap history at 20 results
    await capResultHistory(session.id);

    // Get partner name if applicable
    let partnerName: string | undefined;
    if (settings.partnerId) {
        const partner = await prisma.user.findUnique({
            where: { id: settings.partnerId },
            select: { name: true, handle: true }
        });
        partnerName = partner?.name || partner?.handle || undefined;
    }

    revalidatePath("/");

    return {
        sessionId: session.id,
        resultId: result.id,
        hero,
        alts,
        settingsEcho: settings,
        partnerName
    };
}

/**
 * Randomize with same settings, new seed.
 */
export async function randomizeWhatToWatch(): Promise<WhatToWatchResultDTO | { error: string }> {
    const authResult = await requireAppUserIdAction();
    if (!authResult.ok) return { error: "Unauthorized" };
    const userId = authResult.userId;

    const session = await prisma.whatToWatchSession.findFirst({
        where: { userId, isActive: true },
        include: { partner: { select: { name: true, handle: true } } }
    });
    if (!session) return { error: "No active session" };

    const userProviders = await prisma.streamingSubscription.findMany({
        where: { userId },
        select: { providerId: true }
    });

    const settings: WizardSettings = {
        mode: session.mode as "just_you" | "with_someone",
        partnerId: session.partnerId || undefined,
        pace: session.pace,
        tone: session.tone,
        era: session.era,
        fairness: session.fairness as -1 | 0 | 1 | undefined
    };

    const engineResult = await runRecommendationEngine(userId, settings, userProviders.map(p => p.providerId));
    if ("error" in engineResult) return { error: engineResult.error };

    const { hero, alts, seed } = engineResult;

    const result = await prisma.whatToWatchResult.create({
        data: {
            sessionId: session.id,
            heroMovieId: hero.id,
            alt1MovieId: alts[0]?.id || 0,
            alt2MovieId: alts[1]?.id || 0,
            alt3MovieId: alts[2]?.id || 0,
            reasonsJson: JSON.stringify({ hero: hero.reasons, alts: alts.map(a => a.reasons) }),
            seed
        }
    });

    // Write exposures
    const exposureUserIds = [userId];
    if (session.partnerId) exposureUserIds.push(session.partnerId);
    const allMovieIds = [hero.id, ...alts.map(a => a.id)];
    await prisma.whatToWatchExposure.createMany({
        data: exposureUserIds.flatMap(uid => allMovieIds.map(movieId => ({
            userId: uid, movieId, sessionId: session.id
        })))
    });

    await capResultHistory(session.id);
    revalidatePath("/");

    return {
        sessionId: session.id,
        resultId: result.id,
        hero,
        alts,
        settingsEcho: settings,
        partnerName: session.partner?.name || session.partner?.handle || undefined
    };
}

/**
 * Reset (deactivate) the active session.
 */
export async function resetWhatToWatch(): Promise<{ success: boolean }> {
    const authResult = await requireAppUserIdAction();
    if (!authResult.ok) return { success: false };

    await prisma.whatToWatchSession.updateMany({
        where: { userId: authResult.userId, isActive: true },
        data: { isActive: false }
    });

    revalidatePath("/");
    return { success: true };
}

/**
 * Promote an alt to hero (creates new result row).
 */
export async function promoteAlt(resultId: string, altIndex: 1 | 2 | 3): Promise<WhatToWatchResultDTO | { error: string }> {
    const authResult = await requireAppUserIdAction();
    if (!authResult.ok) return { error: "Unauthorized" };

    const existingResult = await prisma.whatToWatchResult.findUnique({
        where: { id: resultId },
        include: {
            session: {
                include: { partner: { select: { name: true, handle: true } } }
            }
        }
    });
    if (!existingResult) return { error: "Result not found" };

    const session = existingResult.session;
    if (session.userId !== authResult.userId) return { error: "Unauthorized" };

    // Swap hero with selected alt
    const altMovieIds = [existingResult.alt1MovieId, existingResult.alt2MovieId, existingResult.alt3MovieId];
    const newHeroId = altMovieIds[altIndex - 1];
    const newAlts = [...altMovieIds];
    newAlts[altIndex - 1] = existingResult.heroMovieId;

    // Fetch movie details for the new hero
    const movies = await prisma.movie.findMany({
        where: { tmdbId: { in: [newHeroId, ...newAlts] } },
        select: { tmdbId: true, title: true, posterPath: true }
    });
    const movieMap = new Map(movies.map(m => [m.tmdbId, m]));

    const heroMovie = movieMap.get(newHeroId);
    const hero: MovieWithReasons = {
        id: newHeroId,
        title: heroMovie?.title || "Unknown",
        posterPath: heroMovie?.posterPath || null,
        year: null,
        reasons: ["Promoted from alternatives"]
    };

    const alts: MovieWithReasons[] = newAlts.map(id => {
        const m = movieMap.get(id);
        return {
            id,
            title: m?.title || "Unknown",
            posterPath: m?.posterPath || null,
            year: null,
            reasons: []
        };
    });

    const newResult = await prisma.whatToWatchResult.create({
        data: {
            sessionId: session.id,
            heroMovieId: newHeroId,
            alt1MovieId: newAlts[0],
            alt2MovieId: newAlts[1],
            alt3MovieId: newAlts[2],
            reasonsJson: JSON.stringify({ hero: hero.reasons, alts: alts.map(a => a.reasons) }),
            seed: existingResult.seed
        }
    });

    await capResultHistory(session.id);
    revalidatePath("/");

    const settings: WizardSettings = {
        mode: session.mode as "just_you" | "with_someone",
        partnerId: session.partnerId || undefined,
        pace: session.pace,
        tone: session.tone,
        era: session.era,
        fairness: session.fairness as -1 | 0 | 1 | undefined
    };

    return {
        sessionId: session.id,
        resultId: newResult.id,
        hero,
        alts,
        settingsEcho: settings,
        partnerName: session.partner?.name || session.partner?.handle || undefined
    };
}

/**
 * Get active session with latest result (2-query budget for home page).
 */
export async function getActiveSessionWithLatestResult(): Promise<ActiveSessionDTO | null> {
    const userId = await getAppUserId();
    if (!userId) return null;

    // Query 1: Session + latest result
    const session = await prisma.whatToWatchSession.findFirst({
        where: { userId, isActive: true },
        include: {
            partner: { select: { name: true, handle: true } },
            results: {
                orderBy: { createdAt: "desc" },
                take: 1
            }
        }
    });

    if (!session) return null;

    const latestResult = session.results[0];
    if (!latestResult) {
        return {
            sessionId: session.id,
            mode: session.mode as "just_you" | "with_someone",
            partnerName: session.partner?.name || session.partner?.handle || undefined,
            hero: null,
            alts: [],
            resultId: null
        };
    }

    // Query 2: Batch fetch movies
    const movieIds = [
        latestResult.heroMovieId,
        latestResult.alt1MovieId,
        latestResult.alt2MovieId,
        latestResult.alt3MovieId
    ].filter(id => id > 0);

    const movies = await prisma.movie.findMany({
        where: { tmdbId: { in: movieIds } },
        select: { tmdbId: true, title: true, posterPath: true }
    });
    const movieMap = new Map(movies.map(m => [m.tmdbId, m]));

    // Parse reasons
    let reasons: { hero: string[]; alts: string[][] } = { hero: [], alts: [[], [], []] };
    if (latestResult.reasonsJson) {
        try {
            reasons = JSON.parse(latestResult.reasonsJson);
        } catch { }
    }

    const heroMovie = movieMap.get(latestResult.heroMovieId);
    const hero: MovieWithReasons = {
        id: latestResult.heroMovieId,
        title: heroMovie?.title || "Unknown",
        posterPath: heroMovie?.posterPath || null,
        year: null,
        reasons: reasons.hero
    };

    const altIds = [latestResult.alt1MovieId, latestResult.alt2MovieId, latestResult.alt3MovieId];
    const alts: MovieWithReasons[] = altIds.map((id, i) => {
        const m = movieMap.get(id);
        return {
            id,
            title: m?.title || "Unknown",
            posterPath: m?.posterPath || null,
            year: null,
            reasons: reasons.alts[i] || []
        };
    });

    return {
        sessionId: session.id,
        mode: session.mode as "just_you" | "with_someone",
        partnerName: session.partner?.name || session.partner?.handle || undefined,
        hero,
        alts,
        resultId: latestResult.id
    };
}

/**
 * Lazy-load previous picks.
 */
export async function getPreviousPicks(limit: number = 10): Promise<{ results: Array<{ id: string; heroTitle: string; createdAt: Date }> }> {
    const authResult = await requireAppUserIdAction();
    if (!authResult.ok) return { results: [] };

    const session = await prisma.whatToWatchSession.findFirst({
        where: { userId: authResult.userId, isActive: true }
    });
    if (!session) return { results: [] };

    const results = await prisma.whatToWatchResult.findMany({
        where: { sessionId: session.id },
        orderBy: { createdAt: "desc" },
        take: limit,
        select: { id: true, heroMovieId: true, createdAt: true }
    });

    const heroIds = results.map(r => r.heroMovieId);
    const movies = await prisma.movie.findMany({
        where: { tmdbId: { in: heroIds } },
        select: { tmdbId: true, title: true }
    });
    const titleMap = new Map(movies.map(m => [m.tmdbId, m.title]));

    return {
        results: results.map(r => ({
            id: r.id,
            heroTitle: titleMap.get(r.heroMovieId) || "Unknown",
            createdAt: r.createdAt
        }))
    };
}

// =============================================================================
// Helpers
// =============================================================================

async function capResultHistory(sessionId: string) {
    const results = await prisma.whatToWatchResult.findMany({
        where: { sessionId },
        orderBy: { createdAt: "desc" },
        select: { id: true }
    });
    if (results.length > 20) {
        const toDelete = results.slice(20).map(r => r.id);
        await prisma.whatToWatchResult.deleteMany({
            where: { id: { in: toDelete } }
        });
    }
}

// =============================================================================
// Recommendation Engine (v1)
// =============================================================================

interface EngineResult {
    hero: MovieWithReasons;
    alts: MovieWithReasons[];
    seed: number;
}

async function runRecommendationEngine(
    userId: string,
    settings: WizardSettings,
    providerIds: number[]
): Promise<EngineResult | { error: string }> {
    // Import TMDb functions
    const { discoverMovies } = await import("@/lib/tmdb");

    // 1. Build exclusion set
    const exclusionSet = await getProcessedTmdbIds(userId);
    if (settings.partnerId) {
        const partnerExclusion = await getProcessedTmdbIds(settings.partnerId);
        for (const id of partnerExclusion) exclusionSet.add(id);
    }

    // Get recent exposures for novelty penalty
    const recentExposures = await prisma.whatToWatchExposure.findMany({
        where: {
            userId,
            shownAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } // Last 7 days
        },
        select: { movieId: true }
    });
    const recentlyShown = new Set(recentExposures.map(e => e.movieId));

    // 2. Build TMDb Discover params
    const params: Record<string, any> = {
        page: 1,
        with_watch_providers: providerIds.join("|"),
        watch_region: "US",
        with_watch_monetization_types: "flatrate",
        "vote_count.gte": 500,
        "vote_average.gte": 6.0,
        sort_by: "popularity.desc"
    };

    // Fetch candidates (up to 3 pages)
    let allCandidates: any[] = [];
    for (let page = 1; page <= 3; page++) {
        const result = await discoverMovies({ ...params, page });
        allCandidates = [...allCandidates, ...result.results];
        if (result.results.length < 20) break;
    }

    // 3. Filter exclusions
    const eligible = allCandidates.filter(m => !exclusionSet.has(m.id));
    if (eligible.length < 4) {
        return { error: "Not enough movies found. Try adjusting your streaming services." };
    }

    // 4. Get user genre preferences
    const preferredGenres = await prisma.userPreferredGenre.findMany({
        where: { userId },
        select: { genreId: true }
    });
    const preferredGenreIds = new Set(preferredGenres.map(g => g.genreId));

    // 5. Score movies
    const scored = eligible.map(movie => {
        let score = 0;

        // Genre affinity (0-40 pts)
        const movieGenres = movie.genre_ids || [];
        const genreMatches = movieGenres.filter((g: number) => preferredGenreIds.has(g)).length;
        score += Math.min(genreMatches * 15, 40);

        // Slider match: era (0-15 pts)
        const year = parseInt(movie.release_date?.split("-")[0] || "2020");
        const eraScore = mapEraSlider(settings.era, year);
        score += eraScore;

        // Slider match: pace/tone via genres (0-15 pts)
        score += mapPaceToneSlider(settings.pace, settings.tone, movieGenres);

        // Quality (0-20 pts)
        score += Math.min((movie.vote_average || 0) * 2, 20);

        // Novelty penalty
        if (recentlyShown.has(movie.id)) {
            score -= 30;
        }

        return { movie, score };
    });

    // Sort by score
    scored.sort((a, b) => b.score - a.score);

    // 6. Pick hero + alts with weighted randomness
    // Use modulo to keep seed within INT range (max ~2.1 billion for signed 32-bit)
    const seed = Date.now() % 2147483647;
    const random = mulberry32(seed);

    // Hero from top 5
    const topN = scored.slice(0, 5);
    const heroIdx = Math.floor(random() * topN.length);
    const heroCandidate = topN[heroIdx];

    // Alts from top 15 (excluding hero), diversify by genre
    const remaining = scored.slice(0, 15).filter(s => s.movie.id !== heroCandidate.movie.id);
    const alts = selectDiverseAlts(remaining, 3);

    // Build MovieWithReasons
    const hero = buildMovieWithReasons(heroCandidate.movie, settings, providerIds, preferredGenreIds);
    const altResults = alts.map(a => buildMovieWithReasons(a.movie, settings, providerIds, preferredGenreIds));

    // Sync movies to local DB for display
    const allMovies = [heroCandidate.movie, ...alts.map(a => a.movie)];
    await syncMoviesToDb(allMovies);

    return { hero, alts: altResults, seed };
}

function mapEraSlider(eraValue: number, year: number): number {
    // era 0 = prefer old (pre-1990), era 100 = prefer new (2020+)
    const movieAge = 2026 - year;
    const preferNewness = eraValue / 100;

    if (preferNewness > 0.7 && movieAge < 5) return 15;
    if (preferNewness > 0.7 && movieAge > 20) return 0;
    if (preferNewness < 0.3 && movieAge > 30) return 15;
    if (preferNewness < 0.3 && movieAge < 5) return 0;
    return 8; // Neutral
}

function mapPaceToneSlider(pace: number, tone: number, genreIds: number[]): number {
    let score = 0;

    // Pace: Action(28), Thriller(53) = exciting; Drama(18), Romance(10749) = slow
    const excitingGenres = new Set([28, 53, 27, 878]); // Action, Thriller, Horror, SciFi
    const slowGenres = new Set([18, 10749, 36]); // Drama, Romance, History

    const hasExciting = genreIds.some(g => excitingGenres.has(g));
    const hasSlow = genreIds.some(g => slowGenres.has(g));

    if (pace > 70 && hasExciting) score += 8;
    if (pace < 30 && hasSlow) score += 8;

    // Tone: Comedy(35) = funny; Drama(18), Horror(27) = serious
    const funnyGenres = new Set([35, 16]); // Comedy, Animation
    const seriousGenres = new Set([18, 27, 10752]); // Drama, Horror, War

    const hasFunny = genreIds.some(g => funnyGenres.has(g));
    const hasSerious = genreIds.some(g => seriousGenres.has(g));

    if (tone > 70 && hasFunny) score += 7;
    if (tone < 30 && hasSerious) score += 7;

    return score;
}

function selectDiverseAlts(scored: Array<{ movie: any; score: number }>, count: number): Array<{ movie: any; score: number }> {
    const result: Array<{ movie: any; score: number }> = [];
    const usedPrimaryGenres = new Set<number>();

    for (const s of scored) {
        if (result.length >= count) break;
        const primaryGenre = s.movie.genre_ids?.[0];
        if (primaryGenre && usedPrimaryGenres.has(primaryGenre)) continue;
        result.push(s);
        if (primaryGenre) usedPrimaryGenres.add(primaryGenre);
    }

    // Fill remaining slots if needed
    while (result.length < count && scored.length > result.length) {
        const next = scored.find(s => !result.includes(s));
        if (next) result.push(next);
        else break;
    }

    return result;
}

function buildMovieWithReasons(movie: any, settings: WizardSettings, providerIds: number[], preferredGenres: Set<number>): MovieWithReasons {
    const reasons: string[] = [];

    // Provider availability
    reasons.push("Available on your streaming services");

    // Genre match
    const matchedGenres = (movie.genre_ids || []).filter((g: number) => preferredGenres.has(g));
    if (matchedGenres.length > 0) {
        reasons.push("Matches your taste");
    }

    // Slider vibe
    if (settings.pace > 70) {
        reasons.push("Fits an exciting pick");
    } else if (settings.pace < 30) {
        reasons.push("Perfect for a slow evening");
    }

    return {
        id: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
        year: movie.release_date ? parseInt(movie.release_date.split("-")[0]) : null,
        reasons: reasons.slice(0, 3)
    };
}

async function syncMoviesToDb(movies: any[]) {
    for (const movie of movies) {
        await prisma.movie.upsert({
            where: { tmdbId: movie.id },
            update: {
                title: movie.title,
                posterPath: movie.poster_path,
                backdropPath: movie.backdrop_path,
                genreIds: movie.genre_ids?.join(","),
                voteAverage: movie.vote_average
            },
            create: {
                tmdbId: movie.id,
                title: movie.title,
                posterPath: movie.poster_path,
                backdropPath: movie.backdrop_path,
                genreIds: movie.genre_ids?.join(","),
                voteAverage: movie.vote_average
            }
        });
    }
}

// Simple seeded random (Mulberry32)
function mulberry32(seed: number): () => number {
    return function () {
        let t = seed += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
}
