"use client";

import { useRouter } from "next/navigation";
import { Users, Search } from "lucide-react";
import { CompareUserData } from "@/app/actions/compare";

interface CompareHeaderProps {
    self: CompareUserData;
    peer: CompareUserData;
    following: { handle: string; name: string | null; image: string | null }[];
}

/**
 * Display the user's Genre Affinity.
 * Shows the canonical topGenre value from the server (computed by getTopGenre).
 * - If user has a dominant genre → show it
 * - If user has an exact tie → shows "Mixed" (from canonical source)
 * - If user has no data → shows "—"
 */
function formatGenreAffinity(genre: string | null): string {
    return genre || "—";
}

export default function CompareHeader({ self, peer, following }: CompareHeaderProps) {
    const router = useRouter();

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const handle = e.target.value;
        if (handle) {
            router.push(`/compare?them=${handle}`);
        } else {
            router.push(`/compare`);
        }
    };

    return (
        <div className="mb-20">
            <div className="flex flex-col items-center justify-center mb-12">
                <div className="text-brand text-[10px] font-black uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
                    <Users className="w-3 h-3" />
                    <span>Taste Engine v1.15 Analysis</span>
                </div>

                <div className="flex items-center justify-center gap-6 md:gap-16 relative w-full max-w-4xl px-4">
                    {/* Self Identity */}
                    <div className="flex-1 flex flex-col items-end text-right">
                        <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border-2 border-brand/20 p-1 mb-4 overflow-hidden bg-[#1b2228] relative group">
                            {self.image ? (
                                <img src={self.image} alt={self.handle} className="w-full h-full object-cover rounded-full" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-3xl font-black text-brand bg-brand/5">
                                    {self.handle[0].toUpperCase()}
                                </div>
                            )}
                        </div>
                        <h2 className="text-white font-black uppercase italic tracking-tighter text-xl md:text-3xl line-clamp-1">{self.name || self.handle}</h2>
                        <span className="text-[#445566] text-[10px] font-bold uppercase tracking-widest">{self.handle}</span>

                        <div className="mt-4 flex items-center gap-4 justify-end">
                            <div className="text-right border-r border-white/10 pr-4">
                                <div className="text-white text-lg font-black italic">{(self.stats.avgRating / 2).toFixed(1)}</div>
                                <div className="text-[8px] text-[#445566] font-black uppercase tracking-widest">Avg Rating</div>
                            </div>
                            <div className="text-right">
                                <div className="text-brand text-lg font-black italic truncate max-w-[100px]">
                                    {formatGenreAffinity(self.topGenre)}
                                </div>
                                <div className="text-[8px] text-[#445566] font-black uppercase tracking-widest">Genre Affinity</div>
                            </div>
                        </div>
                    </div>

                    {/* VS / Sync Meter - passive status indicator */}
                    <div className="flex flex-col items-center justify-center min-w-[80px] md:min-w-[120px]">
                        <div className="sync-glyph w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mb-2 rounded-full border-2 border-brand/20">
                            <div className="text-brand font-black text-sm md:text-lg italic uppercase tracking-tighter">Sync</div>
                        </div>
                        <div className="text-[9px] text-[#445566] font-black uppercase tracking-[0.2em]">Intersection</div>
                    </div>

                    {/* Peer Identity */}
                    <div className="flex-1 flex flex-col items-start text-left">
                        <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border-2 border-brand/20 p-1 mb-4 overflow-hidden bg-[#1b2228] relative group">
                            {peer.image ? (
                                <img src={peer.image} alt={peer.handle} className="w-full h-full object-cover rounded-full" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-3xl font-black text-brand bg-brand/5">
                                    {peer.handle[0].toUpperCase()}
                                </div>
                            )}
                        </div>
                        <h2 className="text-white font-black uppercase italic tracking-tighter text-xl md:text-3xl line-clamp-1">{peer.name || peer.handle}</h2>
                        <span className="text-[#445566] text-[10px] font-bold uppercase tracking-widest">{peer.handle}</span>

                        <div className="mt-4 flex items-center gap-4 justify-start">
                            <div className="text-left border-r border-white/10 pr-4">
                                <div className="text-white text-lg font-black italic">{(peer.stats.avgRating / 2).toFixed(1)}</div>
                                <div className="text-[8px] text-[#445566] font-black uppercase tracking-widest">Avg Rating</div>
                            </div>
                            <div className="text-left">
                                <div className="text-brand text-lg font-black italic truncate max-w-[100px]">
                                    {formatGenreAffinity(peer.topGenre)}
                                </div>
                                <div className="text-[8px] text-[#445566] font-black uppercase tracking-widest">Genre Affinity</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Peer Selector */}
            <div className="flex justify-center px-4">
                <div className="relative group max-w-md w-full">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-brand/40 group-focus-within:text-brand transition-colors">
                        <Search className="w-3.5 h-3.5" />
                    </div>
                    <select
                        onChange={handleSelect}
                        value={peer.handle}
                        className="w-full bg-white/5 border border-white/10 hover:border-white/20 text-white text-[11px] font-black uppercase tracking-widest pl-11 pr-10 py-4 rounded-xl appearance-none cursor-pointer focus:outline-none focus:border-brand/40 transition-all shadow-xl"
                    >
                        {following.length === 0 ? (
                            <option value="">No friends followed yet...</option>
                        ) : (
                            <>
                                <option value={peer.handle}>{peer.name || peer.handle} (Compare)</option>
                                <option disabled className="text-white/20">────────────────────</option>
                                {following.filter(u => u.handle !== peer.handle).map(u => (
                                    <option key={u.handle} value={u.handle} className="bg-[#1b2228] text-white py-2">
                                        {u.name || u.handle}
                                    </option>
                                ))}
                            </>
                        )}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity">
                        <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-white/60" />
                    </div>
                </div>
            </div>
        </div>
    );
}
