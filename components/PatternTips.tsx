"use client";

import { useState } from "react";

export interface PatternGroup {
  title: string;
  emoji: string;
  color: "blue" | "green" | "yellow" | "red" | "purple" | "orange";
  patterns: Array<{
    label: string;
    template: string;
    example: string;
  }>;
}

const COLOR = {
  blue:   { header: "bg-blue-600",   light: "bg-blue-50",   border: "border-blue-200", text: "text-blue-800",   tag: "bg-blue-100 text-blue-700",   btn: "border-blue-300 text-blue-700 hover:bg-blue-50" },
  green:  { header: "bg-green-600",  light: "bg-green-50",  border: "border-green-200",text: "text-green-800",  tag: "bg-green-100 text-green-700",  btn: "border-green-300 text-green-700 hover:bg-green-50" },
  yellow: { header: "bg-yellow-500", light: "bg-yellow-50", border: "border-yellow-200",text: "text-yellow-800",tag: "bg-yellow-100 text-yellow-700",btn: "border-yellow-300 text-yellow-700 hover:bg-yellow-50" },
  red:    { header: "bg-red-600",    light: "bg-red-50",    border: "border-red-200",  text: "text-red-800",   tag: "bg-red-100 text-red-700",     btn: "border-red-300 text-red-700 hover:bg-red-50" },
  purple: { header: "bg-purple-600", light: "bg-purple-50", border: "border-purple-200",text: "text-purple-800",tag: "bg-purple-100 text-purple-700",btn: "border-purple-300 text-purple-700 hover:bg-purple-50" },
  orange: { header: "bg-orange-500", light: "bg-orange-50", border: "border-orange-200",text: "text-orange-800",tag: "bg-orange-100 text-orange-700",btn: "border-orange-300 text-orange-700 hover:bg-orange-50" },
};

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
        <div className="flex items-center gap-2">
          <span className="text-lg">💡</span>
          <span className={`text-sm font-bold ${c.text}`}>Prüfungstipps &amp; Satzmuster</span>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.tag}`}>
            {groups.length} Kategorien
          </span>
        </div>
        <span className={`text-sm font-semibold ${c.text}`}>{open ? "Ausblenden ▲" : "Anzeigen ▼"}</span>
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
