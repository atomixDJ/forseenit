"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import Image from "next/image";
import { Smile, Moon, Rocket, Brain, Flame, Trash2, Heart, Clock, Sparkles, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    type DiscoveryFilters,
    type Genre,
    MOODS,
    LENGTHS,
    PROVIDERS,
    DECADES,
    RATINGS,
    hasActiveFilters,
} from "@/lib/discovery/filters";

// Icon mapping for moods
const MOOD_ICONS = {
    uplifting: Smile,
    dark: Moon,
    epic: Rocket,
    thoughtful: Brain,
    intense: Flame,
    heartwarming: Heart,
    nostalgic: Clock,
    quirky: Sparkles,
    mindbending: Eye,
} as const;

interface FilterSidebarProps {
    genres: Genre[];
    filters: DiscoveryFilters;
    onChange: (next: DiscoveryFilters) => void;
}

/**
 * Vertical filter sidebar for the Discover page.
 * 
 * Order (top to bottom):
 * 1. Streaming
 * 2. Genre
 * 3. Rating
 * 4. Decade
 * 5. Mood
 * 6. Length
 */
export default function FilterSidebar({ genres, filters, onChange }: FilterSidebarProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const updateFilter = <K extends keyof DiscoveryFilters>(
        key: K,
        value: DiscoveryFilters[K]
    ) => {
        const next = { ...filters, [key]: value };
        onChange(next);
    };

    const toggleProvider = (id: number) => {
        const current = filters.streamingProviderIds;
        const next = current.includes(id)
            ? current.filter(p => p !== id)
            : [...current, id];
        updateFilter("streamingProviderIds", next);
    };

    const clearFilters = () => {
        startTransition(() => {
            router.replace("/discover");
        });
    };

    const showClearButton = hasActiveFilters(filters);

    return (
        <aside className="w-56 flex-shrink-0 space-y-6 sticky top-[88px] self-start max-h-[calc(100vh-120px)] overflow-y-auto pr-4 pb-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#778899]">
                    Filters
                </h2>
                {(showClearButton || isPending) && (
                    <button
                        type="button"
                        onClick={clearFilters}
                        disabled={isPending}
                        className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-[#556677] hover:text-brand transition-colors"
                    >
                        {isPending ? (
                            <div className="w-2.5 h-2.5 border-2 border-brand border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <Trash2 className="w-2.5 h-2.5" />
                        )}
                        Clear
                    </button>
                )}
            </div>

            {/* Streaming */}
            <FilterSection label="Streaming">
                <div className="flex flex-wrap gap-1.5">
                    {PROVIDERS.map((provider) => {
                        const isActive = filters.streamingProviderIds.includes(provider.id);
                        return (
                            <button
                                key={provider.id}
                                type="button"
                                onClick={() => toggleProvider(provider.id)}
                                className={cn(
                                    "flex items-center gap-1.5 px-2 py-1 rounded-full border transition-all text-[11px] font-medium",
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
            </FilterSection>

            {/* Genre */}
            <FilterSection label="Genre">
                <div className="flex flex-wrap gap-1">
                    {genres.map((genre) => {
                        const isActive = filters.genreId === genre.id;
                        return (
                            <button
                                key={genre.id}
                                type="button"
                                onClick={() => updateFilter("genreId", isActive ? null : genre.id)}
                                className={cn(
                                    "px-2 py-0.5 rounded-full border transition-all text-[11px] font-medium",
                                    isActive
                                        ? "bg-[#00e054] text-black border-[#00e054]"
                                        : "bg-[#2a3440] text-[#99aabb] hover:bg-[#3a4550] hover:text-white border-white/5"
                                )}
                            >
                                {genre.name}
                            </button>
                        );
                    })}
                </div>
            </FilterSection>

            {/* Rating */}
            <FilterSection label="Rating">
                <div className="flex flex-wrap gap-1.5">
                    {RATINGS.map((rating) => {
                        const isActive = filters.minRating === rating.key;
                        return (
                            <button
                                key={rating.key}
                                type="button"
                                onClick={() => updateFilter("minRating", isActive ? null : rating.key)}
                                className={cn(
                                    "px-2.5 py-1 rounded-full border transition-all text-[11px] font-medium",
                                    isActive
                                        ? "bg-[#40bcf4] text-black border-[#40bcf4]"
                                        : "bg-[#2a3440] text-[#99aabb] hover:bg-[#3a4550] hover:text-white border-white/5"
                                )}
                            >
                                {rating.label}
                            </button>
                        );
                    })}
                </div>
            </FilterSection>

            {/* Decade */}
            <FilterSection label="Decade">
                <div className="flex flex-wrap gap-1.5">
                    {DECADES.map((decade) => {
                        const isActive = filters.decadeKey === decade.key;
                        return (
                            <button
                                key={decade.key}
                                type="button"
                                onClick={() => updateFilter("decadeKey", isActive ? null : decade.key)}
                                className={cn(
                                    "px-2.5 py-1 rounded-full border transition-all text-[11px] font-medium",
                                    isActive
                                        ? "bg-[#ff8000] text-black border-[#ff8000]"
                                        : "bg-[#2a3440] text-[#99aabb] hover:bg-[#3a4550] hover:text-white border-white/5"
                                )}
                            >
                                {decade.label}
                            </button>
                        );
                    })}
                </div>
            </FilterSection>

            {/* Mood */}
            <FilterSection label="Mood">
                <div className="flex flex-wrap gap-1.5">
                    {MOODS.map((mood) => {
                        const Icon = MOOD_ICONS[mood.key as keyof typeof MOOD_ICONS];
                        const isActive = filters.moodKey === mood.key;
                        return (
                            <button
                                key={mood.key}
                                type="button"
                                onClick={() => updateFilter("moodKey", isActive ? null : mood.key)}
                                className={cn(
                                    "flex items-center gap-1 px-2 py-1 rounded-full border transition-all text-[11px] font-medium",
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
            </FilterSection>

            {/* Length */}
            <FilterSection label="Length">
                <div className="flex flex-wrap gap-1.5">
                    {LENGTHS.map((length) => {
                        const isActive = filters.lengthKey === length.key;
                        return (
                            <button
                                key={length.key}
                                type="button"
                                onClick={() => updateFilter("lengthKey", isActive ? null : length.key)}
                                className={cn(
                                    "px-2.5 py-1 rounded-full border transition-all text-[11px] font-medium",
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
            </FilterSection>
        </aside>
    );
}

function FilterSection({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="space-y-2">
            <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-[#556677]">
                {label}
            </h3>
            {children}
        </div>
    );
}
