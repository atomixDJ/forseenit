"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getTMDBImage } from "@/lib/tmdb";
import { List as ListIcon, ChevronRight, Plus, ShieldCheck } from "lucide-react";
import CreateListDialog from "./CreateListDialog";

interface List {
    id: string;
    title: string;
    isRanked: boolean;
    isSystem?: boolean; // Optional, assumed false for user lists
    _count: { items: number };
    items: Array<{
        movie: {
            posterPath: string | null;
        } | null;
    }>;
}

interface ListsClientProps {
    userLists: List[];
    collectionLists: List[];
    isDev?: boolean;
}

export default function ListsClient({ userLists, collectionLists, isDev = false }: ListsClientProps) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    const ListCard = ({ list }: { list: List }) => (
        <Link
            href={`/lists/${list.id}`}
            className="group bg-[#1b2228]/40 border border-white/5 rounded-2xl p-8 hover:border-brand/40 transition-all flex flex-col justify-between min-h-[240px] relative overflow-hidden"
        >
            <div className="flex flex-col gap-6 relative z-10">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter group-hover:text-brand transition-colors leading-none pr-4">
                            {list.title}
                        </h2>
                        <div className="flex flex-col gap-1 items-end shrink-0">
                            {list.isSystem && (
                                <span className="flex items-center gap-1 bg-yellow-500/10 text-yellow-500 text-[8px] font-black px-2 py-0.5 rounded border border-yellow-500/30 uppercase tracking-[0.2em]">
                                    <ShieldCheck className="w-2 h-2" /> Official
                                </span>
                            )}
                            {list.isRanked && (
                                <span className="bg-brand/10 text-brand text-[8px] font-black px-2 py-0.5 rounded border border-brand/30 uppercase tracking-[0.2em]">
                                    Ranked
                                </span>
                            )}
                        </div>
                    </div>
                    <p className="text-[#556677] text-[10px] font-black uppercase tracking-[0.3em]">
                        {list._count.items} Movie{list._count.items === 1 ? '' : 's'}
                    </p>
                </div>

                {/* Poster Preview Stack */}
                <div className="flex justify-start -space-x-14 py-4 [--is-hover:0] group-hover:[--is-hover:1]">
                    {list.items.slice(0, 4).length > 0 ? (
                        list.items.slice(0, 4).map((item, idx) => {
                            const translationX = idx * 56;

                            return (
                                <div
                                    key={idx}
                                    className="w-20 h-28 relative rounded overflow-hidden shadow-2xl border border-white/10 group-hover:border-brand/40 transition-all duration-500 ease-out transform cursor-pointer shrink-0"
                                    style={{
                                        zIndex: 10 - idx,
                                        transform: `
                                            translateX(calc(var(--is-hover) * ${translationX}px))
                                            scale(calc(1 + (var(--is-hover) * 0.05)))
                                        `
                                    }}
                                >
                                    {item.movie?.posterPath ? (
                                        <Image
                                            src={getTMDBImage(item.movie.posterPath, 'w300')}
                                            alt="Preview"
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-[#14181c] p-1 text-center border-l border-white/5">
                                            <span className="text-[6px] font-black text-white/30 uppercase tracking-widest leading-tight">
                                                No Image
                                            </span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-brand/0 group-hover:bg-brand/5 transition-colors z-20 pointer-events-none" />
                                </div>
                            );
                        })
                    ) : (
                        <div className="w-14 h-20 rounded border border-dashed border-white/10 flex items-center justify-center">
                            <div className="w-1 h-1 bg-white/10 rounded-full" />
                        </div>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-2 text-[#334455] group-hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest mt-8 relative z-10">
                View Collection <ChevronRight className="w-3 h-3" />
            </div>
        </Link>
    );

    return (
        <>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                <header>
                    <div className="flex items-center gap-2 text-brand text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                        <ListIcon className="w-3 h-3" />
                        <span>Your Collections</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter italic uppercase leading-[0.8]">
                        My <br />
                        <span className="text-[#334455]">Lists</span>.
                    </h1>
                </header>

                <button
                    onClick={() => setIsCreateOpen(true)}
                    className="flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl shrink-0"
                >
                    <Plus className="w-4 h-4" />
                    New List
                </button>
            </div>

            <div className="space-y-24">
                {/* Section 1: My Lists */}
                <section>
                    {userLists.length === 0 ? (
                        <div className="py-40 text-center bg-[#1b2228]/20 rounded-2xl border border-dashed border-white/5 space-y-6">
                            <ListIcon className="w-12 h-12 text-[#334455] mx-auto opacity-20" />
                            <p className="text-[#556677] font-medium italic">You haven't created any lists yet. <br /> Use the button above to curate your first collection.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {userLists.map((list) => (
                                <ListCard key={list.id} list={list} />
                            ))}
                        </div>
                    )}
                </section>

                {/* Section 2: Collection Lists */}
                {collectionLists.length > 0 ? (
                    <section>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-px bg-white/10 flex-grow" />
                            <span className="text-[#556677] text-xs font-black uppercase tracking-[0.2em] px-4">
                                Curated Collections
                            </span>
                            <div className="h-px bg-white/10 flex-grow" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {collectionLists.map((list) => (
                                <ListCard key={list.id} list={list} />
                            ))}
                        </div>
                    </section>
                ) : (
                    <section>
                        {isDev ? (
                            <div className="border border-amber-500/30 rounded-lg p-6 bg-amber-900/10">
                                <p className="text-amber-200 text-sm font-medium mb-2">
                                    System collections unavailable.
                                </p>
                                <code className="text-xs text-amber-400/70 bg-black/30 px-2 py-1 rounded">
                                    npx tsx scripts/seed-community-lists.ts
                                </code>
                            </div>
                        ) : (
                            <div className="py-16 text-center bg-[#1b2228]/20 rounded-2xl border border-dashed border-white/5">
                                <p className="text-[#556677] font-medium">
                                    Curated collections are temporarily unavailable.
                                </p>
                                <a href="/contact" className="text-brand text-sm mt-2 inline-block hover:underline">
                                    Report an issue
                                </a>
                            </div>
                        )}
                    </section>
                )}
            </div>

            <CreateListDialog
                isOpen={isCreateOpen}
                onClose={() => setIsCreateOpen(false)}
            />
        </>
    );
}
