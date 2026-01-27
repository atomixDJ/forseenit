import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import PosterCard from "@/components/movie/PosterCard";
import { getUserWatchlistMovies } from "@/app/actions/interactions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Bookmark, Plus } from "lucide-react";

export default async function WatchlistPage() {
    const user = await currentUser();

    if (!user) {
        redirect("/login?callbackUrl=/watchlist");
    }

    const { items: movies } = await getUserWatchlistMovies(100);

    return (
        <div className="flex flex-col min-h-screen bg-[#14181c]">
            <Header />

            <main className="flex-grow pt-32 pb-20">
                <Container>
                    <header className="mb-12">
                        <div className="flex items-center gap-3 text-[#99aabb] uppercase text-[10px] font-bold tracking-[0.2em] mb-4">
                            <Bookmark className="w-3 h-3 text-brand" />
                            <span>My Collection</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter italic uppercase">
                            Watchlist
                        </h1>
                    </header>

                    {movies.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                            {movies.map((movie) => (
                                <PosterCard
                                    key={movie.id}
                                    movie={{
                                        ...movie as any,
                                        vote_average: movie.vote_average ?? 0
                                    }}
                                    userRating={movie.userRating}
                                    tmdbScore={movie.vote_average}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-40 text-center">
                            <div className="relative mb-8">
                                <div className="w-24 h-24 bg-[#1b2228] rounded-2xl flex items-center justify-center border border-white/5 shadow-2xl rotate-3">
                                    <Bookmark className="w-10 h-10 text-brand" />
                                </div>
                                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-brand/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-brand/20 animate-pulse">
                                    <Link href="/">
                                        <Plus className="w-5 h-5 text-brand" />
                                    </Link>
                                </div>
                            </div>
                            <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-3">Your Watchlist is Empty</h2>
                            <p className="text-[#556677] max-w-sm mb-10 leading-relaxed font-medium">
                                Collect the films you want to see. Your watchlist will help us personalize your ForSeenIt experience.
                            </p>
                            <Link href="/" className="bg-brand text-black px-10 py-3 rounded-full font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform">
                                Discover Films
                            </Link>
                        </div>
                    )}
                </Container>
            </main>

            <Footer />
        </div>
    );
}
