"use client";

import { useState } from "react";
import ExamSummary from "@/components/ExamSummary";
import type { ExamScores } from "@/hooks/useExamScore";

const PASSED_SCORES: ExamScores = {
  lesen:     { earned: 13, total: 15, completed: true },
  hoeren:    { earned: 12, total: 15, completed: true },
  schreiben: { earned: 11, total: 15, completed: true },
  sprechen:  { earned: 18, total: 25, completed: true },
};

const FAILED_SCORES: ExamScores = {
  lesen:     { earned: 6,  total: 15, completed: true },
  hoeren:    { earned: 11, total: 15, completed: true },
  schreiben: { earned: 5,  total: 15, completed: true },
  sprechen:  { earned: 10, total: 25, completed: true },
};

export default function PreviewResultsPage() {
  const [show, setShow] = useState<"passed" | "failed" | null>(null);

  return (
    <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Ergebnis-Vorschau</h1>
      <p className="text-gray-500 text-sm">Preview both result screens without completing the exam.</p>
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => setShow("passed")}
          className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors"
        >
          🏆 Bestanden-Ansicht
        </button>
        <button
          onClick={() => setShow("failed")}
          className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-colors"
        >
          💪 Nicht bestanden-Ansicht
        </button>
      </div>

      {show && (
        <ExamSummary
          scores={show === "passed" ? PASSED_SCORES : FAILED_SCORES}
          onReset={() => setShow(null)}
        />
      )}
    </div>
  );
}
