"use client";

import { motion, AnimatePresence } from "motion/react";
import { Zap, X, Mail, Copy, Check } from "lucide-react";
import { useCredits } from "@/lib/CreditsContext";
import { useState, useEffect } from "react";

const AUTHOR_EMAIL = "anshpachauri303@gmail.com";

export default function CreditsExpiredModal() {
  const { showExpiredModal, dismissModal } = useCredits();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!showExpiredModal) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismissModal();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [showExpiredModal, dismissModal]);

  useEffect(() => {
    document.body.style.overflow = showExpiredModal ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showExpiredModal]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(AUTHOR_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {showExpiredModal && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={dismissModal}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 pointer-events-none"
          >
            <div className="pointer-events-auto w-full max-w-md">
              {/* Gradient border wrapper */}
              <div className="rounded-2xl p-[1px] bg-linear-to-br from-violet-500 to-fuchsia-500 shadow-[0_0_60px_rgba(139,92,246,0.25)]">
                <div className="rounded-2xl bg-zinc-950 overflow-hidden relative">
                  {/* Close button */}
                  <button
                    onClick={dismissModal}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-zinc-200 transition-all cursor-pointer z-10"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Content */}
                  <div className="p-8 flex flex-col items-center text-center gap-5">
                    {/* Icon */}
                    <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-violet-500 to-fuchsia-600 shadow-[0_0_32px_rgba(139,92,246,0.35)]">
                      <Zap className="w-8 h-8 text-white" />
                    </div>

                    {/* Heading */}
                    <div>
                      <h2 className="text-xl font-semibold tracking-tight text-zinc-50">
                        You&apos;re out of credits
                      </h2>
                      <p className="mt-2 text-sm text-zinc-500 leading-relaxed max-w-xs mx-auto">
                        You&apos;ve used all your free evaluations. Reach out to the author
                        for more credits or to collaborate.
                      </p>
                    </div>

                    {/* Divider */}
                    <div className="w-full h-px bg-white/8" />

                    {/* Contact section */}
                    <div className="w-full flex flex-col gap-3">
                      <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest">
                        Contact the author
                      </p>

                      {/* Email card */}
                      <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-zinc-900 border border-white/8">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-violet-500/15 shrink-0">
                            <Mail className="w-4 h-4 text-violet-400" />
                          </div>
                          <span className="text-sm font-medium text-zinc-300 truncate">
                            {AUTHOR_EMAIL}
                          </span>
                        </div>
                        <button
                          onClick={handleCopy}
                          className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                            copied
                              ? "bg-emerald-500/15 text-emerald-400"
                              : "bg-violet-500/15 text-violet-400 hover:bg-violet-500/25"
                          }`}
                        >
                          {copied ? (
                            <><Check className="w-3 h-3" />Copied!</>
                          ) : (
                            <><Copy className="w-3 h-3" />Copy</>
                          )}
                        </button>
                      </div>

                      {/* Golden CTA */}
                      <a
                        href={`mailto:${AUTHOR_EMAIL}?subject=Prompt Evaluator — More Credits Request`}
                        className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-linear-to-r from-amber-400 to-orange-500 text-white text-sm font-semibold hover:from-amber-500 hover:to-orange-600 transition-all shadow-[0_0_20px_rgba(251,191,36,0.2)] cursor-pointer"
                      >
                        <Mail className="w-4 h-4" />
                        Request More Credits
                      </a>
                    </div>

                    {/* Dismiss */}
                    <button
                      onClick={dismissModal}
                      className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors cursor-pointer"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
