import type { Question } from "@/lib/quiz";
import { coc1Questions } from "./coc-1";
import { coc2Questions } from "./coc-2";
import { coc3Questions } from "./coc-3";
import { coc4Questions } from "./coc-4";

export const QUESTION_BANK: Question[] = [
  ...coc1Questions,
  ...coc2Questions,
  ...coc3Questions,
  ...coc4Questions,
];

export const QUESTIONS_BY_COC: Record<string, Question[]> = {
  "1": coc1Questions,
  "2": coc2Questions,
  "3": coc3Questions,
  "4": coc4Questions,
};

export function getQuestion(id: string): Question | undefined {
  return QUESTION_BANK.find((question) => question.id === id);
}

export function getQuestionsForCoc(coc: string): Question[] {
  return QUESTIONS_BY_COC[coc] ?? [];
}
