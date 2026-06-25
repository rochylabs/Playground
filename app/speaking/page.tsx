"use client";

import { useState } from "react";
import Link from "next/link";
import { speakingExamSets } from "@/data/speaking";
import { useRandomIndex } from "@/hooks/useRandomIndex";
import { useExamScore } from "@/hooks/useExamScore";
import { useExamTimer } from "@/hooks/useExamTimer";
import ExamTimer from "@/components/ExamTimer";
import { SpeakingPart1, SpeakingPart2, SpeakingPart3 } from "@/components/SpeakingCard";
import LessonView from "@/components/LessonView";
import { type PatternGroup } from "@/components/PatternTips";

const TIPS: PatternGroup[] = [
  {
    title: "Part 1 — Self-Introduction",
    emoji: "🙋",
    color: "red",
    patterns: [
      { label: "Name",      template: "My name is [Name]. / I'm [Name].",                                  example: "My name is Maria Reyes." },
      { label: "Origin",    template: "I'm from [Country / City].",                                         example: "I'm from the Philippines, from Manila." },
      { label: "Where you live", template: "I live in [City]. / I've been living in [City] for [time].", example: "I've been living in Berlin for a year." },
      { label: "Job",       template: "I am a [job]. / I work as a [job].",                                example: "I'm a teacher. / I work as an engineer." },
      { label: "Languages", template: "I speak [language] and I'm learning [language].",                   example: "I speak English and I'm learning German." },
      { label: "Hobbies",   template: "In my free time I [verb + activity].",                              example: "In my free time I play guitar." },
    ],
  },
  {
    title: "Part 2 — Asking Questions (Topic + Keyword)",
    emoji: "❓",
    color: "orange",
    patterns: [
      { label: "What?",       template: "What is your [keyword]?",                              example: "What is your favourite food?" },
      { label: "How?",        template: "How do you [verb] [keyword]?",                         example: "How do you get to work?" },
      { label: "Where?",      template: "Where do you [verb] [keyword]?",                       example: "Where do you like to live?" },
      { label: "Do you have?",template: "Do you have [keyword]?",                               example: "Do you have siblings?" },
      { label: "Do you like?",template: "What do you like most about [context]?",               example: "Which city do you like the most?" },
      { label: "Do you do?",  template: "Do you [keyword]?",                                    example: "Do you do sport?" },
    ],
  },
  {
    title: "Part 3 — Making a Request",
    emoji: "🙏",
    color: "blue",
    patterns: [
      { label: "Can you...?",     template: "Can you / Could you please [infinitive]?",         example: "Could you lend me a pen, please?" },
      { label: "May I...?",       template: "May I please [infinitive]?",                       example: "May I use your phone for a moment, please?" },
      { label: "I'd like...",     template: "I'd like [object], please.",                       example: "I'd like a glass of water, please." },
      { label: "Do you have...?", template: "Do you have [object] for me?",                    example: "Do you have a dictionary for me?" },
      { label: "Help",            template: "Could you help me, please? I [problem].",          example: "Could you help me, please? I'm looking for the train station." },
    ],
  },
  {
    title: "Part 3 — Prohibited (explaining what's not allowed)",
    emoji: "🚫",
    color: "red",
    patterns: [
      { label: "That's forbidden",   template: "I'm sorry, that's unfortunately not allowed here.",            example: "I'm sorry, that's unfortunately not allowed here." },
      { label: "You can't...",        template: "You're not allowed to [infinitive] here.",                    example: "You're not allowed to smoke here." },
      { label: "Not permitted",       template: "That's unfortunately not permitted here.",                    example: "Photography is unfortunately not permitted here." },
      { label: "Please + sign",       template: "Please read the sign — [what] is forbidden here.",           example: "Please read the sign — smoking is forbidden here." },
      { label: "Combination",         template: "I'm sorry, but you're not allowed to [infinitive] here. [Explanation].", example: "I'm sorry, but you're not allowed to eat here. This is the quiet zone." },
    ],
  },
  {
    title: "Part 3 — Responding to a Request",
    emoji: "💬",
    color: "green",
    patterns: [
      { label: "Yes, of course",  template: "Yes, of course. / Sure! Here you go.",                          example: "Yes, of course! Here's my pen." },
      { label: "No problem",      template: "No problem. / I'm happy to help.",                               example: "No problem. I'll watch your bag for a moment." },
      { label: "Unfortunately no",template: "I'm sorry, that's unfortunately not possible because [reason].", example: "I'm sorry, I don't have a charger with me." },
      { label: "Alternative",     template: "That's not possible, but [alternative].",                        example: "That's not possible, but you can take room 302." },
    ],
  },
  {
    title: "🆘 When you don't know / don't understand",
    emoji: "🆘",
    color: "purple",
    patterns: [
      { label: "I don't understand",   template: "Excuse me, I don't quite understand. Could you repeat that, please?", example: "Could you say that more slowly, please?" },
      { label: "I'm not sure",         template: "I'm not sure, but I think [answer].",                               example: "I'm not sure, but I think that's a café." },
      { label: "In the picture I see", template: "In the picture I can see [person / place / object].",               example: "In the picture I can see a person in a restaurant." },
      { label: "I think",              template: "I think this is [place / situation]. Maybe ...",                    example: "I think this is a supermarket. Maybe the person is buying food." },
      { label: "How do you say?",      template: "How do you say [word] in German?",                                  example: "How do you say 'ticket' in German?" },
      { label: "Once more please",     template: "Could you say that again, please? / Pardon?",                       example: "Pardon? I didn't understand that." },
    ],
  },
];

