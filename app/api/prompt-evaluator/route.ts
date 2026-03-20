
import { PromptEvaluator } from "@/src/config/evaluator";
import { NextResponse } from "next/server";

function isQuotaError(error: unknown): boolean {
  if (!error) return false;
  const msg = error instanceof Error ? error.message : String(error);
  const lower = msg.toLowerCase();
  return (
    lower.includes("quota") ||
    lower.includes("resource_exhausted") ||
    lower.includes("429") ||
    lower.includes("rate limit") ||
    lower.includes("too many requests") ||
    lower.includes("exhausted")
  );
}

export async function POST(request: Request) {
  const startedAt = Date.now();

  try {
    const { prompt } = await request.json();
    if (!prompt || typeof prompt !== "string") {
      console.warn("[prompt-evaluator] Invalid request — prompt missing or not a string");
      return NextResponse.json({ error: "Invalid prompt" }, { status: 400 });
    }

    console.log("[prompt-evaluator] Evaluation started", {
      promptLength: prompt.length,
      promptPreview: prompt.slice(0, 120) + (prompt.length > 120 ? "…" : ""),
      timestamp: new Date().toISOString(),
    });

    const evaluation = await PromptEvaluator(prompt);

    const durationMs = Date.now() - startedAt;
    const ev = evaluation.evaluation;

    console.log("[prompt-evaluator] Evaluation completed", {
      promptId: evaluation.promptId,
      durationMs,
      totalScore: ev.overAllAssessment.totalScore,
      scores: {
        groundedness: ev.groundedness.score,
        conciseness: ev.conciseness.score,
        fluency: ev.fluency.score,
        referenceAlignment: ev.referenceAlignment.score,
        tonality: ev.tonality.score,
        relevance: ev.relevance.score,
        intentMatch: ev.intentMatch.score,
      },
      isToxic: ev.toxicity.isToxic,
      suggestionCount: ev.improvementSuggestions.length,
      timestamp: new Date().toISOString(),
    });

    if (ev.toxicity.isToxic) {
      console.warn("[prompt-evaluator] Toxic prompt detected", {
        promptId: evaluation.promptId,
        promptPreview: prompt.slice(0, 120) + (prompt.length > 120 ? "…" : ""),
      });
    }

    return NextResponse.json({ evaluation }, { status: 200 });
  } catch (error) {
    const durationMs = Date.now() - startedAt;

    if (isQuotaError(error)) {
      console.warn("[prompt-evaluator] Quota exceeded", {
        durationMs,
        error: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString(),
      });
      return NextResponse.json(
        {
          error: "API quota exceeded. You have run out of API tokens. Please try again later.",
          code: "QUOTA_EXCEEDED",
        },
        { status: 429 }
      );
    }

    console.error("[prompt-evaluator] Evaluation failed", {
      durationMs,
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
