import {
  text,
  timestamp,
  integer,
  decimal,
  boolean,
  bigint,
} from "drizzle-orm/pg-core";
import { mpro } from "./mpro-schema";
import { users } from "./users";
import { propertyTypes } from "./categories";
import { cities, districts, provinces } from "./locations";

export const propertyStatusEnum = mpro.enum("property_status", [
  "sale",
  "rent",
]);

export const propertyConditionEnum = mpro.enum("property_condition", [
  "baru",
  "bekas",
]);

export const certificateTypeEnum = mpro.enum("certificate_type", [
  "SHM",
  "HGB",
  "SHGB",
  "AJB",
  "Lainnya",
]);

export const furnishedEnum = mpro.enum("furnished", [
  "furnished",
  "semi_furnished",
  "unfurnished",
]);

export const properties = mpro.table("properties", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  status: propertyStatusEnum("status").notNull(),
  propertyTypeId: text("property_type_id")
    .notNull()
    .references(() => propertyTypes.id),
  price: bigint("price", { mode: "number" }).notNull(),
  priceNegotiable: boolean("price_negotiable").notNull().default(false),
  landArea: integer("land_area"),
  buildingArea: integer("building_area"),
  bedrooms: integer("bedrooms"),
  bathrooms: integer("bathrooms"),
  floors: integer("floors"),
  carport: integer("carport"),
  certificate: certificateTypeEnum("certificate"),
  condition: propertyConditionEnum("condition"),
  furnished: furnishedEnum("furnished"),
  address: text("address"),
  latitude: text("latitude"),
  longitude: text("longitude"),
  provinceId: text("province_id").references(() => provinces.id),
  cityId: text("city_id").references(() => cities.id),
  districtId: text("district_id").references(() => districts.id),
  agentId: text("agent_id").references(() => users.id),
  featured: boolean("featured").notNull().default(false),
  verified: boolean("verified").notNull().default(false),
  officialDeveloper: boolean("official_developer").notNull().default(false),
  status_published: boolean("status_published").notNull().default(true),
  viewCount: integer("view_count").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const propertyImages = mpro.table("property_images", {
  id: text("id").primaryKey(),
  propertyId: text("property_id")
    .notNull()
    .references(() => properties.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  alt: text("alt"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const propertyFacilities = mpro.table("property_facilities", {
  id: text("id").primaryKey(),
  propertyId: text("property_id")
    .notNull()
    .references(() => properties.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  icon: text("icon"),
});

export const favorites = mpro.table("favorites", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  propertyId: text("property_id")
    .notNull()
    .references(() => properties.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const inquiries = mpro.table("inquiries", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id),
  propertyId: text("property_id").references(() => properties.id, {
    onDelete: "cascade",
  }),
  type: text("type").notNull().default("property"),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  message: text("message").notNull(),
  read: boolean("read").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
