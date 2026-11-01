import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ResetPasswordForm } from "@/components/reset-password-form";

export const metadata: Metadata = {
  title: "Reset password",
  robots: { index: false, follow: false },
};

export default function ResetPasswordPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-12 sm:px-6 md:py-16">
      <Link href="/login" className="md3-text-button -ml-2">
        <ArrowLeft className="size-4" /> Back to sign in
      </Link>
      <div className="mt-6">
        <ResetPasswordForm />
      </div>
    </div>
  );
}
