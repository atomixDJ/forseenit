"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import Image from "next/image";
import { Smile, Moon, Rocket, Brain, Flame, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { GenreFilterRow, DecadeFilterRow, RatingFilterRow } from "./filters";
import {
    type DiscoveryFilters,
    type Genre,
    MOODS,
    LENGTHS,
    PROVIDERS,
    filtersToParams,
    hasActiveFilters,
    EMPTY_FILTERS,
} from "@/lib/discovery/filters";

// Icon mapping for moods
const MOOD_ICONS = {
    uplifting: Smile,
    dark: Moon,
    epic: Rocket,
    thoughtful: Brain,
    intense: Flame,
} as const;

interface FilterBarProps {
    /** Genre list - loaded server-side and passed down */
    genres: Genre[];
    /** Current filter state - derived from URL params, single source of truth */
    filters: DiscoveryFilters;
    /** Callback to update filters - should update URL via router.replace */
    onChange: (next: DiscoveryFilters) => void;
}

/**
 * Unified filter bar for the Discover page.
 * 
 * IMPORTANT: No internal filter state. All visual "active" states are computed
 * directly from the `filters` prop. The URL search params are the single source
 * of truth, and `onChange` should update them via router.replace.
 * 
 * Layout:
 * - Row 1 (Core Search): Genre, Decade, Rating
 * - Row 2 (Vibe): Mood, Length, Streaming
 * 
 * Clear All resets all 6 filter axes and removes any pagination params.
 */
export default function FilterBar({ genres, filters, onChange }: FilterBarProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    // Helper to update a single filter axis
    const updateFilter = <K extends keyof DiscoveryFilters>(
        key: K,
        value: DiscoveryFilters[K]
    ) => {
        const next = { ...filters, [key]: value };
        onChange(next);
    };

    // Toggle streaming provider (multi-select)
    const toggleProvider = (id: number) => {
        const current = filters.streamingProviderIds;
        const next = current.includes(id)
            ? current.filter(p => p !== id)
            : [...current, id];
        updateFilter("streamingProviderIds", next);
    };

    // Clear all filters and reset pagination
    const clearFilters = () => {
        startTransition(() => {
            router.replace("/discover");
        });
    };

    const showClearButton = hasActiveFilters(filters);

    return (
        <div className="space-y-4 py-6 sticky top-[72px] bg-[#14181c] z-30 pb-8 border-b border-white/5">
            {/* Row 1: Core Search Filters */}
            <div className="space-y-3">
                <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#556677]">
                    SEARCH BY
                </span>
                <div className="flex flex-wrap items-start gap-x-6 gap-y-2">
                    <GenreFilterRow
                        genres={genres}
                        value={filters.genreId}
                        onChange={(id) => updateFilter("genreId", id)}
                        size="full"
                    />
                </div>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                    <DecadeFilterRow
                        value={filters.decadeKey}
                        onChange={(key) => updateFilter("decadeKey", key)}
                        size="full"
                    />
                    <RatingFilterRow
                        value={filters.minRating}
                        onChange={(rating) => updateFilter("minRating", rating)}
                        size="full"
                    />
                </div>
            </div>

            {/* Horizontal separator */}
            <div className="border-t border-white/5" />

            {/* Row 2: Vibe Filters - smaller, compact pills */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                {/* Mood */}
                <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#556677] mr-1">
                        MOOD
                    </span>
                    {MOODS.map((mood) => {
                        const Icon = MOOD_ICONS[mood.key as keyof typeof MOOD_ICONS];
                        const isActive = filters.moodKey === mood.key;
                        return (
                            <button
                                key={mood.key}
                                type="button"
                                onClick={() => updateFilter("moodKey", isActive ? null : mood.key)}
                                className={cn(
                                    "flex items-center gap-1 px-2.5 py-1 rounded-full border transition-all text-[10px] font-medium",
                                    isActive
                                        ? "bg-brand border-brand text-[#14181c]"
                                        : "bg-[#2a3440] border-white/5 text-[#99aabb] hover:bg-[#3a4550] hover:text-white"
                                )}
                            >
                                <Icon className={cn("w-2.5 h-2.5", isActive ? "text-[#14181c]" : "text-brand")} />
                                {mood.label}
                            </button>
                        );
                    })}
                </div>

                {/* Vertical separator */}
                <div className="h-5 border-l border-white/10" />

                {/* Length */}
                <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#556677] mr-1">
                        LENGTH
                    </span>
                    {LENGTHS.map((length) => {
                        const isActive = filters.lengthKey === length.key;
                        return (
                            <button
                                key={length.key}
                                type="button"
                                onClick={() => updateFilter("lengthKey", isActive ? null : length.key)}
                                className={cn(
                                    "px-2.5 py-1 rounded-full border transition-all text-[10px] font-medium",
                                    isActive
                                        ? "bg-brand border-brand text-[#14181c]"
                                        : "bg-[#2a3440] border-white/5 text-[#99aabb] hover:bg-[#3a4550] hover:text-white"
                                )}
                            >
                                {length.label}
                            </button>
                        );
                    })}
                </div>

                {/* Vertical separator */}
                <div className="h-5 border-l border-white/10" />

                {/* Streaming */}
                <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#556677] mr-1">
                        STREAMING
                    </span>
                    {PROVIDERS.map((provider) => {
                        const isActive = filters.streamingProviderIds.includes(provider.id);
                        return (
                            <button
                                key={provider.id}
                                type="button"
                                onClick={() => toggleProvider(provider.id)}
                                className={cn(
                                    "flex items-center gap-1.5 px-2 py-1 rounded-full border transition-all text-[10px] font-medium",
                                    isActive
                                        ? "bg-brand border-brand text-[#14181c]"
                                        : "bg-[#2a3440] border-white/5 text-[#99aabb] hover:bg-[#3a4550] hover:text-white"
                                )}
                            >
                                <Image
                                    src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                                    alt={provider.name}
                                    width={12}
                                    height={12}
                                    className="rounded-sm"
                                />
                                {provider.name}
                            </button>
                        );
                    })}
                </div>

                {/* Clear All + Loading */}
                {(showClearButton || isPending) && (
                    <>
                        <div className="h-5 border-l border-white/10" />
                        <div className="flex items-center gap-4">
                            {showClearButton && (
                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="flex items-center gap-1.5 text-[#556677] hover:text-brand transition-colors text-[10px] font-bold uppercase tracking-wider"
                                >
                                    <Trash2 className="w-3 h-3" />
                                    Clear All
                                </button>
                            )}
                            {isPending && (
                                <div className="flex items-center gap-1.5 text-brand text-[10px] font-bold uppercase tracking-wider">
                                    <div className="w-3 h-3 border-2 border-brand border-t-transparent rounded-full animate-spin" />
                                    Updating...
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
