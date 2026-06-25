"use client";

import { useState } from "react";
import Link from "next/link";
import { speakingExamSets } from "@/data/speaking";
import { useExamScore } from "@/hooks/useExamScore";
import { useExamTimer } from "@/hooks/useExamTimer";
import ExamTimer from "@/components/ExamTimer";
import { SpeakingPart1, SpeakingPart2, SpeakingPart3 } from "@/components/SpeakingCard";
import TipsOverview from "@/components/TipsOverview";
import PartLesson, { type PartLessonContent } from "@/components/PartLesson";
import { type PatternGroup } from "@/components/PatternTips";

const TIPS: PatternGroup[] = [
  {
    title: "Teil 1 — Sich vorstellen — Self-Introduction",
    emoji: "🙋",
    color: "red",
    patterns: [
      { label: "Name",      template: "Mein Name ist [Name]. / Ich heiße [Name].",                                  translation: "My name is [Name]. / I'm [Name].", example: "Mein Name ist Maria Reyes." },
      { label: "Herkunft — Origin",  template: "Ich komme aus [Land / Stadt].",                                    translation: "I'm from [Country / City].", example: "Ich komme aus den Philippinen, aus Manila." },
      { label: "Wohnort — Where you live", template: "Ich wohne in [Stadt]. / Ich lebe seit [Zeit] in [Stadt].", translation: "I live in [City]. / I've been living in [City] for [time].", example: "Ich wohne seit einem Jahr in Berlin." },
      { label: "Beruf — Job",        template: "Ich bin [Beruf]. / Ich arbeite als [Beruf].",                       translation: "I am a [job]. / I work as a [job].", example: "Ich bin Lehrerin. / Ich arbeite als Ingenieur." },
      { label: "Sprachen — Languages", template: "Ich spreche [Sprache] und lerne [Sprache].",                     translation: "I speak [language] and I'm learning [language].", example: "Ich spreche Englisch und lerne Deutsch." },
      { label: "Hobbys — Hobbies",   template: "In meiner Freizeit [Verb + Aktivität].",                           translation: "In my free time I [verb + activity].", example: "In meiner Freizeit spiele ich Gitarre." },
    ],
  },
  {
    title: "Teil 2 — Fragen stellen (Thema + Stichwort)",
    emoji: "❓",
    color: "orange",
    patterns: [
      { label: "Was? — What?",       template: "Was ist dein/Ihr [Stichwort]?",                              translation: "What is your [keyword]?", example: "Was ist dein Lieblingsessen?" },
      { label: "Wie? — How?",        template: "Wie [Verb] du/Sie [Stichwort]?",                             translation: "How do you [verb] [keyword]?", example: "Wie fährst du zur Arbeit?" },
      { label: "Wo? — Where?",       template: "Wo [Verb] du/Sie [Stichwort]?",                              translation: "Where do you [verb] [keyword]?", example: "Wo wohnst du gerne?" },
      { label: "Hast du? — Do you have?", template: "Hast du / Haben Sie [Stichwort]?",                     translation: "Do you have [keyword]?", example: "Hast du Geschwister?" },
      { label: "Magst du? — Do you like?", template: "Was magst du / mögen Sie am liebsten [Kontext]?",     translation: "What do you like most about [context]?", example: "Welche Stadt magst du am liebsten?" },
      { label: "Machst du? — Do you do?", template: "Machst du / Machen Sie [Stichwort]?",                  translation: "Do you [keyword]?", example: "Machst du Sport?" },
    ],
  },
  {
    title: "Teil 3 — Bitten (eine Bitte stellen) — Making a Request",
    emoji: "🙏",
    color: "blue",
    patterns: [
      { label: "Können Sie / Kannst du? — Can you...?", template: "Können Sie / Kannst du bitte [Infinitiv]?",  translation: "Can you / Could you please [infinitive]?", example: "Kannst du mir bitte einen Stift leihen?" },
      { label: "Darf ich? — May I...?",   template: "Darf ich bitte [Infinitiv]?",                             translation: "May I please [infinitive]?", example: "Darf ich bitte kurz Ihr Telefon benutzen?" },
      { label: "Ich hätte gern — I'd like...", template: "Ich hätte gern [Objekt], bitte.",                    translation: "I'd like [object], please.", example: "Ich hätte gern ein Glas Wasser, bitte." },
      { label: "Haben Sie? — Do you have...?", template: "Haben Sie [Objekt] für mich?",                      translation: "Do you have [object] for me?", example: "Haben Sie ein Wörterbuch für mich?" },
      { label: "Helfen — Help",           template: "Können Sie mir bitte helfen? Ich [Problem].",             translation: "Could you help me, please? I [problem].", example: "Können Sie mir bitte helfen? Ich suche den Bahnhof." },
    ],
  },
  {
    title: "Teil 3 — Verboten (erklären, was nicht erlaubt ist) — Prohibited",
    emoji: "🚫",
    color: "red",
    patterns: [
      { label: "Das ist verboten — That's forbidden",   template: "Tut mir leid, das ist hier leider verboten.",               translation: "I'm sorry, that's unfortunately not allowed here.", example: "Tut mir leid, das ist hier leider verboten." },
      { label: "Darf man nicht — You can't...",          template: "Hier darf man nicht [Infinitiv].",                          translation: "You're not allowed to [infinitive] here.", example: "Hier darf man nicht rauchen." },
      { label: "Nicht erlaubt — Not permitted",          template: "Das ist hier leider nicht erlaubt.",                        translation: "That's unfortunately not permitted here.", example: "Fotografieren ist hier leider nicht erlaubt." },
      { label: "Bitte + Schild — Please + sign",         template: "Bitte lesen Sie das Schild — [Was] ist hier verboten.",    translation: "Please read the sign — [what] is forbidden here.", example: "Bitte lesen Sie das Schild — Rauchen ist hier verboten." },
      { label: "Kombination — Combination",              template: "Tut mir leid, aber hier darf man nicht [Infinitiv]. [Erklärung].", translation: "I'm sorry, but you're not allowed to [infinitive] here. [Explanation].", example: "Tut mir leid, aber hier darf man nicht essen. Das ist die Ruhezone." },
    ],
  },
  {
    title: "Teil 3 — Reagieren (auf eine Bitte antworten) — Responding",
    emoji: "💬",
    color: "green",
    patterns: [
      { label: "Ja, gerne — Yes, of course",  template: "Ja, natürlich. / Ja, gerne! Hier bitte.",           translation: "Yes, of course. / Sure! Here you go.", example: "Ja, natürlich! Hier ist mein Stift." },
      { label: "Kein Problem — No problem",   template: "Kein Problem. / Das mache ich gerne.",               translation: "No problem. / I'm happy to help.", example: "Kein Problem. Ich passe kurz auf Ihre Tasche auf." },
      { label: "Leider nein — Unfortunately no", template: "Tut mir leid, das geht leider nicht, weil [Grund].", translation: "I'm sorry, that's unfortunately not possible because [reason].", example: "Tut mir leid, ich habe kein Ladekabel dabei." },
      { label: "Alternative — Alternative",   template: "Das geht leider nicht, aber [Alternative].",         translation: "That's not possible, but [alternative].", example: "Das geht leider nicht, aber Sie können Zimmer 302 nehmen." },
    ],
  },
  {
    title: "🆘 Wenn Sie nicht wissen / nicht verstehen — When you don't know",
    emoji: "🆘",
    color: "purple",
    patterns: [
      { label: "Ich verstehe nicht — I don't understand",   template: "Entschuldigung, ich verstehe das nicht ganz. Können Sie das bitte wiederholen?", translation: "Excuse me, I don't quite understand. Could you repeat that, please?", example: "Können Sie das bitte langsamer sagen?" },
      { label: "Ich bin nicht sicher — I'm not sure",       template: "Ich bin nicht sicher, aber ich glaube, [Antwort].",   translation: "I'm not sure, but I think [answer].", example: "Ich bin nicht sicher, aber ich glaube, das ist ein Café." },
      { label: "Auf dem Bild sehe ich — In the picture",    template: "Auf dem Bild sehe ich [Person / Ort / Objekt].",       translation: "In the picture I can see [person / place / object].", example: "Auf dem Bild sehe ich eine Person in einem Restaurant." },
      { label: "Ich denke — I think",                       template: "Ich denke, hier ist [Ort / Situation]. Vielleicht ...", translation: "I think this is [place / situation]. Maybe ...", example: "Ich denke, hier ist ein Supermarkt. Vielleicht kauft die Person Lebensmittel." },
      { label: "Wie sagt man? — How do you say?",           template: "Wie sagt man [Wort] auf Deutsch?",                    translation: "How do you say [word] in German?", example: "Wie sagt man 'ticket' auf Deutsch?" },
      { label: "Noch einmal bitte — Once more please",      template: "Können Sie das bitte noch einmal sagen? / Wie bitte?", translation: "Could you say that again, please? / Pardon?", example: "Wie bitte? Ich habe das nicht verstanden." },
    ],
  },
];

