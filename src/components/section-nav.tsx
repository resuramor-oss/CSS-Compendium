"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Item = { slug: string; title: string };

export function SectionNav({
  cocSlug,
  sections,
  variant,
}: {
  cocSlug: string;
  sections: Item[];
  variant: "mobile" | "desktop";
}) {
  const [active, setActive] = useState(sections[0]?.slug ?? "");

  useEffect(() => {
    const elements = sections
      .map((section) => document.getElementById(section.slug))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-18% 0px -68% 0px", threshold: [0, 1] },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sections]);

  if (variant === "mobile") {
    return (
      <nav
        aria-label="On this page"
        className="sticky top-[4.25rem] z-20 -mx-4 flex gap-2 overflow-x-auto border-b border-outline-variant/60 bg-surface/90 px-4 py-3 backdrop-blur-lg lg:hidden"
      >
        {sections.map((section) => (
          <a
            key={section.slug}
            href={`#${section.slug}`}
            className={cn(
              "shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
              active === section.slug
                ? "border-transparent bg-primary-container text-on-primary-container"
                : "border-outline-variant text-on-surface-variant",
            )}
          >
            {section.title}
          </a>
        ))}
      </nav>
    );
  }

  return (
    <nav aria-label="On this page">
      <div className="sticky top-[5.5rem]">
        <p className="px-3 pb-2 text-[0.68rem] font-bold uppercase tracking-[0.1em] text-on-surface-variant">
          On this page
        </p>
        <div className="grid gap-0.5">
          {sections.map((section) => (
            <a
              key={section.slug}
              href={`#${section.slug}`}
              className={cn(
                "rounded-xl px-3 py-2 text-sm transition-colors",
                active === section.slug
                  ? "bg-primary-container font-semibold text-on-primary-container"
                  : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface",
              )}
            >
              {section.title}
            </a>
          ))}
        </div>
        <div className="mt-4 rounded-2xl border border-outline-variant/70 bg-surface-container-low p-3">
          <p className="text-xs font-semibold text-on-surface">COC {cocSlug}</p>
          <p className="mt-1 text-xs leading-relaxed text-on-surface-variant">
            Read the section, then mark it reviewed to track progress.
          </p>
        </div>
      </div>
    </nav>
  );
}
