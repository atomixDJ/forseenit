import { redirect } from 'next/navigation';
import {
    getClerkUserId,
    requireAppUserIdPage,
    isOnboardingComplete,
    validateCallbackUrl
} from '@/lib/clerk-auth-helpers';

interface PostLoginPageProps {
    searchParams?: Promise<{ callbackUrl?: string }>;
}

export default async function PostLoginPage(props: PostLoginPageProps) {
    const sp = await props.searchParams;
    const callbackUrl = validateCallbackUrl(sp?.callbackUrl);

    // If not authed, redirect to login (don't create empty users)
    const clerkUserId = await getClerkUserId();
    if (!clerkUserId) {
        redirect(`/login?redirect_url=${encodeURIComponent('/post-login?callbackUrl=' + callbackUrl)}`);
    }

    // Get or create internal user + bootstrap defaults
    const userId = await requireAppUserIdPage();

    // Check onboarding status
    const completed = await isOnboardingComplete(userId);

    if (!completed) {
        redirect(`/onboarding?callbackUrl=${encodeURIComponent(callbackUrl)}`);
    }

    redirect(callbackUrl);
}
