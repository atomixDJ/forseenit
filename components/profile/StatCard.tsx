import React from 'react';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface StatCardProps {
    label: string;
    value: string | number;
    icon: LucideIcon;
    subtitle?: string;
    link?: string;
    linkText?: string;
}

export default function StatCard({ label, value, icon: Icon, subtitle, link, linkText }: StatCardProps) {
    const Content = (
        <div className="group relative bg-[#1b2228]/40 backdrop-blur-md border border-white/5 p-6 rounded-[8px] transition-all hover:bg-[#1b2228]/60 hover:border-white/10 hover:shadow-2xl">
            <div className="flex items-start justify-between mb-4">
                <div className="p-2.5 bg-brand/10 rounded-[6px] text-brand group-hover:bg-brand/20 transition-colors">
                    <Icon className="w-5 h-5" />
                </div>
                {link && (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#556677] group-hover:text-brand transition-colors">
                        {linkText || 'View All'}
                    </span>
                )}
            </div>

            <div className="space-y-1">
                <span className="block text-[#556677] uppercase text-[10px] font-black tracking-[0.2em]">
                    {label}
                </span>
                <div className="flex flex-col min-w-0">
                    <h3 className="text-3xl md:text-3xl font-black text-white italic tracking-tighter uppercase leading-[0.9] break-words">
                        {value}
                    </h3>
                    {subtitle && (
                        <span className="text-[10px] font-bold text-[#556677] uppercase tracking-widest mt-1">
                            {subtitle}
                        </span>
                    )}
                </div>
            </div>

            {/* Decorative accent */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
    );

    if (link) {
        return (
            <Link href={link} className="block">
                {Content}
            </Link>
        );
    }

    return Content;
}
