import { z } from "zod";

export const articleCreateSchema = z.object({
  title: z.string().min(3, "Judul minimal 3 karakter").max(200),
  excerpt: z.string().max(500).optional().nullable(),
  content: z.string().min(10, "Konten minimal 10 karakter"),
  coverImage: z.string().url().optional().nullable(),
  categoryId: z.string().min(1, "Kategori wajib dipilih"),
  published: z.boolean().default(false),
  metaTitle: z.string().max(200).optional().nullable(),
  metaDescription: z.string().max(500).optional().nullable(),
  tagIds: z.array(z.string()).optional(),
});

export const articleUpdateSchema = articleCreateSchema.partial();

export const articleSearchSchema = z.object({
  query: z.string().optional(),
  category: z.string().optional(),
  tag: z.string().optional(),
  published: z.boolean().default(true),
  sort: z.enum(["latest", "popular"]).default("latest"),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(50).default(9),
});

export type ArticleCreateInput = z.infer<typeof articleCreateSchema>;
export type ArticleUpdateInput = z.infer<typeof articleUpdateSchema>;
export type ArticleSearchInput = z.infer<typeof articleSearchSchema>;
