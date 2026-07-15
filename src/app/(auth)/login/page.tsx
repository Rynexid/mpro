import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/auth-layout";
import { AuthHeader } from "@/components/auth/auth-header";
import { AuthCard } from "@/components/auth/auth-card";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Masuk",
  description: "Masuk ke akun Mahaproperti Anda dengan aman.",
};

export default function LoginPage() {
  return (
    <AuthLayout>
      <div className="space-y-8">
        <AuthHeader
          title="Welcome Back"
          description="Continue to your Maha Properti account."
        />
        <AuthCard>
          <LoginForm />
        </AuthCard>
      </div>
    </AuthLayout>
  );
}
