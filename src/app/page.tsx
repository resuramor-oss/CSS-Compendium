import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  LineChart,
  Server,
  ShieldCheck,
  Sparkles,
  Wifi,
  Wrench,
} from "lucide-react";
import { COCS } from "@/content/cocs";
import { QUESTION_BANK } from "@/content/questions";

const ICONS = {
  "1": BookOpen,
  "2": Wifi,
  "3": Server,
  "4": Wrench,
} as const;

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      <section className="relative border-b border-outline-variant/60">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-70"
          style={{
            background:
              "radial-gradient(60rem 28rem at 15% -10%, var(--md-primary-container), transparent 60%), radial-gradient(40rem 24rem at 100% 0%, var(--md-tertiary-container), transparent 55%)",
          }}
        />
        <div className="mx-auto grid max-w-6xl gap-12 px-4 pb-16 pt-14 sm:px-6 md:pb-24 md:pt-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <span className="md3-chip md3-chip-tertiary">
              <Sparkles className="size-3.5" /> TESDA · CSS NC II
            </span>
            <h1 className="mt-5 max-w-2xl text-balance text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-on-surface sm:text-5xl md:text-6xl">
              Review smarter for{" "}
              <span className="text-primary">CSS NC II.</span>
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-on-surface-variant sm:text-lg">
              Competency standards, quick-recall notes, procedures, and explained
              practice questions for all four Certificates of Competency — free,
              mobile-friendly, and built from official TESDA sources.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/coc/1" className="md3-filled-button">
                Start with COC 1 <ArrowRight className="size-4" />
              </Link>
              <Link href="/quiz" className="md3-tonal-button">
                Take a quick quiz
              </Link>
            </div>
            <dl className="mt-9 grid max-w-lg grid-cols-3 gap-3">
              {[
                { value: "4", label: "COCs covered" },
                { value: String(QUESTION_BANK.length), label: "Explained questions" },
                { value: "100%", label: "Free to use" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-outline-variant/70 bg-surface-container-low/80 px-4 py-3"
                >
                  <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-on-surface-variant">
                    {stat.label}
                  </dt>
                  <dd className="mt-1 text-2xl font-bold tracking-tight text-on-surface">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="absolute -left-3 -top-3 hidden rounded-2xl bg-tertiary-container px-4 py-2 text-xs font-bold text-on-tertiary-container shadow-[var(--md-elevation-2)] sm:block">
              Built for review
            </div>
            <div className="md3-card overflow-hidden">
              <div className="flex items-center justify-between border-b border-outline-variant/70 bg-surface-container px-5 py-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-on-surface-variant">
                    Your review path
                  </p>
                  <p className="mt-0.5 text-sm font-bold text-on-surface">
                    Four competencies, one qualification
                  </p>
                </div>
                <GraduationCap className="size-6 text-primary" />
              </div>
              <div className="divide-y divide-outline-variant/60">
                {COCS.map((coc) => {
                  const Icon = ICONS[coc.slug];
                  return (
                    <Link
                      key={coc.slug}
                      href={`/coc/${coc.slug}`}
                      className="group flex items-center gap-3 px-5 py-4 transition-colors hover:bg-surface-container-low"
                    >
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-container text-on-primary-container">
                        <Icon className="size-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs font-semibold text-on-surface-variant">
                          COC {coc.number} · {coc.unitCode}
                        </span>
                        <span className="block truncate text-sm font-semibold text-on-surface">
                          {coc.shortTitle}
                        </span>
                      </span>
                      <ArrowRight className="size-4 shrink-0 text-on-surface-variant transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="cocs" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-tertiary">
              Choose a competency
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-[-0.02em] text-on-surface sm:text-4xl">
              What do you want to review?
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-on-surface-variant">
            Each COC page follows the same structure: standards, notes, procedures,
            tools, and common mistakes.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {COCS.map((coc) => {
            const Icon = ICONS[coc.slug];
            return (
              <Link
                key={coc.slug}
                href={`/coc/${coc.slug}`}
                className="md3-card group relative flex flex-col gap-4 overflow-hidden p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[var(--md-elevation-3)] sm:p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-primary-container text-on-primary-container">
                    <Icon className="size-6" />
                  </span>
                  <span className="md3-chip">COC {coc.number}</span>
                </div>
                <div>
                  <h3 className="text-pretty text-xl font-bold tracking-tight text-on-surface">
                    {coc.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                    {coc.description}
                  </p>
                </div>
                <div className="mt-auto flex items-center justify-between gap-3 pt-1">
                  <span className="font-mono text-xs font-medium text-on-surface-variant">
                    {coc.unitCode}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Review COC {coc.number}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-y border-outline-variant/60 bg-surface-container-low">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-tertiary">
              Why this reviewer
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-[-0.02em] text-on-surface sm:text-4xl">
              Built to be studied, not skimmed.
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                title: "Source-based",
                body: "Standards and procedures are anchored to the official TESDA Training Regulations and Self-Assessment Guides, with citations on every section.",
              },
              {
                icon: CheckCircle2,
                title: "Practice that explains",
                body: "Every question has an answer and a short explanation, so a wrong answer becomes a review point instead of a dead end.",
              },
              {
                icon: LineChart,
                title: "Progress that sticks",
                body: "Sign in to mark sections reviewed, keep quiz history, and see which COCs need more attention before assessment.",
              },
            ].map((feature) => (
              <div key={feature.title} className="md3-card-filled p-6">
                <feature.icon className="size-6 text-primary" />
                <h3 className="mt-4 text-lg font-bold text-on-surface">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                  {feature.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="relative overflow-hidden rounded-[2rem] bg-inverse-surface px-6 py-10 text-inverse-on-surface sm:px-10">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(30rem 16rem at 90% 0%, var(--md-primary), transparent 60%)",
            }}
          />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Ready for a quick check?
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed opacity-80">
                Ten random questions, instant feedback, no account needed. Sign in
                only if you want to keep your score.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/quiz"
                className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white/90"
              >
                Start practising
              </Link>
              <Link
                href="/about"
                className="rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                How content is sourced
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
