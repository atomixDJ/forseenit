"use client";

import { useState, useEffect } from "react";
import { submitPick, getBallotData, getUserPicks } from "@/app/actions/ballot";
import Container from "@/components/layout/Container";
import { Trophy, Check } from "lucide-react";

type Nominee = {
    id: string;
    movieId: number;
    movieTitle: string;
    personName: string | null;
    posterPath: string | null;
};

type BallotData = Record<string, Nominee[]>;
type UserPicks = Record<string, string>; // category -> nomineeId

export default function BallotUI() {
    const [ballotData, setBallotData] = useState<BallotData>({});
    const [userPicks, setUserPicks] = useState<UserPicks>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            const [categories, picks] = await Promise.all([
                getBallotData(2026),
                getUserPicks(2026)
            ]);

            setBallotData(categories);

            // Convert picks array to map
            const picksMap: UserPicks = {};
            picks.forEach(pick => {
                picksMap[pick.category] = pick.nomineeId;
            });
            setUserPicks(picksMap);
            setLoading(false);
        }
        loadData();
    }, []);

    const handlePick = async (category: string, nomineeId: string, nomineeName: string) => {
        // Optimistic update
        setUserPicks(prev => ({ ...prev, [category]: nomineeId }));

        // Save to database
        await submitPick(2026, category, nomineeId, nomineeName);
    };

    if (loading) {
        return (
            <main className="flex-grow pt-32 pb-20 flex items-center justify-center">
                <div className="text-white/40 text-sm uppercase tracking-widest">Loading ballot...</div>
            </main>
        );
    }

    const categoryOrder = [
        "Best Picture",
        "Best Director",
        "Best Actor",
        "Best Actress",
        "Best Supporting Actor",
        "Best Supporting Actress",
        "Best Original Screenplay",
        "Best Adapted Screenplay",
        "Best Animated Feature Film",
        "Best International Feature Film",
        "Best Documentary Feature",
        "Best Documentary Short Subject",
        "Best Live Action Short Film",
        "Best Animated Short Film",
        "Best Casting",
        "Best Original Score",
        "Best Original Song",
        "Best Sound",
        "Best Production Design",
        "Best Cinematography",
        "Best Makeup and Hairstyling",
        "Best Costume Design",
        "Best Film Editing",
        "Best Visual Effects"
    ];

    const orderedCategories = categoryOrder.filter(cat => ballotData[cat]);

    return (
        <main className="flex-grow pt-32 pb-20">
            <Container>
                {/* Hero */}
                <div className="mb-16 text-center">
                    <div className="inline-flex items-center gap-2 bg-brand/10 border border-brand/20 px-3 py-1 rounded-full text-brand text-[10px] font-black uppercase tracking-widest mb-6">
                        <Trophy className="w-3 h-3" />
                        <span>Live Ballot</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter italic uppercase leading-[0.9] mb-4">
                        The 98th <br />
                        <span className="text-brand">Academy Awards</span>
                    </h1>
                    <p className="text-[#99aabb] text-sm max-w-2xl mx-auto">
                        Make your predictions across {orderedCategories.length} categories. Your picks are saved automatically.
                    </p>
                </div>

                {/* Categories */}
                <div className="max-w-4xl mx-auto space-y-12">
                    {orderedCategories.map((category) => {
                        const nominees = ballotData[category];
                        const selectedId = userPicks[category];

                        return (
                            <div key={category} className="bg-[#1b2228]/40 border border-white/5 rounded-xl p-6 md:p-8">
                                <h2 className="text-white font-black uppercase italic tracking-tighter text-xl md:text-2xl mb-6">
                                    {category}
                                </h2>
                                <div className="space-y-3">
                                    {nominees.map((nominee) => {
                                        const isSelected = selectedId === nominee.id;
                                        const displayText = nominee.personName
                                            ? `${nominee.personName} – ${nominee.movieTitle}`
                                            : nominee.movieTitle;

                                        return (
                                            <button
                                                key={nominee.id}
                                                onClick={() => handlePick(category, nominee.id, displayText)}
                                                className={`
                                                    w-full text-left px-4 py-3 rounded-lg border transition-all
                                                    ${isSelected
                                                        ? 'bg-brand/10 border-brand text-white'
                                                        : 'bg-black/20 border-white/5 text-[#99aabb] hover:border-white/20 hover:text-white'
                                                    }
                                                `}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm md:text-base font-medium">
                                                        {nominee.personName && (
                                                            <>
                                                                <span className="font-bold">{nominee.personName}</span>
                                                                <span className="text-white/40 mx-2">–</span>
                                                            </>
                                                        )}
                                                        <span className={nominee.personName ? "italic" : "font-bold"}>
                                                            {nominee.movieTitle}
                                                        </span>
                                                    </span>
                                                    {isSelected && (
                                                        <Check className="w-5 h-5 text-brand flex-shrink-0 ml-4" />
                                                    )}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Footer CTA */}
                <div className="mt-16 text-center">
                    <p className="text-[#556677] text-xs uppercase tracking-widest">
                        Ceremony: March 8, 2026
                    </p>
                </div>
            </Container>
        </main>
    );
}
