"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, KeyRound, Loader2 } from "lucide-react";
import { useState } from "react";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase/client";

export function ResetPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError("The passwords do not match.");
      return;
    }

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setError("Accounts are not configured on this deployment yet.");
      return;
    }

    setLoading(true);
    try {
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) throw updateError;
      router.push("/dashboard");
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not update your password.");
    } finally {
      setLoading(false);
    }
  }

  if (!isSupabaseConfigured) {
    return (
      <div className="md3-card p-6 sm:p-8">
        <KeyRound className="size-7 text-primary" />
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-on-surface">
          Password reset is not configured.
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
          Add the Supabase environment variables and run the migration first.
        </p>
        <Link href="/" className="md3-filled-button mt-5">Back to reviewer</Link>
      </div>
    );
  }

  return (
    <div className="md3-card p-6 sm:p-8">
      <KeyRound className="size-7 text-primary" />
      <h1 className="mt-4 text-2xl font-bold tracking-tight text-on-surface">
        Choose a new password.
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
        Your reset link signed you in temporarily. Set a new password to finish.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-3">
        <div>
          <label htmlFor="newPassword" className="mb-1.5 block text-xs font-semibold text-on-surface-variant">
            New password
          </label>
          <input
            id="newPassword"
            type="password"
            required
            minLength={8}
            className="md3-input"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="new-password"
            placeholder="At least 8 characters"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="mb-1.5 block text-xs font-semibold text-on-surface-variant">
            Confirm new password
          </label>
          <input
            id="confirmPassword"
            type="password"
            required
            minLength={8}
            className="md3-input"
            value={confirm}
            onChange={(event) => setConfirm(event.target.value)}
            autoComplete="new-password"
            placeholder="Repeat your new password"
          />
        </div>

        {error ? (
          <div className="flex items-start gap-2 rounded-2xl bg-error-container p-3 text-sm text-on-error-container">
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
            <p>{error}</p>
          </div>
        ) : null}

        <button type="submit" className="md3-filled-button mt-1 w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Saving
            </>
          ) : (
            "Save new password"
          )}
        </button>
      </form>

      <p className="mt-4 text-center text-xs text-on-surface-variant">
        <Link href="/login" className="text-primary hover:underline">Back to sign in</Link>
      </p>
    </div>
  );
}
