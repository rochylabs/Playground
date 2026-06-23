"use client";

import { useState, useEffect } from "react";

export function useExamTimer(minutes: number, autoStart = false) {
  const [timeLeft, setTimeLeft] = useState(minutes * 60);
  const [running, setRunning] = useState(autoStart);

  useEffect(() => {
    if (!running || timeLeft === 0) return;
    const id = setInterval(() => {
      setTimeLeft((t) => Math.max(0, t - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [running, timeLeft]);

  const mm = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const ss = String(timeLeft % 60).padStart(2, "0");

  return {
    timeLeft,
    running,
    expired: timeLeft === 0,
    display: `${mm}:${ss}`,
    start:  () => setRunning(true),
    pause:  () => setRunning(false),
    reset:  () => { setRunning(autoStart); setTimeLeft(minutes * 60); },
  };
}
