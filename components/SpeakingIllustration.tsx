import React from "react";

export type IllustrationKey =
  // Part 2 — theme cards
  | "food" | "sport" | "family" | "apartment" | "clock" | "airplane"
  | "subway" | "jogging" | "shopping" | "sun" | "books" | "smartphone"
  | "city" | "cinema" | "breakfast" | "speech" | "globe" | "alarm"
  | "stethoscope" | "briefcase" | "cooking" | "reading" | "house" | "germany"
  // Part 3 — situation cards
  | "pencil" | "paper" | "no-phone" | "charger" | "no-camera" | "handbag"
  | "tram" | "park" | "map" | "no-smoking" | "restaurant" | "hotel"
  | "medical" | "calendar" | "ticket" | "library-book" | "pool" | "quiet"
  | "train" | "tshirt";

const LT = "#374151"; // line/text color
const BG = "#f9fafb"; // light bg
const RED = "#dc2626";
const BLUE = "#2563eb";
const YEL = "#d97706";
const GRN = "#16a34a";

/* ── helpers ─────────────────────────────────────────────────────────────── */
function ProhibitionRing({ cx, cy, r = 22 }: { cx: number; cy: number; r?: number }) {
  const angle = 45 * (Math.PI / 180);
  const x1 = cx - r * Math.cos(angle), y1 = cy - r * Math.sin(angle);
  const x2 = cx + r * Math.cos(angle), y2 = cy + r * Math.sin(angle);
  return <>
    <circle cx={cx} cy={cy} r={r} stroke={RED} strokeWidth={3} fill="none" />
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={RED} strokeWidth={3} strokeLinecap="round" />
  </>;
}

/* ── Part 2 illustrations ─────────────────────────────────────────────────── */

function Food() {
  return <svg viewBox="0 0 120 120" fill="none">
    <circle cx="60" cy="68" r="35" fill="#fef9ee" stroke={LT} strokeWidth={2.5} />
    <circle cx="60" cy="68" r="23" fill="#fde68a" stroke={LT} strokeWidth={1.5} />
    {/* fork */}
    <line x1="23" y1="28" x2="23" y2="55" stroke={LT} strokeWidth={2.5} strokeLinecap="round" />
    <line x1="20" y1="28" x2="20" y2="39" stroke={LT} strokeWidth={2} strokeLinecap="round" />
    <line x1="26" y1="28" x2="26" y2="39" stroke={LT} strokeWidth={2} strokeLinecap="round" />
    {/* knife */}
    <line x1="97" y1="28" x2="97" y2="55" stroke={LT} strokeWidth={2.5} strokeLinecap="round" />
    <path d="M97 28 C101 34 101 43 97 46" stroke={LT} strokeWidth={2} />
    {/* steam */}
    {[50,60,70].map(x => <path key={x} d={`M${x} 52 Q${x-2} 46 ${x} 41 Q${x+2} 36 ${x} 31`} stroke="#9ca3af" strokeWidth={1.5} strokeLinecap="round" fill="none" />)}
  </svg>;
}

function Sport() {
  return <svg viewBox="0 0 120 120" fill="none">
    <circle cx="60" cy="60" r="42" fill={BG} stroke={LT} strokeWidth={2.5} />
    {/* black patches on soccer ball */}
    <polygon points="60,30 72,40 68,55 52,55 48,40" fill={LT} />
    <polygon points="60,90 72,80 68,65 52,65 48,80" fill={LT} opacity={0.25} stroke={LT} strokeWidth={1} />
    <polygon points="88,48 100,58 96,72 82,70 80,55" fill={LT} opacity={0.25} stroke={LT} strokeWidth={1} />
    <polygon points="88,72 84,84 72,90 64,82 72,70" fill={LT} opacity={0.15} stroke={LT} strokeWidth={1} />
    <polygon points="32,48 20,58 24,72 38,70 40,55" fill={LT} opacity={0.25} stroke={LT} strokeWidth={1} />
    <polygon points="32,72 36,84 48,90 56,82 48,70" fill={LT} opacity={0.15} stroke={LT} strokeWidth={1} />
  </svg>;
}

function Family() {
  return <svg viewBox="0 0 120 120" fill="none">
    {/* adult 1 */}
    <circle cx="32" cy="28" r="10" fill="#fde68a" stroke={LT} strokeWidth={2} />
    <path d="M20 80 Q20 55 32 52 Q44 55 44 80" fill="#dbeafe" stroke={LT} strokeWidth={2} />
    <line x1="20" y1="80" x2="20" y2="100" stroke={LT} strokeWidth={2.5} strokeLinecap="round" />
    <line x1="44" y1="80" x2="44" y2="100" stroke={LT} strokeWidth={2.5} strokeLinecap="round" />
    {/* adult 2 */}
    <circle cx="88" cy="28" r="10" fill="#fde68a" stroke={LT} strokeWidth={2} />
    <path d="M76 80 Q76 55 88 52 Q100 55 100 80" fill="#fce7f3" stroke={LT} strokeWidth={2} />
    <line x1="76" y1="80" x2="76" y2="100" stroke={LT} strokeWidth={2.5} strokeLinecap="round" />
    <line x1="100" y1="80" x2="100" y2="100" stroke={LT} strokeWidth={2.5} strokeLinecap="round" />
    {/* child */}
    <circle cx="60" cy="40" r="8" fill="#fde68a" stroke={LT} strokeWidth={2} />
    <path d="M51 82 Q51 63 60 61 Q69 63 69 82" fill="#d1fae5" stroke={LT} strokeWidth={2} />
    <line x1="51" y1="82" x2="51" y2="98" stroke={LT} strokeWidth={2} strokeLinecap="round" />
    <line x1="69" y1="82" x2="69" y2="98" stroke={LT} strokeWidth={2} strokeLinecap="round" />
    {/* hearts */}
    <text x="54" y="18" fontSize="10" fill={RED}>♥</text>
  </svg>;
}

function Apartment() {
  return <svg viewBox="0 0 120 120" fill="none">
    <rect x="20" y="35" width="80" height="75" rx="2" fill="#dbeafe" stroke={LT} strokeWidth={2.5} />
    <rect x="30" y="45" width="14" height="14" rx="1" fill="#93c5fd" stroke={LT} strokeWidth={1.5} />
    <rect x="53" y="45" width="14" height="14" rx="1" fill="#93c5fd" stroke={LT} strokeWidth={1.5} />
    <rect x="76" y="45" width="14" height="14" rx="1" fill="#93c5fd" stroke={LT} strokeWidth={1.5} />
    <rect x="30" y="67" width="14" height="14" rx="1" fill="#93c5fd" stroke={LT} strokeWidth={1.5} />
    <rect x="76" y="67" width="14" height="14" rx="1" fill="#93c5fd" stroke={LT} strokeWidth={1.5} />
    <rect x="46" y="78" width="28" height="32" rx="2" fill="#bfdbfe" stroke={LT} strokeWidth={2} />
    <path d="M20 35 L60 10 L100 35" fill="#bfdbfe" stroke={LT} strokeWidth={2.5} />
    <line x1="20" y1="110" x2="100" y2="110" stroke={LT} strokeWidth={2.5} strokeLinecap="round" />
  </svg>;
}

function Clock() {
  return <svg viewBox="0 0 120 120" fill="none">
    <circle cx="60" cy="62" r="44" fill={BG} stroke={LT} strokeWidth={3} />
    <circle cx="60" cy="62" r="4" fill={LT} />
    {/* hour hand pointing to 8 */}
    <line x1="60" y1="62" x2="38" y2="76" stroke={LT} strokeWidth={4} strokeLinecap="round" />
    {/* minute hand pointing to 12 */}
    <line x1="60" y1="62" x2="60" y2="30" stroke={LT} strokeWidth={3} strokeLinecap="round" />
    {/* tick marks */}
    {[0,30,60,90,120,150,180,210,240,270,300,330].map(deg => {
      const r = deg % 90 === 0 ? 36 : 38;
      const rad = (deg - 90) * Math.PI / 180;
      return <line key={deg}
        x1={60 + 42 * Math.cos(rad)} y1={62 + 42 * Math.sin(rad)}
        x2={60 + r  * Math.cos(rad)} y2={62 + r  * Math.sin(rad)}
        stroke={LT} strokeWidth={deg % 90 === 0 ? 3 : 1.5} strokeLinecap="round" />;
    })}
    {/* top bolt */}
    <rect x="54" y="14" width="12" height="6" rx="3" fill={LT} />
  </svg>;
}

