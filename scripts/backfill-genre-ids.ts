/**
 * Backfill Movie.genreIds from TMDb
 * 
 * For each movie in the database where genreIds is null or empty:
 * 1. Fetch movie details from TMDb by tmdbId
 * 2. Extract genre_ids and store as comma-separated string
 */

import { prisma } from '../lib/prisma';
import fs from 'fs';
import path from 'path';

// Load environment variables from .env.local
function loadEnv() {
    const envPath = path.resolve(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, 'utf8');
        content.split('\n').forEach(line => {
            const [key, ...valueParts] = line.split('=');
            if (key && valueParts.length > 0) {
                let value = valueParts.join('=').trim();
                if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
                if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
                process.env[key.trim()] = value;
            }
        });
    }
}
loadEnv();

const TMDB_API_KEY = process.env.TMDB_API_KEY;

async function fetchGenreIds(tmdbId: number): Promise<string | null> {
    if (!TMDB_API_KEY) {
        console.error("TMDB_API_KEY not set");
        return null;
    }

    try {
        const url = `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${TMDB_API_KEY}`;
        const res = await fetch(url);
        if (!res.ok) {
            console.warn(`  TMDb API error for ${tmdbId}: ${res.status}`);
            return null;
        }
        const data = await res.json();

        // Extract genre IDs from the response
        const genreIds = data.genres?.map((g: any) => g.id) || [];
        return genreIds.length > 0 ? genreIds.join(',') : null;
    } catch (err) {
        console.warn(`  Error fetching ${tmdbId}:`, err);
        return null;
    }
}

async function backfillGenreIds() {
    console.log('=== Backfill Movie.genreIds from TMDb ===\n');

    // Get all movies with missing genreIds
    const movies = await prisma.movie.findMany({
        where: {
            OR: [
                { genreIds: null },
                { genreIds: '' }
            ]
        },
        select: { tmdbId: true, title: true }
    });

    console.log(`Found ${movies.length} movies with missing genreIds.\n`);

    if (movies.length === 0) {
        console.log('✅ All movies already have genreIds.');
        await prisma.$disconnect();
        return;
    }

    let successCount = 0;
    let failCount = 0;

    for (const movie of movies) {
        process.stdout.write(`Fetching ${movie.title} (${movie.tmdbId})... `);

        const genreIds = await fetchGenreIds(movie.tmdbId);

        if (genreIds) {
            await prisma.movie.update({
                where: { tmdbId: movie.tmdbId },
                data: { genreIds }
            });
            console.log(`✓ ${genreIds}`);
            successCount++;
        } else {
            console.log(`✗ No genres found`);
            failCount++;
        }

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log('\n=== Summary ===');
    console.log(`✅ Updated: ${successCount}`);
    console.log(`❌ Failed: ${failCount}`);

    await prisma.$disconnect();
}

backfillGenreIds().catch(console.error);
