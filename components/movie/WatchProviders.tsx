import Image from "next/image";

interface WatchProvidersProps {
    providers: {
        results?: {
            US?: {
                flatrate?: Array<{
                    provider_id: number;
                    provider_name: string;
                    logo_path: string;
                }>;
            };
        };
    };
}

export default function WatchProviders({ providers }: WatchProvidersProps) {
    const usProviders = providers?.results?.US?.flatrate;

    if (!usProviders || usProviders.length === 0) {
        return (
            <div className="mt-4">
                <span className="text-[#556677] uppercase text-[9px] font-bold tracking-[0.2em] mb-3 block">
                    Watch
                </span>
                <p className="text-[#99aabb] text-xs italic">Not streaming in US</p>
            </div>
        );
    }

    return (
        <div className="mt-4">
            <span className="text-[#556677] uppercase text-[9px] font-bold tracking-[0.2em] mb-4 block">
                Streaming
            </span>
            <div className="flex flex-wrap gap-2">
                {usProviders.map((provider) => (
                    <div
                        key={provider.provider_id}
                        className="relative h-8 w-8 rounded-[4px] overflow-hidden border border-white/10 group shadow-sm"
                        title={provider.provider_name}
                    >
                        <Image
                            src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                            alt={provider.provider_name}
                            fill
                            className="object-cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
