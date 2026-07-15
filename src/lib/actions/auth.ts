"use server";

import { auth } from "@/lib/auth";

/**
 * Request a password reset link for the given email address.
 * Better Auth stores a verification token in the `verifications` table.
 */
export async function forgotPassword(
  email: string,
): Promise<{ error?: string }> {
  try {
    const result = await auth.api.requestPasswordReset({
      body: {
        email,
        redirectTo: "/reset-password",
      },
    });
    if (!result) {
      return { error: "Gagal mengirim email reset." };
    }
    return {};
  } catch {
    return { error: "Terjadi kesalahan. Silakan coba lagi." };
  }
}

/**
 * Reset the user's password using a valid verification token.
 */
export async function resetPassword(
  token: string,
  newPassword: string,
): Promise<{ error?: string }> {
  try {
    const result = await auth.api.resetPassword({
      body: {
        newPassword,
        token,
      },
    });
    if (!result) {
      return { error: "Token tidak valid atau sudah kedaluwarsa." };
    }
    return {};
  } catch {
    return { error: "Terjadi kesalahan. Silakan coba lagi." };
  }
}

/**
 * Resend the email verification link for the given email address.
 */
export async function resendVerification(
  email: string,
): Promise<{ error?: string }> {
  try {
    const result = await auth.api.sendVerificationEmail({
      body: {
        email,
        callbackURL: "/verify-email",
      },
    });
    if (!result) {
      return { error: "Gagal mengirim email verifikasi." };
    }
    return {};
  } catch {
    return { error: "Terjadi kesalahan. Silakan coba lagi." };
  }
}
