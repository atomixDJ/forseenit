"use client";

import { useState } from "react";
import { Plus, Check, Loader2, Trophy } from "lucide-react";
import { addToTopTen, removeFromTopTen } from "@/app/actions/top-ten";
import { useRouter } from "next/navigation";

interface AddToTopTenButtonProps {
    tmdbId: number;
    initialIsAdded: boolean;
    isFull: boolean;
}

export default function AddToTopTenButton({ tmdbId, initialIsAdded, isFull }: AddToTopTenButtonProps) {
    const [isAdded, setIsAdded] = useState(initialIsAdded);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleToggle = async () => {
        setIsLoading(true);

        if (isAdded) {
            const result = await removeFromTopTen(tmdbId);
            if (result.success) {
                setIsAdded(false);
                router.refresh();
            } else {
                alert(result.error);
            }
        } else {
            if (isFull) {
                alert("Your Top Ten is full! Remove a movie first.");
                setIsLoading(false);
                return;
            }
            const result = await addToTopTen(tmdbId);
            if (result.success) {
                setIsAdded(true);
                router.refresh();
            } else {
                alert(result.error);
            }
        }

        setIsLoading(false);
    };

    return (
        <button
            onClick={handleToggle}
            disabled={isLoading || (!isAdded && isFull)}
            className={`
                w-full flex items-center justify-center gap-2 py-3 rounded-[4px] font-bold uppercase text-xs tracking-widest transition-all
                ${isAdded
                    ? "bg-[#d4af37] text-black hover:bg-[#b5952f]" // Gold for Top Ten
                    : "bg-[#2c343c] text-white hover:bg-[#39444d]"}
                ${!isAdded && isFull ? "opacity-50 cursor-not-allowed" : ""}
            `}
        >
            {isLoading ? (
                <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>{isAdded ? "Removing..." : "Saving..."}</span>
                </>
            ) : (
                <>
                    {isAdded ? <Check className="h-4 w-4" /> : <Trophy className="h-4 w-4" />}
                    <span>{isAdded ? "In Top 10" : "Top 10"}</span>
                </>
            )}
        </button>
    );
}
