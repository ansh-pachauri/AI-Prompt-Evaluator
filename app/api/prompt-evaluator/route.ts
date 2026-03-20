
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
  try {
    const { prompt } = await request.json();
    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Invalid prompt" }, { status: 400 });
    }

    const evaluation = await PromptEvaluator(prompt);
    return NextResponse.json({ evaluation }, { status: 200 });
  } catch (error) {
    console.error("Error in prompt evaluator", error);

    if (isQuotaError(error)) {
      return NextResponse.json(
        {
          error: "API quota exceeded. You have run out of API tokens. Please try again later.",
          code: "QUOTA_EXCEEDED",
        },
        { status: 429 }
      );
    }

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
