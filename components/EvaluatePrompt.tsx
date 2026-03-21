"use client";

import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { useQuery } from "@tanstack/react-query";
import getApiData from "@/lib/GetApiData";
import { Sparkles, X, Zap } from "lucide-react";
import { useCredits } from "@/lib/CreditsContext";

const MAX_CHARS = 2000;

export default function EvaluatePrompt() {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { credits, totalCredits, hasCredits, useCredit } = useCredits();

  const { refetch, isFetching } = useQuery({
    queryKey: ["prompt-evaluator"],
    queryFn: () => getApiData(value),
    enabled: false,
    retry: false,
  });

  const handleSubmit = async () => {
    if (!value.trim() || isFetching || !hasCredits) return;
    const result = await refetch();
    if (result.status === "success") {
      useCredit();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const charsLeft = MAX_CHARS - value.length;
  const isOverLimit = charsLeft < 0;

  const creditColor =
    credits === 0
      ? "text-rose-400"
      : credits <= 2
      ? "text-amber-400"
      : "text-emerald-400";

  const dotColor =
    credits === 0
      ? "bg-rose-500"
      : credits <= 2
      ? "bg-amber-400"
      : "bg-emerald-400";

  return (
    <div className="w-full flex justify-center px-4 sm:px-6 py-10">
      <div className="w-full max-w-3xl">
        {/* Label row */}
        <div className="flex items-center justify-between mb-3">
          <label
            htmlFor="prompt-input"
            className="text-sm font-semibold text-zinc-200"
          >
            Enter Your Prompt
          </label>

          <div className="flex items-center gap-3">
            {/* Credit indicator */}
            <div className={`flex items-center gap-1.5 text-xs font-semibold ${creditColor}`}>
              <Zap className="w-3.5 h-3.5" />
              <span>{credits}/{totalCredits} credits</span>
              <div className="flex items-center gap-0.5 ml-0.5">
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

            {/* Char counter */}
            <span
              className={`text-xs font-medium tabular-nums transition-colors ${
                isOverLimit
                  ? "text-rose-400 font-bold"
                  : charsLeft < 200
                  ? "text-amber-400"
                  : "text-zinc-600"
              }`}
            >
              {value.length}/{MAX_CHARS}
            </span>
          </div>
        </div>

        {/* Glass Textarea */}
        <div
          className={`relative rounded-xl border bg-zinc-900/50 backdrop-blur-xl transition-all duration-300 ${
            !hasCredits
              ? "border-white/5 opacity-40 pointer-events-none"
              : isOverLimit
              ? "border-rose-500/40 shadow-[0_0_20px_rgba(244,63,94,0.10)]"
              : "border-white/8 focus-within:border-violet-500/40 focus-within:shadow-[0_0_24px_rgba(139,92,246,0.15)]"
          }`}
        >
          <textarea
            id="prompt-input"
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value.slice(0, MAX_CHARS))}
            onKeyDown={handleKeyDown}
            disabled={!hasCredits}
            placeholder={
              hasCredits
                ? "Type or paste your prompt here… (Ctrl+Enter to evaluate)"
                : "No credits remaining."
            }
            rows={6}
            className="w-full resize-none rounded-xl bg-transparent px-5 pt-5 pb-16 text-[15px] text-zinc-100 placeholder:text-zinc-600 outline-none leading-relaxed disabled:cursor-not-allowed caret-violet-400"
          />

          {/* Bottom bar */}
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-3 border-t border-white/5 rounded-b-xl bg-zinc-950/60 backdrop-blur-sm">
            <p className="text-[11px] text-zinc-600 select-none">
              Ctrl+Enter to evaluate
            </p>
            <div className="flex items-center gap-2">
              {value.length > 0 && (
                <button
                  type="button"
                  onClick={() => setValue("")}
                  className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-300 transition-colors px-2 py-1 rounded-lg hover:bg-white/5 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                  Clear
                </button>
              )}
              <Button
                onClick={handleSubmit}
                disabled={!value.trim() || isFetching || isOverLimit || !hasCredits}
                className="h-8 px-4 rounded-xl bg-linear-to-r from-violet-500 to-fuchsia-600 text-white text-[13px] font-semibold hover:from-violet-600 hover:to-fuchsia-700 transition-all flex items-center gap-1.5 disabled:opacity-30 shadow-[0_0_16px_rgba(139,92,246,0.3)] cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {isFetching ? "Evaluating…" : "Evaluate"}
              </Button>
            </div>
          </div>
        </div>

        {/* Low credit warning */}
        {credits > 0 && credits <= 2 && (
          <p className="mt-2 text-xs text-amber-400 font-medium text-right">
            Only {credits} credit{credits === 1 ? "" : "s"} left — use them wisely!
          </p>
        )}
      </div>
    </div>
  );
}
