"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

const TOTAL_CREDITS = 2;
const STORAGE_KEY = "prompt_eval_credits";

interface CreditsContextValue {
  credits: number;
  totalCredits: number;
  hasCredits: boolean;
  showExpiredModal: boolean;
  dismissModal: () => void;
  useCredit: () => void;
}

const CreditsContext = createContext<CreditsContextValue | null>(null);

export function CreditsProvider({ children }: { children: React.ReactNode }) {
  const [credits, setCredits] = useState<number>(TOTAL_CREDITS);
  const [showExpiredModal, setShowExpiredModal] = useState(false);

  // Hydrate from localStorage once on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) {
      const parsed = parseInt(stored, 10);
      setCredits(isNaN(parsed) ? TOTAL_CREDITS : Math.max(0, Math.min(parsed, TOTAL_CREDITS)));
    }
  }, []);

  const useCredit = useCallback(() => {
    setCredits((prev) => {
      const next = Math.max(0, prev - 1);
      localStorage.setItem(STORAGE_KEY, String(next));
      if (next === 0) setShowExpiredModal(true);
      return next;
    });
  }, []);

  const dismissModal = useCallback(() => setShowExpiredModal(false), []);

  return (
    <CreditsContext.Provider
      value={{ credits, totalCredits: TOTAL_CREDITS, hasCredits: credits > 0, showExpiredModal, dismissModal, useCredit }}
    >
      {children}
    </CreditsContext.Provider>
  );
}

export function useCredits(): CreditsContextValue {
  const ctx = useContext(CreditsContext);
  if (!ctx) throw new Error("useCredits must be used inside CreditsProvider");
  return ctx;
}
