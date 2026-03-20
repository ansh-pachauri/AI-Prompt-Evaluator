"use client";

import { motion, AnimatePresence } from "motion/react";
import { Zap, X, Mail, Copy, Check } from "lucide-react";
import { useCredits } from "@/lib/CreditsContext";
import { useState, useEffect } from "react";

const AUTHOR_EMAIL = "anshpachauri303@gmail.com";

export default function CreditsExpiredModal() {
  const { showExpiredModal, dismissModal } = useCredits();
  const [copied, setCopied] = useState(false);

  // Close on Escape key
  useEffect(() => {
    if (!showExpiredModal) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismissModal();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [showExpiredModal, dismissModal]);

  // Lock body scroll while open
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
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm"
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
              <div className="rounded-3xl bg-white shadow-2xl overflow-hidden">
                {/* Gradient header strip */}
                <div className="h-1.5 w-full bg-linear-to-r from-indigo-500 via-violet-500 to-fuchsia-500" />

                {/* Content */}
                <div className="p-8 flex flex-col items-center text-center gap-5">
                  {/* Close button */}
                  <button
                    onClick={dismissModal}
                    className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Icon */}
                  <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-200">
                    <Zap className="w-8 h-8 text-white" />
                  </div>

                  {/* Heading */}
                  <div>
                    <h2 className="text-xl font-black tracking-tight text-slate-900">
                      You&apos;re out of credits!
                    </h2>
                    <p className="mt-2 text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">
                      You&apos;ve used all your free evaluations. Enjoyed the tool? Reach out to the author for more credits or to collaborate.
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="w-full h-px bg-slate-100" />

                  {/* Contact section */}
                  <div className="w-full flex flex-col gap-3">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Contact the author
                    </p>

                    {/* Email card */}
                    <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-indigo-100 shrink-0">
                          <Mail className="w-4 h-4 text-indigo-600" />
                        </div>
                        <span className="text-sm font-medium text-slate-700 truncate">
                          {AUTHOR_EMAIL}
                        </span>
                      </div>
                      <button
                        onClick={handleCopy}
                        className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                          copied
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                        }`}
                      >
                        {copied ? (
                          <><Check className="w-3 h-3" />Copied!</>
                        ) : (
                          <><Copy className="w-3 h-3" />Copy</>
                        )}
                      </button>
                    </div>

                    {/* mailto CTA */}
                    <a
                      href={`mailto:${AUTHOR_EMAIL}?subject=Prompt Evaluator — More Credits Request`}
                      className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-linear-to-r from-indigo-500 to-violet-600 text-white text-sm font-semibold hover:from-indigo-600 hover:to-violet-700 transition-all shadow-md shadow-indigo-200"
                    >
                      <Mail className="w-4 h-4" />
                      Send Email
                    </a>
                  </div>

                  {/* Dismiss */}
                  <button
                    onClick={dismissModal}
                    className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
