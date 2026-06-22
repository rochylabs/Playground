"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";

const RATINGS = [
  { emoji: "😍", label: "Excellent" },
  { emoji: "😊", label: "Good" },
  { emoji: "😐", label: "OK" },
  { emoji: "😞", label: "Poor" },
];

type Step = "closed" | "form" | "thanks";

export default function FeedbackButton() {
  const pathname = usePathname();
  const [step, setStep]       = useState<Step>("closed");
  const [rating, setRating]   = useState<string | null>(null);
  const [comment, setComment] = useState("");

  const submit = () => {
    if (!rating) return;
    posthog.capture("user_feedback", {
      rating,
      comment: comment.trim() || null,
      page: pathname,
    });
    setStep("thanks");
    setTimeout(() => {
      setStep("closed");
      setRating(null);
      setComment("");
    }, 3000);
  };

  return (
    <>
      {/* Floating button */}
      {step === "closed" && (
        <button
          onClick={() => setStep("form")}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-lg transition-all hover:scale-105"
        >
          💬 Feedback
        </button>
      )}

      {/* Modal */}
      {(step === "form" || step === "thanks") && (
        <div className="fixed bottom-6 right-6 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">🐶</span>
              <span className="text-white font-semibold text-sm">Twixie wants your feedback!</span>
            </div>
            <button
              onClick={() => { setStep("closed"); setRating(null); setComment(""); }}
              className="text-white/70 hover:text-white text-lg leading-none"
            >
              ×
            </button>
          </div>

          {step === "thanks" ? (
            <div className="px-5 py-8 text-center">
              <div className="text-4xl mb-3">🎉</div>
              <p className="font-bold text-gray-800">Danke schön!</p>
              <p className="text-sm text-gray-500 mt-1">Thank you for helping us improve!</p>
            </div>
          ) : (
            <div className="px-4 py-4 space-y-4">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                  How was your experience?
                </p>
                <div className="flex gap-2 justify-between">
                  {RATINGS.map((r) => (
                    <button
                      key={r.label}
                      onClick={() => setRating(r.label)}
                      title={r.label}
                      className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-xl border text-xs font-medium transition-all ${
                        rating === r.label
                          ? "bg-blue-50 border-blue-400 text-blue-700 scale-105"
                          : "border-gray-200 text-gray-500 hover:border-blue-300 hover:bg-blue-50"
                      }`}
                    >
                      <span className="text-xl">{r.emoji}</span>
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                  Tell us more <span className="font-normal normal-case">(optional)</span>
                </p>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="What can we improve? What did you love?"
                  rows={3}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                />
              </div>

              <button
                onClick={submit}
                disabled={!rating}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors"
              >
                Send Feedback →
              </button>

              <p className="text-xs text-gray-400 text-center">
                Your feedback is logged anonymously to help us improve.
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
