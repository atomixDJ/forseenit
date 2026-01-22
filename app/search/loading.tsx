import React from 'react';

export default function Loading() {
    return (
        <div className="py-20 flex flex-col items-center justify-center space-y-8 animate-pulse">
            <div className="w-full max-w-2xl h-14 bg-surface rounded-full" />

            <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="aspect-[2/3] bg-surface rounded-[4px]" />
                ))}
            </div>
        </div>
    );
}