function Airplane() {
  return <svg viewBox="0 0 120 120" fill="none">
    {/* sky */}
    <rect x="8" y="8" width="104" height="104" rx="8" fill="#eff6ff" />
    {/* clouds */}
    <ellipse cx="25" cy="35" rx="14" ry="8" fill="white" stroke="#d1d5db" strokeWidth={1.5} />
    <ellipse cx="35" cy="30" rx="10" ry="7" fill="white" stroke="#d1d5db" strokeWidth={1.5} />
    <ellipse cx="90" cy="80" rx="12" ry="7" fill="white" stroke="#d1d5db" strokeWidth={1.5} />
    {/* airplane body */}
    <path d="M15 65 Q40 58 75 55 L100 52 Q108 52 108 57 Q108 62 100 63 L75 65 L55 90 L45 90 L58 67 L15 75 Z"
      fill="#bfdbfe" stroke={LT} strokeWidth={2} />
    {/* tail */}
    <path d="M25 65 L20 50 L35 58" fill="#93c5fd" stroke={LT} strokeWidth={1.5} />
  </svg>;
}

function Subway() {
  return <svg viewBox="0 0 120 120" fill="none">
    <rect x="15" y="30" width="90" height="60" rx="10" fill="#dbeafe" stroke={LT} strokeWidth={2.5} />
    {/* windows */}
    <rect x="22" y="40" width="28" height="20" rx="4" fill="#bfdbfe" stroke={LT} strokeWidth={2} />
    <rect x="70" y="40" width="28" height="20" rx="4" fill="#bfdbfe" stroke={LT} strokeWidth={2} />
    {/* door */}
    <rect x="46" y="42" width="28" height="28" rx="2" fill="#93c5fd" stroke={LT} strokeWidth={2} />
    <line x1="60" y1="42" x2="60" y2="70" stroke={LT} strokeWidth={1.5} />
    {/* wheels */}
    <circle cx="32" cy="92" r="10" fill="#6b7280" stroke={LT} strokeWidth={2} />
    <circle cx="88" cy="92" r="10" fill="#6b7280" stroke={LT} strokeWidth={2} />
    <circle cx="32" cy="92" r="4" fill={BG} />
    <circle cx="88" cy="92" r="4" fill={BG} />
    {/* U sign */}
    <circle cx="60" cy="20" r="10" fill={BLUE} />
    <text x="56" y="25" fontSize="13" fontWeight="bold" fill="white">U</text>
    {/* rails */}
    <line x1="8" y1="102" x2="112" y2="102" stroke={LT} strokeWidth={3} strokeLinecap="round" />
  </svg>;
}

function Jogging() {
  return <svg viewBox="0 0 120 120" fill="none">
    {/* ground */}
    <path d="M5 98 Q30 88 60 90 Q90 92 115 82" stroke="#d1fae5" strokeWidth={3} strokeLinecap="round" />
    {/* body */}
    <circle cx="68" cy="28" r="12" fill="#fde68a" stroke={LT} strokeWidth={2} />
    {/* torso */}
    <path d="M68 40 L62 65" stroke={LT} strokeWidth={3} strokeLinecap="round" />
    {/* left arm back */}
    <path d="M65 48 L45 58" stroke={LT} strokeWidth={2.5} strokeLinecap="round" />
    {/* right arm forward */}
    <path d="M65 48 L80 42" stroke={LT} strokeWidth={2.5} strokeLinecap="round" />
    {/* left leg back */}
    <path d="M62 65 L42 80 L38 95" stroke={LT} strokeWidth={2.5} strokeLinecap="round" />
    {/* right leg forward */}
    <path d="M62 65 L75 78 L90 82" stroke={LT} strokeWidth={2.5} strokeLinecap="round" />
    {/* speed lines */}
    <line x1="10" y1="42" x2="28" y2="42" stroke="#d1d5db" strokeWidth={2} strokeLinecap="round" />
    <line x1="6" y1="52" x2="22" y2="52" stroke="#d1d5db" strokeWidth={2} strokeLinecap="round" />
    <line x1="10" y1="62" x2="24" y2="62" stroke="#d1d5db" strokeWidth={2} strokeLinecap="round" />
  </svg>;
}

function Shopping() {
  return <svg viewBox="0 0 120 120" fill="none">
    {/* cart */}
    <path d="M12 25 L25 25 L38 72 L95 72 L108 38 L33 38" stroke={LT} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
    {/* items in cart */}
    <rect x="42" y="42" width="18" height="26" rx="3" fill="#fde68a" stroke={LT} strokeWidth={1.5} />
    <rect x="64" y="44" width="16" height="24" rx="3" fill="#bbf7d0" stroke={LT} strokeWidth={1.5} />
    <rect x="83" y="46" width="14" height="22" rx="3" fill="#fecaca" stroke={LT} strokeWidth={1.5} />
    {/* wheels */}
    <circle cx="48" cy="83" r="9" fill="#9ca3af" stroke={LT} strokeWidth={2} />
    <circle cx="85" cy="83" r="9" fill="#9ca3af" stroke={LT} strokeWidth={2} />
    <circle cx="48" cy="83" r="4" fill={BG} />
    <circle cx="85" cy="83" r="4" fill={BG} />
  </svg>;
}

function Sun() {
  return <svg viewBox="0 0 120 120" fill="none">
    <circle cx="60" cy="60" r="24" fill="#fde68a" stroke="#d97706" strokeWidth={2.5} />
    {[0,45,90,135,180,225,270,315].map(deg => {
      const rad = deg * Math.PI / 180;
      return <line key={deg}
        x1={60 + 28 * Math.cos(rad)} y1={60 + 28 * Math.sin(rad)}
        x2={60 + 40 * Math.cos(rad)} y2={60 + 40 * Math.sin(rad)}
        stroke="#d97706" strokeWidth={3} strokeLinecap="round" />;
    })}
    {/* clouds */}
    <ellipse cx="85" cy="82" rx="18" ry="10" fill="white" stroke="#d1d5db" strokeWidth={1.5} />
    <ellipse cx="95" cy="76" rx="14" ry="9" fill="white" stroke="#d1d5db" strokeWidth={1.5} />
    <ellipse cx="72" cy="85" rx="12" ry="7" fill="white" stroke="#d1d5db" strokeWidth={1.5} />
  </svg>;
}

function Books() {
  return <svg viewBox="0 0 120 120" fill="none">
    {/* book 3 (bottom) */}
    <rect x="18" y="78" width="84" height="16" rx="3" fill="#fca5a5" stroke={LT} strokeWidth={2} />
    <line x1="30" y1="78" x2="30" y2="94" stroke={LT} strokeWidth={1.5} />
    {/* book 2 */}
    <rect x="22" y="58" width="76" height="16" rx="3" fill="#93c5fd" stroke={LT} strokeWidth={2} />
    <line x1="34" y1="58" x2="34" y2="74" stroke={LT} strokeWidth={1.5} />
    {/* book 1 (top) */}
    <rect x="26" y="40" width="68" height="16" rx="3" fill="#bbf7d0" stroke={LT} strokeWidth={2} />
    <line x1="38" y1="40" x2="38" y2="56" stroke={LT} strokeWidth={1.5} />
    {/* open book on top */}
    <path d="M34 22 Q60 16 86 22 L86 38 Q60 32 34 38 Z" fill="#fefce8" stroke={LT} strokeWidth={2} />
    <line x1="60" y1="16" x2="60" y2="38" stroke={LT} strokeWidth={1.5} />
    {/* text lines */}
    {[20,24,28,32].map(y => <line key={y} x1="38" y1={y} x2="57" y2={y} stroke="#d1d5db" strokeWidth={1} />)}
    {[20,24,28,32].map(y => <line key={y} x1="63" y1={y} x2="82" y2={y} stroke="#d1d5db" strokeWidth={1} />)}
  </svg>;
}

