"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, Loader2, Mail, Sparkles } from "lucide-react";
import { useState } from "react";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase/client";

type Mode = "signin" | "signup";

export function LoginForm({ next }: { next: string }) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const configured = isSupabaseConfigured;

  async function handleEmail(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setMessage(null);
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setError("Accounts are not configured on this deployment yet.");
      return;
    }

    setLoading(true);
    try {
      if (mode === "signup") {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { display_name: displayName || email.split("@")[0] },
            emailRedirectTo: `${window.location.origin}${next}`,
          },
        });
        if (signUpError) throw signUpError;
        if (data.session) {
          router.push(next);
          router.refresh();
        } else {
          setMessage("Check your email to confirm your account, then sign in.");
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
        router.push(next);
        router.refresh();
      }
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Authentication failed.");
    } finally {
      setLoading(false);
    }
  }

  async function handlePasswordReset() {
    setError(null);
    setMessage(null);
    if (!email) {
      setError("Enter your email address first, then choose Forgot password.");
      return;
    }
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setError("Accounts are not configured on this deployment yet.");
      return;
    }

    setLoading(true);
    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/account/reset`,
      });
      if (resetError) throw resetError;
      setMessage("If an account exists for that email, a password reset link is on its way.");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not send the reset email.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setError(null);
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setError("Accounts are not configured on this deployment yet.");
      return;
    }
    setLoading(true);
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });
    if (oauthError) {
      setError(oauthError.message);
      setLoading(false);
    }
  }

  if (!configured) {
    return (
      <div className="md3-card p-6 sm:p-8">
        <span className="md3-chip md3-chip-tertiary">
          <Sparkles className="size-3.5" /> Setup needed
        </span>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-on-surface">
          Accounts are not configured yet.
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
          The public reviewer and quizzes work without an account. To enable
          progress tracking and saved attempts, add the Supabase environment
          variables described in the project README, run the SQL migration, and
          redeploy.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/" className="md3-filled-button">Back to reviewer</Link>
          <Link href="/dashboard" className="md3-outlined-button">Dashboard</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="md3-card p-6 sm:p-8">
      <div className="flex items-center justify-between gap-3">
        <div>
          <span className="md3-chip md3-chip-primary">Free account</span>
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-on-surface">
            {mode === "signin" ? "Welcome back." : "Save your progress."}
          </h1>
          <p className="mt-1 text-sm text-on-surface-variant">
            {mode === "signin"
              ? "Sign in to continue tracking sections and quiz attempts."
              : "Create an account to track review progress and quiz history."}
          </p>
        </div>
      </div>

      <div className="mt-6 flex rounded-full bg-surface-container p-1">
        {(["signin", "signup"] as const).map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => {
              setMode(value);
              setError(null);
              setMessage(null);
            }}
            className={
              mode === value
                ? "flex-1 rounded-full bg-surface-container-lowest px-4 py-2 text-sm font-semibold text-on-surface shadow-[var(--md-elevation-1)]"
                : "flex-1 rounded-full px-4 py-2 text-sm font-medium text-on-surface-variant"
            }
          >
            {value === "signin" ? "Sign in" : "Sign up"}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={handleGoogle}
        disabled={loading}
        className="md3-outlined-button mt-4 w-full"
      >
        <Mail className="size-4" /> Continue with Google
      </button>

      <div className="my-5 flex items-center gap-3 text-xs text-on-surface-variant">
        <span className="h-px flex-1 bg-outline-variant" />
        or use email
        <span className="h-px flex-1 bg-outline-variant" />
      </div>

      <form onSubmit={handleEmail} className="grid gap-3">
        {mode === "signup" ? (
          <div>
            <label htmlFor="displayName" className="mb-1.5 block text-xs font-semibold text-on-surface-variant">
              Display name
            </label>
            <input
              id="displayName"
              className="md3-input"
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              placeholder="How should we call you?"
              autoComplete="nickname"
              maxLength={40}
            />
          </div>
        ) : null}
        <div>
          <label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-on-surface-variant">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            className="md3-input"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-1.5 block text-xs font-semibold text-on-surface-variant">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            minLength={8}
            className="md3-input"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="At least 8 characters"
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
          />
        </div>

        {mode === "signin" ? (
          <div className="-mt-1 flex justify-end">
            <button
              type="button"
              onClick={handlePasswordReset}
              disabled={loading}
              className="text-xs font-semibold text-primary hover:underline disabled:opacity-60"
            >
              Forgot password?
            </button>
          </div>
        ) : null}

        {error ? (
          <div className="flex items-start gap-2 rounded-2xl bg-error-container p-3 text-sm text-on-error-container">
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
            <p>{error}</p>
          </div>
        ) : null}
        {message ? (
          <div className="rounded-2xl bg-primary-container p-3 text-sm text-on-primary-container">
            {message}
          </div>
        ) : null}

        <button type="submit" className="md3-filled-button mt-1 w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Please wait
            </>
          ) : mode === "signin" ? (
            "Sign in"
          ) : (
            "Create account"
          )}
        </button>
      </form>

      <p className="mt-4 text-center text-xs leading-relaxed text-on-surface-variant">
        By creating an account you agree to the{" "}
        <Link href="/privacy" className="text-primary hover:underline">privacy notice</Link>.
        We store only your email, display name, progress, and quiz attempts.
      </p>
    </div>
  );
}
