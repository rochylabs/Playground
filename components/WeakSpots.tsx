"use client";

export interface QuestionResult {
  questionType: "richtig-falsch" | "multiple-choice" | "matching";
  correct: boolean;
}

const TYPE_LABELS: Record<QuestionResult["questionType"], string> = {
  "richtig-falsch":  "Richtig / Falsch",
  "multiple-choice": "Multiple Choice",
  "matching":        "Zuordnung",
};

const TYPE_TIPS: Record<QuestionResult["questionType"], string> = {
  "richtig-falsch":  "Read each statement word-for-word against the text. Watch for numbers, dates, and negation.",
  "multiple-choice": "Eliminate obviously wrong options first. The distractor is usually the first thing you hear/read.",
  "matching":        "Match the most specific detail first (time, price, topic). Use X when nothing fits.",
};

interface Props {
  results: QuestionResult[];
}

export default function WeakSpots({ results }: Props) {
  if (results.length === 0) return null;

  const grouped = results.reduce<Record<string, { correct: number; total: number }>>(
    (acc, r) => {
      if (!acc[r.questionType]) acc[r.questionType] = { correct: 0, total: 0 };
      acc[r.questionType].total++;
      if (r.correct) acc[r.questionType].correct++;
      return acc;
    },
    {}
  );

  const types = Object.keys(grouped) as QuestionResult["questionType"][];

  return (
    <div className="mt-6 rounded-xl border border-purple-200 bg-purple-50 p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">🎯</span>
        <h3 className="font-bold text-purple-900">Schwachstellen-Analyse</h3>
        <span className="text-xs text-purple-500 font-medium ml-auto">Weak Spots Summary</span>
      </div>

      <div className="space-y-4">
        {types.map((type) => {
          const { correct, total } = grouped[type];
          const pct = Math.round((correct / total) * 100);
          const strong = pct >= 80;
          const ok     = pct >= 60 && pct < 80;
          const weak   = pct < 60;

          const barColor = strong ? "bg-green-500" : ok ? "bg-yellow-400" : "bg-red-400";
          const badgeColor = strong
            ? "bg-green-100 text-green-700"
            : ok
            ? "bg-yellow-100 text-yellow-700"
            : "bg-red-100 text-red-600";
          const statusLabel = strong ? "Gut!" : ok ? "Übe mehr" : "Schwach";
          const statusEmoji = strong ? "✅" : ok ? "⚠️" : "❌";

          return (
            <div key={type}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-gray-700">{TYPE_LABELS[type]}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-800">{correct}/{total} ({pct}%)</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${badgeColor}`}>
                    {statusEmoji} {statusLabel}
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1.5">
                <div className={`h-2.5 rounded-full transition-all duration-500 ${barColor}`}
                  style={{ width: `${pct}%` }} />
              </div>
              {weak && (
                <p className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-1.5 mt-1">
                  💡 <strong>Tipp:</strong> {TYPE_TIPS[type]}
                </p>
              )}
              {ok && (
                <p className="text-xs text-yellow-700 bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-1.5 mt-1">
                  💡 <strong>Tipp:</strong> {TYPE_TIPS[type]}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-start gap-2 bg-white rounded-lg border border-purple-200 px-3 py-2 text-xs text-purple-800">
        <span className="text-base flex-shrink-0">🐶</span>
        <div>
          <span className="font-semibold">Twixie: </span>
          {types.every((t) => grouped[t].correct / grouped[t].total >= 0.8)
            ? "Ausgezeichnet! Du machst das sehr gut — weiter so! 🌟"
            : `Focus on the ${types.filter((t) => grouped[t].correct / grouped[t].total < 0.6).map((t) => TYPE_LABELS[t]).join(" and ")} questions — that's where your points are hiding! Du schaffst das! 💪`}
        </div>
      </div>
    </div>
  );
}
