"use client";

import { Search as SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchInput() {
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const handleSearch = (term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('q', term);
        } else {
            params.delete('q');
        }
        replace(`/search?${params.toString()}`);
    };

    const debouncedSearch = useDebouncedCallback((term: string) => {
        handleSearch(term);
    }, 400);

    return (
        <div className="relative max-w-2xl w-full mx-auto">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-[#99aabb]" />
            </div>
            <input
                type="text"
                placeholder="Search titles, people, or ask the agent..."
                onChange={(e) => debouncedSearch(e.target.value)}
                defaultValue={searchParams.get('q')?.toString()}
                className="w-full bg-[#1b2228] border-none rounded-full py-4 pl-16 pr-8 text-xl text-white placeholder:text-[#556677] focus:ring-4 focus:ring-[#00e054]/20 transition-all shadow-inner"
                autoFocus
            />
        </div>
    );
}