function Smartphone() {
  return <svg viewBox="0 0 120 120" fill="none">
    <rect x="32" y="10" width="56" height="100" rx="10" fill="#1e293b" stroke={LT} strokeWidth={2.5} />
    <rect x="38" y="22" width="44" height="68" rx="3" fill="#dbeafe" />
    {/* screen content */}
    <rect x="42" y="28" width="36" height="24" rx="2" fill="#93c5fd" />
    <line x1="42" y1="58" x2="74" y2="58" stroke="#6b7280" strokeWidth={1.5} strokeLinecap="round" />
    <line x1="42" y1="64" x2="66" y2="64" stroke="#6b7280" strokeWidth={1.5} strokeLinecap="round" />
    <line x1="42" y1="70" x2="70" y2="70" stroke="#6b7280" strokeWidth={1.5} strokeLinecap="round" />
    {/* home button */}
    <circle cx="60" cy="102" r="5" fill="#374151" stroke="#6b7280" strokeWidth={1} />
    {/* speaker */}
    <rect x="50" y="14" width="20" height="3" rx="1.5" fill="#374151" />
  </svg>;
}

function City() {
  return <svg viewBox="0 0 120 120" fill="none">
    {/* sky */}
    <rect x="0" y="0" width="120" height="120" rx="6" fill="#eff6ff" />
    {/* buildings */}
    <rect x="5" y="55" width="22" height="60" fill="#93c5fd" stroke={LT} strokeWidth={2} />
    <rect x="8" y="62" width="6" height="6" fill="#dbeafe" />
    <rect x="18" y="62" width="6" height="6" fill="#dbeafe" />
    <rect x="8" y="74" width="6" height="6" fill="#dbeafe" />
    <rect x="18" y="74" width="6" height="6" fill="#dbeafe" />
    <rect x="30" y="35" width="28" height="80" fill="#bfdbfe" stroke={LT} strokeWidth={2} />
    <rect x="34" y="42" width="8" height="8" fill="#dbeafe" />
    <rect x="46" y="42" width="8" height="8" fill="#dbeafe" />
    <rect x="34" y="56" width="8" height="8" fill="#dbeafe" />
    <rect x="46" y="56" width="8" height="8" fill="#dbeafe" />
    <rect x="34" y="70" width="8" height="8" fill="#dbeafe" />
    <rect x="46" y="70" width="8" height="8" fill="#dbeafe" />
    {/* antenna */}
    <line x1="44" y1="15" x2="44" y2="35" stroke={LT} strokeWidth={2} strokeLinecap="round" />
    <rect x="62" y="48" width="24" height="67" fill="#93c5fd" stroke={LT} strokeWidth={2} />
    <rect x="66" y="55" width="6" height="6" fill="#dbeafe" />
    <rect x="76" y="55" width="6" height="6" fill="#dbeafe" />
    <rect x="66" y="67" width="6" height="6" fill="#dbeafe" />
    <rect x="76" y="67" width="6" height="6" fill="#dbeafe" />
    <rect x="88" y="60" width="26" height="55" fill="#bfdbfe" stroke={LT} strokeWidth={2} />
    <rect x="92" y="67" width="7" height="7" fill="#dbeafe" />
    <rect x="103" y="67" width="7" height="7" fill="#dbeafe" />
    <rect x="92" y="80" width="7" height="7" fill="#dbeafe" />
    {/* ground */}
    <rect x="0" y="112" width="120" height="8" fill="#d1fae5" />
  </svg>;
}

function Cinema() {
  return <svg viewBox="0 0 120 120" fill="none">
    {/* screen */}
    <rect x="10" y="15" width="100" height="60" rx="4" fill="#1e293b" stroke={LT} strokeWidth={2.5} />
    <rect x="16" y="21" width="88" height="48" rx="2" fill="#fefce8" />
    {/* film on screen */}
    <rect x="24" y="27" width="72" height="36" rx="2" fill="#93c5fd" />
    <circle cx="60" cy="45" r="12" fill="#1e293b" opacity={0.3} />
    {/* play triangle */}
    <polygon points="55,38 55,52 68,45" fill="white" opacity={0.8} />
    {/* seats */}
    {[20,40,60,80,100].map(x => <rect key={x} x={x-6} y={85} width={12} height={10} rx={3} fill="#374151" stroke={LT} strokeWidth={1.5} />)}
    {[10,30,50,70,90,110].map(x => <rect key={x} x={x-6} y={100} width={12} height={10} rx={3} fill="#374151" stroke={LT} strokeWidth={1.5} />)}
    {/* film strip decoration */}
    {[0,1,2,3,4].map(i => <rect key={i} x={16+i*18} y={76} width={8} height={6} rx={1} fill="#374151" />)}
  </svg>;
}

function Breakfast() {
  return <svg viewBox="0 0 120 120" fill="none">
    {/* table */}
    <rect x="8" y="85" width="104" height="6" rx="3" fill="#d6d3d1" stroke={LT} strokeWidth={2} />
    {/* cup */}
    <path d="M32 50 L36 82 L64 82 L68 50 Z" fill="#fefce8" stroke={LT} strokeWidth={2} />
    <ellipse cx="50" cy="50" rx="18" ry="6" fill="#fef3c7" stroke={LT} strokeWidth={2} />
    {/* coffee surface */}
    <ellipse cx="50" cy="50" rx="14" ry="4" fill="#92400e" stroke={LT} strokeWidth={1} />
    {/* handle */}
    <path d="M68 58 Q80 58 80 65 Q80 72 68 72" stroke={LT} strokeWidth={2.5} fill="none" />
    {/* saucer */}
    <ellipse cx="50" cy="83" rx="22" ry="5" fill="#e5e7eb" stroke={LT} strokeWidth={2} />
    {/* steam */}
    <path d="M44 42 Q42 36 44 31 Q46 26 44 21" stroke="#9ca3af" strokeWidth={1.5} strokeLinecap="round" fill="none" />
    <path d="M50 40 Q48 34 50 29 Q52 24 50 19" stroke="#9ca3af" strokeWidth={1.5} strokeLinecap="round" fill="none" />
    <path d="M56 42 Q54 36 56 31 Q58 26 56 21" stroke="#9ca3af" strokeWidth={1.5} strokeLinecap="round" fill="none" />
    {/* bread/croissant */}
    <path d="M74 60 Q80 48 100 52 Q110 58 104 70 Q96 78 80 74 Q68 68 74 60 Z" fill="#fde68a" stroke="#d97706" strokeWidth={2} />
    <path d="M78 64 Q84 56 98 59" stroke="#d97706" strokeWidth={1.5} strokeLinecap="round" />
    <path d="M76 70 Q85 62 100 64" stroke="#d97706" strokeWidth={1.5} strokeLinecap="round" />
  </svg>;
}

function Speech() {
  return <svg viewBox="0 0 120 120" fill="none">
    {/* main bubble */}
    <path d="M10 15 Q10 8 17 8 L103 8 Q110 8 110 15 L110 68 Q110 75 103 75 L65 75 L55 95 L48 75 L17 75 Q10 75 10 68 Z"
      fill="#dbeafe" stroke={BLUE} strokeWidth={2.5} />
    {/* text lines */}
    <line x1="24" y1="28" x2="96" y2="28" stroke={BLUE} strokeWidth={2.5} strokeLinecap="round" />
    <line x1="24" y1="40" x2="88" y2="40" stroke={BLUE} strokeWidth={2.5} strokeLinecap="round" />
    <line x1="24" y1="52" x2="80" y2="52" stroke={BLUE} strokeWidth={2.5} strokeLinecap="round" />
    <line x1="24" y1="64" x2="72" y2="64" stroke={BLUE} strokeWidth={2.5} strokeLinecap="round" />
    {/* German flag small */}
    <rect x="78" y="24" width="22" height="5" fill="#1e293b" rx="1" />
    <rect x="78" y="29" width="22" height="5" fill={RED} rx="1" />
    <rect x="78" y="34" width="22" height="5" fill={YEL} rx="1" />
  </svg>;
}

