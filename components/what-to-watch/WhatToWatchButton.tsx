"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import WhatToWatchWizardModal from "./WhatToWatchWizardModal";

interface WhatToWatchButtonProps {
    currentUserId: string;
}

/**
 * Glowing button that opens the What to Watch wizard.
 */
export default function WhatToWatchButton({ currentUserId }: WhatToWatchButtonProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="group relative p-6 rounded-2xl cursor-pointer
                           bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20
                           border border-amber-500/30 
                           hover:from-amber-500/30 hover:via-orange-500/30 hover:to-amber-500/30
                           hover:border-amber-500/50 hover:scale-105
                           transition-all duration-300 shrink-0"
            >
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-amber-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Pulse animation ring */}
                <div className="absolute inset-0 rounded-2xl">
                    <div className="absolute inset-0 rounded-2xl border-2 border-amber-400/50 animate-pulse" />
                </div>

                {/* Content - text left, icon right */}
                <div className="relative flex items-center gap-6">
                    <div className="text-right">
                        <span className="block text-2xl md:text-3xl font-black text-white italic uppercase tracking-tighter">
                            What to Watch?
                        </span>
                        <span className="text-sm text-amber-300/80 font-medium">
                            Let AI pick for you
                        </span>
                    </div>
                    <div className="w-14 h-14 rounded-full bg-amber-500/20 flex items-center justify-center
                                    group-hover:bg-amber-500/30 transition-colors shrink-0">
                        <Sparkles className="w-7 h-7 text-amber-400" />
                    </div>
                </div>
            </button>

            <WhatToWatchWizardModal
                open={isOpen}
                onOpenChange={setIsOpen}
                currentUserId={currentUserId}
            />
        </>
    );
}
