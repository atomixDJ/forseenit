'use client'

import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"

export default function LoginPage() {
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get("callbackUrl") || "/"

    return (
        <div className="flex min-h-[80vh] flex-col items-center justify-center py-2 px-6">
            <div className="w-full max-w-md bg-[#1b2228] glass p-10 rounded-2xl border border-white/5 shadow-2xl text-center">
                <div className="flex justify-center items-center space-x-1 mb-8">
                    <span className="w-3 h-3 rounded-full bg-[#ff8000]"></span>
                    <span className="w-3 h-3 rounded-full bg-[#00e054]"></span>
                    <span className="w-3 h-3 rounded-full bg-[#40bcf4]"></span>
                </div>

                <h1 className="text-3xl font-black italic tracking-tighter text-white uppercase mb-2">ForSeenIt</h1>
                <p className="text-[#99aabb] text-xs font-bold uppercase tracking-[0.2em] mb-12">Sign in to your account</p>

                <button
                    onClick={() => signIn("google", { callbackUrl })}
                    className="w-full flex items-center justify-center space-x-3 bg-white hover:bg-zinc-200 text-black font-bold py-4 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"
                        />
                        <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                    </svg>
                    <span>Continue with Google</span>
                </button>

                <p className="mt-12 text-[#677] text-[10px] uppercase font-bold tracking-widest leading-loose">
                    By continuing, you agree to ForSeenIt's<br />
                    <span className="text-[#99aabb] hover:text-white cursor-pointer underline">Terms of Service</span> and <span className="text-[#99aabb] hover:text-white cursor-pointer underline">Privacy Policy</span>.
                </p>
            </div>
        </div>
    )
}
