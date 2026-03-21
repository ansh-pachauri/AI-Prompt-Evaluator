"use client";

import { LogOut, Sparkles, Zap } from "lucide-react";
import { useCredits } from "@/lib/CreditsContext";
import { createClient } from "@/lib/supabase/client";

interface HeaderProps {
  userEmail?: string;
}

export default function Header({ userEmail }: HeaderProps) {
  const { credits, totalCredits } = useCredits();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  const creditColor =
    credits === 0
      ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
      : credits <= 2
      ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
      : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";

  const dotColor =
    credits === 0
      ? "bg-rose-500"
      : credits <= 2
      ? "bg-amber-400"
      : "bg-emerald-400";

  const initials = userEmail
    ? userEmail.split("@")[0].slice(0, 2).toUpperCase()
    : null;

  return (
    <header className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-white/8 shadow-[0_1px_0_rgba(255,255,255,0.05)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        {/* Logo */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="flex items-center justify-center h-8 w-8 sm:h-9 sm:w-9 rounded-xl bg-linear-to-br from-violet-500 to-fuchsia-600 shadow-[0_0_16px_rgba(139,92,246,0.35)]">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="font-semibold text-[14px] sm:text-[15px] text-zinc-50 tracking-tight leading-tight">
            Prompt Evaluator
          </span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Credit pill */}
          <div
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold border transition-colors ${creditColor}`}
          >
            <Zap className="w-3 h-3 shrink-0" />
            <span>
              {credits}/{totalCredits}
              <span className="hidden sm:inline"> credits</span>
            </span>
            <div className="hidden sm:flex items-center gap-0.5">
              {Array.from({ length: totalCredits }).map((_, i) => (
                <span
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    i < credits ? dotColor : "bg-zinc-700"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* User avatar + email — desktop */}
          {userEmail && (
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-white/8">
              <div className="w-5 h-5 rounded-full bg-linear-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-[9px] font-bold text-white shrink-0">
                {initials}
              </div>
              <span className="text-xs text-zinc-400 font-medium max-w-35 truncate">
                {userEmail}
              </span>
            </div>
          )}

          {/* Logout */}
          {userEmail && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium text-zinc-500 border border-white/8 hover:bg-white/5 hover:text-zinc-200 transition-all duration-200 cursor-pointer"
              aria-label="Sign out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
