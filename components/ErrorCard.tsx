"use client";

import { AlertTriangle, Coins, RefreshCw, ServerCrash } from "lucide-react";
import { motion } from "motion/react";

interface ErrorCardProps {
  isQuotaError: boolean;
  message?: string;
  onRetry?: () => void;
}

export default function ErrorCard({ isQuotaError, message, onRetry }: ErrorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-lg mx-auto mt-10 px-4"
    >
      <div
        className={`rounded-2xl border p-6 shadow-lg flex flex-col items-center text-center gap-4 ${
          isQuotaError
            ? "border-amber-200 bg-amber-50"
            : "border-red-200 bg-red-50"
        }`}
      >
        {/* Icon */}
        <div
          className={`flex items-center justify-center w-14 h-14 rounded-full ${
            isQuotaError ? "bg-amber-100" : "bg-red-100"
          }`}
        >
          {isQuotaError ? (
            <Coins className="w-7 h-7 text-amber-600" />
          ) : (
            <ServerCrash className="w-7 h-7 text-red-600" />
          )}
        </div>

        {/* Title */}
        <div>
          <h3
            className={`text-lg font-semibold ${
              isQuotaError ? "text-amber-800" : "text-red-800"
            }`}
          >
            {isQuotaError ? "API Quota Exceeded" : "Something Went Wrong"}
          </h3>
          <p
            className={`mt-1 text-sm leading-relaxed ${
              isQuotaError ? "text-amber-700" : "text-red-700"
            }`}
          >
            {isQuotaError
              ? "You've run out of API tokens for the Gemini model. The free tier has usage limits. Please wait a moment and try again, or check your Google AI Studio quota."
              : (message ?? "An unexpected error occurred while evaluating your prompt. Please try again.")}
          </p>
        </div>

        {/* Alert detail for quota */}
        {isQuotaError && (
          <div className="w-full rounded-xl bg-amber-100 border border-amber-200 px-4 py-3 flex items-start gap-3 text-left">
            <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
            <p className="text-xs text-amber-700 leading-relaxed">
              <strong>Free tier limit reached.</strong> Google Gemini&apos;s free API has per-minute and
              per-day rate limits. Wait 60 seconds and try again, or upgrade your Google AI Studio plan.
            </p>
          </div>
        )}

        {/* Retry button */}
        {onRetry && (
          <button
            onClick={onRetry}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              isQuotaError
                ? "bg-amber-600 hover:bg-amber-700 text-white"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        )}
      </div>
    </motion.div>
  );
}
