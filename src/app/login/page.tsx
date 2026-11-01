import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/login-form";
import { getCurrentUser } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to CSS Compendium to track your review progress.",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const safeNext = next && next.startsWith("/") && !next.startsWith("//") ? next : "/dashboard";
  const user = await getCurrentUser();
  if (user) redirect(safeNext);

  return (
    <div className="mx-auto grid max-w-5xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1fr_1.05fr] md:items-center md:py-20">
      <div className="order-2 md:order-1">
        <span className="md3-chip">Optional account</span>
        <h2 className="mt-4 text-3xl font-bold tracking-[-0.02em] text-on-surface sm:text-4xl">
          Keep the thread of your review.
        </h2>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-on-surface-variant">
          The reviewer is free to read without signing in. An account simply
          remembers which sections you have reviewed, your quiz history, and the
          COCs that need another pass.
        </p>
        <ul className="mt-5 grid gap-2.5 text-sm text-on-surface-variant">
          <li>✓ Mark sections reviewed per COC</li>
          <li>✓ Keep practice and mock-exam attempts</li>
          <li>✓ See weak areas before assessment</li>
          <li>✓ No ads, no selling data, no social feed</li>
        </ul>
      </div>
      <div className="order-1 md:order-2">
        <LoginForm next={safeNext} />
      </div>
    </div>
  );
}
