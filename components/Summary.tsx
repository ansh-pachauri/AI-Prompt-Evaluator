"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CopyButton from "./Copybutton";
import { ImprovementSuggestion } from "./data";
import { ArrowUpCircle, AlertCircle, Info } from "lucide-react";

const priorityConfig = {
  high: {
    label: "High Priority",
    className: "bg-red-100 text-red-700 border-red-200",
    Icon: ArrowUpCircle,
    iconClass: "text-red-500",
  },
  medium: {
    label: "Medium Priority",
    className: "bg-amber-100 text-amber-700 border-amber-200",
    Icon: AlertCircle,
    iconClass: "text-amber-500",
  },
  low: {
    label: "Low Priority",
    className: "bg-blue-100 text-blue-700 border-blue-200",
    Icon: Info,
    iconClass: "text-blue-500",
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
      <Card className="relative overflow-hidden border border-border bg-card shadow-sm">
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 w-full h-1"
          style={{
            background: "linear-gradient(to right, #f59e0b, #ef4444)",
          }}
        />
        <CardHeader className="pb-3">
          <CardTitle className="text-lg sm:text-xl font-semibold text-foreground flex items-center justify-between gap-2">
            <span>Improvement Suggestions</span>
            <CopyButton textToCopy={improvedSuggestions} />
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 flex flex-col gap-3">
          {suggestions ? (
            suggestions.map((s, i) => {
              const cfg = priorityConfig[s.priority] ?? priorityConfig.low;
              const { Icon } = cfg;
              return (
                <div
                  key={i}
                  className="rounded-xl border border-slate-100 bg-slate-50 p-4 flex flex-col gap-2"
                >
                  {/* Priority badge + Issue */}
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-slate-800 flex-1">{s.issue}</p>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border shrink-0 ${cfg.className}`}
                    >
                      <Icon className={`w-3 h-3 ${cfg.iconClass}`} />
                      {cfg.label}
                    </span>
                  </div>
                  {/* Suggestion */}
                  <p className="text-sm text-slate-600 leading-relaxed">
                    <span className="font-medium text-slate-700">Fix: </span>
                    {s.suggestion}
                  </p>
                  {/* Expected impact */}
                  {s.expectedImpact && (
                    <p className="text-xs text-slate-500 italic">
                      Impact: {s.expectedImpact}
                    </p>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-muted-foreground leading-relaxed tracking-wide text-base">
              {improvedSuggestions}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
