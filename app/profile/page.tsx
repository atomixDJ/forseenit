import React from 'react';
import Header from "@/components/layout/Header";
import Container from "@/components/layout/Container";
import Footer from "@/components/layout/Footer";
import { requireAppUserIdPage } from "@/lib/clerk-auth-helpers";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { getUserAnalytics } from "@/app/actions/analytics";
import StatCard from "@/components/profile/StatCard";
import RatingDistribution from "@/components/profile/RatingDistribution";
import SubscriptionManager from "@/components/profile/SubscriptionManager";
import MovieCollectionGrid from "@/components/profile/MovieCollectionGrid";
import { getUserSubscriptions } from "@/app/actions/subscriptions";
import { Clock, Star, Heart, Plus, Users } from "lucide-react";
import Image from "next/image";
import { getTMDBImage } from "@/lib/tmdb";
import { getUserWatchedMovies, getUserRatedMovies } from "@/app/actions/interactions";
import PaginatedMovieRail from "@/components/profile/PaginatedMovieRail";
import TopTen from "@/components/profile/TopTen";
import { getTopTen } from "@/app/actions/top-ten";
import { getFollowCounts } from "@/app/actions/follow";
import { getFollowing, getFollowers } from "@/app/actions/social";
import ProfileSharingControls from "@/components/profile/ProfileSharingControls";
import FollowingStrip from "@/components/profile/FollowingStrip";
import FollowersStrip from "@/components/profile/FollowersStrip";
import { prisma } from "@/lib/prisma";

