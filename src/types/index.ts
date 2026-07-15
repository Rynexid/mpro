import type { InferSelectModel } from "drizzle-orm";
import type {
  users,
  properties,
  propertyImages,
  propertyFacilities,
  categories,
  propertyTypes,
  provinces,
  cities,
  districts,
  articles,
  articleCategories,
  favorites,
  inquiries,
  settings,
  notifications,
} from "@/lib/db/schema";

export type User = InferSelectModel<typeof users>;
export type Property = InferSelectModel<typeof properties>;
export type PropertyImage = InferSelectModel<typeof propertyImages>;
export type PropertyFacility = InferSelectModel<typeof propertyFacilities>;
export type Category = InferSelectModel<typeof categories>;
export type PropertyType = InferSelectModel<typeof propertyTypes>;
export type Province = InferSelectModel<typeof provinces>;
export type City = InferSelectModel<typeof cities>;
export type District = InferSelectModel<typeof districts>;
export type Article = InferSelectModel<typeof articles>;
export type ArticleCategory = InferSelectModel<typeof articleCategories>;
export type Favorite = InferSelectModel<typeof favorites>;
export type Inquiry = InferSelectModel<typeof inquiries>;
export type Setting = InferSelectModel<typeof settings>;
export type Notification = InferSelectModel<typeof notifications>;

export type PropertyWithDetails = Property & {
  propertyType: PropertyType;
  city: City | null;
  district: District | null;
  province: Province | null;
  images: PropertyImage[];
  facilities: PropertyFacility[];
  agent: User | null;
};

export type ArticleWithDetails = Article & {
  category: ArticleCategory;
  author: User;
};

export type PropertySearchParams = {
  query?: string;
  status?: "sale" | "rent";
  propertyType?: string;
  provinceId?: string;
  cityId?: string;
  districtId?: string;
  minPrice?: number;
  maxPrice?: number;
  minLandArea?: number;
  maxLandArea?: number;
  minBuildingArea?: number;
  maxBuildingArea?: number;
  bedrooms?: number;
  bathrooms?: number;
  certificate?: string;
  furnished?: string;
  condition?: string;
  sort?: "latest" | "price_asc" | "price_desc" | "popular";
  page?: number;
  limit?: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};
