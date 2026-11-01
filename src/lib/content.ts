import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import {
  COCS,
  SECTION_DEFINITIONS,
  type Coc,
  type CocSlug,
  type SectionDefinition,
  type SectionSlug,
  getCoc,
} from "@/content/cocs";

const CONTENT_ROOT = path.join(process.cwd(), "src", "content");

export type SourceRef = {
  label: string;
  url?: string;
  note?: string;
};

export type Section = {
  coc: Coc;
  slug: SectionSlug;
  title: string;
  description: string;
  summary?: string;
  sources: SourceRef[];
  lastReviewed?: string;
  content: string;
};

function normaliseSources(value: unknown): SourceRef[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((entry) => {
    if (!entry || typeof entry !== "object") return [];
    const record = entry as Record<string, unknown>;
    if (typeof record.label !== "string") return [];
    return [
      {
        label: record.label,
        url: typeof record.url === "string" ? record.url : undefined,
        note: typeof record.note === "string" ? record.note : undefined,
      },
    ];
  });
}

export async function getSection(
  cocSlug: string,
  sectionSlug: string,
): Promise<Section | null> {
  const coc = getCoc(cocSlug);
  const definition = SECTION_DEFINITIONS.find(
    (section) => section.slug === sectionSlug,
  );
  if (!coc || !definition) return null;

  const filename = path.join(CONTENT_ROOT, coc.dir, `${sectionSlug}.mdx`);
  let raw: string;
  try {
    raw = await fs.readFile(filename, "utf8");
  } catch {
    return null;
  }

  const { data, content } = matter(raw);
  return {
    coc,
    slug: definition.slug,
    title: typeof data.title === "string" ? data.title : definition.title,
    description:
      typeof data.description === "string"
        ? data.description
        : definition.description,
    summary: typeof data.summary === "string" ? data.summary : undefined,
    sources: normaliseSources(data.sources),
    lastReviewed:
      typeof data.lastReviewed === "string" ? data.lastReviewed : undefined,
    content,
  };
}

export async function getSections(cocSlug: string): Promise<Section[]> {
  const sections = await Promise.all(
    SECTION_DEFINITIONS.map((definition) =>
      getSection(cocSlug, definition.slug),
    ),
  );
  return sections.filter((section): section is Section => section !== null);
}

export async function getAllSections(): Promise<Section[]> {
  const groups = await Promise.all(COCS.map((coc) => getSections(coc.slug)));
  return groups.flat();
}

export function getSectionDefinition(
  slug: string,
): SectionDefinition | undefined {
  return SECTION_DEFINITIONS.find((section) => section.slug === slug);
}

export function getAdjacentCocs(slug: CocSlug) {
  const index = COCS.findIndex((coc) => coc.slug === slug);
  return {
    previous: index > 0 ? COCS[index - 1] : null,
    next: index < COCS.length - 1 ? COCS[index + 1] : null,
  };
}
