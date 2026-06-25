"use client";

import { useState } from "react";
import Link from "next/link";
import { listeningExamSets } from "@/data/listening";
import { useExamScore } from "@/hooks/useExamScore";
import { useExamTimer } from "@/hooks/useExamTimer";
import ExamTimer from "@/components/ExamTimer";
import ListeningExercise from "@/components/ListeningExercise";
import WeakSpots, { type QuestionResult } from "@/components/WeakSpots";
import TipsOverview from "@/components/TipsOverview";
import PartLesson, { type PartLessonContent } from "@/components/PartLesson";
import { type PatternGroup } from "@/components/PatternTips";

const TIPS: PatternGroup[] = [
  {
    title: "Strategie — Vor dem Hören — Before Listening",
    emoji: "📋",
    color: "green",
    patterns: [
      { label: "Fragen zuerst lesen — Read questions first", template: "Lesen Sie die Aufgaben BEVOR Sie den Text hören.", translation: "Read the tasks BEFORE you listen to the audio.", example: "Lesen: 'Wann fährt der Zug?' → dann gezielt auf eine Uhrzeit hören." },
      { label: "Schlüsselwörter — Keywords", template: "Schlüsselwörter in der Frage markieren: Wer? Was? Wann? Wo?", translation: "Highlight key words in the question: Who? What? When? Where?", example: "Frage: 'Wo ist der Käse?' → Schlüsselwort: Ort (Gang, Regal, neben...)" },
      { label: "Antworten vorbereiten — Scan all options", template: "Alle Antwortmöglichkeiten (a, b, c) kurz anschauen.", translation: "Quickly look at all answer choices (a, b, c) before listening.", example: "Alle Optionen sind Uhrzeiten → besonders auf Zahlen achten." },
    ],
  },
  {
    title: "Teil 1 — Kurze Gespräche (Multiple Choice)",
    emoji: "💬",
    color: "blue",
    patterns: [
      { label: "Zahlen & Zeiten — Numbers & times", template: "Auf Zahlen, Zeiten, Preise achten — sie sind oft die Antwort.", translation: "Pay attention to numbers, times, prices — they're often the answer.", example: "'um 14:32 Uhr' / 'kostet 18,50 Euro' / 'Gang 3'" },
      { label: "Ablenkung — Distraction", template: "Die erste Antwort im Gespräch ist oft falsch — auf die letzte Information achten.", translation: "The first answer mentioned is often wrong — listen for the last piece of information.", example: "Erst: 15 Uhr, dann Korrektur: 'Nein, um 16 Uhr.'" },
      { label: "Wer sagt was? — Who says what?", template: "Hören: Wer spricht — Verkäufer? Kunde? Das ist wichtig für die Antwort.", translation: "Listen to who is speaking — seller? customer? That matters for the answer.", example: "Frage: 'Was macht Herr Klein?' → nur Herrn Kleins Aussagen zählen." },
    ],
  },
  {
    title: "Teil 2 — Ansagen (Richtig / Falsch)",
    emoji: "📢",
    color: "yellow",
    patterns: [
      { label: "Genau hören — Listen carefully", template: "Falsch = die Ansage sagt es ANDERS — auch wenn es ähnlich klingt.", translation: "False = the announcement says it DIFFERENTLY — even if it sounds similar.", example: "'eine Stunde früher' ≠ 'zwei Stunden früher' → falsch!" },
      { label: "Achtung: Zahlen — Watch out: numbers", template: "Auf Unterschiede bei Zahlen, Tagen und Zeiten achten.", translation: "Pay attention to differences in numbers, days, and times.", example: "Gleis 7 ≠ Gleis 17 / 10 Minuten ≠ 10 Uhr" },
      { label: "Nur aus der Ansage? — Only in the announcement?", template: "Die Aussage muss direkt aus dem Text kommen — nicht raten!", translation: "The statement must come directly from the audio — don't guess!", example: "Text sagt nur '1 Stunde früher' → '2 Stunden früher' ist FALSCH." },
    ],
  },
  {
    title: "Teil 3 — Anrufbeantworter (Multiple Choice)",
    emoji: "📱",
    color: "orange",
    patterns: [
      { label: "Wer ruft an? — Who's calling?", template: "Zuerst hören: Wer spricht? Was ist das Thema der Nachricht?", translation: "Listen first: Who is speaking? What is the message about?", example: "'hier ist Tanja' → Freundin / 'hier ist die Arztpraxis' → Gesundheit" },
      { label: "Hauptinformation — Main information", template: "Die wichtigste Information kommt meist am Anfang oder am Ende.", translation: "The most important information usually comes at the beginning or end.", example: "'Ruf mich bitte zurück!' → Aktion des Zuhörers" },
      { label: "Verneinung — Negation", template: "Auf NICHT achten: 'nicht um 15 Uhr, sondern um 16:30 Uhr'", translation: "Watch for NOT: 'not at 3 PM, but at 4:30 PM'", example: "'beginnt nicht um 15 Uhr' → 15 Uhr ist die FALSCHE Antwort!" },
    ],
  },
  {
    title: "🆘 Wenn Sie die Antwort nicht wissen — When you don't know",
    emoji: "🆘",
    color: "purple",
    patterns: [
      { label: "Raten! — Guess!", template: "Im Hören gibt es keinen Punktabzug — immer eine Antwort wählen.", translation: "No point deductions for wrong answers in Listening — always pick something.", example: "Wenn unsicher: die Antwort wählen, die am häufigsten gehört wurde." },
      { label: "Eliminieren — Elimination", template: "Antworten streichen, die SICHER ausgeschlossen werden können.", translation: "Cross out answers you can DEFINITELY rule out.", example: "'Käse' und 'Milch' gehört → Option a (Brot) fällt weg." },
      { label: "Kontext nutzen — Use context", template: "Kontext nutzen: Wo sind die Personen? Was kaufen/machen sie?", translation: "Use the setting: Where are the people? What are they buying/doing?", example: "Supermarkt-Gespräch → Antworten beziehen sich auf Produkte oder Orte." },
    ],
  },
];

