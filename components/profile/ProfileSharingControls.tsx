"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, Share2, Check, Copy } from "lucide-react";

interface ProfileSharingControlsProps {
    handle: string;
}

export default function ProfileSharingControls({ handle }: ProfileSharingControlsProps) {
    const [copied, setCopied] = useState(false);
    const [showFallback, setShowFallback] = useState(false);

    const publicProfileUrl = typeof window !== "undefined"
        ? `${window.location.origin}/u/${handle}`
        : `/u/${handle}`;

    const handleShare = async () => {
        const url = `${window.location.origin}/u/${handle}`;

        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Fallback for browsers without clipboard API
            setShowFallback(true);
        }
    };

    return (
        <div className="flex items-center gap-2">
            {/* View Public Profile */}
            <Link
                href={`/u/${handle}`}
                className="flex items-center gap-2 px-4 py-2.5 rounded-[4px] bg-brand/10 border border-brand/20 text-brand text-[10px] font-bold uppercase tracking-[0.15em] hover:bg-brand/20 transition-all"
            >
                <Eye className="w-3.5 h-3.5" />
                <span>View Public Profile</span>
            </Link>

            {/* Share Profile */}
            <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2.5 rounded-[4px] bg-white/5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-[0.15em] hover:bg-white/10 transition-all"
            >
                {copied ? (
                    <>
                        <Check className="w-3.5 h-3.5 text-brand" />
                        <span>Copied!</span>
                    </>
                ) : (
                    <>
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Share Profile</span>
                    </>
                )}
            </button>

            {/* Fallback Dialog */}
            {showFallback && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={() => setShowFallback(false)}>
                    <div className="bg-[#1b2228] border border-white/10 rounded-lg p-6 max-w-md w-full mx-4" onClick={e => e.stopPropagation()}>
                        <h3 className="text-white font-bold text-lg mb-2">Share your profile</h3>
                        <p className="text-[#99aabb] text-sm mb-4">Copy this link to share your profile:</p>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                readOnly
                                value={publicProfileUrl}
                                className="flex-1 px-3 py-2 bg-[#14181c] border border-white/10 rounded text-white text-sm"
                                onFocus={e => e.target.select()}
                            />
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(publicProfileUrl);
                                    setShowFallback(false);
                                    setCopied(true);
                                    setTimeout(() => setCopied(false), 2000);
                                }}
                                className="px-3 py-2 bg-brand text-black rounded font-bold text-sm"
                            >
                                <Copy className="w-4 h-4" />
                            </button>
                        </div>
                        <button
                            onClick={() => setShowFallback(false)}
                            className="mt-4 text-[#556677] text-sm hover:text-white transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
