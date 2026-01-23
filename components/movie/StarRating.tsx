'use client';

import React, { useState, useEffect } from 'react';
import { Star, StarHalf } from 'lucide-react';
import { saveRating, deleteRating } from '@/app/actions/ratings';
import { useRouter } from 'next/navigation';

interface StarRatingProps {
    movieId: number;
    initialRating: number | null;
}

export default function StarRating({ movieId, initialRating }: StarRatingProps) {
    const [rating, setRating] = useState<number | null>(initialRating);
    const [hover, setHover] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setRating(initialRating);
    }, [initialRating]);

    const handleRate = async (value: number) => {
        if (isSubmitting) return;

        // If clicking the same rating, toggle it off (delete)
        if (rating === value) {
            setIsSubmitting(true);
            const res = await deleteRating(movieId);
            if (res.success) {
                setRating(null);
            } else if (res.error === "Unauthorized") {
                router.push(`/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
            }
            setIsSubmitting(false);
            return;
        }

        setIsSubmitting(true);
        const res = await saveRating(movieId, value);
        if (res.success) {
            setRating(value);
        } else if (res.error === "Unauthorized") {
            router.push(`/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
        }
        setIsSubmitting(false);
    };

    const renderStar = (index: number) => {
        const fullStarValue = index + 1;
        const halfStarValue = index + 0.5;

        const isFullActive = (hover || rating || 0) >= fullStarValue;
        const isHalfActive = (hover || rating || 0) >= halfStarValue;

        return (
            <div
                key={index}
                className="relative cursor-pointer group"
                onMouseLeave={() => setHover(null)}
            >
                {/* Half Star Hitbox */}
                <div
                    className="absolute inset-y-0 left-0 w-1/2 z-10"
                    onMouseEnter={() => setHover(halfStarValue)}
                    onClick={() => handleRate(halfStarValue)}
                />
                {/* Full Star Hitbox */}
                <div
                    className="absolute inset-y-0 right-0 w-1/2 z-10"
                    onMouseEnter={() => setHover(fullStarValue)}
                    onClick={() => handleRate(fullStarValue)}
                />

                <div className="flex">
                    {isFullActive ? (
                        <Star className="w-6 h-6 fill-[#ff8000] text-[#ff8000] transition-colors" />
                    ) : isHalfActive ? (
                        <div className="relative">
                            <Star className="w-6 h-6 text-[#334455]" />
                            <div className="absolute inset-0 overflow-hidden w-1/2">
                                <Star className="w-6 h-6 fill-[#ff8000] text-[#ff8000]" />
                            </div>
                        </div>
                    ) : (
                        <Star className="w-6 h-6 text-[#334455] hover:text-[#99aabb] transition-colors" />
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className={`flex flex-col gap-2 ${isSubmitting ? 'opacity-50 pointer-events-none' : ''}`}>
            <span className="text-[#556677] uppercase text-[9px] font-bold tracking-[0.2em]">Your Rating</span>
            <div className="flex gap-1">
                {[...Array(5)].map((_, i) => renderStar(i))}
                {rating !== null && (
                    <span className="ml-2 text-[#ff8000] font-bold text-sm tracking-tighter">
                        {rating.toFixed(1)}
                    </span>
                )}
            </div>
        </div>
    );
}
