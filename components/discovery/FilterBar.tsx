"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { Smile, Moon, Rocket, Brain, Flame, Trash2 } from "lucide-react";

const MOODS = [
    { id: "uplifting", name: "Uplifting", icon: Smile, genres: "35,16,10751" },
    { id: "dark", name: "Dark", icon: Moon, genres: "27,53,80" },
    { id: "epic", name: "Epic", icon: Rocket, genres: "12,878,14" },
    { id: "cerebral", name: "Thoughtful", icon: Brain, genres: "9648,18,99" },
    { id: "intense", name: "Intense", icon: Flame, genres: "28,10752,53" },
];

const RUNTIMES = [
    { id: "short", name: "< 90m", max: 90 },
    { id: "medium", name: "90-120m", min: 90, max: 120 },
    { id: "long", name: "> 120m", min: 120 },
];

const PROVIDERS = [
    { id: "8", name: "Netflix" },
    { id: "337", name: "Disney+" },
    { id: "1899", name: "Max" },
    { id: "119", name: "Prime" },
    { id: "350", name: "Apple TV" },
];

export default function FilterBar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const currentMood = searchParams.get("mood");
    const currentRuntime = searchParams.get("runtime");
    const currentProviders = searchParams.get("providers")?.split(",") || [];

    const updateFilters = (updates: Record<string, string | null>) => {
        const params = new URLSearchParams(searchParams.toString());

        Object.entries(updates).forEach(([key, value]) => {
            if (value === null) {
                params.delete(key);
            } else {
                params.set(key, value);
            }
        });

        startTransition(() => {
            router.push(`/discover?${params.toString()}`);
        });
    };

    const toggleProvider = (id: string) => {
        let nextProviders = [...currentProviders];
        if (nextProviders.includes(id)) {
            nextProviders = nextProviders.filter(p => p !== id);
        } else {
            nextProviders.push(id);
        }
        updateFilters({ providers: nextProviders.length > 0 ? nextProviders.join(",") : null });
    };

    const clearFilters = () => {
        router.push("/discover");
    };

    return (
        <div className="space-y-8 py-6 sticky top-[72px] bg-[#14181c] z-30 pb-10 border-b border-white/5">
            <div className="flex flex-wrap items-center gap-10">
                {/* Moods */}
                <div className="space-y-3">
                    <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#556677]">MOOD</span>
                    <div className="flex flex-wrap gap-2">
                        {MOODS.map((mood) => {
                            const Icon = mood.icon;
                            const isActive = currentMood === mood.id;
                            return (
                                <button
                                    key={mood.id}
                                    onClick={() => updateFilters({ mood: isActive ? null : mood.id, genres: isActive ? null : mood.genres })}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all text-xs font-bold uppercase tracking-widest ${isActive
                                            ? "bg-brand border-brand text-[#14181c]"
                                            : "bg-white/5 border-white/10 text-[#99aabb] hover:border-brand/40 hover:text-white"
                                        }`}
                                >
                                    <Icon className={`w-3 h-3 ${isActive ? "text-[#14181c]" : "text-brand"}`} />
                                    {mood.name}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Runtime */}
                <div className="space-y-3">
                    <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#556677]">LENGTH</span>
                    <div className="flex flex-wrap gap-2">
                        {RUNTIMES.map((rt) => {
                            const isActive = currentRuntime === rt.id;
                            return (
                                <button
                                    key={rt.id}
                                    onClick={() => updateFilters({
                                        runtime: isActive ? null : rt.id,
                                        'runtime_min': isActive ? null : rt.min?.toString() || null,
                                        'runtime_max': isActive ? null : rt.max?.toString() || null
                                    })}
                                    className={`px-4 py-2 rounded-full border transition-all text-xs font-bold uppercase tracking-widest ${isActive
                                            ? "bg-brand border-brand text-[#14181c]"
                                            : "bg-white/5 border-white/10 text-[#99aabb] hover:border-brand/40 hover:text-white"
                                        }`}
                                >
                                    {rt.name}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Providers */}
                <div className="space-y-3">
                    <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#556677]">STREAMING</span>
                    <div className="flex flex-wrap gap-2">
                        {PROVIDERS.map((provider) => {
                            const isActive = currentProviders.includes(provider.id);
                            return (
                                <button
                                    key={provider.id}
                                    onClick={() => toggleProvider(provider.id)}
                                    className={`px-4 py-2 rounded-full border transition-all text-xs font-bold uppercase tracking-widest ${isActive
                                            ? "bg-brand border-brand text-[#14181c]"
                                            : "bg-white/5 border-white/10 text-[#99aabb] hover:border-brand/40 hover:text-white"
                                        }`}
                                >
                                    {provider.name}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Clear Actions */}
                <div className="ml-auto pt-6 flex items-center gap-4">
                    {searchParams.toString() && (
                        <button
                            onClick={clearFilters}
                            className="flex items-center gap-2 text-[#556677] hover:text-brand transition-colors text-[10px] font-black uppercase tracking-widest"
                        >
                            <Trash2 className="w-3 h-3" />
                            Reset All
                        </button>
                    )}
                    {isPending && (
                        <div className="flex items-center gap-2 text-brand text-[10px] font-black uppercase tracking-widest">
                            <div className="w-3 h-3 border-2 border-brand border-t-transparent rounded-full animate-spin" />
                            Updating...
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
