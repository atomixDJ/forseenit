/**
 * Verify Seeds Script
 * 
 * Deterministic checks for required seeded data.
 * Focused on what the UI consumes (Oscars + current season).
 * Run: npx tsx scripts/verify-seeds.ts
 */

import { prisma } from '../lib/prisma';

interface Check {
    name: string;
    check: () => Promise<{ passed: boolean; message: string }>;
}

const REQUIRED_CATEGORIES = [
    "Best Picture",
    "Best Director",
    "Best Actor",
    "Best Actress",
    "Best Supporting Actor",
    "Best Supporting Actress"
];

const checks: Check[] = [
    // ==========================================================================
    // Awards Checks (UI-focused: Oscars + 2025_2026 only)
    // ==========================================================================
    {
        name: "Oscars event exists",
        check: async () => {
            const event = await prisma.awardEvent.findUnique({ where: { slug: "oscars" } });
            return {
                passed: !!event,
                message: event ? "Found oscars event" : "MISSING: oscars event not found"
            };
        }
    },
    {
        name: "Oscars 2025_2026 season exists",
        check: async () => {
            const season = await prisma.awardSeason.findFirst({
                where: { season: "2025_2026", event: { slug: "oscars" } }
            });
            return {
                passed: !!season,
                message: season ? "Found 2025_2026 season" : "MISSING: 2025_2026 season not found"
            };
        }
    },
    {
        name: "Best Picture has exactly 10 nominees",
        check: async () => {
            const count = await prisma.awardWinner.count({
                where: {
                    prizeName: "Best Picture",
                    seasonRel: { season: "2025_2026", event: { slug: "oscars" } }
                }
            });
            return {
                passed: count === 10,
                message: count === 10
                    ? "Best Picture: 10 nominees ✓"
                    : `Best Picture: ${count} nominees (expected exactly 10)`
            };
        }
    },
    {
        name: "Required categories present",
        check: async () => {
            const missing: string[] = [];
            for (const cat of REQUIRED_CATEGORIES) {
                const count = await prisma.awardWinner.count({
                    where: {
                        prizeName: cat,
                        seasonRel: { season: "2025_2026", event: { slug: "oscars" } }
                    }
                });
                if (count === 0) missing.push(cat);
            }
            return {
                passed: missing.length === 0,
                message: missing.length === 0
                    ? `All ${REQUIRED_CATEGORIES.length} required categories present`
                    : `MISSING categories: ${missing.join(', ')}`
            };
        }
    },

    // ==========================================================================
    // Collection Lists Checks
    // ==========================================================================
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
        name: "Each system list has exactly 10 items",
        check: async () => {
            const lists = await prisma.movieList.findMany({
                where: { isSystem: true },
                select: { systemKey: true, title: true, _count: { select: { items: true } } }
            });
            const incorrect = lists.filter(l => l._count.items !== 10);
            return {
                passed: incorrect.length === 0,
                message: incorrect.length === 0
                    ? `All ${lists.length} system lists have exactly 10 items`
                    : `Incorrect count: ${incorrect.map(l => `${l.systemKey || l.title}(${l._count.items})`).join(', ')}`
            };
        }
    },

    // ==========================================================================
    // Movie Data Quality (non-blocking, informational)
    // ==========================================================================
    {
        name: "Movies have genreIds (informational)",
        check: async () => {
            const total = await prisma.movie.count();
            const withGenres = await prisma.movie.count({ where: { genreIds: { not: null } } });
            const pct = total > 0 ? Math.round((withGenres / total) * 100) : 0;
            // This is informational, not a hard gate
            return {
                passed: true, // Always pass, just informational
                message: `${withGenres}/${total} movies have genreIds (${pct}%)`
            };
        }
    },

    // ==========================================================================
    // Loader Regression Check (catches changes to getAwardsData)
    // ==========================================================================
    {
        name: "getAwardsData() returns status ok",
        check: async () => {
            // Import from shared lib (no Next runtime dependencies)
            const { getAwardsData } = await import('../lib/awards');
            const result = await getAwardsData();
            return {
                passed: result.status === "ok" && result.seasons.length >= 1,
                message: result.status === "ok"
                    ? `Loader returns ok with ${result.seasons.length} season(s)`
                    : `Loader returns status "${result.status}" (expected "ok")`
            };
        }
    }
];

async function main() {
    console.log('\n=== SEED VERIFICATION ===\n');

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
        console.log('VERIFICATION FAILED. Run seed scripts to fix:\n');
        console.log('  npx tsx scripts/seed-awards.ts');
        console.log('  npx tsx scripts/seed-community-lists.ts\n');
        process.exit(1);
    }

    console.log('All checks passed!\n');
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
