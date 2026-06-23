"use client";

import { useEffect, useState } from "react";

const CONSENT_KEY = "analytics_consent";

export type ConsentState = "accepted" | "declined" | null;

interface Props {
  onConsent: (state: "accepted" | "declined") => void;
}

export default function CookieBanner({ onConsent }: Props) {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem(CONSENT_KEY);
    return stored !== "accepted" && stored !== "declined";
  });

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY) as ConsentState;
    if (stored === "accepted" || stored === "declined") {
      onConsent(stored);
    }
  }, [onConsent]);

  const handle = (choice: "accepted" | "declined") => {
    localStorage.setItem(CONSENT_KEY, choice);
    setVisible(false);
    onConsent(choice);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-800">Diese App verwendet Cookies</p>
          <p className="text-xs text-gray-500 mt-1">
            Wir nutzen PostHog, um zu verstehen, wie die App genutzt wird und sie zu verbessern.
            Es werden keine persönlichen Daten gespeichert.{" "}
            <a
              href="https://posthog.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-700"
            >
              Datenschutz
            </a>
          </p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={() => handle("declined")}
            className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Ablehnen
          </button>
          <button
            onClick={() => handle("accepted")}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors"
          >
            Akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}
