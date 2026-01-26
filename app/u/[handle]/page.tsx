import React from 'react';
import Header from "@/components/layout/Header";
import Container from "@/components/layout/Container";
import Footer from "@/components/layout/Footer";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getFollowCounts, getFollowStatus, getCurrentUserId } from "@/app/actions/follow";
import { getTopTen } from "@/app/actions/top-ten";
import TopTen from "@/components/profile/TopTen";
import FollowButton from "@/components/profile/FollowButton";
import { Users } from "lucide-react";
import { getFollowing, getRecentlyRatedMovies, getFollowers } from "@/app/actions/social";
import FollowingStrip from "@/components/profile/FollowingStrip";
import FollowersStrip from "@/components/profile/FollowersStrip";
import RecentlyRatedGrid from "@/components/profile/RecentlyRatedGrid";

interface PublicProfilePageProps {
    params: Promise<{ handle: string }>;
}

export default async function PublicProfilePage({ params }: PublicProfilePageProps) {
    const { handle } = await params;

    // Fetch user by handle - public, no auth required
    const user = await prisma.user.findUnique({
        where: { handle },
        select: {
            id: true,
            handle: true,
            name: true,
            image: true,
        },
    });

    if (!user) {
        notFound();
    }

    // Fetch social data in parallel
    const [followCounts, followStatus, currentUserId, topTenMovies, following, followers, recentlyRated] = await Promise.all([
        getFollowCounts(user.id),
        getFollowStatus(user.id),
        getCurrentUserId(),
        getTopTen(user.id),
        getFollowing(user.id, 12),
        getFollowers(user.id, 12),
        getRecentlyRatedMovies(user.id, 12),
    ]);

    const isLoggedIn = !!currentUserId;
    const isOwnProfile = currentUserId === user.id;
    const isFollowing = followStatus?.isFollowing ?? false;

    return (
        <div className="flex flex-col min-h-screen bg-[#14181c]">
            <Header />

            <Container>
                <main className="py-12 space-y-12">
                    {/* Profile Header */}
                    <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                            {/* Avatar */}
                            <div className="relative w-24 h-24 rounded-full overflow-hidden bg-[#1b2228] border-2 border-white/10">
                                {user.image ? (
                                    <Image
                                        src={user.image}
                                        alt={`@${user.handle}`}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-3xl font-black text-[#556677]">
                                        {user.handle.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>

                            {/* Handle & Stats */}
                            <div className="space-y-2">
                                <h1 className="text-3xl md:text-4xl font-black text-white italic tracking-tighter">
                                    @{user.handle}<span className="text-brand">.</span>
                                </h1>

                                {/* Follower / Following Counts */}
                                <div className="flex items-center gap-4 text-sm">
                                    <Link
                                        href={`/u/${user.handle}/followers`}
                                        className="flex items-center gap-1.5 text-[#99aabb] hover:text-white transition-colors"
                                    >
                                        <Users className="w-4 h-4" />
                                        <strong className="text-white">{followCounts.followers}</strong>
                                        <span className="text-[10px] uppercase tracking-wider">followers</span>
                                    </Link>
                                    <span className="text-[#556677]">·</span>
                                    <Link
                                        href={`/u/${user.handle}/following`}
                                        className="flex items-center gap-1.5 text-[#99aabb] hover:text-white transition-colors"
                                    >
                                        <strong className="text-white">{followCounts.following}</strong>
                                        <span className="text-[10px] uppercase tracking-wider">following</span>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Follow Button */}
                        <FollowButton
                            targetUserId={user.id}
                            initialIsFollowing={isFollowing}
                            initialFollowerCount={followCounts.followers}
                            isLoggedIn={isLoggedIn}
                            isOwnProfile={isOwnProfile}
                        />
                    </header>

                    {/* Top Ten (Read-only for visitors) */}
                    <TopTen
                        initialMovies={topTenMovies}
                        isOwner={isOwnProfile}
                        userId={user.id}
                    />

                    {/* Following & Followers - Side by Side */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Following Strip */}
                        <FollowingStrip
                            following={following}
                            handle={user.handle}
                            emptyMessage={isOwnProfile ? "You're not following anyone yet. Find people in Search." : "Not following anyone yet."}
                        />

                        {/* Followers Strip */}
                        <FollowersStrip
                            followers={followers}
                            handle={user.handle}
                            emptyMessage="No followers yet."
                        />
                    </div>

                    {/* Recently Rated */}
                    <RecentlyRatedGrid
                        movies={recentlyRated}
                        emptyMessage="No ratings yet."
                    />
                </main>
            </Container>

            <Footer />
        </div>
    );
}
