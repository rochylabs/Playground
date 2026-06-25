"use client";

import { useState } from "react";
import { COLOR, type SectionColor } from "@/lib/colors";
import type { PatternGroup } from "./PatternTips";

interface Props {
  groups: PatternGroup[];
  accent: SectionColor;
  sectionName: string;
  onStart: () => void;
}

export default function TipsOverview({ groups, accent, sectionName, onStart }: Props) {
  const [open, setOpen] = useState<Record<number, boolean>>(
    Object.fromEntries(groups.map((_, i) => [i, i === 0]))
  );
  const a = COLOR[accent];

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">{sectionName}</p>
        <h2 className="text-2xl font-bold text-gray-900">Strategies &amp; Tips</h2>
        <p className="text-gray-500 text-sm mt-1">
          Here&apos;s everything you need to know. Read through, then we&apos;ll walk each part together.
        </p>
      </div>

      <div className={`rounded-2xl border ${a.border} overflow-hidden divide-y ${a.border}`}>
        {groups.map((g, i) => {
          const c = COLOR[g.color];
          const isOpen = open[i];
          return (
            <div key={i}>
              <button
                onClick={() => setOpen((s) => ({ ...s, [i]: !s[i] }))}
                className={`w-full flex items-center gap-3 px-5 py-3 text-left ${c.light} hover:brightness-95 transition-all`}
              >
                <span className="text-base">{g.emoji}</span>
                <span className={`flex-1 text-sm font-bold ${c.text}`}>{g.title}</span>
                <span className="text-gray-400 text-xs flex-shrink-0">{isOpen ? "▲" : "▼"}</span>
              </button>
              {isOpen && (
                <div className="bg-white px-5 py-4 grid gap-3 sm:grid-cols-2">
                  {g.patterns.map((p, pi) => (
                    <div key={pi} className={`rounded-lg border ${c.border} overflow-hidden`}>
                      <div className={`px-3 py-1.5 ${c.light}`}>
                        <p className={`text-xs font-bold ${c.text}`}>{p.label}</p>
                      </div>
                      <div className="px-3 py-2 space-y-1">
                        <p className="text-xs font-mono bg-gray-50 border border-gray-100 rounded px-2 py-1 text-gray-700 leading-relaxed">
                          {p.template}
                        </p>
                        {p.translation && (
                          <p className="text-xs text-gray-400 italic">{p.translation}</p>
                        )}
                        <p className="text-xs text-gray-500 italic">z.B.: {p.example}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-center space-y-3">
        <button
          onClick={onStart}
          className={`px-8 py-3 rounded-xl text-white text-sm font-bold shadow-sm transition-colors ${a.btn}`}
        >
          Got it — Start Part 1 Lesson →
        </button>
        <p className="text-xs text-gray-400">
          We&apos;ll walk through each part with examples before you practice.
        </p>
      </div>
    </div>
  );
}
