import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ClipboardCheck, Clock3, ExternalLink } from "lucide-react";
import { COCS, getCoc } from "@/content/cocs";
import { getAdjacentCocs, getSections } from "@/lib/content";
import { MdxContent } from "@/components/mdx-content";
import { SectionNav } from "@/components/section-nav";
import { SectionProgress } from "@/components/section-progress";
import { SourceList } from "@/components/source-list";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return COCS.map((coc) => ({ slug: coc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const coc = getCoc(slug);
  if (!coc) return { title: "COC not found" };
  return {
    title: `COC ${coc.number} — ${coc.title}`,
    description: coc.description,
    alternates: { canonical: `/coc/${coc.slug}` },
  };
}

export default async function CocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const coc = getCoc(slug);
  if (!coc) notFound();

  const sections = await getSections(slug);
  const { previous, next } = getAdjacentCocs(coc.slug);
  const navItems = sections.map((section) => ({
    slug: section.slug,
    title: section.title,
  }));
  const lastReviewed = sections.find((section) => section.lastReviewed)?.lastReviewed;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <SectionNav cocSlug={coc.slug} sections={navItems} variant="mobile" />

      <div className="lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-10">
        <aside className="hidden lg:block lg:pt-10">
          <SectionNav cocSlug={coc.slug} sections={navItems} variant="desktop" />
        </aside>

        <div className="min-w-0 pb-16 pt-8 lg:pt-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-on-surface-variant">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span aria-hidden>/</span>
            <span>COC {coc.number}</span>
          </nav>

          <header className="mt-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="md3-chip md3-chip-primary">COC {coc.number}</span>
              <span className="md3-chip">TESDA TR</span>
              <span className="font-mono text-xs text-on-surface-variant">{coc.unitCode}</span>
            </div>
            <h1 className="mt-4 max-w-3xl text-balance text-3xl font-bold leading-tight tracking-[-0.025em] text-on-surface sm:text-4xl">
              {coc.title}
            </h1>
            <p className="mt-3 max-w-2xl text-pretty text-base leading-relaxed text-on-surface-variant">
              {coc.description}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link href={`/quiz/${coc.slug}`} className="md3-filled-button">
                <ClipboardCheck className="size-4" /> Practise this COC
              </Link>
              <Link href="/exam" className="md3-outlined-button">
                Mock exam <ArrowRight className="size-4" />
              </Link>
              {lastReviewed ? (
                <span className="inline-flex items-center gap-1.5 text-xs text-on-surface-variant">
                  <Clock3 className="size-3.5" /> Last reviewed {formatDate(lastReviewed)}
                </span>
              ) : null}
            </div>
          </header>

          <div className="mt-10 grid gap-10">
            {sections.map((section, index) => (
              <section
                key={section.slug}
                id={section.slug}
                className="scroll-mt-32 border-t border-outline-variant/60 pt-8 first:border-t-0 first:pt-0 lg:scroll-mt-24"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-tertiary">
                      Section {String(index + 1).padStart(2, "0")}
                    </p>
                    <h2 className="mt-1 text-2xl font-bold tracking-[-0.02em] text-on-surface">
                      {section.title}
                    </h2>
                    <p className="mt-1 text-sm text-on-surface-variant">{section.description}</p>
                  </div>
                  <div className="shrink-0 pt-1">
                    <SectionProgress cocSlug={coc.slug} sectionSlug={section.slug} />
                  </div>
                </div>

                <div className="mt-5">
                  <MdxContent source={section.content} />
                </div>
                <SourceList sources={section.sources} />
              </section>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-outline-variant/70 bg-surface-container-low p-5">
            <p className="text-sm font-semibold text-on-surface">Need a second opinion?</p>
            <p className="mt-1 text-sm leading-relaxed text-on-surface-variant">
              These notes are a study aid. Check the current TESDA Training Regulations
              and ask your trainer before relying on a detail for assessment.
            </p>
            <a
              href="https://www.tesda.gov.ph/Downloadables/TR%20Computer%20Systems%20Servicing%20NC%20II%20.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              Open the official TR <ExternalLink className="size-3.5" />
            </a>
          </div>

          <nav className="mt-8 flex items-center justify-between gap-3 border-t border-outline-variant/60 pt-6">
            {previous ? (
              <Link href={`/coc/${previous.slug}`} className="md3-outlined-button">
                <ArrowLeft className="size-4" /> COC {previous.number}
              </Link>
            ) : (
              <Link href="/" className="md3-text-button">
                <ArrowLeft className="size-4" /> Home
              </Link>
            )}
            {next ? (
              <Link href={`/coc/${next.slug}`} className="md3-filled-button">
                COC {next.number} <ArrowRight className="size-4" />
              </Link>
            ) : (
              <Link href="/quiz" className="md3-filled-button">
                Practise <ArrowRight className="size-4" />
              </Link>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
