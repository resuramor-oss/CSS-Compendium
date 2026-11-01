import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { QuizRunner } from "@/components/quiz-runner";

export const metadata: Metadata = {
  title: "CSS NC II mock exam",
  description:
    "A 15-question, 20-minute mock exam covering all four TESDA CSS NC II Certificates of Competency.",
  alternates: { canonical: "/exam" },
};

export default function ExamPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-14">
      <Link href="/quiz" className="md3-text-button -ml-2">
        <ArrowLeft className="size-4" /> All quizzes
      </Link>
      <div className="mt-6">
        <QuizRunner
          mode="exam"
          title="CSS NC II mock exam"
          description="Fifteen random questions drawn from all four Certificates of Competency, with a 20-minute timer and a full answer review."
          questionCount={15}
        />
      </div>
    </div>
  );
}
