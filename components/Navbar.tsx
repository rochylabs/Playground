"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sections = [
  { href: "/reading", label: "Lesen", icon: "📖", color: "text-blue-600" },
  { href: "/listening", label: "Hören", icon: "🎧", color: "text-green-600" },
  { href: "/writing", label: "Schreiben", icon: "✏️", color: "text-yellow-600" },
  { href: "/speaking", label: "Sprechen", icon: "🎤", color: "text-red-600" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 flex items-center justify-between h-14">
        <Link href="/" className="font-bold text-lg tracking-tight text-gray-800">
          🇩🇪 A1 Deutsch
        </Link>
        <div className="flex gap-1">
          {sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                pathname.startsWith(s.href)
                  ? "bg-gray-100 " + s.color
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
              }`}
            >
              <span className="mr-1">{s.icon}</span>
              {s.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
