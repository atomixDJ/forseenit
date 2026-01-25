"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Check } from "lucide-react";

interface OnboardingClientProps {
    callbackUrl: string;
}

export default function OnboardingClient({ callbackUrl }: OnboardingClientProps) {
    const router = useRouter();
    const [isCompleting, setIsCompleting] = useState(false);

    const handleComplete = async () => {
        setIsCompleting(true);
        try {
            const res = await fetch("/api/onboarding/complete", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ callbackUrl }),
            });
            if (res.ok) {
                router.push(callbackUrl);
            }
        } catch (error) {
            console.error("Failed to complete onboarding:", error);
        } finally {
            setIsCompleting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#14181c] flex items-center justify-center px-4">
            <div className="max-w-lg text-center space-y-10">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand/10 border border-brand/30">
                    <Sparkles className="w-8 h-8 text-brand" />
                </div>

                <div className="space-y-4">
                    <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter">
                        Welcome to ForSeenIt
                    </h1>
                    <p className="text-[#99aabb] font-medium text-lg leading-relaxed">
                        Your personalized film discovery experience starts here.
                        We&apos;ll help you find movies you&apos;ll love based on what you&apos;ve seen and your streaming services.
                    </p>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={handleComplete}
                        disabled={isCompleting}
                        className="w-full flex items-center justify-center gap-3 bg-brand text-black px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isCompleting ? (
                            "Setting up..."
                        ) : (
                            <>
                                <Check className="w-5 h-5" />
                                Get Started
                            </>
                        )}
                    </button>

                    <p className="text-[#556677] text-xs">
                        You can customize your preferences anytime in Settings.
                    </p>
                </div>
            </div>
        </div>
    );
}
