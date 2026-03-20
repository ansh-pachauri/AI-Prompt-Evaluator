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

  // Credit color: green > 2, amber = 1-2, red = 0
  const creditColor =
    credits === 0
      ? "text-rose-500"
      : credits <= 2
      ? "text-amber-500"
      : "text-emerald-600";

  return (
    <div className="w-full flex justify-center px-6 py-10">
      <div className="w-full max-w-3xl">
        {/* Label row */}
        <div className="flex items-center justify-between mb-3">
          <label
            htmlFor="prompt-input"
            className="text-sm font-semibold text-slate-800"
          >
            Enter Your Prompt
          </label>

          <div className="flex items-center gap-3">
            {/* Credit indicator */}
            <div className={`flex items-center gap-1.5 text-xs font-semibold ${creditColor}`}>
              <Zap className="w-3.5 h-3.5" />
              <span>{credits}/{totalCredits} credits</span>
              {/* Credit dots */}
              <div className="flex items-center gap-0.5 ml-0.5">
                {Array.from({ length: totalCredits }).map((_, i) => (
                  <span
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      i < credits
                        ? credits <= 2
                          ? "bg-amber-400"
                          : "bg-emerald-400"
                        : "bg-slate-200"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Char counter */}
            <span
              className={`text-xs font-medium tabular-nums transition-colors ${
                isOverLimit
                  ? "text-rose-500 font-bold"
                  : charsLeft < 200
                  ? "text-amber-500"
                  : "text-slate-400"
              }`}
            >
              {value.length}/{MAX_CHARS}
            </span>
          </div>
        </div>

        {/* Textarea + controls */}
        <div
          className={`relative rounded-2xl border bg-white shadow-sm transition-all ${
            !hasCredits
              ? "border-slate-200 opacity-60 pointer-events-none"
              : "border-slate-200 focus-within:border-indigo-300 focus-within:ring-3 focus-within:ring-indigo-50"
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
            rows={5}
            className="w-full resize-none rounded-2xl bg-transparent px-5 pt-5 pb-16 text-[15px] text-slate-800 placeholder:text-slate-400 outline-none leading-relaxed disabled:cursor-not-allowed"
          />

          {/* Bottom bar */}
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-3 border-t border-slate-100 rounded-b-2xl bg-slate-50/80">
            <p className="text-[11px] text-slate-400 select-none">
              Ctrl+Enter to evaluate
            </p>
            <div className="flex items-center gap-2">
              {value.length > 0 && (
                <button
                  type="button"
                  onClick={() => setValue("")}
                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 transition-colors px-2 py-1 rounded-lg hover:bg-slate-200"
                >
                  <X className="w-3 h-3" />
                  Clear
                </button>
              )}
              <Button
                onClick={handleSubmit}
                disabled={!value.trim() || isFetching || isOverLimit || !hasCredits}
                className="h-8 px-4 rounded-xl bg-linear-to-r from-indigo-500 to-violet-600 text-white text-[13px] font-semibold hover:from-indigo-600 hover:to-violet-700 transition-all flex items-center gap-1.5 disabled:opacity-40 shadow-sm shadow-indigo-200"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {isFetching ? "Evaluating…" : "Evaluate"}
              </Button>
            </div>
          </div>
        </div>

        {/* Low credit warning */}
        {credits > 0 && credits <= 2 && (
          <p className="mt-2 text-xs text-amber-600 font-medium text-right">
            Only {credits} credit{credits === 1 ? "" : "s"} left — use them wisely!
          </p>
        )}
      </div>
    </div>
  );
}
