import Link from "next/link";
import Image from "next/image";
import { getTMDBImage } from "@/lib/tmdb";
import { Star } from "lucide-react";

interface RecentRating {
    tmdbId: number;
    posterPath: string | null;
    rating: number;
    ratedAt: Date;
    title: string;
}

interface RecentlyRatedGridProps {
    movies: RecentRating[];
    emptyMessage?: string;
}

export default function RecentlyRatedGrid({ movies, emptyMessage = "No ratings yet." }: RecentlyRatedGridProps) {
    if (movies.length === 0) {
        return null; // Hide section if no ratings
    }

    // Format rating from half-stars to stars
    const formatRating = (ratingHalf: number) => {
        return (ratingHalf / 2).toFixed(1);
    };

    return (
        <section>
            <h3 className="text-lg font-bold text-white mb-4">
                Recently Rated<span className="text-brand">.</span>
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {movies.map((movie) => (
                    <Link
                        key={movie.tmdbId}
                        href={`/movie/${movie.tmdbId}`}
                        className="group block"
                    >
                        <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-[#1b2228]">
                            {movie.posterPath ? (
                                <Image
                                    src={getTMDBImage(movie.posterPath, 'w300') || ''}
                                    alt={movie.title}
                                    fill
                                    sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 16vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-[#556677] text-xs text-center p-2">
                                    {movie.title}
                                </div>
                            )}
                            {/* Rating badge */}
                            <div className="absolute bottom-2 right-2 flex items-center gap-0.5 px-1.5 py-0.5 bg-[#14181c]/90 rounded border border-white/10 text-[10px]">
                                <Star className="w-2.5 h-2.5 fill-brand text-brand" />
                                <span className="text-white font-bold">{formatRating(movie.rating)}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
