import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, FileText, ShieldCheck, Wrench } from "lucide-react";
import { COCS } from "@/content/cocs";
import { QUESTION_BANK } from "@/content/questions";

export const metadata: Metadata = {
  title: "Sources & methodology",
  description:
    "How CSS Compendium sources, structures, and reviews its TESDA CSS NC II content.",
  alternates: { canonical: "/about" },
};

const SOURCES = [
  {
    label: "TESDA Training Regulations — Computer Systems Servicing NC II (Amended December 2013)",
    url: "https://www.tesda.gov.ph/Downloadables/TR%20Computer%20Systems%20Servicing%20NC%20II%20.pdf",
  },
  {
    label: "COC 1 Self-Assessment Guide",
    url: "https://www.tesda.gov.ph/Downloadables/SAGs/COC1.SELF%20ASSESSMENT%20GUIDE(SAG).pdf",
  },
  {
    label: "COC 2 Self-Assessment Guide",
    url: "https://www.tesda.gov.ph/Downloadables/SAGs/COC2.SELF%20ASSESSMENT%20GUIDE%20(SAG).pdf",
  },
  {
    label: "COC 3 Self-Assessment Guide",
    url: "https://www.tesda.gov.ph/Downloadables/SAGs/COC3.SELF%20ASSESSMENT%20GUIDE%20(SAG).pdf",
  },
  {
    label: "COC 4 Self-Assessment Guide",
    url: "https://www.tesda.gov.ph/Downloadables/SAGs/COC4.SELF%20ASSESSMENT%20GUIDE%20(SAG).pdf",
  },
  {
    label: "TESDA e-TESDA Computer Systems Servicing NC II modules",
    url: "https://e-tesda.gov.ph/course/index.php?categoryid=16",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
      <span className="md3-chip md3-chip-primary">About</span>
      <h1 className="mt-4 text-4xl font-bold tracking-[-0.03em] text-on-surface">
        Sources, scope, and honest limits.
      </h1>
      <p className="mt-4 text-base leading-relaxed text-on-surface-variant">
        CSS Compendium is a free study aid for the TESDA Computer Systems Servicing
        NC II qualification. It is not an official TESDA product, and it does not
        replace your trainer, the Training Regulations, or an accredited assessment.
      </p>

      <section className="mt-10">
        <h2 className="flex items-center gap-2 text-xl font-bold text-on-surface">
          <FileText className="size-5 text-primary" /> Where the content comes from
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
          The competency standards, elements, performance criteria, range of
          variables, tools, and assessment methods are based on the official
          Training Regulations and the COC Self-Assessment Guides. The notes,
          procedures, and practice questions are written for review: they
          paraphrase the standards and add explanations, but they do not invent
          new official criteria.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
          Where a section relies on a source, the source is listed at the bottom of
          that section. If a detail matters for your assessment, open the TR and
          confirm it.
        </p>
        <ul className="mt-4 grid gap-2">
          {SOURCES.map((source) => (
            <li key={source.url}>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-start gap-2 text-sm text-primary hover:underline"
              >
                <ExternalLink className="mt-0.5 size-3.5 shrink-0" />
                {source.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="flex items-center gap-2 text-xl font-bold text-on-surface">
          <Wrench className="size-5 text-primary" /> How the reviewer is built
        </h2>
        <div className="mt-3 grid gap-3">
          {COCS.map((coc) => (
            <div key={coc.slug} className="rounded-2xl border border-outline-variant/70 bg-surface-container-low p-4">
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-on-surface-variant">
                COC {coc.number} · {coc.unitCode}
              </p>
              <p className="mt-1 font-semibold text-on-surface">{coc.title}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm leading-relaxed text-on-surface-variant">
          Each COC has six sections: overview, competency standards, quick-recall
          notes, procedures, tools and materials, and common mistakes. The current
          question bank contains {QUESTION_BANK.length} explained multiple-choice
          questions.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="flex items-center gap-2 text-xl font-bold text-on-surface">
          <ShieldCheck className="size-5 text-primary" /> Review status and corrections
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
          Content is checked against the official documents and marked with a
          “last reviewed” date. This is a student-built reviewer, so errors can
          still slip through. If you find one,{" "}
          <a
            href="https://github.com/resuramor-oss/CSS-Compendium/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            open an issue
          </a>{" "}
          with the COC, section, and the source that contradicts it.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
          Practice scores are not official results. TESDA certification is
          competency-based and is awarded by an accredited assessment centre after
          a practical assessment.
        </p>
      </section>

      <div className="mt-10 rounded-2xl bg-surface-container p-5 text-sm leading-relaxed text-on-surface-variant">
        <p>
          <strong className="text-on-surface">A note on reuse.</strong> TESDA
          documents are government materials. This site paraphrases and cites them
          for non-commercial study. If you reuse this reviewer, keep the citations
          and the “not affiliated with TESDA” disclaimer.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="md3-filled-button">Start reviewing</Link>
        <Link href="/quiz" className="md3-outlined-button">Try a quiz</Link>
      </div>
    </div>
  );
}
