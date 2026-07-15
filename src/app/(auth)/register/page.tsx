import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/auth-layout";
import { AuthHeader } from "@/components/auth/auth-header";
import { AuthCard } from "@/components/auth/auth-card";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Daftar",
  description: "Buat akun Mahaproperti baru dan mulai menjelajahi properti.",
};

export default function RegisterPage() {
  return (
    <AuthLayout>
      <div className="space-y-8">
        <AuthHeader
          title="Create Account"
          description="Join Maha Properti today."
        />
        <AuthCard>
          <RegisterForm />
        </AuthCard>
      </div>
    </AuthLayout>
  );
}
