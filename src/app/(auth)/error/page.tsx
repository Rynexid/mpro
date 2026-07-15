import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { AuthLayout } from "@/components/auth/auth-layout";
import { AuthHeader } from "@/components/auth/auth-header";
import { AuthCard } from "@/components/auth/auth-card";
import { Button } from "@/components/shared/button";

export const metadata: Metadata = {
  title: "Kesalahan",
  description: "Terjadi kesalahan saat memproses permintaan Anda.",
};

const ERROR_MESSAGES: Record<string, string> = {
  configuration: "Terjadi kesalahan konfigurasi server. Silakan hubungi admin.",
  accessdenied: "Akses ditolak. Anda tidak memiliki izin untuk melakukan ini.",
  verification: "Tautan verifikasi sudah kedaluwarsa atau tidak valid.",
  default: "Terjadi kesalahan yang tidak terduga. Silakan coba lagi.",
};

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const message = ERROR_MESSAGES[error ?? ""] ?? ERROR_MESSAGES.default;

  return (
    <AuthLayout>
      <div className="space-y-8">
        <AuthHeader
          title="Kesalahan"
          description="Terjadi masalah saat memproses permintaan Anda."
        />
        <AuthCard>
          <div className="space-y-6 text-center">
            <div className="bg-destructive/10 mx-auto flex h-16 w-16 items-center justify-center rounded-full">
              <AlertTriangle className="text-destructive h-8 w-8" />
            </div>
            <p className="text-muted-foreground text-sm">{message}</p>
            {error ? (
              <p className="text-muted-foreground/60 text-xs">
                Kode kesalahan: {error}
              </p>
            ) : null}
            <Link href="/login">
              <Button className="w-full" size="lg">
                Kembali ke masuk
              </Button>
            </Link>
          </div>
        </AuthCard>
      </div>
    </AuthLayout>
  );
}
