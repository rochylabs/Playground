"use client";

import WeakSpots from "@/components/WeakSpots";
import type { QuestionResult } from "@/components/WeakSpots";

const STRONG_RESULTS: QuestionResult[] = [
  ...Array(5).fill({ questionType: "richtig-falsch",  correct: true }),
  ...Array(1).fill({ questionType: "richtig-falsch",  correct: false }),
  ...Array(8).fill({ questionType: "multiple-choice", correct: true }),
  ...Array(1).fill({ questionType: "multiple-choice", correct: false }),
  ...Array(4).fill({ questionType: "matching",        correct: true }),
  ...Array(1).fill({ questionType: "matching",        correct: false }),
];

const MIXED_RESULTS: QuestionResult[] = [
  ...Array(3).fill({ questionType: "richtig-falsch",  correct: true }),
  ...Array(3).fill({ questionType: "richtig-falsch",  correct: false }),
  ...Array(7).fill({ questionType: "multiple-choice", correct: true }),
  ...Array(2).fill({ questionType: "multiple-choice", correct: false }),
  ...Array(2).fill({ questionType: "matching",        correct: true }),
  ...Array(3).fill({ questionType: "matching",        correct: false }),
];

const WEAK_RESULTS: QuestionResult[] = [
  ...Array(2).fill({ questionType: "richtig-falsch",  correct: true }),
  ...Array(4).fill({ questionType: "richtig-falsch",  correct: false }),
  ...Array(4).fill({ questionType: "multiple-choice", correct: true }),
  ...Array(5).fill({ questionType: "multiple-choice", correct: false }),
  ...Array(1).fill({ questionType: "matching",        correct: true }),
  ...Array(4).fill({ questionType: "matching",        correct: false }),
];

export default function PreviewWeakSpotsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10 space-y-10">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800">Schwachstellen-Vorschau</h1>
        <p className="text-gray-500 text-sm mt-1">Preview of all 3 weak spot states — strong, mixed, and weak performance.</p>
      </div>

      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-green-600 mb-2">State 1 — Strong performance (mostly correct)</p>
        <WeakSpots results={STRONG_RESULTS} />
      </div>

      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-yellow-600 mb-2">State 2 — Mixed performance</p>
        <WeakSpots results={MIXED_RESULTS} />
      </div>

      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-red-600 mb-2">State 3 — Weak performance (needs work)</p>
        <WeakSpots results={WEAK_RESULTS} />
      </div>
    </div>
  );
}
