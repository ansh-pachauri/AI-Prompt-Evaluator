import axios, { AxiosError } from "axios";
import { EvaluationCriteria } from "@/src/types/types";

export class QuotaExceededError extends Error {
  constructor(message = "API quota exceeded") {
    super(message);
    this.name = "QuotaExceededError";
  }
}

export default async function getApiData(prompt: string): Promise<EvaluationCriteria> {
  try {
    const response = await axios.post("/api/prompt-evaluator", { prompt });
    return response.data;
  } catch (error) {
    const axiosErr = error as AxiosError<{ error: string; code?: string }>;
    const status = axiosErr.response?.status;
    const code = axiosErr.response?.data?.code;

    if (status === 429 || code === "QUOTA_EXCEEDED") {
      throw new QuotaExceededError(
        axiosErr.response?.data?.error ?? "API quota exceeded. Please try again later."
      );
    }

    console.error(error);
    throw error;
  }
}