export default async function ProfilePage() {
    const userId = await requireAppUserIdPage(); // Redirects to /login if not authed
    const user = await currentUser();

    const analytics = await getUserAnalytics();
    if (!analytics) return null;

    const { stats, collections } = analytics;

    const [watchedHistory, ratedMovies, subscriptions, topTenMovies, followCounts, following, followers, dbUser] = await Promise.all([
        getUserWatchedMovies(20),
        getUserRatedMovies(20),
        getUserSubscriptions(),
        getTopTen(userId),
        getFollowCounts(userId),
        getFollowing(userId, 12),
        getFollowers(userId, 12),
        prisma.user.findUnique({ where: { id: userId }, select: { handle: true } }),
    ]);

    const userHandle = dbUser?.handle || "user";

    // Use the backdrop of the first masterpieces or latest watched as a decorative background
    const bgMovie = collections.masterpieces[0] || collections.watchlist[0];
    const bgUrl = bgMovie
        ? getTMDBImage((bgMovie as any).backdropPath || (bgMovie as any).backdrop_path, 'original')
        : null;

    // Map WatchlistMovie to match the grid's movie interface
    const watchlistMovies = collections.watchlist.map(m => ({
        id: m.movieId,
        title: m.title,
        posterPath: m.posterPath,
        backdropPath: m.backdropPath
    }));

    const masterpieceMovies = collections.masterpieces.filter((m): m is any => m !== null);
    const gemMovies = collections.forgottenGems.filter((m): m is any => m !== null);

    return (
        <div className="flex flex-col min-h-screen bg-[#14181c]">
            <Header />

            <div className="relative">
                {/* Immersive Decorative Backdrop */}
                {bgUrl && (
                    <div className="absolute top-0 left-0 w-full h-[60vh] opacity-20 pointer-events-none overflow-hidden">
                        <Image
                            src={bgUrl}
                            alt="Background"
                            fill
                            className="object-cover blur-[100px]"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#14181c]/0 via-[#14181c]/50 to-[#14181c]" />
                    </div>
                )}

                <Container>
                    <main className="relative z-10 py-12 space-y-16">
                        {/* Header Section */}
                        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div className="space-y-3">
                                <h1 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter leading-none">
                                    @{userHandle}<span className="text-brand">.</span>
                                </h1>
                                {/* Follower / Following Counts */}
                                <div className="flex items-center gap-4">
                                    <Link
                                        href={`/u/${userHandle}/followers`}
                                        className="flex items-center gap-1.5 text-[#99aabb] hover:text-white transition-colors"
                                    >
                                        <Users className="w-4 h-4" />
                                        <strong className="text-white">{followCounts.followers}</strong>
                                        <span className="text-[10px] uppercase tracking-wider">followers</span>
                                    </Link>
                                    <span className="text-[#556677]">·</span>
                                    <Link
                                        href={`/u/${userHandle}/following`}
                                        className="flex items-center gap-1.5 text-[#99aabb] hover:text-white transition-colors"
                                    >
                                        <strong className="text-white">{followCounts.following}</strong>
                                        <span className="text-[10px] uppercase tracking-wider">following</span>
                                    </Link>
                                </div>
                                <p className="text-[#99aabb] uppercase text-[10px] font-bold tracking-[0.4em] max-w-xl">
                                    Your personal cinema dashboard. Tracking every frame, rating every moment.
                                </p>
                            </div>
                            <div className="flex flex-col gap-3 self-start md:self-auto">
                                <ProfileSharingControls handle={userHandle} />
                                <Link
                                    href="/settings/import/letterboxd"
                                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-[4px] bg-white/5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-[0.15em] hover:bg-white/10 transition-all"
                                >
                                    <Plus className="w-3.5 h-3.5 text-brand" />
                                    <span>Import Data</span>
                                </Link>
                            </div>
                        </header>

                        {/* Your Services */}
                        <SubscriptionManager activeProviderIds={subscriptions.map(s => s.providerId)} />

                        {/* My Top Ten */}
                        <TopTen initialMovies={topTenMovies} isOwner={true} userId={userId} />

                        {/* Following & Followers - Side by Side */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Following */}
                            <FollowingStrip
                                following={following}
                                handle={userHandle}
                                emptyMessage="You're not following anyone yet. Find people in Search."
                            />

                            {/* Followers */}
                            <FollowersStrip
                                followers={followers}
                                handle={userHandle}
                                emptyMessage="No followers yet."
                            />
                        </div>

                        {/* Dashboard Section */}
                        <div>
                            <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase mb-2">
                                Your Stats<span className="text-brand">.</span>
                            </h2>
                            <p className="text-[#556677] text-[10px] uppercase tracking-[0.2em] font-bold mb-4">
                                Your cinema journey at a glance
                            </p>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                <StatCard
                                    label="Total Cinema"
                                    value={stats.totalHours}
                                    icon={Clock}
                                    subtitle="hours watched"
                                    link="#watched"
                                    linkText="Full History"
                                />
                                <StatCard
                                    label="Genre Affinity"
                                    value={stats.favoriteGenre}
                                    icon={Heart}
                                    subtitle="top genre"
                                />
                                <StatCard
                                    label="Average Rating"
                                    value={stats.averageRating}
                                    icon={Star}
                                    subtitle="/ 5 stars"
                                    link="#rated"
                                    linkText="Your Ratings"
                                />
                                {/* Ratings Distribution as 4th card */}
                                <RatingDistribution
                                    distribution={analytics.distribution || {}}
                                    averageRating={stats.averageRating}
                                    totalWatched={stats.watchedCount}
                                    totalHours={stats.totalHours}
                                    totalRated={stats.ratedCount}
                                />
                            </div>
                        </div>

                        {/* Movie Collections */}
                        <div className="space-y-8">
                            <MovieCollectionGrid
                                title="Watchlist"
                                subtitle="To Watch"
                                movies={watchlistMovies}
                            />
                            <MovieCollectionGrid
                                title="Masterpieces"
                                subtitle="5 Star Rated"
                                movies={masterpieceMovies}
                            />
                            <MovieCollectionGrid
                                title="Forgotten Gems"
                                subtitle="Your Favorites"
                                movies={gemMovies}
                            />
                        </div>

                        {/* Full Lists (Newest First) */}
                        <div id="watched" className="pt-20">
                            <PaginatedMovieRail
                                title="Watched History"
                                subtitle="All Time"
                                initialMovies={watchedHistory.items}
                                initialNextCursor={watchedHistory.nextCursor}
                                fetchAction={getUserWatchedMovies}
                            />
                        </div>

                        <div id="rated" className="pt-20">
                            <PaginatedMovieRail
                                title="Your Ratings"
                                subtitle="Star Ranked"
                                initialMovies={ratedMovies.items}
                                initialNextCursor={ratedMovies.nextCursor}
                                fetchAction={getUserRatedMovies}
                            />
                        </div>
                    </main>
                </Container>
            </div>

            <Footer />
        </div>
    );
}
