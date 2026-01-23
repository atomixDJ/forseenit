import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import { getMovieDetails, getTMDBImage, getRecommendations } from "@/lib/tmdb";
import HeroBackdrop from "@/components/movie/HeroBackdrop";
import WatchProviders from "@/components/movie/WatchProviders";
import Image from "next/image";
import WatchlistButton from "@/components/movie/WatchlistButton";
import StarRating from "@/components/movie/StarRating";
import Feed from "@/components/movie/Feed";
import { getWatchlistStatus } from "@/app/actions/watchlist";
import { getMovieRating } from "@/app/actions/ratings";
import { getMovieTrailer } from "@/lib/tmdb/getMovieTrailer";
import TrailerInline from "@/components/movie/TrailerInline";
import { Star, Clock, Play } from "lucide-react";

export default async function MoviePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const movieId = Number(id);

    const [movie, recommendations, isSaved, userRating, trailer] = await Promise.all([
        getMovieDetails(id),
        getRecommendations(id),
        getWatchlistStatus(movieId),
        getMovieRating(movieId),
        getMovieTrailer(movieId)
    ]);

    if (!movie) {
        return <div className="min-h-screen bg-[#14181c] text-white flex items-center justify-center font-bold">Movie not found</div>;
    }

    const cast = movie.credits?.cast?.slice(0, 10) || [];
    const director = movie.credits?.crew?.find((c: any) => c.job === "Director")?.name;

    return (
        <div className="flex flex-col min-h-screen bg-[#14181c]">
            <Header />

            <div className="relative">
                <HeroBackdrop movie={movie} />

                <Container>
                    <div className="relative -mt-40 md:-mt-64 z-10 pb-20">
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

                            {/* Left Column: Poster & Actions */}
                            <div className="lg:col-span-1 space-y-8">
                                <TrailerInline
                                    trailerKey={trailer?.key || null}
                                    posterPath={getTMDBImage(movie.poster_path, 'w780')}
                                    title={movie.title}
                                />

                                <div className="space-y-4">
                                    <WatchlistButton movie={movie} initialIsSaved={isSaved} />
                                    <div className="bg-[#1b2228]/60 p-5 rounded-[4px] border border-white/5 backdrop-blur-sm">
                                        <StarRating movieId={movieId} initialRating={userRating} />
                                    </div>
                                </div>

                                <div className="bg-[#1b2228]/60 p-6 rounded-[4px] border border-white/5 backdrop-blur-sm">
                                    <WatchProviders providers={movie["watch/providers"]} />
                                </div>
                            </div>

                            {/* Right Column: Content */}
                            <div className="lg:col-span-3 space-y-10">
                                <section>
                                    <div className="flex flex-wrap items-baseline gap-4 mb-4">
                                        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter italic uppercase">
                                            {movie.title}
                                        </h1>
                                        <span className="text-2xl font-light text-[#99aabb]">
                                            {movie.release_date ? new Date(movie.release_date).getFullYear() : 'TBA'}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-6 text-[#99aabb] uppercase text-[10px] font-bold tracking-[0.2em] mb-8">
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-[#99aabb] opacity-60">Directed by</span>
                                            <span className="text-white hover:text-brand cursor-pointer transition-colors border-b border-transparent hover:border-brand pb-0.5">{director || "Unknown"}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 border-l border-white/10 pl-6">
                                            <Clock className="h-3 w-3" />
                                            <span>{movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : 'N/A'}</span>
                                        </div>
                                    </div>

                                    <p className="text-lg text-[#99aabb] leading-relaxed max-w-2xl font-medium">
                                        {movie.overview}
                                    </p>
                                </section>

                                {/* Cast Section */}
                                <section>
                                    <div className="section-header">
                                        <span>CAST</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {cast.map((person: any) => (
                                            <div key={person.id} className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-[4px] text-[11px] transition-colors hover:bg-brand/10 hover:border-brand/30 cursor-pointer">
                                                <span className="text-white font-bold">{person.name}</span>
                                                <span className="text-[#99aabb] ml-2 opacity-60">{person.character}</span>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* Details Grid */}
                                <section>
                                    <div className="section-header">
                                        <span>DETAILS</span>
                                    </div>
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
                                        <div>
                                            <span className="block text-[#556677] uppercase text-[9px] font-bold tracking-[0.2em] mb-2.5">GENRES</span>
                                            <div className="flex flex-wrap gap-x-4 gap-y-1">
                                                {(movie as any).genres?.map((g: any) => (
                                                    <span key={g.id} className="text-white text-xs font-bold hover:text-brand cursor-pointer border-b border-white/10 hover:border-brand transition-colors">
                                                        {g.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <span className="block text-[#556677] uppercase text-[9px] font-bold tracking-[0.2em] mb-2.5">STATUS</span>
                                            <span className="text-white text-xs font-bold uppercase tracking-widest">{(movie as any).status || 'Released'}</span>
                                        </div>
                                        <div>
                                            <span className="block text-[#556677] uppercase text-[9px] font-bold tracking-[0.2em] mb-2.5">RATING</span>
                                            <div className="flex items-center gap-1.5">
                                                <Star className="h-3 w-3 fill-brand text-brand" />
                                                <span className="text-white text-xs font-bold">{movie.vote_average ? movie.vote_average.toFixed(1) : 'NR'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>

                        {/* Suggested Section */}
                        {recommendations.results?.length > 0 && (
                            <div className="mt-20">
                                <Feed id="suggested" title="Suggested" movies={recommendations.results} />
                            </div>
                        )}
                    </div>
                </Container>
            </div>

            <Footer />
        </div>
    );
}
