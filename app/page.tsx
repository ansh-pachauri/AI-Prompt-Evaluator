"use client";

import EvaluatePrompt from "@/components/EvaluatePrompt";
import { DonutChartLegend } from "@/components/DonutChartLegend";
import Header from "@/components/Header";
import EvaluationDescription from "@/components/EvaluationDiscription";
import Footer from "@/components/Footer";
import { useIsFetching, useQueryClient } from "@tanstack/react-query";
import { LoaderOne } from "@/components/ui/loader";
import { useState, useEffect } from "react";
import DiscriptionPage from "@/components/DiscriptionPage";
import ErrorCard from "@/components/ErrorCard";
import NoCreditsCard from "@/components/NoCreditsCard";
import CreditsExpiredModal from "@/components/CreditsExpiredModal";
import { QuotaExceededError } from "@/lib/GetApiData";
import { useCredits } from "@/lib/CreditsContext";

export default function Home() {
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
    <div className="min-h-screen flex flex-col bg-slate-50">
      <CreditsExpiredModal />
      <Header />
      <main className="flex-1">
        <EvaluatePrompt />
        {isFetching ? (
          <div className="flex justify-center items-center py-28">
            <div className="flex flex-col items-center gap-5">
              <LoaderOne />
              <div className="flex flex-col items-center gap-1">
                <p className="text-slate-800 font-semibold text-sm">
                  Analyzing your prompt
                </p>
                <p className="text-slate-400 text-xs">This may take a moment…</p>
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
      <Footer />
    </div>
  );
}
