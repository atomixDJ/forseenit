'use client';

import React from 'react';
import { signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import type { Session } from 'next-auth';

interface AuthButtonProps {
    session: Session | null;
}

export default function AuthButton({ session }: AuthButtonProps) {
    if (session?.user) {
        return (
            <div className="flex items-center gap-4">
                <div className="flex flex-col items-end hidden sm:flex">
                    <Link
                        href="/profile"
                        className="text-[10px] font-bold text-white uppercase tracking-wider line-clamp-1 hover:text-[#00e054] transition-colors"
                    >
                        {session.user.name || 'User'}
                    </Link>
                    <button
                        onClick={() => signOut()}
                        className="text-[#677] hover:text-[#ff8000] text-[9px] font-bold uppercase tracking-widest transition-colors"
                    >
                        Sign Out
                    </button>
                </div>
                <Link href="/profile" className="relative w-8 h-8 rounded-full overflow-hidden border border-white/10 hover:border-[#00e054]/50 transition-colors">
                    <Image
                        src={session.user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(session.user.name || 'U')}&background=1b2228&color=fff`}
                        alt={session.user.name || 'User'}
                        fill
                        className="object-cover"
                    />
                </Link>
            </div>
        );
    }

    return (
        <button
            onClick={() => signIn('google')}
            className="btn-green text-[11px] px-6 py-2"
        >
            Log In
        </button>
    );
}
