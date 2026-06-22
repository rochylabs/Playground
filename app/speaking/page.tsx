"use client";

import { useState, useEffect } from "react";
import { speakingExamSets } from "@/data/speaking";
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

export default function SpeakingPage() {
  const [setIdx, setSetIdx] = useState(0);
  useEffect(() => {
    setSetIdx(Math.floor(Math.random() * speakingExamSets.length));
  }, []);
  const { part1, part2, part3 } = speakingExamSets[setIdx];

  const nextSet = () => setSetIdx((i) => (i + 1) % speakingExamSets.length);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1 flex-wrap">
          <span className="text-2xl">🎤</span>
          <h1 className="text-2xl font-bold text-gray-900">Sprechen</h1>
          <span className="text-xs font-semibold bg-red-100 text-red-700 rounded-full px-3 py-1">25 Punkte · 15 Minuten</span>
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
    </div>
  );
}