const PART_LESSONS: PartLessonContent[] = [
  {
    partName: "Part 1 — Self-Introduction",
    intro: "In Part 1 you introduce yourself to the examiner using a keyword card. You'll see 6 topics (name, origin, city, job, languages, hobbies) and speak one or two sentences about each. Speak clearly and don't rush — the examiner wants to hear you, not test your speed.",
    tips: [TIPS[0]],
    workedExample: {
      setup: "Keyword card shows: \"Wohnort\" (where you live)",
      question: "What do you say for this keyword?",
      steps: [
        "See the keyword: 'Wohnort' — this asks where you live now.",
        "Choose your template: 'Ich wohne in [Stadt].' or 'Ich lebe seit [Zeit] in [Stadt].'",
        "Fill in your real information: 'Ich wohne in Berlin.' or 'Ich lebe seit zwei Jahren in München.'",
        "Say it clearly — one or two sentences is perfect. Don't over-explain.",
      ],
      answer: "✅ 'Ich wohne in Berlin.' — short, clear, complete. You can add one detail: 'Ich lebe seit einem Jahr in Berlin.' But one sentence is always enough for each keyword.",
    },
    tryIt: {
      setup: "Keyword card shows: \"Sprachen\" (languages)",
      question: "Which sentence best answers this keyword?",
      options: [
        "Ich spreche Englisch und lerne Deutsch.",
        "Sprachen sind sehr wichtig für die Arbeit.",
        "Ich bin Lehrerin.",
      ],
      answer: "Ich spreche Englisch und lerne Deutsch.",
      hint: "Use the template: 'Ich spreche [language] und lerne [language].' — fill in YOUR languages. Don't define the word or give an unrelated answer.",
      explanation: "✅ 'Ich spreche Englisch und lerne Deutsch.' — directly answers 'Sprachen' using the right template. Option 2 talks about languages in general (not personal). Option 3 gives your job — completely off-topic. Always stay personal and use the keyword as your guide.",
    },
  },
  {
    partName: "Part 2 — Asking Questions (Topic + Keyword)",
    intro: "In Part 2 you draw a picture card showing a theme and keyword. You form a question about that keyword and ask your partner (or the examiner). Use simple question words — Was? Wie? Wo? Wann? — to build your question.",
    tips: [TIPS[1]],
    workedExample: {
      setup: "Picture card shows:\nTheme: Essen (Food)\nKeyword: Lieblingsessen (favourite food)",
      question: "What question do you ask?",
      steps: [
        "See the theme (Essen) and keyword (Lieblingsessen). Your task: form a question about this keyword.",
        "Choose a question word: 'Lieblingsessen' is a thing/preference → 'Was?' (What?) fits perfectly.",
        "Build the question: 'Was ist dein Lieblingsessen?' (informal) or 'Was ist Ihr Lieblingsessen?' (formal).",
        "Say it naturally — don't overthink it. One clear question is all you need.",
      ],
      answer: "✅ 'Was ist dein Lieblingsessen?' — uses 'Was?' for preference/thing questions. Simple and direct. You could also say 'Was isst du am liebsten?' (What do you like to eat most?) — both work.",
    },
    tryIt: {
      setup: "Picture card shows:\nTheme: Sport\nKeyword: trainieren (to train / exercise)",
      question: "Which is the best question to ask about this keyword?",
      options: [
        "Wie oft trainierst du?",
        "Trainieren ist sehr gesund.",
        "Was ist dein Name?",
      ],
      answer: "Wie oft trainierst du?",
      hint: "Think about what information you'd want to know about someone's training habits. Use Wie? (How?), Wann? (When?), or Was? (What?). Avoid statements and off-topic questions.",
      explanation: "✅ 'Wie oft trainierst du?' (How often do you train?) — directly relates to 'trainieren' using 'Wie?' Option 2 is a statement, not a question. Option 3 is completely off-topic. Always form a question using the keyword as your topic.",
    },
  },
  {
    partName: "Part 3 — Situations (Bitten / Verboten / Reagieren)",
    intro: "In Part 3 you draw situation cards — each one asks you to do something different: make a request (Bitten), explain something is forbidden (Verboten), or respond to someone else's request (Reagieren). Read the card type badge first — it tells you exactly what to do.",
    tips: [TIPS[2], TIPS[3], TIPS[4]],
    workedExample: {
      setup: "Card type: VERBOTEN 🚫\nSituation: Someone is about to eat food in the library reading room.",
      question: "What do you say?",
      steps: [
        "Read the card type first: 'Verboten' → your job is to explain that something is NOT allowed.",
        "Choose your template: 'Tut mir leid, aber hier darf man nicht [verb].' — polite but clear.",
        "Fill in the action: eating = 'essen'. → 'Tut mir leid, aber hier darf man nicht essen.'",
        "Optional: add an explanation. 'Das ist die Ruhezone.' — makes your answer more complete.",
      ],
      answer: "✅ 'Tut mir leid, aber hier darf man nicht essen. Das ist die Ruhezone.' — politely explains the rule and gives a reason. Always start with 'Tut mir leid' (I'm sorry) to be polite, then state the rule.",
    },
    tryIt: {
      setup: "Card type: REAGIEREN 💬\nSituation: Your partner says — 'Kannst du bitte kurz auf meine Tasche aufpassen?'",
      question: "Which response is correct for a 'Reagieren' card?",
      options: [
        "Ja, natürlich. Kein Problem!",
        "Tut mir leid, aber hier darf man nicht essen.",
        "Können Sie mir bitte helfen?",
      ],
      answer: "Ja, natürlich. Kein Problem!",
      hint: "For 'Reagieren', someone asked YOU something. You need to respond — either agree or politely decline. Look for the option that directly responds to the request.",
      explanation: "✅ 'Ja, natürlich. Kein Problem!' — responds directly to the request to watch the bag. Option 2 is a 'Verboten' response (wrong card type). Option 3 is making a request (Bitten) — not responding to one. Always match your response to the card type shown.",
    },
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

type Phase = { stage: "overview" } | { stage: "lesson"; partIdx: number } | { stage: "exam"; partIdx: number };

export default function SpeakingPage() {
  const [phase, setPhase] = useState<Phase>({ stage: "overview" });
  const [setIdx, setSetIdx] = useState(() => Math.floor(Math.random() * speakingExamSets.length));
  const { part1, part2, part3 } = speakingExamSets[setIdx];
  const { scores, save } = useExamScore();
  const [partRatings, setPartRatings] = useState<(number | null)[]>([null, null, null]);
  const [sessionSaved, setSessionSaved] = useState(false);
  const timer = useExamTimer(15, false);

  const nextSet = () => {
    setSetIdx((i) => (i + 1) % speakingExamSets.length);
    setPartRatings([null, null, null]);
    setSessionSaved(false);
    setPhase({ stage: "overview" });
    timer.reset();
  };

  const handleRating = (idx: number, pct: number) => {
    setPartRatings((prev) => { const next = [...prev]; next[idx] = pct; return next; });
  };

  const handlePartDone = (idx: number) => {
    const nextIdx = idx + 1;
    if (nextIdx < 3) setPhase({ stage: "lesson", partIdx: nextIdx });
  };

  const sectionEarned = partRatings.reduce<number>((a, r, i) => a + (r !== null ? Math.round(SPEAKING_PARTS[i].max * r) : 0), 0);
  const sectionTotal = SPEAKING_PARTS.reduce((a, p) => a + p.max, 0);
  const allRated = partRatings.every((r) => r !== null);

  if (phase.stage === "overview") {
    return <TipsOverview groups={TIPS} accent="red" sectionName="Speaking — Sprechen" onStart={() => setPhase({ stage: "lesson", partIdx: 0 })} />;
  }

  if (phase.stage === "lesson") {
    const { partIdx } = phase;
    return (
      <PartLesson
        content={PART_LESSONS[partIdx]}
        accent="red"
        onReady={() => {
          if (partIdx === 0) timer.start();
          setPhase({ stage: "exam", partIdx });
        }}
      />
    );
  }

  const { partIdx } = phase as { stage: "exam"; partIdx: number };
  const sp = SPEAKING_PARTS[partIdx];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1 flex-wrap">
          <span className="text-2xl">🎤</span>
          <h1 className="text-2xl font-bold text-gray-900">Sprechen</h1>
          <span className="text-xs font-semibold bg-red-100 text-red-700 rounded-full px-3 py-1">25 Punkte · 15 Minuten</span>
          <ExamTimer {...timer} />
          <button onClick={nextSet} className="ml-auto flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-red-400 text-red-700 text-xs font-semibold hover:bg-red-50 transition-colors">
            🔀 Neues Übungsset <span className="text-red-400">({setIdx + 1}/{speakingExamSets.length})</span>
          </button>
        </div>
        <div className="mt-3 flex gap-2 flex-wrap text-xs">
          {SPEAKING_PARTS.map((p, i) => {
            const done = partRatings[i] !== null;
            const active = (phase as { stage: "exam"; partIdx: number }).partIdx === i;
            return (
              <span key={i} className={`px-3 py-1 rounded-full font-semibold border transition-colors ${done ? "bg-red-100 text-red-700 border-red-300" : active ? "bg-red-600 text-white border-red-600" : "bg-gray-100 text-gray-400 border-gray-200"}`}>
                {done ? "✅" : ""} {p.label}
              </span>
            );
          })}
        </div>
      </div>

      <div className="space-y-8">
        {partIdx === 0 && <SpeakingPart1 data={part1} />}
        {partIdx === 1 && <SpeakingPart2 data={part2} />}
        {partIdx === 2 && <SpeakingPart3 data={part3} />}
      </div>

      {/* Self-assessment for current part */}
      {!sessionSaved && partRatings[partIdx] === null && (
        <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-5 space-y-3">
          <p className="font-bold text-red-800">Rate yourself — {sp.label} (max. {sp.max} pts)</p>
          <p className="text-sm text-red-700">Compare your answer to the model, then rate honestly.</p>
          <div className="flex flex-wrap gap-2">
            {SELF_RATINGS.map((r) => {
              const pts = Math.round(sp.max * r.pct);
              return (
                <button key={r.label}
                  onClick={() => {
                    handleRating(partIdx, r.pct);
                    if (partIdx < 2) handlePartDone(partIdx);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-semibold border-gray-300 text-gray-600 hover:border-red-400 hover:bg-red-50 transition-colors"
                >
                  {r.emoji} {r.label} ({pts} pts)
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Show all parts rated — save result */}
      {allRated && !sessionSaved && (
        <div className="mt-6 rounded-xl border border-red-300 bg-red-50 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-bold text-red-800">Gesamt: {sectionEarned} / {sectionTotal} Punkte</p>
          <button onClick={() => { save("sprechen", sectionEarned, sectionTotal); setSessionSaved(true); }}
            className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors">
            Ergebnis speichern ✓
          </button>
        </div>
      )}
      {sessionSaved && (
        <div className="mt-8 rounded-xl border border-green-300 bg-green-50 p-6 text-center">
          <div className="text-4xl mb-2">✅</div>
          <p className="font-bold text-green-800 text-lg">Sprechen abgeschlossen!</p>
          <p className="text-green-700 text-sm mt-1">{scores.sprechen.earned} / {scores.sprechen.total} Punkte gespeichert</p>
          <Link href="/" className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-semibold transition-colors">
            ← Zurück zur Startseite
          </Link>
        </div>
      )}
    </div>
  );
}