function Globe() {
  return <svg viewBox="0 0 120 120" fill="none">
    <circle cx="60" cy="60" r="48" fill="#dbeafe" stroke={LT} strokeWidth={2.5} />
    {/* latitude lines */}
    <ellipse cx="60" cy="60" rx="48" ry="16" stroke={LT} strokeWidth={1.5} strokeDasharray="3 2" />
    <ellipse cx="60" cy="40" rx="42" ry="10" stroke={LT} strokeWidth={1.5} strokeDasharray="3 2" />
    <ellipse cx="60" cy="80" rx="42" ry="10" stroke={LT} strokeWidth={1.5} strokeDasharray="3 2" />
    {/* longitude lines */}
    <line x1="60" y1="12" x2="60" y2="108" stroke={LT} strokeWidth={1.5} strokeDasharray="3 2" />
    <path d="M60 12 Q84 60 60 108" stroke={LT} strokeWidth={1.5} strokeDasharray="3 2" />
    <path d="M60 12 Q36 60 60 108" stroke={LT} strokeWidth={1.5} strokeDasharray="3 2" />
    {/* continents simplified */}
    <path d="M35 42 Q45 36 58 44 Q65 50 55 58 Q42 62 35 52 Z" fill="#86efac" stroke={GRN} strokeWidth={1.5} />
    <path d="M62 38 Q75 32 82 42 Q85 52 78 58 Q68 60 62 50 Z" fill="#86efac" stroke={GRN} strokeWidth={1.5} />
    <path d="M48 66 Q58 62 66 70 Q68 78 58 82 Q46 80 48 70 Z" fill="#86efac" stroke={GRN} strokeWidth={1.5} />
    {/* plane */}
    <text x="82" y="30" fontSize="14">✈</text>
  </svg>;
}

function Alarm() {
  return <svg viewBox="0 0 120 120" fill="none">
    <circle cx="60" cy="65" r="42" fill={BG} stroke={LT} strokeWidth={2.5} />
    <circle cx="60" cy="65" r="4" fill={LT} />
    {/* 8:00 */}
    <line x1="60" y1="65" x2="38" y2="79" stroke={LT} strokeWidth={4} strokeLinecap="round" />
    <line x1="60" y1="65" x2="60" y2="33" stroke={LT} strokeWidth={3} strokeLinecap="round" />
    {[0,30,60,90,120,150,180,210,240,270,300,330].map(deg => {
      const r = deg % 90 === 0 ? 34 : 37;
      const rad = (deg - 90) * Math.PI / 180;
      return <line key={deg} x1={60 + 40 * Math.cos(rad)} y1={65 + 40 * Math.sin(rad)} x2={60 + r * Math.cos(rad)} y2={65 + r * Math.sin(rad)} stroke={LT} strokeWidth={deg % 90 === 0 ? 3 : 1.5} strokeLinecap="round" />;
    })}
    {/* bells */}
    <path d="M20 30 Q12 22 18 14 Q24 8 30 14" stroke={LT} strokeWidth={2.5} fill="none" />
    <circle cx="16" cy="30" r="5" fill={YEL} stroke={LT} strokeWidth={2} />
    <path d="M100 30 Q108 22 102 14 Q96 8 90 14" stroke={LT} strokeWidth={2.5} fill="none" />
    <circle cx="104" cy="30" r="5" fill={YEL} stroke={LT} strokeWidth={2} />
    {/* feet */}
    <path d="M28 104 Q20 108 18 116" stroke={LT} strokeWidth={2.5} strokeLinecap="round" />
    <path d="M92 104 Q100 108 102 116" stroke={LT} strokeWidth={2.5} strokeLinecap="round" />
  </svg>;
}

function Stethoscope() {
  return <svg viewBox="0 0 120 120" fill="none">
    {/* earpieces */}
    <circle cx="30" cy="20" r="6" fill="#374151" stroke={LT} strokeWidth={1.5} />
    <circle cx="90" cy="20" r="6" fill="#374151" stroke={LT} strokeWidth={1.5} />
    {/* tubes */}
    <path d="M30 26 Q30 50 60 60" stroke={LT} strokeWidth={3} strokeLinecap="round" />
    <path d="M90 26 Q90 50 60 60" stroke={LT} strokeWidth={3} strokeLinecap="round" />
    <path d="M60 60 Q60 78 70 90" stroke={LT} strokeWidth={3.5} strokeLinecap="round" />
    {/* chest piece */}
    <circle cx="70" cy="90" r="20" fill="#bfdbfe" stroke={BLUE} strokeWidth={2.5} />
    <circle cx="70" cy="90" r="14" fill="#dbeafe" stroke={BLUE} strokeWidth={1.5} />
    {/* cross */}
    <line x1="70" y1="82" x2="70" y2="98" stroke={RED} strokeWidth={2.5} strokeLinecap="round" />
    <line x1="62" y1="90" x2="78" y2="90" stroke={RED} strokeWidth={2.5} strokeLinecap="round" />
  </svg>;
}

function Briefcase() {
  return <svg viewBox="0 0 120 120" fill="none">
    {/* handle */}
    <path d="M42 30 L42 22 Q42 14 60 14 Q78 14 78 22 L78 30" stroke={LT} strokeWidth={2.5} fill="none" />
    {/* body */}
    <rect x="12" y="30" width="96" height="72" rx="8" fill="#d6b88a" stroke={LT} strokeWidth={2.5} />
    {/* latch */}
    <rect x="50" y="60" width="20" height="12" rx="4" fill="#9ca3af" stroke={LT} strokeWidth={1.5} />
    <circle cx="60" cy="66" r="4" fill="#6b7280" />
    {/* center seam */}
    <line x1="12" y1="66" x2="108" y2="66" stroke={LT} strokeWidth={1.5} />
    {/* straps */}
    <line x1="35" y1="30" x2="35" y2="102" stroke={LT} strokeWidth={1.5} />
    <line x1="85" y1="30" x2="85" y2="102" stroke={LT} strokeWidth={1.5} />
  </svg>;
}

function Cooking() {
  return <svg viewBox="0 0 120 120" fill="none">
    {/* stove surface */}
    <rect x="12" y="72" width="96" height="38" rx="4" fill="#e5e7eb" stroke={LT} strokeWidth={2.5} />
    {/* burner */}
    <circle cx="60" cy="80" r="10" fill="#374151" stroke={LT} strokeWidth={1.5} />
    <circle cx="60" cy="80" r="5" fill="#6b7280" />
    {/* flames */}
    <path d="M52 72 Q54 60 50 55 Q58 65 56 55 Q60 62 60 55 Q64 62 64 55 Q62 65 70 55 Q66 60 68 72" fill="#fb923c" stroke={YEL} strokeWidth={1.5} />
    {/* pot */}
    <path d="M28 45 L32 70 L88 70 L92 45 Z" fill="#9ca3af" stroke={LT} strokeWidth={2.5} />
    <ellipse cx="60" cy="45" rx="32" ry="9" fill="#6b7280" stroke={LT} strokeWidth={2.5} />
    {/* lid */}
    <ellipse cx="60" cy="42" rx="32" ry="9" fill="#9ca3af" stroke={LT} strokeWidth={2.5} />
    <ellipse cx="60" cy="40" rx="24" ry="6" fill="#6b7280" stroke={LT} strokeWidth={1.5} />
    <circle cx="60" cy="36" r="5" fill="#9ca3af" stroke={LT} strokeWidth={1.5} />
    {/* steam */}
    <path d="M46 38 Q44 32 46 27 Q48 22 46 17" stroke="#d1d5db" strokeWidth={2} strokeLinecap="round" fill="none" />
    <path d="M60 36 Q58 30 60 25 Q62 20 60 15" stroke="#d1d5db" strokeWidth={2} strokeLinecap="round" fill="none" />
    <path d="M74 38 Q72 32 74 27 Q76 22 74 17" stroke="#d1d5db" strokeWidth={2} strokeLinecap="round" fill="none" />
    {/* handles */}
    <path d="M28 55 L16 55 L16 60 L28 60" stroke={LT} strokeWidth={2} fill="none" />
    <path d="M92 55 L104 55 L104 60 L92 60" stroke={LT} strokeWidth={2} fill="none" />
  </svg>;
}

function Reading() {
  return <svg viewBox="0 0 120 120" fill="none">
    {/* open book */}
    <path d="M10 25 Q10 20 15 20 L58 24 L58 102 L15 98 Q10 98 10 93 Z" fill="#fefce8" stroke={LT} strokeWidth={2.5} />
    <path d="M62 24 L105 20 Q110 20 110 25 L110 93 Q110 98 105 98 L62 102 Z" fill="#fefce8" stroke={LT} strokeWidth={2.5} />
    <line x1="58" y1="24" x2="58" y2="102" stroke={LT} strokeWidth={1.5} />
    <line x1="62" y1="24" x2="62" y2="102" stroke={LT} strokeWidth={1.5} />
    {/* left page text lines */}
    {[36,46,56,66,76,86].map(y => <line key={y} x1="18" y1={y} x2="54" y2={y} stroke="#d1d5db" strokeWidth={1.5} />)}
    {/* right page text lines */}
    {[36,46,56,66,76,86].map(y => <line key={y} x1="66" y1={y} x2="102" y2={y} stroke="#d1d5db" strokeWidth={1.5} />)}
    {/* bookmark */}
    <path d="M96 20 L96 42 L90 36 L84 42 L84 20" fill="#fca5a5" stroke={LT} strokeWidth={1.5} />
  </svg>;
}

