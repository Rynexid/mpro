"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, Loader2, Check } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/shared/button";
import { Checkbox } from "@/components/shared/checkbox";
import { GoogleIcon } from "@/components/auth/google-icon";
import { SocialLoginButton } from "@/components/auth/social-login-button";
import { PasswordInput } from "@/components/auth/password-input";
import { FormField } from "@/components/auth/form-field";
import { AuthDivider } from "@/components/auth/auth-divider";
import { AuthFooter } from "@/components/auth/auth-footer";
import {
  registerSchema,
  PASSWORD_RULES,
  isStrongPassword,
  type RegisterInput,
} from "@/lib/validations/auth";
import { cn } from "@/lib/utils";

type Errors = Partial<Record<keyof RegisterInput, string>>;

export function RegisterForm() {
  const router = useRouter();
  const [values, setValues] = React.useState<RegisterInput>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false as unknown as true,
  });
  const [errors, setErrors] = React.useState<Errors>({});
  const [formError, setFormError] = React.useState<string | null>(null);
  const [pending, startTransition] = React.useTransition();

  const passwordChecks = React.useMemo(
    () => ({
      length: values.password.length >= 8,
      uppercase: /[A-Z]/.test(values.password),
      lowercase: /[a-z]/.test(values.password),
      number: /[0-9]/.test(values.password),
    }),
    [values.password],
  );

  function update<K extends keyof RegisterInput>(
    key: K,
    value: RegisterInput[K],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    setFormError(null);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    const parsed = registerSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof RegisterInput;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    startTransition(async () => {
      const res = await authClient.signUp.email({
        name: parsed.data.name,
        email: parsed.data.email,
        password: parsed.data.password,
      });
      if (res.error) {
        setFormError(
          res.error.message ??
            "Gagal membuat akun. Silakan coba lagi.",
        );
        return;
      }
      const redirect =
        new URLSearchParams(window.location.search).get("redirect") ?? "";
      if (redirect.startsWith("/")) {
        router.push(redirect);
      } else {
        const session = await authClient.getSession();
        const username = (session?.data?.user as Record<string, unknown>)?.username;
        router.push(username ? `/${username}` : "/dashboard");
      }
      router.refresh();
    });
  }

  function onGoogle() {
    setFormError(null);
    startTransition(async () => {
      const res = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/auth/callback",
      });
      const url = (res.data as { url?: string } | undefined)?.url;
      if (url) window.location.href = url;
      else if (res.error) {
        setFormError(
          res.error.message ?? "Gagal daftar dengan Google. Silakan coba lagi.",
        );
      }
    });
  }

  return (
    <div className="space-y-6">
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <FormField label="Nama Lengkap" htmlFor="name" required error={errors.name}>
          <div className="relative">
            <User className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <input
              id="name"
              type="text"
              autoComplete="name"
              required
              value={values.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Nama lengkap Anda"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              className="border-input file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-11 w-full rounded-md border bg-transparent pl-9 pr-3 py-2 text-base shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            />
          </div>
        </FormField>

        <FormField label="Email" htmlFor="email" required error={errors.email}>
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

        <FormField label="Password" htmlFor="password" required error={errors.password}>
          <PasswordInput
            id="password"
            autoComplete="new-password"
            required
            value={values.password}
            onChange={(e) => update("password", e.target.value)}
            placeholder="Minimal 8 karakter"
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? "password-error" : undefined}
            icon={<Lock className="h-4 w-4" />}
          />
          <ul className="mt-2 grid grid-cols-2 gap-1" aria-hidden>
            {PASSWORD_RULES.map((rule) => {
              const met = passwordChecks[rule.id as keyof typeof passwordChecks];
              return (
                <li
                  key={rule.id}
                  className={cn(
                    "flex items-center gap-1.5 text-xs transition-colors",
                    met
                      ? "text-emerald-600 dark:text-emerald-500"
                      : "text-muted-foreground",
                  )}
                >
                  <Check
                    className={cn(
                      "h-3.5 w-3.5 shrink-0",
                      met ? "opacity-100" : "opacity-30",
                    )}
                  />
                  {rule.label}
                </li>
              );
            })}
          </ul>
        </FormField>

        <FormField
          label="Konfirmasi Password"
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
            placeholder="Ulangi password"
            aria-invalid={!!errors.confirmPassword}
            aria-describedby={
              errors.confirmPassword ? "confirmPassword-error" : undefined
            }
            icon={<Lock className="h-4 w-4" />}
          />
        </FormField>

        <div className="space-y-2">
          <label className="flex items-start gap-2 text-sm">
            <Checkbox
              id="terms"
              checked={values.terms === true}
              onCheckedChange={(checked) =>
                update("terms", checked === true ? true : (false as unknown as true))
              }
              aria-invalid={!!errors.terms}
            />
            <span className="text-muted-foreground leading-tight">
              Saya menyetujui{" "}
              <Link
                href="/syarat-ketentuan"
                className="text-primary hover:underline"
                target="_blank"
              >
                Syarat &amp; Ketentuan
              </Link>{" "}
              dan{" "}
              <Link
                href="/kebijakan-privasi"
                className="text-primary hover:underline"
                target="_blank"
              >
                Kebijakan Privasi
              </Link>
              .
            </span>
          </label>
          {errors.terms ? (
            <p role="alert" className="text-destructive text-sm">
              {errors.terms}
            </p>
          ) : null}
        </div>

        {formError ? (
          <p
            role="alert"
            aria-live="polite"
            className="bg-destructive/10 text-destructive rounded-md px-3 py-2 text-sm"
          >
            {formError}
          </p>
        ) : null}

        <Button type="submit" size="lg" className="h-11 w-full" disabled={pending}>
          {pending && <Loader2 className="h-4 w-4 animate-spin" />}
          Buat Akun
        </Button>
      </form>

      <AuthDivider />

      <SocialLoginButton
        provider="Google"
        icon={<GoogleIcon className="h-5 w-5" />}
        pending={pending}
        onClick={onGoogle}
      >
        Lanjut dengan Google
      </SocialLoginButton>

      <AuthFooter
        prompt="Sudah punya akun?"
        linkLabel="Masuk"
        href="/login"
      />
    </div>
  );
}
