"use client";

import { useState } from "react";
import Link from "next/link";
import { listeningExamSets } from "@/data/listening";
import { useRandomIndex } from "@/hooks/useRandomIndex";
import { useExamScore } from "@/hooks/useExamScore";
import { useExamTimer } from "@/hooks/useExamTimer";
import ExamTimer from "@/components/ExamTimer";
import ListeningExercise from "@/components/ListeningExercise";
import WeakSpots, { type QuestionResult } from "@/components/WeakSpots";
import LessonView from "@/components/LessonView";
import { type PatternGroup } from "@/components/PatternTips";

const TIPS: PatternGroup[] = [
  {
    title: "Strategy — Before Listening",
    emoji: "📋",
    color: "green",
    patterns: [
      { label: "Read questions first", template: "Read the tasks BEFORE you listen to the audio.", example: "Read: 'When does the train leave?' → then listen specifically for a time." },
      { label: "Keywords", template: "Highlight key words in the question: Who? What? When? Where?", example: "Question: 'Where is the cheese?' → keyword: location (aisle, shelf, next to...)" },
      { label: "Scan all options", template: "Quickly look at all answer choices (a, b, c) before listening.", example: "If all options are times → listen especially for numbers." },
    ],
  },
  {
    title: "Part 1 — Short Dialogues (Multiple Choice)",
    emoji: "💬",
    color: "blue",
    patterns: [
      { label: "Numbers & times", template: "Pay attention to numbers, times, prices — they're often the answer.", example: "'at 2:32 PM' / 'costs €18.50' / 'aisle 3'" },
      { label: "Distraction", template: "The first answer mentioned is often wrong — listen for the last piece of information.", example: "First they say 3 PM, then correct: 'No, at 4 PM.'" },
      { label: "Who says what?", template: "Listen to who is speaking — seller? customer? That matters for the answer.", example: "Question: 'What does Mr. Klein do?' → only Mr. Klein's statements count." },
    ],
  },
  {
    title: "Part 2 — Announcements (True / False)",
    emoji: "📢",
    color: "yellow",
    patterns: [
      { label: "Read carefully", template: "False = the announcement says it DIFFERENTLY — even if it sounds similar.", example: "'one hour earlier' ≠ 'two hours earlier' → false!" },
      { label: "Watch out: numbers", template: "Pay attention to differences in numbers, days, and times.", example: "Track 7 ≠ Track 17 / 10 minutes ≠ 10 o'clock" },
      { label: "Only in the announcement?", template: "The statement must come directly from the audio — don't guess!", example: "If the audio only says '1 hour earlier' → '2 hours earlier' is FALSE." },
    ],
  },
  {
    title: "Part 3 — Voicemail Messages (Multiple Choice)",
    emoji: "📱",
    color: "orange",
    patterns: [
      { label: "Who's calling?", template: "Listen first: Who is speaking? What is the message about?", example: "'this is Tanja' → friend / 'this is the doctor's office' → health" },
      { label: "Main information", template: "The most important information usually comes at the beginning or end.", example: "'Please call me back!' → action required from the listener" },
      { label: "Negation", template: "Watch for NOT: 'not at 3 PM, but at 4:30 PM'", example: "'does not start at 3 PM' → 3 PM is the WRONG answer!" },
    ],
  },
  {
    title: "🆘 When you don't know the answer",
    emoji: "🆘",
    color: "purple",
    patterns: [
      { label: "Guess!",          template: "No point deductions for wrong answers in Listening — always pick something.", example: "If unsure, choose the option you heard most often." },
      { label: "Elimination",     template: "Cross out answers you can DEFINITELY rule out.", example: "You hear 'cheese' and 'milk' → option a (bread) is out." },
      { label: "Use context",     template: "Use the setting: Where are the people? What are they buying/doing?", example: "Supermarket dialogue → answers relate to products or locations." },
    ],
  },
];

