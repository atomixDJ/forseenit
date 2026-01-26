// "use server"; // Server action

import { prisma } from "@/lib/prisma";
import { getAppUserId } from "@/lib/clerk-auth-helpers";
import { discoverMovies } from "@/lib/tmdb";
import { Movie } from "@/lib/tmdb"; // type import if needed

/**
 * Result shape for Tonight recommendations.
 */
export interface TonightResult {
    movies: Movie[];
    meta: {
        providerMode: "MY_SERVICES" | "ALL";
        hasProviders: boolean;
        hasGenres: boolean;
        hasRuntimeFilter: boolean;
        appliedFilters: string[]; // e.g., ["providers","genres","runtime"]
        fellBack: boolean;
        fellBackFrom: string[]; // which steps were relaxed
    };
}

/**
 * Helper to fetch user preferences.
 */async function getUserPreferences(userId: string) {
    const [settings, subs, genres] = await Promise.all([
        prisma.userSettings.findUnique({ where: { userId } }),
        prisma.streamingSubscription.findMany({ where: { userId } }),
        prisma.userPreferredGenre.findMany({ where: { userId }, orderBy: { genreId: "asc" } }),
    ]);
    return { settings, subs, genres };
}

/**
 * Build TMDb discover parameters based on inputs.
 */
function buildParams({ providerMode, providerIds, genreIds, runtimeMin, runtimeMax }: {
    providerMode: "MY_SERVICES" | "ALL";
    providerIds: number[];
    genreIds: number[];
    runtimeMin?: number;
    runtimeMax?: number;
}) {
    const region = "US"; // default region; could be from settings
    const params: any = {
        watch_region: region,
        with_watch_monetization_types: "flatrate",
        sort_by: "popularity.desc",
        "vote_count.gte": 200,
    };
    if (providerMode === "MY_SERVICES" && providerIds.length) {
        params.with_watch_providers = providerIds.join("|");
    }
    if (genreIds.length) {
        params.with_genres = genreIds.join(",");
    }
    // Apply runtime guards (default floor/ceiling if not set)
    params["with_runtime.gte"] = runtimeMin ?? 70;
    params["with_runtime.lte"] = runtimeMax ?? 180;
    return params;
}

/**
 * Main action to get Tonight recommendations.
 */
export async function getTonightRecommendations(userId?: string): Promise<TonightResult> {
    // Resolve userId if not provided (current logged‑in user)
    const resolvedUserId = userId ?? (await getAppUserId());
    const meta = {
        providerMode: "ALL" as "MY_SERVICES" | "ALL",
        hasProviders: false,
        hasGenres: false,
        hasRuntimeFilter: false,
        appliedFilters: [] as string[],
        fellBack: false,
        fellBackFrom: [] as string[],
    };

    if (!resolvedUserId) {
        // No user – fallback to ALL with no filters
        const params = buildParams({ providerMode: "ALL", providerIds: [], genreIds: [], runtimeMin: undefined, runtimeMax: undefined });
        const data = await discoverMovies(params);
        return { movies: data.results, meta };
    }

    const { settings, subs, genres } = await getUserPreferences(resolvedUserId);
    const providerIds = subs.map((s) => s.providerId);
    const genreIds = genres.map((g) => g.genreId);

    // Determine initial mode
    const hasProviders = providerIds.length > 0;
    const hasGenres = genreIds.length > 0;
    const hasRuntime = !!(settings?.runtimeMin ?? settings?.runtimeMax);

    meta.providerMode = hasProviders ? "MY_SERVICES" : "ALL";
    meta.hasProviders = hasProviders;
    meta.hasGenres = hasGenres;
    meta.hasRuntimeFilter = hasRuntime;
    if (hasProviders) meta.appliedFilters.push("providers");
    if (hasGenres) meta.appliedFilters.push("genres");
    if (hasRuntime) meta.appliedFilters.push("runtime");

    // Initial query
    let params = buildParams({
        providerMode: meta.providerMode,
        providerIds,
        genreIds,
        runtimeMin: settings?.runtimeMin ?? undefined,
        runtimeMax: settings?.runtimeMax ?? undefined,
    });

    let data = await discoverMovies(params);

    // Fallback ladder if less than 20 results
    const MIN_RESULTS = 20;
    if (data.results.length >= MIN_RESULTS) {
        return { movies: data.results, meta };
    }

    // Step 1: Drop runtime constraints
    meta.fellBack = true;
    meta.fellBackFrom.push("runtime");
    params = { ...params };
    delete params["with_runtime.gte"];
    delete params["with_runtime.lte"];
    data = await discoverMovies(params);
    if (data.results.length >= MIN_RESULTS) {
        return { movies: data.results, meta };
    }

    // Step 2: Reduce genres to first 2
    meta.fellBackFrom.push("genres");
    const reducedGenreIds = genreIds.slice(0, 2);
    params = buildParams({
        providerMode: meta.providerMode,
        providerIds,
        genreIds: reducedGenreIds,
        runtimeMin: undefined,
        runtimeMax: undefined,
    });
    data = await discoverMovies(params);
    if (data.results.length >= MIN_RESULTS) {
        return { movies: data.results, meta };
    }

    // Step 3: Drop genres entirely
    meta.fellBackFrom = meta.fellBackFrom.filter((f) => f !== "genres"); // keep previous but indicate drop
    params = buildParams({
        providerMode: meta.providerMode,
        providerIds,
        genreIds: [],
        runtimeMin: undefined,
        runtimeMax: undefined,
    });
    data = await discoverMovies(params);
    if (data.results.length >= MIN_RESULTS) {
        return { movies: data.results, meta };
    }

    // Step 4: Switch to ALL providers
    meta.fellBackFrom.push("MY_SERVICES");
    meta.providerMode = "ALL";
    params = buildParams({
        providerMode: "ALL",
        providerIds: [],
        genreIds: [],
        runtimeMin: undefined,
        runtimeMax: undefined,
    });
    data = await discoverMovies(params);
    return { movies: data.results, meta };
}
