"use client";

import { useState } from "react";
import Link from "next/link";
import { writingExamSets } from "@/data/writing";
import { useExamScore } from "@/hooks/useExamScore";
import { useExamTimer } from "@/hooks/useExamTimer";
import ExamTimer from "@/components/ExamTimer";
import WritingPart1 from "@/components/WritingPart1";
import WritingPart2 from "@/components/WritingPart2";
import TipsOverview from "@/components/TipsOverview";
import PartLesson, { type PartLessonContent } from "@/components/PartLesson";
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

const PART_LESSONS: PartLessonContent[] = [
  {
    partName: "Part 1 — Fill in the Form",
    intro: "In Part 1 you read a short profile text about a person and fill in 5 fields on a form. The rule is simple: copy exactly what you see. Don't rephrase, don't add extra words, and always use the right format.",
    tips: [TIPS[0]],
    workedExample: {
      setup: "Profile text:\n\"Mein Name ist Carlos Ruiz. Ich bin am 12. März 1990 in Madrid geboren. Ich wohne jetzt in Hamburg und meine Handynummer ist 0176 234567.\"",
      question: "Form field: \"Geburtsdatum:\" — What do you write?",
      steps: [
        "Find the field label: 'Geburtsdatum' means date of birth. You're looking for a date in the profile.",
        "Find the date in the text: '12. März 1990' — that's the birth date.",
        "Format it correctly: the form uses DD.MM.YYYY. 'März' = March = 03.",
        "Write: 12.03.1990 — exactly in that format. Don't write '12. März 1990' or 'March 12'.",
      ],
      answer: "12.03.1990 ✅ — Always convert month names to numbers and use dots as separators. The format matters — wrong format = wrong answer.",
    },
    tryIt: {
      setup: "Same profile text:\n\"Mein Name ist Carlos Ruiz. Ich bin am 12. März 1990 in Madrid geboren. Ich wohne jetzt in Hamburg und meine Handynummer ist 0176 234567.\"\n\nForm field: \"Wohnort:\"",
      question: "What do you write in the 'Wohnort' (place of residence) field?",
      options: ["Hamburg", "Madrid", "Hamburg, Deutschland"],
      answer: "Hamburg",
      hint: "Where does Carlos live NOW? Look for the verb 'wohne' (live) in the text. Is it Madrid or Hamburg?",
      explanation: "'Hamburg' ✅ — Carlos was BORN in Madrid, but he LIVES in Hamburg ('Ich wohne jetzt in Hamburg'). Don't confuse birthplace with current residence. Also: write only 'Hamburg', not 'Hamburg, Deutschland' — copy only what's in the text.",
    },
  },
  {
    partName: "Part 2 — Write an Email (~30 words)",
    intro: "In Part 2 you write a short email (around 30 words) responding to a situation. You must address 3 specific points. Use simple, clear sentences — one sentence per point is perfect.",
    tips: [TIPS[1], TIPS[2]],
    workedExample: {
      setup: "Task: Your friend invited you to their birthday party on Saturday. You can't come because you have to work. Suggest meeting next week instead.\n\nPoints to address:\n1. Thank for the invitation\n2. Decline with a reason\n3. Suggest an alternative",
      question: "Write the complete email (~30 words):",
      steps: [
        "Start with a greeting: 'Liebe/r [Name],' — use 'Liebe' for female, 'Lieber' for male names.",
        "Point 1 — Thank: 'Vielen Dank für die Einladung zu deiner Geburtstagsparty.'",
        "Point 2 — Decline + reason: 'Leider kann ich nicht kommen, weil ich arbeiten muss.' The 'weil' (because) structure is key.",
        "Point 3 — Suggest: 'Können wir uns nächste Woche treffen?' — a question that expects a reply.",
        "Close: 'Liebe Grüße, [Your Name]' — always end with a closing.",
      ],
      answer: "✅ Model email:\n\"Lieber Tom, vielen Dank für die Einladung zu deiner Geburtstagsparty. Leider kann ich nicht kommen, weil ich arbeiten muss. Können wir uns nächste Woche treffen? Liebe Grüße, Maria\"\n\n32 words — all 3 points covered.",
    },
    tryIt: {
      setup: "Task: A colleague invited you to lunch tomorrow. You can't make it (you have a doctor's appointment). Propose Thursday instead.\n\nPoint 2 is: Decline with a reason.",
      question: "Which sentence correctly handles Point 2 — decline with reason?",
      options: [
        "Leider kann ich nicht kommen, weil ich einen Arzttermin habe.",
        "Ich gehe morgen zum Arzt.",
        "Leider habe ich keine Zeit für Mittagessen.",
      ],
      answer: "Leider kann ich nicht kommen, weil ich einen Arzttermin habe.",
      hint: "A good decline sentence has two parts: 1) the decline itself ('Leider kann ich nicht kommen') and 2) the reason using 'weil' (because). Do all three options have both parts?",
      explanation: "✅ 'Leider kann ich nicht kommen, weil ich einen Arzttermin habe.' — this has both parts: the decline + the specific reason with 'weil'. Option 2 only states the reason without declining. Option 3 declines but the reason is vague ('keine Zeit'). Always use the 'Leider kann ich nicht... weil...' structure.",
    },
  },
];

