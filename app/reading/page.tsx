"use client";

import { useState } from "react";
import Link from "next/link";
import { readingExamSets } from "@/data/reading";
import { useRandomIndex } from "@/hooks/useRandomIndex";
import { useExamScore } from "@/hooks/useExamScore";
import { useExamTimer } from "@/hooks/useExamTimer";
import ExamTimer from "@/components/ExamTimer";
import ReadingExercise from "@/components/ReadingExercise";
import WeakSpots, { type QuestionResult } from "@/components/WeakSpots";
import LessonView from "@/components/LessonView";
import { type PatternGroup } from "@/components/PatternTips";

const TIPS: PatternGroup[] = [
  {
    title: "General Strategy",
    emoji: "📋",
    color: "blue",
    patterns: [
      { label: "Read questions first", template: "Read the statements/tasks FIRST, then read the text.", example: "That way you know exactly what to look for as you read." },
      { label: "Keywords", template: "Underline key words in the statement and scan for them in the text.", example: "Statement: 'three days' → look for date references in the text." },
      { label: "Trap: similar words", template: "Watch out! Similar words ≠ same meaning.", example: "'one hour earlier' in the text ≠ 'two hours earlier' in the statement → FALSE" },
    ],
  },
  {
    title: "Part 1 — True / False (short texts)",
    emoji: "✅",
    color: "green",
    patterns: [
      { label: "True = stated in the text", template: "Only mark True if it is EXACTLY stated in the text — don't guess.", example: "Text: 'until 2:00 PM' → Statement: 'all day long' → FALSE" },
      { label: "Compare numbers", template: "Compare numbers, days, times, and amounts precisely.", example: "'March 3–5' = 3 days ✓ / 'due to a celebration' when text says 'renovations' → ✗" },
      { label: "Negation", template: "Watch for 'not', 'no', 'unfortunately' — they completely change the meaning.", example: "'Children are NOT allowed alone' ≠ 'Children are allowed alone'" },
    ],
  },
  {
    title: "Part 2 — Matching (Ads a–f)",
    emoji: "🔗",
    color: "yellow",
    patterns: [
      { label: "Person → Ad", template: "Read about the person: What are they looking for? When are they free? What do they need?", example: "Pedro works during the day → look for evening class → Ad a (6:30 PM)" },
      { label: "Option X", template: "If no ad fits → write X. Each ad can only be used once (except X).", example: "Looking for a sports trainer? No matching ad → X" },
      { label: "Check all details", template: "Check ALL details: price, time, location, topic.", example: "Anna wants to cook on SATURDAYS → Saturday class ✓ / Monday class ✗" },
    ],
  },
  {
    title: "Part 3 — True / False (longer text / email)",
    emoji: "📧",
    color: "orange",
    patterns: [
      { label: "One paragraph per question", template: "Each statement usually refers to a specific section of the text.", example: "Statement 1 → introduction, Statement 2 → paragraph 2, etc." },
      { label: "Watch out: 'almost correct'", template: "Statements can be 'almost correct' — one wrong detail makes them FALSE.", example: "Text: 'rides a bicycle' → Statement: 'takes the subway' → FALSE" },
      { label: "Not in text = false", template: "If the information is not mentioned in the text → it cannot be 'true'.", example: "Text doesn't mention a dog → 'She has a dog' → FALSE" },
    ],
  },
  {
    title: "🆘 When you don't know the answer",
    emoji: "🆘",
    color: "purple",
    patterns: [
      { label: "Always answer",        template: "Never leave an answer blank — even if unsure, mark something.", example: "No point deductions for wrong answers in Reading!" },
      { label: "50/50 on True/False",  template: "For True/False: if unsure, choose False — statements are often worded too extremely to be true.", example: "'always', 'never', 'all' in a statement → usually FALSE" },
      { label: "Matching: eliminate",  template: "For Part 2: cross out ads you've already matched to narrow down choices.", example: "Ad b = Pedro → ad b can't be used for any other question." },
    ],
  },
];

