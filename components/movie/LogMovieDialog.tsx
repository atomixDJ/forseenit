"use client";

import { useState, useEffect } from "react";
import { X, Calendar, Star, Loader2, Plus, Check, Heart } from "lucide-react";
import { createLogEntry } from "@/app/actions/reviews";
import { useRouter } from "next/navigation";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface LogMovieDialogProps {
    movieId: number;
    movieTitle: string;
    initialRating: number | null;
    initialIsFavorite: boolean;
    isOpen: boolean;
    onClose: () => void;
}

export default function LogMovieDialog({
    movieId,
    movieTitle,
    initialRating,
    initialIsFavorite,
    isOpen,
    onClose
}: LogMovieDialogProps) {
    const [rating, setRating] = useState<number | null>(initialRating);
    const [hover, setHover] = useState<number | null>(null);
    const [isFavorited, setIsFavorited] = useState(initialIsFavorite);
    const [body, setBody] = useState("");
    const [watchedAt, setWatchedAt] = useState(new Date().toISOString().split('T')[0]);
    const [isRewatch, setIsRewatch] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (isOpen) {
            setRating(initialRating);
            setIsFavorited(initialIsFavorite);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen, initialRating, initialIsFavorite]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const res = await createLogEntry({
            movieId,
            watchedAt: new Date(watchedAt),
            rewatch: isRewatch,
            favorited: isFavorited,
            ratingHalf: rating !== null ? rating * 2 : null,
            bodyRaw: body,
            bodyFormat: "markdown"
        });

        if ("success" in res && res.success) {
            onClose();
            router.refresh();
        } else if ("error" in res && res.error === "Unauthorized") {
            router.push(`/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
        }

        setIsSubmitting(false);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative w-full max-w-xl bg-[#1b2228] border border-white/10 rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between p-6 border-b border-white/5">
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#556677] block mb-1">LOGGING</span>
                        <h2 className="text-xl font-black text-white italic uppercase tracking-tight">{movieTitle}</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-[#556677] hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-8">
                    <div className="grid grid-cols-2 gap-8 items-end">
                        {/* Date Picker */}
                        <div className="space-y-3">
                            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#556677]">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>Watched On</span>
                            </label>
                            <input
                                type="date"
                                value={watchedAt}
                                onChange={(e) => setWatchedAt(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-[4px] px-3 py-2 text-sm text-white focus:outline-none focus:border-brand/50 transition-colors"
                            />
                        </div>

                        {/* Toggles */}
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => setIsRewatch(!isRewatch)}
                                className={cn(
                                    "flex-1 flex items-center justify-center gap-2 px-3 py-2 h-[38px] rounded-[4px] border font-bold text-[10px] uppercase tracking-widest transition-all",
                                    isRewatch
                                        ? "bg-brand/10 border-brand/50 text-brand"
                                        : "bg-white/5 border-white/10 text-[#556677] hover:border-white/20"
                                )}
                            >
                                {isRewatch && <Check className="w-3 h-3" />}
                                {isRewatch ? "Rewatch" : "First View"}
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsFavorited(!isFavorited)}
                                className={cn(
                                    "px-4 h-[38px] rounded-[4px] border transition-all flex items-center justify-center",
                                    isFavorited
                                        ? "bg-rose-500/10 border-rose-500/50 text-rose-500"
                                        : "bg-white/5 border-white/10 text-[#556677] hover:border-white/20"
                                )}
                                title="Add to favorites"
                            >
                                <Heart className={cn("w-4 h-4", isFavorited && "fill-current")} />
                            </button>
                        </div>
                    </div>

                    {/* Rating Selection (Half-star compatible) */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#556677]">
                                <Star className="w-3.5 h-3.5" />
                                <span>Rating</span>
                            </label>
                            {rating !== null && (
                                <button
                                    type="button"
                                    onClick={() => { setRating(null); setHover(null); }}
                                    className="text-[10px] font-bold text-[#556677] hover:text-white uppercase tracking-widest"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                        <div className="flex gap-1" onMouseLeave={() => setHover(null)}>
                            {[...Array(5)].map((_, i) => {
                                const val = i + 1;
                                const half = i + 0.5;
                                const current = hover !== null ? hover : (rating || 0);

                                return (
                                    <div key={i} className="relative group cursor-pointer w-10 h-10">
                                        {/* Half Star Hitbox */}
                                        <div
                                            className="absolute inset-y-0 left-0 w-1/2 z-10"
                                            onMouseEnter={() => setHover(half)}
                                            onClick={() => setRating(half)}
                                        />
                                        {/* Full Star Hitbox */}
                                        <div
                                            className="absolute inset-y-0 right-0 w-1/2 z-10"
                                            onMouseEnter={() => setHover(val)}
                                            onClick={() => setRating(val)}
                                        />

                                        <div className="flex items-center justify-center h-full">
                                            {current >= val ? (
                                                <Star className="w-8 h-8 fill-[#ff8000] text-[#ff8000]" />
                                            ) : current >= half ? (
                                                <div className="relative">
                                                    <Star className="w-8 h-8 text-[#334455]" />
                                                    <div className="absolute inset-0 overflow-hidden w-1/2">
                                                        <Star className="w-8 h-8 fill-[#ff8000] text-[#ff8000]" />
                                                    </div>
                                                </div>
                                            ) : (
                                                <Star className="w-8 h-8 text-[#334455] group-hover:text-[#445566]" />
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                            {rating !== null && (
                                <span className="ml-4 flex items-center text-2xl font-black text-white italic tracking-tighter">
                                    {rating.toFixed(1)}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Review Body */}
                    <div className="space-y-3">
                        <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#556677]">
                            <span>Review (Optional)</span>
                        </label>
                        <textarea
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            placeholder="Add a review..."
                            className="w-full h-32 bg-white/5 border border-white/10 rounded-[4px] p-4 text-sm text-white focus:outline-none focus:border-brand/50 transition-colors resize-none placeholder:text-[#334455]"
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-3 py-3 rounded-[4px] border border-white/5 text-[10px] font-black uppercase tracking-widest text-[#556677] hover:bg-white/5 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 flex items-center justify-center gap-3 px-3 py-3 rounded-[4px] bg-brand hover:bg-brand-light text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all disabled:opacity-50"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                    <span>Saving Log...</span>
                                </>
                            ) : (
                                <>
                                    <Plus className="w-3.5 h-3.5" />
                                    <span>Save Log</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
