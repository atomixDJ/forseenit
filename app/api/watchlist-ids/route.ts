import { NextResponse } from "next/server";
import { getAppUserId } from "@/lib/clerk-auth-helpers";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const userId = await getAppUserId();

    if (!userId) {
        return NextResponse.json({ ids: [] });
    }

    try {
        const interactions = await prisma.movieInteraction.findMany({
            where: {
                userId,
                watchlisted: true
            },
            select: { movieId: true }
        });
        const ids = interactions.map(i => i.movieId);
        return NextResponse.json({ ids });
    } catch (e) {
        return NextResponse.json({ ids: [] });
    }
}
