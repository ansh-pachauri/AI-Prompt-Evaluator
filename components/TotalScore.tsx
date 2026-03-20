"use client";

import { useDonutChartData } from "./data";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ShieldAlert } from "lucide-react";

function getGrade(pct: number) {
  if (pct >= 80)
    return {
      label: "Excellent",
      gradient: "from-emerald-500 to-teal-400",
      bar: "from-emerald-400 to-teal-500",
      badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    };
  if (pct >= 60)
    return {
      label: "Good",
      gradient: "from-indigo-500 to-violet-500",
      bar: "from-indigo-400 to-violet-500",
      badge: "bg-indigo-50 text-indigo-700 border-indigo-200",
    };
  if (pct >= 40)
    return {
      label: "Fair",
      gradient: "from-amber-400 to-orange-500",
      bar: "from-amber-400 to-orange-500",
      badge: "bg-amber-50 text-amber-700 border-amber-200",
    };
  if (pct >= 20)
    return {
      label: "Poor",
      gradient: "from-orange-500 to-red-500",
      bar: "from-orange-400 to-red-500",
      badge: "bg-orange-50 text-orange-700 border-orange-200",
    };
  return {
    label: "Needs Work",
    gradient: "from-rose-500 to-pink-500",
    bar: "from-rose-400 to-pink-500",
    badge: "bg-rose-50 text-rose-700 border-rose-200",
  };
}

export default function TotalScore() {
  const { totalScore, summary, isToxic } = useDonutChartData();
  const percentage = Math.round((totalScore / 5) * 100);
  const grade = getGrade(percentage);

  return (
    <div className="flex flex-col gap-4 mt-6">
      <Card className="w-full max-w-sm bg-white border border-slate-200 shadow-md rounded-2xl p-4 hover:shadow-lg transition-shadow duration-300" style={{ gap: 0 }}>
        <CardHeader className="text-center pb-5">
          <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Overall Score
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          {/* Big score with gradient */}
          <div
            className={`text-7xl font-black bg-gradient-to-br ${grade.gradient} bg-clip-text text-transparent leading-none tracking-tighter`}
          >
            {percentage}%
          </div>

          {/* Grade badge */}
          <span
            className={`text-xs font-bold px-3 py-1 rounded-full border ${grade.badge}`}
          >
            {grade.label}
          </span>

          {/* Progress bar */}
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${grade.bar} transition-all duration-700 ease-in-out`}
              style={{ width: `${percentage}%` }}
            />
          </div>

          <p className="text-xs text-slate-400 font-medium">
            {totalScore} / 5.0 across 7 dimensions
          </p>

          {/* Toxicity badge */}
          {isToxic && (
            <div className="w-full flex items-center gap-2 rounded-xl bg-rose-50 border border-rose-200 px-3 py-2 mt-1">
              <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0" />
              <p className="text-xs text-rose-700 font-medium">
                Toxic content detected in this prompt.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Assessment summary */}
      {summary && (
        <Card className="w-full max-w-sm bg-white border border-slate-200 shadow-sm rounded-2xl p-4" style={{ gap: 0 }}>
          <CardHeader className="pb-3 pt-0 px-0">
            <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Assessment Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0 pb-0 pt-0">
            <p className="text-sm text-slate-600 leading-relaxed">{summary}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
