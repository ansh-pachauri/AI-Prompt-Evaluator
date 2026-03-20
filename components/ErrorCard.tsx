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
      className="max-w-lg mx-auto mt-10 px-6"
    >
      <div
        className={`rounded-2xl border p-8 shadow-md flex flex-col items-center text-center gap-5 ${
          isQuotaError
            ? "border-amber-200 bg-amber-50"
            : "border-rose-200 bg-rose-50"
        }`}
      >
        {/* Icon */}
        <div
          className={`flex items-center justify-center w-14 h-14 rounded-2xl shadow-md ${
            isQuotaError
              ? "bg-linear-to-br from-amber-400 to-orange-500 shadow-amber-200"
              : "bg-linear-to-br from-rose-500 to-pink-600 shadow-rose-200"
          }`}
        >
          {isQuotaError ? (
            <Coins className="w-6 h-6 text-white" />
          ) : (
            <ServerCrash className="w-6 h-6 text-white" />
          )}
        </div>

        {/* Title */}
        <div>
          <h3
            className={`text-lg font-bold tracking-tight ${
              isQuotaError ? "text-amber-900" : "text-rose-900"
            }`}
          >
            {isQuotaError ? "API Quota Exceeded" : "Something Went Wrong"}
          </h3>
          <p
            className={`mt-2 text-sm leading-relaxed max-w-sm ${
              isQuotaError ? "text-amber-700" : "text-rose-700"
            }`}
          >
            {isQuotaError
              ? "You've run out of API tokens for the Gemini model. The free tier has usage limits. Please wait a moment and try again."
              : (message ?? "An unexpected error occurred while evaluating your prompt. Please try again.")}
          </p>
        </div>

        {/* Detail block for quota */}
        {isQuotaError && (
          <div className="w-full rounded-xl bg-amber-100 border border-amber-200 px-4 py-3 flex items-start gap-3 text-left">
            <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
            <p className="text-xs text-amber-700 leading-relaxed">
              <strong>Free tier limit reached.</strong> Google Gemini&apos;s
              free API has per-minute and per-day rate limits. Wait 60 seconds
              and try again, or upgrade your Google AI Studio plan.
            </p>
          </div>
        )}

        {/* Retry button */}
        {onRetry && (
          <button
            onClick={onRetry}
            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm ${
              isQuotaError
                ? "bg-amber-500 hover:bg-amber-600 text-white shadow-amber-200"
                : "bg-rose-500 hover:bg-rose-600 text-white shadow-rose-200"
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
