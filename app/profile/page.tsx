import React from 'react';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import { getUserAnalytics } from "@/app/actions/analytics";
import { getUserRatedMovies } from "@/app/actions/ratings";
import { getWatchlist } from "@/app/actions/watchlist";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import StatsCard from "@/components/profile/StatsCard";
import PosterCard from "@/components/movie/PosterCard";
import { Film, Bookmark, Star, Clock } from 'lucide-react';
import Image from 'next/image';

export default async function ProfilePage() {
    const session = await auth();
    if (!session) {
        redirect("/login?callbackUrl=/profile");
    }

    const [data, ratedMovies, watchlist] = await Promise.all([
        getUserAnalytics(),
        getUserRatedMovies(),
        getWatchlist()
    ]);

    if (!data) return null;

    return (
        <div className="flex flex-col min-h-screen bg-[#14181c]">
            <Header />

            <main className="flex-grow pt-32 pb-20">
                <Container>
                    {/* User Header */}
                    <header className="flex flex-col md:flex-row items-center gap-8 mb-16">
                        <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-brand/20 shadow-[0_0_30px_rgba(0,224,84,0.1)]">
                            <Image
                                src={session.user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(session.user?.name || 'U')}&background=1b2228&color=fff`}
                                alt={session.user?.name || 'User'}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter italic uppercase mb-2">
                                {session.user?.name}
                            </h1>
                            <div className="flex items-center justify-center md:justify-start gap-4 text-[#556677] uppercase text-[10px] font-bold tracking-[0.2em]">
                                <span>Member since {new Date((session.user as any).createdAt || Date.now()).getFullYear()}</span>
                                <span className="w-1 h-1 rounded-full bg-[#334455]" />
                                <span>Film Enthusiast</span>
                            </div>
                        </div>
                    </header>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                        <StatsCard
                            label="Total Films"
                            value={data.stats.totalRated}
                            icon={Film}
                            subtitle="Watched & Rated"
                        />
                        <StatsCard
                            label="Watchlist"
                            value={data.stats.watchlistCount}
                            icon={Bookmark}
                            subtitle="To be seen"
                        />
                        <StatsCard
                            label="Avg Rating"
                            value={data.stats.averageRating}
                            icon={Star}
                            subtitle="Stars out of 5.0"
                        />
                    </div>

                    {/* Watchlist Grid */}
                    <section className="mb-16">
                        <div className="flex items-center justify-between mb-8 border-b border-[#334455] pb-2">
                            <h2 className="text-[#99aabb] uppercase text-[12px] font-bold tracking-[0.2em] flex items-center gap-2">
                                <Bookmark className="w-4 h-4 text-[#00e054]" />
                                Your Watchlist
                            </h2>
                            <span className="text-[10px] font-bold text-[#556677] uppercase tracking-widest">
                                {watchlist.length} Films
                            </span>
                        </div>

                        {watchlist.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                                {watchlist.map((m) => (
                                    <PosterCard
                                        key={m.id}
                                        movie={{
                                            id: m.movieId,
                                            title: m.title,
                                            poster_path: m.posterPath,
                                            vote_average: 0,
                                            release_date: ""
                                        } as any}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-[#1b2228]/40 border border-dashed border-white/10 rounded-lg py-20 text-center">
                                <Bookmark className="w-12 h-12 text-[#334455] mx-auto mb-4 opacity-20" />
                                <p className="text-[#556677] font-medium italic">Your watchlist is empty.</p>
                                <p className="text-[#334455] text-xs mt-2 uppercase tracking-widest">Add films to keep track of what you want to see</p>
                            </div>
                        )}
                    </section>

                    {/* Rated Movies Grid */}
                    <section>
                        <div className="flex items-center justify-between mb-8 border-b border-[#334455] pb-2">
                            <h2 className="text-[#99aabb] uppercase text-[12px] font-bold tracking-[0.2em] flex items-center gap-2">
                                <Clock className="w-4 h-4 text-[#00e054]" />
                                Recently Rated
                            </h2>
                            <span className="text-[10px] font-bold text-[#556677] uppercase tracking-widest">
                                {ratedMovies.length} Films
                            </span>
                        </div>

                        {ratedMovies.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                                {ratedMovies.map((movie) => (
                                    <PosterCard
                                        key={movie.id}
                                        movie={movie}
                                        userRating={movie.userRating}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-[#1b2228]/40 border border-dashed border-white/10 rounded-lg py-20 text-center">
                                <Star className="w-12 h-12 text-[#334455] mx-auto mb-4 opacity-20" />
                                <p className="text-[#556677] font-medium italic">You haven't rated any films yet.</p>
                                <p className="text-[#334455] text-xs mt-2 uppercase tracking-widest">Start exploring to build your profile</p>
                            </div>
                        )}
                    </section>
                </Container>
            </main>

            <Footer />
        </div>
    );
}
