"use client";

interface Props {
  display: string;
  running: boolean;
  expired: boolean;
  timeLeft: number;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

export default function ExamTimer({ display, running, expired, timeLeft, onStart, onPause, onReset }: Props) {
  const urgent  = timeLeft <= 120 && timeLeft > 0; // < 2 min
  const warning = timeLeft <= 300 && timeLeft > 120; // < 5 min

  const colorCls = expired
    ? "bg-red-100 border-red-400 text-red-700"
    : urgent
    ? "bg-red-50 border-red-300 text-red-600"
    : warning
    ? "bg-yellow-50 border-yellow-300 text-yellow-700"
    : "bg-gray-50 border-gray-200 text-gray-700";

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-sm font-mono font-bold transition-colors ${colorCls}`}>
      <span>{expired ? "⏰" : running ? "⏱️" : "⏸️"}</span>
      <span className={urgent && !expired ? "animate-pulse" : ""}>{display}</span>
      {expired ? (
        <span className="text-xs font-sans font-semibold ml-1">Zeit abgelaufen!</span>
      ) : running ? (
        <button onClick={onPause} className="text-xs font-sans font-medium ml-1 hover:underline">Pause</button>
      ) : (
        <button onClick={onStart} className="text-xs font-sans font-medium ml-1 hover:underline">
          {timeLeft === 0 ? "" : "Start"}
        </button>
      )}
      {!running && timeLeft > 0 && timeLeft < 9999 && (
        <button onClick={onReset} className="text-xs font-sans text-gray-400 hover:text-gray-600 ml-0.5">↺</button>
      )}
    </div>
  );
}
