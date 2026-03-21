"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CopyButton from "./Copybutton";
import { ImprovementSuggestion } from "./data";
import { ArrowUpCircle, AlertCircle, Info } from "lucide-react";

const priorityConfig = {
  high: {
    label: "High",
    className: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    Icon: ArrowUpCircle,
    iconClass: "text-rose-400",
    borderAccent: "border-l-rose-500",
  },
  medium: {
    label: "Medium",
    className: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Icon: AlertCircle,
    iconClass: "text-amber-400",
    borderAccent: "border-l-amber-500",
  },
  low: {
    label: "Low",
    className: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    Icon: Info,
    iconClass: "text-sky-400",
    borderAccent: "border-l-sky-500",
  },
};

interface SummaryProps {
  improvedSuggestions: string;
  rawSuggestions?: ImprovementSuggestion[];
}

export default function Summary({ improvedSuggestions, rawSuggestions }: SummaryProps) {
  const suggestions = rawSuggestions && rawSuggestions.length > 0 ? rawSuggestions : null;

  return (
    <div className="max-w-2xl w-full mx-auto mt-8">
      <Card
        className="relative overflow-hidden border border-white/8 bg-zinc-900/50 backdrop-blur-sm rounded-xl"
        style={{ gap: 0 }}
      >
        {/* Gradient top accent */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 w-full h-[2px] rounded-t-xl"
          style={{ background: "linear-gradient(to right, #f59e0b, #f43f5e)" }}
        />
        <CardHeader className="pb-4 pt-6">
          <CardTitle className="flex items-center justify-between gap-2">
            <span className="text-sm font-semibold text-zinc-100 tracking-tight">
              Improvement Suggestions
            </span>
            <CopyButton textToCopy={improvedSuggestions} />
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 flex flex-col gap-3 pb-6">
          {suggestions ? (
            suggestions.map((s, i) => {
              const cfg = priorityConfig[s.priority] ?? priorityConfig.low;
              const { Icon } = cfg;
              return (
                <div
                  key={i}
                  className={`rounded-xl border border-white/5 bg-zinc-950/50 p-4 flex flex-col gap-2.5 border-l-4 ${cfg.borderAccent}`}
                >
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-zinc-200 flex-1 leading-snug">
                      {s.issue}
                    </p>
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border shrink-0 ${cfg.className}`}
                    >
                      <Icon className={`w-3 h-3 ${cfg.iconClass}`} />
                      {cfg.label}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    <span className="font-semibold text-zinc-400">Fix: </span>
                    {s.suggestion}
                  </p>
                  {s.expectedImpact && (
                    <p className="text-xs text-zinc-600 italic">
                      Impact: {s.expectedImpact}
                    </p>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-zinc-500 leading-relaxed tracking-wide text-sm">
              {improvedSuggestions}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
