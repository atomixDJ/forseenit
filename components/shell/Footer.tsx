import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-white/5 bg-nebula-void py-12 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">

                {/* Brand */}
                <div className="flex flex-col items-center md:items-start gap-2">
                    <Link href="/" className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-nebula-cyan" />
                        <span className="text-lg font-bold tracking-tight text-white font-sans">
                            FORSEENIT
                        </span>
                    </Link>
                    <p className="text-xs text-zinc-500">
                        © 2026 ForSeenIt. All rights reserved.
                    </p>
                </div>

                {/* TMDb Attribution */}
                <div className="flex flex-col items-center md:items-end gap-2 text-center md:text-right">
                    {/* TMDb Logo (using text for now or SVG if available, standard text is acceptable with specific wording) */}
                    <div className="flex items-center gap-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="TMDb" className="h-4" />
                    </div>
                    <p className="text-[10px] text-zinc-600 max-w-xs">
                        This product uses the TMDb API but is not endorsed or certified by TMDb.
                    </p>
                </div>

            </div>
        </footer>
    );
}
