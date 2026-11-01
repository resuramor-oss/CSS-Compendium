import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <span className="flex size-16 items-center justify-center rounded-3xl bg-primary-container text-on-primary-container">
        <Compass className="size-8" />
      </span>
      <p className="mt-6 text-xs font-bold uppercase tracking-[0.12em] text-tertiary">
        404
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-[-0.03em] text-on-surface">
        This page is not in the reviewer.
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-on-surface-variant">
        The link may be old, or the page may have moved. Try one of the four COCs,
        or head back to the home page.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link href="/" className="md3-filled-button">Back home</Link>
        <Link href="/quiz" className="md3-outlined-button">Practise instead</Link>
      </div>
    </div>
  );
}
