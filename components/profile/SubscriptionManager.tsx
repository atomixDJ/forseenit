"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { toggleSubscription } from "@/app/actions/subscriptions";
import { Check, Plus } from "lucide-react";

// Verified TMDB logo paths (ID and path)
const POPULAR_PROVIDERS = [
    { id: 8, name: "Netflix", logo: "/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg" },
    { id: 337, name: "Disney+", logo: "/97yvRBw1GzX7fXprcF80er19ot.jpg" },
    { id: 9, name: "Prime Video", logo: "/pvske1MyAoymrs5bguRfVqYiM9a.jpg" },
    { id: 1899, name: "HBO Max", logo: "/jbe4gVSfRlbPTdESXhEKpornsfu.jpg" },
    { id: 350, name: "Apple TV", logo: "/mcbz1LgtErU9p4UdbZ0rG6RTWHX.jpg" },
    { id: 15, name: "Hulu", logo: "/bxBlRPEPpMVDc4jMhSrTf2339DW.jpg" },
    { id: 3, name: "Google Play", logo: "/8z7rC8uIDaTM91X0ZfkRf04ydj2.jpg" },
];

interface SubscriptionManagerProps {
    activeProviderIds: number[];
}

export default function SubscriptionManager({ activeProviderIds }: SubscriptionManagerProps) {
    const [isPending, startTransition] = useTransition();
    const [activeIds, setActiveIds] = useState<number[]>(activeProviderIds);

    const handleToggle = (provider: any) => {
        const logo = `https://image.tmdb.org/t/p/w500${provider.logo}`;

        // Optimistic UI
        const nextIds = activeIds.includes(provider.id)
            ? activeIds.filter(id => id !== provider.id)
            : [...activeIds, provider.id];

        setActiveIds(nextIds);

        startTransition(async () => {
            const result = await toggleSubscription(provider.id, provider.name, provider.logo);
            if (result.error) {
                // Rollback if error
                setActiveIds(activeIds);
            }
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-xl font-black text-white italic tracking-tighter uppercase leading-none">
                        Your Services<span className="text-brand">.</span>
                    </h2>
                    <p className="text-[#556677] text-[10px] font-bold tracking-[0.2em] uppercase">Set your active subscriptions for personalized availability</p>
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3">
                {POPULAR_PROVIDERS.map((provider) => {
                    const isActive = activeIds.includes(provider.id);
                    return (
                        <button
                            key={provider.id}
                            onClick={() => handleToggle(provider)}
                            disabled={isPending}
                            className={`relative group h-24 rounded-[8px] border transition-all overflow-hidden ${isActive
                                ? "bg-brand/10 border-brand/50 ring-1 ring-brand/20"
                                : "bg-[#1b2228]/40 border-white/5 hover:border-white/10"
                                }`}
                        >
                            <div className="absolute inset-x-1 inset-y-0 p-2 flex flex-col items-center justify-center gap-2">
                                <div className={`relative h-11 w-11 rounded-[6px] overflow-hidden border shadow-sm transition-transform duration-300 group-hover:scale-105 ${isActive ? 'border-brand/40 ring-1 ring-brand/20' : 'border-white/5 opacity-80 group-hover:opacity-100'}`}>
                                    <Image
                                        src={`https://image.tmdb.org/t/p/w500${provider.logo}`}
                                        alt={provider.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <span className={`text-[8px] font-black uppercase tracking-tight text-center px-1 truncate w-full ${isActive ? 'text-brand' : 'text-[#99aabb]'}`}>
                                    {provider.name}
                                </span>
                            </div>

                            {/* Status Indicator */}
                            <div className={`absolute top-2 right-2 p-0.5 rounded-full ${isActive ? 'bg-brand' : 'bg-white/5 opacity-0 group-hover:opacity-100'}`}>
                                {isActive ? <Check className="w-2.5 h-2.5 text-black" /> : <Plus className="w-2.5 h-2.5 text-[#99aabb]" />}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

