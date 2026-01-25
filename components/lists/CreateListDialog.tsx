"use client";

import { useState } from "react";
import { X, Plus, Loader2, Star } from "lucide-react";
import { createList } from "@/app/actions/lists";
import { useRouter } from "next/navigation";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface CreateListDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CreateListDialog({ isOpen, onClose }: CreateListDialogProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");
    const [isRanked, setIsRanked] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || isCreating) return;

        setIsCreating(true);
        const res = await createList(title.trim(), description.trim(), tags.trim(), isRanked);
        if (res.success && res.list) {
            router.push(`/lists/${res.list.id}`);
            onClose();
        } else {
            alert(res.error || "Failed to create list");
        }
        setIsCreating(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/90 backdrop-blur-md animate-in fade-in duration-300"
                onClick={onClose}
            />

            <div className="relative w-full max-w-2xl bg-[#1b2228] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between p-8 border-b border-white/5 bg-white/[0.02]">
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand block mb-1">CURATE COLLECTION</span>
                        <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">New List<span className="text-brand">.</span></h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-[#556677] hover:text-white transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#556677] mb-2">Name</label>
                                <input
                                    type="text"
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g. Best Noir of the 50s"
                                    className="w-full bg-white/5 border border-white/10 rounded-[4px] px-4 py-3 text-sm text-white focus:outline-none focus:border-brand/40 transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#556677] mb-2">Tags</label>
                                <input
                                    type="text"
                                    value={tags}
                                    onChange={(e) => setTags(e.target.value)}
                                    placeholder="Comma separated tags..."
                                    className="w-full bg-white/5 border border-white/10 rounded-[4px] px-4 py-3 text-sm text-white focus:outline-none focus:border-brand/40 transition-colors"
                                />
                            </div>

                            <div
                                onClick={() => setIsRanked(!isRanked)}
                                className={cn(
                                    "p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between group",
                                    isRanked
                                        ? "bg-brand/10 border-brand/40"
                                        : "bg-white/5 border-white/5 hover:border-white/10"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={cn(
                                        "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                                        isRanked ? "bg-brand text-black" : "bg-white/5 text-[#556677] group-hover:text-white"
                                    )}>
                                        <Star className={cn("w-5 h-5", isRanked && "fill-current")} />
                                    </div>
                                    <div>
                                        <h4 className={cn("text-xs font-black uppercase tracking-widest", isRanked ? "text-white" : "text-[#99aabb]")}>Ranked List</h4>
                                        <p className="text-[10px] text-[#556677] font-bold uppercase tracking-tight">Show positions for each film</p>
                                    </div>
                                </div>
                                <div className={cn(
                                    "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                                    isRanked ? "border-brand bg-brand" : "border-[#334455]"
                                )}>
                                    {isRanked && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#556677] mb-2">Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={8}
                                placeholder="Describe your collection..."
                                className="w-full h-[calc(100%-24px)] bg-white/5 border border-white/10 rounded-[4px] px-4 py-3 text-sm text-white focus:outline-none focus:border-brand/40 transition-colors resize-none"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-8 py-3 rounded-[4px] text-[10px] font-black uppercase tracking-widest text-[#556677] hover:text-white transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!title.trim() || isCreating}
                            className="px-10 py-3 bg-white text-black rounded-[4px] text-[10px] font-black uppercase tracking-widest hover:bg-white/90 transition-all flex items-center gap-2 shadow-2xl"
                        >
                            {isCreating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                            Create Collection
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
