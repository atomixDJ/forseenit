"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/**
 * Submit or update a user's pick for a specific category.
 */
export async function submitPick(eventYear: number, category: string, nomineeId: string, nomineeName: string) {
    const session = await auth();
    if (!session?.user?.id) {
        return { error: "Unauthorized" };
    }

    const userId = session.user.id;

    try {
        const pick = await prisma.ballot.upsert({
            where: {
                userId_eventYear_category: {
                    userId,
                    eventYear,
                    category,
                },
            },
            update: {
                nomineeId,
                nomineeName,
            },
            create: {
                userId,
                eventYear,
                category,
                nomineeId,
                nomineeName,
            },
        });

        revalidatePath("/ballot");
        return { success: true, pick };
    } catch (error) {
        console.error("Failed to submit pick:", error);
        return { error: "Failed to submit pick" };
    }
}

/**
 * Get all picks for a user for a specific year.
 */
export async function getUserPicks(year: number) {
    const session = await auth();
    if (!session?.user?.id) return [];

    const picks = await prisma.ballot.findMany({
        where: {
            userId: session.user.id,
            eventYear: year,
        },
    });

    return picks;
}

/**
 * Get all ballot data (nominees) for a specific year.
 */
export async function getBallotData(year: number) {
    const nominees = await prisma.awardWinner.findMany({
        where: {
            isWinner: false,
            seasonRel: {
                year: year,
                event: { slug: 'oscars' }
            }
        },
        include: {
            seasonRel: true
        },
        orderBy: {
            prizeName: 'asc'
        }
    });

    // Group by category
    const categories = nominees.reduce((acc, nominee) => {
        if (!acc[nominee.prizeName]) {
            acc[nominee.prizeName] = [];
        }
        acc[nominee.prizeName].push({
            id: nominee.id,
            movieId: nominee.movieId,
            movieTitle: nominee.movieTitle,
            personName: nominee.personName,
            posterPath: nominee.posterPath,
        });
        return acc;
    }, {} as Record<string, Array<{
        id: string;
        movieId: number;
        movieTitle: string;
        personName: string | null;
        posterPath: string | null;
    }>>);

    return categories;
}
