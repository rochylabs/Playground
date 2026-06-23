"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import type { ExamScores, SectionKey } from "@/hooks/useExamScore";
import { scaleToGoethe, gradeLabel, GOETHE_SECTION_MAX, GOETHE_TOTAL_MAX, GOETHE_PASS_PCT } from "@/hooks/useExamScore";

interface Props {
  scores: ExamScores;
  onReset: () => void;
}

const SECTION_LABELS: Record<SectionKey, { label: string; icon: string }> = {
  lesen:     { label: "Lesen",     icon: "📖" },
  hoeren:    { label: "Hören",     icon: "🎧" },
  schreiben: { label: "Schreiben", icon: "✏️" },
  sprechen:  { label: "Sprechen",  icon: "🎤" },
};

const CONFETTI_POOL = ["🎉", "⭐", "🌟", "🎊", "🏆", "✨", "🎈", "💫"];

function passed(pts: number) {
  return pts / GOETHE_SECTION_MAX >= GOETHE_PASS_PCT;
}

function makeConfetti() {
  return Array.from({ length: 24 }, () => ({
    emoji: CONFETTI_POOL[Math.floor(Math.random() * CONFETTI_POOL.length)],
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 2}s`,
    duration: `${2.5 + Math.random() * 2}s`,
  }));
}

export default function ExamSummary({ scores, onReset }: Props) {
  const goetheScores = Object.fromEntries(
    Object.entries(scores).map(([k, s]) => [k, scaleToGoethe(s.earned, s.total)])
  ) as Record<SectionKey, number>;

  const goetheTotal = Object.values(goetheScores).reduce((a, v) => a + v, 0);
  const allSectionsPassed = Object.values(goetheScores).every((pts) => passed(pts));
  const overallPass = goetheTotal >= GOETHE_TOTAL_MAX * GOETHE_PASS_PCT && allSectionsPassed;
  const percent = Math.round((goetheTotal / GOETHE_TOTAL_MAX) * 100);

  const [confetti] = useState(() => overallPass ? makeConfetti() : []);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    modalRef.current?.focus();
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onReset(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onReset]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <style>{`
        @keyframes confetti-fall {
          0%   { transform: translateY(-20px) rotate(0deg);   opacity: 1; }
          100% { transform: translateY(100vh)  rotate(720deg); opacity: 0; }
        }
      `}</style>

      {confetti.map((c, i) => (
        <span key={i} className="pointer-events-none fixed top-0 text-2xl"
          style={{ left: c.left, animationName: "confetti-fall", animationDuration: c.duration,
            animationDelay: c.delay, animationFillMode: "forwards", animationTimingFunction: "ease-in" }}>
          {c.emoji}
        </span>
      ))}

      <div ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="exam-summary-heading"
        tabIndex={-1} className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden outline-none">
        {/* Header */}
        <div className={`px-6 py-5 text-center ${overallPass ? "bg-green-600" : "bg-orange-500"}`}>
          <div className="text-4xl mb-2">{overallPass ? "🏆" : "💪"}</div>
          <h2 id="exam-summary-heading" className="text-xl font-bold text-white">
            {overallPass ? "Bestanden! Herzlichen Glückwunsch!" : "Noch nicht bestanden — nicht aufgeben!"}
          </h2>
          <p className="text-sm text-white/80 mt-1">
            {overallPass
              ? "You passed the practice exam! You're ready for the real thing."
              : "Keep practicing — every attempt makes you stronger!"}
          </p>
        </div>

        {/* Score table */}
        <div className="px-6 py-4 space-y-3">
          {(Object.entries(scores) as [SectionKey, typeof scores[SectionKey]][]).map(([key]) => {
            const gPts = goetheScores[key];
            const sectionPass = passed(gPts);
            const pct = Math.round((gPts / GOETHE_SECTION_MAX) * 100);
            const { label, icon } = SECTION_LABELS[key];
            return (
              <div key={key} className="flex items-center gap-3">
                <span className="text-lg w-7">{icon}</span>
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-semibold text-gray-700">{label}</span>
                    <span className="font-bold text-gray-800">{gPts} / {GOETHE_SECTION_MAX} Pkt. ({pct}%)</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className={`h-2 rounded-full transition-all ${sectionPass ? "bg-green-500" : "bg-red-400"}`}
                      style={{ width: `${pct}%` }} />
                  </div>
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${sectionPass ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                  {sectionPass ? "✓" : "✗"}
                </span>
              </div>
            );
          })}

          {/* Total */}
          <div className="border-t border-gray-200 pt-3 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-800">Gesamtpunktzahl</span>
              <span className={`text-lg font-bold ${overallPass ? "text-green-600" : "text-red-500"}`}>
                {goetheTotal} / {GOETHE_TOTAL_MAX} ({percent}%)
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Bewertung</span>
              <span className={`text-sm font-semibold ${overallPass ? "text-green-700" : "text-red-600"}`}>
                {gradeLabel(goetheTotal / GOETHE_TOTAL_MAX)}
              </span>
            </div>
          </div>
          <p className="text-xs text-gray-400 text-right">Bestehensgrenze: 60 Punkte + 60% pro Teil</p>
        </div>

        {/* Twixie */}
        <div className="mx-6 mb-4 flex items-start gap-2 rounded-lg px-3 py-2.5 text-xs bg-blue-50 border border-blue-200 text-blue-800">
          <span className="text-base flex-shrink-0">🐶</span>
          <div>
            <span className="font-semibold">Twixie: </span>
            {overallPass
              ? "Wunderbar! Du hast großartig gearbeitet! Ich bin so stolz auf dich! 🎉 You aced the practice — now go get that certificate!"
              : "Kopf hoch! 💪 Don't give up — every mistake is a lesson. Review the sections below 60% and try again. Ich glaube an dich!"}
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 flex gap-3">
          <button onClick={onReset}
            className="flex-1 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-sm font-semibold text-gray-700 transition-colors">
            🔄 Nochmal versuchen
          </button>
          <Link href="/"
            className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-sm font-semibold text-white text-center transition-colors">
            🏠 Zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}
