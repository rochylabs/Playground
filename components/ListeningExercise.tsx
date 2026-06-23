"use client";

import { useState } from "react";
import type { ListeningPart } from "@/data/listening";
import MaxBubble from "@/components/MaxBubble";
import GermanAudio from "@/components/GermanAudio";
import type { QuestionResult } from "@/components/WeakSpots";

const SPEAKER_LINE_RE = /^([\w\s./äöüÄÖÜß]{1,35}):\s+(.+)$/;

function TranscriptBubbles({ text }: { text: string }) {
  const speakerColors = ["bg-blue-100 text-blue-900", "bg-purple-100 text-purple-900"];
  const speakerOrder: string[] = [];
  const lines = text.trim().split("\n").map((raw) => {
    const m = SPEAKER_LINE_RE.exec(raw.trim());
    if (!m) return { speaker: null, speech: raw.trim() };
    const speaker = m[1].trim();
    if (!speakerOrder.includes(speaker)) speakerOrder.push(speaker);
    return { speaker, speech: m[2].trim() };
  });

  return (
    <div className="space-y-2 border-t border-green-200 pt-2">
      {lines.map((line, i) => {
        if (!line.speaker) {
          return <p key={i} className="text-xs text-gray-500 italic">{line.speech}</p>;
        }
        const idx = speakerOrder.indexOf(line.speaker);
        const colorCls = speakerColors[idx % speakerColors.length];
        return (
          <div key={i} className={`rounded-lg px-2.5 py-1.5 text-xs ${colorCls}`}>
            <span className="font-bold block text-[10px] uppercase tracking-wide opacity-70">{line.speaker}</span>
            {line.speech}
          </div>
        );
      })}
    </div>
  );
}

const qOffsets = [0, 6, 10];

