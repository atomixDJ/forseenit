"use client";

import { useState, useTransition, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sparkles, Users, User, ChevronRight, ChevronLeft, Loader2, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";
import SliderInput from "./SliderInput";
import UserSearchInput from "./UserSearchInput";
import { generateWhatToWatch, type WizardSettings } from "@/app/actions/what-to-watch";
import { getFollowingList } from "@/app/actions/follow";
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
 * Premium, modern UI with glassmorphism and gradient accents.
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
    const [followingUsers, setFollowingUsers] = useState<UserResult[]>([]);

    // Fetch following list on mount
    useEffect(() => {
        getFollowingList().then((users) => {
            setFollowingUsers(users.map(u => ({
                id: u.id,
                handle: u.handle,
                name: u.name,
                image: u.image
            })));
        });
    }, []);

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
            <DialogContent className="bg-gradient-to-br from-[#1a1f25] to-[#0f1318] border-0 max-w-lg p-0 overflow-hidden shadow-2xl shadow-amber-500/10">
                {/* Animated gradient border */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-amber-500/20 via-orange-500/10 to-amber-500/20 animate-pulse opacity-50" />

                {/* Glass overlay */}
                <div className="relative backdrop-blur-xl bg-black/20 p-6">
                    <DialogHeader className="pb-4">
                        <DialogTitle className="text-2xl font-black text-white italic uppercase tracking-tighter flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
                                <Sparkles className="w-5 h-5 text-black" />
                            </div>
                            <span>What to Watch</span>
                        </DialogTitle>
                    </DialogHeader>

                    {/* Progress indicator - glowing dots */}
                    <div className="flex gap-2 mb-8 justify-center">
                        {steps.map((s, i) => (
                            <div
                                key={s}
                                className={cn(
                                    "h-2 rounded-full transition-all duration-500",
                                    i <= currentStepIndex
                                        ? "w-8 bg-gradient-to-r from-amber-400 to-orange-500 shadow-md shadow-amber-400/50"
                                        : "w-2 bg-white/20"
                                )}
                            />
                        ))}
                    </div>

                    {/* Step content */}
                    <div className="min-h-[220px] relative">
                        {step === "mode" && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <p className="text-lg font-bold text-white text-center">Who&apos;s watching tonight?</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setMode("just_you")}
                                        className={cn(
                                            "group p-6 rounded-2xl transition-all duration-300 flex flex-col items-center gap-3 relative overflow-hidden",
                                            mode === "just_you"
                                                ? "bg-gradient-to-br from-amber-500/30 to-orange-500/20 border-2 border-amber-400 shadow-lg shadow-amber-500/20"
                                                : "bg-white/5 border-2 border-white/10 hover:border-white/30 hover:bg-white/10"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300",
                                            mode === "just_you"
                                                ? "bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/30"
                                                : "bg-white/10 group-hover:bg-white/20"
                                        )}>
                                            <User className={cn("w-7 h-7", mode === "just_you" ? "text-black" : "text-white")} />
                                        </div>
                                        <span className="text-white font-black text-sm italic uppercase tracking-tighter">Just Me</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setMode("with_someone")}
                                        className={cn(
                                            "group p-6 rounded-2xl transition-all duration-300 flex flex-col items-center gap-3 relative overflow-hidden",
                                            mode === "with_someone"
                                                ? "bg-gradient-to-br from-amber-500/30 to-orange-500/20 border-2 border-amber-400 shadow-lg shadow-amber-500/20"
                                                : "bg-white/5 border-2 border-white/10 hover:border-white/30 hover:bg-white/10"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300",
                                            mode === "with_someone"
                                                ? "bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/30"
                                                : "bg-white/10 group-hover:bg-white/20"
                                        )}>
                                            <Users className={cn("w-7 h-7", mode === "with_someone" ? "text-black" : "text-white")} />
                                        </div>
                                        <span className="text-white font-black text-sm italic uppercase tracking-tighter">With Someone</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === "partner" && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <p className="text-lg font-bold text-white text-center">Choose your movie buddy</p>
                                <UserSearchInput
                                    value={partner}
                                    onChange={setPartner}
                                    placeholder="Search for a user..."
                                    excludeUserId={currentUserId}
                                    suggestedUsers={followingUsers}
                                />
                            </div>
                        )}

                        {step === "pace" && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <p className="text-lg font-bold text-white text-center">What kind of pace?</p>
                                <SliderInput
                                    value={pace}
                                    onChange={setPace}
                                    leftLabel="Slow & Thoughtful"
                                    rightLabel="Fast & Exciting"
                                />
                                <div className="text-center">
                                    <span className={cn(
                                        "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
                                        pace < 40 ? "bg-purple-500/20 text-purple-300"
                                            : pace > 60 ? "bg-red-500/20 text-red-300"
                                                : "bg-white/10 text-white/70"
                                    )}>
                                        {pace < 40 ? "🎭 More drama and emotion" : pace > 60 ? "🎬 More action and thrills" : "⚖️ A nice balance"}
                                    </span>
                                </div>
                            </div>
                        )}

                        {step === "tone" && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <p className="text-lg font-bold text-white text-center">What kind of tone?</p>
                                <SliderInput
                                    value={tone}
                                    onChange={setTone}
                                    leftLabel="Dark & Serious"
                                    rightLabel="Light & Funny"
                                />
                                <div className="text-center">
                                    <span className={cn(
                                        "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
                                        tone < 40 ? "bg-slate-500/20 text-slate-300"
                                            : tone > 60 ? "bg-yellow-500/20 text-yellow-300"
                                                : "bg-white/10 text-white/70"
                                    )}>
                                        {tone < 40 ? "🌑 Gripping and intense" : tone > 60 ? "😄 Fun and lighthearted" : "🎭 A mix of both"}
                                    </span>
                                </div>
                            </div>
                        )}

                        {step === "era" && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <p className="text-lg font-bold text-white text-center">What era of film?</p>
                                <SliderInput
                                    value={era}
                                    onChange={setEra}
                                    leftLabel="Classic Films"
                                    rightLabel="Latest Releases"
                                />
                                <div className="text-center">
                                    <span className={cn(
                                        "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
                                        era < 40 ? "bg-amber-500/20 text-amber-300"
                                            : era > 60 ? "bg-cyan-500/20 text-cyan-300"
                                                : "bg-white/10 text-white/70"
                                    )}>
                                        {era < 40 ? "🎬 Timeless cinema" : era > 60 ? "🆕 Fresh and new" : "📽️ Any time period"}
                                    </span>
                                </div>
                            </div>
                        )}

                        {step === "fairness" && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <p className="text-lg font-bold text-white text-center">
                                    Balance with {partner?.name || partner?.handle}
                                </p>
                                <div className="flex flex-col gap-3">
                                    {([
                                        { value: -1, label: "Favor my taste", emoji: "👤", color: "from-blue-500/30 to-blue-500/10" },
                                        { value: 0, label: "Make it fair", emoji: "⚖️", color: "from-amber-500/30 to-orange-500/10" },
                                        { value: 1, label: "Favor their taste", emoji: "👥", color: "from-purple-500/30 to-purple-500/10" }
                                    ] as const).map((option) => (
                                        <button
                                            key={option.value}
                                            type="button"
                                            onClick={() => setFairness(option.value)}
                                            className={cn(
                                                "p-4 rounded-xl transition-all duration-300 flex items-center gap-4",
                                                fairness === option.value
                                                    ? `bg-gradient-to-r ${option.color} border-2 border-amber-400 shadow-lg`
                                                    : "bg-white/5 border-2 border-white/10 hover:border-white/30"
                                            )}
                                        >
                                            <span className="text-2xl">{option.emoji}</span>
                                            <span className="text-white font-bold">{option.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Error display */}
                    {error && (
                        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm mb-4 animate-shake">
                            {error}
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="flex justify-between pt-6 mt-4 border-t border-white/5">
                        <button
                            type="button"
                            onClick={handleBack}
                            disabled={isFirstStep}
                            className={cn(
                                "px-4 py-2 rounded-lg flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.2em] transition-all duration-200",
                                isFirstStep
                                    ? "text-white/20 cursor-not-allowed"
                                    : "text-white/50 hover:text-white/80"
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
                                className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 
                                           text-black font-black rounded-xl flex items-center gap-2 transition-all duration-200 
                                           disabled:opacity-50 shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40
                                           hover:scale-105 active:scale-95"
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        <span className="italic tracking-tight">Finding...</span>
                                    </>
                                ) : (
                                    <>
                                        <Wand2 className="w-5 h-5" />
                                        <span className="italic tracking-tight uppercase">Generate</span>
                                    </>
                                )}
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleNext}
                                disabled={!canProceed()}
                                className={cn(
                                    "px-4 py-2 rounded-lg flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.2em] transition-all duration-200",
                                    canProceed()
                                        ? "text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20"
                                        : "text-white/20 cursor-not-allowed"
                                )}
                            >
                                Next
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
