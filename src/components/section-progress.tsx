"use client";

import Link from "next/link";
import { Check, Loader2 } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export function SectionProgress({
  cocSlug,
  sectionSlug,
}: {
  cocSlug: string;
  sectionSlug: string;
}) {
  const supabase = getSupabaseBrowserClient();
  const [userId, setUserId] = useState<string | null>(null);
  const [ready, setReady] = useState(!isSupabaseConfigured);
  const [done, setDone] = useState(false);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (!supabase) return;
    let active = true;
    supabase.auth
      .getUser()
      .then(async ({ data }) => {
        if (!active) return;
        const user = data.user;
        setUserId(user?.id ?? null);
        if (user) {
          const { data: row } = await supabase
            .from("section_progress")
            .select("status")
            .eq("user_id", user.id)
            .eq("coc_slug", cocSlug)
            .eq("section_slug", sectionSlug)
            .maybeSingle();
          if (active) setDone(Boolean(row));
        }
        if (active) setReady(true);
      })
      .catch(() => {
        if (active) setReady(true);
      });
    return () => {
      active = false;
    };
  }, [cocSlug, sectionSlug, supabase]);

  if (!isSupabaseConfigured) return null;

  if (!ready) {
    return (
      <span className="inline-flex h-8 items-center gap-2 rounded-full border border-outline-variant px-3 text-xs text-on-surface-variant">
        <Loader2 className="size-3.5 animate-spin" /> Checking progress
      </span>
    );
  }

  if (!userId) {
    return (
      <Link
        href={`/login?next=/coc/${cocSlug}`}
        className="inline-flex h-8 items-center rounded-full border border-outline-variant px-3 text-xs font-semibold text-on-surface-variant transition hover:border-primary hover:text-primary"
      >
        Sign in to track
      </Link>
    );
  }

  function toggle() {
    if (!supabase || !userId) return;
    startTransition(async () => {
      if (done) {
        const { error } = await supabase
          .from("section_progress")
          .delete()
          .eq("user_id", userId)
          .eq("coc_slug", cocSlug)
          .eq("section_slug", sectionSlug);
        if (!error) setDone(false);
        return;
      }
      const { error } = await supabase.from("section_progress").upsert({
        user_id: userId,
        coc_slug: cocSlug,
        section_slug: sectionSlug,
        status: "complete",
        updated_at: new Date().toISOString(),
      });
      if (!error) setDone(true);
    });
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={pending}
      aria-pressed={done}
      className={cn(
        "inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-xs font-semibold transition",
        done
          ? "border-transparent bg-primary-container text-on-primary-container"
          : "border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary",
        pending && "opacity-60",
      )}
    >
      {pending ? (
        <Loader2 className="size-3.5 animate-spin" />
      ) : (
        <Check className={cn("size-3.5", !done && "opacity-40")} />
      )}
      {done ? "Reviewed" : "Mark reviewed"}
    </button>
  );
}
