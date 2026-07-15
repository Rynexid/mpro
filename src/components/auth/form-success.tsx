"use client";

import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormSuccessProps {
  message: string;
  className?: string;
}

export function FormSuccess({ message, className }: FormSuccessProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "bg-emerald-50 text-emerald-700 flex items-start gap-2 rounded-md px-3 py-2 text-sm dark:bg-emerald-950/50 dark:text-emerald-400",
        className,
      )}
    >
      <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
      <span>{message}</span>
    </div>
  );
}
