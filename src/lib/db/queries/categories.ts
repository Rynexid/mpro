import { db } from "@/lib/db";
import { categories } from "@/lib/db/schema";
import { asc } from "drizzle-orm";

export async function getCategories() {
  return db.query.categories.findMany({ orderBy: asc(categories.sortOrder) });
}
