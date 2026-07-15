import { db } from "@/lib/db";
import {
  properties,
  propertyTypes,
  favorites,
  recentlyViewed,
  propertyImages,
} from "@/lib/db/schema";
import {
  and,
  asc,
  desc,
  eq,
  gte,
  like,
  lte,
  or,
  sql,
  count,
} from "drizzle-orm";
import type { PropertySearchInput } from "@/lib/validations";
import { generateId } from "@/lib/utils";

const propertyWithRelations = {
  propertyType: true,
  city: true,
  district: true,
  province: true,
  images: true,
  facilities: true,
  agent: true,
} as const;

export async function getProperties(filters: PropertySearchInput) {
  const {
    query,
    status,
    propertyType,
    provinceId,
    cityId,
    districtId,
    minPrice,
    maxPrice,
    minLandArea,
    maxLandArea,
    minBuildingArea,
    maxBuildingArea,
    bedrooms,
    bathrooms,
    certificate,
    furnished,
    condition,
    featured,
    sort,
    page,
    limit,
  } = filters;

  const conditions = [eq(properties.status_published, true)];

  if (query) {
    conditions.push(
      or(
        like(properties.title, `%${query}%`),
        like(properties.description, `%${query}%`),
        like(properties.address, `%${query}%`),
      )!,
    );
  }
  if (status) conditions.push(eq(properties.status, status));
  if (propertyType) conditions.push(eq(propertyTypes.slug, propertyType));
  if (provinceId) conditions.push(eq(properties.provinceId, provinceId));
  if (cityId) conditions.push(eq(properties.cityId, cityId));
  if (districtId) conditions.push(eq(properties.districtId, districtId));
  if (minPrice) conditions.push(gte(properties.price, minPrice));
  if (maxPrice) conditions.push(lte(properties.price, maxPrice));
  if (minLandArea) conditions.push(gte(properties.landArea, minLandArea));
  if (maxLandArea) conditions.push(lte(properties.landArea, maxLandArea));
  if (minBuildingArea)
    conditions.push(gte(properties.buildingArea, minBuildingArea));
  if (maxBuildingArea)
    conditions.push(lte(properties.buildingArea, maxBuildingArea));
  if (bedrooms) conditions.push(gte(properties.bedrooms, bedrooms));
  if (bathrooms) conditions.push(gte(properties.bathrooms, bathrooms));
  if (certificate) conditions.push(eq(properties.certificate, certificate));
  if (furnished) conditions.push(eq(properties.furnished, furnished));
  if (condition) conditions.push(eq(properties.condition, condition));
  if (featured) conditions.push(eq(properties.featured, true));

  const sortOrder =
    sort === "price_asc"
      ? asc(properties.price)
      : sort === "price_desc"
        ? desc(properties.price)
        : sort === "popular"
          ? desc(properties.viewCount)
          : desc(properties.createdAt);

  const offset = (page - 1) * limit;

  const [data, totalResult] = await Promise.all([
    db.query.properties.findMany({
      where: and(...conditions),
      with: propertyWithRelations,
      orderBy: sortOrder,
      limit,
      offset,
    }),
    db
      .select({ value: count() })
      .from(properties)
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

export async function getPropertyBySlug(slug: string) {
  const property = await db.query.properties.findFirst({
    where: and(
      eq(properties.slug, slug),
      eq(properties.status_published, true),
    ),
    with: propertyWithRelations,
  });
  return property;
}

export async function getRelatedProperties(
  propertyTypeId: string,
  currentId: string,
  limit = 3,
) {
  const data = await db.query.properties.findMany({
    where: and(
      eq(properties.propertyTypeId, propertyTypeId),
      eq(properties.status_published, true),
    ),
    with: propertyWithRelations,
    limit: limit + 1,
  });
  return data.filter((p) => p.id !== currentId).slice(0, limit);
}

export async function getFeaturedProperties(limit = 6) {
  return db.query.properties.findMany({
    where: and(
      eq(properties.featured, true),
      eq(properties.status_published, true),
    ),
    with: propertyWithRelations,
    orderBy: desc(properties.createdAt),
    limit,
  });
}

export async function getLatestProperties(limit = 6) {
  return db.query.properties.findMany({
    where: eq(properties.status_published, true),
    with: propertyWithRelations,
    orderBy: desc(properties.createdAt),
    limit,
  });
}

export async function getTrendingProperties(limit = 8) {
  return db.query.properties.findMany({
    where: eq(properties.status_published, true),
    with: propertyWithRelations,
    orderBy: desc(properties.viewCount),
    limit,
  });
}

export async function getPropertyTypes() {
  return db.query.propertyTypes.findMany({
    orderBy: asc(propertyTypes.sortOrder),
  });
}

export async function incrementPropertyViews(id: string) {
  await db
    .update(properties)
    .set({ viewCount: sql`${properties.viewCount} + 1` })
    .where(eq(properties.id, id));
}

export async function getFavoriteStatus(propertyId: string, userId: string) {
  const result = await db.query.favorites.findFirst({
    where: and(
      eq(favorites.propertyId, propertyId),
      eq(favorites.userId, userId),
    ),
  });
  return !!result;
}

export async function getFavorites(userId: string) {
  const rows = await db.query.favorites.findMany({
    where: eq(favorites.userId, userId),
    with: {
      property: {
        with: propertyWithRelations,
      },
    },
    orderBy: desc(favorites.createdAt),
  });
  return rows
    .map((r) => r.property)
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
}

export async function getRecentlyViewed(userId: string, limit = 8) {
  const rows = await db.query.recentlyViewed.findMany({
    where: eq(recentlyViewed.userId, userId),
    with: {
      property: {
        with: propertyWithRelations,
      },
    },
    orderBy: desc(recentlyViewed.viewedAt),
    limit,
  });
  const seen = new Set<string>();
  const result: (typeof rows)[number]["property"][] = [];
  for (const r of rows) {
    if (r.property && !seen.has(r.property.id)) {
      seen.add(r.property.id);
      result.push(r.property);
    }
  }
  return result;
}

export async function recordRecentlyViewed(userId: string, propertyId: string) {
  const existing = await db.query.recentlyViewed.findFirst({
    where: and(
      eq(recentlyViewed.userId, userId),
      eq(recentlyViewed.propertyId, propertyId),
    ),
  });
  if (existing) {
    await db
      .update(recentlyViewed)
      .set({ viewedAt: new Date() })
      .where(eq(recentlyViewed.id, existing.id));
    return;
  }
  await db.insert(recentlyViewed).values({
    id: generateId(),
    userId,
    propertyId,
  });
}

export async function getAdminProperties(opts?: {
  query?: string;
  status?: "sale" | "rent";
  limit?: number;
}) {
  const conditions: ReturnType<typeof eq>[] = [];
  if (opts?.query) conditions.push(like(properties.title, `%${opts.query}%`));
  if (opts?.status) conditions.push(eq(properties.status, opts.status));
  return db.query.properties.findMany({
    where: conditions.length ? and(...conditions) : undefined,
    with: propertyWithRelations,
    orderBy: desc(properties.createdAt),
    limit: opts?.limit ?? 50,
  });
}

export async function getPropertyById(id: string) {
  return db.query.properties.findFirst({
    where: eq(properties.id, id),
    with: {
      ...propertyWithRelations,
      images: { orderBy: asc(propertyImages.sortOrder) },
    },
  });
}

export async function getPropertiesByIds(ids: string[]) {
  if (ids.length === 0) return [];
  const unique = Array.from(new Set(ids));
  return db.query.properties.findMany({
    where: and(
      eq(properties.status_published, true),
      sql`${properties.id} in ${unique}`,
    ),
    with: propertyWithRelations,
  });
}

export async function getPropertiesByAgentId(agentId: string, limit = 12) {
  return db.query.properties.findMany({
    where: and(
      eq(properties.agentId, agentId),
      eq(properties.status_published, true),
    ),
    with: propertyWithRelations,
    orderBy: desc(properties.createdAt),
    limit,
  });
}
