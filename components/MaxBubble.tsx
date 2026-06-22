interface Props {
  correct: boolean;
  message: string;
  className?: string;
}

export default function MaxBubble({ correct, message, className = "" }: Props) {
  return (
    <div
      className={`flex items-start gap-2 rounded-lg px-3 py-2.5 text-xs mt-2 ${
        correct
          ? "bg-green-50 border border-green-200 text-green-800"
          : "bg-orange-50 border border-orange-200 text-orange-800"
      } ${className}`}
    >
      <span className="text-base flex-shrink-0" role="img" aria-label="Twixie">
        🐶
      </span>
      <div>
        <span className="font-semibold">Twixie: </span>
        {message}
      </div>
    </div>
  );
}
