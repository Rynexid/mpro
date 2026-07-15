import { z } from "zod";

export const propertyStatusEnum = z.enum(["sale", "rent"]);
export const propertyConditionEnum = z.enum(["baru", "bekas"]);
export const certificateTypeEnum = z.enum([
  "SHM",
  "HGB",
  "SHGB",
  "AJB",
  "Lainnya",
]);
export const furnishedEnum = z.enum([
  "furnished",
  "semi_furnished",
  "unfurnished",
]);

export const propertyCreateSchema = z.object({
  title: z.string().min(3, "Judul minimal 3 karakter").max(200),
  description: z.string().min(10, "Deskripsi minimal 10 karakter"),
  status: propertyStatusEnum,
  propertyTypeId: z.string().min(1, "Tipe properti wajib dipilih"),
  price: z.number().int().positive("Harga harus positif"),
  priceNegotiable: z.boolean().default(false),
  landArea: z.number().int().positive().optional().nullable(),
  buildingArea: z.number().int().positive().optional().nullable(),
  bedrooms: z.number().int().min(0).max(50).optional().nullable(),
  bathrooms: z.number().int().min(0).max(50).optional().nullable(),
  floors: z.number().int().min(0).max(50).optional().nullable(),
  carport: z.number().int().min(0).max(50).optional().nullable(),
  certificate: certificateTypeEnum.optional().nullable(),
  condition: propertyConditionEnum.optional().nullable(),
  furnished: furnishedEnum.optional().nullable(),
  address: z.string().optional().nullable(),
  latitude: z.string().optional().nullable(),
  longitude: z.string().optional().nullable(),
  provinceId: z.string().optional().nullable(),
  cityId: z.string().optional().nullable(),
  districtId: z.string().optional().nullable(),
  agentId: z.string().optional().nullable(),
  featured: z.boolean().default(false),
  verified: z.boolean().default(false),
  status_published: z.boolean().default(true),
  images: z
    .array(
      z.object({
        url: z.string().url(),
        alt: z.string().optional(),
        sortOrder: z.number().int().default(0),
      }),
    )
    .optional(),
  facilities: z.array(z.string()).optional(),
});

export const propertyUpdateSchema = propertyCreateSchema.partial();

export const propertySearchSchema = z.object({
  query: z.string().optional(),
  status: propertyStatusEnum.optional(),
  propertyType: z.string().optional(),
  provinceId: z.string().optional(),
  cityId: z.string().optional(),
  districtId: z.string().optional(),
  minPrice: z.number().int().positive().optional(),
  maxPrice: z.number().int().positive().optional(),
  minLandArea: z.number().int().positive().optional(),
  maxLandArea: z.number().int().positive().optional(),
  minBuildingArea: z.number().int().positive().optional(),
  maxBuildingArea: z.number().int().positive().optional(),
  bedrooms: z.number().int().min(0).optional(),
  bathrooms: z.number().int().min(0).optional(),
  certificate: certificateTypeEnum.optional(),
  furnished: furnishedEnum.optional(),
  condition: propertyConditionEnum.optional(),
  featured: z.boolean().optional(),
  sort: z
    .enum(["latest", "price_asc", "price_desc", "popular"])
    .default("latest"),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(50).default(12),
});

export type PropertyCreateInput = z.infer<typeof propertyCreateSchema>;
export type PropertyUpdateInput = z.infer<typeof propertyUpdateSchema>;
export type PropertySearchInput = z.infer<typeof propertySearchSchema>;
