"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Film, Compass, List, Trophy, Vote, Search, Clapperboard } from "lucide-react";
import { cn } from "@/lib/utils";

export function NavBar() {
    const pathname = usePathname();

    const links = [
        { name: "FILMS", href: "/", icon: Clapperboard },
        { name: "DISCOVER", href: "/discover", icon: Compass },
        { name: "WATCHLIST", href: "/watchlist", icon: Film },
        { name: "LISTS", href: "/lists", icon: List },
        { name: "AWARDS", href: "/awards", icon: Trophy },
        { name: "BALLOT", href: "/ballot", icon: Vote },
        { name: "SEARCH", href: "/search", icon: Search },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/5 bg-nebula-void/80 backdrop-blur-md">
            <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 mr-8">
                    <div className="flex gap-1" aria-hidden="true">
                        <div className="w-2 h-2 rounded-full bg-brand-yellow" />
                        <div className="w-2 h-2 rounded-full bg-brand" />
                        <div className="w-2 h-2 rounded-full bg-brand-blue" />
                    </div>
                    <span className="text-xl font-black tracking-tighter text-white italic uppercase transform -skew-x-6">
                        FORSEENIT
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden items-center gap-8 md:flex">
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
                                        : "text-zinc-500 hover:text-zinc-300"
                                )}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </div>

                {/* Actions (Placeholder) */}
                <div className="flex items-center gap-4">
                    <div className="h-8 w-8 rounded-full bg-zinc-800 border border-white/10" />
                </div>
            </div>
        </nav>
    );
}
