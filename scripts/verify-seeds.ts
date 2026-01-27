/**
 * Verify Seeds Script
 * 
 * Checks that all required seeded data exists after DB reset recovery.
 * Run: npx tsx scripts/verify-seeds.ts
 */

import { prisma } from '../lib/prisma';

interface Check {
    name: string;
    check: () => Promise<{ passed: boolean; message: string }>;
}

const checks: Check[] = [
    {
        name: "Curated Collections (≥5)",
        check: async () => {
            const count = await prisma.movieList.count({ where: { isSystem: true, isPublic: true } });
            return {
                passed: count >= 5,
                message: `Found ${count} system/public lists (expected ≥5)`
            };
        }
    },
    {
        name: "Each collection has 10 items",
        check: async () => {
            const lists = await prisma.movieList.findMany({
                where: { isSystem: true },
                select: { title: true, _count: { select: { items: true } } }
            });
            const incomplete = lists.filter(l => l._count.items < 10);
            return {
                passed: incomplete.length === 0,
                message: incomplete.length === 0
                    ? `All ${lists.length} collections have ≥10 items`
                    : `Incomplete: ${incomplete.map(l => `${l.title}(${l._count.items})`).join(', ')}`
            };
        }
    },
    {
        name: "Movies have genreIds",
        check: async () => {
            const total = await prisma.movie.count();
            const withGenres = await prisma.movie.count({ where: { genreIds: { not: null } } });
            const pct = total > 0 ? Math.round((withGenres / total) * 100) : 0;

            // Get list of missing movies for targeted backfill
            let missing: { tmdbId: number; title: string }[] = [];
            if (pct < 100) {
                missing = await prisma.movie.findMany({
                    where: { OR: [{ genreIds: null }, { genreIds: '' }] },
                    select: { tmdbId: true, title: true },
                    take: 10 // Limit output for readability
                });
            }

            let message = `${withGenres}/${total} movies have genreIds (${pct}%)`;
            if (missing.length > 0) {
                message += `\n   Missing: ${missing.map(m => `${m.title}(${m.tmdbId})`).join(', ')}`;
                if ((total - withGenres) > 10) {
                    message += ` ... and ${(total - withGenres) - 10} more`;
                }
            }

            return { passed: pct >= 90, message };
        }
    },
    {
        name: "Award events exist",
        check: async () => {
            const count = await prisma.awardEvent.count();
            return {
                passed: count > 0,
                message: `Found ${count} award events`
            };
        }
    }
];

async function main() {
    console.log('\n=== Seed Verification ===\n');

    let passed = 0;
    let failed = 0;

    for (const check of checks) {
        const result = await check.check();
        const icon = result.passed ? '✅' : '❌';
        console.log(`${icon} ${check.name}`);
        console.log(`   ${result.message}`);

        if (result.passed) passed++;
        else failed++;
    }

    console.log('\n-------------------------');
    console.log(`Results: ${passed} passed, ${failed} failed\n`);

    await prisma.$disconnect();

    if (failed > 0) {
        process.exit(1);
    }
}

main().catch(console.error);
