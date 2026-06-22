"use client";

import { useState } from "react";
import { writingExamSets } from "@/data/writing";
import { useRandomIndex } from "@/hooks/useRandomIndex";
import { useExamScore } from "@/hooks/useExamScore";
import ExamSummary from "@/components/ExamSummary";
import WritingPart1 from "@/components/WritingPart1";
import WritingPart2 from "@/components/WritingPart2";
import PatternTips, { type PatternGroup } from "@/components/PatternTips";

const TIPS: PatternGroup[] = [
  {
    title: "Teil 1 — Formular ausfüllen (Steckbrief)",
    emoji: "📝",
    color: "yellow",
    patterns: [
      { label: "Abschreiben, nicht umschreiben", template: "Schreiben Sie die Information GENAU aus dem Steckbrief — keine eigenen Wörter.", example: "Steckbrief: 'österreichisch' → Formular: 'österreichisch' ✓ (nicht 'Österreich')" },
      { label: "Format beachten", template: "Datum: TT.MM.JJJJ / Telefon: mit Vorwahl / Name: Groß geschrieben", example: "14.07.1988 ✓ / 14 Juli 1988 ✗ (falsches Format)" },
      { label: "Vollständig ausfüllen", template: "Lassen Sie kein Feld leer — auch wenn die Information im Steckbrief fehlt.", example: "Alle 5 Felder müssen ausgefüllt sein." },
    ],
  },
  {
    title: "Teil 2 — E-Mail schreiben (~30 Wörter)",
    emoji: "📧",
    color: "orange",
    patterns: [
      { label: "Anrede",       template: "Liebe/r [Name], (informell) / Sehr geehrte Damen und Herren, (formell)",  example: "Lieber Peter, / Liebe Maria, / Sehr geehrte Damen und Herren," },
      { label: "Danken",       template: "Vielen Dank für [Akkusativ]. / Danke für Ihre/deine [Sache].",            example: "Vielen Dank für die Einladung. / Danke für deine Nachricht." },
      { label: "Absage",       template: "Leider kann ich nicht [kommen / teilnehmen], weil [Grund].",              example: "Leider kann ich nicht kommen, weil ich arbeiten muss." },
      { label: "Vorschlag",    template: "Können wir uns [Zeit] treffen? / Wie wäre es mit [Alternativvorschlag]?", example: "Können wir uns am Freitag treffen? / Wie wäre es am Mittwoch?" },
      { label: "Bitte/Anfrage",template: "Ich möchte [Infinitiv]. / Könnten Sie bitte [Infinitiv]?",               example: "Ich möchte das Zimmer besichtigen. / Könnten Sie mir bitte antworten?" },
      { label: "Abschluss",    template: "Liebe Grüße, [Name] (informell) / Mit freundlichen Grüßen, [Name] (formell)", example: "Liebe Grüße, Maria / Mit freundlichen Grüßen, Herr Mendez" },
    ],
  },
  {
    title: "Alle 3 Punkte ansprechen",
    emoji: "✅",
    color: "green",
    patterns: [
      { label: "Punkt 1",  template: "Beginnen Sie mit dem ersten Punkt — oft: sich bedanken oder das Problem erklären.", example: "Vielen Dank für die Einladung." },
      { label: "Punkt 2",  template: "Zweiter Satz: der Hauptinhalt (Absage, Anfrage, Erklärung).",                    example: "Leider kann ich nicht kommen, weil ich krank bin." },
      { label: "Punkt 3",  template: "Dritter Satz: Frage oder Vorschlag — etwas, das eine Reaktion erwartet.",        example: "Können wir uns nächste Woche treffen?" },
      { label: "Wörter zählen", template: "Schreiben Sie ca. 30 Wörter — 25–40 Wörter sind akzeptabel.",             example: "Zu kurz (unter 20 Wörter) kostet Punkte. Zu lang ist kein Problem." },
    ],
  },
  {
    title: "🆘 Wenn Sie nicht wissen, was schreiben",
    emoji: "🆘",
    color: "purple",
    patterns: [
      { label: "Standard-Absage",   template: "Leider kann ich nicht kommen, weil ich [Grund] muss.",               example: "...weil ich arbeiten muss. / ...weil ich einen Termin habe." },
      { label: "Standard-Grund",    template: "Ich muss [Aktivität]. / Ich bin krank. / Ich habe einen Termin.",     example: "Ich muss meine Familie besuchen. / Ich bin leider krank." },
      { label: "Standard-Vorschlag",template: "Können wir uns [Zeitangabe] treffen, vielleicht am [Wochentag]?",    example: "Können wir uns nächste Woche treffen, vielleicht am Montag?" },
      { label: "Standard-Anfrage",  template: "Wann haben Sie / hast du Zeit? Ich bin [Zeitangabe] frei.",          example: "Ich bin nächste Woche frei. Wann passt es dir?" },
    ],
  },
];

