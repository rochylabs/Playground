"use client";

import { useState, useMemo } from "react";
import type {
  SpeakingPart1Data,
  SpeakingPart2Data,
  SpeakingPart3Data,
  Part3CardType,
} from "@/data/speaking";
import MaxBubble from "@/components/MaxBubble";
import SpeakingIllustration, { type IllustrationKey } from "@/components/SpeakingIllustration";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const TYPE_CONFIG: Record<Part3CardType, { label: string; color: string; bg: string; border: string; desc: string }> = {
  bitten:    { label: "Bitten",    color: "text-blue-700",  bg: "bg-blue-100",  border: "border-blue-300",  desc: "Stellen Sie eine Bitte" },
  reagieren: { label: "Reagieren", color: "text-green-700", bg: "bg-green-100", border: "border-green-300", desc: "Reagieren Sie auf eine Bitte" },
  verboten:  { label: "Verboten",  color: "text-red-700",   bg: "bg-red-100",   border: "border-red-400",   desc: "Erklären Sie, dass etwas nicht erlaubt ist" },
};

/* ─── Part 1 ──────────────────────────────────────────────────────────────── */
export function SpeakingPart1({ data }: { data: SpeakingPart1Data }) {
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="bg-red-600 px-6 py-3 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-red-200">{data.partLabel}</span>
          <h2 className="text-white font-bold text-base mt-0.5">{data.taskLabel}</h2>
        </div>
        <span className="text-xs font-semibold text-red-100 bg-red-700 rounded-full px-3 py-1">Teil 1</span>
      </div>

      <div className="px-6 py-4 bg-red-50 border-b border-red-100">
        <p className="text-sm text-gray-700">{data.instruction}</p>
      </div>

      <div className="p-6 flex flex-col lg:flex-row gap-6">
        {/* Exam card */}
        <div className="lg:w-64 flex-shrink-0">
          <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-2">Aufgabenkarte</p>
          <div className="border-2 border-red-200 rounded-xl p-4 bg-red-50">
            <p className="text-xs font-bold text-red-600 uppercase tracking-wide mb-3">{data.cardTitle}</p>
            <ul className="space-y-2">
              {data.prompts.map((p, i) => (
                <li key={i} className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                  <span className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0" />
                  {p.keyword}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Practice area */}
        <div className="flex-1 space-y-3">
          <p className="text-xs font-bold uppercase tracking-wide text-gray-400">Üben Sie laut</p>
          {data.prompts.map((p, i) => (
            <div key={i} className="border border-gray-100 rounded-lg overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50">
                <p className="text-sm font-semibold text-gray-700">{p.keyword}</p>
                <button
                  onClick={() => setRevealed((r) => ({ ...r, [i]: !r[i] }))}
                  className="text-xs text-red-600 font-semibold hover:underline ml-3 flex-shrink-0"
                >
                  {revealed[i] ? "Ausblenden ▲" : "Beispiel ▼"}
                </button>
              </div>
              {revealed[i] && (
                <div className="px-4 py-2.5 border-t border-gray-100 flex gap-2 items-start">
                  <span className="text-base">🐶</span>
                  <p className="text-sm text-gray-700 italic">{p.example}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
        <MaxBubble correct={true} message={data.tip} />
      </div>
    </div>
  );
}

/* ─── Part 2 — picture cards, shuffled ───────────────────────────────────── */
export function SpeakingPart2({ data }: { data: SpeakingPart2Data }) {
  const shuffled = useMemo(() => shuffle(data.cards), [data]);
  const [idx, setIdx]           = useState(0);
  const [drawn, setDrawn]       = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const card = shuffled[idx];
  const total = shuffled.length;

  const draw = () => { setDrawn(true); setShowAnswer(false); };
  const next = () => { setIdx((i) => (i + 1) % total); setDrawn(false); setShowAnswer(false); };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="bg-red-600 px-6 py-3 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-red-200">{data.partLabel}</span>
          <h2 className="text-white font-bold text-base mt-0.5">{data.taskLabel}</h2>
        </div>
        <span className="text-xs font-semibold text-red-100 bg-red-700 rounded-full px-3 py-1">Teil 2</span>
      </div>

      <div className="px-6 py-4 bg-red-50 border-b border-red-100">
        <p className="text-sm text-gray-700">{data.instruction}</p>
      </div>

      <div className="p-6 flex flex-col items-center gap-5">
        {/* Card counter */}
        <p className="text-xs text-gray-400 font-semibold self-end">Karte {idx + 1} / {total}</p>

        {/* Exam-style text card */}
        {!drawn ? (
          <div className="flex flex-col items-center gap-4">
            {/* Face-down card — plain back like real exam */}
            <div className="w-56 rounded-lg bg-gray-800 shadow-lg overflow-hidden cursor-pointer select-none border border-gray-600"
              onClick={draw}>
              <div className="flex justify-between items-center px-3 py-1.5 bg-gray-700">
                <span className="text-xs font-bold text-gray-300">Start Deutsch 1</span>
                <span className="text-xs font-bold text-gray-300">Sprechen Teil 2</span>
              </div>
              <div className="h-36 flex items-center justify-center">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Themenkarte</p>
              </div>
            </div>
            <button onClick={draw}
              className="px-5 py-2 rounded-full bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors shadow">
              Karte ziehen ▶
            </button>
          </div>
        ) : (
          <div className="w-full max-w-sm">
            {/* Face-up exam card — text only, exactly like the real Kandidatenblätter */}
            <div className="border border-gray-300 shadow-md overflow-hidden bg-white">
              {/* Header bar */}
              <div className="flex justify-between items-center px-3 py-1.5 bg-gray-700">
                <span className="text-xs font-bold text-white">Start Deutsch 1</span>
                <span className="text-xs font-bold text-white">Sprechen Teil 2</span>
              </div>
              {/* Theme sub-header */}
              <div className="bg-gray-200 px-3 py-1 text-center border-b border-gray-300">
                <p className="text-xs font-bold text-gray-700">Thema: {card.theme}</p>
              </div>
              {/* Keyword — large bold centered, like the real cards */}
              <div className="flex items-center justify-center px-6 py-10 min-h-[140px]">
                <p className="text-4xl sm:text-5xl font-black text-gray-900 text-center leading-tight">{card.keyword}</p>
              </div>
            </div>

            {/* Practice area below the card */}
            <div className="mt-4 space-y-3">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-1">Stellen Sie diese Frage:</p>
                <p className="text-sm font-semibold text-gray-800 italic">{card.exampleQuestion}</p>
              </div>

              <button onClick={() => setShowAnswer((v) => !v)}
                className="text-sm font-semibold text-red-600 hover:underline w-full text-left">
                {showAnswer ? "Beispielantwort ausblenden ▲" : "Beispielantwort anzeigen ▼"}
              </button>
              {showAnswer && (
                <div className="bg-red-50 rounded-xl p-3 border border-red-100">
                  <p className="text-xs font-semibold text-gray-500 mb-1">Beispielantwort:</p>
                  <p className="text-sm text-gray-700 italic">{card.exampleAnswer}</p>
                </div>
              )}

              <button onClick={next}
                className="w-full mt-2 px-4 py-2 rounded-full border border-red-300 text-red-600 text-sm font-semibold hover:bg-red-50 transition-colors">
                Nächste Karte →
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
        <MaxBubble correct={true} message={data.tip} />
      </div>
    </div>
  );
}

/* ─── Part 3 — picture cards with bitten / reagieren / verboten ──────────── */
export function SpeakingPart3({ data }: { data: SpeakingPart3Data }) {
  const shuffled = useMemo(() => shuffle(data.cards), [data]);
  const [idx, setIdx]             = useState(0);
  const [drawn, setDrawn]         = useState(false);
  const [showResponse, setShowResponse] = useState(false);

  const card   = shuffled[idx];
  const total  = shuffled.length;
  const config = TYPE_CONFIG[card.type];

  const draw = () => { setDrawn(true); setShowResponse(false); };
  const next = () => { setIdx((i) => (i + 1) % total); setDrawn(false); setShowResponse(false); };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="bg-red-600 px-6 py-3 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-red-200">{data.partLabel}</span>
          <h2 className="text-white font-bold text-base mt-0.5">{data.taskLabel}</h2>
        </div>
        <span className="text-xs font-semibold text-red-100 bg-red-700 rounded-full px-3 py-1">Teil 3</span>
      </div>

      <div className="px-6 py-4 bg-red-50 border-b border-red-100">
        <p className="text-sm text-gray-700">{data.instruction}</p>
        {/* Legend */}
        <div className="flex flex-wrap gap-2 mt-3">
          {(Object.entries(TYPE_CONFIG) as [Part3CardType, typeof TYPE_CONFIG[Part3CardType]][]).map(([type, cfg]) => (
            <span key={type} className={`text-xs font-semibold px-2.5 py-1 rounded-full ${cfg.bg} ${cfg.color} border ${cfg.border}`}>
              {cfg.label}: {cfg.desc}
            </span>
          ))}
        </div>
      </div>

      <div className="p-6 flex flex-col items-center gap-5">
        <p className="text-xs text-gray-400 font-semibold self-end">Karte {idx + 1} / {total}</p>

        {!drawn ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-48 h-60 rounded-2xl bg-gradient-to-br from-red-600 to-red-700 shadow-lg flex items-center justify-center cursor-pointer select-none border-4 border-red-300"
              onClick={draw}>
              <div className="text-center text-white">
                <div className="text-4xl mb-2">🎴</div>
                <p className="text-xs font-bold uppercase tracking-widest opacity-80">Situationskarte</p>
              </div>
            </div>
            <button onClick={draw}
              className="px-5 py-2 rounded-full bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors shadow">
              Karte ziehen ▶
            </button>
          </div>
        ) : (
          <div className="w-full max-w-sm">
            {/* Picture card */}
            <div className="rounded-2xl border-2 border-red-300 overflow-hidden shadow-lg">
              {/* Picture area */}
              <div className="h-44 bg-white flex items-center justify-center border-b border-red-100 relative p-2">
                <SpeakingIllustration imageKey={card.imageKey as IllustrationKey} className="w-full h-full" />
                {/* Type badge */}
                <span className={`absolute top-2 right-2 text-xs font-bold px-2.5 py-1 rounded-full ${config.bg} ${config.color} border ${config.border}`}>
                  {config.label}
                </span>
              </div>
              {/* Situation */}
              <div className="p-4 bg-white">
                <p className="text-sm font-semibold text-gray-800 leading-snug">{card.situation}</p>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {/* Partner prompt for reagieren / verboten */}
              {card.partnerPrompt && (
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-1">Partner / Partnerin sagt:</p>
                  <p className="text-sm font-semibold text-gray-700 italic">{card.partnerPrompt}</p>
                </div>
              )}

              <p className="text-xs font-semibold text-gray-500">
                {card.type === "bitten"    && "Was sagen Sie? Stellen Sie eine Bitte."}
                {card.type === "reagieren" && "Was antworten Sie?"}
                {card.type === "verboten"  && "Was sagen Sie? Erklären Sie, dass etwas verboten ist."}
              </p>

              <button onClick={() => setShowResponse((v) => !v)}
                className="text-sm font-semibold text-red-600 hover:underline w-full text-left">
                {showResponse ? "Musterlösung ausblenden ▲" : "Musterlösung anzeigen ▼"}
              </button>

              {showResponse && (
                <div className="space-y-2">
                  {/* Verboten highlight */}
                  {card.type === "verboten" && (
                    <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-2 flex items-center gap-2">
                      <span className="text-lg">🚫</span>
                      <p className="text-xs font-bold text-red-700 uppercase tracking-wide">Das ist verboten!</p>
                    </div>
                  )}
                  <div className="flex gap-2 items-start bg-red-50 rounded-xl p-3 border border-red-100">
                    <span className="text-base flex-shrink-0">🐶</span>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 mb-1">Sie sagen:</p>
                      <p className="text-sm text-gray-800 font-medium italic">{card.modelResponse}</p>
                    </div>
                  </div>
                  {card.partnerReply && (
                    <div className="flex gap-2 items-start bg-gray-50 rounded-xl p-3 border border-gray-100">
                      <span className="text-base flex-shrink-0">👤</span>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 mb-1">Partner / Partnerin antwortet:</p>
                        <p className="text-sm text-gray-600 italic">{card.partnerReply}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <button onClick={next}
                className="w-full mt-2 px-4 py-2 rounded-full border border-red-300 text-red-600 text-sm font-semibold hover:bg-red-50 transition-colors">
                Nächste Karte →
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
        <MaxBubble correct={true} message={data.tip} />
      </div>
    </div>
  );
}