function House() {
  return <svg viewBox="0 0 120 120" fill="none">
    {/* roof */}
    <path d="M10 58 L60 12 L110 58" fill="#fca5a5" stroke={LT} strokeWidth={2.5} strokeLinejoin="round" />
    {/* chimney */}
    <rect x="72" y="24" width="12" height="22" fill="#d6d3d1" stroke={LT} strokeWidth={2} />
    <path d="M70 23 Q72 15 78 13 Q84 15 86 23" fill="#9ca3af" stroke={LT} strokeWidth={1.5} />
    {/* body */}
    <rect x="18" y="55" width="84" height="56" fill="#fefce8" stroke={LT} strokeWidth={2.5} />
    {/* door */}
    <rect x="48" y="80" width="24" height="31" rx="2" fill="#d6b88a" stroke={LT} strokeWidth={2} />
    <circle cx="67" cy="96" r="2.5" fill={LT} />
    {/* windows */}
    <rect x="24" y="64" width="20" height="18" rx="2" fill="#bfdbfe" stroke={LT} strokeWidth={2} />
    <line x1="34" y1="64" x2="34" y2="82" stroke={LT} strokeWidth={1} />
    <line x1="24" y1="73" x2="44" y2="73" stroke={LT} strokeWidth={1} />
    <rect x="76" y="64" width="20" height="18" rx="2" fill="#bfdbfe" stroke={LT} strokeWidth={2} />
    <line x1="86" y1="64" x2="86" y2="82" stroke={LT} strokeWidth={1} />
    <line x1="76" y1="73" x2="96" y2="73" stroke={LT} strokeWidth={1} />
    {/* garden */}
    <line x1="10" y1="111" x2="110" y2="111" stroke={GRN} strokeWidth={3} strokeLinecap="round" />
    <path d="M8 111 Q8 100 12 100 Q16 100 16 111" fill={GRN} />
    <path d="M100 111 Q100 98 105 98 Q110 98 110 111" fill={GRN} />
  </svg>;
}

function Germany() {
  return <svg viewBox="0 0 120 120" fill="none">
    {/* flag */}
    <rect x="15" y="20" width="90" height="26" rx="0" fill="#1e293b" />
    <rect x="15" y="46" width="90" height="27" fill={RED} />
    <rect x="15" y="73" width="90" height="27" fill={YEL} rx="0" />
    <rect x="15" y="20" width="90" height="80" rx="4" fill="none" stroke={LT} strokeWidth={2.5} />
    {/* pole */}
    <line x1="12" y1="15" x2="12" y2="108" stroke={LT} strokeWidth={3} strokeLinecap="round" />
    <circle cx="12" cy="13" r="5" fill={YEL} stroke={LT} strokeWidth={1.5} />
  </svg>;
}

/* ── Part 3 illustrations ─────────────────────────────────────────────────── */

function Pencil() {
  return <svg viewBox="0 0 120 120" fill="none">
    {/* pencil body diagonal */}
    <path d="M22 95 L85 18 L100 28 L38 108 Z" fill="#fde68a" stroke={LT} strokeWidth={2.5} strokeLinejoin="round" />
    {/* eraser */}
    <path d="M85 18 L96 12 L106 22 L100 28 Z" fill="#fca5a5" stroke={LT} strokeWidth={2} strokeLinejoin="round" />
    {/* metal band */}
    <path d="M80 24 L95 34 L91 40 L76 30 Z" fill="#9ca3af" stroke={LT} strokeWidth={1.5} strokeLinejoin="round" />
    {/* tip */}
    <path d="M22 95 L38 108 L28 115 Z" fill="#fbbf24" stroke={LT} strokeWidth={1.5} strokeLinejoin="round" />
    {/* stripe */}
    <line x1="52" y1="28" x2="32" y2="98" stroke={YEL} strokeWidth={2} opacity={0.5} />
    {/* lines on paper hint */}
    <line x1="55" y1="72" x2="95" y2="85" stroke="#d1d5db" strokeWidth={1.5} strokeLinecap="round" strokeDasharray="4 3" />
    <line x1="50" y1="82" x2="90" y2="95" stroke="#d1d5db" strokeWidth={1.5} strokeLinecap="round" strokeDasharray="4 3" />
  </svg>;
}

function Paper() {
  return <svg viewBox="0 0 120 120" fill="none">
    <path d="M22 10 L84 10 L98 26 L98 110 L22 110 Z" fill="#fefce8" stroke={LT} strokeWidth={2.5} />
    <path d="M84 10 L84 26 L98 26" fill="#fde68a" stroke={LT} strokeWidth={2} />
    {/* text lines */}
    {[36,48,60,72,84,96].map(y => <line key={y} x1="34" y1={y} x2="86" y2={y} stroke="#d1d5db" strokeWidth={2} strokeLinecap="round" />)}
    {/* short last line */}
    <line x1="34" y1="96" x2="62" y2="96" stroke="#d1d5db" strokeWidth={2} strokeLinecap="round" />
  </svg>;
}

function NoPhone() {
  return <svg viewBox="0 0 120 120" fill="none">
    {/* phone */}
    <rect x="40" y="15" width="40" height="70" rx="8" fill="#1e293b" stroke={LT} strokeWidth={2} opacity={0.5} />
    <rect x="46" y="24" width="28" height="44" rx="2" fill="#93c5fd" opacity={0.5} />
    <circle cx="60" cy="74" r="4" fill="#374151" opacity={0.5} />
    <ProhibitionRing cx={60} cy={60} r={36} />
    {/* library hint */}
    <rect x="8" y="95" width="104" height="18" rx="3" fill="#bfdbfe" stroke={BLUE} strokeWidth={1.5} />
    <text x="24" y="108" fontSize="10" fill={BLUE} fontWeight="bold">BIBLIOTHEK</text>
  </svg>;
}

function Charger() {
  return <svg viewBox="0 0 120 120" fill="none">
    {/* phone */}
    <rect x="42" y="10" width="36" height="55" rx="6" fill="#1e293b" stroke={LT} strokeWidth={2} />
    <rect x="48" y="18" width="24" height="34" rx="2" fill="#4b5563" />
    {/* battery indicator */}
    <rect x="50" y="20" width="20" height="30" rx="1" fill="#dc2626" opacity={0.5} />
    <rect x="50" y="38" width="20" height="12" rx="1" fill="#22c55e" />
    <rect x="55" y="18" width="10" height="3" rx="1" fill="#374151" />
    {/* lightning bolt */}
    <path d="M64 30 L57 42 L62 42 L55 52 L65 38 L60 38 Z" fill={YEL} stroke={YEL} strokeWidth={1} />
    {/* cable */}
    <line x1="60" y1="65" x2="60" y2="85" stroke="#374151" strokeWidth={4} strokeLinecap="round" />
    {/* adapter */}
    <rect x="44" y="85" width="32" height="22" rx="4" fill="#6b7280" stroke={LT} strokeWidth={2} />
    {/* prongs */}
    <line x1="52" y1="107" x2="52" y2="116" stroke={LT} strokeWidth={3} strokeLinecap="round" />
    <line x1="68" y1="107" x2="68" y2="116" stroke={LT} strokeWidth={3} strokeLinecap="round" />
  </svg>;
}

function NoCamera() {
  return <svg viewBox="0 0 120 120" fill="none">
    {/* camera body */}
    <rect x="18" y="34" width="84" height="56" rx="8" fill="#374151" stroke={LT} strokeWidth={2} opacity={0.5} />
    <path d="M42 34 L48 20 L72 20 L78 34" fill="#4b5563" opacity={0.5} stroke={LT} strokeWidth={2} />
    <circle cx="60" cy="62" r="20" fill="#6b7280" stroke={LT} strokeWidth={2} opacity={0.5} />
    <circle cx="60" cy="62" r="13" fill="#9ca3af" opacity={0.5} />
    <circle cx="75" cy="43" r="5" fill="#4b5563" opacity={0.5} />
    <ProhibitionRing cx={60} cy={62} r={38} />
  </svg>;
}

