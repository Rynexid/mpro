import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/auth-layout";
import { AuthHeader } from "@/components/auth/auth-header";
import { AuthCard } from "@/components/auth/auth-card";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export const metadata: Metadata = {
  title: "Lupa Password",
  description: "Reset password akun Mahaproperti Anda.",
};

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <div className="space-y-8">
        <AuthHeader
          title="Lupa Password"
          description="Masukkan email Anda dan kami akan mengirimkan tautan untuk reset password."
        />
        <AuthCard>
          <ForgotPasswordForm />
        </AuthCard>
      </div>
    </AuthLayout>
  );
}
