"use client";

import { useState, useEffect } from "react";
import { X, Plus, Loader2, List as ListIcon, Check } from "lucide-react";
import { getMovieListsStatus, createList, toggleMovieInList } from "@/app/actions/lists";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ListStatus {
    id: string;
    title: string;
    isInList: boolean;
}

interface ListSelectDialogProps {
    movieId: number;
    movieTitle: string;
    isOpen: boolean;
    onClose: () => void;
}

export default function ListSelectDialog({
    movieId,
    movieTitle,
    isOpen,
    onClose
}: ListSelectDialogProps) {
    const [lists, setLists] = useState<ListStatus[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newListName, setNewListName] = useState("");
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            fetchLists();
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    const fetchLists = async () => {
        setIsLoading(true);
        const data = await getMovieListsStatus(movieId);
        setLists(data);
        setIsLoading(false);
    };

    const handleCreateList = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newListName.trim() || isCreating) return;

        setIsCreating(true);
        const res = await createList(newListName.trim());
        if (res.success) {
            setNewListName("");
            await fetchLists();
        }
        setIsCreating(false);
    };

    const handleToggle = async (listId: string) => {
        // Optimistic update
        setLists(prev => prev.map(l =>
            l.id === listId ? { ...l, isInList: !l.isInList } : l
        ));

        const res = await toggleMovieInList(listId, movieId);
        if ("error" in res) {
            // Revert on error
            await fetchLists();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/90 backdrop-blur-md"
                onClick={onClose}
            />

            <div className="relative w-full max-w-sm bg-[#1b2228] border border-white/10 rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between p-5 border-b border-white/5">
                    <div>
                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#556677] block mb-0.5">ADD TO LIST</span>
                        <h2 className="text-sm font-black text-white italic uppercase tracking-tight truncate max-w-[200px]">{movieTitle}</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1.5 text-[#556677] hover:text-white transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="p-5 space-y-6">
                    {/* Create New List */}
                    <form onSubmit={handleCreateList} className="flex gap-2">
                        <input
                            type="text"
                            value={newListName}
                            onChange={(e) => setNewListName(e.target.value)}
                            placeholder="New list name..."
                            className="flex-1 bg-white/5 border border-white/10 rounded-[4px] px-3 py-2 text-xs text-white focus:outline-none focus:border-brand/40 transition-colors"
                        />
                        <button
                            type="submit"
                            disabled={!newListName.trim() || isCreating}
                            className="px-3 py-2 bg-brand/10 border border-brand/20 text-brand rounded-[4px] hover:bg-brand/20 transition-all disabled:opacity-50"
                        >
                            {isCreating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                        </button>
                    </form>

                    {/* Lists Grid */}
                    <div className="max-h-[300px] overflow-y-auto space-y-1 pr-2 scrollbar-thin scrollbar-thumb-white/10">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-10 space-y-3 opacity-20">
                                <Loader2 className="w-6 h-6 animate-spin text-white" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#556677]">Loading Lists</span>
                            </div>
                        ) : lists.length === 0 ? (
                            <div className="text-center py-10 text-[#556677] text-[10px] font-bold uppercase tracking-widest italic opacity-50">
                                No lists yet. Create one above!
                            </div>
                        ) : (
                            lists.map((list) => (
                                <button
                                    key={list.id}
                                    onClick={() => handleToggle(list.id)}
                                    className={cn(
                                        "w-full flex items-center justify-between px-4 py-3 rounded-[4px] transition-all border group",
                                        list.isInList
                                            ? "bg-brand/10 border-brand/30 text-brand"
                                            : "bg-white/5 border-transparent text-[#99aabb] hover:bg-white/[0.08] hover:border-white/10"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <ListIcon className={cn("w-3.5 h-3.5", list.isInList ? "text-brand" : "text-[#556677]")} />
                                        <span className="text-xs font-bold tracking-tight">{list.title}</span>
                                    </div>
                                    {list.isInList && <Check className="w-3.5 h-3.5" />}
                                </button>
                            ))
                        )}
                    </div>
                </div>

                <div className="p-4 bg-black/20 border-t border-white/5">
                    <button
                        onClick={onClose}
                        className="w-full py-2.5 rounded-[4px] text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/5 transition-all"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
}