function Handbag() {
  return <svg viewBox="0 0 120 120" fill="none">
    {/* handle */}
    <path d="M38 38 Q38 18 60 18 Q82 18 82 38" stroke={LT} strokeWidth={3} fill="none" />
    {/* bag body */}
    <path d="M16 42 L22 100 Q22 108 30 108 L90 108 Q98 108 98 100 L104 42 Z"
      fill="#fde68a" stroke={LT} strokeWidth={2.5} />
    {/* flap */}
    <path d="M16 42 L104 42 Q104 60 60 65 Q16 60 16 42 Z" fill="#fbbf24" stroke={LT} strokeWidth={2} />
    {/* clasp */}
    <ellipse cx="60" cy="64" rx="10" ry="6" fill="#9ca3af" stroke={LT} strokeWidth={2} />
    <rect x="56" y="61" width="8" height="6" rx="2" fill="#6b7280" stroke={LT} strokeWidth={1} />
    {/* decorative lines */}
    <line x1="32" y1="78" x2="88" y2="78" stroke="#fbbf24" strokeWidth={1.5} strokeLinecap="round" />
    <line x1="32" y1="90" x2="88" y2="90" stroke="#fbbf24" strokeWidth={1.5} strokeLinecap="round" />
  </svg>;
}

function Tram() {
  return <svg viewBox="0 0 120 120" fill="none">
    {/* tram body */}
    <rect x="8" y="30" width="104" height="58" rx="8" fill="#bbf7d0" stroke={LT} strokeWidth={2.5} />
    {/* windows row 1 */}
    <rect x="14" y="38" width="20" height="16" rx="3" fill="#dbeafe" stroke={LT} strokeWidth={1.5} />
    <rect x="40" y="38" width="20" height="16" rx="3" fill="#dbeafe" stroke={LT} strokeWidth={1.5} />
    <rect x="66" y="38" width="20" height="16" rx="3" fill="#dbeafe" stroke={LT} strokeWidth={1.5} />
    <rect x="92" y="38" width="14" height="16" rx="3" fill="#dbeafe" stroke={LT} strokeWidth={1.5} />
    {/* doors */}
    <rect x="28" y="58" width="28" height="30" rx="2" fill="#86efac" stroke={LT} strokeWidth={1.5} />
    <line x1="42" y1="58" x2="42" y2="88" stroke={LT} strokeWidth={1} />
    <rect x="62" y="58" width="28" height="30" rx="2" fill="#86efac" stroke={LT} strokeWidth={1.5} />
    <line x1="76" y1="58" x2="76" y2="88" stroke={LT} strokeWidth={1} />
    {/* wheels */}
    <circle cx="26" cy="93" r="12" fill="#4b5563" stroke={LT} strokeWidth={2} />
    <circle cx="94" cy="93" r="12" fill="#4b5563" stroke={LT} strokeWidth={2} />
    <circle cx="26" cy="93" r="5" fill={BG} />
    <circle cx="94" cy="93" r="5" fill={BG} />
    {/* rails */}
    <line x1="2" y1="105" x2="118" y2="105" stroke={LT} strokeWidth={2.5} strokeLinecap="round" />
    <line x1="2" y1="110" x2="118" y2="110" stroke={LT} strokeWidth={2.5} strokeLinecap="round" />
    {/* pantograph */}
    <line x1="60" y1="30" x2="50" y2="15" stroke={LT} strokeWidth={1.5} />
    <line x1="60" y1="30" x2="70" y2="15" stroke={LT} strokeWidth={1.5} />
    <line x1="48" y1="15" x2="72" y2="15" stroke={LT} strokeWidth={2} strokeLinecap="round" />
    {/* overhead wire */}
    <line x1="0" y1="12" x2="120" y2="12" stroke="#d1d5db" strokeWidth={1.5} />
  </svg>;
}

function Park() {
  return <svg viewBox="0 0 120 120" fill="none">
    {/* grass */}
    <ellipse cx="60" cy="108" rx="55" ry="10" fill="#bbf7d0" />
    {/* tree left */}
    <rect x="20" y="70" width="8" height="34" fill="#92400e" stroke={LT} strokeWidth={1.5} />
    <ellipse cx="24" cy="55" rx="18" ry="22" fill="#4ade80" stroke={GRN} strokeWidth={2} />
    {/* tree right */}
    <rect x="86" y="75" width="7" height="30" fill="#92400e" stroke={LT} strokeWidth={1.5} />
    <ellipse cx="89" cy="60" rx="15" ry="20" fill="#4ade80" stroke={GRN} strokeWidth={2} />
    {/* path */}
    <path d="M40 108 Q60 90 80 108" fill="#fde68a" stroke={YEL} strokeWidth={1.5} />
    {/* "Rasen betreten verboten" sign */}
    <rect x="50" y="45" width="44" height="28" rx="4" fill="white" stroke={RED} strokeWidth={2} />
    <text x="56" y="58" fontSize="7" fill={RED} fontWeight="bold">RASEN</text>
    <text x="52" y="67" fontSize="7" fill={RED} fontWeight="bold">VERBOTEN</text>
    {/* sign post */}
    <line x1="72" y1="73" x2="72" y2="90" stroke={LT} strokeWidth={2} />
  </svg>;
}

function Map() {
  return <svg viewBox="0 0 120 120" fill="none">
    {/* map paper */}
    <path d="M10 18 L42 12 L78 22 L110 14 L110 100 L78 108 L42 98 L10 104 Z"
      fill="#fefce8" stroke={LT} strokeWidth={2.5} />
    {/* fold lines */}
    <line x1="42" y1="12" x2="42" y2="98" stroke={LT} strokeWidth={1.5} strokeDasharray="4 2" />
    <line x1="78" y1="22" x2="78" y2="108" stroke={LT} strokeWidth={1.5} strokeDasharray="4 2" />
    {/* streets */}
    <line x1="18" y1="45" x2="102" y2="45" stroke="#d1d5db" strokeWidth={3} strokeLinecap="round" />
    <line x1="18" y1="68" x2="102" y2="68" stroke="#d1d5db" strokeWidth={3} strokeLinecap="round" />
    <line x1="35" y1="20" x2="35" y2="100" stroke="#d1d5db" strokeWidth={3} strokeLinecap="round" />
    <line x1="62" y1="18" x2="62" y2="104" stroke="#d1d5db" strokeWidth={3} strokeLinecap="round" />
    <line x1="88" y1="18" x2="88" y2="104" stroke="#d1d5db" strokeWidth={3} strokeLinecap="round" />
    {/* pin */}
    <path d="M62 28 Q62 22 68 20 Q80 20 80 32 Q80 44 68 52 Q56 44 56 32 Q56 20 62 28 Z"
      fill={RED} stroke="#991b1b" strokeWidth={1.5} />
    <circle cx="68" cy="30" r="5" fill="white" />
    <line x1="68" y1="52" x2="68" y2="62" stroke={RED} strokeWidth={2} />
  </svg>;
}

function NoSmoking() {
  return <svg viewBox="0 0 120 120" fill="none">
    {/* cigarette */}
    <rect x="10" y="54" width="80" height="12" rx="4" fill="#f5f5f4" stroke={LT} strokeWidth={2} opacity={0.6} />
    <rect x="82" y="54" width="28" height="12" rx="2" fill="#fb923c" stroke={LT} strokeWidth={2} opacity={0.6} />
    {/* ember glow */}
    <circle cx="89" cy="60" r="4" fill={RED} opacity={0.6} />
    {/* smoke */}
    <path d="M14 52 Q12 44 14 38 Q16 32 14 26" stroke="#9ca3af" strokeWidth={1.5} strokeLinecap="round" fill="none" opacity={0.5} />
    <path d="M22 50 Q20 42 22 36 Q24 30 22 24" stroke="#9ca3af" strokeWidth={1.5} strokeLinecap="round" fill="none" opacity={0.5} />
    <ProhibitionRing cx={60} cy={60} r={48} />
  </svg>;
}

