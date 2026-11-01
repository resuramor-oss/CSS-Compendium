import { z } from "zod";
import { getQuestion } from "@/content/questions";
import { isCorrect } from "@/lib/quiz";

const schema = z.object({
  questionId: z.string().min(1),
  choiceId: z.string().min(1),
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
    return Response.json({ error: "Invalid answer." }, { status: 400 });
  }

  const question = getQuestion(parsed.data.questionId);
  if (!question) {
    return Response.json({ error: "Unknown question." }, { status: 404 });
  }

  return Response.json({
    correct: isCorrect(question, parsed.data.choiceId),
    answerChoiceId: String(question.answer),
    explanation: question.explanation,
    source: question.source,
  });
}
