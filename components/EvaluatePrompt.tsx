"use client";

import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { useQuery } from "@tanstack/react-query";
import getApiData from "@/lib/GetApiData";
import { Sparkles, X } from "lucide-react";

const MAX_CHARS = 2000;

export default function EvaluatePrompt() {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { refetch, isFetching } = useQuery({
    queryKey: ["prompt-evaluator"],
    queryFn: () => getApiData(value),
    enabled: false,
    retry: false,
  });

  const handleSubmit = async () => {
    if (!value.trim() || isFetching) return;
    await refetch();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const charsLeft = MAX_CHARS - value.length;
  const isOverLimit = charsLeft < 0;

  return (
    <div className="w-full flex justify-center px-4 py-8">
      <div className="w-full max-w-3xl">
        {/* Label row */}
        <div className="flex items-center justify-between mb-2">
          <label
            htmlFor="prompt-input"
            className="text-sm font-semibold text-slate-700"
          >
            Enter Your Prompt
          </label>
          <span
            className={`text-xs font-medium tabular-nums transition-colors ${
              isOverLimit
                ? "text-red-500"
                : charsLeft < 200
                ? "text-amber-500"
                : "text-slate-400"
            }`}
          >
            {value.length}/{MAX_CHARS}
          </span>
        </div>

        {/* Textarea + controls */}
        <div className="relative rounded-2xl border border-slate-200 bg-white shadow-sm focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-100 transition-all">
          <textarea
            id="prompt-input"
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value.slice(0, MAX_CHARS))}
            onKeyDown={handleKeyDown}
            placeholder="Type or paste your prompt here… (Ctrl+Enter to evaluate)"
            rows={4}
            className="w-full resize-none rounded-2xl bg-transparent px-4 pt-4 pb-14 text-[15px] font-medium text-slate-800 placeholder:text-slate-400 outline-none leading-relaxed"
          />

          {/* Bottom bar inside textarea box */}
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-3 py-2 border-t border-slate-100 rounded-b-2xl bg-slate-50/80">
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
                disabled={!value.trim() || isFetching || isOverLimit}
                className="h-8 px-4 rounded-xl bg-black text-white text-[13px] font-medium hover:opacity-90 transition-all flex items-center gap-1.5 disabled:opacity-40"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {isFetching ? "Evaluating…" : "Evaluate"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
