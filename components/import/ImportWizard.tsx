"use client";

import React, { useState } from 'react';
import { Upload, CheckCircle, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import { uploadLetterboxdZip, processImportRun } from '@/app/actions/import-actions';
import Link from 'next/link';

export default function ImportWizard() {
    const [status, setStatus] = useState<'idle' | 'parsing' | 'processing' | 'completed' | 'error'>('idle');
    const [error, setError] = useState<string | null>(null);
    const [importId, setImportId] = useState<string | null>(null);
    const [counts, setCounts] = useState<{ total: number } | null>(null);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setStatus('parsing');
        setError(null);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const result = await uploadLetterboxdZip(formData);
            setImportId(result.importId);
            setCounts({ total: result.rowsCount });

            setStatus('processing');
            await processImportRun(result.importId);
            setStatus('completed');
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred');
            setStatus('error');
        }
    };

    return (
        <div className="max-w-2xl w-full mx-auto">
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden p-8 space-y-8 shadow-2xl">
                {status === 'idle' && (
                    <div className="space-y-6 text-center py-12">
                        <div className="mx-auto w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center">
                            <Upload className="w-8 h-8 text-brand" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-white uppercase italic tracking-tighter">Ready to Import</h3>
                            <p className="text-[#99aabb] text-xs">Select your Letterboxd export ZIP file to begin.</p>
                        </div>
                        <div className="flex justify-center">
                            <label className="cursor-pointer bg-white text-black px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:scale-105 transition-transform active:scale-95 shadow-lg">
                                Choose ZIP File
                                <input type="file" accept=".zip" className="hidden" onChange={handleUpload} />
                            </label>
                        </div>
                    </div>
                )}

                {(status === 'parsing' || status === 'processing') && (
                    <div className="space-y-6 text-center py-12">
                        <Loader2 className="w-12 h-12 text-brand animate-spin mx-auto" />
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-white uppercase italic tracking-tighter">
                                {status === 'parsing' ? 'Parsing Archive...' : 'Processing Entries...'}
                            </h3>
                            <p className="text-[#99aabb] text-xs leading-relaxed max-w-sm mx-auto">
                                {status === 'parsing'
                                    ? 'Scanning CSV files for diary entries, ratings, and lists.'
                                    : `Resolving ${counts?.total || ''} movies with TMDb and populating your profile. This may take a minute.`}
                            </p>
                        </div>
                        <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                            <div className="h-full bg-brand animate-pulse" style={{ width: '100%' }} />
                        </div>
                    </div>
                )}

                {status === 'completed' && (
                    <div className="space-y-8">
                        <div className="flex items-center gap-4 bg-green-500/10 border border-green-500/20 p-6 rounded-lg text-green-500">
                            <CheckCircle className="w-8 h-8 flex-shrink-0" />
                            <div>
                                <h4 className="font-bold uppercase text-xs tracking-widest">Import Successful</h4>
                                <p className="text-xs text-green-500/70 leading-relaxed">Your profile has been updated with your Letterboxd data.</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Link
                                href={`/settings/import/letterboxd/${importId}/review`}
                                className="flex items-center justify-between w-full bg-white/5 border border-white/10 p-5 rounded-lg hover:bg-white/10 transition-all group"
                            >
                                <div className="space-y-1">
                                    <span className="text-[10px] font-bold text-white uppercase tracking-widest">Resolve Unmatched</span>
                                    <p className="text-[9px] text-[#556677] uppercase font-bold tracking-widest">Fix titles TMDb couldn't find</p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-[#556677] group-hover:text-brand transition-colors" />
                            </Link>
                            <Link
                                href="/profile"
                                className="flex items-center justify-between w-full bg-brand p-5 rounded-lg hover:opacity-90 transition-opacity group shadow-lg"
                            >
                                <span className="text-[10px] font-black text-black uppercase tracking-widest">Go to Profile</span>
                                <ArrowRight className="w-4 h-4 text-black" />
                            </Link>
                        </div>
                    </div>
                )}

                {status === 'error' && (
                    <div className="space-y-8">
                        <div className="flex items-center gap-4 bg-red-500/10 border border-red-500/20 p-6 rounded-lg text-red-500">
                            <AlertCircle className="w-8 h-8 flex-shrink-0" />
                            <div>
                                <h4 className="font-bold uppercase text-xs tracking-widest">Import Failed</h4>
                                <p className="text-xs text-red-500/70">{error}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setStatus('idle')}
                            className="w-full bg-white text-black py-4 rounded-lg text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] transition-transform active:scale-[0.98]"
                        >
                            Try Again
                        </button>
                    </div>
                )}
            </div>

            <div className="mt-8 p-6 bg-[#1a2228] rounded-lg border border-white/5 space-y-4 shadow-xl">
                <h5 className="text-[9px] font-black text-[#556677] uppercase tracking-[0.3em]">Import Rules</h5>
                <ul className="text-[10px] text-[#99aabb] space-y-3 list-none leading-relaxed">
                    <li className="flex items-start gap-3"><span className="text-brand/50 mt-1">●</span> Duplicate diary entries are automatically skipped based on movie and date.</li>
                    <li className="flex items-start gap-3"><span className="text-brand/50 mt-1">●</span> Adding a Rating or Favorite will automatically mark a movie as "Watched".</li>
                    <li className="flex items-start gap-3"><span className="text-brand/50 mt-1">●</span> We support both ranked and unranked lists with original descriptions.</li>
                    <li className="flex items-start gap-3"><span className="text-brand/50 mt-1">●</span> Titles that require manual review will be available for resolution after import.</li>
                </ul>
            </div>
        </div>
    );
}
