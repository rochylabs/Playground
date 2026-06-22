"use client";

import { useRef, useState } from "react";

interface Props {
  /** Script ID matching a file in /public/audio/, e.g. "h1-1" */
  audioId?: string;
  /** Fallback TTS text (used only when audioId is not provided) */
  text?: string;
  maxPlays?: number;
}

export default function GermanAudio({ audioId, text, maxPlays }: Props) {
  const [playing, setPlaying] = useState(false);
  const [plays, setPlays]     = useState(0);
  const [error, setError]     = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const exhausted = maxPlays !== undefined && plays >= maxPlays;

  const play = () => {
    if (exhausted) return;

    if (audioId) {
      // Pre-generated file path
      const src = `/audio/${audioId}.mp3`;
      if (!audioRef.current) {
        const el = new Audio(src);
        el.onended = () => { setPlaying(false); setPlays((p) => p + 1); };
        el.onerror = () => { setError(true); setPlaying(false); fallbackTTS(); };
        audioRef.current = el;
      }
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => { setError(true); fallbackTTS(); });
      setPlaying(true);
      return;
    }

    fallbackTTS();
  };

  const fallbackTTS = () => {
    if (!text || typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang  = "de-DE";
    u.rate  = 0.85;
    u.onend = () => { setPlaying(false); setPlays((p) => p + 1); };
    window.speechSynthesis.speak(u);
    setPlaying(true);
  };

  const stop = () => {
    audioRef.current?.pause();
    window.speechSynthesis?.cancel();
    setPlaying(false);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={playing ? stop : play}
        disabled={!playing && exhausted}
        title={exhausted ? "Maximale Wiedergaben erreicht" : playing ? "Stoppen" : "Abspielen"}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
          playing
            ? "bg-green-100 border-green-400 text-green-700 animate-pulse"
            : exhausted
            ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white border-green-400 text-green-700 hover:bg-green-50"
        }`}
      >
        {playing ? <><span>⏹</span> Stopp</> : <><span>▶</span> Abspielen</>}
      </button>
      {maxPlays !== undefined && (
        <span className="text-xs text-gray-400">{plays}/{maxPlays}×</span>
      )}
      {error && (
        <span className="text-xs text-orange-500">Audio-Fehler</span>
      )}
    </div>
  );
}
