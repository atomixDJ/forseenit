"use client";

import { useState } from "react";
import { Heart, Loader2 } from "lucide-react";
import { toggleReviewFavorite } from "@/app/actions/reviews";
import { useRouter } from "next/navigation";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ReviewLikeButtonProps {
    reviewId: string;
    initialLikeCount: number;
    initialIsLiked: boolean;
}

export default function ReviewLikeButton({
    reviewId,
    initialLikeCount,
    initialIsLiked
}: ReviewLikeButtonProps) {
    const [isLiked, setIsLiked] = useState(initialIsLiked);
    const [likeCount, setLikeCount] = useState(initialLikeCount);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLike = async () => {
        if (isLoading) return;
        setIsLoading(true);

        // Optimistic UI update could go here, but per GPT "correctness first"
        // Let's do a simple state update based on the result
        const result = await toggleReviewFavorite(reviewId);

        if ("error" in result) {
            if (result.error === "Unauthorized") {
                router.push(`/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
            }
        } else {
            setIsLiked(result.favorited);
            setLikeCount(result.likeCount);
        }
        setIsLoading(false);
    };

    return (
        <button
            onClick={handleLike}
            disabled={isLoading}
            className={cn(
                "flex items-center gap-2 text-[9px] font-black uppercase tracking-widest transition-colors group/btn",
                isLiked ? "text-rose-500" : "text-[#556677] hover:text-rose-400"
            )}
        >
            {isLoading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
                <Heart className={cn("w-3.5 h-3.5 transition-all", isLiked && "fill-current scale-110")} />
            )}
            <span>{likeCount} {likeCount === 1 ? "Like" : "Likes"}</span>
        </button>
    );
}
