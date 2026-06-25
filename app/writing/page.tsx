"use client";

import { useState } from "react";
import Link from "next/link";
import { writingExamSets } from "@/data/writing";
import { useExamScore } from "@/hooks/useExamScore";
import { useExamTimer } from "@/hooks/useExamTimer";
import ExamTimer from "@/components/ExamTimer";
import WritingPart1 from "@/components/WritingPart1";
import WritingPart2 from "@/components/WritingPart2";
import LessonView from "@/components/LessonView";
import { type PatternGroup } from "@/components/PatternTips";

const TIPS: PatternGroup[] = [
  {
    title: "Part 1 — Fill in the Form",
    emoji: "📝",
    color: "yellow",
    patterns: [
      { label: "Copy, don't rephrase", template: "Write the information EXACTLY as it appears in the profile — no own words.", example: "Profile: 'Austrian' → Form: 'Austrian' ✓ (not 'Austria')" },
      { label: "Watch the format", template: "Date: DD.MM.YYYY / Phone: include area code / Name: capitalized", example: "14.07.1988 ✓ / 14 July 1988 ✗ (wrong format)" },
      { label: "Fill in completely", template: "Leave no field empty — all 5 fields must be filled in.", example: "Even if an item seems obvious, write it in." },
    ],
  },
  {
    title: "Part 2 — Write an Email (~30 words)",
    emoji: "📧",
    color: "orange",
    patterns: [
      { label: "Greeting",   template: "Dear [Name], (informal) / Dear Sir or Madam, (formal)",                example: "Dear Peter, / Dear Maria, / Dear Sir or Madam," },
      { label: "Thank",      template: "Thank you very much for [noun]. / Thanks for your [thing].",            example: "Thank you for the invitation. / Thanks for your message." },
      { label: "Decline",    template: "Unfortunately I can't [come / attend] because [reason].",               example: "Unfortunately I can't come because I have to work." },
      { label: "Suggestion", template: "Can we meet [time]? / How about [alternative]?",                       example: "Can we meet on Friday? / How about Wednesday?" },
      { label: "Request",    template: "I would like to [infinitive]. / Could you please [infinitive]?",        example: "I'd like to view the room. / Could you please reply?" },
      { label: "Closing",    template: "Best regards, [Name] (informal) / Yours sincerely, [Name] (formal)",   example: "Best regards, Maria / Yours sincerely, Mr. Mendez" },
    ],
  },
  {
    title: "Address all 3 points",
    emoji: "✅",
    color: "green",
    patterns: [
      { label: "Point 1",       template: "Start with the first point — often: say thank you or explain the situation.", example: "Thank you for the invitation." },
      { label: "Point 2",       template: "Second sentence: the main content (decline, request, explanation).",          example: "Unfortunately I can't come because I'm sick." },
      { label: "Point 3",       template: "Third sentence: a question or suggestion — something that expects a reply.",  example: "Can we meet next week?" },
      { label: "Word count",    template: "Write approximately 30 words — 25–40 words is acceptable.",                  example: "Too short (under 20 words) loses points. Too long is fine." },
    ],
  },
  {
    title: "🆘 When you don't know what to write",
    emoji: "🆘",
    color: "purple",
    patterns: [
      { label: "Standard decline",    template: "Unfortunately I can't come because I have to [reason].",          example: "...because I have to work. / ...because I have an appointment." },
      { label: "Standard reason",     template: "I have to [activity]. / I'm sick. / I have an appointment.",     example: "I have to visit my family. / I'm unfortunately sick." },
      { label: "Standard suggestion", template: "Can we meet [timeframe], maybe on [day of the week]?",           example: "Can we meet next week, maybe on Monday?" },
      { label: "Standard request",    template: "When are you / is your free time? I'm free [timeframe].",        example: "I'm free next week. When works for you?" },
    ],
  },
];

