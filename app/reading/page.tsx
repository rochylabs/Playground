"use client";

import { useState } from "react";
import Link from "next/link";
import { readingExamSets } from "@/data/reading";
import { useExamScore } from "@/hooks/useExamScore";
import { useExamTimer } from "@/hooks/useExamTimer";
import ExamTimer from "@/components/ExamTimer";
import ReadingExercise from "@/components/ReadingExercise";
import WeakSpots, { type QuestionResult } from "@/components/WeakSpots";
import TipsOverview from "@/components/TipsOverview";
import PartLesson, { type PartLessonContent } from "@/components/PartLesson";
import { type PatternGroup } from "@/components/PatternTips";

const TIPS: PatternGroup[] = [
  {
    title: "Allgemeine Strategie — General Strategy",
    emoji: "📋",
    color: "blue",
    patterns: [
      { label: "Fragen zuerst lesen — Read questions first", template: "Lesen Sie die Aussagen/Aufgaben ZUERST, dann den Text.", translation: "Read the statements/tasks FIRST, then the text.", example: "So wissen Sie, worauf Sie beim Lesen achten müssen. (You'll know exactly what to look for.)" },
      { label: "Schlüsselwörter — Keywords", template: "Unterstreichen Sie Schlüsselwörter in der Aussage und suchen Sie sie im Text.", translation: "Underline key words in the statement and scan for them in the text.", example: "Aussage: 'drei Tage' → Datumsangaben im Text suchen." },
      { label: "Falle: ähnliche Wörter — Trap: similar words", template: "Achtung! Ähnliche Wörter ≠ gleiche Bedeutung.", translation: "Watch out! Similar words ≠ same meaning.", example: "'eine Stunde früher' im Text ≠ 'zwei Stunden früher' in der Aussage → FALSCH" },
    ],
  },
  {
    title: "Teil 1 — Richtig / Falsch (kurze Texte)",
    emoji: "✅",
    color: "green",
    patterns: [
      { label: "Richtig = steht im Text — True = stated in text", template: "Nur Richtig, wenn es GENAU im Text steht — nicht raten.", translation: "Only True if it is EXACTLY stated in the text — don't guess.", example: "Text: 'bis 14:00 Uhr' → Aussage: 'den ganzen Tag' → FALSCH" },
      { label: "Zahlen vergleichen — Compare numbers", template: "Zahlen, Tage, Zeiten und Mengen genau vergleichen.", translation: "Compare numbers, days, times, and amounts precisely.", example: "'3 bis 5. März' = 3 Tage ✓ / 'wegen Feier' wenn Text 'Umbauarbeiten' sagt → ✗" },
      { label: "Verneinung — Negation", template: "Achtung auf 'nicht', 'kein', 'leider' — sie ändern die Bedeutung komplett.", translation: "Watch for 'not', 'no', 'unfortunately' — they completely change the meaning.", example: "'Kinder dürfen NICHT alleine' ≠ 'Kinder dürfen alleine'" },
    ],
  },
  {
    title: "Teil 2 — Zuordnung (Anzeigen a–f)",
    emoji: "🔗",
    color: "yellow",
    patterns: [
      { label: "Person → Anzeige — Person → Ad", template: "Person lesen: Was sucht sie? Wann hat sie Zeit? Was braucht sie?", translation: "Read about the person: What are they looking for? When are they free? What do they need?", example: "Pedro arbeitet tagsüber → Abendkurs suchen → Anzeige a (18:30 Uhr)" },
      { label: "Option X", template: "Wenn keine Anzeige passt → X schreiben. Jede Anzeige max. 1× (außer X).", translation: "If no ad fits → write X. Each ad can only be used once (except X).", example: "Sporttrainerin gesucht? Keine Anzeige passt → X" },
      { label: "Alle Details prüfen — Check all details", template: "ALLE Details prüfen: Preis, Zeit, Ort, Thema.", translation: "Check ALL details: price, time, location, topic.", example: "Anna möchte SAMSTAGS kochen → Kurs am Samstag ✓ / Kurs am Montag ✗" },
    ],
  },
  {
    title: "Teil 3 — Richtig / Falsch (längerer Text / E-Mail)",
    emoji: "📧",
    color: "orange",
    patterns: [
      { label: "Absatz pro Frage — One paragraph per question", template: "Jede Aussage bezieht sich meist auf einen bestimmten Abschnitt des Textes.", translation: "Each statement usually refers to a specific section of the text.", example: "Aussage 1 → Einleitung, Aussage 2 → Absatz 2 usw." },
      { label: "Vorsicht: 'fast richtig' — Watch out: 'almost correct'", template: "Aussagen können 'fast richtig' sein — ein falsches Detail macht sie FALSCH.", translation: "Statements can be 'almost correct' — one wrong detail makes them FALSE.", example: "Text: 'fährt mit dem Fahrrad' → Aussage: 'fährt mit der U-Bahn' → FALSCH" },
      { label: "Nicht im Text = falsch — Not in text = false", template: "Wenn die Information nicht im Text steht → kann nicht 'richtig' sein.", translation: "If the information is not mentioned in the text → it cannot be 'true'.", example: "Text erwähnt keinen Hund → 'Sie hat einen Hund' → FALSCH" },
    ],
  },
  {
    title: "🆘 Wenn Sie die Antwort nicht wissen — When you don't know",
    emoji: "🆘",
    color: "purple",
    patterns: [
      { label: "Immer antworten — Always answer", template: "Keine Antwort leer lassen — auch wenn unsicher, immer ankreuzen.", translation: "Never leave an answer blank — even if unsure, mark something.", example: "Kein Punktabzug für falsche Antworten im Lesen!" },
      { label: "50/50 bei R/F — 50/50 on True/False", template: "Bei Richtig/Falsch: wenn unsicher → 'Falsch' wählen. Aussagen sind oft zu extrem formuliert.", translation: "For True/False: if unsure, choose False — statements are often worded too extremely.", example: "'immer', 'nie', 'alle' in einer Aussage → meist FALSCH" },
      { label: "Zuordnung: eliminieren — Matching: eliminate", template: "Anzeigen, die schon zugeordnet sind, streichen — so wird die Auswahl kleiner.", translation: "Cross out ads you've already matched to narrow down your choices.", example: "Anzeige b = Pedro → Anzeige b für alle anderen Fragen ausschließen." },
    ],
  },
];

