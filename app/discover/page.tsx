import Header from "@/components/layout/Header";
import Container from "@/components/layout/Container";
import Footer from "@/components/layout/Footer";
import { discoverMovies, type DiscoverParams } from "@/lib/tmdb";
import InfiniteFeed from "@/components/movie/InfiniteFeed";
import { getUserSeenMovieIds } from "@/app/actions/interactions";
import { auth } from "@/auth";
import { getMovieGenres } from "@/lib/discovery/genres";
import {
    parseFiltersFromParams,
    getDecadeYearRange,
    getLengthRuntimeRange,
    getMoodGenreIds,
    type DiscoveryFilters,
} from "@/lib/discovery/filters";
import FilterSidebarClient from "@/components/discovery/FilterSidebarClient";

export default async function DiscoverPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const session = await auth();
    const sp = await searchParams;
    const params = new URLSearchParams();

    // Convert search params to URLSearchParams for parsing
    Object.entries(sp).forEach(([key, value]) => {
        if (typeof value === "string") {
            params.set(key, value);
        }
    });

    // Parse unified filters from URL
    const filters = parseFiltersFromParams(params);

    // Load genres server-side (same source as /api/genres)
    const genres = await getMovieGenres();

    // Build TMDb discover params from unified filters
    const discoverParams = buildDiscoverParams(filters);

    // Initial fetch
    const [result, seenIds] = await Promise.all([
        discoverMovies(discoverParams),
        session ? getUserSeenMovieIds() : Promise.resolve([]),
    ]);

    const seenSet = new Set(seenIds);
    const filteredMovies = result.results.filter(m => !seenSet.has(m.id));

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <Container>
                <main className="py-12">
                    {/* Page Header */}
                    <section className="mb-8">
                        <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase leading-none">
                            Discover<span className="text-brand">.</span>
                        </h1>
                        <p className="text-[#99aabb] uppercase text-[10px] font-bold tracking-[0.4em] max-w-xl mt-2">
                            Filter by mood, length, or platform. Find exactly what you didn't know you wanted to watch.
                        </p>
                    </section>

                    {/* Two-Column Layout */}
                    <div className="flex gap-8">
                        {/* Left Column: Filters */}
                        <FilterSidebarClient genres={genres} initialFilters={filters} />

                        {/* Right Column: Movie Results */}
                        <div className="flex-1 min-w-0">
                            <InfiniteFeed initialMovies={filteredMovies} params={discoverParams} seenIds={seenIds} />
                        </div>
                    </div>
                </main>
            </Container>
            <Footer />
        </div>
    );
}

/**
 * Build TMDb DiscoverParams from unified DiscoveryFilters.
 * 
 * Filter combination uses AND semantics:
 * genre AND decade AND rating AND mood AND length AND providers
 */
function buildDiscoverParams(filters: DiscoveryFilters): DiscoverParams {
    const params: DiscoverParams = {
        page: 1,
        sort_by: "popularity.desc",
    };

    // Genre filter (single genre)
    // If mood is also set, we combine them (mood adds additional genre constraints)
    let genreIds: string[] = [];
    if (filters.genreId) {
        genreIds.push(filters.genreId.toString());
    }

    // Mood filter (maps to multiple genres)
    const moodGenres = getMoodGenreIds(filters.moodKey);
    if (moodGenres) {
        // Mood genres are comma-separated, split and add
        genreIds.push(...moodGenres.split(","));
    }

    if (genreIds.length > 0) {
        // Remove duplicates and join
        params.with_genres = [...new Set(genreIds)].join(",");
    }

    // Decade filter → date range
    const dateRange = getDecadeYearRange(filters.decadeKey);
    if (dateRange.gte) {
        params["primary_release_date.gte"] = dateRange.gte;
    }
    if (dateRange.lte) {
        params["primary_release_date.lte"] = dateRange.lte;
    }

    // Rating filter → vote_average.gte
    if (filters.minRating !== null) {
        params["vote_average.gte"] = filters.minRating;
    }

    // Length filter → runtime range
    const runtimeRange = getLengthRuntimeRange(filters.lengthKey);
    if (runtimeRange.min !== undefined) {
        params["with_runtime.gte"] = runtimeRange.min;
    }
    if (runtimeRange.max !== undefined) {
        params["with_runtime.lte"] = runtimeRange.max;
    }

    // Streaming providers (OR logic - show movies on ANY selected service)
    if (filters.streamingProviderIds.length > 0) {
        params.with_watch_providers = filters.streamingProviderIds.join("|");
        params.with_watch_monetization_types = "flatrate";
        params.watch_region = "US";
    }

    return params;
}
