"use client";

import { useState } from "react";
import type { WritingPart2Data } from "@/data/writing";

export default function WritingPart2({ data }: { data: WritingPart2Data }) {
  const [text, setText] = useState("");
  const [showModel, setShowModel] = useState(false);

  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const onTarget = wordCount >= 25 && wordCount <= 40;

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      {/* Exam header */}
      <div className="bg-yellow-600 px-6 py-3 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-yellow-100">{data.partLabel}</span>
          <h2 className="text-white font-bold text-base mt-0.5">{data.taskLabel}</h2>
        </div>
        <span className="text-xs font-semibold text-yellow-100 bg-yellow-700 rounded-full px-3 py-1">
          {data.points} Punkte
        </span>
      </div>

      {/* Instruction */}
      <div className="px-6 py-4 bg-yellow-50 border-b border-yellow-100">
        <p className="text-sm text-gray-700">{data.instruction}</p>
      </div>

      <div className="p-6 space-y-5">
        {/* Situation box */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-700 mb-3">{data.situation}</p>
          <ul className="space-y-2">
            {data.promptPoints.map((pt, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="mt-0.5 w-5 h-5 flex-shrink-0 rounded-full bg-yellow-100 text-yellow-700 text-xs flex items-center justify-center font-bold">
                  {i + 1}
                </span>
                {pt}
              </li>
            ))}
          </ul>
          <p className="text-xs text-gray-400 mt-3 font-medium">Schreiben Sie {data.wordTarget}.</p>
        </div>

        {/* Writing area — mimics lined exam paper */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-2">Ihre Antwort</p>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={8}
            placeholder="Schreiben Sie hier Ihre E-Mail…"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none font-sans leading-relaxed bg-[repeating-linear-gradient(transparent,transparent_27px,#e5e7eb_27px,#e5e7eb_28px)]"
          />
          <p className={`text-xs mt-1.5 font-medium ${onTarget ? "text-green-600" : wordCount > 40 ? "text-red-500" : "text-gray-400"}`}>
            {wordCount} Wörter {onTarget ? "✓ Gut!" : wordCount > 40 ? "— bitte kürzen" : "— weiterschreiben"}
          </p>
        </div>

        {/* Useful phrases */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-2">Nützliche Redewendungen</p>
          <div className="flex flex-wrap gap-2">
            {data.usefulPhrases.map((p) => (
              <button
                key={p}
                title={p}
                onClick={() => setText((t) => (t ? t.trimEnd() + "\n" : "") + p.split(" (")[0])}
                className="text-xs bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-full px-2.5 py-1 hover:bg-yellow-100 transition-colors"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Model answer */}
        <div>
          <button
            onClick={() => setShowModel((v) => !v)}
            className="text-sm font-semibold text-yellow-700 hover:underline"
          >
            {showModel ? "Musterlösung ausblenden ▲" : "Musterlösung anzeigen ▼"}
          </button>
          {showModel && (
            <pre className="mt-3 text-sm text-gray-700 bg-yellow-50 border border-yellow-200 rounded-lg p-4 whitespace-pre-wrap font-sans leading-relaxed">
              {data.modelAnswer}
            </pre>
          )}
        </div>
      </div>

      <div className="px-6 py-3 border-t border-gray-100 bg-gray-50">
        <p className="text-xs text-gray-400">
          <span className="font-semibold">Prüfungstipp:</span> Überprüfen Sie, ob Sie alle drei Punkte bearbeitet haben. Achten Sie auf Rechtschreibung und Satzzeichen.
        </p>
      </div>
    </div>
  );
}
