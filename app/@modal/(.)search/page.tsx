"use client";

import { useRouter } from "next/navigation";
import { useEffect, useCallback, useRef } from "react";
import { X } from "lucide-react";
import SearchModalContent from "@/components/search/SearchModalContent";

export default function SearchModalInterceptor() {
    const router = useRouter();
    const overlayRef = useRef<HTMLDivElement>(null);

    const closeModal = useCallback(() => {
        // Use router.back() first to go back in history, revealing the page beneath
        router.back();
    }, [router]);

    // ESC key handler
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                closeModal();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [closeModal]);

    // Lock body scroll
    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    // Click outside to close - check if click is directly on the overlay
    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === overlayRef.current) {
            e.preventDefault();
            e.stopPropagation();
            closeModal();
        }
    };

    // Stop propagation on inner modal to prevent closing when clicking inside
    const handleModalClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div
            ref={overlayRef}
            onClick={handleOverlayClick}
            className="fixed inset-0 z-[100] flex items-start justify-center pt-20 bg-black/80 backdrop-blur-sm"
        >
            <div
                onClick={handleModalClick}
                className="relative w-full max-w-3xl mx-4 bg-[#0d1117] border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[80vh] flex flex-col"
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                    <h2 className="section-header !border-b-0 !pb-0 !mb-0">
                        SEARCH FILMS
                    </h2>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            closeModal();
                        }}
                        className="p-2 rounded-full hover:bg-white/10 transition-colors"
                        aria-label="Close search"
                    >
                        <X className="w-5 h-5 text-[#99aabb]" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto">
                    <SearchModalContent onMovieSelect={closeModal} />
                </div>
            </div>
        </div>
    );
}
