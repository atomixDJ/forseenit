'use client';

import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import Image from 'next/image';
import { Settings } from 'lucide-react';

export default function AuthButton() {
    return (
        <>
            <SignedOut>
                <div className="flex items-center gap-3">
                    <SignInButton mode="modal">
                        <button className="text-[#99aabb] hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer">
                            Log In
                        </button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                        <button className="btn-green text-[10px] px-5 py-2 cursor-pointer">
                            Sign Up
                        </button>
                    </SignUpButton>
                </div>
            </SignedOut>
            <SignedIn>
                <div className="flex items-center gap-3">
                    {/* Avatar links to profile */}
                    <ProfileAvatar />
                    {/* Settings icon wrapping UserButton */}
                    <SettingsButton />
                </div>
            </SignedIn>
        </>
    );
}

function ProfileAvatar() {
    const { user } = useUser();

    return (
        <Link href="/profile" className="block" title="View Profile">
            {user?.imageUrl ? (
                <Image
                    src={user.imageUrl}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full object-cover hover:ring-2 hover:ring-brand transition-all"
                />
            ) : (
                <div className="w-8 h-8 rounded-full bg-brand/20 flex items-center justify-center text-brand font-bold text-sm hover:ring-2 hover:ring-brand transition-all">
                    {user?.firstName?.[0] || user?.username?.[0] || '?'}
                </div>
            )}
        </Link>
    );
}

function SettingsButton() {
    return (
        <div className="relative w-6 h-6 flex items-center justify-center">
            {/* Visible settings icon */}
            <Settings className="w-4 h-4 text-[#99aabb] absolute z-10 pointer-events-none" />
            {/* Invisible UserButton trigger that handles clicks - popup will show normally */}
            <div className="absolute inset-0 [&_.cl-userButtonTrigger_.cl-avatarBox]:opacity-0">
                <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                        elements: {
                            userButtonTrigger: "w-6 h-6",
                        }
                    }}
                />
            </div>
        </div>
    );
}

