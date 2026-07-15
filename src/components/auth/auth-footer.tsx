import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface AuthFooterProps {
  prompt: string;
  linkLabel: string;
  href: string;
  className?: string;
}

export function AuthFooter({
  prompt,
  linkLabel,
  href,
  className,
}: AuthFooterProps) {
  return (
    <p className={cn("text-muted-foreground text-center text-sm", className)}>
      {prompt}{" "}
      <Link
        href={href}
        className="text-primary font-medium hover:underline focus-visible:ring-ring rounded-sm focus-visible:ring-1 focus-visible:outline-none"
      >
        {linkLabel}
      </Link>
    </p>
  );
}
