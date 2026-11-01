import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock3, ListChecks, Sparkles, Trophy } from "lucide-react";
import { COCS } from "@/content/cocs";
import { QUESTIONS_BY_COC } from "@/content/questions";

export const metadata: Metadata = {
  title: "Practice quizzes",
  description:
    "Free practice questions for each TESDA CSS NC II Certificate of Competency, with instant feedback and explanations.",
  alternates: { canonical: "/quiz" },
};

export default function QuizHubPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
      <div className="max-w-2xl">
        <span className="md3-chip md3-chip-primary">
          <ListChecks className="size-3.5" /> Practice
        </span>
        <h1 className="mt-4 text-4xl font-bold tracking-[-0.03em] text-on-surface sm:text-5xl">
          Practise by competency.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-on-surface-variant">
          Ten random questions per COC, with instant feedback and an explanation
          for every answer. No account is needed; sign in if you want to keep your
          scores.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {COCS.map((coc) => {
          const count = QUESTIONS_BY_COC[coc.slug]?.length ?? 0;
          return (
            <Link
              key={coc.slug}
              href={`/quiz/${coc.slug}`}
              className="md3-card group flex flex-col gap-4 p-6 transition-all hover:-translate-y-0.5 hover:shadow-[var(--md-elevation-3)]"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="md3-chip md3-chip-primary">COC {coc.number}</span>
                <span className="text-xs font-semibold text-on-surface-variant">
                  {count} questions in bank
                </span>
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight text-on-surface">
                  {coc.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                  {coc.tagline}
                </p>
              </div>
              <div className="mt-auto flex items-center justify-between border-t border-outline-variant/60 pt-4">
                <span className="inline-flex items-center gap-1.5 text-xs text-on-surface-variant">
                  <Clock3 className="size-3.5" /> 10 questions · instant feedback
                </span>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Start <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-6 overflow-hidden rounded-[2rem] border border-outline-variant/70 bg-surface-container-low">
        <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex items-start gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-tertiary-container text-on-tertiary-container">
              <Trophy className="size-6" />
            </span>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-on-surface">
                15-question mock exam
              </h2>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-on-surface-variant">
                Random questions from all four COCs, a 20-minute timer, and a
                full review at the end. Sign in to save the attempt.
              </p>
            </div>
          </div>
          <Link href="/exam" className="md3-filled-button shrink-0">
            Take the mock exam <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>

      <div className="mt-8 flex items-start gap-3 rounded-2xl border border-outline-variant/70 bg-surface-container-low p-4 text-sm text-on-surface-variant">
        <Sparkles className="mt-0.5 size-4 shrink-0 text-tertiary" />
        <p>
          Practice scores are a study indicator, not an official assessment
          result. TESDA certification is competency-based and is awarded through
          an accredited assessment centre.
        </p>
      </div>
    </div>
  );
}
