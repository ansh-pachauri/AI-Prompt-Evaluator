"use client";

import { motion } from "motion/react";
import { Sparkles, ScanText, Lightbulb, BarChart3 } from "lucide-react";

const features = [
  {
    icon: ScanText,
    title: "7-Dimension Analysis",
    description: "Scores your prompt across Groundedness, Fluency, Conciseness, Tonality, Relevance, Intent Match, and Reference Alignment.",
  },
  {
    icon: BarChart3,
    title: "Visual Score Breakdown",
    description: "Interactive donut chart showing per-dimension scores at a glance so you instantly see where your prompt is strong or weak.",
  },
  {
    icon: Lightbulb,
    title: "Actionable Suggestions",
    description: "Prioritized improvement tips with expected impact — not just what's wrong, but exactly how to fix it.",
  },
  {
    icon: Sparkles,
    title: "Improved Prompt",
    description: "Receive a rewritten, optimized version of your prompt that you can copy and use immediately.",
  },
];

export default function DiscriptionPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto px-4 mt-4 mb-16"
    >
      {/* Hero */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-black mb-5">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-3">
          Is your prompt doing its job?
        </h1>
        <p className="text-slate-500 text-base leading-relaxed max-w-xl mx-auto">
          Paste any prompt and get an instant AI-powered quality report — scores, visual analysis, and a ready-to-use improved version.
        </p>
      </div>

      {/* Feature grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {features.map(({ icon: Icon, title, description }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * i }}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-slate-100">
                <Icon className="w-5 h-5 text-slate-700" />
              </div>
              <h3 className="font-semibold text-slate-800 text-sm">{title}</h3>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
          </motion.div>
        ))}
      </div>

      {/* How to use */}
      <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-3">
          How to use
        </h2>
        <ol className="space-y-2">
          {[
            "Type or paste your prompt in the input box above.",
            'Click "Evaluate" or press Ctrl+Enter.',
            "Review your scores, suggestions, and the improved prompt.",
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
              <span className="shrink-0 w-5 h-5 rounded-full bg-black text-white text-xs flex items-center justify-center font-semibold mt-0.5">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>
    </motion.div>
  );
}
