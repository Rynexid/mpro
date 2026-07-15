import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/auth-layout";
import { AuthHeader } from "@/components/auth/auth-header";
import { AuthCard } from "@/components/auth/auth-card";
import { VerifyEmailDisplay } from "@/components/auth/verify-email-display";

export const metadata: Metadata = {
  title: "Verifikasi Email",
  description: "Verifikasi email Anda untuk mengaktifkan akun Maha Properti.",
};

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;

  return (
    <AuthLayout>
      <div className="space-y-8">
        <AuthHeader
          title="Verifikasi Email"
          description="Kami telah mengirimkan tautan verifikasi ke email Anda."
        />
        <AuthCard>
          <VerifyEmailDisplay email={email ?? ""} />
        </AuthCard>
      </div>
    </AuthLayout>
  );
}