const PART_LESSONS: PartLessonContent[] = [
  {
    partName: "Part 1 — Short Dialogues (Multiple Choice)",
    intro: "In Part 1 you hear 6 short everyday dialogues (each played twice) and choose the correct answer from 3 options. The trick: the first thing mentioned is often a distraction — the final answer comes at the end of the dialogue.",
    tips: [TIPS[0], TIPS[1]],
    workedExample: {
      setup: "Dialogue transcript:\nVerkäufer: \"Guten Tag. Kann ich Ihnen helfen?\"\nKundin: \"Ja, wo ist der Joghurt?\"\nVerkäufer: \"Der steht in Gang 3, neben dem Käse.\"\nKundin: \"Und der Käse?\"\nVerkäufer: \"Auch Gang 3, rechts.\"",
      question: "Question: \"Wo ist der Joghurt?\"\na) Gang 1   b) Gang 2   c) Gang 3",
      steps: [
        "Before listening: read the question. Key word — 'Joghurt'. You're looking for a location.",
        "Scan the options: a) Gang 1, b) Gang 2, c) Gang 3. All are aisle numbers, so listen for a number.",
        "In the dialogue: 'Gang 3, neben dem Käse' — the seller gives you a clear location.",
        "Don't get confused: the customer also asks about cheese (also Gang 3). Focus on what the question asks — Joghurt.",
      ],
      answer: "c) Gang 3 ✅ — The seller says 'Gang 3' clearly. The trap is that the conversation continues about cheese — but the question only asks about yoghurt.",
    },
    tryIt: {
      setup: "Dialogue transcript:\nMann: \"Wann fährt der nächste Zug nach Hamburg?\"\nFrau: \"Um 14:15 Uhr. Aber er ist verspätet — er kommt erst um 14:45 an.\"\nMann: \"Und der übernächste?\"\nFrau: \"Um 15:30 Uhr.\"",
      question: "Question: \"Wann fährt der nächste Zug nach Hamburg?\"\nWhich is correct?",
      options: ["a) 14:15 Uhr", "b) 14:45 Uhr", "c) 15:30 Uhr"],
      answer: "a) 14:15 Uhr",
      hint: "The question asks when the train DEPARTS, not when it arrives. Listen carefully for the difference between departure and arrival.",
      explanation: "a) 14:15 ✅ — The train departs at 14:15. The 14:45 is the delayed arrival time. 15:30 is the next train after that. The question specifically asks about departure — always match your answer to exactly what the question asks.",
    },
  },
  {
    partName: "Part 2 — Announcements (True / False)",
    intro: "In Part 2 you hear 4 short public announcements (each played once) and decide if a statement about each one is True or False. Numbers, times, and small detail changes are the most common traps.",
    tips: [TIPS[0], TIPS[2]],
    workedExample: {
      setup: "Announcement transcript:\n\"Achtung, eine Durchsage: Zug 342 nach Frankfurt fährt heute von Gleis 7, nicht von Gleis 17. Wir bitten um Entschuldigung.\"",
      question: "Statement: \"Der Zug fährt von Gleis 17.\" — True or False?",
      steps: [
        "Read the statement first: key detail is 'Gleis 17' (Track 17).",
        "Listen carefully: 'Gleis 7, nicht von Gleis 17' — the announcement explicitly says NOT track 17.",
        "The word 'nicht' (not) completely reverses the meaning. The train goes from track 7.",
        "Conclusion: the statement says track 17, but the announcement corrects it to track 7 → FALSE.",
      ],
      answer: "FALSE ❌ — The announcement says 'Gleis 7, NICHT Gleis 17'. Watch for 'nicht' — it's the key negation word. Also: 7 and 17 sound similar in fast speech, so listen very carefully.",
    },
    tryIt: {
      setup: "Announcement transcript:\n\"Das Museum ist heute wegen einer Sonderveranstaltung ab 15:00 Uhr geschlossen, nicht wie üblich ab 18:00 Uhr.\"",
      question: "Statement: \"Das Museum schließt heute um 18:00 Uhr.\" — True or False?",
      options: ["True (Richtig)", "False (Falsch)"],
      answer: "False (Falsch)",
      hint: "The announcement says 'heute' (today). When does it normally close? When does it close TODAY? 'Nicht wie üblich' means 'not as usual' — something has changed.",
      explanation: "FALSE ❌ — Today it closes at 15:00. 18:00 is the usual closing time, but the announcement explicitly says NOT the usual time. 'Nicht wie üblich' signals a change — always listen for exception words.",
    },
  },
  {
    partName: "Part 3 — Voicemail Messages (Multiple Choice)",
    intro: "In Part 3 you hear 5 voicemail messages (each played twice) and choose the correct answer from 3 options. Focus on: who is calling, why, and what they want you to DO.",
    tips: [TIPS[0], TIPS[3]],
    workedExample: {
      setup: "Voicemail transcript:\n\"Hallo, hier ist Dr. Müller aus der Zahnarztpraxis. Ihr Termin am Donnerstag um 10 Uhr muss leider verschoben werden. Bitte rufen Sie uns zurück, damit wir einen neuen Termin vereinbaren können. Danke.\"",
      question: "Question: \"Was soll die Person tun?\"\na) Zum Termin kommen   b) Die Praxis anrufen   c) Eine E-Mail schreiben",
      steps: [
        "Who is calling? 'Dr. Müller aus der Zahnarztpraxis' — dentist's office. Context: health/appointment.",
        "What's the main message? The Thursday appointment needs to be rescheduled.",
        "What action is required? 'Bitte rufen Sie uns zurück' = please call us back.",
        "Match to options: b) 'Die Praxis anrufen' (call the practice) = call back. That's the action.",
      ],
      answer: "b) Die Praxis anrufen ✅ — 'Rufen Sie uns zurück' means 'call us back'. The requested action always comes near the end of the message. Listen for imperative verbs like 'rufen Sie', 'kommen Sie', 'schreiben Sie'.",
    },
    tryIt: {
      setup: "Voicemail transcript:\n\"Hallo, hier ist Tanja. Ich wollte fragen, ob wir uns heute Abend um 19 Uhr treffen können. Ich bin ab 17 Uhr in der Stadt. Ruf mich bitte kurz zurück. Tschüss!\"",
      question: "Question: \"Wann will sich Tanja treffen?\"\nWhich is correct?",
      options: ["a) Um 17:00 Uhr", "b) Um 19:00 Uhr", "c) Sie ist nicht sicher"],
      answer: "b) Um 19:00 Uhr",
      hint: "Tanja mentions two times. Which one is the proposed meeting time, and which one is when she arrives in the city? They are two different things.",
      explanation: "b) 19:00 ✅ — Tanja proposes meeting at 19:00. She mentions 17:00 as when she'll be in the city — that's her arrival, not the meeting time. Two numbers in a voicemail = classic trap. Always link each time to its context.",
    },
  },
];

