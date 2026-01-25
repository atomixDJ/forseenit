"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    horizontalListSortingStrategy,
    useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { reorderTopTen } from "@/app/actions/top-ten";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type TopTenItem = {
    id: string; // UserTopTen ID
    tmdbId: number;
    position: number;
    movie: {
        title: string;
        posterPath: string | null;
    } | null;
};

type Props = {
    initialMovies: TopTenItem[];
    isOwner: boolean;
    userId: string;
};

// ─────────────────────────────────────────────────────────────────────────────
// Sortable Item Component
// ─────────────────────────────────────────────────────────────────────────────

function SortableMovie({ item, isEditing }: { item: TopTenItem; isEditing: boolean }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: item.tmdbId });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : 'auto',
        opacity: isDragging ? 0.5 : 1
    };

    const movie = item.movie || { title: `Unknown (${item.tmdbId})`, posterPath: null };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`relative flex-shrink-0 w-[100px] aspect-[2/3] bg-[#1b2228]/40 backdrop-blur-md border border-white/5 rounded-[4px] overflow-hidden shadow-sm group ${isEditing ? 'cursor-grab active:cursor-grabbing' : 'hover:border-white/20 hover:shadow-lg transition-all'}`}
            {...(isEditing ? { ...attributes, ...listeners, tabIndex: 0 } : {})}
        >
            {movie.posterPath ? (
                <Image
                    src={`https://image.tmdb.org/t/p/w342${movie.posterPath}`}
                    alt={movie.title}
                    fill
                    className="object-cover"
                    sizes="100px"
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center p-2 text-center text-xs text-[#556677] font-bold uppercase tracking-wider broke-words">
                    {movie.title}
                </div>
            )}

            {/* Hover overlay only when NOT editing */}
            {!isEditing && (
                <Link
                    href={`/movie/${item.tmdbId}`}
                    className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"
                >
                    <span className="sr-only">View {movie.title}</span>
                </Link>
            )}

            {/* Editing Indicator */}
            {isEditing && (
                <div className="absolute top-1 right-1 bg-black/50 rounded-full p-1 backdrop-blur-sm">
                    <div className="w-2 h-2 bg-brand rounded-full shadow-[0_0_8px_rgba(var(--brand-rgb),0.8)]" />
                </div>
            )}
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────────────────────

export default function TopTen({ initialMovies, isOwner, userId }: Props) {
    const [items, setItems] = useState(initialMovies);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Sensors for Accessibility
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    // Sync with server updates
    useEffect(() => {
        setItems(initialMovies);
    }, [initialMovies]);

    async function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (active.id !== over?.id) {
            setItems((items) => {
                const oldIndex = items.findIndex(i => i.tmdbId === active.id);
                const newIndex = items.findIndex(i => i.tmdbId === over?.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }

    async function saveOrder() {
        setIsSaving(true);
        // Extract plain IDs in order
        const orderedIds = items.map(i => i.tmdbId);
        const result = await reorderTopTen(orderedIds);

        if (result.error) {
            alert("Failed to save order: " + result.error);
            // Revert? simpler to just let it be or refresh
        } else {
            setIsEditing(false);
        }
        setIsSaving(false);
    }

    const isEmpty = items.length === 0;

    // ─────────────────────────────────────────────────────────────────────────
    // Render
    // ─────────────────────────────────────────────────────────────────────────

    return (
        <section className="w-full mb-12">
            <div className="flex items-end justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase mb-2">
                        Top Ten<span className="text-brand">.</span>
                    </h2>
                    <p className="text-[#556677] text-[10px] uppercase tracking-[0.2em] font-bold">
                        Your personal hall of fame
                    </p>
                </div>
                {isOwner && items.length > 1 && (
                    <div className="flex gap-2">
                        {isEditing ? (
                            <button
                                onClick={saveOrder}
                                disabled={isSaving}
                                className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] bg-white text-black rounded-[4px] hover:bg-neutral-200 transition disabled:opacity-50"
                            >
                                {isSaving ? "Saving..." : "Save Order"}
                            </button>
                        ) : (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#556677] border border-white/10 hover:border-white/30 hover:text-white rounded-[4px] transition-all bg-white/5"
                            >
                                Reorder
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* The Shelf Container */}
            <div className="relative group/shelf">

                {/* Visual "Mantle" Bar backing */}
                {/* Visual "Mantle" Bar backing */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5 rounded-full translate-y-1/2 w-full" />

                <div className="relative z-10 flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">

                    {/* Empty State Slots */}
                    {isEmpty && (
                        <div className="flex gap-4 w-full">
                            {Array.from({ length: 10 }).map((_, i) => (
                                <div key={i} className="flex-shrink-0 w-[100px] aspect-[2/3] bg-[#1b2228]/20 rounded-[4px] border border-white/5 flex items-center justify-center">
                                    <span className="text-[#1b2228] font-black text-4xl select-none opacity-50">{i + 1}</span>
                                </div>
                            ))}
                            {isOwner && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="text-center pointer-events-auto">
                                        <p className="text-[#556677] text-xs font-bold uppercase tracking-widest mb-4">No Top Ten yet</p>
                                        <Link
                                            href="/discover"
                                            className="inline-flex items-center gap-2 px-6 py-3 rounded-[4px] bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all"
                                        >
                                            <span className="text-brand">+</span> Choose your Top Ten
                                        </Link>
                                    </div>
                                </div>
                            )}
                            {!isOwner && (
                                <div className="absolute inset-0 flex items-center justify-center text-neutral-500">
                                    User hasn't picked their Top Ten yet.
                                </div>
                            )}
                        </div>
                    )}

                    {/* Populated List */}
                    {!isEmpty && (
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext
                                items={items.map(i => i.tmdbId)}
                                strategy={horizontalListSortingStrategy}
                                disabled={!isEditing}
                            >
                                {items.map((item) => (
                                    <SortableMovie key={item.tmdbId} item={item} isEditing={isEditing} />
                                ))}
                            </SortableContext>
                        </DndContext>
                    )}

                    {/* Fillers if < 10 items? */}
                    {!isEmpty && items.length < 10 && (
                        Array.from({ length: 10 - items.length }).map((_, i) => (
                            <div key={`empty-${i}`} className="flex-shrink-0 w-[100px] aspect-[2/3] bg-[#1b2228]/20 rounded-[4px] border border-white/5 flex items-center justify-center opacity-50">
                                <span className="text-[#1b2228] font-black text-4xl select-none">{items.length + i + 1}</span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
