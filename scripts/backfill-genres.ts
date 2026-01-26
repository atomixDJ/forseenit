import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const API_KEY = process.env.TMDB_API_KEY;

async function backfillGenres() {
    console.log("Starting genre backfill...");
    try {
        const movies = await prisma.movie.findMany({
            where: { genreIds: null }
        });

        console.log(`Found ${movies.length} movies without genres.`);

        for (const movie of movies) {
            try {
                const res = await fetch(`https://api.themoviedb.org/3/movie/${movie.tmdbId}?api_key=${API_KEY}`);
                if (!res.ok) throw new Error(`TMDB fetch failed for ${movie.tmdbId}: ${res.status}`);
                const data: any = await res.json();
                const genreIds = data.genres?.map((g: any) => g.id).join(',');

                if (genreIds) {
                    await prisma.movie.update({
                        where: { tmdbId: movie.tmdbId },
                        data: { genreIds }
                    });
                    console.log(`Updated ${movie.title} (${movie.tmdbId}) with genres: ${genreIds}`);
                }
            } catch (e) {
                console.error(`Failed to fetch genres for ${movie.title} (${movie.tmdbId}):`, e);
            }
        }

        console.log("Backfill complete.");
    } catch (err) {
        console.error("Backfill failed:", err);
    } finally {
        await prisma.$disconnect();
    }
}

backfillGenres();
