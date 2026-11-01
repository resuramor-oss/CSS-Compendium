import type { Metadata } from "next";
import Link from "next/link";
import { AnalyticsPreferences } from "@/components/analytics";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "What CSS Compendium stores, why it stores it, and how to control analytics.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
      <span className="md3-chip">Privacy</span>
      <h1 className="mt-4 text-4xl font-bold tracking-[-0.03em] text-on-surface">
        Short version: study data only.
      </h1>
      <p className="mt-4 text-base leading-relaxed text-on-surface-variant">
        Reading the reviewer and taking a quick quiz do not require an account.
        If you create an account, we store the minimum needed to remember your
        progress.
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-on-surface">What we store</h2>
        <ul className="mt-3 grid gap-2 text-sm leading-relaxed text-on-surface-variant">
          <li><strong className="text-on-surface">Account:</strong> email address, display name, and hashed password (or Google identity).</li>
          <li><strong className="text-on-surface">Progress:</strong> which sections you marked reviewed, and when.</li>
          <li><strong className="text-on-surface">Quiz attempts:</strong> mode, COC, score, timing, and which answers were correct.</li>
          <li><strong className="text-on-surface">Analytics (optional):</strong> aggregate page views and quiz-completion counts, only if you opt in.</li>
        </ul>
        <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
          We do not store your real name, address, school ID, phone number, or
          payment details. We do not sell data or run advertising trackers.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold text-on-surface">Who processes it</h2>
        <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
          Authentication and the database are hosted by Supabase. The site is
          deployed on Vercel. Optional aggregate analytics are provided by Vercel
          Analytics. These providers process data on our behalf under their own
          terms and security practices.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold text-on-surface">Your choices</h2>
        <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
          You can use the reviewer without an account. You can request deletion
          of your account and its progress by{" "}
          <a
            href="https://github.com/resuramor-oss/CSS-Compendium/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            opening an issue
          </a>
          . You can turn analytics on or off at any time:
        </p>
        <div className="mt-3 rounded-2xl border border-outline-variant/70 bg-surface-container-low p-4">
          <AnalyticsPreferences />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold text-on-surface">Students and research</h2>
        <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
          This is a student research project. Any reporting uses aggregate,
          de-identified counts. We do not publish individual scores, emails, or
          names. If your school requires consent for participation in research,
          follow that process before creating an account for the study.
        </p>
      </section>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/" className="md3-filled-button">Back to reviewer</Link>
        <Link href="/about" className="md3-outlined-button">Sources &amp; methodology</Link>
      </div>
    </div>
  );
}
