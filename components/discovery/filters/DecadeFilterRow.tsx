"use client";

import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { DECADES } from "@/lib/discovery/filters";

interface DecadeFilterRowProps {
    /** Currently selected decade key, or null for none */
    value: string | null;
    /** Callback when selection changes */
    onChange: (key: string | null) => void;
    /** Size variant: compact for modal, full for Discover page */
    size?: "compact" | "full";
}

/**
 * Reusable decade filter row component.
 * Uses shared DECADES constant from lib/discovery/filters.
 * 
 * Single-select behavior: clicking the same decade deselects it.
 * Active state: orange (bg-[#ff8000])
 */
export default function DecadeFilterRow({
    value,
    onChange,
    size = "full",
}: DecadeFilterRowProps) {
    const isCompact = size === "compact";

    const handleClick = (key: string) => {
        // Toggle: if already selected, deselect; otherwise select
        onChange(value === key ? null : key);
    };

    return (
        <div className="flex flex-wrap items-center gap-1.5">
            <div className={cn(
                "flex items-center gap-1 font-bold text-[#556677] uppercase tracking-wider mr-1",
                isCompact ? "text-[9px]" : "text-[10px]"
            )}>
                <Calendar className={cn(isCompact ? "w-3 h-3" : "w-3.5 h-3.5")} />
                <span>Decade</span>
            </div>

            {DECADES.map((decade) => {
                const isActive = value === decade.key;
                return (
                    <button
                        key={decade.key}
                        type="button"
                        onClick={() => handleClick(decade.key)}
                        className={cn(
                            "rounded-full font-medium transition-all",
                            isCompact
                                ? "px-2 py-0.5 text-[10px]"
                                : "px-2.5 py-1 text-[10px]",
                            isActive
                                ? "bg-[#ff8000] text-black"
                                : "bg-[#2a3440] text-[#99aabb] hover:bg-[#3a4550] hover:text-white border border-white/5"
                        )}
                    >
                        {decade.label}
                    </button>
                );
            })}
        </div>
    );
}
