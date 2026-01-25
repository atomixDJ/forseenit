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
import { getMovieInteractionStatus } from "@/app/actions/interactions";
import { getMovieTrailer } from "@/lib/tmdb/getMovieTrailer";
import TrailerInline from "@/components/movie/TrailerInline";
import InteractionButtons from "@/components/movie/InteractionButtons";
import ReviewSection from "@/components/movie/ReviewSection";
import { Star, Clock, Play, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma"; // Direct access for fallback
import AddToTopTenButton from "@/components/movie/AddToTopTenButton";
import { getTopTen } from "@/app/actions/top-ten";
import { currentUser } from "@clerk/nextjs/server";

export default async function MoviePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const movieId = Number(id);

    let movie: any = null;
    let recommendations: any = { results: [] };
    let trailer: any = null;
    let interactions: any = { watchlisted: false, favorite: false, watched: false, ratingHalf: null };
    let isOffline = false;

    try {
        const [tmdbMovie, tmdbRecs, tmdbTrailer, userInteractions] = await Promise.all([
            getMovieDetails(id),
            getRecommendations(id),
            getMovieTrailer(movieId),
            getMovieInteractionStatus(movieId)
        ]);
        movie = tmdbMovie;
        recommendations = tmdbRecs;
        trailer = tmdbTrailer;
        interactions = userInteractions;
    } catch (e) {
        // Fallback for Dummy/Offline Movies
        console.warn(`Failed to fetch TMDB details for ${id}, checking local DB...`);
        const localMovie = await prisma.movie.findUnique({ where: { tmdbId: movieId } });

        if (localMovie) {
            isOffline = true;
            movie = {
                id: localMovie.tmdbId,
                title: localMovie.title,
                overview: "This movie helps simulate a populated database but lacks full metadata because it couldn't be fetched from TMDb (likely due to missing API key or network restrictions).",
                poster_path: localMovie.posterPath,
                backdrop_path: localMovie.backdropPath,
                release_date: null,
                vote_average: 0,
                runtime: 0,
                credits: { cast: [], crew: [] },
                "watch/providers": { results: {} }
            };
            // Still get interactions
            interactions = await getMovieInteractionStatus(movieId);
        }
    }

    if (!movie) {
        return (
            <div className="min-h-screen bg-[#14181c] text-white flex flex-col items-center justify-center space-y-4">
                <h1 className="text-4xl font-black uppercase">Movie Not Found</h1>
                <p className="text-[#99aabb]">The requested movie could not be located.</p>
                <Link href="/" className="px-6 py-2 bg-brand text-black font-bold rounded">Go Home</Link>
            </div>
        );
    }

    const cast = movie.credits?.cast?.slice(0, 10) || [];
    const director = movie.credits?.crew?.find((c: any) => c.job === "Director")?.name;

    const user = await currentUser();
    let topTenStatus = { isAdded: false, isFull: false, showButton: false };

    if (user) {
        // Fetch App User ID
        const dbUser = await prisma.user.findUnique({ where: { clerkId: user.id }, select: { id: true } });
        if (dbUser) {
            const topTen = await getTopTen(dbUser.id);
            const isAdded = topTen.some((t: any) => t.tmdbId === movieId);
            const isFull = topTen.length >= 10;
            topTenStatus = { isAdded, isFull, showButton: true };
        }
    }

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
                                    <WatchlistButton movie={movie} initialIsSaved={interactions.watchlisted} />
                                    {topTenStatus.showButton && (
                                        <AddToTopTenButton
                                            tmdbId={movieId}
                                            initialIsAdded={topTenStatus.isAdded}
                                            isFull={topTenStatus.isFull && !topTenStatus.isAdded}
                                        />
                                    )}
                                    <InteractionButtons
                                        movieId={movieId}
                                        movieTitle={movie.title}
                                        initialFavorite={interactions.favorite}
                                        initialWatched={interactions.watched}
                                        initialRating={interactions.ratingHalf ? interactions.ratingHalf / 2 : null}
                                    />
                                    <div className="bg-[#1b2228]/60 p-5 rounded-[4px] border border-white/5 backdrop-blur-sm">
                                        <StarRating movieId={movieId} initialRating={interactions.ratingHalf ? interactions.ratingHalf / 2 : null} />
                                    </div>
                                </div>

                                {!isOffline && (
                                    <div className="bg-[#1b2228]/60 p-6 rounded-[4px] border border-white/5 backdrop-blur-sm">
                                        <WatchProviders tmdbId={movieId} />
                                    </div>
                                )}
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

                                    {isOffline ? (
                                        <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded mb-8 flex items-start gap-4">
                                            <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                                            <div>
                                                <h3 className="text-yellow-500 font-bold text-sm uppercase mb-1">Preview Only</h3>
                                                <p className="text-yellow-500/80 text-xs">
                                                    This movie entry is a placeholder generated during seeding. Full metadata (cast, crew, runtime) is unavailable because the server could not connect to TMDb.
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-6 text-[#99aabb] uppercase text-[10px] font-bold tracking-[0.2em] mb-8">
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-[#99aabb] opacity-60">Directed by</span>
                                                {movie.credits?.crew?.find((c: any) => c.job === "Director") ? (
                                                    <Link
                                                        href={`/actor/${movie.credits.crew.find((c: any) => c.job === "Director").id}`}
                                                        className="text-white hover:text-brand transition-colors border-b border-white/5 hover:border-brand pb-0.5"
                                                    >
                                                        {director}
                                                    </Link>
                                                ) : (
                                                    <span className="text-white pb-0.5">{director || "Unknown"}</span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-1.5 border-l border-white/10 pl-6">
                                                <Clock className="h-3 w-3" />
                                                <span>{movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : 'N/A'}</span>
                                            </div>
                                        </div>
                                    )}

                                    <p className="text-lg text-[#99aabb] leading-relaxed max-w-2xl font-medium">
                                        {movie.overview}
                                    </p>
                                </section>

                                {/* Cast Section - Hidden if Offline */}
                                {!isOffline && (
                                    <section>
                                        <div className="section-header">
                                            <span>CAST</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {cast.map((person: any) => (
                                                <Link
                                                    key={person.id}
                                                    href={`/actor/${person.id}`}
                                                    className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-[4px] text-[11px] transition-colors hover:bg-brand/10 hover:border-brand/30 group"
                                                >
                                                    <span className="text-white font-bold group-hover:text-brand transition-colors">{person.name}</span>
                                                    <span className="text-[#99aabb] ml-2 opacity-60">{person.character}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    </section>
                                )}

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
                                                {(!movie.genres || movie.genres.length === 0) && <span className="text-white/20 text-xs">N/A</span>}
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

                                {/* Reviews Section */}
                                <ReviewSection movieId={movieId} />
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
