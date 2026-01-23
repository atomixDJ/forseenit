import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
    label: string;
    value: string | number;
    icon: LucideIcon;
    subtitle?: string;
}

export default function StatsCard({ label, value, icon: Icon, subtitle }: StatsCardProps) {
    return (
        <div className="bg-[#1b2228]/40 border border-white/5 p-6 rounded-[4px] relative overflow-hidden group hover:border-white/10 transition-all">
            <div className="flex items-center justify-between relative z-10">
                <div>
                    <span className="block text-[#556677] uppercase text-[10px] font-bold tracking-[0.2em] mb-1 group-hover:text-[#99aabb] transition-colors">
                        {label}
                    </span>
                    <div className="text-3xl font-black text-white italic uppercase tracking-tighter">
                        {value}
                    </div>
                    {subtitle && (
                        <p className="text-[#334455] text-[10px] font-bold uppercase mt-1 tracking-widest">{subtitle}</p>
                    )}
                </div>
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-[#334455] group-hover:text-[#00e054] transition-colors" />
                </div>
            </div>

            {/* Subtle Gradient Glow */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#00e054]/5 blur-[60px] rounded-full group-hover:bg-[#00e054]/10 transition-colors" />
        </div>
    );
}
