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
                className="group relative w-full p-6 rounded-2xl 
                           bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20
                           border border-amber-500/30 
                           hover:from-amber-500/30 hover:via-orange-500/30 hover:to-amber-500/30
                           hover:border-amber-500/50
                           transition-all duration-500"
            >
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-amber-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Pulse animation ring */}
                <div className="absolute inset-0 rounded-2xl">
                    <div className="absolute inset-0 rounded-2xl border-2 border-amber-400/50 animate-pulse" />
                </div>

                {/* Content */}
                <div className="relative flex flex-col items-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-amber-500/20 flex items-center justify-center
                                    group-hover:bg-amber-500/30 transition-colors">
                        <Sparkles className="w-7 h-7 text-amber-400" />
                    </div>
                    <span className="text-lg font-bold text-white">What to Watch Tonight?</span>
                    <span className="text-sm text-amber-300/80">
                        Let AI find your perfect movie
                    </span>
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
