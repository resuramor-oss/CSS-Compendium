import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { COCS, SECTION_DEFINITIONS } from "../src/content/cocs";
import { QUESTION_BANK } from "../src/content/questions";

const root = process.cwd();
const errors: string[] = [];
const warnings: string[] = [];
const ids = new Set<string>();

for (const coc of COCS) {
  const dir = path.join(root, "src", "content", coc.dir);
  for (const section of SECTION_DEFINITIONS) {
    const filename = path.join(dir, `${section.slug}.mdx`);
    if (!fs.existsSync(filename)) {
      errors.push(`Missing section: ${coc.dir}/${section.slug}.mdx`);
      continue;
    }
    const { data, content } = matter(fs.readFileSync(filename, "utf8"));
    if (!content.trim()) {
      errors.push(`Empty section: ${coc.dir}/${section.slug}.mdx`);
    }
    if (!Array.isArray(data.sources) || data.sources.length === 0) {
      warnings.push(`No sources listed: ${coc.dir}/${section.slug}.mdx`);
    }
    if (!data.lastReviewed) {
      warnings.push(`No lastReviewed date: ${coc.dir}/${section.slug}.mdx`);
    }
  }
}

for (const question of QUESTION_BANK) {
  if (ids.has(question.id)) {
    errors.push(`Duplicate question id: ${question.id}`);
  }
  ids.add(question.id);
  if (!COCS.some((coc) => coc.slug === question.coc)) {
    errors.push(`Question ${question.id} has unknown COC: ${question.coc}`);
  }
  if (question.choices.length < 2 || question.choices.length > 5) {
    errors.push(`Question ${question.id} must have 2–5 choices.`);
  }
  if (question.answer < 0 || question.answer >= question.choices.length) {
    errors.push(`Question ${question.id} has an out-of-range answer index.`);
  }
  if (new Set(question.choices).size !== question.choices.length) {
    errors.push(`Question ${question.id} has duplicate choice text.`);
  }
  if (question.explanation.trim().length < 20) {
    errors.push(`Question ${question.id} needs a useful explanation.`);
  }
  if (!question.source) {
    warnings.push(`Question ${question.id} has no source.`);
  }
}

for (const coc of COCS) {
  const count = QUESTION_BANK.filter((question) => question.coc === coc.slug).length;
  if (count < 15) {
    errors.push(`COC ${coc.slug} has only ${count} questions; at least 15 are required.`);
  }
  console.log(`COC ${coc.number}: ${count} questions, ${SECTION_DEFINITIONS.length} sections`);
}

for (const warning of warnings) console.warn(`warning: ${warning}`);
for (const error of errors) console.error(`error: ${error}`);

if (errors.length > 0) {
  console.error(`\n${errors.length} content error(s).`);
  process.exit(1);
}

console.log(`\nContent OK — ${QUESTION_BANK.length} questions across ${COCS.length} COCs.`);
