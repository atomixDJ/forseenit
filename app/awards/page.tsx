import Header from "@/components/layout/Header";
import Container from "@/components/layout/Container";
import Footer from "@/components/layout/Footer";
import { searchMovies, getTMDBImage } from "@/lib/tmdb";
import PosterCard from "@/components/movie/PosterCard";
import { Trophy, Globe, Film, Star } from "lucide-react";
import Link from 'next/link';

// Detailed Validation Data (Researched by Agent)
const AGENT_CURATED_LISTS = [
    {
        event: "83rd Golden Globe Awards (2026)",
        icon: Globe,
        categories: [
            { name: "Best Motion Picture – Drama", winner: "Hamnet" },
            { name: "Best Motion Picture – Musical or Comedy", winner: "One Battle After Another" },
            { name: "Best Director", winner: "One Battle After Another", subtitle: "Paul Thomas Anderson" },
            { name: "Best Actor (Drama)", winner: "The Secret Agent", subtitle: "Wagner Moura" },
        ]
    },
    {
        event: "Cannes Film Festival 2025",
        icon: Film,
        categories: [
            { name: "Palme d'Or", winner: "It Was Just an Accident" },
            { name: "Grand Prix", winner: "Sentimental Value" },
            { name: "Jury Prize", winner: "Sound of Falling" },
        ]
    },
    {
        event: "Sundance Film Festival 2025",
        icon: Star,
        categories: [
            { name: "Grand Jury Prize (US Dramatic)", winner: "Atropia" },
            { name: "Grand Jury Prize (US Documentary)", winner: "Seeds" },
            { name: "Grand Jury Prize (World Cinema)", winner: "Sabar Bonda" },
        ]
    }
];

async function resolveAwardsData() {
    const resolvedSections = [];

    for (const section of AGENT_CURATED_LISTS) {
        const categoriesWithMovies: any[] = [];

        await Promise.all(section.categories.map(async (cat) => {
            try {
                const results = await searchMovies(cat.winner);
                const movie = results.results?.[0];
                if (movie) {
                    categoriesWithMovies.push({
                        ...cat,
                        movieData: movie
                    });
                }
            } catch (e) {
                console.error(`Failed to resolve ${cat.winner}`, e);
            }
        }));

        if (categoriesWithMovies.length > 0) {
            resolvedSections.push({
                ...section,
                items: categoriesWithMovies
            });
        }
    }
    return resolvedSections;
}

export default async function AwardsPage() {
    const data = await resolveAwardsData();

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <Container>
                <main className="py-12">
                    <header className="mb-16 text-center space-y-4">
                        <section className="flex items-center justify-center gap-2 text-[#00e054] uppercase text-[10px] font-bold tracking-[0.4em]">
                            <Trophy className="h-4 w-4" />
                            <span>Awards Season 2025/26</span>
                        </section>
                        <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase italic">
                            The Gold Standard
                        </h1>
                        <p className="text-[#99aabb] max-w-2xl mx-auto text-lg">
                            Curated winners from the global circuit resolved by the Forseen Agent.
                        </p>
                    </header>

                    <div className="space-y-20">
                        {data.map((section, idx) => (
                            <section key={idx}>
                                <div className="section-header">
                                    <span>{section.event}</span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {section.items.map((item: any, i: number) => (
                                        <Link href={`/movie/${item.movieData.id}`} key={i} className="group flex gap-4 bg-surface p-4 rounded-[4px] border border-white/5 hover:border-[#00e054]/50 transition-all">
                                            <div className="w-24 flex-shrink-0">
                                                <PosterCard movie={item.movieData} awardStatus="WINNER" noLink={true} />
                                            </div>
                                            <div className="flex flex-col justify-center">
                                                <span className="text-[#00e054] text-[9px] font-bold uppercase tracking-widest mb-1">{item.name}</span>
                                                <h3 className="text-white font-bold text-lg leading-tight group-hover:text-[#00e054] transition-colors">{item.movieData.title}</h3>
                                                {item.subtitle && <p className="text-[#556677] text-xs font-medium mt-1 uppercase tracking-wider">{item.subtitle}</p>}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                </main>
            </Container>
            <Footer />
        </div>
    );
}
