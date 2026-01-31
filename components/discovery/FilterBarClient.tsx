"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition, useCallback } from "react";
import FilterBar from "./FilterBar";
import {
    type DiscoveryFilters,
    type Genre,
    filtersToParams,
} from "@/lib/discovery/filters";

interface FilterBarClientProps {
    genres: Genre[];
    initialFilters: DiscoveryFilters;
}

/**
 * Client wrapper for FilterBar that handles URL updates.
 * 
 * URL is the single source of truth:
 * - initialFilters comes from server-side URL parsing
 * - onChange updates URL via router.replace
 * - No local state that can drift from URL
 */
export default function FilterBarClient({ genres, initialFilters }: FilterBarClientProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    // Derive current filters from URL (always use latest)
    // This ensures back/forward navigation works correctly
    const currentFilters: DiscoveryFilters = {
        genreId: searchParams.get("genre") ? parseInt(searchParams.get("genre")!, 10) : null,
        decadeKey: searchParams.get("decade"),
        minRating: searchParams.get("rating") ? parseInt(searchParams.get("rating")!, 10) : null,
        moodKey: searchParams.get("mood"),
        lengthKey: searchParams.get("length"),
        streamingProviderIds: searchParams.get("providers")
            ? searchParams.get("providers")!.split(",").map(Number).filter(n => !isNaN(n) && n > 0)
            : [],
    };

    const handleFilterChange = useCallback((next: DiscoveryFilters) => {
        const params = filtersToParams(next);
        // Always reset pagination on filter change
        params.delete("page");

        const queryString = params.toString();
        const url = queryString ? `/discover?${queryString}` : "/discover";

        startTransition(() => {
            router.replace(url);
        });
    }, [router]);

    return (
        <FilterBar
            genres={genres}
            filters={currentFilters}
            onChange={handleFilterChange}
        />
    );
}
