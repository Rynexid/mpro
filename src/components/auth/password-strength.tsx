"use client";

import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface PasswordStrengthProps {
  password: string;
  className?: string;
}

const rules = [
  { id: "length", label: "Minimal 8 karakter", test: (p: string) => p.length >= 8 },
  { id: "uppercase", label: "Huruf besar (A-Z)", test: (p: string) => /[A-Z]/.test(p) },
  { id: "lowercase", label: "Huruf kecil (a-z)", test: (p: string) => /[a-z]/.test(p) },
  { id: "number", label: "Angka (0-9)", test: (p: string) => /[0-9]/.test(p) },
];

export function PasswordStrength({ password, className }: PasswordStrengthProps) {
  const results = rules.map((rule) => ({
    ...rule,
    met: rule.test(password),
  }));

  const metCount = results.filter((r) => r.met).length;
  const total = results.length;

  if (!password) return null;

  const color =
    metCount === total
      ? "bg-emerald-500"
      : metCount >= total * 0.6
        ? "bg-amber-500"
        : "bg-destructive";

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex gap-1" aria-label={`${metCount} dari ${total} kriteria terpenuhi`}>
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors duration-300",
              i < metCount ? color : "bg-muted",
            )}
          />
        ))}
      </div>
      <ul className="space-y-1">
        {results.map((rule) => (
          <li key={rule.id} className="flex items-center gap-1.5 text-xs">
            {rule.met ? (
              <Check className="text-emerald-500 h-3 w-3 shrink-0" />
            ) : (
              <X className="text-muted-foreground/50 h-3 w-3 shrink-0" />
            )}
            <span className={rule.met ? "text-emerald-600" : "text-muted-foreground"}>
              {rule.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