export default function ListeningExercise({ part, onSubmit }: { part: ListeningPart; onSubmit?: (earned: number, total: number, results: QuestionResult[]) => void }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showTranscript, setShowTranscript] = useState<Record<number, boolean>>({});

  const handleSelect = (qId: string, val: string) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qId]: val }));
  };

  const allAnswered = part.questions.every((q) => answers[q.id]);
  const score = part.questions.filter(
    (q) => answers[q.id]?.toLowerCase() === q.answer.toLowerCase()
  ).length;

  const reset = () => { setAnswers({}); setSubmitted(false); setShowTranscript({}); };

  const qOffset = qOffsets[part.part - 1];
  // Teil 2 is heard once; Teil 1 & 3 heard twice
  const maxPlays = part.part === 2 ? 1 : 2;

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      {/* Exam header */}
      <div className="bg-green-700 px-6 py-3 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-green-200">{part.partLabel}</span>
          <h2 className="text-white font-bold text-base mt-0.5">{part.taskLabel}</h2>
        </div>
        <span className="text-xs font-semibold text-green-100 bg-green-800 rounded-full px-3 py-1">
          {part.points} Punkte
        </span>
      </div>

      {/* Instruction */}
      <div className="px-6 py-4 bg-green-50 border-b border-green-100">
        <p className="text-sm text-gray-700">{part.instruction}</p>
        <p className="text-xs text-green-700 font-semibold mt-1">{part.playsLabel}</p>
      </div>

      {/* Questions — each paired with its own audio */}
      <div className="divide-y divide-gray-100">
        {part.questions.map((q, idx) => {
          const given = answers[q.id];
          const correct = given?.toLowerCase() === q.answer.toLowerCase();
          const isTF = part.type === "richtig-falsch";
          const script = part.scripts[idx];
          const transcriptOpen = showTranscript[idx] ?? false;

          return (
            <div key={q.id} className="p-5">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Audio panel */}
                <div className="sm:w-56 flex-shrink-0 bg-green-50 border border-green-200 rounded-xl p-4 flex flex-col gap-3">
                  {script?.label && (
                    <p className="text-xs font-bold text-green-700">{script.label}</p>
                  )}
                  <GermanAudio
                    audioId={q.id}
                    text={script?.text ?? ""}
                    maxPlays={maxPlays}
                  />
                  <button
                    onClick={() => setShowTranscript((s) => ({ ...s, [idx]: !s[idx] }))}
                    className="text-xs text-green-600 font-medium hover:underline text-left"
                  >
                    {transcriptOpen ? "Transkript ausblenden ▲" : "Transkript anzeigen ▼"}
                  </button>
                  {transcriptOpen && script?.text && (
                    <TranscriptBubbles text={script.text} />
                  )}
                </div>

                {/* Question panel */}
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800 mb-3">
                    <span className="font-bold text-green-700 mr-1">{qOffset + idx + 1}.</span>
                    {q.statement}
                  </p>

                  {isTF ? (
                    <div className="flex gap-3">
                      {["richtig", "falsch"].map((val) => {
                        const label = val === "richtig" ? "Richtig" : "Falsch";
                        const isSelected = given === val;
                        const isCorrectOpt = val === q.answer;
                        let cls = "px-5 py-2 rounded-lg border text-sm font-semibold transition-colors ";
                        if (submitted) {
                          if (isSelected && correct) cls += "bg-green-100 border-green-500 text-green-700";
                          else if (isSelected && !correct) cls += "bg-red-100 border-red-500 text-red-700";
                          else if (!isSelected && isCorrectOpt) cls += "bg-green-50 border-green-400 text-green-600";
                          else cls += "border-gray-200 text-gray-400";
                        } else {
                          cls += isSelected
                            ? "bg-green-100 border-green-500 text-green-700"
                            : "border-gray-300 text-gray-600 hover:border-green-400 hover:bg-green-50";
                        }
                        return (
                          <button key={val} className={cls} onClick={() => handleSelect(q.id, val)} aria-pressed={isSelected}>
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      {(q.options ?? []).map((opt) => {
                        const optKey = opt.charAt(0).toLowerCase();
                        const isSelected = given === optKey;
                        const isCorrectOpt = optKey === q.answer;
                        let cls = "px-4 py-2 rounded-lg border text-sm font-medium transition-colors text-left ";
                        if (submitted) {
                          if (isSelected && correct) cls += "bg-green-100 border-green-500 text-green-700";
                          else if (isSelected && !correct) cls += "bg-red-100 border-red-500 text-red-700";
                          else if (!isSelected && isCorrectOpt) cls += "bg-green-50 border-green-400 text-green-600";
                          else cls += "border-gray-200 text-gray-400";
                        } else {
                          cls += isSelected
                            ? "bg-green-100 border-green-500 text-green-700"
                            : "border-gray-300 text-gray-600 hover:border-green-400 hover:bg-green-50";
                        }
                        return (
                          <button key={opt} className={cls} onClick={() => handleSelect(q.id, optKey)} aria-pressed={isSelected}>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {submitted && given !== undefined && q.explanation && (
                    <MaxBubble
                      correct={correct}
                      message={
                        correct
                          ? `Sehr gut! ${q.explanation}`
                          : `Leider falsch. Die richtige Antwort ist: ${
                              isTF
                                ? q.answer === "richtig" ? "Richtig" : "Falsch"
                                : q.answer.toUpperCase()
                            }. ${q.explanation}`
                      }
                      className="mt-3"
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
        {submitted ? (
          <>
            <span className={`text-sm font-bold ${score === part.questions.length ? "text-green-600" : score >= part.questions.length / 2 ? "text-yellow-600" : "text-red-600"}`}>
              Ergebnis: {score} / {part.questions.length} Punkte
              {score === part.questions.length && " — Ausgezeichnet! 🎉"}
            </span>
            <button onClick={reset} className="px-4 py-1.5 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm font-medium text-gray-700 transition-colors">
              Nochmal versuchen
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              setSubmitted(true);
              const results: QuestionResult[] = part.questions.map((q) => ({
                questionType: part.type === "richtig-falsch" ? "richtig-falsch" : "multiple-choice",
                correct: answers[q.id]?.toLowerCase() === q.answer.toLowerCase(),
              }));
              onSubmit?.(score, part.questions.length, results);
            }}
            disabled={!allAnswered}
            className="ml-auto px-5 py-2 rounded-lg bg-green-700 hover:bg-green-800 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors"
          >
            Antworten überprüfen
          </button>
        )}
      </div>
    </div>
  );
}
