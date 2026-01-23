import React from 'react';

interface RatingChartProps {
    distribution: Record<number, number>;
}

export default function RatingChart({ distribution }: RatingChartProps) {
    const values = Object.values(distribution);
    const max = Math.max(...values, 1);

    return (
        <div className="bg-[#1b2228]/40 border border-white/5 p-8 rounded-[4px]">
            <span className="block text-[#556677] uppercase text-[10px] font-bold tracking-[0.2em] mb-8">
                Rating Distribution
            </span>

            <div className="flex items-end justify-between h-40 gap-1.5">
                {Object.entries(distribution).map(([rating, count]) => {
                    const percentage = (count / max) * 100;
                    return (
                        <div key={rating} className="flex-grow flex flex-col items-center group">
                            <div className="relative w-full flex flex-col justify-end h-32">
                                <div
                                    className="w-full bg-[#00e054]/20 border-t border-x border-[#00e054]/30 rounded-t-[2px] transition-all duration-500 group-hover:bg-[#00e054]/40 group-hover:border-[#00e054]/60"
                                    style={{ height: `${percentage}%` }}
                                >
                                    {count > 0 && (
                                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-bold text-[#00e054] opacity-0 group-hover:opacity-100 transition-opacity">
                                            {count}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <span className="text-[9px] font-bold text-[#556677] mt-3 tracking-tighter group-hover:text-white transition-colors">
                                {rating}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
