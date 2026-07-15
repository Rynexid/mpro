"use client";

import * as React from "react";
import Link from "next/link";
import { Mail, CheckCircle2, ArrowLeft } from "lucide-react";
import { LoadingButton } from "@/components/auth/loading-button";
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-success";
import { resendVerification } from "@/lib/actions/auth";

interface VerifyEmailDisplayProps {
  email: string;
}

export function VerifyEmailDisplay({ email }: VerifyEmailDisplayProps) {
  const [countdown, setCountdown] = React.useState(60);
  const [pending, startTransition] = React.useTransition();
  const [formError, setFormError] = React.useState<string | null>(null);
  const [resent, setResent] = React.useState(false);

  React.useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  function onResend() {
    setFormError(null);
    startTransition(async () => {
      const result = await resendVerification(email);
      if (result.error) {
        setFormError(result.error);
        return;
      }
      setResent(true);
      setCountdown(60);
    });
  }

  return (
    <div className="space-y-6 text-center">
      <div className="bg-primary/10 mx-auto flex h-16 w-16 items-center justify-center rounded-full">
        <Mail className="text-primary h-8 w-8" />
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Verifikasi email Anda</h3>
        <p className="text-muted-foreground text-sm">
          Kami telah mengirimkan tautan verifikasi ke{" "}
          <span className="font-medium text-foreground">{email}</span>.
          Periksa inbox dan klik tautan untuk mengaktifkan akun Anda.
        </p>
      </div>

      {resent ? (
        <FormSuccess message="Email verifikasi telah dikirim ulang." />
      ) : null}

      {formError ? <FormError message={formError} /> : null}

      <LoadingButton
        variant="outline"
        className="w-full"
        loading={pending}
        disabled={countdown > 0}
        onClick={onResend}
      >
        {countdown > 0
          ? `Kirim ulang dalam ${countdown}s`
          : "Kirim ulang email verifikasi"}
      </LoadingButton>

      <Link
        href="/login"
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali ke masuk
      </Link>
    </div>
  );
}
