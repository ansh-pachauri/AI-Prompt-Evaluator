"use client";

import { Sparkles, Mail, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const AUTHOR_EMAIL = "anshpachauri303@gmail.com";

export default function NoCreditsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="max-w-lg mx-auto mt-10 px-6"
    >
      <div className="rounded-3xl border border-slate-200 bg-white shadow-xl overflow-hidden">
        {/* Gradient top bar */}
        <div className="h-1.5 w-full bg-linear-to-r from-indigo-500 via-violet-500 to-fuchsia-500" />

        <div className="p-8 flex flex-col items-center text-center gap-6">
          {/* Icon */}
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-200">
            <Sparkles className="w-7 h-7 text-white" />
          </div>

          {/* Copy */}
          <div>
            <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-2">
              Free tier limit reached
            </p>
            <h3 className="text-2xl font-black tracking-tight text-slate-900 leading-tight">
              You&apos;ve unlocked the full experience.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-500 max-w-sm mx-auto">
              Your free credits have been used. Prompt Evaluator is actively growing — reach out to the founder directly to get more credits and stay in the loop on what&apos;s coming next.
            </p>
          </div>

          <div className="w-full h-px bg-slate-100" />

          {/* Contact CTA */}
          <div className="w-full flex flex-col gap-3">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Get more credits
            </p>

            <a
              href={`mailto:${AUTHOR_EMAIL}?subject=Prompt Evaluator — Requesting More Credits`}
              className="w-full flex items-center justify-between gap-3 px-5 py-4 rounded-2xl bg-linear-to-r from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-200 hover:from-indigo-600 hover:to-violet-700 transition-all group"
            >
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 shrink-0" />
                <div className="text-left">
                  <p className="text-sm font-bold leading-tight">Contact the Founder</p>
                  <p className="text-xs text-indigo-200 mt-0.5">{AUTHOR_EMAIL}</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
