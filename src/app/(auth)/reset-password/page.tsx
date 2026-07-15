import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthLayout } from "@/components/auth/auth-layout";
import { AuthHeader } from "@/components/auth/auth-header";
import { AuthCard } from "@/components/auth/auth-card";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Buat password baru untuk akun Mahaproperti Anda.",
};

export default function ResetPasswordPage() {
  return (
    <AuthLayout>
      <div className="space-y-8">
        <AuthHeader
          title="Reset Password"
          description="Masukkan password baru Anda di bawah ini."
        />
        <AuthCard>
          <Suspense>
            <ResetPasswordForm />
          </Suspense>
        </AuthCard>
      </div>
    </AuthLayout>
  );
}