export default function ListeningPage() {
  const [mode, setMode] = useState<"lesson" | "exam">("lesson");
  const [setIdx, setSetIdx] = useRandomIndex(listeningExamSets.length);
  const parts = listeningExamSets[setIdx];
  const { scores, save } = useExamScore();
  const [partScores, setPartScores] = useState<(number | null)[]>([null, null, null]);
  const [allResults, setAllResults] = useState<QuestionResult[]>([]);
  const [sessionSaved, setSessionSaved] = useState(false);
  const timer = useExamTimer(20, false);

  const nextSet = () => {
    setSetIdx((i) => (i + 1) % listeningExamSets.length);
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
    return <LessonView groups={TIPS} sectionName="Listening (Hören)" accent="green" onStart={() => { setMode("exam"); timer.start(); }} />;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1 flex-wrap">
          <span className="text-2xl">🎧</span>
          <h1 className="text-2xl font-bold text-gray-900">Hören</h1>
          <span className="text-xs font-semibold bg-green-100 text-green-700 rounded-full px-3 py-1">15 Punkte · 20 Minuten</span>
          <ExamTimer {...timer} onStart={timer.start} onPause={timer.pause} onReset={timer.reset} />
          <button
            onClick={nextSet}
            className="ml-auto flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-green-400 text-green-700 text-xs font-semibold hover:bg-green-50 transition-colors"
          >
            🔀 Neues Übungsset <span className="text-green-400">({setIdx + 1}/{listeningExamSets.length})</span>
          </button>
        </div>
        <p className="text-gray-500 text-sm mt-1">
          Der Prüfungsteil <strong>Hören</strong> hat drei Aufgaben (15 Fragen). Hören Sie die Texte und kreuzen Sie die richtige Antwort an.
        </p>
        <div className="mt-3 flex gap-2 text-xs">
          {parts.map((p) => (
            <a key={p.part} href={`#hoeren-teil-${p.part}`}
              className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold hover:bg-green-200 transition-colors">
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
            <div key={idx} className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors ${done ? "bg-green-50 border-green-300 text-green-700" : "bg-gray-50 border-gray-200 text-gray-400"}`}>
              <span>{done ? "✅" : `${idx + 1}.`}</span>
              <span className="truncate">{p.taskLabel}</span>
              {done && <span className="font-bold whitespace-nowrap">{partScores[idx]}/{p.questions.length}</span>}
            </div>
          );
        })}
      </div>

      <div className="space-y-10">
        {parts.map((p, idx) => (
          <div key={`${setIdx}-${p.part}`} id={`hoeren-teil-${p.part}`}>
            <ListeningExercise part={p} onSubmit={(earned, total, results) => handlePartScore(idx, earned, results)} />
          </div>
        ))}
      </div>

      {allResults.length > 0 && <WeakSpots results={allResults} />}

      {allPartsScored && !sessionSaved && (
        <div className="mt-8 rounded-xl border border-green-300 bg-green-50 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-bold text-green-800">Hören abgeschlossen — {sectionEarned} / {sectionTotal} Punkte</p>
            <p className="text-sm text-green-700 mt-0.5">Speichere dein Ergebnis, um es in der Gesamtauswertung zu sehen.</p>
          </div>
          <button
            onClick={() => { save("hoeren", sectionEarned, sectionTotal); setSessionSaved(true); }}
            className="flex-shrink-0 px-5 py-2 rounded-lg bg-green-700 hover:bg-green-800 text-white text-sm font-semibold transition-colors"
          >
            Ergebnis speichern ✓
          </button>
        </div>
      )}
      {sessionSaved && (
        <div className="mt-8 rounded-xl border border-green-300 bg-green-50 p-6 text-center">
          <div className="text-4xl mb-2">✅</div>
          <p className="font-bold text-green-800 text-lg">Hören abgeschlossen!</p>
          <p className="text-green-700 text-sm mt-1">{scores.hoeren.earned} / {scores.hoeren.total} Punkte gespeichert</p>
          <p className="text-gray-500 text-sm mt-2">Wähle deinen nächsten Prüfungsteil auf der Startseite.</p>
          <Link href="/" className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-semibold transition-colors">
            ← Zurück zur Startseite
          </Link>
        </div>
      )}
    </div>
  );
}
