"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search as SearchIcon } from 'lucide-react';
import AuthButton from '@/components/auth/AuthButton';
import { cn } from "@/lib/utils";

export default function Header() {
    const pathname = usePathname();

    const links = [
        { name: "WATCH", href: "/" },
        { name: "DISCOVER", href: "/discover" },
        { name: "COMPARE", href: "/compare" },
        { name: "WATCHLIST", href: "/watchlist" },
        { name: "LISTS", href: "/lists" },
        { name: "AWARDS", href: "/awards" },
        { name: "BALLOT", href: "/ballot" },
    ];

    return (
        <header className="glass sticky top-0 z-50 py-3 border-b border-white/5 bg-nebula-void/80 backdrop-blur-md">
            <div className="container-custom flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group mr-8">
                    <img
                        src="/brand/forseenit_logo_bw_sm.png?v=2"
                        alt="ForSeenIt"
                        className="h-7 w-auto -ml-2.5"
                    />
                    <span className="text-2xl font-black text-white tracking-tighter italic uppercase transform -skew-x-6">
                        ForSeenIt
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-8">
                    {links.map((link) => {
                        const isActive = link.href === "/"
                            ? pathname === "/"
                            : pathname.startsWith(link.href);

                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "text-[10px] font-bold tracking-[0.2em] transition-colors uppercase",
                                    isActive
                                        ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                                        : "text-[#99aabb] hover:text-white"
                                )}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="flex items-center gap-4 ml-auto">
                    {/* Search Pill */}
                    <Link
                        href="/search"
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-full border transition-all",
                            "bg-[#1b2228]/60 border-white/10 hover:border-[#00e054]/50 hover:bg-[#1b2228]",
                            "group"
                        )}
                    >
                        <SearchIcon className="w-4 h-4 text-[#99aabb] group-hover:text-[#00e054] transition-colors" />
                        <span className="hidden md:inline text-[10px] font-bold tracking-[0.15em] text-[#99aabb] group-hover:text-white transition-colors uppercase">
                            Search
                        </span>
                    </Link>
                    <AuthButton />
                </div>
            </div>
        </header>
    );
}
