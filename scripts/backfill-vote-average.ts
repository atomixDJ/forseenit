#!/usr/bin/env npx ts-node
/**
 * Backfill script to populate voteAverage for existing movies
 * Run with: npx ts-node --compiler-options '{"module":"commonjs"}' scripts/backfill-vote-average.ts
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

async function fetchMovieDetails(tmdbId: number): Promise<{ vote_average: number } | null> {
    try {
        const response = await fetch(
            `${TMDB_BASE_URL}/movie/${tmdbId}?api_key=${TMDB_API_KEY}`
        );
        if (!response.ok) return null;
        return response.json();
    } catch (e) {
        console.error(`Failed to fetch movie ${tmdbId}:`, e);
        return null;
    }
}

async function main() {
    console.log('🎬 Backfilling voteAverage for movies...\n');

    // Get all movies with NULL voteAverage
    const movies = await prisma.movie.findMany({
        where: { voteAverage: null },
        select: { tmdbId: true, title: true }
    });

    console.log(`Found ${movies.length} movies without voteAverage\n`);

    let updated = 0;
    let failed = 0;

    for (const movie of movies) {
        const details = await fetchMovieDetails(movie.tmdbId);

        if (details && details.vote_average !== undefined) {
            await prisma.movie.update({
                where: { tmdbId: movie.tmdbId },
                data: { voteAverage: details.vote_average }
            });
            console.log(`✓ ${movie.title}: ${details.vote_average}`);
            updated++;
        } else {
            console.log(`✗ ${movie.title}: Failed to fetch`);
            failed++;
        }

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log(`\n✅ Done! Updated: ${updated}, Failed: ${failed}`);
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
