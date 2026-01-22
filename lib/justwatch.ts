// lib/justwatch.ts (MOCK Implementation)

export interface StreamingProvider {
    provider_id: number;
    name: string;
    logo_path: string;
    clear_name: string;
}

export interface Availability {
    flatrate: StreamingProvider[];
    rent: StreamingProvider[];
    buy: StreamingProvider[];
}

// Mock Data
const MOCK_PROVIDERS: Record<string, StreamingProvider> = {
    NFLX: { provider_id: 8, name: 'Netflix', logo_path: '/nflx.png', clear_name: 'netflix' },
    MAX: { provider_id: 12, name: 'Max', logo_path: '/max.png', clear_name: 'max' },
    DSNY: { provider_id: 337, name: 'Disney Plus', logo_path: '/dsny.png', clear_name: 'disneyplus' },
    AMZ: { provider_id: 9, name: 'Amazon Prime Video', logo_path: '/amz.png', clear_name: 'amazonprimevideo' },
    APL: { provider_id: 2, name: 'Apple TV', logo_path: '/apl.png', clear_name: 'appletv' },
};

/**
 * Returns streaming availability for a movie.
 * In a real app, this would call JustWatch API or a scraping service.
 */
export async function getMovieAvailability(tmdbId: number | string): Promise<Availability> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Deterministic Mock based on ID parity
    const idNum = Number(tmdbId);

    if (idNum % 2 === 0) {
        return {
            flatrate: [MOCK_PROVIDERS.NFLX, MOCK_PROVIDERS.MAX],
            rent: [MOCK_PROVIDERS.APL, MOCK_PROVIDERS.AMZ],
            buy: [MOCK_PROVIDERS.APL, MOCK_PROVIDERS.AMZ],
        };
    } else {
        return {
            flatrate: [MOCK_PROVIDERS.DSNY],
            rent: [MOCK_PROVIDERS.AMZ],
            buy: [MOCK_PROVIDERS.AMZ],
        };
    }
}