type Phase = { stage: "overview" } | { stage: "lesson"; partIdx: number } | { stage: "exam"; partIdx: number };

export default function WritingPage() {
  const [phase, setPhase] = useState<Phase>({ stage: "overview" });
  const [setIdx, setSetIdx] = useState(() => Math.floor(Math.random() * writingExamSets.length));
  const { part1, part2 } = writingExamSets[setIdx];
  const { scores, save } = useExamScore();
  const [partScores, setPartScores] = useState<(number | null)[]>([null, null]);
  const [sessionSaved, setSessionSaved] = useState(false);
  const timer = useExamTimer(20, false);

  const nextSet = () => {
    setSetIdx((i) => (i + 1) % writingExamSets.length);
    setPartScores([null, null]);
    setSessionSaved(false);
    setPhase({ stage: "overview" });
    timer.reset();
  };

  const handlePartScore = (idx: number, earned: number, outOf: number) => {
    const scaled = idx === 0 ? Math.round((earned / outOf) * part1.points) : earned;
    setPartScores((prev) => { const next = [...prev]; next[idx] = scaled; return next; });
    setSessionSaved(false);
    const nextIdx = idx + 1;
    if (nextIdx < 2) setPhase({ stage: "lesson", partIdx: nextIdx });
  };

  const sectionEarned = partScores.reduce<number>((a, s) => a + (s ?? 0), 0);
  const sectionTotal = part1.points + part2.points;
  const allPartsScored = partScores.every((s) => s !== null);

  if (phase.stage === "overview") {
    return <TipsOverview groups={TIPS} accent="yellow" sectionName="Writing — Schreiben" onStart={() => setPhase({ stage: "lesson", partIdx: 0 })} />;
  }

  if (phase.stage === "lesson") {
    const { partIdx } = phase;
    return (
      <PartLesson
        content={PART_LESSONS[partIdx]}
        accent="yellow"
        onReady={() => {
          if (partIdx === 0) timer.start();
          setPhase({ stage: "exam", partIdx });
        }}
      />
    );
  }

  const { partIdx } = phase as { stage: "exam"; partIdx: number };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1 flex-wrap">
          <span className="text-2xl">✏️</span>
          <h1 className="text-2xl font-bold text-gray-900">Schreiben</h1>
          <span className="text-xs font-semibold bg-yellow-100 text-yellow-700 rounded-full px-3 py-1">15 Punkte · 20 Minuten</span>
          <ExamTimer {...timer} />
          <button onClick={nextSet} className="ml-auto flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-yellow-400 text-yellow-700 text-xs font-semibold hover:bg-yellow-50 transition-colors">
            🔀 Neues Übungsset <span className="text-yellow-500">({setIdx + 1}/{writingExamSets.length})</span>
          </button>
        </div>
        <div className="mt-3 flex gap-2 flex-wrap text-xs">
          {[{ label: "Aufgabe 1 — Formular" }, { label: "Aufgabe 2 — E-Mail" }].map((p, i) => {
            const done = partScores[i] !== null;
            const active = phase.stage === "exam" && (phase as { stage: "exam"; partIdx: number }).partIdx === i;
            return (
              <span key={i} className={`px-3 py-1 rounded-full font-semibold border transition-colors ${done ? "bg-yellow-100 text-yellow-700 border-yellow-300" : active ? "bg-yellow-500 text-white border-yellow-500" : "bg-gray-100 text-gray-400 border-gray-200"}`}>
                {done ? "✅" : ""} {p.label}
              </span>
            );
          })}
        </div>
      </div>

      <div className="space-y-10">
        {partIdx === 0 && (
          <div key={`${setIdx}-1`} id="schreiben-teil-1">
            <WritingPart1 data={part1} onSubmit={(earned, total) => handlePartScore(0, earned, total)} />
          </div>
        )}
        {partIdx === 1 && (
          <div key={`${setIdx}-2`} id="schreiben-teil-2">
            <WritingPart2 data={part2} onSubmit={(earned) => handlePartScore(1, earned, 10)} />
          </div>
        )}
      </div>

      {allPartsScored && !sessionSaved && (
        <div className="mt-8 rounded-xl border border-yellow-300 bg-yellow-50 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-bold text-yellow-800">Schreiben abgeschlossen — {sectionEarned} / {sectionTotal} Punkte</p>
            <p className="text-sm text-yellow-700 mt-0.5">Speichere dein Ergebnis, um es in der Gesamtauswertung zu sehen.</p>
          </div>
          <button onClick={() => { save("schreiben", sectionEarned, sectionTotal); setSessionSaved(true); }}
            className="flex-shrink-0 px-5 py-2 rounded-lg bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-semibold transition-colors">
            Ergebnis speichern ✓
          </button>
        </div>
      )}
      {sessionSaved && (
        <div className="mt-8 rounded-xl border border-green-300 bg-green-50 p-6 text-center">
          <div className="text-4xl mb-2">✅</div>
          <p className="font-bold text-green-800 text-lg">Schreiben abgeschlossen!</p>
          <p className="text-green-700 text-sm mt-1">{scores.schreiben.earned} / {scores.schreiben.total} Punkte gespeichert</p>
          <Link href="/" className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-semibold transition-colors">
            ← Zurück zur Startseite
          </Link>
        </div>
      )}
    </div>
  );
}
