"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CopyButton from "./Copybutton";

export const ImprovedPrompt = ({ improvedPrompt }: { improvedPrompt: string }) => {
  return (
    <div className="max-w-4xl mx-auto mt-4">
      <Card className="relative overflow-hidden border border-slate-200 bg-white shadow-sm rounded-2xl" style={{ gap: 0 }}>
        {/* Gradient top accent */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 w-full h-[3px] rounded-t-2xl"
          style={{ background: "linear-gradient(to right, #6366f1, #8b5cf6)" }}
        />
        <CardHeader className="pb-4 pt-6">
          <CardTitle className="flex items-center justify-between gap-2">
            <span className="text-base font-bold text-slate-900 tracking-tight">
              Improved Prompt
            </span>
            <CopyButton textToCopy={improvedPrompt} />
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 pb-6">
          <p className="text-slate-600 leading-relaxed tracking-wide text-sm">
            {improvedPrompt}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
