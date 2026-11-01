import type { Metadata, Viewport } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { AnalyticsConsent, AnalyticsGate } from "@/components/analytics";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CSS Compendium — TESDA CSS NC II Reviewer",
    template: "%s · CSS Compendium",
  },
  description:
    "A free, source-based reviewer for TESDA Computer Systems Servicing NC II: competency standards, quick-recall notes, procedures, and explained practice questions.",
  keywords: [
    "TESDA",
    "CSS NC II",
    "Computer Systems Servicing",
    "NC II reviewer",
    "COC 1",
    "COC 2",
    "COC 3",
    "COC 4",
  ],
  openGraph: {
    title: "CSS Compendium — TESDA CSS NC II Reviewer",
    description:
      "Competency standards, notes, procedures, and explained practice questions for TESDA CSS NC II.",
    type: "website",
    url: siteUrl,
    siteName: "CSS Compendium",
  },
  twitter: {
    card: "summary_large_image",
    title: "CSS Compendium — TESDA CSS NC II Reviewer",
    description:
      "A free, source-based reviewer for TESDA Computer Systems Servicing NC II.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf8ff" },
    { media: "(prefers-color-scheme: dark)", color: "#111318" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${roboto.variable} ${robotoMono.variable}`}
    >
      <body className="flex min-h-dvh flex-col">
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-on-primary"
          >
            Skip to content
          </a>
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
          <AnalyticsConsent />
          <AnalyticsGate />
        </ThemeProvider>
      </body>
    </html>
  );
}
