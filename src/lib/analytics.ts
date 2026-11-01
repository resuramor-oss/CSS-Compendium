"use client";

import { track } from "@vercel/analytics";
import { ANALYTICS_CONSENT_KEY } from "@/components/analytics";

export function trackEvent(name: string, data?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined") return;
  if (localStorage.getItem(ANALYTICS_CONSENT_KEY) !== "granted") return;
  track(name, data);
}
