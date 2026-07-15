import { text, timestamp } from "drizzle-orm/pg-core";
import { mpro } from "./mpro-schema";
import { users } from "./users";
import { properties } from "./properties";

export const recentlyViewed = mpro.table("recently_viewed", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  propertyId: text("property_id")
    .notNull()
    .references(() => properties.id, { onDelete: "cascade" }),
  viewedAt: timestamp("viewed_at").notNull().defaultNow(),
});
