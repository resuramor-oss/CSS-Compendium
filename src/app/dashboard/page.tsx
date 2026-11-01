import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Database,
  Trophy,
} from "lucide-react";
import { COCS, SECTION_DEFINITIONS } from "@/content/cocs";
import { getCurrentUser } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { formatDate, percentage } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your CSS NC II review progress and quiz history.",
  robots: { index: false, follow: false },
};

type ProgressRow = { coc_slug: string; section_slug: string };
type AttemptRow = {
  id: string;
  coc_slug: string | null;
  mode: string;
  score: number;
  total: number;
  created_at: string;
};

export default async function DashboardPage() {
  if (!isSupabaseConfigured) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <div className="md3-card p-6 sm:p-8">
          <Database className="size-7 text-primary" />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-on-surface">
            Accounts are not configured yet.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
            The reviewer and quizzes work without an account. To turn on progress
            tracking, create a free Supabase project, run the migration in
            <code className="mx-1 rounded bg-surface-container px-1.5 py-0.5 font-mono text-xs">supabase/migrations</code>,
            and add the environment variables from <code className="rounded bg-surface-container px-1.5 py-0.5 font-mono text-xs">.env.example</code>.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/" className="md3-filled-button">Back to reviewer</Link>
            <Link href="/quiz" className="md3-outlined-button">Practise instead</Link>
          </div>
        </div>
      </div>
    );
  }

  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/dashboard");

  const supabase = await createSupabaseServerClient();
  const [{ data: progress }, { data: attempts }] = supabase
    ? await Promise.all([
        supabase
          .from("section_progress")
          .select("coc_slug, section_slug")
          .eq("user_id", user.id),
        supabase
          .from("quiz_attempts")
          .select("id, coc_slug, mode, score, total, created_at")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(8),
      ])
    : [{ data: [] }, { data: [] }];

  const progressRows = (progress ?? []) as ProgressRow[];
  const attemptRows = (attempts ?? []) as AttemptRow[];
  const completed = progressRows.length;
  const totalSections = COCS.length * SECTION_DEFINITIONS.length;
  const overall = percentage(completed, totalSections);
  const displayName =
    (user.user_metadata?.display_name as string | undefined) ||
    user.email?.split("@")[0] ||
    "there";
  const completedByCoc = new Map<string, number>();
  for (const row of progressRows) {
    completedByCoc.set(row.coc_slug, (completedByCoc.get(row.coc_slug) ?? 0) + 1);
  }
  const bestAttempt = attemptRows.reduce(
    (best, attempt) => (percentage(attempt.score, attempt.total) > percentage(best.score, best.total) ? attempt : best),
    attemptRows[0] ?? { score: 0, total: 0 } as AttemptRow,
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="md3-chip md3-chip-primary">Your dashboard</span>
          <h1 className="mt-3 text-3xl font-bold tracking-[-0.025em] text-on-surface sm:text-4xl">
            Welcome back, {displayName}.
          </h1>
          <p className="mt-2 text-sm text-on-surface-variant">
            Pick up where you left off, or take a quick check.
          </p>
        </div>
        <Link href="/quiz" className="md3-filled-button">
          <ClipboardCheck className="size-4" /> Practise now
        </Link>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="md3-card p-5 md:col-span-2">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-on-surface-variant">
                Overall review
              </p>
              <p className="mt-1 text-2xl font-bold tracking-tight text-on-surface">
                {completed} of {totalSections} sections
              </p>
            </div>
            <span className="text-3xl font-bold text-primary">{overall}%</span>
          </div>
          <div className="md3-progress mt-4">
            <span style={{ width: `${overall}%` }} />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {COCS.map((coc) => {
              const done = completedByCoc.get(coc.slug) ?? 0;
              return (
                <Link
                  key={coc.slug}
                  href={`/coc/${coc.slug}`}
                  className="rounded-xl bg-surface-container p-3 transition hover:bg-surface-container-high"
                >
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.06em] text-on-surface-variant">
                    COC {coc.number}
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-on-surface">
                    {done}/{SECTION_DEFINITIONS.length} done
                  </p>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="md3-card flex flex-col justify-between p-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-on-surface-variant">
              Best recent attempt
            </p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-on-surface">
                {bestAttempt.total > 0 ? percentage(bestAttempt.score, bestAttempt.total) : 0}%
              </span>
              <span className="text-xs text-on-surface-variant">
                {bestAttempt.total > 0 ? `${bestAttempt.score}/${bestAttempt.total}` : "No attempts yet"}
              </span>
            </div>
          </div>
          <div className="mt-5 flex items-center gap-2 text-xs text-on-surface-variant">
            <Trophy className="size-4 text-tertiary" />
            {attemptRows.length} recent attempt{attemptRows.length === 1 ? "" : "s"}
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {COCS.map((coc) => {
          const done = completedByCoc.get(coc.slug) ?? 0;
          const pct = percentage(done, SECTION_DEFINITIONS.length);
          return (
            <Link
              key={coc.slug}
              href={`/coc/${coc.slug}`}
              className="md3-card group p-5 transition hover:-translate-y-0.5 hover:shadow-[var(--md-elevation-2)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-on-surface-variant">
                    COC {coc.number} · {coc.unitCode}
                  </p>
                  <h2 className="mt-1 text-lg font-bold tracking-tight text-on-surface">
                    {coc.shortTitle}
                  </h2>
                </div>
                <span className="text-sm font-bold text-primary">{pct}%</span>
              </div>
              <div className="md3-progress mt-4">
                <span style={{ width: `${pct}%` }} />
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-on-surface-variant">
                <span className="inline-flex items-center gap-1">
                  <BookOpen className="size-3.5" /> {done}/{SECTION_DEFINITIONS.length} sections reviewed
                </span>
                <span className="inline-flex items-center gap-1 font-semibold text-primary">
                  Continue <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight text-on-surface">Recent attempts</h2>
          <Link href="/quiz" className="text-sm font-semibold text-primary hover:underline">
            New attempt
          </Link>
        </div>
        {attemptRows.length === 0 ? (
          <div className="mt-3 rounded-2xl border border-dashed border-outline-variant p-6 text-center text-sm text-on-surface-variant">
            No saved attempts yet. Finish a practice quiz while signed in and it
            will appear here.
          </div>
        ) : (
          <div className="mt-3 overflow-hidden rounded-2xl border border-outline-variant/70 bg-surface-container-low">
            {attemptRows.map((attempt, index) => {
              const coc = attempt.coc_slug ? COCS.find((entry) => entry.slug === attempt.coc_slug) : null;
              return (
                <div
                  key={attempt.id}
                  className={
                    index === 0
                      ? "flex items-center justify-between gap-3 px-4 py-3"
                      : "flex items-center justify-between gap-3 border-t border-outline-variant/60 px-4 py-3"
                  }
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-on-surface">
                      {attempt.mode === "exam" ? "Mock exam" : `COC ${coc?.number ?? "?"} practice`}
                    </p>
                    <p className="text-xs text-on-surface-variant">
                      {coc ? coc.shortTitle : "Mixed"} · {formatDate(attempt.created_at)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-on-surface">
                      {percentage(attempt.score, attempt.total)}%
                    </span>
                    <CheckCircle2 className="size-4 text-primary" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
