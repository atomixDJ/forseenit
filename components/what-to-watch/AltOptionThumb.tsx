"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { getTMDBImage } from "@/lib/tmdb";

interface AltOptionThumbProps {
    id: number;
    title: string;
    posterPath: string | null;
    reasons: string[];
    onSelect: () => void;
}

/**
 * Alt movie thumbnail with WCAG 1.4.13 compliant tooltip.
 * Tooltip is: dismissible (Esc), hoverable (stays when pointer moves to it), persistent.
 */
export default function AltOptionThumb({
    id,
    title,
    posterPath,
    reasons,
    onSelect
}: AltOptionThumbProps) {
    const [showTooltip, setShowTooltip] = useState(false);
    const tooltipTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Clear any pending timeout on unmount
    useEffect(() => {
        return () => {
            if (tooltipTimeoutRef.current) {
                clearTimeout(tooltipTimeoutRef.current);
            }
        };
    }, []);

    const handleMouseEnter = () => {
        if (tooltipTimeoutRef.current) {
            clearTimeout(tooltipTimeoutRef.current);
            tooltipTimeoutRef.current = null;
        }
        setShowTooltip(true);
    };

    const handleMouseLeave = () => {
        // Delay hiding to allow pointer to move to tooltip (hoverable requirement)
        tooltipTimeoutRef.current = setTimeout(() => {
            setShowTooltip(false);
        }, 150);
    };

    const handleFocus = () => {
        setShowTooltip(true);
    };

    const handleBlur = () => {
        setShowTooltip(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        // Dismissible: Esc closes tooltip
        if (e.key === "Escape" && showTooltip) {
            e.stopPropagation(); // Don't close parent modal
            setShowTooltip(false);
        }
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect();
        }
    };

    const tooltipId = `alt-tooltip-${id}`;

    return (
        <div
            ref={containerRef}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button
                type="button"
                onClick={onSelect}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                aria-describedby={showTooltip ? tooltipId : undefined}
                className="relative w-20 h-28 rounded-lg overflow-hidden border-2 border-transparent 
                           hover:border-amber-400 focus:border-amber-400 focus:outline-none
                           transition-all group"
            >
                {posterPath ? (
                    <Image
                        src={getTMDBImage(posterPath, "w185")}
                        alt={title}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-[#1b2228] flex items-center justify-center">
                        <span className="text-white/50 text-xs text-center px-1">{title}</span>
                    </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 
                                group-focus:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-xs font-medium text-white">Pick</span>
                </div>
            </button>

            {/* WCAG 1.4.13 compliant tooltip */}
            {showTooltip && reasons.length > 0 && (
                <div
                    id={tooltipId}
                    role="tooltip"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 
                               w-48 p-3 bg-[#1b2228] border border-white/20 rounded-lg shadow-xl"
                >
                    <p className="text-white font-medium text-sm mb-2">{title}</p>
                    <ul className="space-y-1">
                        {reasons.slice(0, 3).map((reason, i) => (
                            <li key={i} className="text-[#99aabb] text-xs flex items-start gap-1.5">
                                <span className="text-amber-400 mt-0.5">•</span>
                                {reason}
                            </li>
                        ))}
                    </ul>
                    {/* Arrow */}
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 
                                    bg-[#1b2228] border-r border-b border-white/20 rotate-45" />
                </div>
            )}
        </div>
    );
}
