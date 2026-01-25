import React from 'react';
import { Star } from 'lucide-react';

interface RatingDistributionProps {
    distribution: Record<string | number, number>;
    averageRating: number;
    totalWatched: number;
    totalHours: number;
    totalRated: number;
}

export default function RatingDistribution({
    distribution,
    averageRating,
    totalRated
}: RatingDistributionProps) {
    // Rating keys are 0.5, 1.0, ..., 5.0
    const keys = Array.from({ length: 10 }, (_, i) => (i + 1) / 2);
    const counts = keys.map(k => distribution[k] || 0);
    const maxCount = Math.max(...counts, 1);

    return (
        <div className="bg-[#1b2228]/40 backdrop-blur-md border border-white/5 rounded-[8px] p-5 flex flex-col justify-between h-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center">
                        <Star className="w-4 h-4 text-brand" />
                    </div>
                    <span className="text-[#556677] uppercase text-[9px] font-bold tracking-widest">
                        Ratings
                    </span>
                </div>
                <span className="text-[#99aabb] text-xs font-bold">{totalRated}</span>
            </div>

            {/* Bar Chart */}
            <div className="flex items-end justify-between gap-[3px] h-10 mb-3">
                {keys.map((key) => {
                    const count = distribution[key] || 0;
                    const heightPercent = (count / maxCount) * 100;

                    return (
                        <div
                            key={key}
                            className="flex-1 bg-[#445566]/50 hover:bg-[#556677] rounded-t-[1px] transition-colors"
                            style={{ height: `${Math.max(heightPercent, 5)}%`, minHeight: '2px' }}
                            title={`${key} stars: ${count}`}
                        />
                    );
                })}
            </div>

            {/* Footer: Scale labels */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-brand/50" />
                </div>
                <span className="text-xl font-black text-white italic tracking-tighter">
                    {averageRating.toFixed(1)}
                </span>
                <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map(i => (
                        <Star key={i} className="w-2.5 h-2.5 text-brand/50 fill-brand/50" />
                    ))}
                </div>
            </div>
        </div>
    );
}
