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
      className="max-w-lg mx-auto mt-10 px-4 sm:px-6"
    >
      {/* Gradient border wrapper */}
      <div className="rounded-2xl p-[1px] bg-linear-to-br from-violet-500 to-fuchsia-500 shadow-[0_0_40px_rgba(139,92,246,0.2)]">
        <div className="rounded-2xl bg-zinc-950 overflow-hidden">
          <div className="p-8 flex flex-col items-center text-center gap-6">
            {/* Icon */}
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-violet-500 to-fuchsia-600 shadow-[0_0_32px_rgba(139,92,246,0.3)]">
              <Sparkles className="w-7 h-7 text-white" />
            </div>

            {/* Copy */}
            <div>
              <p className="text-xs font-bold text-violet-400 uppercase tracking-widest mb-2">
                Free tier limit reached
              </p>
              <h3 className="text-xl font-semibold tracking-tight text-zinc-50 leading-tight">
                You&apos;ve unlocked the full experience.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-500 max-w-sm mx-auto">
                Your free credits have been used. Reach out to the founder directly
                to get more credits and stay in the loop on what&apos;s coming next.
              </p>
            </div>

            <div className="w-full h-px bg-white/8" />

            {/* Contact CTA */}
            <div className="w-full flex flex-col gap-3">
              <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest">
                Get more credits
              </p>

              <a
                href={`mailto:${AUTHOR_EMAIL}?subject=Prompt Evaluator — Requesting More Credits`}
                className="w-full flex items-center justify-between gap-3 px-5 py-4 rounded-xl bg-linear-to-r from-amber-400 to-orange-500 text-white shadow-[0_0_20px_rgba(251,191,36,0.2)] hover:from-amber-500 hover:to-orange-600 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 shrink-0" />
                  <div className="text-left">
                    <p className="text-sm font-bold leading-tight">Contact the Founder</p>
                    <p className="text-xs text-amber-100/70 mt-0.5">{AUTHOR_EMAIL}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
