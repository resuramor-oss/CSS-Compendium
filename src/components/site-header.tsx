"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BookOpen,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/quiz", label: "Practice" },
  { href: "/exam", label: "Mock exam" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(!isSupabaseConfigured);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    let active = true;
    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!active) return;
        setUser(data.session?.user ?? null);
        setReady(true);
      })
      .catch(() => {
        if (active) setReady(true);
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;
      setUser(session?.user ?? null);
      setReady(true);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const displayName =
    (user?.user_metadata?.display_name as string | undefined) ||
    user?.email?.split("@")[0] ||
    "Account";

  async function signOut() {
    const supabase = getSupabaseBrowserClient();
    await supabase?.auth.signOut();
    setUser(null);
    setUserOpen(false);
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-40 border-b border-outline-variant/70 bg-surface/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5" aria-label="CSS Compendium home">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-on-primary shadow-[var(--md-elevation-1)]">
            <BookOpen className="size-5" />
          </span>
          <span className="hidden text-[0.95rem] font-bold tracking-tight text-on-surface sm:block">
            CSS Compendium
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {NAV.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  setMenuOpen(false);
                  setUserOpen(false);
                }}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary-container text-on-primary-container"
                    : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />

          {!ready ? (
            <span
              className="hidden h-10 w-20 animate-pulse rounded-full bg-surface-container sm:block"
              aria-hidden
            />
          ) : user ? (
            <div className="relative">
              <button
                type="button"
                className="md3-tonal-button h-10 min-h-0 gap-2 px-3 text-xs"
                onClick={() => setUserOpen((open) => !open)}
                aria-expanded={userOpen}
                aria-haspopup="menu"
              >
                <span className="flex size-6 items-center justify-center rounded-full bg-primary text-[0.65rem] font-bold text-on-primary">
                  {displayName.slice(0, 1).toUpperCase()}
                </span>
                <span className="hidden max-w-24 truncate sm:block">{displayName}</span>
                <ChevronDown className="size-4" />
              </button>
              {userOpen ? (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 w-52 overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-low p-1.5 shadow-[var(--md-elevation-3)]"
                >
                  <div className="px-3 py-2">
                    <p className="truncate text-sm font-semibold text-on-surface">
                      {displayName}
                    </p>
                    <p className="truncate text-xs text-on-surface-variant">
                      {user.email}
                    </p>
                  </div>
                  <Link
                    href="/dashboard"
                    role="menuitem"
                    onClick={() => setUserOpen(false)}
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-on-surface-variant hover:bg-surface-container"
                  >
                    <LayoutDashboard className="size-4" /> Dashboard
                  </Link>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={signOut}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-on-surface-variant hover:bg-surface-container"
                  >
                    <LogOut className="size-4" /> Sign out
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <Link
              href="/login"
              className="md3-filled-button hidden h-10 min-h-0 px-4 text-xs sm:inline-flex"
            >
              Sign in
            </Link>
          )}

          <button
            type="button"
            className="md3-icon-button md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-outline-variant bg-surface-container-low px-4 py-3 md:hidden">
          <nav className="grid gap-1" aria-label="Mobile navigation">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  setMenuOpen(false);
                  setUserOpen(false);
                }}
                className={cn(
                  "rounded-xl px-3 py-2.5 text-sm font-medium",
                  pathname === item.href
                    ? "bg-primary-container text-on-primary-container"
                    : "text-on-surface-variant hover:bg-surface-container",
                )}
              >
                {item.label}
              </Link>
            ))}
            {!user ? (
              <Link href="/login" className="md3-filled-button mt-2">
                Sign in
              </Link>
            ) : (
              <Link href="/dashboard" className="md3-tonal-button mt-2">
                Dashboard
              </Link>
            )}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
