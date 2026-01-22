"use client";

import Image from "next/image";
import { Availability, StreamingProvider } from "@/lib/justwatch";

interface WatchModuleProps {
    availability: Availability | null;
}

function ProviderList({ providers }: { providers: StreamingProvider[] | undefined }) {
    if (!providers || providers.length === 0) return <span className="text-zinc-500 text-sm">None available</span>;

    return (
        <div className="flex flex-wrap gap-3">
            {providers.map((p) => (
                <div key={p.provider_id} className="relative group rounded-lg overflow-hidden h-12 w-12 border border-white/10 hover:border-nebula-cyan transition-colors">
                    {/* Logic for real logos vs mocks would go here. Using a text fallback since we don't have real assets loaded yet for mock logos */}
                    <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center text-[10px] text-center p-1 leading-tight text-white font-medium">
                        {p.name}
                    </div>
                    {/* 
            <Image 
              src={`https://image.tmdb.org/t/p/original${p.logo_path}`} 
              fill 
              alt={p.name}
              className="object-cover" 
            /> 
            */}
                </div>
            ))}
        </div>
    );
}

export function WatchModule({ availability }: WatchModuleProps) {
    if (!availability) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-t border-white/10">
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-white uppercase tracking-widest">Stream</h3>
                <ProviderList providers={availability.flatrate} />
            </div>
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-white uppercase tracking-widest">Rent</h3>
                <ProviderList providers={availability.rent} />
            </div>
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-white uppercase tracking-widest">Buy</h3>
                <ProviderList providers={availability.buy} />
            </div>
        </div>
    );
}
