"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/shared/button";
import { Checkbox } from "@/components/shared/checkbox";
import { GoogleIcon } from "@/components/auth/google-icon";
import { SocialLoginButton } from "@/components/auth/social-login-button";
import { PasswordInput } from "@/components/auth/password-input";
import { FormField } from "@/components/auth/form-field";
import { AuthDivider } from "@/components/auth/auth-divider";
import { AuthFooter } from "@/components/auth/auth-footer";
import { loginSchema, type LoginInput } from "@/lib/validations/auth";

type Errors = Partial<Record<keyof LoginInput, string>>;

export function LoginForm() {
  const router = useRouter();
  const [values, setValues] = React.useState<LoginInput>({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = React.useState<Errors>({});
  const [formError, setFormError] = React.useState<string | null>(null);
  const [pending, startTransition] = React.useTransition();

  function update<K extends keyof LoginInput>(
    key: K,
    value: LoginInput[K],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    setFormError(null);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    const parsed = loginSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof LoginInput;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    startTransition(async () => {
      const res = await authClient.signIn.email({
        email: parsed.data.email,
        password: parsed.data.password,
        rememberMe: parsed.data.rememberMe,
      });
      if (res.error) {
        setFormError(
          res.error.message ??
            "Email atau password salah. Silakan coba lagi.",
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
          res.error.message ?? "Gagal masuk dengan Google. Silakan coba lagi.",
        );
      }
    });
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

        <FormField
          label="Password"
          htmlFor="password"
          required
          error={errors.password}
          hint={
            <Link
              href="/forgot-password"
              className="text-primary hover:underline"
            >
              Lupa password?
            </Link>
          }
        >
          <PasswordInput
            id="password"
            autoComplete="current-password"
            required
            value={values.password}
            onChange={(e) => update("password", e.target.value)}
            placeholder="••••••••"
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? "password-error" : undefined}
            icon={<Lock className="h-4 w-4" />}
          />
        </FormField>

        <label className="flex items-center gap-2 text-sm">
          <Checkbox
            id="rememberMe"
            checked={values.rememberMe}
            onCheckedChange={(checked) => update("rememberMe", checked === true)}
          />
          <span className="text-muted-foreground">Ingat saya</span>
        </label>

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
          Masuk
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
        prompt="Belum punya akun?"
        linkLabel="Buat Akun"
        href="/register"
      />
    </div>
  );
}
