"use server";

import { db } from "@/lib/db";
import {
  properties,
  propertyImages,
  propertyFacilities,
  favorites,
} from "@/lib/db/schema";
import { propertyCreateSchema, propertyUpdateSchema } from "@/lib/validations";
import { generateId, slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (!session?.user || (role !== "admin" && role !== "sudo")) {
    throw new Error("Unauthorized");
  }
}

export async function createProperty(input: unknown) {
  await requireAdmin();
  const data = propertyCreateSchema.parse(input);
  const id = generateId();
  const slug = slugify(data.title) + "-" + id.slice(0, 8);
  await db.insert(properties).values({
    id,
    slug,
    title: data.title,
    description: data.description,
    status: data.status,
    propertyTypeId: data.propertyTypeId,
    price: data.price,
    priceNegotiable: data.priceNegotiable,
    landArea: data.landArea ?? null,
    buildingArea: data.buildingArea ?? null,
    bedrooms: data.bedrooms ?? null,
    bathrooms: data.bathrooms ?? null,
    floors: data.floors ?? null,
    carport: data.carport ?? null,
    certificate: data.certificate ?? null,
    condition: data.condition ?? null,
    furnished: data.furnished ?? null,
    address: data.address ?? null,
    latitude: data.latitude ?? null,
    longitude: data.longitude ?? null,
    provinceId: data.provinceId ?? null,
    cityId: data.cityId ?? null,
    districtId: data.districtId ?? null,
    agentId: data.agentId ?? null,
    featured: data.featured,
    verified: data.verified,
    status_published: data.status_published,
  });
  if (data.images?.length) {
    await db.insert(propertyImages).values(
      data.images.map((img, i) => ({
        id: generateId(),
        propertyId: id,
        url: img.url,
        alt: img.alt ?? null,
        sortOrder: img.sortOrder ?? i,
      })),
    );
  }
  if (data.facilities?.length) {
    await db.insert(propertyFacilities).values(
      data.facilities.map((name) => ({
        id: generateId(),
        propertyId: id,
        name,
      })),
    );
  }
  revalidatePath("/search");
  revalidatePath("/admin/properti");
  return { id, slug };
}

export async function updateProperty(id: string, input: unknown) {
  await requireAdmin();
  const data = propertyUpdateSchema.parse(input);
  const updateData = { ...data };
  delete (updateData as Partial<typeof updateData>).images;
  delete (updateData as Partial<typeof updateData>).facilities;
  await db
    .update(properties)
    .set({ ...updateData, updatedAt: new Date() })
    .where(eq(properties.id, id));
  revalidatePath("/search");
  revalidatePath("/admin/properti");
  return { id };
}

export async function deleteProperty(id: string) {
  await requireAdmin();
  await db.delete(properties).where(eq(properties.id, id));
  revalidatePath("/admin/properti");
  revalidatePath("/search");
  return { success: true };
}

export async function toggleFavorite(propertyId: string, userId: string) {
  const existing = await db.query.favorites.findFirst({
    where: and(
      eq(favorites.propertyId, propertyId),
      eq(favorites.userId, userId),
    ),
  });
  if (existing) {
    await db.delete(favorites).where(eq(favorites.id, existing.id));
    return { favorited: false };
  }
  await db.insert(favorites).values({
    id: generateId(),
    propertyId,
    userId,
  });
  return { favorited: true };
}
