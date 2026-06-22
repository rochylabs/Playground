"use client";

import { useState, useCallback } from "react";

export type SectionKey = "lesen" | "hoeren" | "schreiben" | "sprechen";

export interface SectionResult {
  earned: number;
  total: number;
  completed: boolean;
}

export type ExamScores = Record<SectionKey, SectionResult>;

const STORAGE_KEY = "goethe-a1-exam-scores";

// Raw totals match the practice data; we scale to 100 in the summary.
export const SECTION_TOTALS: Record<SectionKey, number> = {
  lesen:     15,
  hoeren:    15,
  schreiben: 15,
  sprechen:  25,
};

// Goethe A1: 100 points total, each section worth 25 points, pass = 60%
export const GOETHE_SECTION_MAX = 25;
export const GOETHE_TOTAL_MAX   = 100;
export const GOETHE_PASS_PCT    = 0.60;

export function scaleToGoethe(earned: number, rawTotal: number): number {
  return Math.round((earned / rawTotal) * GOETHE_SECTION_MAX);
}

export function gradeLabel(pct: number): string {
  if (pct >= 0.90) return "Sehr gut (90–100)";
  if (pct >= 0.80) return "Gut (80–89)";
  if (pct >= 0.70) return "Befriedigend (70–79)";
  if (pct >= 0.60) return "Ausreichend — Bestanden (60–69)";
  return "Nicht bestanden (unter 60)";
}

const DEFAULTS: ExamScores = {
  lesen:     { earned: 0, total: 15, completed: false },
  hoeren:    { earned: 0, total: 15, completed: false },
  schreiben: { earned: 0, total: 15, completed: false },
  sprechen:  { earned: 0, total: 25, completed: false },
};

function load(): ExamScores {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...DEFAULTS, ...JSON.parse(raw) } : DEFAULTS;
  } catch {
    return DEFAULTS;
  }
}

export function useExamScore() {
  const [scores, setScores] = useState<ExamScores>(() => {
    if (typeof window === "undefined") return DEFAULTS;
    return load();
  });

  const save = useCallback((section: SectionKey, earned: number, total: number) => {
    setScores((prev) => {
      const next = { ...prev, [section]: { earned, total, completed: true } };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setScores(DEFAULTS);
  }, []);

  const allDone = Object.values(scores).every((s) => s.completed);
  const totalEarned = Object.values(scores).reduce((a, s) => a + s.earned, 0);
  const totalPossible = Object.values(scores).reduce((a, s) => a + s.total, 0);

  return { scores, save, reset, allDone, totalEarned, totalPossible };
}
