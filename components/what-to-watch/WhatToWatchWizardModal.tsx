"use client";

import { useState, useTransition, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sparkles, Users, User, ChevronRight, ChevronLeft, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import SliderInput from "./SliderInput";
import UserSearchInput from "./UserSearchInput";
import { generateWhatToWatch, type WizardSettings } from "@/app/actions/what-to-watch";
import { useRouter } from "next/navigation";

interface WhatToWatchWizardModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    currentUserId: string;
}

type Step = "mode" | "partner" | "pace" | "tone" | "era" | "fairness";

interface UserResult {
    id: string;
    handle: string;
    name: string | null;
    image: string | null;
}

/**
 * Multi-step wizard modal for What to Watch Tonight.
 */
export default function WhatToWatchWizardModal({
    open,
    onOpenChange,
    currentUserId
}: WhatToWatchWizardModalProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    // Step state
    const [step, setStep] = useState<Step>("mode");

    // Settings state
    const [mode, setMode] = useState<"just_you" | "with_someone" | null>(null);
    const [partner, setPartner] = useState<UserResult | null>(null);
    const [pace, setPace] = useState(50);
    const [tone, setTone] = useState(50);
    const [era, setEra] = useState(50);
    const [fairness, setFairness] = useState<-1 | 0 | 1>(0);

    const [error, setError] = useState<string | null>(null);

    // Reset when modal closes
    useEffect(() => {
        if (!open) {
            setStep("mode");
            setMode(null);
            setPartner(null);
            setPace(50);
            setTone(50);
            setEra(50);
            setFairness(0);
            setError(null);
        }
    }, [open]);

    const getSteps = (): Step[] => {
        if (mode === "with_someone") {
            return ["mode", "partner", "pace", "tone", "era", "fairness"];
        }
        return ["mode", "pace", "tone", "era"];
    };

    const steps = getSteps();
    const currentStepIndex = steps.indexOf(step);
    const isFirstStep = currentStepIndex === 0;
    const isLastStep = currentStepIndex === steps.length - 1;

    const handleNext = () => {
        if (step === "mode" && !mode) return;
        if (step === "partner" && !partner) return;

        const nextIndex = currentStepIndex + 1;
        if (nextIndex < steps.length) {
            setStep(steps[nextIndex]);
        }
    };

    const handleBack = () => {
        if (currentStepIndex > 0) {
            setStep(steps[currentStepIndex - 1]);
        }
    };

    const handleGenerate = () => {
        if (!mode) return;

        const settings: WizardSettings = {
            mode,
            partnerId: partner?.id,
            pace,
            tone,
            era,
            fairness: mode === "with_someone" ? fairness : undefined
        };

        startTransition(async () => {
            const result = await generateWhatToWatch(settings);
            if ("error" in result) {
                setError(result.error);
            } else {
                onOpenChange(false);
                router.refresh();
            }
        });
    };

    const canProceed = () => {
        if (step === "mode") return mode !== null;
        if (step === "partner") return partner !== null;
        return true;
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-[#14181c] border-white/10 max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-amber-400" />
                        What to Watch Tonight
                    </DialogTitle>
                </DialogHeader>

                {/* Progress indicator */}
                <div className="flex gap-1 mb-6">
                    {steps.map((s, i) => (
                        <div
                            key={s}
                            className={cn(
                                "h-1 flex-1 rounded-full transition-colors",
                                i <= currentStepIndex ? "bg-amber-400" : "bg-white/10"
                            )}
                        />
                    ))}
                </div>

                {/* Step content */}
                <div className="min-h-[200px]">
                    {step === "mode" && (
                        <div className="space-y-4">
                            <p className="text-[#99aabb] text-sm">Who&apos;s watching tonight?</p>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setMode("just_you")}
                                    className={cn(
                                        "p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2",
                                        mode === "just_you"
                                            ? "border-amber-400 bg-amber-400/10"
                                            : "border-white/10 hover:border-white/20"
                                    )}
                                >
                                    <User className="w-8 h-8 text-white" />
                                    <span className="text-white font-medium">Just Me</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setMode("with_someone")}
                                    className={cn(
                                        "p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2",
                                        mode === "with_someone"
                                            ? "border-amber-400 bg-amber-400/10"
                                            : "border-white/10 hover:border-white/20"
                                    )}
                                >
                                    <Users className="w-8 h-8 text-white" />
                                    <span className="text-white font-medium">With Someone</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {step === "partner" && (
                        <div className="space-y-4">
                            <p className="text-[#99aabb] text-sm">Choose your movie buddy</p>
                            <UserSearchInput
                                value={partner}
                                onChange={setPartner}
                                placeholder="Search for a user..."
                                excludeUserId={currentUserId}
                            />
                        </div>
                    )}

                    {step === "pace" && (
                        <div className="space-y-4">
                            <p className="text-[#99aabb] text-sm">What kind of pace?</p>
                            <SliderInput
                                value={pace}
                                onChange={setPace}
                                leftLabel="Slow & Thoughtful"
                                rightLabel="Fast & Exciting"
                            />
                            <p className="text-center text-white/50 text-xs">
                                {pace < 40 ? "🎭 More drama and emotion" : pace > 60 ? "🎬 More action and thrills" : "⚖️ A nice balance"}
                            </p>
                        </div>
                    )}

                    {step === "tone" && (
                        <div className="space-y-4">
                            <p className="text-[#99aabb] text-sm">What kind of tone?</p>
                            <SliderInput
                                value={tone}
                                onChange={setTone}
                                leftLabel="Dark & Serious"
                                rightLabel="Light & Funny"
                            />
                            <p className="text-center text-white/50 text-xs">
                                {tone < 40 ? "🌑 Gripping and intense" : tone > 60 ? "😄 Fun and lighthearted" : "🎭 A mix of both"}
                            </p>
                        </div>
                    )}

                    {step === "era" && (
                        <div className="space-y-4">
                            <p className="text-[#99aabb] text-sm">What era of film?</p>
                            <SliderInput
                                value={era}
                                onChange={setEra}
                                leftLabel="Classic Films"
                                rightLabel="Latest Releases"
                            />
                            <p className="text-center text-white/50 text-xs">
                                {era < 40 ? "🎬 Timeless cinema" : era > 60 ? "🆕 Fresh and new" : "📽️ Any time period"}
                            </p>
                        </div>
                    )}

                    {step === "fairness" && (
                        <div className="space-y-4">
                            <p className="text-[#99aabb] text-sm">
                                How should we balance between you and {partner?.name || partner?.handle}?
                            </p>
                            <div className="flex flex-col gap-2">
                                {([
                                    { value: -1, label: "Favor my taste", emoji: "👤" },
                                    { value: 0, label: "Make it fair", emoji: "⚖️" },
                                    { value: 1, label: "Favor their taste", emoji: "👥" }
                                ] as const).map((option) => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => setFairness(option.value)}
                                        className={cn(
                                            "p-3 rounded-lg border transition-all flex items-center gap-3",
                                            fairness === option.value
                                                ? "border-amber-400 bg-amber-400/10"
                                                : "border-white/10 hover:border-white/20"
                                        )}
                                    >
                                        <span className="text-xl">{option.emoji}</span>
                                        <span className="text-white font-medium">{option.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Error display */}
                {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                        {error}
                    </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between pt-4 border-t border-white/10">
                    <button
                        type="button"
                        onClick={handleBack}
                        disabled={isFirstStep}
                        className={cn(
                            "px-4 py-2 rounded-lg flex items-center gap-2 transition-colors",
                            isFirstStep
                                ? "text-white/30 cursor-not-allowed"
                                : "text-white hover:bg-white/10"
                        )}
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Back
                    </button>

                    {isLastStep ? (
                        <button
                            type="button"
                            onClick={handleGenerate}
                            disabled={isPending}
                            className="px-6 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-lg 
                                       flex items-center gap-2 transition-colors disabled:opacity-50"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Finding...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-4 h-4" />
                                    Generate
                                </>
                            )}
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={handleNext}
                            disabled={!canProceed()}
                            className={cn(
                                "px-4 py-2 rounded-lg flex items-center gap-2 transition-colors",
                                canProceed()
                                    ? "bg-white/10 text-white hover:bg-white/20"
                                    : "text-white/30 cursor-not-allowed"
                            )}
                        >
                            Next
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
