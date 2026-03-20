"use client";

import { Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="mx-auto max-w-7xl px-6 py-3.5 flex items-center justify-between">
        {/* Logo + name */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-md shadow-indigo-200">
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

        {/* Right badge */}
        <div className="hidden sm:flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-100">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            AI-Powered Analysis
          </span>
        </div>
      </div>
    </header>
  );
}
