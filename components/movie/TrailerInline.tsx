"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

interface TrailerInlineProps {
    trailerKey: string | null;
    posterPath: string;
    title: string;
}

export default function TrailerInline({ trailerKey, posterPath, title }: TrailerInlineProps) {
    const [isOpen, setIsOpen] = useState(false);
    const prefersReducedMotion = useReducedMotion();
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    // ESC key listener
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        if (isOpen) {
            window.addEventListener("keydown", handleEsc);
            // Lock background scroll
            document.body.style.overflow = "hidden";
            // Focus close button for accessibility
            setTimeout(() => closeButtonRef.current?.focus(), 100);
        }
        return () => {
            window.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!trailerKey) {
        return (
            <div className="movie-poster-frame shadow-2xl">
                <Image
                    src={posterPath}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                />
            </div>
        );
    }

    return (
        <>
            {/* Poster Affordance */}
            <div
                className="movie-poster-frame shadow-2xl group cursor-pointer overflow-hidden focus-within:ring-2 focus-within:ring-brand"
                onClick={() => setIsOpen(true)}
                tabIndex={0}
                role="button"
                aria-label={`Play trailer for ${title}`}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setIsOpen(true);
                    }
                }}
            >
                <Image
                    src={posterPath}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                />

                {/* Center Play Button - Scale/Opacity on Hover/Focus */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 rounded-full bg-brand/90 flex items-center justify-center 
                                    opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 
                                    group-focus-within:opacity-100 group-focus-within:scale-100
                                    transition-all duration-300 shadow-xl">
                        <Play className="w-8 h-8 text-white fill-white ml-1" />
                    </div>
                </div>

                {/* Bottom Label - Fade on Hover/Focus */}
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent 
                                opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-[10px] font-black uppercase tracking-[0.2em]">Play Trailer</span>
                </div>
            </div>

            {/* Modal Player */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-[#0a0d0f]/95 backdrop-blur-sm cursor-pointer"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Player Container */}
                        <motion.div
                            className="relative w-full max-w-[1100px] z-[101] shadow-2xl"
                            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        >
                            {/* Close Button */}
                            <button
                                ref={closeButtonRef}
                                onClick={() => setIsOpen(false)}
                                className="absolute -top-12 right-0 text-white/50 hover:text-white transition-colors flex items-center gap-2 group"
                                aria-label="Close trailer"
                            >
                                <span className="text-[10px] font-bold uppercase tracking-widest hidden md:block">Close</span>
                                <X className="w-6 h-6" />
                            </button>

                            {/* 16:9 Aspect Ratio Box */}
                            <div
                                className="relative bg-black w-full shadow-2xl overflow-hidden rounded-[4px]"
                                style={{ aspectRatio: "16 / 9" }}
                            >
                                <iframe
                                    src={`https://www.youtube-nocookie.com/embed/${trailerKey}?autoplay=1&controls=1&rel=0&modestbranding=1`}
                                    title={`${title} Trailer`}
                                    className="absolute inset-0 w-full h-full border-0"
                                    allow="autoplay; encrypted-media; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
