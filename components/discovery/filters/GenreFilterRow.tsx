"use client";

import { Film } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Genre } from "@/lib/discovery/filters";

interface GenreFilterRowProps {
    /** List of genres - must be passed in, not fetched internally */
    genres: Genre[];
    /** Currently selected genre ID, or null for none */
    value: number | null;
    /** Callback when selection changes */
    onChange: (id: number | null) => void;
    /** Size variant: compact for modal, full for Discover page */
    size?: "compact" | "full";
    /** Optional loading state */
    isLoading?: boolean;
}

/**
 * Reusable genre filter row component.
 * 
 * IMPORTANT: Genres are passed as props, not fetched internally.
 * - On Discover: genres loaded server-side and passed down
 * - In Search modal: genres fetched once and cached in parent state
 * 
 * Single-select behavior: clicking the same genre deselects it.
 * Active state: green (bg-[#00e054])
 */
export default function GenreFilterRow({
    genres,
    value,
    onChange,
    size = "full",
    isLoading = false,
}: GenreFilterRowProps) {
    const isCompact = size === "compact";

    const handleClick = (genreId: number) => {
        // Toggle: if already selected, deselect; otherwise select
        onChange(value === genreId ? null : genreId);
    };

    return (
        <div className="flex flex-wrap items-center gap-1.5">
            <div className={cn(
                "flex items-center gap-1 font-bold text-[#556677] uppercase tracking-wider mr-1",
                isCompact ? "text-[9px]" : "text-[10px]"
            )}>
                <Film className={cn(isCompact ? "w-3 h-3" : "w-3.5 h-3.5")} />
                <span>Genre</span>
            </div>

            {isLoading ? (
                <span className={cn(
                    "italic text-[#556677]",
                    isCompact ? "text-[10px]" : "text-[11px]"
                )}>
                    Loading...
                </span>
            ) : (
                genres.map((genre) => {
                    const isActive = value === genre.id;
                    return (
                        <button
                            key={genre.id}
                            type="button"
                            onClick={() => handleClick(genre.id)}
                            className={cn(
                                "rounded-full font-medium transition-all",
                                isCompact
                                    ? "px-2 py-0.5 text-[10px]"
                                    : "px-2.5 py-1 text-[10px]",
                                isActive
                                    ? "bg-[#00e054] text-black"
                                    : "bg-[#2a3440] text-[#99aabb] hover:bg-[#3a4550] hover:text-white border border-white/5"
                            )}
                        >
                            {genre.name}
                        </button>
                    );
                })
            )}
        </div>
    );
}
