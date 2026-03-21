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
      className="max-w-lg mx-auto mt-10 px-4 sm:px-6"
    >
      <div
        className={`rounded-xl border p-8 flex flex-col items-center text-center gap-5 backdrop-blur-sm ${
          isQuotaError
            ? "border-amber-500/20 bg-amber-500/5"
            : "border-rose-500/20 bg-rose-500/5"
        }`}
      >
        {/* Icon */}
        <div
          className={`flex items-center justify-center w-14 h-14 rounded-2xl ${
            isQuotaError
              ? "bg-linear-to-br from-amber-400 to-orange-500 shadow-[0_0_20px_rgba(251,191,36,0.2)]"
              : "bg-linear-to-br from-rose-500 to-pink-600 shadow-[0_0_20px_rgba(244,63,94,0.2)]"
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
            className={`text-lg font-semibold tracking-tight ${
              isQuotaError ? "text-amber-300" : "text-rose-300"
            }`}
          >
            {isQuotaError ? "API Quota Exceeded" : "Something Went Wrong"}
          </h3>
          <p
            className={`mt-2 text-sm leading-relaxed max-w-sm ${
              isQuotaError ? "text-amber-500/80" : "text-rose-500/80"
            }`}
          >
            {isQuotaError
              ? "The AI API has hit its usage limits. The free tier has rate limits. Please wait a moment and try again."
              : (message ?? "An unexpected error occurred while evaluating your prompt. Please try again.")}
          </p>
        </div>

        {/* Detail block for quota */}
        {isQuotaError && (
          <div className="w-full rounded-xl bg-amber-500/8 border border-amber-500/15 px-4 py-3 flex items-start gap-3 text-left">
            <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
            <p className="text-xs text-amber-400/80 leading-relaxed">
              <strong>Free tier rate limit.</strong> The AI API&apos;s free tier has
              per-minute and per-day rate limits. Wait 60 seconds and try again.
            </p>
          </div>
        )}

        {/* Retry */}
        {onRetry && (
          <button
            onClick={onRetry}
            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              isQuotaError
                ? "bg-amber-500/15 text-amber-300 hover:bg-amber-500/25 border border-amber-500/20"
                : "bg-rose-500/15 text-rose-300 hover:bg-rose-500/25 border border-rose-500/20"
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
