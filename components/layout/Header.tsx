import React from 'react';
import Link from 'next/link';
import AuthButton from '@/components/auth/AuthButton';
import AgentToggle from '@/components/ai/AgentToggle';
import { auth } from '@/auth';

export default async function Header() {
    const session = await auth();

    return (
        <header className="glass sticky top-0 z-50 py-3">
            <div className="container-custom flex items-center justify-between">
                <Link href="/" className="flex items-center gap-1.5 group">
                    <div className="flex gap-0.5">
                        <div className="w-5 h-5 rounded-full" style={{ backgroundColor: 'var(--color-orange)' }} />
                        <div className="w-5 h-5 rounded-full" style={{ backgroundColor: 'var(--color-brand)' }} />
                        <div className="w-5 h-5 rounded-full" style={{ backgroundColor: 'var(--color-blue)' }} />
                    </div>
                    <span className="text-2xl font-black text-white ml-2 tracking-tighter italic uppercase">
                        ForSeenIt
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-8 ml-10">
                    <Link href="/" className="text-[#99aabb] hover:text-white text-[11px] font-bold uppercase tracking-[0.2em] transition-colors">
                        Films
                    </Link>
                    {session && (
                        <Link href="/watchlist" className="text-[#99aabb] hover:text-white text-[11px] font-bold uppercase tracking-[0.2em] transition-colors">
                            Watchlist
                        </Link>
                    )}
                    <Link href="/awards" className="text-[#99aabb] hover:text-white text-[11px] font-bold uppercase tracking-[0.2em] transition-colors">
                        Awards
                    </Link>
                    <Link
                        href="/ballot"
                        className="text-[#99aabb] hover:text-white text-[11px] font-bold uppercase tracking-[0.2em] transition-colors relative group"
                    >
                        Ballot
                        <span className="absolute -top-1 -right-1 w-1 h-1 bg-brand rounded-full transition-transform group-hover:scale-150" />
                    </Link>
                    <Link href="/search" className="text-[#99aabb] hover:text-white text-[11px] font-bold uppercase tracking-[0.2em] transition-colors">
                        Search
                    </Link>
                </nav>

                <div className="flex items-center gap-4 ml-auto">
                    {/* {session && <AgentToggle />} */}
                    <AuthButton session={session} />
                </div>
            </div>
        </header>
    );
}
