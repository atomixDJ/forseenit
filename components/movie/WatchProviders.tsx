import { getWatchProviders, getTMDBImage, WatchProvider } from "@/lib/tmdb";
import { ExternalLink, Play } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ProviderList from "./ProviderList";

interface WatchProvidersProps {
    tmdbId: number;
    initialRegion?: string;
}

export default async function WatchProviders({ tmdbId, initialRegion = "US" }: WatchProvidersProps) {
    const data = await getWatchProviders(tmdbId, initialRegion);

    if (!data) {
        return (
            <div className="space-y-3">
                <h3 className="text-xs font-bold text-white uppercase tracking-widest border-b border-white/10 pb-2">
                    Where to watch
                </h3>
                <p className="text-[10px] text-[#556677]">
                    No streaming options found in {initialRegion}.
                </p>
            </div>
        );
    }

    const { link, flatrate, rent, buy, free, ads, usedRegion } = data;
    const hasAny = flatrate.length > 0 || rent.length > 0 || buy.length > 0 || free.length > 0 || ads.length > 0;

    if (!hasAny) {
        return (
            <div className="space-y-3">
                <div className="flex items-baseline justify-between border-b border-white/10 pb-2">
                    <h3 className="text-xs font-bold text-white uppercase tracking-widest">
                        Where to watch
                    </h3>
                    <span className="text-[9px] font-bold text-[#556677] bg-white/5 px-1.5 py-0.5 rounded">
                        {usedRegion}
                    </span>
                </div>
                <p className="text-[10px] text-[#556677]">
                    No streaming options currently available.
                </p>
                <div className="pt-2 border-t border-white/5 flex justify-end">
                    <span className="text-[9px] text-[#445566] uppercase font-bold tracking-wider">
                        Powered by <a href="https://www.justwatch.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#99aabb]">JustWatch</a>
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-baseline justify-between border-b border-white/10 pb-2">
                <h3 className="text-xs font-bold text-white uppercase tracking-widest">
                    Where to watch
                </h3>
                <span className="text-[9px] font-bold text-[#556677] bg-white/5 px-1.5 py-0.5 rounded">
                    {usedRegion}
                </span>
            </div>

            {/* Primary CTA if Flatrate Exists */}
            {flatrate.length > 0 && (
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-brand text-black hover:bg-white transition-colors py-2 rounded-[4px] text-[11px] font-black uppercase tracking-wider mb-4"
                >
                    <Play className="w-3 h-3 fill-black" /> Stream Now
                </a>
            )}

            <div className="space-y-4">
                <ProviderList title="Stream" providers={flatrate} link={link} />
                <ProviderList title="Rent" providers={rent} link={link} />
                <ProviderList title="Buy" providers={buy} link={link} />
                <ProviderList title="Free" providers={free} link={link} />
                <ProviderList title="Ads" providers={ads} link={link} />
            </div>

            <div className="pt-2 border-t border-white/5 flex justify-between items-center">
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[9px] items-center gap-1 text-[#556677] hover:text-white transition-colors uppercase font-bold tracking-wider inline-flex group"
                >
                    All Options <ExternalLink className="w-2.5 h-2.5 group-hover:text-brand transition-colors" />
                </a>

                <span className="text-[9px] text-[#445566] uppercase font-bold tracking-wider">
                    Powered by <a href="https://www.justwatch.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#99aabb]">JustWatch</a>
                </span>
            </div>
        </div>
    );
}
