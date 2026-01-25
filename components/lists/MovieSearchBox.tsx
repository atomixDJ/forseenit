"use client";

import { useState, useEffect, useRef } from "react";
import { searchMoviesAction } from "@/app/actions/movies";
import { Search, Loader2, Plus } from "lucide-react";
import Image from "next/image";
import { getTMDBImage } from "@/lib/tmdb";
import { useDebounce } from "use-debounce";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface MovieSearchBoxProps {
    onSelect: (movieId: number) => void;
    className?: string;
}

export default function MovieSearchBox({ onSelect, className }: MovieSearchBoxProps) {
    const [query, setQuery] = useState("");
    const [debouncedQuery] = useDebounce(query, 300);
    const [results, setResults] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (debouncedQuery.length > 1) {
            handleSearch();
        } else {
            setResults([]);
            setIsOpen(false);
        }
    }, [debouncedQuery]);

    const handleSearch = async () => {
        setIsLoading(true);
        try {
            const data = await searchMoviesAction(debouncedQuery);
            setResults(data);
            setIsOpen(true);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div ref={containerRef} className={cn("relative", className)}>
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query.length > 1 && setIsOpen(true)}
                    placeholder="Enter name of film..."
                    className="w-full bg-[#1b2228] border border-white/10 rounded-[4px] pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-brand/40 transition-all placeholder:text-[#556677] font-medium"
                />
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                    {isLoading ? (
                        <Loader2 className="w-4 h-4 text-brand animate-spin" />
                    ) : (
                        <Search className="w-4 h-4 text-[#556677]" />
                    )}
                </div>
            </div>

            {isOpen && results.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#1b2228] border border-white/10 rounded-lg shadow-2xl z-[100] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="divide-y divide-white/5">
                        {results.map((movie) => (
                            <button
                                key={movie.id}
                                onClick={() => {
                                    onSelect(movie.id);
                                    setQuery("");
                                    setIsOpen(false);
                                }}
                                className="w-full flex items-center gap-4 p-3 hover:bg-white/[0.03] transition-colors text-left group"
                            >
                                <div className="w-10 h-14 relative rounded overflow-hidden flex-shrink-0 bg-black/20">
                                    <Image
                                        src={getTMDBImage(movie.poster_path, 'w300')}
                                        alt={movie.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex-grow min-w-0">
                                    <h4 className="text-sm font-black text-white italic uppercase tracking-tight truncate group-hover:text-brand transition-colors">
                                        {movie.title}
                                    </h4>
                                    <p className="text-[10px] font-bold text-[#556677] uppercase tracking-widest mt-0.5">
                                        {movie.release_date ? new Date(movie.release_date).getFullYear() : 'TBA'}
                                    </p>
                                </div>
                                <div className="px-2 text-brand opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Plus className="w-4 h-4" />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
