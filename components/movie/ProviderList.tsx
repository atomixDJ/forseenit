"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { getTMDBImage, WatchProvider } from "@/lib/tmdb";
import { cn } from "@/lib/utils";

interface ProviderListProps {
    title: string;
    providers: WatchProvider[];
    link: string;
}

export default function ProviderList({ title, providers, link }: ProviderListProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    if (!providers || providers.length === 0) return null;

    const VISIBLE_COUNT = 4;
    const hasMore = providers.length > VISIBLE_COUNT;
    const itemsToShow = isExpanded ? providers : providers.slice(0, VISIBLE_COUNT);

    return (
        <div className="space-y-1.5 mb-3 last:mb-0">
            <h4 className="text-[9px] font-bold text-[#556677] uppercase tracking-wider">{title}</h4>
            <div className="flex flex-col gap-1.5">
                {itemsToShow.map((p) => (
                    <a
                        key={p.provider_id}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-[#2a3038]/50 hover:bg-[#343b45] transition-colors border border-white/5 p-1.5 pr-2.5 rounded-[4px] group w-full"
                    >
                        <div className="relative w-5 h-5 shrink-0 rounded-[2px] overflow-hidden">
                            <Image
                                src={getTMDBImage(p.logo_path, "w92")}
                                alt={p.provider_name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <span className="text-[10px] font-medium text-zinc-300 group-hover:text-white truncate flex-grow">
                            {p.provider_name}
                        </span>
                        <ExternalLink className="w-2.5 h-2.5 text-[#556677] group-hover:text-brand transition-colors shrink-0" />
                    </a>
                ))}
            </div>

            {hasMore && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-1 text-[9px] font-bold text-[#556677] hover:text-white transition-colors uppercase tracking-wider w-full justify-center py-1 bg-white/5 rounded-[2px]"
                >
                    {isExpanded ? (
                        <>Show Less <ChevronUp className="w-3 h-3" /></>
                    ) : (
                        <>+{providers.length - VISIBLE_COUNT} More <ChevronDown className="w-3 h-3" /></>
                    )}
                </button>
            )}
        </div>
    );
}
