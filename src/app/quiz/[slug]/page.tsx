import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { COCS, getCoc } from "@/content/cocs";
import { QuizRunner } from "@/components/quiz-runner";

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
  if (!coc) return { title: "Quiz not found" };
  return {
    title: `COC ${coc.number} practice quiz`,
    description: `Ten random practice questions for ${coc.title}, with explanations.`,
    alternates: { canonical: `/quiz/${coc.slug}` },
  };
}

export default async function CocQuizPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const coc = getCoc(slug);
  if (!coc) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-14">
      <Link href="/quiz" className="md3-text-button -ml-2">
        <ArrowLeft className="size-4" /> All quizzes
      </Link>
      <div className="mt-6">
        <QuizRunner
          coc={coc.slug}
          mode="practice"
          title={`COC ${coc.number} practice`}
          description={`${coc.title}. Ten random questions from this competency, with instant feedback.`}
          questionCount={10}
        />
      </div>
    </div>
  );
}
