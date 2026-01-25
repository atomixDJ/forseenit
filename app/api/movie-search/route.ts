import { NextRequest, NextResponse } from "next/server";
import { searchMovies } from "@/lib/tmdb";

export async function GET(request: NextRequest) {
    const query = request.nextUrl.searchParams.get("q");

    if (!query || !query.trim()) {
        return NextResponse.json({ results: [] });
    }

    try {
        const data = await searchMovies(query);
        return NextResponse.json(data);
    } catch (error) {
        console.error("Movie search error:", error);
        return NextResponse.json(
            { error: "Failed to search movies", results: [] },
            { status: 500 }
        );
    }
}