export default function WritingPage() {
  const [setIdx, setSetIdx] = useRandomIndex(writingExamSets.length);
  const { part1, part2 } = writingExamSets[setIdx];
  const { scores, save, reset, allDone } = useExamScore();
  const [partScores, setPartScores] = useState<(number | null)[]>([null, null]);
  const [showSummary, setShowSummary] = useState(false);

  const nextSet = () => { setSetIdx((i) => (i + 1) % writingExamSets.length); setPartScores([null, null]); };

  const handlePartScore = (idx: number, earned: number, outOf: number) => {
    // scale to section total (part1: 5pts, part2: 10pts = 15 total)
    const scaled = idx === 0
      ? Math.round((earned / outOf) * part1.points)
      : earned; // part2 self-assessed in points directly
    setPartScores((prev) => { const next = [...prev]; next[idx] = scaled; return next; });
  };

  const sectionEarned = partScores.reduce<number>((a, s) => a + (s ?? 0), 0);
  const sectionTotal = part1.points + part2.points;
  const allPartsScored = partScores.every((s) => s !== null);
  const sectionSaved = scores.schreiben.completed;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1 flex-wrap">
          <span className="text-2xl">✏️</span>
          <h1 className="text-2xl font-bold text-gray-900">Schreiben</h1>
          <span className="text-xs font-semibold bg-yellow-100 text-yellow-700 rounded-full px-3 py-1">25 Punkte · 20 Minuten</span>
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

      <div className="mb-8">
        <PatternTips groups={TIPS} accent="yellow" />
      </div>

      <div className="space-y-10">
        <div id="schreiben-teil-1" key={`${setIdx}-1`}>
          <WritingPart1 data={part1} onSubmit={(earned, total) => handlePartScore(0, earned, total)} />
        </div>
        <div id="schreiben-teil-2" key={`${setIdx}-2`}>
          <WritingPart2 data={part2} onSubmit={(earned) => handlePartScore(1, earned, 10)} />
        </div>
      </div>

      {allPartsScored && !sectionSaved && (
        <div className="mt-8 rounded-xl border border-yellow-300 bg-yellow-50 p-5 flex items-center justify-between gap-4">
          <div>
            <p className="font-bold text-yellow-800">Schreiben abgeschlossen — {sectionEarned} / {sectionTotal} Punkte</p>
            <p className="text-sm text-yellow-700 mt-0.5">Speichere dein Ergebnis, um es in der Gesamtauswertung zu sehen.</p>
          </div>
          <button
            onClick={() => { save("schreiben", sectionEarned, sectionTotal); if (allDone) setShowSummary(true); }}
            className="flex-shrink-0 px-5 py-2 rounded-lg bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-semibold transition-colors"
          >
            Ergebnis speichern ✓
          </button>
        </div>
      )}
      {sectionSaved && (
        <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-4 flex items-center justify-between gap-4">
          <p className="text-sm font-semibold text-gray-600">✓ Schreiben gespeichert: {scores.schreiben.earned} / {scores.schreiben.total} Punkte</p>
          <button onClick={() => setShowSummary(true)} className="text-xs text-blue-600 hover:underline font-semibold">
            {allDone ? "📊 Gesamtergebnis anzeigen" : "Weiter zum nächsten Abschnitt →"}
          </button>
        </div>
      )}

      {showSummary && (
        <ExamSummary scores={scores}
          onReset={() => { reset(); setShowSummary(false); setPartScores([null, null]); }} />
      )}
    </div>
  );
}
