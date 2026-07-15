"use server";

import { db } from "@/lib/db";
import { articles, articleTags } from "@/lib/db/schema";
import { articleCreateSchema, articleUpdateSchema } from "@/lib/validations";
import { generateId, slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (!session?.user || (role !== "admin" && role !== "sudo")) {
    throw new Error("Unauthorized");
  }
}

export async function createArticle(input: unknown) {
  const session = await auth.api.getSession({ headers: await headers() });
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (!session?.user || (role !== "admin" && role !== "sudo")) {
    throw new Error("Unauthorized");
  }
  const data = articleCreateSchema.parse(input);
  const id = generateId();
  const slug = slugify(data.title) + "-" + id.slice(0, 8);
  await db.insert(articles).values({
    id,
    slug,
    title: data.title,
    excerpt: data.excerpt ?? null,
    content: data.content,
    coverImage: data.coverImage ?? null,
    categoryId: data.categoryId,
    authorId: session.user.id,
    published: data.published,
    publishedAt: data.published ? new Date() : null,
    metaTitle: data.metaTitle ?? null,
    metaDescription: data.metaDescription ?? null,
  });
  if (data.tagIds?.length) {
    await db
      .insert(articleTags)
      .values(data.tagIds.map((tagId) => ({ articleId: id, tagId })));
  }
  revalidatePath("/berita");
  revalidatePath("/admin/artikel");
  return { id, slug };
}

export async function updateArticle(id: string, input: unknown) {
  await requireAdmin();
  const data = articleUpdateSchema.parse(input);
  const updateData = { ...data };
  delete (updateData as Partial<typeof updateData>).tagIds;
  await db
    .update(articles)
    .set({ ...updateData, updatedAt: new Date() })
    .where(eq(articles.id, id));
  revalidatePath("/berita");
  revalidatePath("/admin/artikel");
  return { id };
}

export async function deleteArticle(id: string) {
  await requireAdmin();
  await db.delete(articles).where(eq(articles.id, id));
  revalidatePath("/berita");
  revalidatePath("/admin/artikel");
  return { success: true };
}
