import React from 'react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="mt-20 py-16 border-t border-white/5 bg-[#1b2228]">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-1 mb-4">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ff8000]"></span>
                            <span className="w-2.5 h-2.5 rounded-full bg-[#00e054]"></span>
                            <span className="w-2.5 h-2.5 rounded-full bg-[#40bcf4]"></span>
                            <span className="ml-2 font-black italic tracking-tighter text-white uppercase">ForSeenIt</span>
                        </div>
                        <nav className="flex flex-wrap gap-4 text-[#99aabb] text-[10px] font-bold uppercase tracking-widest">
                            <Link href="/" className="hover:text-white transition-colors">Films</Link>
                            <Link href="/awards" className="hover:text-white transition-colors">Awards</Link>
                            <Link href="/search" className="hover:text-white transition-colors">Search</Link>
                            <Link href="/login" className="hover:text-white transition-colors">Login</Link>
                        </nav>
                    </div>

                    <div className="md:text-right space-y-2">
                        <p className="text-[#99aabb] text-[10px] font-bold uppercase tracking-widest">
                            © {new Date().getFullYear()} ForSeenIt. Made for film lovers.
                        </p>
                        <p className="text-[#677] text-[9px] max-w-xs leading-relaxed">
                            This product uses the TMDB API but is not endorsed or certified by TMDB.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
