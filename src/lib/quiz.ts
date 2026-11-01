export type Question = {
  id: string;
  coc: string;
  prompt: string;
  choices: string[];
  answer: number;
  explanation: string;
  source?: string;
};

export type PublicQuestion = {
  id: string;
  coc: string;
  prompt: string;
  choices: { id: string; text: string }[];
};

export type AnswerInput = {
  questionId: string;
  choiceId: string | null;
};

export type QuestionResult = {
  questionId: string;
  prompt: string;
  choices: { id: string; text: string }[];
  selectedChoiceId: string | null;
  answerChoiceId: string;
  correct: boolean;
  explanation: string;
  source?: string;
};

export type QuizMode = "practice" | "exam";

export function shuffle<T>(items: readonly T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function toPublicQuestion(question: Question): PublicQuestion {
  return {
    id: question.id,
    coc: question.coc,
    prompt: question.prompt,
    choices: shuffle(
      question.choices.map((text, index) => ({ id: String(index), text })),
    ),
  };
}

export function isCorrect(question: Question, choiceId: string) {
  return Number(choiceId) === question.answer;
}

export function toResult(
  question: Question,
  choiceId: string | null,
): QuestionResult {
  return {
    questionId: question.id,
    prompt: question.prompt,
    choices: question.choices.map((text, index) => ({
      id: String(index),
      text,
    })),
    selectedChoiceId: choiceId,
    answerChoiceId: String(question.answer),
    correct: choiceId !== null && isCorrect(question, choiceId),
    explanation: question.explanation,
    source: question.source,
  };
}
