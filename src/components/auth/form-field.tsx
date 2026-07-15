"use client";

import * as React from "react";
import { Label } from "@/components/shared/label";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: React.ReactNode;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function FormField({
  label,
  htmlFor,
  error,
  hint,
  required,
  className,
  children,
}: FormFieldProps) {
  const errorId = `${htmlFor}-error`;
  const hintId = `${htmlFor}-hint`;

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <Label htmlFor={htmlFor}>
          {label}
          {required ? <span className="text-destructive ml-0.5">*</span> : null}
        </Label>
        {hint ? (
          <span id={hintId} className="text-muted-foreground text-xs">
            {hint}
          </span>
        ) : null}
      </div>
      {children}
      {error ? (
        <p
          id={errorId}
          role="alert"
          aria-live="polite"
          className="text-destructive text-sm"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
