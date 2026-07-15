"use client";

import * as React from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Button } from "@/components/shared/button";
import { AuthFooter } from "@/components/auth/auth-footer";
import { FormField } from "@/components/auth/form-field";
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-success";
import { LoadingButton } from "@/components/auth/loading-button";
import { forgotPasswordSchema, type ForgotPasswordInput } from "@/lib/validations/auth";
import { forgotPassword } from "@/lib/actions/auth";

type Errors = Partial<Record<keyof ForgotPasswordInput, string>>;

export function ForgotPasswordForm() {
  const [values, setValues] = React.useState<ForgotPasswordInput>({ email: "" });
  const [errors, setErrors] = React.useState<Errors>({});
  const [formError, setFormError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);
  const [pending, startTransition] = React.useTransition();

  function update<K extends keyof ForgotPasswordInput>(
    key: K,
    value: ForgotPasswordInput[K],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    setFormError(null);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    const parsed = forgotPasswordSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof ForgotPasswordInput;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    startTransition(async () => {
      const result = await forgotPassword(parsed.data.email);
      if (result.error) {
        setFormError(result.error);
        return;
      }
      setSuccess(true);
    });
  }

  if (success) {
    return (
      <div className="space-y-6 text-center">
        <div className="bg-primary/10 mx-auto flex h-16 w-16 items-center justify-center rounded-full">
          <Mail className="text-primary h-8 w-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Cek email Anda</h3>
          <p className="text-muted-foreground text-sm">
            Kami telah mengirimkan tautan reset password ke{" "}
            <span className="font-medium text-foreground">{values.email}</span>.
            Periksa inbox dan ikuti petunjuk di dalamnya.
          </p>
        </div>
        <LoadingButton
          variant="outline"
          className="w-full"
          loading={pending}
          onClick={() => {
            startTransition(async () => {
              const result = await forgotPassword(values.email);
              if (result.error) setFormError(result.error);
            });
          }}
        >
          Kirim ulang email
        </LoadingButton>
        {formError ? <FormError message={formError} /> : null}
        <Link
          href="/login"
          className="text-primary hover:underline text-sm font-medium inline-block"
        >
          Kembali ke masuk
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <FormField
          label="Email"
          htmlFor="email"
          required
          error={errors.email}
        >
          <div className="relative">
            <Mail className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={values.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="nama@email.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className="border-input file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-11 w-full rounded-md border bg-transparent pl-9 pr-3 py-2 text-base shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            />
          </div>
        </FormField>

        {formError ? <FormError message={formError} /> : null}

        <LoadingButton type="submit" size="lg" className="h-11 w-full" loading={pending}>
          Kirim tautan reset
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
