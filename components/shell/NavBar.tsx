import Link from "next/link";
import { Search, Film, Tv, Trophy, Sparkles } from "lucide-react";

export function NavBar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-white/5 bg-nebula-void/80 backdrop-blur-md">
            <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <Sparkles className="h-6 w-6 text-nebula-cyan" />
                    <span className="text-xl font-bold tracking-tight text-white font-sans">
                        FORSEENIT
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden items-center gap-8 md:flex">
                    <Link href="/" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                        Suggested
                    </Link>
                    <Link href="/awards" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                        Awards
                    </Link>
                    <Link href="/search" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                        Search
                    </Link>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    {/* Placeholder for Auth/Search trigger */}
                    <div className="h-8 w-8 rounded-full bg-zinc-800 border border-white/10" />
                </div>
            </div>
        </nav>
    );
}
