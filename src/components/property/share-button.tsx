"use client";

import * as React from "react";
import { Share2, Check } from "lucide-react";
import { Button } from "@/components/shared/button";

interface ShareButtonProps {
  title?: string;
  className?: string;
  variant?: "ghost" | "outline" | "default";
  size?: "icon" | "sm" | "lg";
}

export function ShareButton({
  title,
  className,
  variant = "ghost",
  size = "icon",
}: ShareButtonProps) {
  const [copied, setCopied] = React.useState(false);

  const onClick = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      /* ignore */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      onClick={onClick}
      className={className}
      aria-label="Bagikan"
    >
      {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
    </Button>
  );
}
