"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useCallback } from "react";
import CookieBanner from "@/components/CookieBanner";

export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  const handleConsent = useCallback((state: "accepted" | "declined") => {
    if (state === "accepted" && !posthog.__loaded) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
        capture_pageview: true,
        capture_pageleave: true,
      });
    }
  }, []);

  return (
    <PHProvider client={posthog}>
      {children}
      <CookieBanner onConsent={handleConsent} />
    </PHProvider>
  );
}
