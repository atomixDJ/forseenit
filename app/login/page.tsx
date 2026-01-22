'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState('')

    const router = useRouter()
    const supabase = createClient()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMsg('')

        // Login
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            setMsg(error.message)
            setLoading(false)
        } else {
            router.refresh()
            router.push('/') // Redirect to home on success
        }
    }

    const handleSignUp = async () => {
        setLoading(true)
        setMsg('')
        // Signup
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`,
                data: {
                    full_name: email.split('@')[0], // Fallback name
                }
            },
        })

        if (error) {
            setMsg(error.message)
        } else {
            setMsg('Check your email for the confirmation link!')
        }
        setLoading(false)
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-2 bg-nebula-void px-6">
            <div className="w-full max-w-md bg-nebula-card/50 glass p-8 rounded-2xl border border-white/10 shadow-2xl">
                <h1 className="text-3xl font-bold mb-6 text-center text-white">Welcome Back</h1>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full bg-zinc-900/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-nebula-cyan transition-colors"
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full bg-zinc-900/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-nebula-cyan transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    {msg && (
                        <div className="p-3 rounded bg-red-500/20 text-red-200 text-sm border border-red-500/30">
                            {msg}
                        </div>
                    )}

                    <div className="flex gap-4 pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-nebula-card hover:bg-white/10 text-white font-medium py-3 rounded-lg border border-white/10 transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Submitting...' : 'Log In'}
                        </button>
                        <button
                            type="button"
                            onClick={handleSignUp}
                            disabled={loading}
                            className="flex-1 bg-nebula-purple hover:bg-nebula-purple/80 text-white font-medium py-3 rounded-lg transition-colors shadow-lg disabled:opacity-50"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-center text-sm text-zinc-500">
                    ForSeenIt uses Magic Links or Password authentication.
                </p>
            </div>
        </div>
    )
}