export default function ReadingPage() {
  const [mode, setMode] = useState<"lesson" | "exam">("lesson");
  const [setIdx, setSetIdx] = useRandomIndex(readingExamSets.length);
  const parts = readingExamSets[setIdx].parts;
  const { scores, save } = useExamScore();
  const [partScores, setPartScores] = useState<(number | null)[]>([null, null, null]);
  const [allResults, setAllResults] = useState<QuestionResult[]>([]);
  const [sessionSaved, setSessionSaved] = useState(false);
  const timer = useExamTimer(25, false);

  const nextSet = () => {
    setSetIdx((i) => (i + 1) % readingExamSets.length);
    setPartScores([null, null, null]);
    setAllResults([]);
    setSessionSaved(false);
    timer.reset();
  };

  const handlePartScore = (idx: number, earned: number, results: QuestionResult[]) => {
    setPartScores((prev) => { const next = [...prev]; next[idx] = earned; return next; });
    setAllResults((prev) => [...prev, ...results]);
    setSessionSaved(false);
  };

  const sectionTotal = parts.reduce((a, p) => a + p.questions.length, 0);
  const sectionEarned = partScores.reduce<number>((a, s) => a + (s ?? 0), 0);
  const allPartsScored = partScores.every((s) => s !== null);

  if (mode === "lesson") {
    return <LessonView groups={TIPS} sectionName="Reading (Lesen)" accent="blue" onStart={() => { setMode("exam"); timer.start(); }} />;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1 flex-wrap">
          <span className="text-2xl">📖</span>
          <h1 className="text-2xl font-bold text-gray-900">Lesen</h1>
          <span className="text-xs font-semibold bg-blue-100 text-blue-700 rounded-full px-3 py-1">15 Punkte · 25 Minuten</span>
          <ExamTimer {...timer} onStart={timer.start} onPause={timer.pause} onReset={timer.reset} />
          <button
            onClick={nextSet}
            className="ml-auto flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-blue-400 text-blue-700 text-xs font-semibold hover:bg-blue-50 transition-colors"
          >
            🔀 Neues Übungsset <span className="text-blue-400">({setIdx + 1}/{readingExamSets.length})</span>
          </button>
        </div>
        <p className="text-gray-500 text-sm mt-1">
          Der Prüfungsteil <strong>Lesen</strong> hat drei Aufgaben (15 Fragen). Lesen Sie die Texte und lösen Sie die Aufgaben.
        </p>
        <div className="mt-3 flex gap-2 text-xs">
          {parts.map((p) => (
            <a key={p.part} href={`#lesen-teil-${p.part}`}
              className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold hover:bg-blue-200 transition-colors">
              {p.taskLabel}
            </a>
          ))}
        </div>
      </div>

      {/* Part progress tracker */}
      <div className="mb-6 flex flex-wrap gap-2">
        {parts.map((p, idx) => {
          const done = partScores[idx] !== null;
          return (
            <div key={idx} className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors ${done ? "bg-blue-50 border-blue-300 text-blue-700" : "bg-gray-50 border-gray-200 text-gray-400"}`}>
              <span>{done ? "✅" : `${idx + 1}.`}</span>
              <span>{p.taskLabel}</span>
              {done && <span className="font-bold whitespace-nowrap">{partScores[idx]}/{p.questions.length}</span>}
            </div>
          );
        })}
      </div>

      <div className="space-y-10">
        {parts.map((p, idx) => (
          <div key={`${setIdx}-${p.part}`} id={`lesen-teil-${p.part}`}>
            <ReadingExercise part={p} onSubmit={(earned, total, results) => handlePartScore(idx, earned, results)} />
          </div>
        ))}
      </div>

      {allResults.length > 0 && <WeakSpots results={allResults} />}

      {allPartsScored && !sessionSaved && (
        <div className="mt-8 rounded-xl border border-blue-300 bg-blue-50 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-bold text-blue-800">Lesen abgeschlossen — {sectionEarned} / {sectionTotal} Punkte</p>
            <p className="text-sm text-blue-700 mt-0.5">Speichere dein Ergebnis, um es in der Gesamtauswertung zu sehen.</p>
          </div>
          <button
            onClick={() => { save("lesen", sectionEarned, sectionTotal); setSessionSaved(true); }}
            className="flex-shrink-0 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors"
          >
            Ergebnis speichern ✓
          </button>
        </div>
      )}
      {sessionSaved && (
        <div className="mt-8 rounded-xl border border-green-300 bg-green-50 p-6 text-center">
          <div className="text-4xl mb-2">✅</div>
          <p className="font-bold text-green-800 text-lg">Lesen abgeschlossen!</p>
          <p className="text-green-700 text-sm mt-1">{scores.lesen.earned} / {scores.lesen.total} Punkte gespeichert</p>
          <p className="text-gray-500 text-sm mt-2">Wähle deinen nächsten Prüfungsteil auf der Startseite.</p>
          <Link href="/" className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-semibold transition-colors">
            ← Zurück zur Startseite
          </Link>
        </div>
      )}
    </div>
  );
}
