"use client";

import { useState } from "react";
import { Plus, Check, Loader2 } from "lucide-react";
import { toggleWatchlist } from "@/app/actions/watchlist";
import { useRouter } from "next/navigation";

interface WatchlistButtonProps {
    movie: {
        id: number;
        title: string;
        poster_path: string | null;
        backdrop_path: string | null;
        release_year?: number;
    };
    initialIsSaved: boolean;
}

export default function WatchlistButton({ movie, initialIsSaved }: WatchlistButtonProps) {
    const [isSaved, setIsSaved] = useState(initialIsSaved);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleToggle = async () => {
        setIsLoading(true);
        const newState = !isSaved;
        setIsSaved(newState);

        const result = await toggleWatchlist(movie);

        if (result?.error) {
            setIsSaved(!newState);
            if (result.error === "Unauthorized") {
                router.push(`/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
            }
        } else {
            setIsSaved(result.added!);
        }

        setIsLoading(false);
        router.refresh();
    };

    return (
        <button
            onClick={handleToggle}
            disabled={isLoading}
            className={`
                w-full flex items-center justify-center gap-2 py-3 rounded-[4px] font-bold uppercase text-xs tracking-widest transition-all
                ${isSaved
                    ? "bg-[#334455] text-white hover:bg-[#445566]"
                    : "bg-[#00e054] text-white hover:bg-[#00c048]"}
            `}
        >
            {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : isSaved ? (
                <Check className="h-4 w-4" />
            ) : (
                <Plus className="h-4 w-4" />
            )}
            <span>{isSaved ? "Saved" : "Watchlist"}</span>
        </button>
    );
}
