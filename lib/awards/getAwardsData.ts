/**
 * Shared Awards Data Loader
 * 
 * Pure Prisma query - no Next.js runtime dependencies.
 * Used by both app/actions/awards.ts and verify-seeds.ts
 */

import { prisma } from '../prisma';
import { CURRENT_SEASON } from '../constants';

// Typed result for deterministic empty-state handling
export type AwardsDataResult =
    | { status: "ok"; seasons: Awaited<ReturnType<typeof fetchSeasons>> }
    | { status: "missing"; seasons: [] };

async function fetchSeasons() {
    return (prisma as any).awardSeason.findMany({
        where: {
            season: CURRENT_SEASON
        },
        include: {
            event: true,
            winners: {
                include: { movie: true },
                orderBy: { prizeName: 'asc' }
            }
        },
        // Deterministic ordering: year desc, then event name for stability
        // Note: event is always included (never null) due to include above
        orderBy: [
            { year: 'desc' },
            { event: { name: 'asc' } }
        ]
    });
}

export async function getAwardsData(): Promise<AwardsDataResult> {
    try {
        const seasons = await fetchSeasons();

        if (seasons.length === 0) {
            return { status: "missing", seasons: [] };
        }

        return { status: "ok", seasons };
    } catch (error) {
        console.error("Failed to fetch awards data:", error);
        return { status: "missing", seasons: [] };
    }
}
