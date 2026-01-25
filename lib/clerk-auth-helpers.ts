import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';

// ─────────────────────────────────────────────────────────────────
// Low-level: Get Clerk user ID
// ─────────────────────────────────────────────────────────────────
export async function getClerkUserId(): Promise<string | null> {
    const { userId } = await auth();
    return userId;
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
// ─────────────────────────────────────────────────────────────────
async function ensureAppUserFromClerk(clerkUserId: string) {
    let user = await prisma.user.findUnique({ where: { clerkId: clerkUserId } });

    if (user) {
        // Update lastLoginAt every login
        await prisma.user.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() },
        });
        // Safety net: ensure defaults exist (idempotent)
        await ensureUserDefaults(user.id);
        return user;
    }

    // v1: Create new user per clerkId (no email linking)
    user = await prisma.user.create({
        data: {
            clerkId: clerkUserId,
            lastLoginAt: new Date(),
        },
    });

    // Bootstrap defaults for new user
    await ensureUserDefaults(user.id);

    return user;
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
