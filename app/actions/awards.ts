"use server";

import { getAwardsData as getAwardsDataImpl } from "@/lib/awards";
import type { AwardsDataResult } from "@/lib/awards";

// Wrap in async function for "use server" compatibility
export async function getAwardsData(): Promise<AwardsDataResult> {
    return getAwardsDataImpl();
}
