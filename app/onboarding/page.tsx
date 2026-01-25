import { redirect } from "next/navigation";
import { requireAppUserIdPage, ensureUserDefaults, isOnboardingComplete, validateCallbackUrl } from "@/lib/clerk-auth-helpers";
import OnboardingClient from "./OnboardingClient";

interface OnboardingPageProps {
    searchParams?: Promise<{ callbackUrl?: string }>;
}

export default async function OnboardingPage(props: OnboardingPageProps) {
    const sp = await props.searchParams;
    const callbackUrl = validateCallbackUrl(sp?.callbackUrl);

    const userId = await requireAppUserIdPage();
    await ensureUserDefaults(userId);

    // Check if already completed
    const completed = await isOnboardingComplete(userId);
    if (completed) {
        redirect(callbackUrl);
    }

    return <OnboardingClient callbackUrl={callbackUrl} />;
}
