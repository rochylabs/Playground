"use client";

import { useState } from "react";
import { speakingExamSets } from "@/data/speaking";
import { useRandomIndex } from "@/hooks/useRandomIndex";
import { useExamScore } from "@/hooks/useExamScore";
import { useExamTimer } from "@/hooks/useExamTimer";
import ExamSummary from "@/components/ExamSummary";
import ExamTimer from "@/components/ExamTimer";
import { SpeakingPart1, SpeakingPart2, SpeakingPart3 } from "@/components/SpeakingCard";
import PatternTips, { type PatternGroup } from "@/components/PatternTips";

const TIPS: PatternGroup[] = [
  {
    title: "Teil 1 — Sich vorstellen",
    emoji: "🙋",
    color: "red",
    patterns: [
      { label: "Name",     template: "Mein Name ist [Name]. / Ich heiße [Name].", example: "Mein Name ist Maria Reyes." },
      { label: "Herkunft", template: "Ich komme aus [Land / Stadt].", example: "Ich komme aus den Philippinen, aus Manila." },
      { label: "Wohnort",  template: "Ich wohne in [Stadt] / Ich lebe seit [Zeit] in [Stadt].", example: "Ich wohne seit einem Jahr in Berlin." },
      { label: "Beruf",    template: "Ich bin [Beruf]. / Ich arbeite als [Beruf].", example: "Ich bin Lehrerin. / Ich arbeite als Ingenieur." },
      { label: "Sprachen", template: "Ich spreche [Sprache] und lerne [Sprache].", example: "Ich spreche Englisch und lerne Deutsch." },
      { label: "Hobbys",   template: "In meiner Freizeit [Verb + Aktivität].", example: "In meiner Freizeit spiele ich Gitarre." },
    ],
  },
  {
    title: "Teil 2 — Fragen stellen (Thema + Stichwort)",
    emoji: "❓",
    color: "orange",
    patterns: [
      { label: "Was?",     template: "Was ist dein/Ihr [Stichwort]?",              example: "Was ist dein Lieblingsessen?" },
      { label: "Wie?",     template: "Wie [Verb] du/Sie [Stichwort]?",             example: "Wie fährst du zur Arbeit?" },
      { label: "Wo?",      template: "Wo [Verb] du/Sie [Stichwort]?",              example: "Wo wohnst du gerne?" },
      { label: "Hast du?", template: "Hast du / Haben Sie [Stichwort]?",           example: "Hast du Geschwister?" },
      { label: "Magst du?",template: "Was magst du / mögen Sie am liebsten [Kontext]?", example: "Welche Stadt magst du am liebsten?" },
      { label: "Machst du?",template: "Machst du / Machen Sie [Stichwort]?",      example: "Machst du Sport?" },
    ],
  },
  {
    title: "Teil 3 — Bitten (eine Bitte stellen)",
    emoji: "🙏",
    color: "blue",
    patterns: [
      { label: "Können Sie / Kannst du?", template: "Können Sie / Kannst du bitte [Infinitiv]?", example: "Kannst du mir bitte einen Stift leihen?" },
      { label: "Darf ich?",   template: "Darf ich bitte [Infinitiv]?",       example: "Darf ich bitte kurz Ihr Telefon benutzen?" },
      { label: "Ich hätte gern", template: "Ich hätte gern [Objekt], bitte.", example: "Ich hätte gern ein Glas Wasser, bitte." },
      { label: "Haben Sie?",  template: "Haben Sie [Objekt] für mich?",      example: "Haben Sie ein Wörterbuch für mich?" },
      { label: "Helfen",      template: "Können Sie mir bitte helfen? Ich [Problem].", example: "Können Sie mir bitte helfen? Ich suche den Bahnhof." },
    ],
  },
  {
    title: "Teil 3 — Verboten (erklären, was nicht erlaubt ist)",
    emoji: "🚫",
    color: "red",
    patterns: [
      { label: "Das ist verboten",  template: "Tut mir leid, das ist hier leider verboten.",               example: "Tut mir leid, das ist hier leider verboten." },
      { label: "Darf man nicht",    template: "Hier darf man nicht [Infinitiv].",                          example: "Hier darf man nicht rauchen." },
      { label: "Nicht erlaubt",     template: "Das ist hier leider nicht erlaubt.",                        example: "Fotografieren ist hier leider nicht erlaubt." },
      { label: "Bitte + Schild",    template: "Bitte lesen Sie das Schild — [Was] ist hier verboten.",     example: "Bitte lesen Sie das Schild — Rauchen ist hier verboten." },
      { label: "Kombination",       template: "Tut mir leid, aber hier darf man nicht [Infinitiv]. [Erklärung].", example: "Tut mir leid, aber hier darf man nicht essen. Das ist die Ruhezone." },
    ],
  },
  {
    title: "Teil 3 — Reagieren (auf eine Bitte antworten)",
    emoji: "💬",
    color: "green",
    patterns: [
      { label: "Ja, gerne",      template: "Ja, natürlich. / Ja, gerne! Hier bitte.",           example: "Ja, natürlich! Hier ist mein Stift." },
      { label: "Kein Problem",   template: "Kein Problem. / Das mache ich gerne.",               example: "Kein Problem. Ich passe kurz auf Ihre Tasche auf." },
      { label: "Leider nein",    template: "Tut mir leid, das geht leider nicht, weil [Grund].", example: "Tut mir leid, ich habe kein Ladekabel dabei." },
      { label: "Alternative",    template: "Das geht leider nicht, aber [Alternative].",         example: "Das geht leider nicht, aber Sie können Zimmer 302 nehmen." },
    ],
  },
  {
    title: "🆘 Wenn Sie nicht wissen / nicht verstehen",
    emoji: "🆘",
    color: "purple",
    patterns: [
      { label: "Ich verstehe nicht",  template: "Entschuldigung, ich verstehe das nicht ganz. Können Sie das bitte wiederholen?", example: "Können Sie das bitte langsamer sagen?" },
      { label: "Ich bin nicht sicher",template: "Ich bin nicht sicher, aber ich glaube, [Antwort].",   example: "Ich bin nicht sicher, aber ich glaube, das ist ein Café." },
      { label: "Auf dem Bild sehe ich",template: "Auf dem Bild sehe ich [Person / Ort / Objekt].",     example: "Auf dem Bild sehe ich eine Person in einem Restaurant." },
      { label: "Ich denke",           template: "Ich denke, hier ist [Ort / Situation]. Vielleicht ...", example: "Ich denke, hier ist ein Supermarkt. Vielleicht kauft die Person Lebensmittel." },
      { label: "Wie sagt man?",       template: "Wie sagt man [Wort] auf Deutsch?",                    example: "Wie sagt man 'ticket' auf Deutsch?" },
      { label: "Noch einmal bitte",   template: "Können Sie das bitte noch einmal sagen? / Wie bitte?", example: "Wie bitte? Ich habe das nicht verstanden." },
    ],
  },
];

