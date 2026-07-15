"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/shared/button";
import { cn } from "@/lib/utils";

interface SocialLoginButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  provider: string;
  pending?: boolean;
}

export function SocialLoginButton({
  icon,
  provider,
  pending,
  className,
  disabled,
  children,
  ...props
}: SocialLoginButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      className={cn("h-11 w-full gap-3 text-sm font-medium", className)}
      disabled={disabled || pending}
      aria-label={`Lanjut dengan ${provider}`}
      {...props}
    >
      {pending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <span className="flex h-5 w-5 items-center justify-center">{icon}</span>
      )}
      {children}
    </Button>
  );
}
