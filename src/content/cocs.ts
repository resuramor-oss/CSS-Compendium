export const SECTION_DEFINITIONS = [
  {
    slug: "overview",
    title: "Overview",
    description: "What this unit covers and how you will be assessed.",
  },
  {
    slug: "standards",
    title: "Competency Standards",
    description: "The official elements and performance criteria for this COC.",
  },
  {
    slug: "notes",
    title: "Quick-Recall Notes",
    description: "Condensed concepts to review before your assessment.",
  },
  {
    slug: "procedures",
    title: "Procedures",
    description: "The sequence assessors expect you to follow.",
  },
  {
    slug: "tools",
    title: "Tools & Materials",
    description: "What you should be able to identify and prepare.",
  },
  {
    slug: "mistakes",
    title: "Common Mistakes & Tips",
    description: "Avoidable errors and practical reminders.",
  },
] as const;

export const COCS = [
  {
    slug: "1",
    dir: "coc-1",
    number: 1,
    unitCode: "ELC724331",
    title: "Install and Configure Computer Systems",
    shortTitle: "Install & Configure",
    tagline: "Hardware assembly, operating systems, drivers, and documentation.",
    description:
      "Assemble a desktop computer, prepare installers, install an operating system and device drivers, set up application software, then test and document the result.",
  },
  {
    slug: "2",
    dir: "coc-2",
    number: 2,
    unitCode: "ELC724332",
    title: "Set Up Computer Networks",
    shortTitle: "Set Up Networks",
    tagline: "Cabling, IP configuration, routers, wireless, and testing.",
    description:
      "Install and test copper network cables, configure clients and network devices, set up a router/Wi-Fi access point, and verify connectivity against a network design.",
  },
  {
    slug: "3",
    dir: "coc-3",
    number: 3,
    unitCode: "ELC724333",
    title: "Set Up Computer Servers",
    shortTitle: "Set Up Servers",
    tagline: "User access, network services, and pre-deployment checks.",
    description:
      "Create and secure user access on a network operating system, configure common server services, and perform testing, documentation, and pre-deployment procedures.",
  },
  {
    slug: "4",
    dir: "coc-4",
    number: 4,
    unitCode: "ELC724334",
    title: "Maintain and Repair Computer Systems and Networks",
    shortTitle: "Maintain & Repair",
    tagline: "Preventive maintenance, diagnosis, repair, and inspection.",
    description:
      "Plan maintenance, diagnose hardware and software faults, rectify defects, test the repaired system, and complete the required reports and housekeeping.",
  },
] as const;

export type Coc = (typeof COCS)[number];
export type CocSlug = Coc["slug"];
export type SectionDefinition = (typeof SECTION_DEFINITIONS)[number];
export type SectionSlug = SectionDefinition["slug"];

export const COC_SLUGS = COCS.map((coc) => coc.slug);

export function getCoc(slug: string): Coc | undefined {
  return COCS.find((coc) => coc.slug === slug);
}

export function isCocSlug(slug: string): slug is CocSlug {
  return COC_SLUGS.includes(slug as CocSlug);
}

export function getSectionDefinition(slug: string): SectionDefinition | undefined {
  return SECTION_DEFINITIONS.find((section) => section.slug === slug);
}
