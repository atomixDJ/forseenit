"use client";

import { useState, useEffect } from "react";
import { Reorder } from "framer-motion";
import { toggleRanked, updateListPositions, toggleMovieInList, updateListMetadata, copyListToUser } from "@/app/actions/lists";
import { getUserSeenMovieIds, getUserWatchlistIds } from "@/app/actions/interactions";
import { List as ListIcon, Star, GripVertical, ArrowUp, ArrowDown, Save, Loader2, ChevronLeft, Trash2, Edit3, Share2, BarChart3, Clock, Eye, Hash, Plus, Copy, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getTMDBImage } from "@/lib/tmdb";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import MovieSearchBox from "./MovieSearchBox";
import { useRouter } from "next/navigation";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ListItem {
    movieId: number;
    position: number | null;
    movie: {
        title: string;
        posterPath: string | null;
    } | null;
}

interface ListEditorProps {
    initialList: {
        id: string;
        title: string;
        description: string | null;
        tags: string | null;
        isRanked: boolean;
        isSystem?: boolean;
        items: ListItem[];
        userId: string;
    }
}

export default function ListEditor({ initialList }: ListEditorProps) {
    const router = useRouter();
    const [isRanked, setIsRanked] = useState(initialList.isRanked);
    const [items, setItems] = useState<ListItem[]>(initialList.items);
    const [title, setTitle] = useState(initialList.title);
    const [description, setDescription] = useState(initialList.description || "");
    const [tags, setTags] = useState(initialList.tags || "");
    const [isSaving, setIsSaving] = useState(false);
    const [isToggling, setIsToggling] = useState(false);
    const [isEditingMeta, setIsEditingMeta] = useState(false);
    const [seenIds, setSeenIds] = useState<Set<number>>(new Set());
    const [watchlistIds, setWatchlistIds] = useState<Set<number>>(new Set());
    const [isCopying, setIsCopying] = useState(false);

    const isSystem = initialList.isSystem;

    useEffect(() => {
        const fetchUserData = async () => {
            const [seen, watchlist] = await Promise.all([
                getUserSeenMovieIds(),
                getUserWatchlistIds()
            ]);
            setSeenIds(new Set(seen));
            setWatchlistIds(new Set(watchlist));
        };
        fetchUserData();
    }, []);

    const handleCopyList = async () => {
        setIsCopying(true);
        try {
            const res = await copyListToUser(initialList.id);
            if (res.error) throw new Error(res.error);
            if (res.success && res.listId) {
                router.push(`/lists/${res.listId}`);
            }
        } catch (e) {
            console.error("Failed to copy list", e);
            alert("Failed to copy list. Please try again.");
            setIsCopying(false);
        }
    };

    const handleToggleRanked = async () => {
        if (isSystem) return;
        setIsToggling(true);
        try {
            const res = await toggleRanked(initialList.id);
            setIsRanked(res.isRanked);
            window.location.reload();
        } catch (e) {
            console.error(e);
        } finally {
            setIsToggling(false);
        }
    };

    const handleSaveOrder = async () => {
        if (isSystem) return;
        setIsSaving(true);
        try {
            const movieIds = items.map(i => i.movieId);
            await updateListPositions(initialList.id, movieIds);
        } catch (e) {
            console.error(e);
        } finally {
            setIsSaving(false);
        }
    };

    const handleSaveMeta = async () => {
        if (isSystem) return;
        setIsSaving(true);
        try {
            await updateListMetadata(initialList.id, {
                title,
                description,
                tags
            });
            setIsEditingMeta(false);
        } catch (e) {
            console.error(e);
        } finally {
            setIsSaving(false);
        }
    };

    const handleAddMovie = async (movieId: number) => {
        if (isSystem) return;
        setIsSaving(true);
        try {
            await toggleMovieInList(initialList.id, movieId);
            window.location.reload();
        } catch (e) {
            console.error(e);
        } finally {
            setIsSaving(false);
        }
    };

    const handleRemoveMovie = async (movieId: number) => {
        if (isSystem) return;
        if (!confirm("Remove this movie from the list?")) return;
        try {
            await toggleMovieInList(initialList.id, movieId);
            setItems(prev => prev.filter(i => i.movieId !== movieId));
        } catch (e) {
            console.error(e);
        }
    };

    const moveItem = (index: number, direction: 'up' | 'down') => {
        if (isSystem) return;
        const newItems = [...items];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= newItems.length) return;

        [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]];
        setItems(newItems);
    };

    const watchedCount = items.filter(i => seenIds.has(i.movieId)).length;
    const watchedPercent = items.length > 0 ? Math.round((watchedCount / items.length) * 100) : 0;

    return (
        <div className="max-w-7xl mx-auto">
            <Link
                href="/lists"
                className="inline-flex items-center gap-2 text-[#556677] hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest mb-8"
            >
                <ChevronLeft className="w-3 h-3" /> Back to Lists
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                {/* Main Content Area */}
                <div className="lg:col-span-3 space-y-12">
                    <header className="space-y-6">
                        {isEditingMeta ? (
                            <div className="space-y-4 bg-white/5 p-8 rounded-xl border border-white/10 animate-in fade-in slide-in-from-top-4">
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#556677] mb-2">List Name</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                        className="w-full bg-[#14181c] border border-white/10 rounded-[4px] px-4 py-3 text-xl font-black italic uppercase tracking-tight text-white focus:outline-none focus:border-brand/40 transition-colors"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#556677] mb-2">Description</label>
                                        <textarea
                                            value={description}
                                            onChange={e => setDescription(e.target.value)}
                                            rows={4}
                                            placeholder="Write something about this collection..."
                                            className="w-full bg-[#14181c] border border-white/10 rounded-[4px] px-4 py-3 text-sm text-[#99aabb] focus:outline-none focus:border-brand/40 transition-colors resize-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#556677] mb-2">Tags (Separated by commas)</label>
                                        <input
                                            type="text"
                                            value={tags}
                                            onChange={e => setTags(e.target.value)}
                                            placeholder="e.g. action, 90s, favorites"
                                            className="w-full bg-[#14181c] border border-white/10 rounded-[4px] px-4 py-3 text-sm text-[#99aabb] focus:outline-none focus:border-brand/40 transition-colors"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end gap-3 pt-4">
                                    <button
                                        onClick={() => setIsEditingMeta(false)}
                                        className="px-6 py-2 rounded-[4px] text-[10px] font-black uppercase tracking-widest text-[#556677] hover:text-white transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSaveMeta}
                                        disabled={isSaving}
                                        className="px-8 py-2 bg-brand text-black rounded-[4px] text-[10px] font-black uppercase tracking-widest hover:bg-brand/90 transition-all flex items-center gap-2"
                                    >
                                        {isSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
                                <div className="space-y-4 max-w-2xl">
                                    <div className="flex items-center gap-2 text-brand text-[10px] font-black uppercase tracking-[0.3em]">
                                        <ListIcon className="w-3 h-3" />
                                        <span>{isSystem ? 'Curated Collection' : 'Member Collection'}</span>
                                    </div>
                                    <h1 className="text-6xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-[0.8]">
                                        {initialList.title}<span className="text-brand">.</span>
                                    </h1>

                                    {isSystem && (
                                        <div className="flex items-center gap-2 text-yellow-500 text-xs font-black uppercase tracking-widest bg-yellow-500/10 px-3 py-1.5 rounded w-fit border border-yellow-500/20">
                                            <ShieldCheck className="w-3 h-3" /> Official Selection
                                        </div>
                                    )}

                                    {description && (
                                        <p className="text-[#99aabb] text-lg font-medium leading-relaxed italic opacity-80 pl-2 border-l-2 border-white/5">
                                            {description}
                                        </p>
                                    )}
                                    {tags && (
                                        <div className="flex flex-wrap gap-2 pt-2">
                                            {tags.split(',').map(t => t.trim()).filter(Boolean).map(tag => (
                                                <span key={tag} className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest text-[#556677] hover:text-brand hover:bg-brand/5 border border-white/5 transition-all cursor-default group">
                                                    <Hash className="w-2.5 h-2.5 opacity-50 group-hover:text-brand" />
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-2 shrink-0">
                                    {isSystem ? (
                                        <button
                                            onClick={handleCopyList}
                                            disabled={isCopying}
                                            className="px-6 py-3 bg-white text-black rounded px-4 text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-2 shadow-lg"
                                        >
                                            {isCopying ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Copy className="w-3.5 h-3.5" />}
                                            Save to My Lists
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => setIsEditingMeta(true)}
                                            className="p-3 bg-white/5 border border-white/10 rounded-[4px] text-[#556677] hover:text-white hover:border-white/20 transition-all"
                                            title="Edit Metadata"
                                        >
                                            <Edit3 className="w-4 h-4" />
                                        </button>
                                    )}
                                    <button
                                        className="p-3 bg-white/5 border border-white/10 rounded-[4px] text-[#556677] hover:text-white hover:border-white/20 transition-all"
                                        title="Share List"
                                    >
                                        <Share2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </header>

                    {/* Quick Add Search (Hidden for System) */}
                    {!isSystem && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#556677]">
                                <Plus className="w-3 h-3 text-brand" />
                                <span>Add a Film</span>
                            </div>
                            <MovieSearchBox onSelect={handleAddMovie} className="max-w-xl" />
                        </div>
                    )}

                    {/* List Content */}
                    <div className="bg-[#1b2228]/20 border border-white/5 rounded-2xl overflow-hidden min-h-[400px]">
                        <div className="p-6 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <button
                                    onClick={handleToggleRanked}
                                    disabled={isToggling || isSystem}
                                    className={cn(
                                        "px-5 py-2 rounded-full border text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-2",
                                        isRanked
                                            ? "bg-brand/10 border-brand/50 text-brand"
                                            : "bg-white/5 border-white/10 text-[#556677] hover:border-white/20",
                                        isSystem && "opacity-50 cursor-default"
                                    )}
                                >
                                    {isToggling ? <Loader2 className="w-3 h-3 animate-spin" /> : <Star className={cn("w-3 h-3", isRanked && "fill-current")} />}
                                    {isRanked ? "Ranked" : "Gallery View"}
                                </button>
                                <span className="text-[10px] font-black text-[#334455] uppercase tracking-widest">
                                    {items.length} Films Total
                                </span>
                            </div>

                            {!isSystem && isRanked && (
                                <button
                                    onClick={handleSaveOrder}
                                    disabled={isSaving}
                                    className="px-6 py-2 rounded-full bg-white text-black font-black text-[9px] uppercase tracking-widest hover:bg-white/90 transition-all flex items-center gap-2 shadow-xl"
                                >
                                    {isSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                                    Save Order
                                </button>
                            )}
                        </div>

                        {items.length === 0 ? (
                            <div className="py-40 text-center space-y-4">
                                <ListIcon className="w-12 h-12 text-[#334455] mx-auto opacity-20" />
                                <p className="text-[#556677] italic font-medium px-8 text-sm">
                                    {isSystem ? "This collection is empty." : "Your list is currently empty. Use the search box above to start building your collection."}
                                </p>
                            </div>
                        ) : isRanked ? (
                            <Reorder.Group
                                axis="y"
                                values={items}
                                onReorder={isSystem ? () => { } : setItems}
                                className="divide-y divide-white/5"
                            >
                                {items.map((item, index) => {
                                    const hasSeen = seenIds.has(item.movieId);
                                    return (
                                        <Reorder.Item
                                            key={item.movieId}
                                            value={item}
                                            dragListener={!isSystem}
                                            className={cn(
                                                "flex items-center gap-6 p-4 md:p-6 bg-[#1b2228]/40 transition-colors group relative overflow-hidden",
                                                !isSystem && "hover:bg-white/[0.02] cursor-default"
                                            )}
                                        >
                                            {/* Seen Indicator Background */}
                                            {hasSeen && <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand" />}

                                            <div className="flex items-center gap-4 min-w-[70px]">
                                                {!isSystem ? (
                                                    <GripVertical className="text-[#334455] group-hover:text-[#556677] cursor-grab active:cursor-grabbing w-5 h-5 flex-shrink-0" />
                                                ) : (
                                                    <div className="w-5" /> // Spacer
                                                )}
                                                <span className="text-4xl font-black italic text-[#334455] tracking-tighter w-10 text-center group-hover:text-brand transition-colors">
                                                    {index + 1}
                                                </span>
                                            </div>

                                            <div className="w-20 h-28 relative rounded overflow-hidden shadow-2xl flex-shrink-0 bg-[#1b2228] border border-white/5">
                                                {item.movie?.posterPath ? (
                                                    <Image
                                                        src={getTMDBImage(item.movie.posterPath, 'w300')}
                                                        alt={item.movie?.title || "Movie"}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-[#14181c] p-4 text-center">
                                                        <span className="text-[10px] font-black text-white/40 uppercase tracking-widest leading-tight">
                                                            {item.movie?.title || "Unknown"}
                                                        </span>
                                                    </div>
                                                )}
                                                {hasSeen && (
                                                    <div className="absolute top-1 right-1 bg-brand text-black p-1 rounded-full shadow-lg">
                                                        <Eye className="w-2.5 h-2.5" />
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex-grow min-w-0">
                                                <h3 className="text-xl font-black text-white uppercase italic tracking-tight truncate mb-1">
                                                    {item.movie?.title || "Unknown"}
                                                </h3>
                                                <div className="flex items-center gap-4">
                                                    <Link
                                                        href={`/movie/${item.movieId}`}
                                                        className="text-[#556677] text-[10px] font-black uppercase tracking-widest hover:text-brand transition-colors"
                                                    >
                                                        Details
                                                    </Link>
                                                    {hasSeen && (
                                                        <span className="text-brand text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5">
                                                            <div className="w-1 h-1 bg-brand rounded-full" /> Watched
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {!isSystem && (
                                                <div className="flex items-center gap-2">
                                                    <div className="hidden md:flex flex-col gap-1">
                                                        <button
                                                            onClick={() => moveItem(index, 'up')}
                                                            disabled={index === 0}
                                                            className="p-2 text-[#334455] hover:text-white disabled:opacity-0 transition-colors"
                                                            title="Move Up"
                                                        >
                                                            <ArrowUp className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => moveItem(index, 'down')}
                                                            disabled={index === items.length - 1}
                                                            className="p-2 text-[#334455] hover:text-white disabled:opacity-0 transition-colors"
                                                            title="Move Down"
                                                        >
                                                            <ArrowDown className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => handleRemoveMovie(item.movieId)}
                                                        className="p-3 text-[#334455] hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                                        title="Remove from list"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            )}
                                        </Reorder.Item>
                                    );
                                })}
                            </Reorder.Group>
                        ) : (
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6 gap-6 p-8">
                                {items.map((item) => {
                                    const hasSeen = seenIds.has(item.movieId);
                                    const isInWatchlist = watchlistIds.has(item.movieId);
                                    return (
                                        <div key={item.movieId} className="group relative">
                                            <Link
                                                href={`/movie/${item.movieId}`}
                                                className="group relative aspect-[2/3] rounded-lg overflow-hidden block bg-[#1b2228] border border-white/5 hover:border-brand/40 transition-all shadow-2xl hover:scale-105"
                                            >
                                                <Image
                                                    src={getTMDBImage(item.movie?.posterPath || null, 'w300')}
                                                    alt={item.movie?.title || "Movie"}
                                                    fill
                                                    className="object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
                                                    <p className="text-[10px] font-black text-white leading-tight uppercase italic truncate">{item.movie?.title || "Details"}</p>
                                                </div>
                                                {/* Blue watchlist badge - top left (persistent) */}
                                                {isInWatchlist && (
                                                    <div className="absolute top-2 left-2 bg-blue-500 text-white p-1 rounded-[2px] shadow-lg" title="In your Watchlist">
                                                        <Eye className="w-3 h-3" />
                                                    </div>
                                                )}
                                                {/* Green seen badge - top right */}
                                                {hasSeen && (
                                                    <div className="absolute top-2 right-2 bg-brand text-black p-1.5 rounded-full shadow-lg">
                                                        <Eye className="w-3 h-3" />
                                                    </div>
                                                )}
                                            </Link>
                                            {!isSystem && (
                                                <button
                                                    onClick={() => handleRemoveMovie(item.movieId)}
                                                    className="absolute -top-2 -right-2 bg-red-600 text-white p-1.5 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:scale-110"
                                                >
                                                    <Trash2 className="w-3 h-3" />
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar Stats Area */}
                <aside className="lg:col-span-1 space-y-8">
                    {/* Progress Card */}
                    <div className="bg-[#1b2228] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                        <div className="p-6 border-b border-white/5 bg-white/[0.02]">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#556677]">Your Progress</span>
                                <BarChart3 className="w-4 h-4 text-brand" />
                            </div>
                            <div className="flex items-baseline justify-between mb-2">
                                <span className="text-5xl font-black text-white italic tracking-tighter">{watchedPercent}<span className="text-brand text-2xl">%</span></span>
                                <span className="text-[10px] font-black text-[#556677] uppercase tracking-widest">Watched</span>
                            </div>
                            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-brand transition-all duration-1000 ease-out"
                                    style={{ width: `${watchedPercent}%` }}
                                />
                            </div>
                            <p className="text-[#556677] text-[10px] font-bold uppercase tracking-widest mt-4">
                                {watchedCount} of {items.length} films watched
                            </p>
                        </div>
                        <div className="p-4 bg-black/20 divide-y divide-white/5">
                            <div className="py-3 px-2 flex items-center justify-between">
                                <div className="flex items-center gap-3 text-[#99aabb]">
                                    <Clock className="w-3.5 h-3.5" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Total Time</span>
                                </div>
                                <span className="text-[10px] font-black text-white uppercase tracking-widest">~{Math.round((items.length * 105) / 60)}h</span>
                            </div>
                            <div className="py-3 px-2 flex items-center justify-between">
                                <div className="flex items-center gap-3 text-[#99aabb]">
                                    <Eye className="w-3.5 h-3.5" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Visibility</span>
                                </div>
                                <span className="text-[10px] font-black text-white uppercase tracking-widest">{isSystem ? 'System' : 'Public'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Stats Summary */}
                    <div className="space-y-4">
                        <div className="section-header">
                            <span>INSIGHTS</span>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                            <div className="bg-white/5 border border-white/5 p-4 rounded-lg flex items-center justify-between group hover:border-brand/20 transition-colors">
                                <span className="text-[9px] font-black text-[#556677] uppercase tracking-widest">Avg Year</span>
                                <span className="text-xs font-black text-[#99aabb] group-hover:text-white transition-colors tracking-widest">2024</span>
                            </div>
                            <div className="bg-white/5 border border-white/5 p-4 rounded-lg flex items-center justify-between group hover:border-brand/20 transition-colors">
                                <span className="text-[9px] font-black text-[#556677] uppercase tracking-widest">Top Genre</span>
                                <span className="text-xs font-black text-[#99aabb] group-hover:text-white transition-colors tracking-widest">Action</span>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
