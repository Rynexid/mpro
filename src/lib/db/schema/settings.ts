import { text, timestamp } from "drizzle-orm/pg-core";
import { mpro } from "./mpro-schema";

export const settings = mpro.table("settings", {
  id: text("id").primaryKey(),
  key: text("key").notNull().unique(),
  value: text("value"),
  group: text("group").notNull().default("general"),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
