"use client";

import { useDonutChartData } from "./data";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ShieldAlert } from "lucide-react";

function getGrade(pct: number) {
  if (pct >= 80)
    return {
      label: "Excellent",
      gradient: "from-emerald-400 to-teal-400",
      bar: "from-emerald-400 to-teal-500",
      badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    };
  if (pct >= 60)
    return {
      label: "Good",
      gradient: "from-violet-400 to-purple-400",
      bar: "from-violet-400 to-purple-500",
      badge: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    };
  if (pct >= 40)
    return {
      label: "Fair",
      gradient: "from-amber-400 to-orange-400",
      bar: "from-amber-400 to-orange-500",
      badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    };
  if (pct >= 20)
    return {
      label: "Poor",
      gradient: "from-orange-400 to-red-400",
      bar: "from-orange-400 to-red-500",
      badge: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    };
  return {
    label: "Needs Work",
    gradient: "from-rose-400 to-pink-400",
    bar: "from-rose-400 to-pink-500",
    badge: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  };
}

export default function TotalScore() {
  const { totalScore, summary, isToxic } = useDonutChartData();
  const percentage = Math.round((totalScore / 5) * 100);
  const grade = getGrade(percentage);

  return (
    <div className="flex flex-col gap-4 mt-6">
      <Card
        className="w-full max-w-sm bg-zinc-900/50 border border-white/8 backdrop-blur-sm rounded-xl p-4 hover:border-white/15 hover:shadow-[0_0_20px_rgba(139,92,246,0.08)] transition-all duration-300"
        style={{ gap: 0 }}
      >
        <CardHeader className="text-center pb-5">
          <CardTitle className="text-xs font-bold text-zinc-600 uppercase tracking-widest">
            Overall Score
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          {/* Big score */}
          <div
            className={`text-7xl font-black bg-linear-to-br ${grade.gradient} bg-clip-text text-transparent leading-none tracking-tighter`}
          >
            {percentage}%
          </div>

          {/* Grade badge */}
          <span className={`text-xs font-bold px-3 py-1 rounded-full border ${grade.badge}`}>
            {grade.label}
          </span>

          {/* Progress bar */}
          <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full bg-linear-to-r ${grade.bar} transition-all duration-700 ease-in-out`}
              style={{ width: `${percentage}%` }}
            />
          </div>

          <p className="text-xs text-zinc-600 font-medium">
            {totalScore} / 5.0 across 7 dimensions
          </p>

          {/* Toxicity badge */}
          {isToxic && (
            <div className="w-full flex items-center gap-2 rounded-xl bg-rose-500/10 border border-rose-500/20 px-3 py-2 mt-1">
              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
              <p className="text-xs text-rose-400 font-medium">
                Toxic content detected in this prompt.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Assessment summary */}
      {summary && (
        <Card
          className="w-full max-w-sm bg-zinc-900/50 border border-white/8 backdrop-blur-sm rounded-xl p-4"
          style={{ gap: 0 }}
        >
          <CardHeader className="pb-3 pt-0 px-0">
            <CardTitle className="text-xs font-bold text-zinc-600 uppercase tracking-widest">
              Assessment Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0 pb-0 pt-0">
            <p className="text-sm text-zinc-400 leading-relaxed">{summary}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
