"use client";

import { Sparkles, Zap } from "lucide-react";
import { useCredits } from "@/lib/CreditsContext";

export default function Header() {
  const { credits, totalCredits } = useCredits();

  const creditColor =
    credits === 0
      ? "bg-rose-50 text-rose-600 border-rose-200"
      : credits <= 2
      ? "bg-amber-50 text-amber-600 border-amber-200"
      : "bg-emerald-50 text-emerald-700 border-emerald-200";

  const dotColor =
    credits === 0
      ? "bg-rose-400"
      : credits <= 2
      ? "bg-amber-400"
      : "bg-emerald-400";

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="mx-auto max-w-7xl px-6 py-3.5 flex items-center justify-between">
        {/* Logo + name */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-9 w-9 rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 shadow-md shadow-indigo-200">
            <Sparkles className="h-4.5 w-4.5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-[15px] text-slate-900 leading-tight tracking-tight">
              Prompt Evaluator
            </span>
            <span className="text-[10px] text-slate-400 font-medium hidden sm:block leading-none tracking-wide">
              Powered by Google Gemini
            </span>
          </div>
        </div>

        {/* Right: credits + AI badge */}
        <div className="flex items-center gap-2">
          {/* Credit pill */}
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${creditColor}`}
          >
            <Zap className="w-3 h-3" />
            <span>{credits}/{totalCredits} credits</span>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: totalCredits }).map((_, i) => (
                <span
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    i < credits ? dotColor : "bg-slate-200"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* AI badge — desktop only */}
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-100">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            AI-Powered
          </span>
        </div>
      </div>
    </header>
  );
}
