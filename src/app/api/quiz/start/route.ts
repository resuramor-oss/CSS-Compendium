import { z } from "zod";
import { QUESTION_BANK, getQuestionsForCoc } from "@/content/questions";
import { getCoc } from "@/content/cocs";
import { shuffle, toPublicQuestion, type QuizMode } from "@/lib/quiz";

const schema = z.object({
  coc: z.string().optional(),
  mode: z.enum(["practice", "exam"]).default("practice"),
  count: z.number().int().min(1).max(30).optional(),
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
    return Response.json({ error: "Invalid quiz request." }, { status: 400 });
  }

  const { coc, mode, count } = parsed.data;
  if (coc && !getCoc(coc)) {
    return Response.json({ error: "Unknown COC." }, { status: 404 });
  }

  const pool = coc ? getQuestionsForCoc(coc) : QUESTION_BANK;
  if (pool.length === 0) {
    return Response.json({ error: "No questions available." }, { status: 404 });
  }

  const requested = count ?? (mode === "exam" ? 15 : 10);
  const questions = shuffle(pool)
    .slice(0, Math.min(requested, pool.length))
    .map(toPublicQuestion);

  return Response.json({
    mode: mode satisfies QuizMode,
    coc: coc ?? null,
    questions,
  });
}