const PART_LESSONS: PartLessonContent[] = [
  {
    partName: "Part 1 — True / False (short texts)",
    intro: "In Part 1 you read 3 short notices, ads, or messages and decide if 5 statements about them are True (Richtig) or False (Falsch). The trap is always a small detail — a different number, time, or reason.",
    tips: [TIPS[0], TIPS[1]],
    workedExample: {
      setup: "Notice on a door:\n\"Das Schwimmbad ist von Montag bis Freitag von 8:00 bis 20:00 Uhr geöffnet. Am Wochenende öffnet es um 9:00 Uhr.\"",
      question: "Statement: \"Das Schwimmbad ist am Montag bis 22:00 Uhr geöffnet.\" — True or False?",
      steps: [
        "Read the statement first. Key words: 'Montag' (Monday) and '22:00 Uhr'. These are what you'll look for in the text.",
        "Find 'Montag' in the text: 'von Montag bis Freitag von 8:00 bis 20:00 Uhr'. The pool is open until 20:00 on weekdays.",
        "Compare: the text says 20:00, the statement says 22:00. They are different!",
        "Conclusion: the statement is FALSE — it changes the closing time from 20:00 to 22:00.",
      ],
      answer: "FALSE ❌ — The text says the pool closes at 20:00, not 22:00. A single number difference makes the whole statement false. Always compare times and numbers exactly.",
    },
    tryIt: {
      setup: "Notice in a building:\n\"Liebe Mieter, wegen Reparaturarbeiten ist der Aufzug am Dienstag, den 15. März, von 9:00 bis 17:00 Uhr außer Betrieb. Wir bitten um Entschuldigung.\"",
      question: "Statement: \"Der Aufzug funktioniert am Dienstag wegen einer Feier nicht.\" — True or False?",
      options: ["True (Richtig)", "False (Falsch)"],
      answer: "False (Falsch)",
      hint: "Look carefully at WHY the elevator is out of service. Find the reason in the notice — is it the same reason as in the statement?",
      explanation: "FALSE ❌ — The notice says 'Reparaturarbeiten' (repair works), but the statement says 'wegen einer Feier' (due to a celebration). The reason is completely different. Always check the exact detail, not just the topic.",
    },
  },
  {
    partName: "Part 2 — Matching (Ads a–f)",
    intro: "In Part 2 you read 5 short person descriptions and match each person to one of 6 ads (a–f). If no ad fits, write X. The key is to read what the person specifically needs — time, topic, and any special conditions all matter.",
    tips: [TIPS[0], TIPS[2]],
    workedExample: {
      setup: "Person: \"Thomas möchte Spanisch lernen. Er ist berufstätig und hat nur abends Zeit.\"\n\nAd A: Spanischkurs für Anfänger, jeden Montag und Mittwoch, 19:00–21:00 Uhr\nAd B: Spanischkurs, samstags 10:00–13:00 Uhr, alle Niveaus",
      question: "Which ad fits Thomas — A, B, or X?",
      steps: [
        "Read Thomas carefully: he wants to learn Spanish, he works, and he's only free in the evenings.",
        "Check Ad A: Spanish course ✓ / evenings (19:00–21:00) ✓ — both conditions match!",
        "Check Ad B: Spanish ✓ / but Saturday 10:00 AM — Thomas works and is only free evenings. This doesn't fit ✗",
        "Ad A matches on language AND time. Ad B fails on the time condition.",
      ],
      answer: "A ✅ — Ad A fits Thomas on both key details: Spanish course + evening times. Always check EVERY detail the person needs, not just the main topic.",
    },
    tryIt: {
      setup: "Person: \"Mia sucht einen Kochkurs. Sie hat samstags frei.\"\n\nAd C: Kochen für Anfänger, jeden Samstag, 14:00–17:00 Uhr\nAd D: Kochkurs, jeden Dienstag, 18:00–20:00 Uhr",
      question: "Which ad fits Mia?",
      options: ["C", "D", "X (no match)"],
      answer: "C",
      hint: "When is Mia free? Find the ad that matches both her interest (cooking) AND her availability (day of the week).",
      explanation: "C ✅ — Mia is free on Saturdays, and Ad C runs every Saturday. Ad D is on Tuesday — Mia is not said to be free on Tuesdays, so it doesn't fit. Always match the day/time, not just the activity.",
    },
  },
  {
    partName: "Part 3 — True / False (longer text / email)",
    intro: "In Part 3 you read a longer text (usually an email or letter) and decide if 5 statements are True or False. The text is longer, so each statement typically matches one paragraph — work through it section by section.",
    tips: [TIPS[0], TIPS[3]],
    workedExample: {
      setup: "Email excerpt:\n\"Liebe Anna, ich wohne jetzt seit drei Monaten in München. Die Stadt ist wunderschön, aber die Mieten sind sehr hoch. Ich arbeite als Lehrerin in einer Grundschule und fahre jeden Tag mit der U-Bahn zur Arbeit.\"",
      question: "Statement: \"Sie fährt jeden Tag mit dem Bus zur Arbeit.\" — True or False?",
      steps: [
        "Identify key words in the statement: 'Bus', 'jeden Tag' (every day), 'Arbeit' (work).",
        "Find 'Arbeit' in the text: 'fahre jeden Tag mit der U-Bahn zur Arbeit'. The transport word is there — U-Bahn.",
        "Compare: text says 'U-Bahn' (subway), statement says 'Bus'. One word is different!",
        "Conclusion: FALSE — even though the frequency ('jeden Tag') matches, the type of transport doesn't.",
      ],
      answer: "FALSE ❌ — The text says 'U-Bahn' (subway), but the statement says 'Bus'. One wrong detail makes the whole statement false. This is the classic Part 3 trap — 'almost correct'.",
    },
    tryIt: {
      setup: "Email excerpt:\n\"Ich bin seit sechs Monaten in Berlin. Mein Deutsch wird besser, aber ich muss noch viel üben. Ich besuche einen Deutschkurs zweimal pro Woche.\"",
      question: "Statement: \"Sie besucht den Deutschkurs einmal pro Woche.\" — True or False?",
      options: ["True (Richtig)", "False (Falsch)"],
      answer: "False (Falsch)",
      hint: "How often does she attend the German course? Find the exact number in the text and compare it to the number in the statement.",
      explanation: "FALSE ❌ — The text says 'zweimal pro Woche' (twice a week), but the statement says 'einmal' (once). Numbers are the most common trap in Part 3. Always compare them exactly.",
    },
  },
];

