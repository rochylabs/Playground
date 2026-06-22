"use client";

import { useEffect, useState } from "react";

export default function VoicesDebugPage() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [testVoice, setTestVoice] = useState<number | null>(null);

  const FEMALE_NAME_KW = ["anna", "petra", "female", "woman", "helena", "marie"];
  const MALE_NAME_KW   = ["markus", "yannick", "male", "man", "thomas", "daniel", "stefan"];

  const pickedFemale = voices.find(v => v.lang.startsWith("de") && FEMALE_NAME_KW.some(k => v.name.toLowerCase().includes(k))) ?? voices.find(v => v.lang.startsWith("de")) ?? null;
  const pickedMale   = voices.find(v => v.lang.startsWith("de") && MALE_NAME_KW.some(k => v.name.toLowerCase().includes(k)))
    ?? voices.find(v => v.lang.startsWith("de-AT") || v.lang.startsWith("de-CH"))
    ?? voices.find(v => v.lang.startsWith("en-GB"))
    ?? voices.find(v => v.lang.startsWith("en"))
    ?? null;

  useEffect(() => {
    const load = () => setVoices(window.speechSynthesis.getVoices());
    if (window.speechSynthesis.getVoices().length > 0) load();
    else window.speechSynthesis.addEventListener("voiceschanged", load);
  }, []);

  const test = (idx: number, pitch: number, rate: number) => {
    window.speechSynthesis.cancel();
    setTestVoice(idx);
    const u = new SpeechSynthesisUtterance("Guten Tag, ich bin eine Teststimme. Wie klingt das?");
    u.voice = voices[idx];
    u.pitch = pitch;
    u.rate  = rate;
    u.onend = () => setTestVoice(null);
    window.speechSynthesis.speak(u);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-xl font-bold mb-1">Available Voices (Debug)</h1>
      <p className="text-sm text-gray-500 mb-4">
        {voices.length} voices found. Click any to hear it say a test sentence in German.
      </p>
      {voices.length > 0 && (
        <div className="mb-6 p-4 rounded-lg bg-blue-50 border border-blue-200 text-sm space-y-1">
          <p><span className="font-semibold text-pink-600">Female voice picked:</span> {pickedFemale?.name ?? "none"} ({pickedFemale?.lang})</p>
          <p><span className="font-semibold text-blue-600">Male voice picked:</span> {pickedMale?.name ?? "none"} ({pickedMale?.lang})</p>
          {pickedFemale === pickedMale && <p className="text-orange-600 font-semibold">⚠ Same voice for both — will use extreme pitch (0.4 / 1.7)</p>}
          {pickedFemale !== pickedMale && pickedMale && !pickedMale.lang.startsWith("de") && <p className="text-green-700">✓ Male speaker will use {pickedMale.lang} voice (foreign accent makes it distinguishable)</p>}
        </div>
      )}
      <div className="space-y-2">
        {voices.map((v, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
            <span className="w-6 text-xs text-gray-400 text-right">{i}</span>
            <div className="flex-1">
              <span className="font-semibold text-sm">{v.name}</span>
              <span className="text-xs text-gray-500 ml-2">{v.lang}</span>
              {v.localService && <span className="text-xs text-blue-500 ml-2">(local)</span>}
            </div>
            <button
              onClick={() => test(i, 1.0, 0.85)}
              disabled={testVoice !== null}
              className="text-xs px-3 py-1 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-40"
            >
              {testVoice === i ? "Playing…" : "▶ Normal"}
            </button>
            <button
              onClick={() => test(i, 0.4, 0.78)}
              disabled={testVoice !== null}
              className="text-xs px-3 py-1 rounded-full border border-blue-300 text-blue-600 hover:bg-blue-50 disabled:opacity-40"
            >
              {testVoice === i ? "Playing…" : "▶ Deep"}
            </button>
            <button
              onClick={() => test(i, 1.7, 0.92)}
              disabled={testVoice !== null}
              className="text-xs px-3 py-1 rounded-full border border-pink-300 text-pink-600 hover:bg-pink-50 disabled:opacity-40"
            >
              {testVoice === i ? "Playing…" : "▶ High"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
