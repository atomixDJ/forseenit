"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { RATINGS } from "@/lib/discovery/filters";

interface RatingFilterRowProps {
    /** Currently selected minimum rating, or null for none */
    value: number | null;
    /** Callback when selection changes */
    onChange: (minRating: number | null) => void;
    /** Size variant: compact for modal, full for Discover page */
    size?: "compact" | "full";
}

/**
 * Reusable rating filter row component.
 * Uses shared RATINGS constant from lib/discovery/filters.
 * 
 * Single-select behavior: clicking the same rating deselects it.
 * Active state: blue (bg-[#40bcf4])
 */
export default function RatingFilterRow({
    value,
    onChange,
    size = "full",
}: RatingFilterRowProps) {
    const isCompact = size === "compact";

    const handleClick = (key: number) => {
        // Toggle: if already selected, deselect; otherwise select
        onChange(value === key ? null : key);
    };

    return (
        <div className="flex flex-wrap items-center gap-1.5">
            <div className={cn(
                "flex items-center gap-1 font-bold text-[#556677] uppercase tracking-wider mr-1",
                isCompact ? "text-[9px]" : "text-[10px]"
            )}>
                <Star className={cn(isCompact ? "w-3 h-3" : "w-3.5 h-3.5")} />
                <span>Rating</span>
            </div>

            {RATINGS.map((rating) => {
                const isActive = value === rating.key;
                return (
                    <button
                        key={rating.key}
                        type="button"
                        onClick={() => handleClick(rating.key)}
                        className={cn(
                            "rounded-full font-medium transition-all",
                            isCompact
                                ? "px-2 py-0.5 text-[10px]"
                                : "px-2.5 py-1 text-[10px]",
                            isActive
                                ? "bg-[#40bcf4] text-black"
                                : "bg-[#2a3440] text-[#99aabb] hover:bg-[#3a4550] hover:text-white border border-white/5"
                        )}
                    >
                        {rating.label}
                    </button>
                );
            })}
        </div>
    );
}
