import { z } from "zod";

export const PASSWORD_MIN_LENGTH = 8;

export const PASSWORD_RULES = [
  { id: "length", label: "Minimal 8 karakter" },
  { id: "uppercase", label: "Huruf besar (A-Z)" },
  { id: "lowercase", label: "Huruf kecil (a-z)" },
  { id: "number", label: "Angka (0-9)" },
] as const;

export const passwordSchema = z
  .string()
  .min(PASSWORD_MIN_LENGTH, {
    message: `Password minimal ${PASSWORD_MIN_LENGTH} karakter.`,
  })
  .regex(/[A-Z]/, { message: "Password harus mengandung huruf besar." })
  .regex(/[a-z]/, { message: "Password harus mengandung huruf kecil." })
  .regex(/[0-9]/, { message: "Password harus mengandung angka." });

export const loginSchema = z.object({
  email: z.string().min(1, { message: "Email wajib diisi." }).email({
    message: "Format email tidak valid.",
  }),
  password: z.string().min(1, { message: "Password wajib diisi." }),
  rememberMe: z.boolean().optional().default(false),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Nama lengkap minimal 2 karakter." })
      .max(80, { message: "Nama terlalu panjang." }),
    email: z.string().min(1, { message: "Email wajib diisi." }).email({
      message: "Format email tidak valid.",
    }),
    password: passwordSchema,
    confirmPassword: z.string().min(1, { message: "Konfirmasi password." }),
    terms: z.literal(true, {
      message: "Anda harus menyetujui syarat dan ketentuan.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password dan konfirmasi tidak cocok.",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, { message: "Email wajib diisi." }).email({
    message: "Format email tidak valid.",
  }),
});

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string().min(1, { message: "Konfirmasi password." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password dan konfirmasi tidak cocok.",
    path: ["confirmPassword"],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

/**
 * Lightweight, dependency-free password strength check used by the Better Auth
 * server-side hook to guarantee the policy cannot be bypassed client-side.
 */
export function isStrongPassword(password: string): {
  success: boolean;
  errors: { path: string; message: string }[];
} {
  const errors: { path: string; message: string }[] = [];
  if (password.length < PASSWORD_MIN_LENGTH) {
    errors.push({
      path: "password",
      message: `Password minimal ${PASSWORD_MIN_LENGTH} karakter.`,
    });
  }
  if (!/[A-Z]/.test(password)) {
    errors.push({
      path: "password",
      message: "Password harus mengandung huruf besar.",
    });
  }
  if (!/[a-z]/.test(password)) {
    errors.push({
      path: "password",
      message: "Password harus mengandung huruf kecil.",
    });
  }
  if (!/[0-9]/.test(password)) {
    errors.push({
      path: "password",
      message: "Password harus mengandung angka.",
    });
  }
  return { success: errors.length === 0, errors };
}
