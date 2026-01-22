"use client";

import Image from "next/image";
import { Movie, getTMDBImage } from "@/lib/tmdb";
import { motion } from "framer-motion";

interface HeroBackdropProps {
    movie: Movie;
}

export default function HeroBackdrop({ movie }: HeroBackdropProps) {
    return (
        <div className="relative h-[55vh] w-full overflow-hidden bg-[#14181c]">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="absolute inset-0"
            >
                <Image
                    src={getTMDBImage(movie.backdrop_path, 'original')}
                    alt={movie.title}
                    fill
                    priority
                    className="object-cover opacity-60"
                />

                {/* Lettersboxd Cinematic Fades */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#14181c] via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#14181c] via-transparent to-[#14181c]/20" />
                <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]" />
            </motion.div>
        </div>
    );
}
