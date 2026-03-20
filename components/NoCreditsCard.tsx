"use client";

import { Zap, Github } from "lucide-react";
import { motion } from "motion/react";

const TOTAL_CREDITS = 5;

export default function NoCreditsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-lg mx-auto mt-10 px-6"
    >
      <div className="rounded-2xl border border-violet-200 bg-gradient-to-b from-violet-50 to-white p-8 shadow-md flex flex-col items-center text-center gap-5">
        {/* Icon */}
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-md shadow-indigo-200">
          <Zap className="w-6 h-6 text-white" />
        </div>

        {/* Heading */}
        <div>
          <h3 className="text-lg font-bold tracking-tight text-slate-900">
            You&apos;ve used all {TOTAL_CREDITS} credits
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-500 max-w-xs">
            This demo app gives each visitor {TOTAL_CREDITS} free evaluations stored in your browser.
            You&apos;ve used them all — thanks for trying it out!
          </p>
        </div>

        {/* Credit dots */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: TOTAL_CREDITS }).map((_, i) => (
            <span
              key={i}
              className="w-3 h-3 rounded-full bg-slate-200"
            />
          ))}
        </div>

        {/* Info box */}
        <div className="w-full rounded-xl bg-violet-50 border border-violet-100 px-4 py-3 text-left">
          <p className="text-xs text-violet-700 leading-relaxed font-medium">
            Want to run unlimited evaluations? Clone the repo and add your own{" "}
            <code className="bg-violet-100 px-1 py-0.5 rounded text-[11px] font-mono">GOOGLE_API_KEY</code>{" "}
            — it&apos;s free on Google AI Studio.
          </p>
        </div>

        {/* CTA */}
        <a
          href="https://github.com/Alchemyst-ai/awesome-saas/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-slate-900 text-white hover:bg-slate-700 transition-colors shadow-sm"
        >
          <Github className="w-4 h-4" />
          View Source on GitHub
        </a>
      </div>
    </motion.div>
  );
}
