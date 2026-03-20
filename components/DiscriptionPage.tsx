"use client";

import { motion } from "motion/react";
import { Sparkles, ScanText, Lightbulb, BarChart3 } from "lucide-react";

const features = [
  {
    icon: ScanText,
    title: "7-Dimension Analysis",
    description:
      "Scores your prompt across Groundedness, Fluency, Conciseness, Tonality, Relevance, Intent Match, and Reference Alignment.",
    iconBg: "from-indigo-500 to-violet-600",
    shadow: "shadow-indigo-200",
  },
  {
    icon: BarChart3,
    title: "Visual Score Breakdown",
    description:
      "Interactive donut chart showing per-dimension scores at a glance so you instantly see where your prompt is strong or weak.",
    iconBg: "from-violet-500 to-purple-600",
    shadow: "shadow-violet-200",
  },
  {
    icon: Lightbulb,
    title: "Actionable Suggestions",
    description:
      "Prioritized improvement tips with expected impact — not just what's wrong, but exactly how to fix it.",
    iconBg: "from-amber-400 to-orange-500",
    shadow: "shadow-amber-200",
  },
  {
    icon: Sparkles,
    title: "Improved Prompt",
    description:
      "Receive a rewritten, optimized version of your prompt that you can copy and use immediately.",
    iconBg: "from-emerald-400 to-teal-500",
    shadow: "shadow-emerald-200",
  },
];

export default function DiscriptionPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto px-6 mt-2 mb-20"
    >
      {/* Hero */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 mb-6 shadow-xl shadow-indigo-200">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4 tracking-tight leading-[1.1]">
          Is your prompt
          <br />
          <span className="bg-gradient-to-r from-indigo-500 to-violet-600 bg-clip-text text-transparent">
            doing its job?
          </span>
        </h1>
        <p className="text-slate-500 text-base leading-relaxed max-w-md mx-auto">
          Paste any prompt and get an instant AI-powered quality report —
          scores, visual analysis, and a ready-to-use improved version.
        </p>
      </div>

      {/* Feature grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {features.map(({ icon: Icon, title, description, iconBg, shadow }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 * i }}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br ${iconBg} shadow-md ${shadow} shrink-0`}
              >
                <Icon className="w-4.5 h-4.5 text-white" />
              </div>
              <h3 className="font-semibold text-slate-800 text-sm tracking-tight">
                {title}
              </h3>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
          </motion.div>
        ))}
      </div>

      {/* How to use */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5">
          How it works
        </h2>
        <ol className="space-y-4">
          {[
            "Type or paste your prompt in the input box above.",
            'Click "Evaluate" or press Ctrl+Enter.',
            "Review your scores, suggestions, and the improved prompt.",
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-4 text-sm">
              <span className="shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white text-xs flex items-center justify-center font-bold mt-0.5 shadow-sm shadow-indigo-200">
                {i + 1}
              </span>
              <span className="text-slate-600 font-medium pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </motion.div>
  );
}
