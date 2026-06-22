"use client";

import { useState, useEffect } from "react";
import { listeningExamSets } from "@/data/listening";
import ListeningExercise from "@/components/ListeningExercise";
import PatternTips, { type PatternGroup } from "@/components/PatternTips";

const TIPS: PatternGroup[] = [
  {
    title: "Strategie — Vor dem Hören",
    emoji: "📋",
    color: "green",
    patterns: [
      { label: "Fragen zuerst lesen", template: "Lesen Sie die Aufgaben BEVOR Sie den Text hören.", example: "Lesen Sie: 'Wann fährt der Zug?' → suchen Sie dann eine Uhrzeit." },
      { label: "Schlüsselwörter", template: "Markieren Sie Schlüsselwörter in der Frage: Wer? Was? Wann? Wo?", example: "Frage: 'Wo ist der Käse?' → Schlüsselwort: Ort (Gang, Regal, neben...)" },
      { label: "Antworten vorbereiten", template: "Schauen Sie sich alle Optionen (a, b, c) kurz an.", example: "Wenn alle Optionen Uhrzeiten sind → hören Sie besonders auf Zahlen." },
    ],
  },
  {
    title: "Teil 1 — Kurze Gespräche (Multiple Choice)",
    emoji: "💬",
    color: "blue",
    patterns: [
      { label: "Zahlen & Zeiten", template: "Achten Sie auf Zahlen, Zeiten, Preise — die sind oft die Antwort.", example: "'um 14:32 Uhr' / 'kostet 18,50 Euro' / 'Gang 3'" },
      { label: "Ablenkung", template: "Die erste Antwort im Gespräch ist oft falsch — hören Sie auf die letzte Info.", example: "Erst sagen sie 15 Uhr, dann korrigieren sie: 'Nein, um 16 Uhr.'" },
      { label: "Wer sagt was?", template: "Hören Sie, wer spricht — Verkäufer? Kunde? Das ist wichtig für die Antwort.", example: "Frage: 'Was macht Herr Klein?' → nur Herrn Kleins Aussagen zählen." },
    ],
  },
  {
    title: "Teil 2 — Ansagen (Richtig / Falsch)",
    emoji: "📢",
    color: "yellow",
    patterns: [
      { label: "Genau lesen", template: "Falsch = die Ansage sagt es ANDERS — auch wenn es ähnlich klingt.", example: "'eine Stunde früher' ≠ 'zwei Stunden früher' → falsch!" },
      { label: "Achtung: Zahlen", template: "Achten Sie auf Unterschiede bei Zahlen, Tagen, Zeiten.", example: "Gleis 7 ≠ Gleis 17 / 10 Minuten ≠ 10 Uhr" },
      { label: "Nur in der Ansage?", template: "Die Aussage muss direkt aus dem Text kommen — nicht raten!", example: "Wenn der Text nur '1 Stunde früher' sagt → '2 Stunden früher' ist FALSCH." },
    ],
  },
  {
    title: "Teil 3 — Anrufbeantworter (Multiple Choice)",
    emoji: "📱",
    color: "orange",
    patterns: [
      { label: "Wer ruft an?", template: "Hören Sie zuerst: Wer spricht? Was ist das Thema der Nachricht?", example: "'hier ist Tanja' → Freundin / 'hier ist die Arztpraxis' → Gesundheit" },
      { label: "Hauptinfo", template: "Die wichtigste Information kommt meist am Anfang oder am Ende.", example: "'Ruf mich bitte zurück!' → Aktion des Zuhörers" },
      { label: "Negation", template: "Achten Sie auf NICHT: 'nicht um 15 Uhr, sondern um 16:30 Uhr'", example: "'beginnt nicht um 15 Uhr' → 15 Uhr ist die FALSCHE Antwort!" },
    ],
  },
  {
    title: "🆘 Wenn Sie die Antwort nicht wissen",
    emoji: "🆘",
    color: "purple",
    patterns: [
      { label: "Raten Sie!",       template: "Im Hören gibt es keinen Punktabzug für falsche Antworten — raten Sie immer.", example: "Wenn Sie unsicher sind, wählen Sie die Antwort, die Sie am häufigsten gehört haben." },
      { label: "Elimination",      template: "Streichen Sie die Antworten, die Sie SICHER ausschließen können.", example: "Sie hören 'Käse' und 'Milch' → Option a (Brot) fällt weg." },
      { label: "Kontext nutzen",   template: "Nutzen Sie den Kontext: Wo sind die Personen? Was kaufen/machen sie?", example: "Im Supermarkt-Gespräch → Antworten beziehen sich auf Produkte oder Orte." },
    ],
  },
];

export default function ListeningPage() {
  const [setIdx, setSetIdx] = useState(0);
  useEffect(() => {
    setSetIdx(Math.floor(Math.random() * listeningExamSets.length));
  }, []);
  const parts = listeningExamSets[setIdx];

  const nextSet = () => setSetIdx((i) => (i + 1) % listeningExamSets.length);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1 flex-wrap">
          <span className="text-2xl">🎧</span>
          <h1 className="text-2xl font-bold text-gray-900">Hören</h1>
          <span className="text-xs font-semibold bg-green-100 text-green-700 rounded-full px-3 py-1">15 Punkte · 20 Minuten</span>
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

      <div className="mb-8">
        <PatternTips groups={TIPS} accent="green" />
      </div>

      <div className="space-y-10">
        {parts.map((p) => (
          <div key={`${setIdx}-${p.part}`} id={`hoeren-teil-${p.part}`}>
            <ListeningExercise part={p} />
          </div>
        ))}
      </div>
    </div>
  );
}
