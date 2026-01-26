/**
 * Backfill script: Populate User.handle from Clerk username
 * 
 * For each user where handle IS NULL:
 * 1. Fetch Clerk user via clerkId
 * 2. If Clerk username exists → normalize and use
 * 3. If no username → generate fallback user-xxxxx
 * 4. Handle collisions with suffix
 * 5. FAIL LOUDLY if any user can't get a handle
 */

import { prisma } from '../lib/prisma';
import { clerkClient } from '@clerk/nextjs/server';

// Normalize handle: lowercase, keep only a-z0-9-_
function normalizeHandle(input: string): string {
    return input
        .toLowerCase()
        .replace(/[^a-z0-9-_]/g, '')
        .slice(0, 30); // Max 30 chars
}

// Generate random fallback handle
function generateFallbackHandle(): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let suffix = '';
    for (let i = 0; i < 5; i++) {
        suffix += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `user-${suffix}`;
}

// Check if handle is unique
async function isHandleAvailable(handle: string): Promise<boolean> {
    const existing = await prisma.user.findUnique({
        where: { handle },
        select: { id: true },
    });
    return !existing;
}

// Get unique handle with collision handling
async function getUniqueHandle(baseHandle: string, maxRetries = 10): Promise<string | null> {
    // Try base handle first
    if (await isHandleAvailable(baseHandle)) {
        return baseHandle;
    }

    // Try with numeric suffix
    for (let i = 2; i <= maxRetries; i++) {
        const candidate = `${baseHandle}-${i}`;
        if (await isHandleAvailable(candidate)) {
            return candidate;
        }
    }

    // Try with random suffix
    for (let i = 0; i < 5; i++) {
        const random = Math.random().toString(36).slice(2, 5);
        const candidate = `${baseHandle}-${random}`;
        if (await isHandleAvailable(candidate)) {
            return candidate;
        }
    }

    return null;
}

async function backfillHandles() {
    console.log('=== Handle Backfill Script ===\n');

    // Get all users without handles (empty string means unset)
    const users = await prisma.user.findMany({
        where: { handle: '' },
        select: { id: true, clerkId: true, name: true },
    });

    console.log(`Found ${users.length} users without handles.\n`);

    if (users.length === 0) {
        console.log('✅ All users already have handles.');
        return;
    }

    const failures: { userId: string; reason: string }[] = [];
    const successes: { userId: string; handle: string }[] = [];

    const clerk = await clerkClient();

    for (const user of users) {
        let handle: string | null = null;

        // Try to get Clerk username
        if (user.clerkId) {
            try {
                const clerkUser = await clerk.users.getUser(user.clerkId);
                if (clerkUser.username) {
                    const normalized = normalizeHandle(clerkUser.username);
                    if (normalized.length >= 3) {
                        handle = await getUniqueHandle(normalized);
                    }
                }
            } catch (err) {
                console.log(`⚠️  Could not fetch Clerk user for ${user.id}: ${err}`);
            }
        }

        // Fallback: generate user-xxxxx
        if (!handle) {
            for (let attempt = 0; attempt < 10; attempt++) {
                const fallback = generateFallbackHandle();
                if (await isHandleAvailable(fallback)) {
                    handle = fallback;
                    break;
                }
            }
        }

        if (!handle) {
            failures.push({ userId: user.id, reason: 'Could not generate unique handle after all attempts' });
            continue;
        }

        // Write handle to database
        try {
            await prisma.user.update({
                where: { id: user.id },
                data: { handle },
            });
            successes.push({ userId: user.id, handle });
            console.log(`[OK] ${user.id} → @${handle}`);
        } catch (err) {
            failures.push({ userId: user.id, reason: `DB write failed: ${err}` });
        }
    }

    console.log('\n=== Summary ===');
    console.log(`✅ Success: ${successes.length}`);
    console.log(`❌ Failed: ${failures.length}`);

    if (failures.length > 0) {
        console.log('\n=== Failures ===');
        for (const f of failures) {
            console.log(`[FAIL] ${f.userId}: ${f.reason}`);
        }
        console.log('\n❌ Script failed. Fix issues before proceeding to make handle required.');
        process.exit(1);
    }

    console.log('\n✅ Backfill complete! Safe to proceed to make handle required.');
}

backfillHandles()
    .catch((err) => {
        console.error('Script error:', err);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
