import type { MetadataRoute } from "next";
import { getProperties, getArticles } from "@/lib/db/queries";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [properties, articles] = await Promise.all([
    getProperties({ page: 1, limit: 50, sort: "latest" }),
    getArticles({ published: true, page: 1, limit: 50, sort: "latest" }),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date() },
    { url: `${BASE_URL}/search`, lastModified: new Date() },
    { url: `${BASE_URL}/berita`, lastModified: new Date() },
    { url: `${BASE_URL}/kpr`, lastModified: new Date() },
  ];

  const propertyRoutes: MetadataRoute.Sitemap = properties.data.map((p) => ({
    url: `${BASE_URL}/search/${p.slug}`,
    lastModified: new Date(p.updatedAt ?? p.createdAt),
  }));

  const articleRoutes: MetadataRoute.Sitemap = articles.data.map((a) => ({
    url: `${BASE_URL}/berita/${a.slug}`,
    lastModified: new Date(a.updatedAt ?? a.createdAt),
  }));

  return [...staticRoutes, ...propertyRoutes, ...articleRoutes];
}
