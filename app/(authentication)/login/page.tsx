'use client'

import { createClient } from '@/lib/supabase/client'
import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'


export default function LoginPage() {
  const supabase = createClient()

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo : `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    })
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6 relative overflow-hidden">
      {/* Glow orbs */}
      <div
        aria-hidden="true"
        className="absolute h-96 w-96 rounded-full bg-violet-600/10 blur-3xl pointer-events-none -top-24 -left-24"
      />
      <div
        aria-hidden="true"
        className="absolute h-72 w-72 rounded-full bg-fuchsia-600/8 blur-3xl pointer-events-none -bottom-16 -right-24"
      />

      {/* Subtle grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(#8b5cf6 1px, transparent 1px), linear-gradient(90deg, #8b5cf6 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 w-full max-w-sm">
        {/* Card */}
        <div className="rounded-2xl border border-white/8 bg-zinc-900/80 p-8 shadow-[0_0_60px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          {/* Brand */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-violet-500 to-fuchsia-600 shadow-[0_0_32px_rgba(139,92,246,0.4)] mb-5">
              <Sparkles className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-2xl font-semibold text-zinc-50 tracking-tight mb-2">
              Prompt Evaluator
            </h1>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
              Get instant AI-powered quality scores and improvements for your prompts.
            </p>
          </div>

          <div className="border-t border-white/8 mb-6" />

          {/* Sign in */}
          <div className="space-y-4">
            <p className="text-xs text-zinc-600 text-center uppercase tracking-widest font-semibold">
              Sign in to continue
            </p>

            <button
              onClick={handleLogin}
              className="w-full flex items-center justify-center gap-3 rounded-xl border border-white/8 bg-zinc-800/50 px-6 py-3.5 text-sm font-semibold text-zinc-100 transition-all duration-200 hover:bg-zinc-800 hover:border-white/15 hover:shadow-[0_0_20px_rgba(139,92,246,0.1)] cursor-pointer group"
            >
              {/* Google logo */}
              <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
              <ArrowRight className="h-4 w-4 ml-auto text-zinc-600 group-hover:text-zinc-400 transition-colors" />
            </button>
          </div>

          <p className="mt-6 text-center text-xs text-zinc-600">
            Free credits included · No credit card required
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors duration-200"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
