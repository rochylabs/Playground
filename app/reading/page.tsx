"use client";

import { readingExamSets } from "@/data/reading";
import { useRandomIndex } from "@/hooks/useRandomIndex";
import ReadingExercise from "@/components/ReadingExercise";
import PatternTips, { type PatternGroup } from "@/components/PatternTips";

const TIPS: PatternGroup[] = [
  {
    title: "Strategie — Allgemein",
    emoji: "📋",
    color: "blue",
    patterns: [
      { label: "Fragen zuerst", template: "Lesen Sie die Aussagen/Aufgaben ZUERST, dann den Text.", example: "So wissen Sie, worauf Sie beim Lesen achten müssen." },
      { label: "Schlüsselwörter", template: "Unterstreichen Sie Schlüsselwörter in der Aussage und suchen Sie sie im Text.", example: "Aussage: 'drei Tage' → suchen Sie Datumsangaben im Text." },
      { label: "Falle: ähnliche Wörter", template: "Achtung! Ähnliche Wörter ≠ gleiche Bedeutung.", example: "'eine Stunde früher' im Text ≠ 'zwei Stunden früher' in der Aussage → FALSCH" },
    ],
  },
  {
    title: "Teil 1 — Richtig / Falsch (kurze Texte)",
    emoji: "✅",
    color: "green",
    patterns: [
      { label: "Richtig = steht im Text", template: "Richtig nur wenn GENAU das im Text steht — nicht raten.", example: "Text: 'bis 14:00 Uhr' → Aussage: 'den ganzen Tag' → FALSCH" },
      { label: "Zahlen vergleichen", template: "Vergleichen Sie Zahlen, Tage, Zeiten, Mengen genau.", example: "'3 bis 5. März' = 3 Tage ✓ / 'wegen Feier' wenn Text 'Umbauarbeiten' sagt → ✗" },
      { label: "Negation", template: "Achten Sie auf 'nicht', 'kein', 'leider' — sie ändern die Bedeutung komplett.", example: "'Kinder dürfen NICHT alleine' ≠ 'Kinder dürfen alleine'" },
    ],
  },
  {
    title: "Teil 2 — Zuordnung (Anzeigen a–f)",
    emoji: "🔗",
    color: "yellow",
    patterns: [
      { label: "Person → Anzeige", template: "Lesen Sie die Person: Was sucht sie? Wann hat sie Zeit? Was braucht sie?", example: "Pedro arbeitet tagsüber → suche Abendkurs → Anzeige a (18:30 Uhr)" },
      { label: "Option X", template: "Wenn keine Anzeige passt → X schreiben. Jede Anzeige passt max. 1× (außer X).", example: "Sporttrainerin gesucht? Keine Anzeige → X" },
      { label: "Alle Details prüfen", template: "Prüfen Sie ALLE Details: Preis, Zeit, Ort, Thema.", example: "Anna möchte SAMSTAGS kochen → Kurs am Samstag ✓ / Kurs am Montag ✗" },
    ],
  },
  {
    title: "Teil 3 — Richtig / Falsch (längerer Text / E-Mail)",
    emoji: "📧",
    color: "orange",
    patterns: [
      { label: "Paragraph pro Frage", template: "Jede Aussage bezieht sich meist auf einen bestimmten Abschnitt des Textes.", example: "Aussage 1 → Einleitung, Aussage 2 → Absatz 2 usw." },
      { label: "Vorsicht: 'fast richtig'", template: "Aussagen können 'fast richtig' sein — ein falsches Detail macht sie FALSCH.", example: "Text: 'fährt mit dem Fahrrad' → Aussage: 'fährt mit der U-Bahn' → FALSCH" },
      { label: "Nicht im Text = falsch", template: "Wenn die Information nicht im Text erwähnt wird → kann nicht 'richtig' sein.", example: "Text erwähnt keinen Hund → 'Sie hat einen Hund' → FALSCH" },
    ],
  },
  {
    title: "🆘 Wenn Sie die Antwort nicht wissen",
    emoji: "🆘",
    color: "purple",
    patterns: [
      { label: "Immer ankreuzen",    template: "Lassen Sie keine Antwort leer — auch wenn Sie unsicher sind, kreuzen Sie an.", example: "Kein Punktabzug für falsche Antworten im Lesen!" },
      { label: "50/50 bei R/F",      template: "Bei Richtig/Falsch: Wenn Sie es nicht wissen, wählen Sie 'Falsch' — Aussagen sind oft zu extrem formuliert.", example: "'immer', 'nie', 'alle' in einer Aussage → meist FALSCH" },
      { label: "Zuordnung: eliminieren", template: "Bei Teil 2: Streichen Sie Anzeigen, die Sie sicher zugeordnet haben, um die Auswahl zu verkleinern.", example: "Anzeige b = Pedro → für alle anderen Fragen kommt b nicht mehr in Frage." },
    ],
  },
];

export default function ReadingPage() {
  const [setIdx, setSetIdx] = useRandomIndex(readingExamSets.length);
  const parts = readingExamSets[setIdx].parts;

  const nextSet = () => setSetIdx((i) => (i + 1) % readingExamSets.length);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1 flex-wrap">
          <span className="text-2xl">📖</span>
          <h1 className="text-2xl font-bold text-gray-900">Lesen</h1>
          <span className="text-xs font-semibold bg-blue-100 text-blue-700 rounded-full px-3 py-1">15 Punkte · 25 Minuten</span>
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

      <div className="mb-8">
        <PatternTips groups={TIPS} accent="blue" />
      </div>

      <div className="space-y-10">
        {parts.map((p) => (
          <div key={`${setIdx}-${p.part}`} id={`lesen-teil-${p.part}`}>
            <ReadingExercise part={p} />
          </div>
        ))}
      </div>
    </div>
  );
}