export default function WritingPage() {
  const [mode, setMode] = useState<"lesson" | "exam">("lesson");
  const [setIdx, setSetIdx] = useState(() => Math.floor(Math.random() * writingExamSets.length));
  const { part1, part2 } = writingExamSets[setIdx];
  const { scores, save } = useExamScore();
  const [partScores, setPartScores] = useState<(number | null)[]>([null, null]);
  const [sessionSaved, setSessionSaved] = useState(false);

  const timer = useExamTimer(20, false);
  const nextSet = () => { setSetIdx((i) => (i + 1) % writingExamSets.length); setPartScores([null, null]); setSessionSaved(false); timer.reset(); };

  const handlePartScore = (idx: number, earned: number, outOf: number) => {
    const scaled = idx === 0
      ? Math.round((earned / outOf) * part1.points)
      : earned;
    setPartScores((prev) => { const next = [...prev]; next[idx] = scaled; return next; });
    setSessionSaved(false);
  };

  const sectionEarned = partScores.reduce<number>((a, s) => a + (s ?? 0), 0);
  const sectionTotal = part1.points + part2.points;
  const allPartsScored = partScores.every((s) => s !== null);

  if (mode === "lesson") {
    return <LessonView groups={TIPS} sectionName="Writing (Schreiben)" accent="yellow" onStart={() => { setMode("exam"); timer.start(); }} />;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1 flex-wrap">
          <span className="text-2xl">✏️</span>
          <h1 className="text-2xl font-bold text-gray-900">Schreiben</h1>
          <span className="text-xs font-semibold bg-yellow-100 text-yellow-700 rounded-full px-3 py-1">15 Punkte · 20 Minuten</span>
          <ExamTimer {...timer} />
          <button
            onClick={nextSet}
            className="ml-auto flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-yellow-400 text-yellow-700 text-xs font-semibold hover:bg-yellow-50 transition-colors"
          >
            🔀 Neues Übungsset <span className="text-yellow-500">({setIdx + 1}/{writingExamSets.length})</span>
          </button>
        </div>
        <p className="text-gray-500 text-sm mt-1">
          Der Prüfungsteil <strong>Schreiben</strong> hat zwei Aufgaben: ein Formular ausfüllen und eine kurze E-Mail schreiben.
        </p>
        <div className="mt-3 flex gap-2 text-xs">
          <a href="#schreiben-teil-1" className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-semibold hover:bg-yellow-200 transition-colors">Aufgabe 1</a>
          <a href="#schreiben-teil-2" className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-semibold hover:bg-yellow-200 transition-colors">Aufgabe 2</a>
        </div>
      </div>

      {/* Part progress tracker */}
      <div className="mb-6 flex flex-wrap gap-2">
        {[{ label: "Aufgabe 1 — Formular", pts: part1.points }, { label: "Aufgabe 2 — E-Mail", pts: part2.points }].map((p, idx) => {
          const done = partScores[idx] !== null;
          return (
            <div key={idx} className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors ${done ? "bg-yellow-50 border-yellow-300 text-yellow-700" : "bg-gray-50 border-gray-200 text-gray-400"}`}>
              <span>{done ? "✅" : `${idx + 1}.`}</span>
              <span>{p.label}</span>
              {done && <span className="font-bold whitespace-nowrap">{partScores[idx]}/{p.pts}</span>}
            </div>
          );
        })}
      </div>

      <div className="space-y-10">
        <div id="schreiben-teil-1" key={`${setIdx}-1`}>
          <WritingPart1 data={part1} onSubmit={(earned, total) => handlePartScore(0, earned, total)} />
        </div>
        <div id="schreiben-teil-2" key={`${setIdx}-2`}>
          <WritingPart2 data={part2} onSubmit={(earned) => handlePartScore(1, earned, 10)} />
        </div>
      </div>

      {allPartsScored && !sessionSaved && (
        <div className="mt-8 rounded-xl border border-yellow-300 bg-yellow-50 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-bold text-yellow-800">Schreiben abgeschlossen — {sectionEarned} / {sectionTotal} Punkte</p>
            <p className="text-sm text-yellow-700 mt-0.5">Speichere dein Ergebnis, um es in der Gesamtauswertung zu sehen.</p>
          </div>
          <button
            onClick={() => { save("schreiben", sectionEarned, sectionTotal); setSessionSaved(true); }}
            className="flex-shrink-0 px-5 py-2 rounded-lg bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-semibold transition-colors"
          >
            Ergebnis speichern ✓
          </button>
        </div>
      )}
      {sessionSaved && (
        <div className="mt-8 rounded-xl border border-green-300 bg-green-50 p-6 text-center">
          <div className="text-4xl mb-2">✅</div>
          <p className="font-bold text-green-800 text-lg">Schreiben abgeschlossen!</p>
          <p className="text-green-700 text-sm mt-1">{scores.schreiben.earned} / {scores.schreiben.total} Punkte gespeichert</p>
          <p className="text-gray-500 text-sm mt-2">Wähle deinen nächsten Prüfungsteil auf der Startseite.</p>
          <Link href="/" className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-semibold transition-colors">
            ← Zurück zur Startseite
          </Link>
        </div>
      )}
    </div>
  );
}
