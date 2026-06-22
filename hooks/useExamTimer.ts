"use client";

import { useState, useEffect } from "react";

export function useExamTimer(minutes: number) {
  const [timeLeft, setTimeLeft] = useState(minutes * 60);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  const mm = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const ss = String(timeLeft % 60).padStart(2, "0");

  return {
    timeLeft,
    running,
    expired: timeLeft === 0,
    display: `${mm}:${ss}`,
    start:  () => setRunning(true),
    pause:  () => setRunning(false),
    reset:  () => { setRunning(false); setTimeLeft(minutes * 60); },
  };
}
