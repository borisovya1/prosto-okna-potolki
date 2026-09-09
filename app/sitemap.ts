import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const lastModified = new Date();

  return [
    { url: `${base}/`, lastModified, priority: 1 },
    { url: `${base}/okna/`, lastModified, priority: 0.9 },
    { url: `${base}/potolki/`, lastModified, priority: 0.9 },
    { url: `${base}/politika/`, lastModified, priority: 0.2 },
  ];
}
