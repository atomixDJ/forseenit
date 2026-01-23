"use client";

import { useState, useEffect } from "react";
import { Heart, Eye, Loader2 } from "lucide-react";
import { toggleFavorite, toggleWatched } from "@/app/actions/interactions";
import { useRouter } from "next/navigation";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface InteractionButtonsProps {
    movieId: number;
    initialFavorite: boolean;
    initialWatched: boolean;
}

export default function InteractionButtons({
    movieId,
    initialFavorite,
    initialWatched
}: InteractionButtonsProps) {
    const [isFavorite, setIsFavorite] = useState(initialFavorite);
    const [isWatched, setIsWatched] = useState(initialWatched);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    // Sync state with props when they change (e.g., after router.refresh())
    useEffect(() => {
        setIsFavorite(initialFavorite);
    }, [initialFavorite]);

    useEffect(() => {
        setIsWatched(initialWatched);
    }, [initialWatched]);

    const handleFavorite = async () => {
        setIsLoading(true);
        const result = await toggleFavorite(movieId);

        if (result?.error) {
            if (result.error === "Unauthorized") {
                router.push(`/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
            }
        } else {
            setIsFavorite(result.favorite!);
            // Rule: Favoriting auto-sets watched to true
            if (result.favorite) {
                setIsWatched(true);
            }
        }
        setIsLoading(false);
        router.refresh();
    };

    const handleWatched = async () => {
        setIsLoading(true);
        const result = await toggleWatched(movieId);

        if (result?.error) {
            if (result.error === "Unauthorized") {
                router.push(`/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
            }
        } else {
            setIsWatched(result.watched!);
        }
        setIsLoading(false);
        router.refresh();
    };

    return (
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
    );
}
