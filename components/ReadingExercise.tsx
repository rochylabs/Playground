"use client";

import { useState } from "react";
import type { ReadingPart } from "@/data/reading";
import MaxBubble from "@/components/MaxBubble";

const MATCH_OPTIONS = ["a", "b", "c", "d", "e", "f", "X"];

export default function ReadingExercise({ part }: { part: ReadingPart }) {
  const [answers, setAnswers] = useState<Record<string, string | boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qId: string, val: string | boolean) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qId]: val }));
  };

  const allAnswered = part.questions.every((q) => answers[q.id] !== undefined);
  const score = part.questions.filter(
    (q) => String(answers[q.id]).toLowerCase() === String(q.answer).toLowerCase()
  ).length;

  const reset = () => { setAnswers({}); setSubmitted(false); };

  const qOffset = part.part === 1 ? 0 : part.part === 2 ? 5 : 10;

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      {/* Exam header */}
      <div className="bg-blue-600 px-6 py-3 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-200">{part.partLabel}</span>
          <h2 className="text-white font-bold text-base mt-0.5">{part.taskLabel}</h2>
        </div>
        <span className="text-xs font-semibold text-blue-100 bg-blue-700 rounded-full px-3 py-1">
          {part.points} Punkte
        </span>
      </div>

      {/* Instruction */}
      <div className="px-6 py-4 bg-blue-50 border-b border-blue-100">
        <p className="text-sm text-gray-700">{part.instruction}</p>
      </div>

      {/* TEIL 2 — Side-by-side: notices (left) + questions (right) */}
      {part.type === "matching" && part.notices && (
        <div className="flex flex-col lg:flex-row gap-0">
          {/* Notices panel */}
          <div className="lg:w-1/2 border-b lg:border-b-0 lg:border-r border-gray-200 p-5 bg-gray-50">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-3">Anzeigen</p>
            <div className="space-y-3">
              {part.notices.map((notice) => (
                <div key={notice.label} className="bg-white rounded-lg border border-gray-200 p-3">
                  <span className="inline-block font-bold text-blue-700 text-sm w-5 mb-1">{notice.label}</span>
                  <pre className="text-xs text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">
                    {notice.text}
                  </pre>
                </div>
              ))}
            </div>
          </div>

          {/* Questions panel */}
          <div className="lg:w-1/2 p-5 space-y-5">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-1">Aufgaben</p>
            {part.questions.map((q, idx) => {
              const given = answers[q.id] as string | undefined;
              const correct = given?.toLowerCase() === String(q.answer).toLowerCase();
              return (
                <div key={q.id} className="border border-gray-100 rounded-lg p-3 bg-white">
                  <p className="text-sm font-medium text-gray-800 mb-2">
                    <span className="font-bold text-blue-700 mr-1">{qOffset + idx + 1}.</span>
                    {q.statement}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {MATCH_OPTIONS.map((opt) => {
                      const isSelected = given === opt;
                      const isCorrectOpt = opt.toLowerCase() === String(q.answer).toLowerCase();
                      let cls = "w-9 h-9 rounded border text-sm font-bold transition-colors flex items-center justify-center ";
                      if (submitted) {
                        if (isSelected && correct) cls += "bg-green-100 border-green-500 text-green-700";
                        else if (isSelected && !correct) cls += "bg-red-100 border-red-500 text-red-700";
                        else if (!isSelected && isCorrectOpt) cls += "bg-green-50 border-green-400 text-green-600";
                        else cls += "border-gray-200 text-gray-300";
                      } else {
                        cls += isSelected
                          ? "bg-blue-100 border-blue-500 text-blue-700"
                          : "border-gray-300 text-gray-600 hover:border-blue-400 hover:bg-blue-50";
                      }
                      return (
                        <button key={opt} className={cls} onClick={() => handleSelect(q.id, opt)}>
                          {opt.toUpperCase()}
                        </button>
                      );
                    })}
                  </div>
                  {submitted && given !== undefined && q.explanation && (
                    <MaxBubble
                      correct={correct}
                      message={correct
                        ? `Sehr gut! ${q.explanation}`
                        : `Leider falsch. Die richtige Antwort ist: ${String(q.answer).toUpperCase()}. ${q.explanation}`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TEIL 1 & 3 — Richtig / Falsch */}
      {part.type === "richtig-falsch" && (
        <div className="flex flex-col lg:flex-row gap-0">
          {/* Text panel */}
          <div className="lg:w-1/2 border-b lg:border-b-0 lg:border-r border-gray-200 p-5 bg-gray-50 space-y-4">
            {(part.texts ?? []).map((t, i) => (
              <div key={i} className="bg-white rounded-lg border border-gray-200 p-4">
                {t.label && (
                  <span className="inline-block text-xs font-bold uppercase tracking-wide text-blue-600 mb-1">
                    {t.label}
                  </span>
                )}
                {t.title && <p className="font-semibold text-gray-800 text-sm mb-2">{t.title}</p>}
                <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">
                  {t.body}
                </pre>
              </div>
            ))}
          </div>

          {/* Questions panel */}
          <div className="lg:w-1/2 p-5 space-y-4">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-1">Aufgaben</p>
            {part.questions.map((q, idx) => {
              const given = answers[q.id];
              const correct = given === q.answer;
              return (
                <div key={q.id} className="border border-gray-100 rounded-lg p-3 bg-white">
                  <p className="text-sm font-medium text-gray-800 mb-2">
                    <span className="font-bold text-blue-700 mr-1">{qOffset + idx + 1}.</span>
                    {q.statement}
                  </p>
                  <div className="flex gap-2">
                    {([true, false] as const).map((val) => {
                      const label = val ? "Richtig" : "Falsch";
                      const isSelected = given === val;
                      const isCorrectOpt = val === q.answer;
                      let cls = "px-4 py-1.5 rounded border text-sm font-medium transition-colors ";
                      if (submitted) {
                        if (isSelected && correct) cls += "bg-green-100 border-green-500 text-green-700";
                        else if (isSelected && !correct) cls += "bg-red-100 border-red-500 text-red-700";
                        else if (!isSelected && isCorrectOpt) cls += "bg-green-50 border-green-400 text-green-600";
                        else cls += "border-gray-200 text-gray-400";
                      } else {
                        cls += isSelected
                          ? "bg-blue-100 border-blue-500 text-blue-700"
                          : "border-gray-300 text-gray-600 hover:border-blue-400 hover:bg-blue-50";
                      }
                      return (
                        <button key={label} className={cls} onClick={() => handleSelect(q.id, val)}>
                          {label}
                        </button>
                      );
                    })}
                  </div>
                  {submitted && given !== undefined && q.explanation && (
                    <MaxBubble
                      correct={correct}
                      message={correct
                        ? `Sehr gut! ${q.explanation}`
                        : `Leider falsch. Die richtige Antwort ist: ${q.answer === true ? "Richtig" : "Falsch"}. ${q.explanation}`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
        {submitted ? (
          <>
            <span className={`text-sm font-bold ${score === part.questions.length ? "text-green-600" : score >= part.questions.length / 2 ? "text-yellow-600" : "text-red-600"}`}>
              Ergebnis: {score} / {part.questions.length} Punkte
              {score === part.questions.length && " — Perfekt! 🎉"}
            </span>
            <button onClick={reset} className="px-4 py-1.5 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm font-medium text-gray-700 transition-colors">
              Nochmal versuchen
            </button>
          </>
        ) : (
          <button
            onClick={() => setSubmitted(true)}
            disabled={!allAnswered}
            className="ml-auto px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors"
          >
            Antworten überprüfen
          </button>
        )}
      </div>
    </div>
  );
}
