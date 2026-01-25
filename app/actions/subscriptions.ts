"use server";

import { requireAppUserIdAction } from "@/lib/clerk-auth-helpers";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function toggleSubscription(providerId: number, name: string, logoPath: string | null) {
    const authResult = await requireAppUserIdAction();
    if (!authResult.ok) return { error: "Unauthorized" };

    const userId = authResult.userId;

    const existing = await prisma.streamingSubscription.findUnique({
        where: {
            userId_providerId: { userId, providerId }
        }
    });

    if (existing) {
        await prisma.streamingSubscription.delete({
            where: { id: existing.id }
        });
        revalidatePath("/profile");
        return { active: false };
    } else {
        await prisma.streamingSubscription.create({
            data: {
                userId,
                providerId,
                name,
                logoPath
            }
        });
        revalidatePath("/profile");
        return { active: true };
    }
}

export async function getUserSubscriptions() {
    const authResult = await requireAppUserIdAction();
    if (!authResult.ok) return [];

    return prisma.streamingSubscription.findMany({
        where: { userId: authResult.userId }
    });
}
