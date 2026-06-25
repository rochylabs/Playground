"use client";

import { useState } from "react";
import type { PatternGroup } from "./PatternTips";

const COLOR = {
  blue:   { header: "bg-blue-600",   light: "bg-blue-50",   border: "border-blue-200", text: "text-blue-800",   tag: "bg-blue-100 text-blue-700",   btn: "bg-blue-600 hover:bg-blue-700" },
  green:  { header: "bg-green-600",  light: "bg-green-50",  border: "border-green-200",text: "text-green-800",  tag: "bg-green-100 text-green-700",  btn: "bg-green-600 hover:bg-green-700" },
  yellow: { header: "bg-yellow-500", light: "bg-yellow-50", border: "border-yellow-200",text: "text-yellow-800",tag: "bg-yellow-100 text-yellow-700",btn: "bg-yellow-500 hover:bg-yellow-600" },
  red:    { header: "bg-red-600",    light: "bg-red-50",    border: "border-red-200",  text: "text-red-800",   tag: "bg-red-100 text-red-700",     btn: "bg-red-600 hover:bg-red-700" },
  purple: { header: "bg-purple-600", light: "bg-purple-50", border: "border-purple-200",text: "text-purple-800",tag: "bg-purple-100 text-purple-700",btn: "bg-purple-600 hover:bg-purple-700" },
  orange: { header: "bg-orange-500", light: "bg-orange-50", border: "border-orange-200",text: "text-orange-800",tag: "bg-orange-100 text-orange-700",btn: "bg-orange-500 hover:bg-orange-600" },
};

interface Props {
  groups: PatternGroup[];
  sectionName: string;
  accent?: PatternGroup["color"];
  onStart: () => void;
}

export default function LessonView({ groups, sectionName, accent = "blue", onStart }: Props) {
  const [step, setStep] = useState(0);
  const group = groups[step];
  const c = COLOR[group.color];
  const isLast = step === groups.length - 1;

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Lesson — {sectionName}</p>
        <h2 className="text-2xl font-bold text-gray-900">Before you practice, let&apos;s review the key strategies.</h2>
        <p className="text-gray-500 text-sm mt-1">Step through each topic, then start when you&apos;re ready.</p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-1.5 mb-6 justify-center flex-wrap">
        {groups.map((g, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            title={g.title}
            className={`h-2 rounded-full transition-all ${i === step ? "w-8 " + COLOR[g.color].header : "w-2 bg-gray-200 hover:bg-gray-300"}`}
          />
        ))}
      </div>

      {/* Lesson card */}
      <div className={`rounded-2xl border ${c.border} overflow-hidden shadow-sm`}>
        {/* Card header */}
        <div className={`${c.header} px-6 py-4 flex items-center gap-3`}>
          <span className="text-2xl">{group.emoji}</span>
          <div>
            <p className="text-white font-bold text-lg leading-tight">{group.title}</p>
            <p className="text-white/70 text-xs mt-0.5">{step + 1} of {groups.length}</p>
          </div>
        </div>

        {/* Patterns */}
        <div className="px-6 py-5 bg-white space-y-4">
          {group.patterns.map((p, i) => (
            <div key={i} className={`rounded-xl border ${c.border} overflow-hidden`}>
              <div className={`px-4 py-2 ${c.light}`}>
                <p className={`text-sm font-bold ${c.text}`}>{p.label}</p>
              </div>
              <div className="px-4 py-3 space-y-2">
                <p className="text-sm font-mono bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-gray-800 leading-relaxed">
                  {p.template}
                </p>
                <p className="text-xs text-gray-500 italic">e.g.: {p.example}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6 gap-3">
        <button
          onClick={() => setStep((s) => s - 1)}
          disabled={step === 0}
          className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-600 text-sm font-semibold hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          ← Previous
        </button>

        {isLast ? (
          <button
            onClick={onStart}
            className={`flex-1 sm:flex-none px-8 py-3 rounded-xl text-white text-sm font-bold ${COLOR[accent].btn} transition-colors shadow-sm`}
          >
            I&apos;m ready — Start Practice Exam →
          </button>
        ) : (
          <button
            onClick={() => setStep((s) => s + 1)}
            className={`flex-1 sm:flex-none px-8 py-3 rounded-xl text-white text-sm font-semibold ${COLOR[accent].btn} transition-colors`}
          >
            Next →
          </button>
        )}
      </div>

      {/* Skip */}
      <p className="text-center mt-4">
        <button
          onClick={onStart}
          className="text-xs text-gray-400 hover:text-gray-600 underline underline-offset-2 transition-colors"
        >
          Skip lesson and go straight to the practice exam
        </button>
      </p>
    </div>
  );
}
