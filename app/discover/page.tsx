import Header from "@/components/layout/Header";
import Container from "@/components/layout/Container";
import Footer from "@/components/layout/Footer";
import { discoverMovies, DiscoverParams } from "@/lib/tmdb";
import InfiniteFeed from "@/components/movie/InfiniteFeed";
import FilterBar from "@/components/discovery/FilterBar";
import { getUserSeenMovieIds } from "@/app/actions/interactions";
import { auth } from "@/auth";

export default async function DiscoverPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const session = await auth();
    const sp = await searchParams;

    // Parse filters
    const genres = sp.genres as string;
    const providers = sp.providers as string;
    const minRuntime = sp.runtime_min as string;
    const maxRuntime = sp.runtime_max as string;

    const discoverParams: DiscoverParams = {
        page: 1,
        with_genres: genres,
        with_watch_providers: providers,
        with_watch_monetization_types: providers ? 'flatrate' : undefined,
        watch_region: 'US', // Default to US, could be dynamic
        'with_runtime.gte': minRuntime ? parseInt(minRuntime) : undefined,
        'with_runtime.lte': maxRuntime ? parseInt(maxRuntime) : undefined,
        sort_by: 'popularity.desc',
    };

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
                <main className="py-12 space-y-12">
                    <section className="space-y-4">
                        <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase leading-none">
                            Discover<span className="text-brand">.</span>
                        </h1>
                        <p className="text-[#99aabb] uppercase text-[10px] font-bold tracking-[0.4em] max-w-xl">
                            Filter by mood, length, or platform. Find exactly what you didn't know you wanted to watch.
                        </p>
                    </section>

                    <FilterBar />

                    <InfiniteFeed initialMovies={filteredMovies} params={discoverParams} seenIds={seenIds} />
                </main>
            </Container>
            <Footer />
        </div>
    );
}
