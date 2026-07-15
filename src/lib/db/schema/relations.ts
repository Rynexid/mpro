import { relations } from "drizzle-orm";
import { users, sessions, accounts, verifications } from "./users";
import { provinces, cities, districts } from "./locations";
import { propertyTypes, categories } from "./categories";
import {
  properties,
  propertyImages,
  propertyFacilities,
  favorites,
  inquiries,
} from "./properties";
import { articles, articleCategories, tags, articleTags } from "./articles";
import { recentlyViewed } from "./recently-viewed";

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  accounts: many(accounts),
  properties: many(properties),
  favorites: many(favorites),
  inquiries: many(inquiries),
  articles: many(articles),
  recentlyViewed: many(recentlyViewed),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const verificationsRelations = relations(verifications, ({ many }) => ({
  user: many(users),
}));

export const provincesRelations = relations(provinces, ({ many }) => ({
  cities: many(cities),
  properties: many(properties),
}));

export const citiesRelations = relations(cities, ({ one, many }) => ({
  province: one(provinces, {
    fields: [cities.provinceId],
    references: [provinces.id],
  }),
  districts: many(districts),
  properties: many(properties),
}));

export const districtsRelations = relations(districts, ({ one, many }) => ({
  city: one(cities, { fields: [districts.cityId], references: [cities.id] }),
  properties: many(properties),
}));

export const propertyTypesRelations = relations(propertyTypes, ({ many }) => ({
  properties: many(properties),
}));

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  parent: one(categories, {
    fields: [categories.parentId],
    references: [categories.id],
  }),
  children: many(categories),
}));

export const propertiesRelations = relations(properties, ({ one, many }) => ({
  propertyType: one(propertyTypes, {
    fields: [properties.propertyTypeId],
    references: [propertyTypes.id],
  }),
  province: one(provinces, {
    fields: [properties.provinceId],
    references: [provinces.id],
  }),
  city: one(cities, { fields: [properties.cityId], references: [cities.id] }),
  district: one(districts, {
    fields: [properties.districtId],
    references: [districts.id],
  }),
  agent: one(users, { fields: [properties.agentId], references: [users.id] }),
  images: many(propertyImages),
  facilities: many(propertyFacilities),
  favorites: many(favorites),
  inquiries: many(inquiries),
  recentlyViewed: many(recentlyViewed),
}));

export const propertyImagesRelations = relations(propertyImages, ({ one }) => ({
  property: one(properties, {
    fields: [propertyImages.propertyId],
    references: [properties.id],
  }),
}));

export const propertyFacilitiesRelations = relations(
  propertyFacilities,
  ({ one }) => ({
    property: one(properties, {
      fields: [propertyFacilities.propertyId],
      references: [properties.id],
    }),
  }),
);

export const favoritesRelations = relations(favorites, ({ one }) => ({
  user: one(users, { fields: [favorites.userId], references: [users.id] }),
  property: one(properties, {
    fields: [favorites.propertyId],
    references: [properties.id],
  }),
}));

export const inquiriesRelations = relations(inquiries, ({ one }) => ({
  user: one(users, { fields: [inquiries.userId], references: [users.id] }),
  property: one(properties, {
    fields: [inquiries.propertyId],
    references: [properties.id],
  }),
}));

export const articleCategoriesRelations = relations(
  articleCategories,
  ({ many }) => ({
    articles: many(articles),
  }),
);

export const tagsRelations = relations(tags, ({ many }) => ({
  articleTags: many(articleTags),
}));

export const articlesRelations = relations(articles, ({ one, many }) => ({
  author: one(users, { fields: [articles.authorId], references: [users.id] }),
  category: one(articleCategories, {
    fields: [articles.categoryId],
    references: [articleCategories.id],
  }),
  articleTags: many(articleTags),
}));

export const articleTagsRelations = relations(articleTags, ({ one }) => ({
  article: one(articles, {
    fields: [articleTags.articleId],
    references: [articles.id],
  }),
  tag: one(tags, { fields: [articleTags.tagId], references: [tags.id] }),
}));

export const recentlyViewedRelations = relations(recentlyViewed, ({ one }) => ({
  user: one(users, { fields: [recentlyViewed.userId], references: [users.id] }),
  property: one(properties, {
    fields: [recentlyViewed.propertyId],
    references: [properties.id],
  }),
}));
