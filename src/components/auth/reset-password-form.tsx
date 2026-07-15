"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { PasswordInput } from "@/components/auth/password-input";
import { FormField } from "@/components/auth/form-field";
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-success";
import { LoadingButton } from "@/components/auth/loading-button";
import { PasswordStrength } from "@/components/auth/password-strength";
import { AuthFooter } from "@/components/auth/auth-footer";
import { Lock } from "lucide-react";
import { resetPasswordSchema, type ResetPasswordInput } from "@/lib/validations/auth";
import { resetPassword } from "@/lib/actions/auth";

type Errors = Partial<Record<keyof ResetPasswordInput, string>>;

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [values, setValues] = React.useState<ResetPasswordInput>({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = React.useState<Errors>({});
  const [formError, setFormError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);
  const [pending, startTransition] = React.useTransition();

  function update<K extends keyof ResetPasswordInput>(
    key: K,
    value: ResetPasswordInput[K],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    setFormError(null);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    if (!token) {
      setFormError("Token reset tidak valid atau sudah kedaluwarsa.");
      return;
    }

    const parsed = resetPasswordSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof ResetPasswordInput;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    startTransition(async () => {
      const result = await resetPassword(token, parsed.data.password);
      if (result.error) {
        setFormError(result.error);
        return;
      }
      setSuccess(true);
    });
  }

  if (!token) {
    return (
      <div className="space-y-6 text-center">
        <FormError message="Token reset tidak ditemukan. Silakan minta tautan reset baru." />
        <Link
          href="/forgot-password"
          className="text-primary hover:underline text-sm font-medium"
        >
          Minta tautan reset baru
        </Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="space-y-6 text-center">
        <div className="bg-emerald-500/10 mx-auto flex h-16 w-16 items-center justify-center rounded-full">
          <CheckCircle2 className="text-emerald-500 h-8 w-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Password berhasil diubah</h3>
          <p className="text-muted-foreground text-sm">
            Password Anda telah berhasil diperbarui. Silakan masuk dengan password baru.
          </p>
        </div>
        <Link href="/login">
          <LoadingButton className="w-full" size="lg">
            Masuk sekarang
          </LoadingButton>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <FormField
          label="Password baru"
          htmlFor="password"
          required
          error={errors.password}
        >
          <PasswordInput
            id="password"
            autoComplete="new-password"
            required
            value={values.password}
            onChange={(e) => update("password", e.target.value)}
            placeholder="••••••••"
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? "password-error" : undefined}
            icon={<Lock className="h-4 w-4" />}
          />
        </FormField>

        <PasswordStrength password={values.password} />

        <FormField
          label="Konfirmasi password"
          htmlFor="confirmPassword"
          required
          error={errors.confirmPassword}
        >
          <PasswordInput
            id="confirmPassword"
            autoComplete="new-password"
            required
            value={values.confirmPassword}
            onChange={(e) => update("confirmPassword", e.target.value)}
            placeholder="••••••••"
            aria-invalid={!!errors.confirmPassword}
            aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
            icon={<Lock className="h-4 w-4" />}
          />
        </FormField>

        {formError ? <FormError message={formError} /> : null}

        <LoadingButton type="submit" size="lg" className="h-11 w-full" loading={pending}>
          Reset password
        </LoadingButton>
      </form>

      <AuthFooter
        prompt="Ingat password Anda?"
        linkLabel="Masuk"
        href="/login"
      />
    </div>
  );
}
