import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import PosterCard from "@/components/movie/PosterCard";
import { getAwardsData } from "@/app/actions/awards";
import { Trophy, ChevronRight, MapPin, Sparkles, Hash } from "lucide-react";
import Link from "next/link";
import { CURRENT_SEASON } from "@/lib/constants";

export default async function AwardsPage() {
    const result = await getAwardsData();
    const isDev = process.env.NODE_ENV !== "production";
    const { status, seasons } = result;

    return (
        <div className="flex flex-col min-h-screen bg-[#14181c]">
            <Header />

            <main className="flex-grow pt-32 pb-24">
                <Container>
                    <header className="mb-20">
                        <div className="flex items-center gap-2 text-brand text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                            <Trophy className="w-3 h-3" />
                            <span>Awards Season 2025/26 Cycle</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter italic uppercase leading-[0.8] mb-6">
                            Awards <br />
                            <span className="text-[#334455]">Infinity</span>
                        </h1>
                        <p className="text-[#667788] text-sm max-w-xl leading-relaxed font-medium">
                            The definitive records of the current season. From nominations to the Winners Circle, track every milestone of the 2025/26 cycle.
                        </p>
                    </header>

                    {status === "ok" && seasons.length > 0 ? (
                        <div className="space-y-32">
                            {seasons.map((season: any) => {
                                const event = season.event;
                                const phase = season.phase;

                                // Group items by prizeName (Category)
                                const groupedByPrize = season.winners.reduce((acc: Record<string, any[]>, item: any) => {
                                    if (!acc[item.prizeName]) acc[item.prizeName] = [];
                                    acc[item.prizeName].push(item);
                                    return acc;
                                }, {} as Record<string, any[]>);

                                const categories = Object.keys(groupedByPrize);

                                return (
                                    <section key={season.id} id={event.slug} className="relative scroll-mt-32">
                                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-white/5 pb-8">
                                            <div>
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter">
                                                        {event.name}
                                                    </h2>
                                                    {phase === 'NOMINATIONS' && (
                                                        <span className="bg-brand/10 text-brand text-[10px] font-black px-2 py-0.5 rounded border border-brand/20 uppercase tracking-widest mt-1">
                                                            Noms Live
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-4 text-[#445566] text-[10px] font-bold uppercase tracking-widest">
                                                    <span className="flex items-center gap-1.5 text-brand">
                                                        <MapPin className="w-3 h-3" />
                                                        {season.year} Ceremony
                                                    </span>
                                                    <span>•</span>
                                                    <span className="text-white/40">{phase.replace('_', ' ')} Phase</span>
                                                </div>
                                            </div>

                                            {phase === 'NOMINATIONS' && categories.length > 1 && (
                                                <div className="flex flex-wrap gap-2 max-w-md md:justify-end">
                                                    {categories.map((cat) => (
                                                        <a
                                                            key={cat}
                                                            href={`#${event.slug}-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                                                            className="text-[9px] font-black uppercase tracking-wider text-[#445566] hover:text-brand bg-white/5 px-2.5 py-1 rounded transition-colors"
                                                        >
                                                            {cat}
                                                        </a>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {phase === 'COMING_SOON' ? (
                                            <div className="bg-gradient-to-br from-[#1b2228]/60 to-[#14181c]/60 border border-white/5 rounded-2xl p-12 text-center overflow-hidden relative group">
                                                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                                    <Sparkles className="w-32 h-32 text-brand rotate-12" />
                                                </div>
                                                <Trophy className="w-12 h-12 text-[#334455] mx-auto mb-6 opacity-20" />
                                                <h3 className="text-white font-black uppercase italic tracking-tighter text-2xl mb-3">Unlocking Soon</h3>
                                                <p className="text-[#556677] text-sm max-w-md mx-auto leading-relaxed mb-8">
                                                    Our Pulse engine is monitoring {event.name} announcements. Connect your account to get real-time alerts when the ballots open.
                                                </p>
                                                <button className="bg-brand/10 border border-brand/20 text-brand font-black uppercase text-[10px] tracking-[0.2em] px-8 py-3 rounded-full hover:bg-brand hover:text-black transition-all">
                                                    Notify Me
                                                </button>
                                            </div>
                                        ) : phase === 'NOMINATIONS' ? (
                                            <div className="space-y-16">
                                                {(Object.entries(groupedByPrize) as [string, any[]][]).map(([category, items]) => (
                                                    <div key={category} id={`${event.slug}-${category.toLowerCase().replace(/\s+/g, '-')}`} className="scroll-mt-40">
                                                        <div className="flex items-center gap-3 mb-8">
                                                            <div className="h-px bg-brand/20 flex-grow" />
                                                            <h4 className="text-brand text-[11px] font-black uppercase tracking-[0.4em] whitespace-nowrap">
                                                                {category}
                                                            </h4>
                                                            <div className="h-px bg-brand/20 flex-grow" />
                                                        </div>
                                                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                                                            {items.map((nominee: any) => {
                                                                const hasPoster = nominee.posterPath || (nominee as any).personPath;
                                                                return (
                                                                    <div key={nominee.id} className="group flex flex-col gap-3">
                                                                        <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-[#1b2228] shadow-2xl border border-white/5 group-hover:border-brand/30 transition-all">
                                                                            <PosterCard
                                                                                movie={{
                                                                                    id: nominee.movieId,
                                                                                    title: nominee.movieTitle,
                                                                                    poster_path: nominee.posterPath || (nominee as any).personPath, // Fallback to person
                                                                                    vote_average: 0
                                                                                } as any}
                                                                                noLink={!hasPoster}
                                                                            />
                                                                            {!hasPoster && (
                                                                                <div className="absolute inset-0 flex items-center justify-center">
                                                                                    <Trophy className="w-8 h-8 text-white/5" />
                                                                                </div>
                                                                            )}
                                                                            {nominee.personName && (
                                                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                                                                                    <p className="text-white font-black italic uppercase text-[11px] leading-tight mb-1">{nominee.personName}</p>
                                                                                    <p className="text-brand font-bold text-[8px] uppercase tracking-widest">{nominee.movieTitle}</p>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                        <div>
                                                                            <Link
                                                                                href={`/movie/${nominee.movieId}`}
                                                                                className="text-white font-black italic uppercase tracking-tighter text-[13px] hover:text-brand transition-colors block leading-tight"
                                                                            >
                                                                                {nominee.personName || nominee.movieTitle}
                                                                            </Link>
                                                                            {nominee.personName && (
                                                                                <p className="text-[#445566] text-[9px] font-bold uppercase tracking-wider mt-0.5">{nominee.movieTitle}</p>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                                {season.winners.filter((w: any) => w.isWinner).map((winner: any) => {
                                                    const hasPoster = winner.posterPath || (winner as any).personPath;
                                                    return (
                                                        <div key={winner.id} className="group flex bg-[#1b2228]/40 border border-white/5 rounded-lg overflow-hidden hover:border-brand/20 transition-all">
                                                            <div className="w-28 shrink-0 relative aspect-[2/3] bg-[#14181c] border-r border-white/5">
                                                                <PosterCard
                                                                    movie={{
                                                                        id: winner.movieId,
                                                                        title: winner.movieTitle,
                                                                        poster_path: winner.posterPath || (winner as any).personPath, // Fallback
                                                                        vote_average: 0
                                                                    } as any}
                                                                    noLink
                                                                />
                                                            </div>
                                                            <div className="flex-grow p-5 flex flex-col justify-between">
                                                                <div>
                                                                    <div className="text-brand text-[9px] font-black uppercase tracking-[0.2em] mb-1.5 flex items-center gap-2">
                                                                        <Sparkles className="w-2.5 h-2.5" />
                                                                        {winner.prizeName}
                                                                    </div>
                                                                    <Link
                                                                        href={`/movie/${winner.movieId}`}
                                                                        className="text-white font-black italic uppercase tracking-tighter text-lg leading-tight group-hover:text-white transition-colors block mb-1"
                                                                    >
                                                                        {winner.personName || winner.movieTitle}
                                                                    </Link>
                                                                    {winner.personName && (
                                                                        <p className="text-[#445566] text-[9px] font-bold uppercase tracking-wider">{winner.movieTitle}</p>
                                                                    )}
                                                                </div>

                                                                <Link
                                                                    href={`/movie/${winner.movieId}`}
                                                                    className="flex items-center gap-2 text-[#445566] group-hover:text-[#667788] text-[9px] font-bold uppercase tracking-widest transition-colors"
                                                                >
                                                                    View Analysis
                                                                    <ChevronRight className="w-2.5 h-2.5" />
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </section>
                                );
                            })}
                        </div>
                    ) : (
                        isDev ? (
                            <div className="border border-amber-500/30 rounded-lg p-6 bg-amber-900/10">
                                <p className="text-amber-200 text-sm font-medium mb-2">
                                    Awards data unavailable (status: {status}).
                                </p>
                                <code className="text-xs text-amber-400/70 bg-black/30 px-2 py-1 rounded">
                                    npx tsx scripts/seed-awards.ts
                                </code>
                            </div>
                        ) : (
                            <div className="py-40 text-center bg-[#1b2228]/20 rounded-2xl border border-dashed border-white/5">
                                <Trophy className="w-12 h-12 text-[#334455] mx-auto mb-6 opacity-20" />
                                <p className="text-[#556677] font-medium italic">
                                    Awards data is temporarily unavailable.
                                </p>
                                <a href="/contact" className="text-brand text-sm mt-4 inline-block hover:underline">
                                    Report an issue
                                </a>
                            </div>
                        )
                    )}
                </Container>
            </main>

            <Footer />
        </div>
    );
}
