"use server";

import { db } from "@/lib/db";
import { categories } from "@/lib/db/schema";
import { categorySchema } from "@/lib/validations";
import { generateId, slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth";

export async function createCategory(input: unknown) {
  await requireAdmin();
  const data = categorySchema.parse(input);
  const slug = data.slug || slugify(data.name);
  await db.insert(categories).values({
    id: generateId(),
    name: data.name,
    slug,
    description: data.description ?? null,
    parentId: data.parentId ?? null,
    sortOrder: data.sortOrder,
  });
  revalidatePath("/admin/kategori");
  return { success: true };
}

export async function updateCategory(id: string, input: unknown) {
  await requireAdmin();
  const data = categorySchema.parse(input);
  const slug = data.slug || slugify(data.name);
  await db
    .update(categories)
    .set({
      name: data.name,
      slug,
      description: data.description ?? null,
      parentId: data.parentId ?? null,
      sortOrder: data.sortOrder,
    })
    .where(eq(categories.id, id));
  revalidatePath("/admin/kategori");
  return { success: true };
}

export async function deleteCategory(id: string) {
  await requireAdmin();
  await db.delete(categories).where(eq(categories.id, id));
  revalidatePath("/admin/kategori");
  return { success: true };
}
