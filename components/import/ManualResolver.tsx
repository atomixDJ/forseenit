"use client";

import React, { useState } from 'react';
import { Search, Loader2, Check, AlertTriangle } from 'lucide-react';
import { searchMoviesAction } from '@/app/actions/tmdb-actions';
import { resolveAuditRow } from '@/app/actions/import-actions';
import Image from 'next/image';
import { getTMDBImage } from '@/lib/tmdb';

interface Movie {
    id: number;
    title: string;
    release_date?: string;
    poster_path: string | null;
}

export default function ManualResolver({ row }: { row: any }) {
    const [query, setQuery] = useState(`${row.title} ${row.year || ''}`);
    const [results, setResults] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    const [isResolving, setIsResolving] = useState(false);
    const [isMatched, setIsMatched] = useState(false);

    const handleSearch = async () => {
        if (!query.trim()) return;
        setLoading(true);
        try {
            const data = await searchMoviesAction(query);
            setResults(data.results.slice(0, 6) as Movie[]);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleResolve = async (tmdbId: number) => {
        setIsResolving(true);
        try {
            await resolveAuditRow(row.id, tmdbId);
            setIsMatched(true);
        } catch (e) {
            console.error(e);
        } finally {
            setIsResolving(false);
        }
    };

    if (isMatched) return null;

    return (
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-lg transition-all animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="p-6 bg-white/[0.02] border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <h4 className="font-black text-white uppercase italic tracking-tighter text-lg">{row.title}</h4>
                        {row.year && <span className="text-[#556677] text-xs font-bold">({row.year})</span>}
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-[9px] font-bold text-[#556677] uppercase tracking-[0.2em]">{row.fileName}</span>
                        <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${row.status === 'ambiguous' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'
                            }`}>
                            {row.status}
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative flex-1 md:flex-none">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="bg-[#0f1418] border border-white/10 rounded-full px-5 py-2.5 text-xs text-white focus:outline-none focus:border-brand/50 w-full md:w-64 transition-all pr-12"
                            placeholder="Refine search..."
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <button
                            onClick={handleSearch}
                            disabled={loading}
                            className="absolute right-1 top-1 p-2 hover:bg-white/10 rounded-full transition-colors text-[#556677] hover:text-white disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin text-brand" /> : <Search className="w-4 h-4" />}
                        </button>
                    </div>
                </div>
            </div>

            <div className="p-6">
                {results.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {results.map((movie) => (
                            <div
                                key={movie.id}
                                className="flex items-center gap-4 bg-white/[0.03] p-3 rounded-xl border border-white/5 hover:border-brand/40 hover:bg-white/[0.05] transition-all group"
                            >
                                <div className="w-12 h-18 relative aspect-[2/3] bg-[#0f1418] rounded-lg overflow-hidden flex-shrink-0 border border-white/5">
                                    <Image
                                        src={getTMDBImage(movie.poster_path, 'w300')}
                                        alt={movie.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="flex-1 min-w-0 pr-2 space-y-1">
                                    <h5 className="text-[10px] font-black text-white uppercase truncate italic tracking-tighter leading-tight">{movie.title}</h5>
                                    <p className="text-[9px] text-[#556677] font-bold tracking-widest">{movie.release_date?.split('-')[0] || 'Unknown'}</p>
                                </div>
                                <button
                                    onClick={() => handleResolve(movie.id)}
                                    disabled={isResolving}
                                    className="p-2.5 bg-brand/10 text-brand rounded-full hover:bg-brand hover:text-black transition-all disabled:opacity-50 shadow-lg shadow-brand/5"
                                >
                                    {isResolving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
                        <div className="p-4 bg-white/[0.02] rounded-full border border-white/5">
                            <AlertTriangle className="w-10 h-10 text-[#556677] opacity-20" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] text-[#99aabb] font-bold uppercase tracking-[0.2em]">
                                Manual Mapping Required
                            </p>
                            <p className="text-[#556677] text-[9px] font-bold uppercase tracking-widest">
                                Search for a match to link this Letterboxd entry
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
