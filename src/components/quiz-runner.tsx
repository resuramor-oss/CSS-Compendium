"use client";

import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Loader2,
  RotateCcw,
  Save,
  Timer,
  Trophy,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { User } from "@supabase/supabase-js";
import type { PublicQuestion, QuestionResult, QuizMode } from "@/lib/quiz";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Phase = "intro" | "loading" | "active" | "submitting" | "done" | "error";

type CheckResponse = {
  correct: boolean;
  answerChoiceId: string;
  explanation: string;
  source?: string;
};

type SubmitResponse = {
  score: number;
  total: number;
  percentage: number;
  results: QuestionResult[];
  saved: boolean;
  attemptId: string | null;
};

type Props = {
  coc?: string;
  mode: QuizMode;
  title: string;
  description: string;
  questionCount: number;
};

const EXAM_SECONDS = 20 * 60;

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function ScoreRing({ percentage }: { percentage: number }) {
  return (
    <div
      className="relative flex size-32 items-center justify-center rounded-full"
      style={{
        background: `conic-gradient(var(--md-primary) ${percentage * 3.6}deg, var(--md-surface-container-highest) 0deg)`,
      }}
      role="img"
      aria-label={`Score: ${percentage} percent`}
    >
      <div className="flex size-[6.5rem] flex-col items-center justify-center rounded-full bg-surface-container-low">
        <span className="text-3xl font-bold tracking-tight text-on-surface">{percentage}%</span>
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-on-surface-variant">
          Score
        </span>
      </div>
    </div>
  );
}

