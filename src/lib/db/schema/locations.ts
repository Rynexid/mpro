import { text, timestamp, integer } from "drizzle-orm/pg-core";
import { mpro } from "./mpro-schema";

export const provinces = mpro.table("provinces", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const cities = mpro.table("cities", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  provinceId: text("province_id")
    .notNull()
    .references(() => provinces.id, { onDelete: "cascade" }),
  latitude: text("latitude"),
  longitude: text("longitude"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const districts = mpro.table("districts", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  cityId: text("city_id")
    .notNull()
    .references(() => cities.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
