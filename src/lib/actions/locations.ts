"use server";

import { db } from "@/lib/db";
import { provinces, cities, districts } from "@/lib/db/schema";
import { locationSchema } from "@/lib/validations";
import { generateId, slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth";

export async function createProvince(input: unknown) {
  await requireAdmin();
  const data = locationSchema.parse(input);
  await db.insert(provinces).values({
    id: generateId(),
    name: data.name,
    slug: data.slug || slugify(data.name),
  });
  revalidatePath("/admin/lokasi");
  return { success: true };
}

export async function createCity(input: unknown) {
  await requireAdmin();
  const data = locationSchema.parse(input);
  if (!data.provinceId) throw new Error("Province wajib dipilih");
  await db.insert(cities).values({
    id: generateId(),
    provinceId: data.provinceId,
    name: data.name,
    slug: data.slug || slugify(data.name),
  });
  revalidatePath("/admin/lokasi");
  return { success: true };
}

export async function createDistrict(input: unknown) {
  await requireAdmin();
  const data = locationSchema.parse(input);
  if (!data.cityId) throw new Error("City wajib dipilih");
  await db.insert(districts).values({
    id: generateId(),
    cityId: data.cityId,
    name: data.name,
    slug: data.slug || slugify(data.name),
  });
  revalidatePath("/admin/lokasi");
  return { success: true };
}

export async function deleteLocation(
  kind: "province" | "city" | "district",
  id: string,
) {
  await requireAdmin();
  const table =
    kind === "province" ? provinces : kind === "city" ? cities : districts;
  await db.delete(table).where(eq(table.id, id));
  revalidatePath("/admin/lokasi");
  return { success: true };
}
