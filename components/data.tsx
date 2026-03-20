"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";

interface EvalScore {
  score: number;
}

interface ChartDataPoint {
  name: string;
  value: number;
}

export interface ImprovementSuggestion {
  issue: string;
  suggestion: string;
  expectedImpact: string;
  priority: "low" | "medium" | "high";
}

interface OverAllAssessment {
  totalScore: number;
  summary: string;
}

interface EvaluationObject {
  toxicity?: { isToxic: boolean };
  overAllAssessment?: OverAllAssessment;
  improvementSuggestions?: ImprovementSuggestion[];
  improvedPrompt?: string;
  [key: string]: EvalScore | OverAllAssessment | ImprovementSuggestion[] | string | { isToxic: boolean } | undefined;
}

interface CachedData {
  evaluation: {
    evaluation: EvaluationObject;
  };
}

function getChartData(evalObject: EvaluationObject): ChartDataPoint[] {
  const excludedKeys = [
    "toxicity",
    "overAllAssessment",
    "improvementSuggestions",
    "improvedPrompt",
  ];

  return Object.keys(evalObject)
    .filter((key) => !excludedKeys.includes(key))
    .map((key) => {
      const value = evalObject[key];
      const score =
        value && typeof value === "object" && "score" in value
          ? (value as EvalScore).score
          : 0;
      return {
        name: key.replace(/([A-Z])/g, " $1").toUpperCase().trim(),
        value: score,
      };
    });
}

export function useDonutChartData() {
  const queryClient = useQueryClient();
  const cachedData = queryClient.getQueryData<CachedData>(["prompt-evaluator"]);

  const result = useMemo(() => {
    if (!cachedData) {
      return {
        chartData: [],
        totalScore: 0,
        summary: "",
        improvedPrompt: "",
        improvedSuggestions: "",
        rawSuggestions: [] as ImprovementSuggestion[],
        isToxic: false,
      };
    }

    const evalObject = cachedData.evaluation.evaluation;
    const chartData = getChartData(evalObject);
    const totalScore = evalObject.overAllAssessment?.totalScore ?? 0;
    const summary = evalObject.overAllAssessment?.summary ?? "";
    const improvedPrompt = evalObject.improvedPrompt ?? "";
    const rawSuggestions: ImprovementSuggestion[] = (evalObject.improvementSuggestions ?? []) as ImprovementSuggestion[];
    const isToxic = evalObject.toxicity?.isToxic ?? false;

    // Legacy formatted string (kept for backward compat)
    const improvedSuggestions = rawSuggestions
      .map((item, index) => `${index + 1}. ${item.issue}\n   Suggestion: ${item.suggestion}`)
      .join("\n\n");

    return { chartData, totalScore, summary, improvedPrompt, improvedSuggestions, rawSuggestions, isToxic };
  }, [cachedData]);

  return result;
}
