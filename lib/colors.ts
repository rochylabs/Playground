export type SectionColor = "blue" | "green" | "yellow" | "red" | "purple" | "orange";

export const COLOR: Record<SectionColor, {
  header: string; light: string; border: string; text: string; tag: string; btn: string;
}> = {
  blue:   { header: "bg-blue-600",   light: "bg-blue-50",   border: "border-blue-200",  text: "text-blue-800",   tag: "bg-blue-100 text-blue-700",   btn: "bg-blue-600 hover:bg-blue-700" },
  green:  { header: "bg-green-600",  light: "bg-green-50",  border: "border-green-200", text: "text-green-800",  tag: "bg-green-100 text-green-700",  btn: "bg-green-600 hover:bg-green-700" },
  yellow: { header: "bg-yellow-500", light: "bg-yellow-50", border: "border-yellow-200",text: "text-yellow-800", tag: "bg-yellow-100 text-yellow-700", btn: "bg-yellow-500 hover:bg-yellow-600" },
  red:    { header: "bg-red-600",    light: "bg-red-50",    border: "border-red-200",   text: "text-red-800",   tag: "bg-red-100 text-red-700",     btn: "bg-red-600 hover:bg-red-700" },
  purple: { header: "bg-purple-600", light: "bg-purple-50", border: "border-purple-200",text: "text-purple-800", tag: "bg-purple-100 text-purple-700", btn: "bg-purple-600 hover:bg-purple-700" },
  orange: { header: "bg-orange-500", light: "bg-orange-50", border: "border-orange-200",text: "text-orange-800", tag: "bg-orange-100 text-orange-700", btn: "bg-orange-500 hover:bg-orange-600" },
};
