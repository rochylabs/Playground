"use client";

import { useState } from "react";
import type { WritingPart1Data } from "@/data/writing";
import MaxBubble from "@/components/MaxBubble";

export default function WritingPart1({ data }: { data: WritingPart1Data }) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const allFilled = data.formFields.every((f) => (values[f.label] ?? "").trim().length > 0);
  const score = submitted
    ? data.formFields.filter(
        (f) => values[f.label]?.trim().toLowerCase() === f.correctAnswer.toLowerCase()
      ).length
    : 0;

  const reset = () => { setValues({}); setSubmitted(false); };

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

      <div className="flex flex-col lg:flex-row gap-0">
        {/* Info card (left) */}
        <div className="lg:w-1/2 border-b lg:border-b-0 lg:border-r border-gray-200 p-5 bg-gray-50">
          <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-3">Informationen</p>
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-yellow-600 px-4 py-2">
              <p className="text-white font-bold text-sm">{data.personCard.title}</p>
            </div>
            <table className="w-full text-sm">
              <tbody>
                {data.personCard.info.map((row) => (
                  <tr key={row.label} className="border-b border-gray-100 last:border-0">
                    <td className="px-4 py-2 font-semibold text-gray-500 w-40 bg-gray-50">{row.label}</td>
                    <td className="px-4 py-2 text-gray-800">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Form (right) */}
        <div className="lg:w-1/2 p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-3">Formular</p>
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-gray-700 px-4 py-2">
              <p className="text-white font-bold text-sm">Anmeldeformular</p>
            </div>
            <div className="divide-y divide-gray-100">
              {data.formFields.map((f, idx) => {
                const val = values[f.label] ?? "";
                const isCorrect = val.trim().toLowerCase() === f.correctAnswer.toLowerCase();
                return (
                  <div key={f.label} className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-yellow-600 w-4">{idx + 1}.</span>
                      <label className="text-xs font-semibold text-gray-500 w-32 flex-shrink-0">{f.label}</label>
                      <input
                        type="text"
                        value={val}
                        onChange={(e) => setValues((v) => ({ ...v, [f.label]: e.target.value }))}
                        disabled={submitted}
                        placeholder={f.hint}
                        className={`flex-1 border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:bg-gray-50 ${
                          submitted
                            ? isCorrect
                              ? "border-green-400 bg-green-50 text-green-800"
                              : "border-red-400 bg-red-50 text-red-800"
                            : "border-gray-300"
                        }`}
                      />
                    </div>
                    {submitted && !isCorrect && (
                      <MaxBubble
                        correct={false}
                        message={`Leider falsch. Die richtige Antwort ist: ${f.correctAnswer}. (The correct answer is: ${f.correctAnswer}.)`}
                        className="mt-2 ml-7"
                      />
                    )}
                    {submitted && isCorrect && (
                      <MaxBubble correct={true} message="Sehr gut! Richtig!" className="mt-2 ml-7" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
        {submitted ? (
          <>
            <span className={`text-sm font-bold ${score === data.formFields.length ? "text-green-600" : score >= data.formFields.length / 2 ? "text-yellow-600" : "text-red-600"}`}>
              Ergebnis: {score} / {data.formFields.length} Punkte
            </span>
            <button onClick={reset} className="px-4 py-1.5 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm font-medium text-gray-700 transition-colors">
              Nochmal versuchen
            </button>
          </>
        ) : (
          <button
            onClick={() => setSubmitted(true)}
            disabled={!allFilled}
            className="ml-auto px-5 py-2 rounded-lg bg-yellow-600 hover:bg-yellow-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors"
          >
            Formular abgeben
          </button>
        )}
      </div>
    </div>
  );
}
