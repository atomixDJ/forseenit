import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q") || "";
    const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 50);

    if (!query.trim()) {
        return NextResponse.json({ results: [] });
    }

    try {
        // Search users primarily by handle (case-insensitive), also by name
        const users = await prisma.user.findMany({
            where: {
                OR: [
                    { handle: { contains: query } },
                    { name: { contains: query } },
                ],
            },
            select: {
                id: true,
                handle: true,
                name: true,
                image: true,
            },
            take: limit,
        });

        // Count followers separately
        const results = await Promise.all(
            users.map(async (user) => {
                const followerCount = await prisma.follow.count({
                    where: { followingId: user.id },
                });
                return {
                    id: user.id,
                    handle: user.handle,
                    name: user.name,
                    image: user.image,
                    followerCount,
                };
            })
        );

        // Sort by follower count descending
        results.sort((a, b) => b.followerCount - a.followerCount);

        return NextResponse.json({ results });
    } catch (error) {
        console.error("User search error:", error);
        return NextResponse.json({ results: [], error: "Search failed" }, { status: 500 });
    }
}