const SPEAKING_PARTS = [
  { label: "Teil 1 – Sich vorstellen", max: 8 },
  { label: "Teil 2 – Thema & Fragen",  max: 8 },
  { label: "Teil 3 – Bitten & Reagieren", max: 9 },
];
const SELF_RATINGS = [
  { label: "Sehr gut", pct: 1.0,  emoji: "🌟" },
  { label: "Gut",      pct: 0.75, emoji: "😊" },
  { label: "OK",       pct: 0.55, emoji: "😐" },
  { label: "Schwach",  pct: 0.35, emoji: "😓" },
];

export default function SpeakingPage() {
  const [mode, setMode] = useState<"lesson" | "exam">("lesson");
  const [setIdx, setSetIdx] = useRandomIndex(speakingExamSets.length);
  const { part1, part2, part3 } = speakingExamSets[setIdx];
  const { scores, save } = useExamScore();
  const [partRatings, setPartRatings] = useState<(number | null)[]>([null, null, null]);
  const [sessionSaved, setSessionSaved] = useState(false);

  const timer = useExamTimer(15, false);
  const nextSet = () => { setSetIdx((i) => (i + 1) % speakingExamSets.length); setPartRatings([null, null, null]); setSessionSaved(false); timer.reset(); };

  const sectionEarned = partRatings.reduce<number>((a, r, i) => a + (r !== null ? Math.round(SPEAKING_PARTS[i].max * r) : 0), 0);
  const sectionTotal = SPEAKING_PARTS.reduce((a, p) => a + p.max, 0);
  const allRated = partRatings.every((r) => r !== null);

  if (mode === "lesson") {
    return <LessonView groups={TIPS} sectionName="Speaking (Sprechen)" accent="red" onStart={() => { setMode("exam"); timer.start(); }} />;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1 flex-wrap">
          <span className="text-2xl">🎤</span>
          <h1 className="text-2xl font-bold text-gray-900">Sprechen</h1>
          <span className="text-xs font-semibold bg-red-100 text-red-700 rounded-full px-3 py-1">25 Punkte · 15 Minuten</span>
          <ExamTimer {...timer} onStart={timer.start} onPause={timer.pause} onReset={timer.reset} />
          <button
            onClick={nextSet}
            className="ml-auto flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-red-400 text-red-700 text-xs font-semibold hover:bg-red-50 transition-colors"
          >
            🔀 Neues Übungsset <span className="text-red-400">({setIdx + 1}/{speakingExamSets.length})</span>
          </button>
        </div>
        <p className="text-gray-500 text-sm mt-1">
          Der Prüfungsteil <strong>Sprechen</strong> hat drei Aufgaben. Lesen Sie jede Karte laut vor und vergleichen Sie mit der Musterlösung.
        </p>
        <div className="mt-3 flex gap-2 text-xs">
          <a href="#sprechen-teil-1" className="px-3 py-1 rounded-full bg-red-100 text-red-700 font-semibold hover:bg-red-200 transition-colors">Aufgabe 1</a>
          <a href="#sprechen-teil-2" className="px-3 py-1 rounded-full bg-red-100 text-red-700 font-semibold hover:bg-red-200 transition-colors">Aufgabe 2</a>
          <a href="#sprechen-teil-3" className="px-3 py-1 rounded-full bg-red-100 text-red-700 font-semibold hover:bg-red-200 transition-colors">Aufgabe 3</a>
        </div>
      </div>

      <div className="space-y-10">
        <div id="sprechen-teil-1" key={`${setIdx}-1`}><SpeakingPart1 data={part1} /></div>
        <div id="sprechen-teil-2" key={`${setIdx}-2`}><SpeakingPart2 data={part2} /></div>
        <div id="sprechen-teil-3" key={`${setIdx}-3`}><SpeakingPart3 data={part3} /></div>
      </div>

      {!sessionSaved && (
        <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-5 space-y-4">
          <p className="font-bold text-red-800">Selbstbewertung — Wie gut hast du gesprochen?</p>
          <p className="text-sm text-red-700">Vergleiche deine Antworten mit den Musterlösungen und bewerte dich ehrlich.</p>
          {SPEAKING_PARTS.map((sp, idx) => (
            <div key={idx}>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">{sp.label} (max. {sp.max} Pkt.)</p>
              <div className="flex flex-wrap gap-2">
                {SELF_RATINGS.map((r) => {
                  const pts = Math.round(sp.max * r.pct);
                  const selected = partRatings[idx] === r.pct;
                  return (
                    <button key={r.label}
                      onClick={() => setPartRatings((prev) => { const next = [...prev]; next[idx] = r.pct; return next; })}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-semibold transition-colors ${
                        selected ? "bg-red-100 border-red-500 text-red-800" : "border-gray-300 text-gray-600 hover:border-red-400 hover:bg-red-50"
                      }`}
                    >
                      {r.emoji} {r.label} ({pts} Pkt.)
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          {allRated && (
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-red-200">
              <p className="font-bold text-red-800">Gesamt: {sectionEarned} / {sectionTotal} Punkte</p>
              <button
                onClick={() => { save("sprechen", sectionEarned, sectionTotal); setSessionSaved(true); }}
                className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors"
              >
                Ergebnis speichern ✓
              </button>
            </div>
          )}
        </div>
      )}
      {sessionSaved && (
        <div className="mt-8 rounded-xl border border-green-300 bg-green-50 p-6 text-center">
          <div className="text-4xl mb-2">✅</div>
          <p className="font-bold text-green-800 text-lg">Sprechen abgeschlossen!</p>
          <p className="text-green-700 text-sm mt-1">{scores.sprechen.earned} / {scores.sprechen.total} Punkte gespeichert</p>
          <p className="text-gray-500 text-sm mt-2">Wähle deinen nächsten Prüfungsteil auf der Startseite.</p>
          <Link href="/" className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-semibold transition-colors">
            ← Zurück zur Startseite
          </Link>
        </div>
      )}
    </div>
  );
}
