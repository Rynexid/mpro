"use server";

import { db } from "@/lib/db";
import { propertyTypes } from "@/lib/db/schema";
import { propertyTypeSchema } from "@/lib/validations";
import { generateId, slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth";

export async function createPropertyType(input: unknown) {
  await requireAdmin();
  const data = propertyTypeSchema.parse(input);
  const slug = data.slug || slugify(data.name);
  await db.insert(propertyTypes).values({
    id: generateId(),
    name: data.name,
    slug,
    icon: data.icon ?? null,
    description: data.description ?? null,
    sortOrder: data.sortOrder,
  });
  revalidatePath("/admin/tipe-properti");
  return { success: true };
}

export async function updatePropertyType(id: string, input: unknown) {
  await requireAdmin();
  const data = propertyTypeSchema.parse(input);
  const slug = data.slug || slugify(data.name);
  await db
    .update(propertyTypes)
    .set({
      name: data.name,
      slug,
      icon: data.icon ?? null,
      description: data.description ?? null,
      sortOrder: data.sortOrder,
    })
    .where(eq(propertyTypes.id, id));
  revalidatePath("/admin/tipe-properti");
  return { success: true };
}

export async function deletePropertyType(id: string) {
  await requireAdmin();
  await db.delete(propertyTypes).where(eq(propertyTypes.id, id));
  revalidatePath("/admin/tipe-properti");
  return { success: true };
}
