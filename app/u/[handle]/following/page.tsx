import React from 'react';
import Header from "@/components/layout/Header";
import Container from "@/components/layout/Container";
import Footer from "@/components/layout/Footer";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Lock } from "lucide-react";
import { getFollowingByHandle } from "@/app/actions/following";
import FollowingList from "@/components/profile/FollowingList";

interface FollowingPageProps {
    params: Promise<{ handle: string }>;
}

export default async function FollowingPage({ params }: FollowingPageProps) {
    const { handle } = await params;

    // Verify user exists
    const user = await prisma.user.findUnique({
        where: { handle },
        select: { id: true, handle: true },
    });

    if (!user) {
        notFound();
    }

    // Get initial following data
    const result = await getFollowingByHandle(handle, undefined, 30);

    if (!result) {
        notFound();
    }

    return (
        <div className="flex flex-col min-h-screen bg-[#14181c]">
            <Header />

            <Container>
                <main className="py-12">
                    {/* Back link */}
                    <Link
                        href={`/u/${handle}`}
                        className="inline-flex items-center gap-1 text-[#99aabb] hover:text-white transition-colors mb-8"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        <span className="text-sm">Back to @{handle}</span>
                    </Link>

                    {/* Page header */}
                    <header className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-black text-white italic tracking-tighter">
                            Following<span className="text-brand">.</span>
                        </h1>
                        <p className="text-[#556677] text-sm mt-2">
                            @{handle} follows {result.totalCount} {result.totalCount === 1 ? 'person' : 'people'}
                        </p>
                    </header>

                    {/* Privacy gate */}
                    {result.isPrivate ? (
                        <div className="flex flex-col items-center justify-center py-16 bg-[#1b2228] rounded-lg border border-white/5">
                            <Lock className="w-12 h-12 text-[#556677] mb-4" />
                            <p className="text-[#99aabb] text-lg font-medium">
                                This list is private
                            </p>
                            <p className="text-[#556677] text-sm mt-2">
                                @{handle} has chosen to keep who they follow private.
                            </p>
                        </div>
                    ) : result.users.length === 0 ? (
                        /* Empty state */
                        <div className="flex flex-col items-center justify-center py-16 bg-[#1b2228] rounded-lg border border-white/5">
                            <p className="text-[#99aabb] text-lg">
                                Not following anyone yet
                            </p>
                            <p className="text-[#556677] text-sm mt-2">
                                @{handle} hasn't followed anyone yet.
                            </p>
                        </div>
                    ) : (
                        /* Following list with load more */
                        <FollowingList
                            handle={handle}
                            initialUsers={result.users}
                            initialNextCursor={result.nextCursor}
                        />
                    )}
                </main>
            </Container>

            <Footer />
        </div>
    );
}
