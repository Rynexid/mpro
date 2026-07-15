import { db } from "@/lib/db";
import { properties, articles, users } from "@/lib/db/schema";
import { count, sql } from "drizzle-orm";

export async function getAdminStats() {
  const [propertyCount, articleCount, userCount, viewResult] =
    await Promise.all([
      db.select({ value: count() }).from(properties),
      db.select({ value: count() }).from(articles),
      db.select({ value: count() }).from(users),
      db
        .select({
          value: sql<number>`coalesce(sum(${properties.viewCount}), 0)`,
        })
        .from(properties),
    ]);

  return {
    properties: propertyCount[0]?.value ?? 0,
    articles: articleCount[0]?.value ?? 0,
    users: userCount[0]?.value ?? 0,
    views: Number(viewResult[0]?.value ?? 0),
  };
}
