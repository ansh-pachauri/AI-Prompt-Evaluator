"use client";

import { useDonutChartData } from "./data";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ShieldAlert } from "lucide-react";

function getGrade(pct: number): { label: string; color: string } {
  if (pct >= 80) return { label: "Excellent", color: "text-emerald-600" };
  if (pct >= 60) return { label: "Good", color: "text-green-600" };
  if (pct >= 40) return { label: "Fair", color: "text-amber-600" };
  if (pct >= 20) return { label: "Poor", color: "text-orange-600" };
  return { label: "Needs Work", color: "text-red-600" };
}

export default function TotalScore() {
  const { totalScore, summary, isToxic } = useDonutChartData();
  const percentage = Math.round((totalScore / 5) * 100);
  const isLow = percentage < 40;
  const grade = getGrade(percentage);

  return (
    <div className="flex flex-col gap-4 mt-6">
      <Card className="w-full max-w-sm bg-white border border-gray-200 shadow-lg rounded-2xl p-4 hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-lg font-semibold text-gray-800 tracking-wide">
            Overall Score
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-3">
          {/* Big score */}
          <div
            className={`text-6xl font-extrabold bg-linear-to-r bg-clip-text text-transparent ${
              isLow
                ? "from-red-500 to-orange-400"
                : "from-green-500 to-emerald-400"
            }`}
          >
            {percentage}%
          </div>

          {/* Grade label */}
          <span className={`text-sm font-semibold ${grade.color}`}>
            {grade.label}
          </span>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ease-in-out ${
                isLow
                  ? "bg-linear-to-r from-red-500 to-orange-400"
                  : "bg-linear-to-r from-green-500 to-emerald-400"
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>

          <p className="text-xs text-gray-400 font-medium">
            Score: {totalScore} / 5.0 across 7 criteria
          </p>

          {/* Toxicity badge */}
          {isToxic && (
            <div className="w-full flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 px-3 py-2 mt-1">
              <ShieldAlert className="w-4 h-4 text-red-500 shrink-0" />
              <p className="text-xs text-red-700 font-medium">
                Toxic content detected in this prompt.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary card */}
      {summary && (
        <Card className="w-full max-w-sm bg-white border border-gray-200 shadow-sm rounded-2xl p-4">
          <CardHeader className="pb-2 pt-0 px-0">
            <CardTitle className="text-sm font-semibold text-gray-700">
              Assessment Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <p className="text-sm text-gray-600 leading-relaxed">{summary}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
