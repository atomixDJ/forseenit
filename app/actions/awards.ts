"use server";

import { PrismaClient } from "../../lib/generated/client";

const prisma = new PrismaClient();

import { CURRENT_SEASON } from "../../lib/constants";

export async function getAwardsData() {
    try {
        const now = new Date();
        const seasonStartYear = parseInt(CURRENT_SEASON.split('_')[0]);
        const seasonStartDate = new Date(seasonStartYear, 2, 15); // March 15th of start year

        const seasons = await (prisma as any).awardSeason.findMany({
            where: {
                OR: [
                    // Layer 1: Always visible index for the current season
                    {
                        season: CURRENT_SEASON
                    },
                    // Layer 2: Winners/Festivals that happened in the current calendar window
                    {
                        phase: 'WINNERS',
                        date: {
                            gte: seasonStartDate,
                            lt: now
                        }
                    }
                ]
            },
            include: {
                event: true,
                winners: {
                    include: {
                        movie: true
                    },
                    orderBy: {
                        prizeName: 'asc'
                    }
                }
            },
            orderBy: {
                date: 'desc'
            }
        });

        return seasons;
    } catch (error) {
        console.error("Failed to fetch awards data:", error);
        return [];
    }
}
