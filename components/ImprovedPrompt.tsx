"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CopyButton from "./Copybutton";

export const ImprovedPrompt = ({ improvedPrompt }: { improvedPrompt: string }) => {
  return (
    <div className="max-w-4xl mx-auto mt-4">
      <Card
        className="relative overflow-hidden border border-white/8 bg-zinc-900/50 backdrop-blur-sm rounded-xl"
        style={{ gap: 0 }}
      >
        {/* Gradient top accent — violet to fuchsia */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 w-full h-[2px] rounded-t-xl"
          style={{ background: "linear-gradient(to right, #8b5cf6, #d946ef)" }}
        />
        <CardHeader className="pb-4 pt-6">
          <CardTitle className="flex items-center justify-between gap-2">
            <span className="text-sm font-semibold text-zinc-100 tracking-tight">
              Improved Prompt
            </span>
            <CopyButton textToCopy={improvedPrompt} />
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 pb-6">
          {/* Terminal-style output block */}
          <div className="rounded-xl bg-zinc-950 border border-white/8 p-5 overflow-x-auto">
            {/* Terminal header dots */}
            <div className="flex items-center gap-1.5 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
              <span className="ml-3 text-[11px] text-zinc-600 font-medium select-none">optimized-prompt.txt</span>
            </div>
            <p
              className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap break-words"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              {improvedPrompt}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
