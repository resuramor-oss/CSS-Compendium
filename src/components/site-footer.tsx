import Link from "next/link";
import { AnalyticsPreferences } from "./analytics";

export function SiteFooter() {
  return (
    <footer className="border-t border-outline-variant/70 bg-surface-container-low">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <p className="text-sm font-bold text-on-surface">CSS Compendium</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-on-surface-variant">
            A free reviewer for TESDA Computer Systems Servicing NC II, built by
            Grade 12 TVL-ICT students. Read the standards, review the notes, and
            practise with explained questions.
          </p>
          <p className="mt-3 text-xs leading-relaxed text-on-surface-variant/80">
            Not affiliated with TESDA. Always verify content against the current
            Training Regulations.
          </p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-on-surface-variant">
            Review
          </p>
          <ul className="mt-3 grid gap-2 text-sm text-on-surface-variant">
            <li><Link className="hover:text-primary" href="/coc/1">COC 1 — Install &amp; Configure</Link></li>
            <li><Link className="hover:text-primary" href="/coc/2">COC 2 — Networks</Link></li>
            <li><Link className="hover:text-primary" href="/coc/3">COC 3 — Servers</Link></li>
            <li><Link className="hover:text-primary" href="/coc/4">COC 4 — Maintain &amp; Repair</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-on-surface-variant">
            Site
          </p>
          <ul className="mt-3 grid gap-2 text-sm text-on-surface-variant">
            <li><Link className="hover:text-primary" href="/quiz">Practice quizzes</Link></li>
            <li><Link className="hover:text-primary" href="/exam">Mock exam</Link></li>
            <li><Link className="hover:text-primary" href="/about">Sources &amp; methodology</Link></li>
            <li><Link className="hover:text-primary" href="/privacy">Privacy</Link></li>
            <li><AnalyticsPreferences /></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-outline-variant/70 px-4 py-4 text-center text-xs text-on-surface-variant/80">
        Built for review, not for official certification. © {new Date().getFullYear()} CSS Compendium.
      </div>
    </footer>
  );
}
