import { ExternalLink } from "lucide-react";
import type { SourceRef } from "@/lib/content";

export function SourceList({ sources }: { sources: SourceRef[] }) {
  if (sources.length === 0) return null;

  return (
    <div className="mt-6 border-t border-outline-variant/60 pt-4">
      <p className="text-[0.68rem] font-bold uppercase tracking-[0.1em] text-on-surface-variant">
        Sources for this section
      </p>
      <ul className="mt-2 grid gap-1.5">
        {sources.map((source) => (
          <li key={`${source.label}-${source.url ?? ""}`} className="text-xs leading-relaxed text-on-surface-variant">
            {source.url ? (
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-start gap-1.5 underline decoration-outline underline-offset-4 hover:text-primary"
              >
                {source.label}
                <ExternalLink className="mt-0.5 size-3 shrink-0" />
              </a>
            ) : (
              source.label
            )}
            {source.note ? <span className="block opacity-80">{source.note}</span> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
