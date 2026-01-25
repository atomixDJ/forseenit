"use client";

import { useState, useEffect } from "react";
import { Heart, Eye, Loader2, Plus, List as ListIcon } from "lucide-react";
import { toggleFavorite, toggleWatched } from "@/app/actions/interactions";
import { useRouter } from "next/navigation";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import LogMovieDialog from "./LogMovieDialog";
import ListSelectDialog from "./ListSelectDialog";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface InteractionButtonsProps {
    movieId: number;
    movieTitle: string;
    initialFavorite: boolean;
    initialWatched: boolean;
    initialRating: number | null;
}

export default function InteractionButtons({
    movieId,
    movieTitle,
    initialFavorite,
    initialWatched,
    initialRating
}: InteractionButtonsProps) {
    const [isFavorite, setIsFavorite] = useState(initialFavorite);
    const [isWatched, setIsWatched] = useState(initialWatched);
    const [isLogOpen, setIsLogOpen] = useState(false);
    const [isListOpen, setIsListOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsFavorite(initialFavorite);
    }, [initialFavorite]);

    useEffect(() => {
        setIsWatched(initialWatched);
    }, [initialWatched]);

    const handleFavorite = async () => {
        setIsLoading(true);
        const result = await toggleFavorite(movieId);

        if ("error" in result) {
            if (result.error === "Unauthorized") {
                router.push(`/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
            }
        } else {
            setIsFavorite(result.favorite);
            setIsWatched(result.watched);
            if (result.favorite) {
                window.dispatchEvent(new CustomEvent('movieInteraction', { detail: { movieId, type: 'favorite' } }));
            }
        }
        setIsLoading(false);
        router.refresh();
    };

    const handleWatched = async () => {
        setIsLoading(true);
        const result = await toggleWatched(movieId);

        if ("error" in result) {
            if (result.error === "Unauthorized") {
                router.push(`/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
            }
        } else {
            setIsWatched(result.watched);
            if (result.watched) {
                window.dispatchEvent(new CustomEvent('movieInteraction', { detail: { movieId, type: 'watched' } }));
            }
        }
        setIsLoading(false);
        router.refresh();
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-2">
                <button
                    onClick={() => setIsLogOpen(true)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-[4px] font-bold uppercase text-[10px] tracking-widest transition-all bg-brand text-white hover:bg-brand-light shadow-lg shadow-brand/20"
                >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Log</span>
                </button>
                <button
                    onClick={() => setIsListOpen(true)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-[4px] font-bold uppercase text-[10px] tracking-widest transition-all bg-white/5 border border-white/10 text-[#99aabb] hover:bg-white/10 hover:border-white/20"
                >
                    <ListIcon className="h-3.5 w-3.5 text-brand" />
                    <span>List</span>
                </button>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={handleFavorite}
                    disabled={isLoading}
                    title={isFavorite ? "Unfavorite" : "Favorite"}
                    className={cn(
                        "flex-1 flex items-center justify-center gap-2 py-3 rounded-[4px] font-bold uppercase text-[10px] tracking-widest transition-all border",
                        isFavorite
                            ? "bg-rose-500/10 border-rose-500/50 text-rose-500"
                            : "bg-white/5 border-white/10 text-[#99aabb] hover:border-white/20"
                    )}
                >
                    {isLoading ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                        <Heart className={cn("h-3.5 w-3.5", isFavorite && "fill-current")} />
                    )}
                    <span>Favorite</span>
                </button>

                <button
                    onClick={handleWatched}
                    disabled={isLoading}
                    title={isWatched ? "Mark as unwatched" : "Mark as watched"}
                    className={cn(
                        "flex-1 flex items-center justify-center gap-2 py-3 rounded-[4px] font-bold uppercase text-[10px] tracking-widest transition-all border",
                        isWatched
                            ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-500"
                            : "bg-white/5 border-white/10 text-[#99aabb] hover:border-white/20"
                    )}
                >
                    {isLoading ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                        <Eye className={cn("h-3.5 w-3.5", isWatched && "fill-current")} />
                    )}
                    <span>Watched</span>
                </button>
            </div>

            <LogMovieDialog
                movieId={movieId}
                movieTitle={movieTitle}
                initialRating={initialRating}
                initialIsFavorite={isFavorite}
                isOpen={isLogOpen}
                onClose={() => setIsLogOpen(false)}
            />

            <ListSelectDialog
                movieId={movieId}
                movieTitle={movieTitle}
                isOpen={isListOpen}
                onClose={() => setIsListOpen(false)}
            />
        </div>
    );
}
