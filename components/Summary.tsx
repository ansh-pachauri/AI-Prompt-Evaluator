"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CopyButton from "./Copybutton";
import { ImprovementSuggestion } from "./data";
import { ArrowUpCircle, AlertCircle, Info } from "lucide-react";

const priorityConfig = {
  high: {
    label: "High Priority",
    className: "bg-rose-50 text-rose-700 border-rose-200",
    Icon: ArrowUpCircle,
    iconClass: "text-rose-500",
    borderAccent: "border-l-rose-400",
  },
  medium: {
    label: "Medium Priority",
    className: "bg-amber-50 text-amber-700 border-amber-200",
    Icon: AlertCircle,
    iconClass: "text-amber-500",
    borderAccent: "border-l-amber-400",
  },
  low: {
    label: "Low Priority",
    className: "bg-sky-50 text-sky-700 border-sky-200",
    Icon: Info,
    iconClass: "text-sky-500",
    borderAccent: "border-l-sky-400",
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
      <Card className="relative overflow-hidden border border-slate-200 bg-white shadow-sm rounded-2xl" style={{ gap: 0 }}>
        {/* Gradient top accent */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 w-full h-[3px] rounded-t-2xl"
          style={{ background: "linear-gradient(to right, #f59e0b, #f43f5e)" }}
        />
        <CardHeader className="pb-4 pt-6">
          <CardTitle className="flex items-center justify-between gap-2">
            <span className="text-base font-bold text-slate-900 tracking-tight">
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
                  className={`rounded-xl border border-slate-100 bg-slate-50 p-4 flex flex-col gap-2.5 border-l-4 ${cfg.borderAccent}`}
                >
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-slate-800 flex-1 leading-snug">
                      {s.issue}
                    </p>
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border shrink-0 ${cfg.className}`}
                    >
                      <Icon className={`w-3 h-3 ${cfg.iconClass}`} />
                      {cfg.label}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    <span className="font-semibold text-slate-700">Fix: </span>
                    {s.suggestion}
                  </p>
                  {s.expectedImpact && (
                    <p className="text-xs text-slate-400 italic">
                      Impact: {s.expectedImpact}
                    </p>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-slate-500 leading-relaxed tracking-wide text-sm">
              {improvedSuggestions}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
