"use client";

import { useState } from "react";
import { COLOR, type SectionColor } from "@/lib/colors";

export interface PatternGroup {
  title: string;
  emoji: string;
  color: SectionColor;
  patterns: Array<{
    label: string;
    template: string;
    example: string;
  }>;
}

interface Props {
  groups: PatternGroup[];
  /** accent color for the toggle button */
  accent?: PatternGroup["color"];
}

export default function PatternTips({ groups, accent = "blue" }: Props) {
  const [open, setOpen] = useState(false);
  const c = COLOR[accent];

  return (
    <div className={`rounded-xl border ${c.border} overflow-hidden`}>
      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center justify-between px-5 py-3 ${c.light} hover:brightness-95 transition-all`}
      >
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-lg">💡</span>
          <div>
            <p className={`text-sm font-bold ${c.text}`}>Prüfungstipps &amp; Satzmuster</p>
            <p className="text-xs text-gray-400 font-normal">Exam Tips &amp; Sentence Patterns</p>
          </div>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.tag}`}>
            {groups.length} Kategorien
          </span>
        </div>
        <span className={`text-sm font-semibold ${c.text} flex-shrink-0`}>{open ? "Hide ▲" : "Show ▼"}</span>
      </button>

      {open && (
        <div className={`divide-y ${c.border}`}>
          {groups.map((g, gi) => (
            <GroupBlock key={gi} group={g} />
          ))}
        </div>
      )}
    </div>
  );
}

function GroupBlock({ group }: { group: PatternGroup }) {
  const [open, setOpen] = useState(true);
  const c = COLOR[group.color];

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center gap-2 px-5 py-2.5 ${c.light} text-left`}
      >
        <span className="text-base">{group.emoji}</span>
        <span className={`text-xs font-bold uppercase tracking-wide ${c.text} flex-1`}>{group.title}</span>
        <span className="text-gray-400 text-xs">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="px-5 py-3 bg-white grid gap-3 sm:grid-cols-2">
          {group.patterns.map((p, i) => (
            <div key={i} className={`rounded-lg border ${c.border} overflow-hidden`}>
              <div className={`px-3 py-1.5 ${c.light}`}>
                <p className={`text-xs font-bold ${c.text}`}>{p.label}</p>
              </div>
              <div className="px-3 py-2 space-y-1">
                <p className="text-xs font-mono bg-gray-50 border border-gray-100 rounded px-2 py-1 text-gray-700 leading-relaxed">
                  {p.template}
                </p>
                <p className="text-xs text-gray-500 italic">z.B.: {p.example}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
