"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import FilterSidebar from "./FilterSidebar";
import {
    type DiscoveryFilters,
    type Genre,
    filtersToParams,
    parseFiltersFromParams,
} from "@/lib/discovery/filters";

interface FilterSidebarClientProps {
    genres: Genre[];
    initialFilters: DiscoveryFilters;
}

/**
 * Client wrapper for FilterSidebar that manages URL sync.
 */
export default function FilterSidebarClient({ genres, initialFilters }: FilterSidebarClientProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [filters, setFilters] = useState(initialFilters);

    // Sync filters from URL when searchParams change
    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        setFilters(parseFiltersFromParams(params));
    }, [searchParams]);

    const handleChange = useCallback((next: DiscoveryFilters) => {
        setFilters(next);
        const params = filtersToParams(next);
        const queryString = params.toString();
        router.replace(queryString ? `/discover?${queryString}` : "/discover");
    }, [router]);

    return (
        <FilterSidebar
            genres={genres}
            filters={filters}
            onChange={handleChange}
        />
    );
}
