"use client";

import { Analytics } from "@vercel/analytics/next";
import { useSyncExternalStore } from "react";

export const ANALYTICS_CONSENT_KEY = "css-compendium-analytics-consent";

type Consent = "granted" | "denied" | null;

function getConsent(): Consent {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
  return value === "granted" || value === "denied" ? value : null;
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("analytics-consent", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("analytics-consent", callback);
  };
}

function useConsent(): Consent {
  return useSyncExternalStore(subscribe, getConsent, () => null);
}

function setConsent(value: "granted" | "denied") {
  localStorage.setItem(ANALYTICS_CONSENT_KEY, value);
  window.dispatchEvent(new Event("analytics-consent"));
}

export function AnalyticsGate() {
  const consent = useConsent();
  if (consent !== "granted") return null;
  return <Analytics />;
}

export function AnalyticsConsent() {
  const consent = useConsent();
  if (consent !== null) return null;

  return (
    <div
      role="dialog"
      aria-label="Analytics consent"
      className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-[1.75rem] border border-outline-variant bg-surface-container p-4 shadow-[var(--md-elevation-3)] sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="text-sm leading-relaxed text-on-surface-variant">
          <p className="font-semibold text-on-surface">Help improve this reviewer</p>
          <p className="mt-1">
            Allow privacy-friendly, aggregate analytics? We count page views and
            quiz completions only — no names, emails, or advertising trackers.
            You can change this later in the footer.
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            className="md3-outlined-button"
            onClick={() => setConsent("denied")}
          >
            No thanks
          </button>
          <button
            type="button"
            className="md3-filled-button"
            onClick={() => setConsent("granted")}
          >
            Allow analytics
          </button>
        </div>
      </div>
    </div>
  );
}

export function AnalyticsPreferences() {
  const consent = useConsent();
  const enabled = consent === "granted";

  return (
    <button
      type="button"
      className="text-left text-sm text-on-surface-variant underline decoration-outline underline-offset-4 hover:text-primary"
      onClick={() => setConsent(enabled ? "denied" : "granted")}
    >
      Analytics: {enabled ? "on" : "off"}
    </button>
  );
}
