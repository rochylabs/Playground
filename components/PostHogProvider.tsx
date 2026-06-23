"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useCallback, useState } from "react";
import CookieBanner from "@/components/CookieBanner";

export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  const handleConsent = useCallback((state: "accepted" | "declined") => {
    if (state === "accepted" && !posthog.__loaded) {
      posthog.init("phc_oDA5w6vDeGkiv3YFsEL8urURh64QMw3ZKpJXqe2SHW2K", {
        api_host: "https://us.i.posthog.com",
        capture_pageview: true,
        capture_pageleave: true,
      });
    }
    setReady(true);
  }, []);

  return (
    <PHProvider client={posthog}>
      {children}
      <CookieBanner onConsent={handleConsent} />
    </PHProvider>
  );
}