type Phase = { stage: "overview" } | { stage: "lesson"; partIdx: number } | { stage: "exam"; partIdx: number };

export default function ListeningPage() {
  const [phase, setPhase] = useState<Phase>({ stage: "overview" });
  const [setIdx, setSetIdx] = useState(() => Math.floor(Math.random() * listeningExamSets.length));
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
    setPhase({ stage: "overview" });
    timer.reset();
  };

  const handlePartScore = (idx: number, earned: number, results: QuestionResult[]) => {
    setPartScores((prev) => { const next = [...prev]; next[idx] = earned; return next; });
    setAllResults((prev) => [...prev, ...results]);
    setSessionSaved(false);
    const nextIdx = idx + 1;
    if (nextIdx < parts.length) setPhase({ stage: "lesson", partIdx: nextIdx });
  };

  const sectionTotal = parts.reduce((a, p) => a + p.questions.length, 0);
  const sectionEarned = partScores.reduce<number>((a, s) => a + (s ?? 0), 0);
  const allPartsScored = partScores.every((s) => s !== null);

  if (phase.stage === "overview") {
    return <TipsOverview groups={TIPS} accent="green" sectionName="Listening — Hören" onStart={() => setPhase({ stage: "lesson", partIdx: 0 })} />;
  }

  if (phase.stage === "lesson") {
    const { partIdx } = phase;
    return (
      <PartLesson
        content={PART_LESSONS[partIdx]}
        accent="green"
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
          <span className="text-2xl">🎧</span>
          <h1 className="text-2xl font-bold text-gray-900">Hören</h1>
          <span className="text-xs font-semibold bg-green-100 text-green-700 rounded-full px-3 py-1">15 Punkte · 20 Minuten</span>
          <ExamTimer {...timer} />
          <button onClick={nextSet} className="ml-auto flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-green-400 text-green-700 text-xs font-semibold hover:bg-green-50 transition-colors">
            🔀 Neues Übungsset <span className="text-green-400">({setIdx + 1}/{listeningExamSets.length})</span>
          </button>
        </div>
        <div className="mt-3 flex gap-2 flex-wrap text-xs">
          {parts.map((p, i) => {
            const done = partScores[i] !== null;
            const active = phase.stage === "exam" && (phase as { stage: "exam"; partIdx: number }).partIdx === i;
            return (
              <span key={p.part} className={`px-3 py-1 rounded-full font-semibold border transition-colors ${done ? "bg-green-100 text-green-700 border-green-300" : active ? "bg-green-600 text-white border-green-600" : "bg-gray-100 text-gray-400 border-gray-200"}`}>
                {done ? "✅" : ""} {p.taskLabel}
              </span>
            );
          })}
        </div>
      </div>

      <div className="space-y-10">
        <div key={`${setIdx}-${partIdx}`} id={`hoeren-teil-${partIdx + 1}`}>
          <ListeningExercise
            part={parts[partIdx]}
            onSubmit={(earned, total, results) => handlePartScore(partIdx, earned, results)}
          />
        </div>
      </div>

      {allResults.length > 0 && allPartsScored && <WeakSpots results={allResults} />}

      {allPartsScored && !sessionSaved && (
        <div className="mt-8 rounded-xl border border-green-300 bg-green-50 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-bold text-green-800">Hören abgeschlossen — {sectionEarned} / {sectionTotal} Punkte</p>
            <p className="text-sm text-green-700 mt-0.5">Speichere dein Ergebnis, um es in der Gesamtauswertung zu sehen.</p>
          </div>
          <button onClick={() => { save("hoeren", sectionEarned, sectionTotal); setSessionSaved(true); }}
            className="flex-shrink-0 px-5 py-2 rounded-lg bg-green-700 hover:bg-green-800 text-white text-sm font-semibold transition-colors">
            Ergebnis speichern ✓
          </button>
        </div>
      )}
      {sessionSaved && (
        <div className="mt-8 rounded-xl border border-green-300 bg-green-50 p-6 text-center">
          <div className="text-4xl mb-2">✅</div>
          <p className="font-bold text-green-800 text-lg">Hören abgeschlossen!</p>
          <p className="text-green-700 text-sm mt-1">{scores.hoeren.earned} / {scores.hoeren.total} Punkte gespeichert</p>
          <Link href="/" className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-semibold transition-colors">
            ← Zurück zur Startseite
          </Link>
        </div>
      )}
    </div>
  );
}
