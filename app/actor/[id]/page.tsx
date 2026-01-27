import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import { getPersonDetails, getPersonCombinedCredits, getTMDBImage } from "@/lib/tmdb";
import Image from "next/image";
import PosterCard from "@/components/movie/PosterCard";
import ExpandableBio from "@/components/actor/ExpandableBio";
import { ExternalLink } from "lucide-react";
import { auth } from "@/auth";
import { getUserWatchlistIds } from "@/app/actions/interactions";

export default async function ActorPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const session = await auth();

    const [person, credits, watchlistIds] = await Promise.all([
        getPersonDetails(id),
        getPersonCombinedCredits(id),
        session ? getUserWatchlistIds() : Promise.resolve([]),
    ]);
    const watchlistSet = new Set(watchlistIds);

    if (!person) {
        return (
            <div className="min-h-screen bg-[#14181c] text-white flex items-center justify-center font-bold">
                Person not found
            </div>
        );
    }

    // Deduplicate by media id and sort by popularity desc
    // media_type filter: only show movies for now as requested, or label TV
    const movies = credits.cast
        .filter(c => c.media_type === "movie")
        .reduce((acc, current) => {
            const x = acc.find(item => item.id === current.id);
            if (!x) {
                return acc.concat([current]);
            } else {
                return acc;
            }
        }, [] as any[])
        .sort((a, b) => (b.popularity || 0) - (a.popularity || 0));

    // Get "Known for" department
    const knownFor = person.known_for_department;

    return (
        <div className="flex flex-col min-h-screen bg-[#14181c]">
            <Header />

            <Container>
                <main className="py-20 space-y-20">
                    {/* Hero Section */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 items-start">
                        <div className="md:col-span-1 space-y-6">
                            <div className="aspect-[2/3] relative rounded-[4px] overflow-hidden border border-white/10 shadow-2xl">
                                <Image
                                    src={getTMDBImage(person.profile_path, 'h632' as any)}
                                    fill
                                    alt={person.name}
                                    className="object-cover"
                                    priority
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <span className="text-[#556677] uppercase text-[9px] font-bold tracking-[0.2em] mb-1">Links</span>
                                <div className="flex flex-col gap-2">
                                    <a
                                        href={`https://www.themoviedb.org/person/${person.id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between bg-white/5 border border-white/10 px-4 py-2.5 rounded-[4px] text-[10px] font-bold tracking-widest uppercase text-white hover:bg-brand/10 hover:border-brand/30 transition-all group"
                                    >
                                        TMDB Profile
                                        <ExternalLink className="h-3 w-3 opacity-40 group-hover:opacity-100" />
                                    </a>
                                    {person.imdb_id && (
                                        <a
                                            href={`https://www.imdb.com/name/${person.imdb_id}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between bg-white/5 border border-white/10 px-4 py-2.5 rounded-[4px] text-[10px] font-bold tracking-widest uppercase text-white hover:bg-brand/10 hover:border-brand/30 transition-all group"
                                        >
                                            IMDb Profile
                                            <ExternalLink className="h-3 w-3 opacity-40 group-hover:opacity-100" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-3 space-y-8">
                            <div className="space-y-4">
                                <div className="flex flex-wrap items-baseline gap-4">
                                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter italic uppercase">
                                        {person.name}
                                    </h1>
                                    <span className="text-xl md:text-2xl font-light text-[#99aabb] uppercase tracking-widest">
                                        {knownFor}
                                    </span>
                                </div>

                                {person.birthday && (
                                    <div className="text-[#556677] uppercase text-[10px] font-bold tracking-[0.2em]">
                                        Born: {new Date(person.birthday).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                        {person.place_of_birth && ` in ${person.place_of_birth}`}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4 max-w-3xl">
                                <h3 className="text-[#556677] uppercase text-[10px] font-black tracking-[0.3em]">Biography</h3>
                                <ExpandableBio bio={person.biography} maxLength={400} />
                            </div>
                        </div>
                    </div>

                    {/* Filmography Section */}
                    <section className="space-y-10">
                        <div className="section-header flex items-center justify-between">
                            <span className="text-white font-black italic tracking-tighter uppercase text-xl">Filmography</span>
                            <span className="text-[#556677] text-[10px] font-bold tracking-[0.2em]">{movies.length} TITLES</span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6 md:gap-8">
                            {movies.map((movie) => (
                                <PosterCard key={movie.id} movie={movie} isWatchlist={watchlistSet.has(movie.id)} />
                            ))}
                        </div>
                    </section>
                </main>
            </Container>

            <Footer />
        </div>
    );
}
