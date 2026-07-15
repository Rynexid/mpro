"use client";

import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormErrorProps {
  message: string;
  className?: string;
}

export function FormError({ message, className }: FormErrorProps) {
  return (
    <div
      role="alert"
      aria-live="polite"
      className={cn(
        "bg-destructive/10 text-destructive flex items-start gap-2 rounded-md px-3 py-2 text-sm",
        className,
      )}
    >
      <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
      <span>{message}</span>
    </div>
  );
}
