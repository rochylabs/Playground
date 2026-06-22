"use client";

import Link from "next/link";
import { useState } from "react";
import { useExamScore } from "@/hooks/useExamScore";
import ExamSummary from "@/components/ExamSummary";

const sections = [
  {
    href: "/reading",
    label: "Lesen",
    icon: "📖",
    bg: "bg-blue-50",
    border: "border-blue-200",
    badge: "bg-blue-100 text-blue-700",
    description: "Kurze Texte, Schilder, Nachrichten und Formulare. Üben Sie Zuordnung, Richtig/Falsch und Multiple-Choice-Aufgaben.",
    parts: ["Teil 1: Hinweisschilder", "Teil 2: Kurze Mitteilungen", "Teil 3: Anzeige / Bekanntmachung"],
  },
  {
    href: "/listening",
    label: "Hören",
    icon: "🎧",
    bg: "bg-green-50",
    border: "border-green-200",
    badge: "bg-green-100 text-green-700",
    description: "Kurze Gespräche und Durchsagen. Üben Sie, wichtige Informationen aus dem Hörverstehen herauszufinden.",
    parts: ["Teil 1: Kurze Gespräche", "Teil 2: Durchsagen", "Teil 3: Dialog"],
  },
  {
    href: "/writing",
    label: "Schreiben",
    icon: "✏️",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    badge: "bg-yellow-100 text-yellow-700",
    description: "Formulare ausfüllen und kurze Mitteilungen schreiben. Üben Sie mit Musterlösungen.",
    parts: ["Teil 1: Formular ausfüllen", "Teil 2: Kurze Mitteilung (ca. 30–40 Wörter)"],
  },
  {
    href: "/speaking",
    label: "Sprechen",
    icon: "🎤",
    bg: "bg-red-50",
    border: "border-red-200",
    badge: "bg-red-100 text-red-700",
    description: "Sich vorstellen, Fragen stellen und beantworten. Üben Sie mit Aufgabenkarten und Musterlösungen.",
    parts: ["Teil 1: Sich vorstellen", "Teil 2: Fragen stellen und antworten", "Teil 3: Um etwas bitten"],
  },
];

const SECTION_KEYS = [
  { key: "lesen",     icon: "📖", label: "Lesen",     href: "/reading" },
  { key: "hoeren",    icon: "🎧", label: "Hören",     href: "/listening" },
  { key: "schreiben", icon: "✏️", label: "Schreiben", href: "/writing" },
  { key: "sprechen",  icon: "🎤", label: "Sprechen",  href: "/speaking" },
] as const;

export default function HomePage() {
  const { scores, allDone, reset } = useExamScore();
  const [showSummary, setShowSummary] = useState(false);
  const completedCount = Object.values(scores).filter((s) => s.completed).length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Goethe-Zertifikat A1 — Prüfungsvorbereitung
        </h1>
        <p className="text-gray-500 text-base">
          Interaktive Übungen für alle vier Prüfungsteile des Goethe-Zertifikats A1.
          Wählen Sie einen Bereich, um zu beginnen.
        </p>
      </div>

      {/* Progress tracker */}
      {completedCount > 0 && (
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-bold text-gray-700">Prüfungsfortschritt — {completedCount}/4 Abschnitte abgeschlossen</p>
            <div className="flex gap-2">
              {allDone && (
                <button onClick={() => setShowSummary(true)}
                  className="text-xs font-bold text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded-full transition-colors">
                  📊 Gesamtergebnis anzeigen
                </button>
              )}
              <button onClick={reset} className="text-xs text-gray-400 hover:text-red-500 font-medium transition-colors">
                Zurücksetzen
              </button>
            </div>
          </div>
          <div className="flex gap-3">
            {SECTION_KEYS.map(({ key, icon, label }) => {
              const s = scores[key];
              return (
                <div key={key} className={`flex-1 rounded-lg p-2 text-center text-xs font-semibold border ${
                  s.completed ? "bg-green-50 border-green-300 text-green-700" : "bg-gray-50 border-gray-200 text-gray-400"
                }`}>
                  <div className="text-lg mb-0.5">{s.completed ? "✅" : icon}</div>
                  {label}
                  {s.completed && <div className="text-green-600 font-bold">{s.earned}/{s.total}</div>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className={`rounded-xl border ${s.border} ${s.bg} p-6 hover:shadow-md transition-shadow group flex flex-col gap-3`}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">{s.icon}</span>
              <div>
                <span className={`text-xs font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${s.badge}`}>
                  {s.label}
                </span>
                <h2 className="text-xl font-bold text-gray-800 mt-0.5">{s.label}</h2>
              </div>
            </div>
            <p className="text-sm text-gray-600">{s.description}</p>
            <ul className="text-xs text-gray-500 space-y-1 mt-1">
              {s.parts.map((p) => (
                <li key={p} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 inline-block" />
                  {p}
                </li>
              ))}
            </ul>
            <span className="text-sm font-medium text-gray-700 group-hover:underline mt-auto pt-1">
              Jetzt üben →
            </span>
          </Link>
        ))}
      </div>

      {showSummary && (
        <ExamSummary scores={scores} onReset={() => { reset(); setShowSummary(false); }} />
      )}

      <div className="mt-8 rounded-xl bg-white border border-gray-200 p-5 flex gap-4 items-start">
        <div className="text-5xl flex-shrink-0">🐶</div>
        <div>
          <p className="text-base font-bold text-gray-800">Hallo! Ich bin Twixie, dein Lernbegleiter!</p>
          <p className="text-sm text-gray-500 mt-1">
            I&apos;m Twixie the dog — I&apos;ll guide you through every exercise. After each answer I&apos;ll explain
            what&apos;s right, what&apos;s wrong, and why. Choose a section above to get started!
          </p>
          <p className="text-xs text-gray-400 mt-2">
            <strong>Tipp:</strong> Das Goethe-Zertifikat A1 prüft einfaches Alltagsdeutsch: kurze Texte, Gespräche, Formulare und Vorstellung. Üben Sie regelmäßig — jeden Tag ein bisschen!
          </p>
        </div>
      </div>
    </div>
  );
}