const SPEAKING_PARTS = [
  { label: "Teil 1 – Sich vorstellen", max: 8 },
  { label: "Teil 2 – Thema & Fragen",  max: 8 },
  { label: "Teil 3 – Bitten & Reagieren", max: 9 },
];
const SELF_RATINGS = [
  { label: "Sehr gut", pct: 1.0,  emoji: "🌟" },
  { label: "Gut",      pct: 0.75, emoji: "😊" },
  { label: "OK",       pct: 0.55, emoji: "😐" },
  { label: "Schwach",  pct: 0.35, emoji: "😓" },
];

export default function SpeakingPage() {
  const [setIdx, setSetIdx] = useRandomIndex(speakingExamSets.length);
  const { part1, part2, part3 } = speakingExamSets[setIdx];
  const { scores, save, reset, allDone } = useExamScore();
  const [partRatings, setPartRatings] = useState<(number | null)[]>([null, null, null]);
  const [showSummary, setShowSummary] = useState(false);
  const [sessionSaved, setSessionSaved] = useState(false);

  const timer = useExamTimer(15, true);
  const nextSet = () => { setSetIdx((i) => (i + 1) % speakingExamSets.length); setPartRatings([null, null, null]); setSessionSaved(false); timer.reset(); };

  const sectionEarned = partRatings.reduce<number>((a, r, i) => a + (r !== null ? Math.round(SPEAKING_PARTS[i].max * r) : 0), 0);
  const sectionTotal = SPEAKING_PARTS.reduce((a, p) => a + p.max, 0);
  const allRated = partRatings.every((r) => r !== null);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1 flex-wrap">
          <span className="text-2xl">🎤</span>
          <h1 className="text-2xl font-bold text-gray-900">Sprechen</h1>
          <span className="text-xs font-semibold bg-red-100 text-red-700 rounded-full px-3 py-1">25 Punkte · 15 Minuten</span>
          <ExamTimer {...timer} onStart={timer.start} onPause={timer.pause} onReset={timer.reset} />
          <button
            onClick={nextSet}
            className="ml-auto flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-red-400 text-red-700 text-xs font-semibold hover:bg-red-50 transition-colors"
          >
            🔀 Neues Übungsset <span className="text-red-400">({setIdx + 1}/{speakingExamSets.length})</span>
          </button>
        </div>
        <p className="text-gray-500 text-sm mt-1">
          Der Prüfungsteil <strong>Sprechen</strong> hat drei Aufgaben. Lesen Sie jede Karte laut vor und vergleichen Sie mit der Musterlösung.
        </p>
        <div className="mt-3 flex gap-2 text-xs">
          <a href="#sprechen-teil-1" className="px-3 py-1 rounded-full bg-red-100 text-red-700 font-semibold hover:bg-red-200 transition-colors">Aufgabe 1</a>
          <a href="#sprechen-teil-2" className="px-3 py-1 rounded-full bg-red-100 text-red-700 font-semibold hover:bg-red-200 transition-colors">Aufgabe 2</a>
          <a href="#sprechen-teil-3" className="px-3 py-1 rounded-full bg-red-100 text-red-700 font-semibold hover:bg-red-200 transition-colors">Aufgabe 3</a>
        </div>
      </div>

      <div className="mb-8">
        <PatternTips groups={TIPS} accent="red" />
      </div>

      <div className="space-y-10">
        <div id="sprechen-teil-1" key={`${setIdx}-1`}><SpeakingPart1 data={part1} /></div>
        <div id="sprechen-teil-2" key={`${setIdx}-2`}><SpeakingPart2 data={part2} /></div>
        <div id="sprechen-teil-3" key={`${setIdx}-3`}><SpeakingPart3 data={part3} /></div>
      </div>

      {/* Self-assessment */}
      {!sessionSaved && (
        <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-5 space-y-4">
          <p className="font-bold text-red-800">Selbstbewertung — Wie gut hast du gesprochen?</p>
          <p className="text-sm text-red-700">Vergleiche deine Antworten mit den Musterlösungen und bewerte dich ehrlich.</p>
          {SPEAKING_PARTS.map((sp, idx) => (
            <div key={idx}>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">{sp.label} (max. {sp.max} Pkt.)</p>
              <div className="flex flex-wrap gap-2">
                {SELF_RATINGS.map((r) => {
                  const pts = Math.round(sp.max * r.pct);
                  const selected = partRatings[idx] === r.pct;
                  return (
                    <button key={r.label}
                      onClick={() => setPartRatings((prev) => { const next = [...prev]; next[idx] = r.pct; return next; })}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-semibold transition-colors ${
                        selected ? "bg-red-100 border-red-500 text-red-800" : "border-gray-300 text-gray-600 hover:border-red-400 hover:bg-red-50"
                      }`}
                    >
                      {r.emoji} {r.label} ({pts} Pkt.)
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          {allRated && (
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-red-200">
              <p className="font-bold text-red-800">Gesamt: {sectionEarned} / {sectionTotal} Punkte</p>
              <button
                onClick={() => { setSessionSaved(true); save("sprechen", sectionEarned, sectionTotal); if (allDone) setShowSummary(true); }}
                className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors"
              >
                Ergebnis speichern ✓
              </button>
            </div>
          )}
        </div>
      )}
      {sessionSaved && (
        <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-sm font-semibold text-gray-600">✓ Sprechen gespeichert: {scores.sprechen.earned} / {scores.sprechen.total} Punkte</p>
          <button onClick={() => setShowSummary(true)} className="text-xs text-blue-600 hover:underline font-semibold">
            {allDone ? "📊 Gesamtergebnis anzeigen" : "Weiter zum nächsten Abschnitt →"}
          </button>
        </div>
      )}

      {showSummary && (
        <ExamSummary scores={scores}
          onReset={() => { reset(); setShowSummary(false); setPartRatings([null, null, null]); }} />
      )}
    </div>
  );
}
