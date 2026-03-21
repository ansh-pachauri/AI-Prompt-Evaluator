"use client";

import { useIsFetching, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import EvaluatePrompt from "@/components/EvaluatePrompt";
import { DonutChartLegend } from "@/components/DonutChartLegend";
import EvaluationDescription from "@/components/EvaluationDiscription";
import { LoaderOne } from "@/components/ui/loader";
import DiscriptionPage from "@/components/DiscriptionPage";
import ErrorCard from "@/components/ErrorCard";
import NoCreditsCard from "@/components/NoCreditsCard";
import CreditsExpiredModal from "@/components/CreditsExpiredModal";
import { QuotaExceededError } from "@/lib/GetApiData";
import { useCredits } from "@/lib/CreditsContext";

export default function DashboardClient() {
  const queryClient = useQueryClient();
  const isFetching = useIsFetching({ queryKey: ["prompt-evaluator"] });
  const { hasCredits } = useCredits();
  const [hasData, setHasData] = useState(false);
  const [queryError, setQueryError] = useState<Error | null>(null);

  useEffect(() => {
    const data = queryClient.getQueryData(["prompt-evaluator"]);
    const state = queryClient.getQueryState(["prompt-evaluator"]);
    setHasData(Boolean(data));
    setQueryError(state?.error as Error | null ?? null);
  }, [queryClient, isFetching]);

  const isQuotaError = queryError instanceof QuotaExceededError;

  const handleRetry = () => {
    queryClient.removeQueries({ queryKey: ["prompt-evaluator"] });
    setQueryError(null);
    setHasData(false);
  };

  return (
    <>
      <CreditsExpiredModal />
      <main className="flex-1">
        <EvaluatePrompt />
        {isFetching ? (
          <div className="flex justify-center items-center py-28">
            <div className="flex flex-col items-center gap-5">
              <LoaderOne />
              <div className="flex flex-col items-center gap-1">
                <p className="text-zinc-100 font-semibold text-sm">
                  Analyzing your prompt
                </p>
                <p className="text-zinc-500 text-xs">This may take a moment…</p>
              </div>
            </div>
          </div>
        ) : queryError ? (
          <ErrorCard
            isQuotaError={isQuotaError}
            message={queryError.message}
            onRetry={handleRetry}
          />
        ) : hasData ? (
          <DonutChartLegend />
        ) : !hasCredits ? (
          <NoCreditsCard />
        ) : (
          <DiscriptionPage />
        )}
        <EvaluationDescription />
      </main>
    </>
  );
}
