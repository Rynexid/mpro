import { db } from "@/lib/db";
import { articles, articleCategories } from "@/lib/db/schema";
import { and, desc, eq, like, sql, count, asc } from "drizzle-orm";
import type { ArticleSearchInput } from "@/lib/validations";

const articleWithRelations = {
  category: true,
  author: true,
} as const;

export async function getArticles(filters: ArticleSearchInput) {
  const { query, category, published, sort, page, limit } = filters;
  const conditions = [eq(articles.published, published)];

  if (query) conditions.push(like(articles.title, `%${query}%`));
  if (category) conditions.push(eq(articleCategories.slug, category));

  const offset = (page - 1) * limit;

  const [data, totalResult] = await Promise.all([
    db.query.articles.findMany({
      where: and(...conditions),
      with: articleWithRelations,
      orderBy:
        sort === "popular"
          ? desc(articles.viewCount)
          : desc(articles.publishedAt),
      limit,
      offset,
    }),
    db
      .select({ value: count() })
      .from(articles)
      .where(and(...conditions)),
  ]);

  const total = totalResult[0]?.value ?? 0;

  return {
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getArticleBySlug(slug: string) {
  return db.query.articles.findFirst({
    where: eq(articles.slug, slug),
    with: {
      category: true,
      author: true,
    },
  });
}

export async function getLatestArticles(limit = 5) {
  return db.query.articles.findMany({
    where: eq(articles.published, true),
    with: articleWithRelations,
    orderBy: desc(articles.publishedAt),
    limit,
  });
}

export async function getArticleCategories() {
  return db.query.articleCategories.findMany({
    orderBy: asc(articleCategories.sortOrder),
  });
}

export async function incrementArticleViews(id: string) {
  await db
    .update(articles)
    .set({ viewCount: sql`${articles.viewCount} + 1` })
    .where(eq(articles.id, id));
}

export async function getAdminArticles(limit = 50) {
  return db.query.articles.findMany({
    with: articleWithRelations,
    orderBy: desc(articles.updatedAt),
    limit,
  });
}

export async function getArticleById(id: string) {
  return db.query.articles.findFirst({
    where: eq(articles.id, id),
    with: {
      category: true,
      author: true,
      articleTags: { with: { tag: true } },
    },
  });
}