type Phase = { stage: "overview" } | { stage: "lesson"; partIdx: number } | { stage: "exam"; partIdx: number };

export default function ReadingPage() {
  const [phase, setPhase] = useState<Phase>({ stage: "overview" });
  const [setIdx, setSetIdx] = useState(() => Math.floor(Math.random() * readingExamSets.length));
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
    setPhase({ stage: "overview" });
    timer.reset();
  };

  const handlePartScore = (idx: number, earned: number, results: QuestionResult[]) => {
    setPartScores((prev) => { const next = [...prev]; next[idx] = earned; return next; });
    setAllResults((prev) => [...prev, ...results]);
    setSessionSaved(false);
    const nextIdx = idx + 1;
    if (nextIdx < parts.length) {
      setPhase({ stage: "lesson", partIdx: nextIdx });
    }
  };

  const sectionTotal = parts.reduce((a, p) => a + p.questions.length, 0);
  const sectionEarned = partScores.reduce<number>((a, s) => a + (s ?? 0), 0);
  const allPartsScored = partScores.every((s) => s !== null);

  if (phase.stage === "overview") {
    return <TipsOverview groups={TIPS} accent="blue" sectionName="Reading — Lesen" onStart={() => setPhase({ stage: "lesson", partIdx: 0 })} />;
  }

  if (phase.stage === "lesson") {
    const { partIdx } = phase;
    return (
      <PartLesson
        content={PART_LESSONS[partIdx]}
        accent="blue"
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
          <span className="text-2xl">📖</span>
          <h1 className="text-2xl font-bold text-gray-900">Lesen</h1>
          <span className="text-xs font-semibold bg-blue-100 text-blue-700 rounded-full px-3 py-1">15 Punkte · 25 Minuten</span>
          <ExamTimer {...timer} />
          <button onClick={nextSet} className="ml-auto flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-blue-400 text-blue-700 text-xs font-semibold hover:bg-blue-50 transition-colors">
            🔀 Neues Übungsset <span className="text-blue-400">({setIdx + 1}/{readingExamSets.length})</span>
          </button>
        </div>
        <div className="mt-3 flex gap-2 flex-wrap text-xs">
          {parts.map((p, i) => {
            const done = partScores[i] !== null;
            const active = phase.stage === "exam" && (phase as { stage: "exam"; partIdx: number }).partIdx === i;
            return (
              <span key={p.part} className={`px-3 py-1 rounded-full font-semibold border transition-colors ${done ? "bg-blue-100 text-blue-700 border-blue-300" : active ? "bg-blue-600 text-white border-blue-600" : "bg-gray-100 text-gray-400 border-gray-200"}`}>
                {done ? "✅" : ""} {p.taskLabel}
              </span>
            );
          })}
        </div>
      </div>

      <div className="space-y-10">
        <div key={`${setIdx}-${partIdx}`} id={`lesen-teil-${partIdx + 1}`}>
          <ReadingExercise
            part={parts[partIdx]}
            onSubmit={(earned, total, results) => handlePartScore(partIdx, earned, results)}
          />
        </div>
      </div>

      {allResults.length > 0 && allPartsScored && <WeakSpots results={allResults} />}

      {allPartsScored && !sessionSaved && (
        <div className="mt-8 rounded-xl border border-blue-300 bg-blue-50 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-bold text-blue-800">Lesen abgeschlossen — {sectionEarned} / {sectionTotal} Punkte</p>
            <p className="text-sm text-blue-700 mt-0.5">Speichere dein Ergebnis, um es in der Gesamtauswertung zu sehen.</p>
          </div>
          <button onClick={() => { save("lesen", sectionEarned, sectionTotal); setSessionSaved(true); }}
            className="flex-shrink-0 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors">
            Ergebnis speichern ✓
          </button>
        </div>
      )}
      {sessionSaved && (
        <div className="mt-8 rounded-xl border border-green-300 bg-green-50 p-6 text-center">
          <div className="text-4xl mb-2">✅</div>
          <p className="font-bold text-green-800 text-lg">Lesen abgeschlossen!</p>
          <p className="text-green-700 text-sm mt-1">{scores.lesen.earned} / {scores.lesen.total} Punkte gespeichert</p>
          <Link href="/" className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-semibold transition-colors">
            ← Zurück zur Startseite
          </Link>
        </div>
      )}
    </div>
  );
}
