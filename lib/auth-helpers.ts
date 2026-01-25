"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { unauthorized } from "next/navigation";

/**
 * Get the current user's ID from the session.
 * Returns null if not authenticated.
 */
export async function getUserId(): Promise<string | null> {
    const session = await auth();
    return session?.user?.id ?? null;
}

/**
 * Require a user ID for server components.
 * Calls Next.js unauthorized() if no session.
 */
export async function requireUserId(): Promise<string> {
    const userId = await getUserId();
    if (!userId) unauthorized();
    return userId;
}

/**
 * Require a user ID for server actions.
 * Returns a typed result instead of throwing.
 */
export async function requireUserIdAction(): Promise<
    { ok: true; userId: string } | { ok: false; code: "UNAUTHORIZED" }
> {
    const userId = await getUserId();
    if (!userId) return { ok: false, code: "UNAUTHORIZED" };
    return { ok: true, userId };
}

/**
 * Idempotent bootstrap of user defaults.
 * Uses interactive transaction for SQLite race safety.
 * Should ONLY be called from /post-login, /onboarding, /settings.
 */
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

/**
 * Check if user has completed onboarding.
 */
export async function isOnboardingComplete(userId: string): Promise<boolean> {
    const state = await prisma.onboardingState.findUnique({
        where: { userId },
        select: { isCompleted: true },
    });
    return state?.isCompleted ?? false;
}
