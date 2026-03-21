"use client";

import { motion } from "motion/react";
import { Sparkles, ScanText, Lightbulb, BarChart3 } from "lucide-react";

const features = [
  {
    icon: ScanText,
    title: "7-Dimension Analysis",
    description:
      "Scores your prompt across Groundedness, Fluency, Conciseness, Tonality, Relevance, Intent Match, and Reference Alignment.",
    iconBg: "from-violet-500 to-fuchsia-600",
  },
  {
    icon: BarChart3,
    title: "Visual Score Breakdown",
    description:
      "Interactive donut chart showing per-dimension scores at a glance so you instantly see where your prompt is strong or weak.",
    iconBg: "from-violet-500 to-purple-600",
  },
  {
    icon: Lightbulb,
    title: "Actionable Suggestions",
    description:
      "Prioritized improvement tips with expected impact — not just what's wrong, but exactly how to fix it.",
    iconBg: "from-amber-400 to-orange-500",
  },
  {
    icon: Sparkles,
    title: "Improved Prompt",
    description:
      "Receive a rewritten, optimized version of your prompt that you can copy and use immediately.",
    iconBg: "from-emerald-400 to-teal-500",
  },
];

export default function DiscriptionPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto px-4 sm:px-6 mt-2 mb-20"
    >
      {/* Hero */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-violet-500 to-fuchsia-600 mb-6 shadow-[0_0_32px_rgba(139,92,246,0.3)]">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold text-zinc-50 mb-4 tracking-tight leading-[1.15]">
          Is your prompt{" "}
          <span className="bg-linear-to-r from-violet-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
            doing its job?
          </span>
        </h1>
        <p className="text-zinc-500 text-base leading-relaxed max-w-md mx-auto">
          Paste any prompt and get an instant AI-powered quality report —
          scores, visual analysis, and a ready-to-use improved version.
        </p>
      </div>

      {/* Feature grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {features.map(({ icon: Icon, title, description, iconBg }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 * i }}
            className="rounded-xl border border-white/8 bg-zinc-900/50 backdrop-blur-sm p-5 hover:border-white/15 hover:bg-zinc-900/80 transition-all duration-200 cursor-default"
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`flex items-center justify-center w-9 h-9 rounded-xl bg-linear-to-br ${iconBg} shadow-md shrink-0`}
              >
                <Icon className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-semibold text-zinc-100 text-sm tracking-tight">
                {title}
              </h3>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed">{description}</p>
          </motion.div>
        ))}
      </div>

      {/* How to use */}
      <div className="mt-4 rounded-xl border border-white/8 bg-zinc-900/50 backdrop-blur-sm p-6">
        <h2 className="text-xs font-bold text-zinc-600 uppercase tracking-widest mb-5">
          How it works
        </h2>
        <ol className="space-y-4">
          {[
            "Type or paste your prompt in the input box above.",
            'Click "Evaluate" or press Ctrl+Enter.',
            "Review your scores, suggestions, and the improved prompt.",
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-4 text-sm">
              <span className="shrink-0 w-6 h-6 rounded-full bg-linear-to-br from-violet-500 to-fuchsia-600 text-white text-xs flex items-center justify-center font-bold mt-0.5 shadow-[0_0_10px_rgba(139,92,246,0.3)]">
                {i + 1}
              </span>
              <span className="text-zinc-400 font-medium pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </motion.div>
  );
}
