import { requireAppUserIdPage } from "@/lib/clerk-auth-helpers";
import Header from "@/components/layout/Header";
import Container from "@/components/layout/Container";
import CompareHeader from "@/components/compare/CompareHeader";
import ComparePanels from "@/components/compare/ComparePanels";
import { getCompareData } from "@/app/actions/compare";
import { getFollowingList } from "@/app/actions/follow";
import { getUserWatchlistIds } from "@/app/actions/interactions";
import { AlertCircle, UserPlus } from "lucide-react";
import Link from "next/link";
import { ClientSelector } from "./ClientSelector";

export const dynamic = "force-dynamic";

export default async function ComparePage({ searchParams }: { searchParams: Promise<{ them?: string }> }) {
    await requireAppUserIdPage();
    const params = await searchParams;
    const themHandle = params.them;

    const [following, watchlistIds] = await Promise.all([
        getFollowingList(),
        getUserWatchlistIds(),
    ]);
    const watchlistSet = new Set(watchlistIds);

    let result = null;
    let error = null;

    if (themHandle) {
        try {
            result = await getCompareData(themHandle);
        } catch (e: any) {
            error = e.message;
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-[#14181c]">
            <Header />

            <main className="flex-grow pt-32 pb-24 relative z-0">
                <Container>
                    {error ? (
                        <div className="max-w-md mx-auto bg-red-500/10 border border-red-500/20 rounded-2xl p-12 text-center">
                            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-6 opacity-40" />
                            <h2 className="text-white font-black uppercase italic tracking-tighter text-2xl mb-3">Analysis Failed</h2>
                            <p className="text-red-200/60 text-sm mb-10 leading-relaxed font-medium">{error}</p>
                            <Link href="/compare" className="text-[10px] font-black uppercase text-brand tracking-[0.2em] border border-brand/20 px-8 py-3 rounded-full hover:bg-brand hover:text-black transition-all inline-block">Re-initialize Engine</Link>
                        </div>
                    ) : result ? (
                        <>
                            <CompareHeader self={result.self} peer={result.peer} following={following} />
                            <ComparePanels result={result} watchlistIds={watchlistSet} />
                        </>
                    ) : (
                        <EmptyCompareState following={following} />
                    )}
                </Container>
            </main>
        </div>
    );
}

function EmptyCompareState({ following }: { following: any[] }) {
    return (
        <div className="max-w-2xl mx-auto text-center py-20">
            <div className="text-brand text-[10px] font-black uppercase tracking-[0.3em] mb-12 flex items-center justify-center gap-2">
                <div className="w-8 h-px bg-brand/20" />
                <span>Taste Engine v1.15</span>
                <div className="w-8 h-px bg-brand/20" />
            </div>

            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase italic leading-[0.8] mb-10">
                Analyze <br />
                <span className="text-[#334455]">Symmetry</span>
            </h1>

            <p className="text-[#667788] text-sm max-w-md mx-auto mb-16 leading-relaxed font-medium">
                Our symmetry algorithm analyzes cross-profile compatibility by mapping Top Tens, 4.0+ rating overlaps, and favorable outliers.
            </p>

            {following.length > 0 ? (
                <div className="max-w-xs mx-auto">
                    <div className="mb-4 text-[9px] text-[#445566] font-black uppercase tracking-[0.2em]">Select Analysis Target</div>
                    <ClientSelector following={following} />
                </div>
            ) : (
                <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-12 shadow-2xl">
                    <UserPlus className="w-12 h-12 text-[#334455] mx-auto mb-6 opacity-20" />
                    <h3 className="text-white font-black uppercase italic tracking-tighter text-2xl mb-4">Connections Required</h3>
                    <p className="text-[#556677] text-sm mb-10 leading-relaxed">The engine requires at least one followed user to calculate taste symmetry.</p>
                    <Link href="/search" className="btn-green px-10 py-4 rounded-full shadow-[0_0_20px_rgba(0,224,84,0.2)]">Expand Network</Link>
                </div>
            )}
        </div>
    );
}
