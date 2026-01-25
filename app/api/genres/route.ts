import { NextResponse } from "next/server";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.TMDB_API_KEY;

interface TMDBGenre {
    id: number;
    name: string;
}

interface TMDBGenreResponse {
    genres: TMDBGenre[];
}

export async function GET() {
    if (!API_KEY) {
        console.warn("TMDB_API_KEY is not set");
        return NextResponse.json({ genres: [] });
    }

    try {
        const res = await fetch(
            `${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`,
            {
                next: { revalidate: 86400 }, // Cache for 24 hours
            }
        );

        if (!res.ok) {
            throw new Error(`TMDB Error: ${res.status}`);
        }

        const data: TMDBGenreResponse = await res.json();
        return NextResponse.json({ genres: data.genres });
    } catch (error) {
        console.error("Failed to fetch genres:", error);
        return NextResponse.json({ genres: [] });
    }
}
