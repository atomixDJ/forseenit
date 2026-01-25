import Header from "@/components/layout/Header";
import Container from "@/components/layout/Container";
import Footer from "@/components/layout/Footer";
import SearchInput from "@/components/search/SearchInput";
import { searchMovies } from "@/lib/tmdb";
import PosterCard from "@/components/movie/PosterCard";
import { Sparkles } from "lucide-react";

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}) {
    const query = (await searchParams).q;
    const movies = query ? await searchMovies(query) : null;

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <Container>
                <main className="py-12">
                    <div className="space-y-12">
                        <section className="text-center space-y-4">
                            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
                                Find <span className="text-[#99aabb] font-light">or</span> ASK
                            </h1>
                            <p className="text-[#99aabb] uppercase text-[10px] font-bold tracking-[0.3em]">
                                The global film database
                            </p>
                        </section>

                        <SearchInput />

                        {query ? (
                            <div className="space-y-8">
                                <div className="section-header">
                                    <span>Results for &ldquo;{query}&rdquo;</span>
                                </div>

                                {movies?.results?.length ? (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 justify-items-center">
                                        {movies.results.map((movie) => (
                                            <PosterCard key={movie.id} movie={movie} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-20 text-[#99aabb] italic">
                                        No movies found. Try asking our agent?
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-20 text-[#334455] italic uppercase text-[10px] font-bold tracking-[0.4em]">
                                Search for any film, actor or director...
                            </div>
                        )}
                    </div>
                </main>
            </Container>
            <Footer />
        </div>
    );
}
