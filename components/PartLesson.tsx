"use client";

import { useState } from "react";
import { COLOR, type SectionColor } from "@/lib/colors";
import type { PatternGroup } from "./PatternTips";

export interface WorkedExample {
  setup: string;
  question: string;
  steps: string[];
  answer: string;
}

export interface TryIt {
  setup: string;
  question: string;
  options: string[];
  answer: string;
  hint: string;
  explanation: string;
}

export interface PartLessonContent {
  partName: string;
  intro: string;
  tips: PatternGroup[];
  workedExample: WorkedExample;
  tryIt: TryIt;
}

interface Props {
  content: PartLessonContent;
  accent: SectionColor;
  onReady: () => void;
}

type View = "intro" | "tips" | "worked" | "try-it";

export default function PartLesson({ content, accent, onReady }: Props) {
  const [view, setView] = useState<View>("intro");
  const a = COLOR[accent];

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="text-center mb-6">
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-3 ${a.tag}`}>
          Lesson — {content.partName}
        </div>
        {/* Step bar */}
        <div className="flex items-center justify-center gap-2 mt-2">
          {(["intro", "tips", "worked", "try-it"] as View[]).map((v, i) => (
            <div key={v} className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                view === v ? `${a.header} text-white` :
                (["intro","tips","worked","try-it"] as View[]).indexOf(view) > i ? "bg-gray-300 text-white" :
                "bg-gray-100 text-gray-400"
              }`}>{i + 1}</div>
              {i < 3 && <div className={`w-8 h-0.5 ${(["intro","tips","worked","try-it"] as View[]).indexOf(view) > i ? "bg-gray-300" : "bg-gray-100"}`} />}
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-6 mt-1 text-xs text-gray-400">
          <span>Intro</span><span>Tips</span><span>Example</span><span>Try it</span>
        </div>
      </div>

      {view === "intro" && <IntroView content={content} accent={accent} onNext={() => setView("tips")} />}
      {view === "tips" && <TipsView content={content} accent={accent} onNext={() => setView("worked")} />}
      {view === "worked" && <WorkedView content={content} accent={accent} onNext={() => setView("try-it")} />}
      {view === "try-it" && <TryItView content={content} accent={accent} onReady={onReady} />}
    </div>
  );
}

/* ── Intro ── */
function IntroView({ content, accent, onNext }: { content: PartLessonContent; accent: SectionColor; onNext: () => void }) {
  const a = COLOR[accent];
  return (
    <div className={`rounded-2xl border ${a.border} overflow-hidden`}>
      <div className={`${a.header} px-6 py-5`}>
        <p className="text-white/70 text-xs font-semibold uppercase tracking-wide mb-1">What to expect</p>
        <h3 className="text-white font-bold text-xl">{content.partName}</h3>
      </div>
      <div className="bg-white px-6 py-6 space-y-4">
        <p className="text-gray-700 leading-relaxed">{content.intro}</p>
        <div className={`rounded-xl ${a.light} border ${a.border} px-4 py-3`}>
          <p className={`text-xs font-bold ${a.text} mb-2 uppercase tracking-wide`}>In this lesson you will:</p>
          <ul className="space-y-1.5 text-sm text-gray-700">
            <li className="flex items-start gap-2"><span>📋</span> Review the key strategies for this part</li>
            <li className="flex items-start gap-2"><span>🔍</span> Walk through a worked example step by step</li>
            <li className="flex items-start gap-2"><span>✏️</span> Try a practice question with hints</li>
          </ul>
        </div>
        <button
          onClick={onNext}
          className={`w-full py-3 rounded-xl text-white text-sm font-bold transition-colors ${a.btn}`}
        >
          Let&apos;s learn the strategy →
        </button>
      </div>
    </div>
  );
}