function Restaurant() {
  return <svg viewBox="0 0 120 120" fill="none">
    {/* plate */}
    <circle cx="60" cy="72" r="40" fill="#f5f5f4" stroke={LT} strokeWidth={2.5} />
    {/* cloche/dome cover */}
    <path d="M22 68 Q22 30 60 30 Q98 30 98 68 Z" fill="#e5e7eb" stroke={LT} strokeWidth={2.5} />
    <ellipse cx="60" cy="68" rx="38" ry="8" fill="#d1d5db" stroke={LT} strokeWidth={2} />
    {/* cloche handle */}
    <ellipse cx="60" cy="26" rx="10" ry="6" fill="#9ca3af" stroke={LT} strokeWidth={2} />
    {/* table line */}
    <line x1="10" y1="112" x2="110" y2="112" stroke={LT} strokeWidth={2.5} strokeLinecap="round" />
    {/* cutlery */}
    <line x1="16" y1="50" x2="16" y2="80" stroke={LT} strokeWidth={2.5} strokeLinecap="round" />
    <line x1="13" y1="50" x2="13" y2="60" stroke={LT} strokeWidth={2} strokeLinecap="round" />
    <line x1="19" y1="50" x2="19" y2="60" stroke={LT} strokeWidth={2} strokeLinecap="round" />
    <line x1="104" y1="50" x2="104" y2="80" stroke={LT} strokeWidth={2.5} strokeLinecap="round" />
    <path d="M104 50 C107 55 107 62 104 65" stroke={LT} strokeWidth={2} fill="none" />
  </svg>;
}

function Hotel() {
  return <svg viewBox="0 0 120 120" fill="none">
    <rect x="15" y="30" width="90" height="82" rx="3" fill="#dbeafe" stroke={LT} strokeWidth={2.5} />
    {/* windows grid */}
    {[42,58,74].map(y =>
      [24,44,64,84].map(x =>
        <rect key={`${x}-${y}`} x={x} y={y} width="16" height="10" rx="2" fill="#bfdbfe" stroke={LT} strokeWidth={1.5} />
      )
    )}
    {/* entrance */}
    <rect x="46" y="90" width="28" height="22" rx="3" fill="#93c5fd" stroke={LT} strokeWidth={2} />
    <path d="M46 90 Q60 84 74 90" fill="#bfdbfe" stroke={LT} strokeWidth={1.5} />
    {/* "H" sign */}
    <rect x="40" y="15" width="40" height="18" rx="4" fill={BLUE} />
    <text x="50" y="28" fontSize="14" fontWeight="bold" fill="white">H</text>
    {/* roof line */}
    <line x1="15" y1="30" x2="105" y2="30" stroke={LT} strokeWidth={2.5} />
    {/* columns */}
    <rect x="46" y="82" width="6" height="8" fill="#93c5fd" stroke={LT} strokeWidth={1} />
    <rect x="68" y="82" width="6" height="8" fill="#93c5fd" stroke={LT} strokeWidth={1} />
    {/* ground */}
    <line x1="8" y1="112" x2="112" y2="112" stroke={LT} strokeWidth={2.5} strokeLinecap="round" />
  </svg>;
}

function Medical() {
  return <svg viewBox="0 0 120 120" fill="none">
    {/* white cross on red background */}
    <circle cx="60" cy="60" r="50" fill="#fee2e2" stroke={RED} strokeWidth={2.5} />
    <rect x="42" y="28" width="36" height="64" rx="6" fill={RED} />
    <rect x="28" y="42" width="64" height="36" rx="6" fill={RED} />
    <rect x="46" y="32" width="28" height="56" rx="4" fill="white" />
    <rect x="32" y="46" width="56" height="28" rx="4" fill="white" />
    {/* inner cross */}
    <rect x="50" y="36" width="20" height="48" rx="2" fill={RED} />
    <rect x="36" y="50" width="48" height="20" rx="2" fill={RED} />
  </svg>;
}

function CalendarSvg() {
  return <svg viewBox="0 0 120 120" fill="none">
    {/* body */}
    <rect x="10" y="22" width="100" height="90" rx="6" fill="white" stroke={LT} strokeWidth={2.5} />
    {/* header */}
    <rect x="10" y="22" width="100" height="26" rx="6" fill={BLUE} />
    <rect x="10" y="36" width="100" height="12" fill={BLUE} />
    {/* ring hooks */}
    <rect x="32" y="14" width="8" height="18" rx="4" fill="#4b5563" stroke={LT} strokeWidth={1.5} />
    <rect x="80" y="14" width="8" height="18" rx="4" fill="#4b5563" stroke={LT} strokeWidth={1.5} />
    {/* month text */}
    <text x="38" y="40" fontSize="12" fontWeight="bold" fill="white">OKTOBER</text>
    {/* grid lines */}
    <line x1="10" y1="62" x2="110" y2="62" stroke="#e5e7eb" strokeWidth={1.5} />
    <line x1="10" y1="78" x2="110" y2="78" stroke="#e5e7eb" strokeWidth={1.5} />
    <line x1="10" y1="94" x2="110" y2="94" stroke="#e5e7eb" strokeWidth={1.5} />
    {/* day numbers */}
    {["1","2","3","4","5","6","7"].map((d,i) =>
      <text key={d} x={20+i*14} y={60} fontSize="9" fill="#6b7280">{d}</text>
    )}
    {["8","9","10","11","12","13","14"].map((d,i) =>
      <text key={d} x={20+i*14} y={76} fontSize="9" fill={LT}>{d}</text>
    )}
    {/* highlighted day 15 */}
    <circle cx="24" cy="87" r="8" fill={RED} />
    <text x="21" y="91" fontSize="9" fill="white" fontWeight="bold">15</text>
    {["16","17","18","19","20","21"].map((d,i) =>
      <text key={d} x={38+i*14} y={92} fontSize="9" fill={LT}>{d}</text>
    )}
  </svg>;
}

function Ticket() {
  return <svg viewBox="0 0 120 120" fill="none">
    {/* ticket body */}
    <path d="M8 38 L8 52 Q18 52 18 60 Q18 68 8 68 L8 82 L112 82 L112 68 Q102 68 102 60 Q102 52 112 52 L112 38 Z"
      fill="#fde68a" stroke={LT} strokeWidth={2.5} strokeLinejoin="round" />
    {/* perforation */}
    <line x1="34" y1="38" x2="34" y2="82" stroke={LT} strokeWidth={1.5} strokeDasharray="4 3" />
    {/* stub */}
    <rect x="8" y="38" width="26" height="44" rx="0" fill="#fbbf24" />
    {/* seat info */}
    <text x="14" y="58" fontSize="8" fill={LT} fontWeight="bold">REIHE</text>
    <text x="16" y="70" fontSize="11" fill={LT} fontWeight="bold">5</text>
    {/* film strip decoration on main part */}
    <text x="44" y="53" fontSize="9" fill={LT} fontWeight="bold">CINEMA</text>
    <line x1="44" y1="57" x2="104" y2="57" stroke="#fbbf24" strokeWidth={1.5} />
    <text x="44" y="68" fontSize="8" fill="#6b7280">Platz 12 · 20:00</text>
    <text x="44" y="78" fontSize="7" fill="#9ca3af">Fr, 15. Oktober</text>
  </svg>;
}

function LibraryBook() {
  return <svg viewBox="0 0 120 120" fill="none">
    {/* book */}
    <rect x="14" y="20" width="60" height="80" rx="4" fill="#93c5fd" stroke={LT} strokeWidth={2.5} />
    <rect x="14" y="20" width="10" height="80" rx="4" fill="#2563eb" stroke={LT} strokeWidth={2} />
    {/* book text lines */}
    {[36,46,56,66,76].map(y => <line key={y} x1="30" y1={y} x2="68" y2={y} stroke="#bfdbfe" strokeWidth={1.5} />)}
    <text x="20" y="90" fontSize="9" fill="white" fontWeight="bold">A-Z</text>
    {/* library card */}
    <rect x="56" y="62" width="56" height="38" rx="4" fill="white" stroke={LT} strokeWidth={2} />
    <rect x="56" y="62" width="56" height="12" rx="4" fill={BLUE} />
    <rect x="56" y="68" width="56" height="6" fill={BLUE} />
    <text x="60" y="72" fontSize="8" fill="white" fontWeight="bold">BIBLIOTHEK</text>
    {/* barcode lines */}
    {[64,67,70,73,76,79,82,85,88,101,104].map(x =>
      <line key={x} x1={x} y1={80} x2={x} y2={94} stroke={LT} strokeWidth={x % 6 === 0 ? 2 : 1} />
    )}
    <text x="68" y="100" fontSize="7" fill="#6b7280">1234 5678 9012</text>
  </svg>;
}