export function QuizRunner({ coc, mode, title, description, questionCount }: Props) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [questions, setQuestions] = useState<PublicQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState<Record<string, CheckResponse>>({});
  const [result, setResult] = useState<SubmitResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(EXAM_SECONDS);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    let active = true;
    supabase.auth
      .getUser()
      .then(({ data }) => {
        if (active) setUser(data.user);
      })
      .catch(() => {
        if (active) setUser(null);
      });
    return () => {
      active = false;
    };
  }, []);

  const current = questions[index];
  const currentAnswer = current ? answers[current.id] : undefined;
  const currentRevealed = current ? revealed[current.id] : undefined;
  const answeredCount = Object.keys(answers).length;
  const isExam = mode === "exam";

  async function start() {
    setPhase("loading");
    setError(null);
    setQuestions([]);
    setAnswers({});
    setRevealed({});
    setResult(null);
    setIndex(0);
    setSecondsLeft(EXAM_SECONDS);
    try {
      const response = await fetch("/api/quiz/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coc, mode, count: questionCount }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Could not start the quiz.");
      setQuestions(data.questions);
      setStartedAt(Date.now());
      setPhase("active");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not start the quiz.");
      setPhase("error");
    }
  }

  const submit = useCallback(async () => {
    if (phase === "submitting" || phase === "done") return;
    const payloadAnswers = questions.map((question) => ({
      questionId: question.id,
      choiceId: answers[question.id] ?? null,
    }));
    if (!isExam && Object.keys(answers).length === 0) {
      setError("Answer at least one question before submitting.");
      return;
    }

    setPhase("submitting");
    setError(null);
    try {
      const response = await fetch("/api/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          coc,
          mode,
          durationSeconds: startedAt
            ? Math.max(0, Math.round((Date.now() - startedAt) / 1000))
            : undefined,
          answers: payloadAnswers,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Could not submit the quiz.");
      setResult(data);
      setPhase("done");
      trackEvent("quiz_completed", {
        coc: coc ?? "mixed",
        mode,
        score: data.score,
        total: data.total,
      });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not submit the quiz.");
      setPhase("active");
    }
  }, [answers, coc, isExam, mode, phase, questions, startedAt]);

  const submitRef = useRef<() => void>(() => {});

  useEffect(() => {
    submitRef.current = () => {
      void submit();
    };
  }, [submit]);

  useEffect(() => {
    if (phase !== "active" || !isExam) return;
    let remaining = EXAM_SECONDS;
    const timer = window.setInterval(() => {
      remaining -= 1;
      if (remaining <= 0) {
        window.clearInterval(timer);
        setSecondsLeft(0);
        submitRef.current();
        return;
      }
      setSecondsLeft(remaining);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [phase, isExam]);

  async function checkAnswer() {
    if (!current || !currentAnswer) return;
    setChecking(true);
    setError(null);
    try {
      const response = await fetch("/api/quiz/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId: current.id, choiceId: currentAnswer }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Could not check the answer.");
      setRevealed((previous) => ({ ...previous, [current.id]: data }));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not check the answer.");
    } finally {
      setChecking(false);
    }
  }

  function next() {
    if (index < questions.length - 1) {
      setIndex((value) => value + 1);
    } else {
      void submit();
    }
  }

  function reset() {
    setPhase("intro");
    setQuestions([]);
    setAnswers({});
    setRevealed({});
    setResult(null);
    setError(null);
    setIndex(0);
    setSecondsLeft(EXAM_SECONDS);
    setStartedAt(null);
  }

  if (phase === "intro" || phase === "loading" || phase === "error") {
    return (
      <div className="md3-card mx-auto max-w-2xl p-6 sm:p-8">
        <span className="md3-chip md3-chip-primary">
          {isExam ? "Mock exam" : "Quick practice"}
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-[-0.02em] text-on-surface">{title}</h1>
        <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">{description}</p>

        <ul className="mt-6 grid gap-2 text-sm text-on-surface-variant">
          <li className="flex items-center gap-2">
            <ClipboardCheck className="size-4 text-primary" />
            {questionCount} questions, randomised each attempt
          </li>
          <li className="flex items-center gap-2">
            <Check className="size-4 text-primary" />
            {isExam ? "Results and explanations after submission" : "Instant answer feedback with explanations"}
          </li>
          <li className="flex items-center gap-2">
            <Save className="size-4 text-primary" />
            {user ? "Your attempt will be saved to your dashboard" : "No account needed — sign in to save your score"}
          </li>
          {isExam ? (
            <li className="flex items-center gap-2">
              <Timer className="size-4 text-primary" />
              20-minute time limit, auto-submits when time runs out
            </li>
          ) : null}
        </ul>

        {error ? (
          <div className="mt-5 flex items-start gap-2 rounded-2xl bg-error-container p-3 text-sm text-on-error-container">
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
            <p>{error}</p>
          </div>
        ) : null}

        <div className="mt-7 flex flex-wrap gap-3">
          <button
            type="button"
            className="md3-filled-button"
            onClick={start}
            disabled={phase === "loading"}
          >
            {phase === "loading" ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Preparing questions
              </>
            ) : (
              <>
                {isExam ? "Start mock exam" : "Start practice"} <ArrowRight className="size-4" />
              </>
            )}
          </button>
          <Link href={isExam ? "/quiz" : "/quiz"} className="md3-outlined-button">
            Back to quizzes
          </Link>
        </div>
      </div>
    );
  }

  if (phase === "submitting") {
    return (
      <div className="md3-card mx-auto flex max-w-2xl flex-col items-center gap-4 p-10 text-center">
        <Loader2 className="size-8 animate-spin text-primary" />
        <h1 className="text-xl font-bold text-on-surface">Scoring your answers…</h1>
        <p className="text-sm text-on-surface-variant">
          {user ? "Saving this attempt to your dashboard." : "This attempt will not be saved."}
        </p>
      </div>
    );
  }

  if (phase === "done" && result) {
    const missed = result.total - result.score;
    return (
      <div className="mx-auto max-w-3xl">
        <div className="md3-card overflow-hidden">
          <div className="flex flex-col items-center gap-5 border-b border-outline-variant/60 bg-surface-container px-6 py-8 text-center sm:flex-row sm:text-left">
            <ScoreRing percentage={result.percentage} />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-tertiary">
                {isExam ? "Mock exam complete" : "Practice complete"}
              </p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-on-surface">
                {result.percentage >= 80
                  ? "Strong work."
                  : result.percentage >= 60
                    ? "Getting there."
                    : "Worth another pass."}
              </h1>
              <p className="mt-2 text-sm text-on-surface-variant">
                You got <strong className="text-on-surface">{result.score}</strong> of{" "}
                <strong className="text-on-surface">{result.total}</strong> correct
                {missed > 0 ? ` — ${missed} to review.` : "."}
              </p>
              <p className="mt-1 text-xs text-on-surface-variant">
                {result.saved
                  ? "Saved to your dashboard."
                  : user
                    ? "We could not save this attempt, but your results are below."
                    : "Sign in to save future attempts and track progress."}
              </p>
            </div>
          </div>

          {!user ? (
            <div className="flex flex-col gap-3 border-b border-outline-variant/60 bg-primary-container/50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-on-primary-container">
                Want to keep your score and see weak areas over time?
              </p>
              <Link href="/login?next=/dashboard" className="md3-filled-button h-10 min-h-0 px-4 text-xs">
                Create a free account
              </Link>
            </div>
          ) : null}

          <div className="grid gap-3 p-5 sm:grid-cols-3">
            <Link href={isExam ? "/exam" : `/quiz/${coc ?? ""}`} className="md3-filled-button" onClick={reset}>
              <RotateCcw className="size-4" /> Try again
            </Link>
            <Link href="/quiz" className="md3-tonal-button">
              All quizzes
            </Link>
            {user ? (
              <Link href="/dashboard" className="md3-outlined-button">
                Dashboard
              </Link>
            ) : (
              <Link href="/login" className="md3-outlined-button">
                Sign in
              </Link>
            )}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold tracking-tight text-on-surface">Review your answers</h2>
          <div className="mt-4 grid gap-3">
            {result.results.map((item, itemIndex) => {
              const selected = item.choices.find((choice) => choice.id === item.selectedChoiceId);
              const answer = item.choices.find((choice) => choice.id === item.answerChoiceId);
              return (
                <div key={item.questionId} className="md3-card p-5">
                  <div className="flex items-start gap-2">
                    <span
                      className={cn(
                        "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full",
                        item.correct
                          ? "bg-primary-container text-on-primary-container"
                          : "bg-error-container text-on-error-container",
                      )}
                    >
                      {item.correct ? <Check className="size-3.5" /> : <X className="size-3.5" />}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-on-surface-variant">
                        Question {itemIndex + 1}
                      </p>
                      <p className="mt-1 font-semibold text-on-surface">{item.prompt}</p>
                      <p className="mt-2 text-sm text-on-surface-variant">
                        Your answer:{" "}
                        <span className={item.correct ? "font-semibold text-primary" : "font-semibold text-error"}>
                          {selected?.text ?? "No answer"}
                        </span>
                      </p>
                      {!item.correct ? (
                        <p className="mt-1 text-sm text-on-surface-variant">
                          Correct answer:{" "}
                          <span className="font-semibold text-primary">{answer?.text}</span>
                        </p>
                      ) : null}
                      <p className="mt-3 rounded-xl bg-surface-container p-3 text-sm leading-relaxed text-on-surface-variant">
                        {item.explanation}
                      </p>
                      {item.source ? (
                        <p className="mt-2 text-[0.7rem] text-on-surface-variant/80">{item.source}</p>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (!current) {
    return (
      <div className="md3-card mx-auto max-w-2xl p-8 text-center">
        <AlertCircle className="mx-auto size-8 text-error" />
        <p className="mt-3 font-semibold text-on-surface">No questions loaded.</p>
        <button type="button" className="md3-filled-button mt-5" onClick={reset}>
          Go back
        </button>
      </div>
    );
  }

  const progress = ((index + 1) / questions.length) * 100;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href={isExam ? "/exam" : "/quiz"} className="md3-text-button -ml-2">
          <ArrowLeft className="size-4" /> Exit
        </Link>
        <div className="flex items-center gap-3 text-xs font-semibold text-on-surface-variant">
          <span>
            Question {index + 1} / {questions.length}
          </span>
          {isExam ? (
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-3 py-1",
                secondsLeft <= 60
                  ? "bg-error-container text-on-error-container"
                  : "bg-surface-container text-on-surface-variant",
              )}
            >
              <Timer className="size-3.5" /> {formatTime(secondsLeft)}
            </span>
          ) : null}
        </div>
      </div>

      <div className="md3-progress mt-3">
        <span style={{ width: `${progress}%` }} />
      </div>

      <div className="md3-card mt-5 p-5 sm:p-7">
        <div className="flex items-center gap-2">
          <span className="md3-chip">{coc ? `COC ${coc}` : "Mixed"}</span>
          <span className="md3-chip">{isExam ? "Exam mode" : "Practice"}</span>
        </div>
        <h2 className="mt-5 text-pretty text-xl font-bold leading-snug tracking-[-0.01em] text-on-surface sm:text-2xl">
          {current.prompt}
        </h2>

        <div className="mt-5 grid gap-2.5" role="group" aria-label="Answer choices">
          {current.choices.map((choice) => {
            const selected = currentAnswer === choice.id;
            const revealedAnswer = currentRevealed?.answerChoiceId === choice.id;
            const showCorrect = Boolean(currentRevealed) && revealedAnswer;
            const showWrong = Boolean(currentRevealed) && selected && !revealedAnswer;
            return (
              <button
                key={choice.id}
                type="button"
                disabled={Boolean(currentRevealed)}
                onClick={() =>
                  setAnswers((previous) => ({ ...previous, [current.id]: choice.id }))
                }
                className={cn(
                  "flex w-full items-start gap-3 rounded-2xl border p-3.5 text-left text-sm transition-colors",
                  selected
                    ? "border-primary bg-primary-container text-on-primary-container"
                    : "border-outline-variant bg-surface-container-lowest text-on-surface-variant hover:border-outline hover:bg-surface-container-low",
                  showCorrect && "border-primary bg-primary-container text-on-primary-container",
                  showWrong && "border-error bg-error-container text-on-error-container",
                  currentRevealed && "cursor-default",
                )}
                aria-pressed={selected}
              >
                <span
                  className={cn(
                    "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border text-[0.65rem] font-bold",
                    selected ? "border-primary bg-primary text-on-primary" : "border-outline",
                    showCorrect && "border-primary bg-primary text-on-primary",
                    showWrong && "border-error bg-error text-white",
                  )}
                >
                  {showCorrect ? (
                    <Check className="size-3.5" />
                  ) : showWrong ? (
                    <X className="size-3.5" />
                  ) : (
                    String.fromCharCode(65 + current.choices.findIndex((c) => c.id === choice.id))
                  )}
                </span>
                <span className="pt-0.5">{choice.text}</span>
              </button>
            );
          })}
        </div>

        {currentRevealed ? (
          <div
            className={cn(
              "mt-5 rounded-2xl p-4 text-sm leading-relaxed",
              currentRevealed.correct
                ? "bg-primary-container text-on-primary-container"
                : "bg-error-container text-on-error-container",
            )}
          >
            <p className="font-semibold">
              {currentRevealed.correct ? "Correct." : "Not quite."}
            </p>
            <p className="mt-1">{currentRevealed.explanation}</p>
            {currentRevealed.source ? (
              <p className="mt-2 text-xs opacity-80">{currentRevealed.source}</p>
            ) : null}
          </div>
        ) : null}

        {error ? (
          <div className="mt-4 flex items-start gap-2 rounded-2xl bg-error-container p-3 text-sm text-on-error-container">
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
            <p>{error}</p>
          </div>
        ) : null}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          {isExam ? (
            <>
              <button
                type="button"
                className="md3-outlined-button"
                disabled={index === 0}
                onClick={() => setIndex((value) => Math.max(0, value - 1))}
              >
                <ChevronLeft className="size-4" /> Previous
              </button>
              <div className="flex gap-2">
                {index < questions.length - 1 ? (
                  <button
                    type="button"
                    className="md3-filled-button"
                    onClick={() => setIndex((value) => value + 1)}
                  >
                    Next <ChevronRight className="size-4" />
                  </button>
                ) : null}
                <button
                  type="button"
                  className="md3-tonal-button"
                  onClick={() => void submit()}
                >
                  Submit exam ({answeredCount}/{questions.length})
                </button>
              </div>
            </>
          ) : (
            <>
              <span className="text-xs text-on-surface-variant">
                {currentAnswer ? "Answer selected" : "Select an answer to continue"}
              </span>
              <button
                type="button"
                className="md3-filled-button"
                disabled={!currentAnswer || checking}
                onClick={() => {
                  if (currentRevealed) {
                    next();
                  } else {
                    void checkAnswer();
                  }
                }}
              >
                {checking ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Checking
                  </>
                ) : currentRevealed ? (
                  index === questions.length - 1 ? (
                    <>
                      See results <Trophy className="size-4" />
                    </>
                  ) : (
                    <>
                      Next question <ArrowRight className="size-4" />
                    </>
                  )
                ) : (
                  <>
                    Check answer <Check className="size-4" />
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>

      {isExam ? (
        <div className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-on-surface-variant">
            Question navigator
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {questions.map((question, questionIndex) => (
              <button
                key={question.id}
                type="button"
                onClick={() => setIndex(questionIndex)}
                aria-label={`Go to question ${questionIndex + 1}`}
                aria-current={questionIndex === index ? "step" : undefined}
                className={cn(
                  "flex size-9 items-center justify-center rounded-xl border text-xs font-semibold transition-colors",
                  questionIndex === index
                    ? "border-primary bg-primary text-on-primary"
                    : answers[question.id]
                      ? "border-primary-container bg-primary-container text-on-primary-container"
                      : "border-outline-variant text-on-surface-variant hover:bg-surface-container",
                )}
              >
                {questionIndex + 1}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
