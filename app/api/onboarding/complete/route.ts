import { NextResponse } from "next/server";
import { requireAppUserIdAction } from "@/lib/clerk-auth-helpers";
import { prisma } from "@/lib/prisma";

export async function POST() {
    const authResult = await requireAppUserIdAction();
    if (!authResult.ok) {
        return NextResponse.json({ ok: false, code: authResult.code }, { status: 401 });
    }

    await prisma.onboardingState.update({
        where: { userId: authResult.userId },
        data: {
            isCompleted: true,
            completedAt: new Date(),
        },
    });

    return NextResponse.json({ ok: true });
}
