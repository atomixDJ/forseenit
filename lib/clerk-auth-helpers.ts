import { auth, clerkClient } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';

// ─────────────────────────────────────────────────────────────────
// Handle generation helpers
// ─────────────────────────────────────────────────────────────────
function normalizeHandle(input: string): string {
    return input
        .toLowerCase()
        .replace(/[^a-z0-9-_]/g, '')
        .slice(0, 30);
}

function generateFallbackHandle(): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let suffix = '';
    for (let i = 0; i < 5; i++) {
        suffix += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `user-${suffix}`;
}

async function getUniqueHandle(baseHandle: string): Promise<string> {
    // Try base handle
    const existing = await prisma.user.findUnique({
        where: { handle: baseHandle },
        select: { id: true },
    });
    if (!existing) return baseHandle;

    // Try with numeric suffix (deterministic)
    for (let i = 2; i <= 100; i++) {
        const candidate = `${baseHandle}-${i}`;
        const check = await prisma.user.findUnique({
            where: { handle: candidate },
            select: { id: true },
        });
        if (!check) return candidate;
    }

    // Fallback with random (very unlikely)
    return generateFallbackHandle();
}

// Helper to get handle from Clerk username
async function getHandleFromClerk(clerkUserId: string): Promise<string | null> {
    try {
        const clerk = await clerkClient();
        const clerkUser = await clerk.users.getUser(clerkUserId);

        if (clerkUser.username) {
            const normalized = normalizeHandle(clerkUser.username);
            if (normalized.length >= 3) {
                return normalized;
            }
        }
    } catch (err) {
        console.error(`Failed to fetch Clerk user ${clerkUserId}:`, err);
    }
    return null;
}

// ─────────────────────────────────────────────────────────────────
// Low-level: Get Clerk user ID
// ─────────────────────────────────────────────────────────────────
export async function getClerkUserId(): Promise<string | null> {
    const { userId } = await auth();
    return userId;
}

// ─────────────────────────────────────────────────────────────────
// Get app user ID (returns null if not authenticated, no redirect)
// ─────────────────────────────────────────────────────────────────
export async function getAppUserId(): Promise<string | null> {
    const clerkUserId = await getClerkUserId();
    if (!clerkUserId) return null;

    const user = await prisma.user.findUnique({
        where: { clerkId: clerkUserId },
        select: { id: true },
    });
    return user?.id ?? null;
}

// ─────────────────────────────────────────────────────────────────
// For SERVER ACTIONS: Typed result (no throws)
// ─────────────────────────────────────────────────────────────────
export async function requireAppUserIdAction(): Promise<
    { ok: true; userId: string } | { ok: false; code: 'UNAUTHORIZED' }
> {
    const clerkUserId = await getClerkUserId();
    if (!clerkUserId) return { ok: false, code: 'UNAUTHORIZED' };

    const user = await ensureAppUserFromClerk(clerkUserId);
    return { ok: true, userId: user.id };
}

// ─────────────────────────────────────────────────────────────────
// For SERVER COMPONENTS/PAGES: Redirect if not authed
// ─────────────────────────────────────────────────────────────────
export async function requireAppUserIdPage(): Promise<string> {
    const clerkUserId = await getClerkUserId();
    if (!clerkUserId) {
        redirect('/login');
    }

    const user = await ensureAppUserFromClerk(clerkUserId);
    return user.id;
}