/* ── Tips ── */
function TipsView({ content, accent, onNext }: { content: PartLessonContent; accent: SectionColor; onNext: () => void }) {
  const [step, setStep] = useState(0);
  const a = COLOR[accent];
  const group = content.tips[step];
  const c = COLOR[group.color];
  const isLast = step === content.tips.length - 1;

  return (
    <div className={`rounded-2xl border ${a.border} overflow-hidden`}>
      <div className={`${c.header} px-6 py-4 flex items-center gap-3`}>
        <span className="text-2xl">{group.emoji}</span>
        <div className="flex-1">
          <p className="text-white font-bold text-base leading-tight">{group.title}</p>
          <p className="text-white/60 text-xs mt-0.5">{step + 1} of {content.tips.length}</p>
        </div>
        <div className="flex gap-1">
          {content.tips.map((_, i) => (
            <button key={i} onClick={() => setStep(i)}
              className={`h-1.5 rounded-full transition-all ${i === step ? "w-6 bg-white" : "w-1.5 bg-white/40"}`} />
          ))}
        </div>
      </div>
      <div className="bg-white px-6 py-5 space-y-3">
        {group.patterns.map((p, i) => (
          <div key={i} className={`rounded-xl border ${c.border} overflow-hidden`}>
            <div className={`px-4 py-2 ${c.light}`}>
              <p className={`text-sm font-bold ${c.text}`}>{p.label}</p>
            </div>
            <div className="px-4 py-3 space-y-1.5">
              <p className="text-sm font-mono bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-gray-800 leading-relaxed">
                {p.template}
              </p>
              <p className="text-xs text-gray-500 italic">e.g.: {p.example}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="px-6 pb-5 flex gap-3">
        <button
          onClick={() => setStep(s => s - 1)} disabled={step === 0}
          className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 disabled:opacity-30 transition-colors"
        >← Back</button>
        {isLast ? (
          <button onClick={onNext}
            className={`flex-1 py-2.5 rounded-xl text-white text-sm font-bold transition-colors ${a.btn}`}>
            See a worked example →
          </button>
        ) : (
          <button onClick={() => setStep(s => s + 1)}
            className={`flex-1 py-2.5 rounded-xl text-white text-sm font-semibold transition-colors ${a.btn}`}>
            Next tip →
          </button>
        )}
      </div>
    </div>
  );
}

/* ── Worked Example ── */
function WorkedView({ content, accent, onNext }: { content: PartLessonContent; accent: SectionColor; onNext: () => void }) {
  const [revealed, setRevealed] = useState(0); // how many steps shown
  const a = COLOR[accent];
  const ex = content.workedExample;
  const allStepsShown = revealed >= ex.steps.length;

  return (
    <div className={`rounded-2xl border ${a.border} overflow-hidden`}>
      <div className={`${a.header} px-6 py-4`}>
        <p className="text-white/70 text-xs font-semibold uppercase tracking-wide mb-1">Worked Example</p>
        <p className="text-white font-bold text-base">Watch how to think through this</p>
      </div>
      <div className="bg-white px-6 py-5 space-y-4">
        {/* Setup */}
        <div className="rounded-xl bg-gray-50 border border-gray-200 px-4 py-3">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">The text / situation:</p>
          <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">{ex.setup}</p>
        </div>

        {/* Question */}
        <div className={`rounded-xl ${a.light} border ${a.border} px-4 py-3`}>
          <p className={`text-xs font-bold uppercase tracking-wide mb-1 ${a.text}`}>The question:</p>
          <p className="text-sm font-semibold text-gray-800">{ex.question}</p>
        </div>

        {/* Step-by-step reasoning */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Tutor thinking:</p>
          {ex.steps.slice(0, revealed).map((step, i) => (
            <div key={i} className="flex gap-3 items-start animate-in fade-in duration-300">
              <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white mt-0.5 ${a.header}`}>
                {i + 1}
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{step}</p>
            </div>
          ))}
          {!allStepsShown && (
            <button onClick={() => setRevealed(r => r + 1)}
              className={`text-sm font-semibold ${a.text} hover:underline`}>
              {revealed === 0 ? "Show first step →" : "Next step →"}
            </button>
          )}
        </div>

        {/* Final answer */}
        {allStepsShown && (
          <div className="rounded-xl bg-green-50 border border-green-200 px-4 py-3 space-y-1 animate-in fade-in duration-300">
            <p className="text-xs font-bold text-green-700 uppercase tracking-wide">Answer &amp; takeaway:</p>
            <p className="text-sm text-gray-800 leading-relaxed">{ex.answer}</p>
          </div>
        )}

        {allStepsShown && (
          <button onClick={onNext}
            className={`w-full py-3 rounded-xl text-white text-sm font-bold transition-colors ${a.btn}`}>
            Now you try →
          </button>
        )}
      </div>
    </div>
  );
}

/* ── Try It ── */
function TryItView({ content, accent, onReady }: { content: PartLessonContent; accent: SectionColor; onReady: () => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const a = COLOR[accent];
  const ti = content.tryIt;
  const answered = selected !== null;
  const correct = selected === ti.answer;

  return (
    <div className={`rounded-2xl border ${a.border} overflow-hidden`}>
      <div className={`${a.header} px-6 py-4`}>
        <p className="text-white/70 text-xs font-semibold uppercase tracking-wide mb-1">Try It</p>
        <p className="text-white font-bold text-base">Your turn — use what you just learned</p>
      </div>
      <div className="bg-white px-6 py-5 space-y-4">
        {/* Setup */}
        <div className="rounded-xl bg-gray-50 border border-gray-200 px-4 py-3">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Situation:</p>
          <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">{ti.setup}</p>
        </div>

        {/* Question */}
        <p className="text-sm font-semibold text-gray-800">{ti.question}</p>

        {/* Options */}
        <div className="space-y-2">
          {ti.options.map((opt) => {
            const isSelected = selected === opt;
            const isCorrect = opt === ti.answer;
            let cls = "border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50";
            if (answered) {
              if (isCorrect) cls = "border-green-400 bg-green-50 text-green-800";
              else if (isSelected) cls = "border-red-400 bg-red-50 text-red-800";
              else cls = "border-gray-100 text-gray-400";
            }
            return (
              <button
                key={opt}
                onClick={() => !answered && setSelected(opt)}
                disabled={answered}
                className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-colors ${cls}`}
              >
                {answered && isCorrect && <span className="mr-2">✅</span>}
                {answered && isSelected && !isCorrect && <span className="mr-2">❌</span>}
                {opt}
              </button>
            );
          })}
        </div>

        {/* Hint */}
        {!answered && (
          <button onClick={() => setShowHint(v => !v)}
            className="text-xs text-gray-400 hover:text-gray-600 underline underline-offset-2 transition-colors">
            {showHint ? "Hide hint" : "Show hint 💡"}
          </button>
        )}
        {showHint && !answered && (
          <div className="rounded-xl bg-yellow-50 border border-yellow-200 px-4 py-3">
            <p className="text-xs font-bold text-yellow-700 mb-1">Hint:</p>
            <p className="text-sm text-gray-700">{ti.hint}</p>
          </div>
        )}

        {/* Explanation after answering */}
        {answered && (
          <div className={`rounded-xl px-4 py-3 border animate-in fade-in duration-300 ${correct ? "bg-green-50 border-green-200" : "bg-blue-50 border-blue-200"}`}>
            <p className={`text-xs font-bold uppercase tracking-wide mb-1 ${correct ? "text-green-700" : "text-blue-700"}`}>
              {correct ? "Correct! 🎉" : "Not quite — here's why:"}
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">{ti.explanation}</p>
          </div>
        )}

        {answered && (
          <button onClick={onReady}
            className={`w-full py-3 rounded-xl text-white text-sm font-bold transition-colors shadow-sm ${a.btn}`}>
            I&apos;m ready — Start Practice →
          </button>
        )}
      </div>
    </div>
  );
}
