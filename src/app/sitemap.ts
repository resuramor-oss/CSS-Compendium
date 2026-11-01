import type { MetadataRoute } from "next";
import { COCS } from "@/content/cocs";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://css-compendium.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/quiz", "/exam", "/about", "/privacy"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const cocRoutes = COCS.flatMap((coc) => [
    {
      url: `${baseUrl}/coc/${coc.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/quiz/${coc.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
  ]);

  return [...staticRoutes, ...cocRoutes];
}
