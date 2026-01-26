/**
 * Seed Pagination Test Data
 * 
 * Creates 35 test followers for the atomix user to test pagination.
 * Run: npx ts-node scripts/seed-pagination-test.ts
 */

import { prisma } from "../lib/prisma";

async function seedPaginationTestData() {
    const TEST_HANDLE = "atomix";
    const REQUIRED_FOLLOWERS = 35;

    console.log(`Seeding pagination test data for @${TEST_HANDLE}...\n`);

    // Get target user
    const user = await prisma.user.findUnique({
        where: { handle: TEST_HANDLE },
        select: { id: true }
    });

    if (!user) {
        console.error(`❌ User @${TEST_HANDLE} not found. Please create them first.`);
        process.exit(1);
    }

    // Count existing followers
    const existingFollowerCount = await prisma.follow.count({
        where: { followingId: user.id }
    });

    console.log(`Current followers: ${existingFollowerCount}`);

    if (existingFollowerCount >= REQUIRED_FOLLOWERS) {
        console.log(`✓ Already have ${existingFollowerCount} followers (>= ${REQUIRED_FOLLOWERS}). No seeding needed.`);
        await prisma.$disconnect();
        return;
    }

    const usersToCreate = REQUIRED_FOLLOWERS - existingFollowerCount;
    console.log(`Creating ${usersToCreate} test followers...`);

    for (let i = 0; i < usersToCreate; i++) {
        const handle = `pagination-test-${Date.now()}-${i}`;
        const follower = await prisma.user.create({
            data: {
                handle,
                email: `${handle}@test.local`,
            }
        });
        await prisma.follow.create({
            data: {
                followerId: follower.id,
                followingId: user.id,
            }
        });

        if ((i + 1) % 10 === 0) {
            console.log(`  Created ${i + 1}/${usersToCreate}...`);
        }
    }

    const finalCount = await prisma.follow.count({
        where: { followingId: user.id }
    });

    console.log(`\n✓ Done! @${TEST_HANDLE} now has ${finalCount} followers.`);
    console.log(`Run: npx playwright test e2e/pagination.spec.ts`);

    await prisma.$disconnect();
}

seedPaginationTestData().catch(console.error);