function Pool() {
  return <svg viewBox="0 0 120 120" fill="none">
    {/* pool */}
    <rect x="8" y="55" width="104" height="55" rx="6" fill="#bfdbfe" stroke={BLUE} strokeWidth={2.5} />
    {/* waves */}
    <path d="M8 72 Q24 64 40 72 Q56 80 72 72 Q88 64 104 72 L112 72 L112 78 L8 78 Z" fill="#93c5fd" />
    <path d="M8 86 Q24 78 40 86 Q56 94 72 86 Q88 78 104 86 L112 86 L112 92 L8 92 Z" fill="#60a5fa" opacity={0.6} />
    {/* swimmer */}
    <circle cx="60" cy="58" r="10" fill="#fde68a" stroke={LT} strokeWidth={2} />
    {/* arm strokes */}
    <path d="M40 55 Q50 48 60 54" stroke={LT} strokeWidth={2.5} strokeLinecap="round" />
    <path d="M60 54 Q70 48 80 55" stroke={LT} strokeWidth={2.5} strokeLinecap="round" />
    {/* body in water */}
    <path d="M48 62 Q60 68 72 62" stroke={LT} strokeWidth={2.5} strokeLinecap="round" />
    {/* ladder */}
    <line x1="100" y1="40" x2="100" y2="75" stroke={LT} strokeWidth={2.5} strokeLinecap="round" />
    <line x1="110" y1="40" x2="110" y2="75" stroke={LT} strokeWidth={2.5} strokeLinecap="round" />
    <line x1="100" y1="48" x2="110" y2="48" stroke={LT} strokeWidth={2} />
    <line x1="100" y1="58" x2="110" y2="58" stroke={LT} strokeWidth={2} />
    <line x1="100" y1="68" x2="110" y2="68" stroke={LT} strokeWidth={2} />
  </svg>;
}

function Quiet() {
  return <svg viewBox="0 0 120 120" fill="none">
    {/* person */}
    <circle cx="40" cy="38" r="16" fill="#fde68a" stroke={LT} strokeWidth={2.5} />
    {/* finger to lips */}
    <path d="M36 46 Q40 50 44 46" stroke={LT} strokeWidth={2} strokeLinecap="round" fill="none" />
    <line x1="40" y1="38" x2="40" y2="50" stroke={LT} strokeWidth={2} strokeLinecap="round" />
    {/* shushing finger */}
    <line x1="40" y1="48" x2="40" y2="56" stroke={LT} strokeWidth={3} strokeLinecap="round" />
    {/* body */}
    <path d="M26 60 Q26 55 40 54 Q54 55 54 60 L54 90 L26 90 Z" fill="#dbeafe" stroke={LT} strokeWidth={2} />
    {/* sound waves crossed out */}
    <path d="M62 35 Q70 42 70 58 Q70 74 62 80" stroke="#9ca3af" strokeWidth={2} strokeLinecap="round" fill="none" />
    <path d="M72 28 Q84 40 84 58 Q84 76 72 88" stroke="#9ca3af" strokeWidth={2} strokeLinecap="round" fill="none" />
    <path d="M82 20 Q98 38 98 58 Q98 78 82 96" stroke="#9ca3af" strokeWidth={2} strokeLinecap="round" fill="none" />
    {/* X over sound waves */}
    <line x1="60" y1="28" x2="100" y2="92" stroke={RED} strokeWidth={3} strokeLinecap="round" />
    <line x1="100" y1="28" x2="60" y2="92" stroke={RED} strokeWidth={3} strokeLinecap="round" />
    {/* SHHH text */}
    <text x="56" y="115" fontSize="11" fontWeight="bold" fill={BLUE}>RUHEZONE</text>
  </svg>;
}

function Train() {
  return <svg viewBox="0 0 120 120" fill="none">
    {/* train body */}
    <rect x="8" y="25" width="104" height="62" rx="10" fill="#bfdbfe" stroke={LT} strokeWidth={2.5} />
    {/* front nose */}
    <path d="M8 55 Q4 55 4 60 Q4 65 8 65" stroke={LT} strokeWidth={1.5} fill="#93c5fd" />
    {/* windows */}
    <rect x="16" y="34" width="22" height="18" rx="3" fill="#dbeafe" stroke={LT} strokeWidth={2} />
    <rect x="44" y="34" width="22" height="18" rx="3" fill="#dbeafe" stroke={LT} strokeWidth={2} />
    <rect x="72" y="34" width="22" height="18" rx="3" fill="#dbeafe" stroke={LT} strokeWidth={2} />
    <rect x="96" y="34" width="12" height="18" rx="3" fill="#dbeafe" stroke={LT} strokeWidth={2} />
    {/* "Ruhe" quiet zone sign */}
    <rect x="20" y="58" width="44" height="18" rx="3" fill="#fef3c7" stroke={YEL} strokeWidth={1.5} />
    <text x="24" y="67" fontSize="7" fill={YEL} fontWeight="bold">🤫 RUHEZONE</text>
    <text x="26" y="74" fontSize="6" fill="#92400e">Kein Telefonieren</text>
    {/* doors */}
    <rect x="72" y="58" width="36" height="29" rx="2" fill="#93c5fd" stroke={LT} strokeWidth={1.5} />
    <line x1="90" y1="58" x2="90" y2="87" stroke={LT} strokeWidth={1} />
    {/* wheels */}
    <circle cx="28" cy="92" r="12" fill="#4b5563" stroke={LT} strokeWidth={2} />
    <circle cx="92" cy="92" r="12" fill="#4b5563" stroke={LT} strokeWidth={2} />
    <circle cx="28" cy="92" r="5" fill={BG} />
    <circle cx="92" cy="92" r="5" fill={BG} />
    {/* rails */}
    <line x1="2" y1="104" x2="118" y2="104" stroke={LT} strokeWidth={2.5} strokeLinecap="round" />
    <line x1="2" y1="110" x2="118" y2="110" stroke={LT} strokeWidth={2.5} strokeLinecap="round" />
  </svg>;
}

function TShirt() {
  return <svg viewBox="0 0 120 120" fill="none">
    {/* t-shirt shape */}
    <path d="M20 20 L2 45 L22 52 L22 100 L98 100 L98 52 L118 45 L100 20 L80 35 Q60 42 40 35 Z"
      fill="#93c5fd" stroke={LT} strokeWidth={2.5} strokeLinejoin="round" />
    {/* collar */}
    <path d="M40 20 Q60 32 80 20" stroke={LT} strokeWidth={2} fill="none" />
    {/* price tag */}
    <rect x="68" y="55" width="28" height="18" rx="3" fill="white" stroke={LT} strokeWidth={1.5} />
    <circle cx="68" cy="55" r="3" fill={YEL} stroke={LT} strokeWidth={1} />
    <line x1="60" y1="52" x2="68" y2="58" stroke={LT} strokeWidth={1.5} />
    <text x="72" y="65" fontSize="8" fill={LT}>€ 29</text>
    {/* return arrows */}
    <path d="M25 58 Q18 65 25 72" stroke={LT} strokeWidth={2} strokeLinecap="round" fill="none" />
    <path d="M25 72 L20 68 M25 72 L30 68" stroke={LT} strokeWidth={2} strokeLinecap="round" />
  </svg>;
}

/* ── Illustration map ─────────────────────────────────────────────────────── */

const ILLUSTRATIONS: Record<IllustrationKey, React.FC> = {
  food: Food, sport: Sport, family: Family, apartment: Apartment,
  clock: Clock, airplane: Airplane, subway: Subway, jogging: Jogging,
  shopping: Shopping, sun: Sun, books: Books, smartphone: Smartphone,
  city: City, cinema: Cinema, breakfast: Breakfast, speech: Speech,
  globe: Globe, alarm: Alarm, stethoscope: Stethoscope, briefcase: Briefcase,
  cooking: Cooking, reading: Reading, house: House, germany: Germany,
  pencil: Pencil, paper: Paper, "no-phone": NoPhone, charger: Charger,
  "no-camera": NoCamera, handbag: Handbag, tram: Tram, park: Park,
  map: Map, "no-smoking": NoSmoking, restaurant: Restaurant, hotel: Hotel,
  medical: Medical, calendar: CalendarSvg, ticket: Ticket,
  "library-book": LibraryBook, pool: Pool, quiet: Quiet, train: Train,
  tshirt: TShirt,
};

export default function SpeakingIllustration({ imageKey, className = "" }: { imageKey: IllustrationKey; className?: string }) {
  const Illustration = ILLUSTRATIONS[imageKey];
  if (!Illustration) return null;
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Illustration />
    </div>
  );
}