// ─────────────────────────────────────────────────────────────────
// Core: Link/create internal User + ALWAYS bootstrap defaults
// Upgrades fallback handles (user-xxxxx) to Clerk username if available
// Syncs avatar image and name from Clerk on every login
// ─────────────────────────────────────────────────────────────────
async function ensureAppUserFromClerk(clerkUserId: string) {
    let user = await prisma.user.findUnique({ where: { clerkId: clerkUserId } });

    if (user) {
        // Fetch fresh Clerk data to sync avatar and potentially upgrade handle
        try {
            const clerk = await clerkClient();
            const clerkUser = await clerk.users.getUser(clerkUserId);

            const updateData: { lastLoginAt: Date; handle?: string; image?: string; name?: string } = {
                lastLoginAt: new Date(),
            };

            // Sync avatar image from Clerk
            if (clerkUser.imageUrl) {
                updateData.image = clerkUser.imageUrl;
            }

            // Sync name from Clerk
            if (clerkUser.firstName || clerkUser.username) {
                updateData.name = clerkUser.firstName || clerkUser.username || undefined;
            }

            // Check if user has a fallback handle that should be upgraded
            const hasFallbackHandle = user.handle.startsWith('user-');
            if (hasFallbackHandle && clerkUser.username) {
                const normalized = normalizeHandle(clerkUser.username);
                if (normalized.length >= 3) {
                    const uniqueHandle = await getUniqueHandleExcludingSelf(normalized, user.id);
                    if (uniqueHandle) {
                        console.log(`[HANDLE UPGRADE] ${user.id}: ${user.handle} → ${uniqueHandle}`);
                        updateData.handle = uniqueHandle;
                    }
                }
            }

            user = await prisma.user.update({
                where: { id: user.id },
                data: updateData,
            });
        } catch (err) {
            // Fallback: just update lastLoginAt if Clerk fetch fails
            console.error('Failed to sync Clerk data:', err);
            await prisma.user.update({
                where: { id: user.id },
                data: { lastLoginAt: new Date() },
            });
        }

        await ensureUserDefaults(user.id);
        return user;
    }

    // NEW USER: Fetch Clerk user to get username and profile info
    let handle: string;
    let name: string | undefined;
    let email: string | undefined;
    let image: string | undefined;

    try {
        const clerk = await clerkClient();
        const clerkUser = await clerk.users.getUser(clerkUserId);

        // Generate handle from Clerk username
        if (clerkUser.username) {
            const normalized = normalizeHandle(clerkUser.username);
            handle = normalized.length >= 3 ? await getUniqueHandle(normalized) : await getUniqueHandle(generateFallbackHandle());
        } else {
            handle = await getUniqueHandle(generateFallbackHandle());
        }

        // Get other profile data
        name = clerkUser.firstName || clerkUser.username || undefined;
        email = clerkUser.emailAddresses?.[0]?.emailAddress;
        image = clerkUser.imageUrl;
    } catch {
        // Fallback if Clerk API fails
        handle = await getUniqueHandle(generateFallbackHandle());
    }

    // Create new user with handle
    user = await prisma.user.create({
        data: {
            clerkId: clerkUserId,
            handle,
            name,
            email,
            image,
            lastLoginAt: new Date(),
        },
    });

    // Bootstrap defaults for new user
    await ensureUserDefaults(user.id);

    return user;
}

// Get unique handle, excluding the current user's own existing handle from collision check
async function getUniqueHandleExcludingSelf(baseHandle: string, currentUserId: string): Promise<string | null> {
    // Check if baseHandle is available (or already belongs to this user)
    const existing = await prisma.user.findUnique({
        where: { handle: baseHandle },
        select: { id: true },
    });
    if (!existing || existing.id === currentUserId) return baseHandle;

    // Try with numeric suffix
    for (let i = 2; i <= 20; i++) {
        const candidate = `${baseHandle}-${i}`;
        const check = await prisma.user.findUnique({
            where: { handle: candidate },
            select: { id: true },
        });
        if (!check || check.id === currentUserId) return candidate;
    }

    return null; // Couldn't find a unique handle
}

// ─────────────────────────────────────────────────────────────────
// Bootstrap: UserSettings + OnboardingState
// ─────────────────────────────────────────────────────────────────
export async function ensureUserDefaults(userId: string) {
    await prisma.$transaction(async (tx) => {
        await tx.userSettings.upsert({
            where: { userId },
            create: { userId },
            update: {},
        });
        await tx.onboardingState.upsert({
            where: { userId },
            create: { userId },
            update: {},
        });
    });
}

// ─────────────────────────────────────────────────────────────────
// Check onboarding status
// ─────────────────────────────────────────────────────────────────
export async function isOnboardingComplete(userId: string): Promise<boolean> {
    const state = await prisma.onboardingState.findUnique({
        where: { userId },
        select: { isCompleted: true },
    });
    return state?.isCompleted ?? false;
}

// ─────────────────────────────────────────────────────────────────
// Validate callbackUrl (reject '//' and non-relative paths)
// ─────────────────────────────────────────────────────────────────
export function validateCallbackUrl(url: string | undefined): string {
    if (!url) return '/';
    if (!url.startsWith('/')) return '/';
    if (url.includes('//')) return '/';
    return url;
}
