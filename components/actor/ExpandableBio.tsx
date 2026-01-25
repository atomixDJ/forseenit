"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ExpandableBioProps {
    bio: string;
    maxLength?: number;
}

export default function ExpandableBio({ bio, maxLength = 300 }: ExpandableBioProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    if (!bio) return <p className="text-[#99aabb] leading-relaxed font-medium">No biography available for this person.</p>;

    const shouldTruncate = bio.length > maxLength;
    const displayedText = isExpanded ? bio : bio.slice(0, maxLength);

    return (
        <div className="space-y-4">
            <p className="text-[#99aabb] leading-relaxed font-medium whitespace-pre-wrap">
                {displayedText}
                {!isExpanded && shouldTruncate && "..."}
            </p>
            {shouldTruncate && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-1.5 text-white hover:text-brand transition-colors text-[10px] font-black uppercase tracking-[0.2em]"
                >
                    {isExpanded ? (
                        <>
                            Show Less <ChevronUp className="h-3 w-3" />
                        </>
                    ) : (
                        <>
                            Show More <ChevronDown className="h-3 w-3" />
                        </>
                    )}
                </button>
            )}
        </div>
    );
}
