import { z } from "zod";
import { getQuestion } from "@/content/questions";
import { getCoc } from "@/content/cocs";
import { toResult } from "@/lib/quiz";
import { createSupabaseServerClient, getCurrentUser } from "@/lib/supabase/server";

const schema = z.object({
  coc: z.string().optional(),
  mode: z.enum(["practice", "exam"]),
  durationSeconds: z.number().int().min(0).max(60 * 60).optional(),
  answers: z
    .array(
      z.object({
        questionId: z.string().min(1),
        choiceId: z.string().min(1).nullable(),
      }),
    )
    .min(1)
    .max(50),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Invalid quiz submission." }, { status: 400 });
  }

  const { coc, mode, durationSeconds, answers } = parsed.data;
  if (coc && !getCoc(coc)) {
    return Response.json({ error: "Unknown COC." }, { status: 404 });
  }

  const seen = new Set<string>();
  const results = [];
  for (const answer of answers) {
    if (seen.has(answer.questionId)) continue;
    seen.add(answer.questionId);
    const question = getQuestion(answer.questionId);
    if (!question) continue;
    if (coc && question.coc !== coc) continue;
    results.push(toResult(question, answer.choiceId));
  }

  if (results.length === 0) {
    return Response.json({ error: "No valid answers." }, { status: 400 });
  }

  const score = results.filter((result) => result.correct).length;
  const total = results.length;
  const user = await getCurrentUser();
  let saved = false;
  let attemptId: string | null = null;

  if (user) {
    const supabase = await createSupabaseServerClient();
    if (supabase) {
      const { data: attempt, error } = await supabase
        .from("quiz_attempts")
        .insert({
          user_id: user.id,
          coc_slug: coc ?? null,
          mode,
          score,
          total,
          duration_seconds: durationSeconds ?? null,
        })
        .select("id")
        .single();

      if (!error && attempt) {
        saved = true;
        attemptId = attempt.id;
        await supabase.from("attempt_answers").insert(
          results.map((result) => ({
            attempt_id: attempt.id,
            question_id: result.questionId,
            choice_id: result.selectedChoiceId,
            is_correct: result.correct,
          })),
        );
      }
    }
  }

  return Response.json({
    score,
    total,
    percentage: Math.round((score / total) * 100),
    results,
    saved,
    attemptId,
  });
}
