import { z } from "zod";

export const userRegisterSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(8, "Password minimal 8 karakter"),
  phone: z.string().optional().nullable(),
});

export const userLoginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(1, "Password wajib diisi"),
});

export const userUpdateSchema = z.object({
  name: z.string().min(2).optional(),
  phone: z.string().optional().nullable(),
  image: z.string().url().optional().nullable(),
});

export const passwordResetSchema = z
  .object({
    password: z.string().min(8, "Password minimal 8 karakter"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
  });

export const categorySchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().optional().nullable(),
  parentId: z.string().optional().nullable(),
  sortOrder: z.number().int().default(0),
});

export const propertyTypeSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  icon: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  sortOrder: z.number().int().default(0),
});

export const locationSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  provinceId: z.string().optional(),
  cityId: z.string().optional(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
});

export const inquirySchema = z.object({
  propertyId: z.string().min(1, "Properti wajib dipilih"),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(5),
  message: z.string().min(5),
});

export type UserRegisterInput = z.infer<typeof userRegisterSchema>;
export type UserLoginInput = z.infer<typeof userLoginSchema>;
export type UserUpdateInput = z.infer<typeof userUpdateSchema>;
export type CategoryInput = z.infer<typeof categorySchema>;
export type PropertyTypeInput = z.infer<typeof propertyTypeSchema>;
export type LocationInput = z.infer<typeof locationSchema>;
export type InquiryInput = z.infer<typeof inquirySchema>;
