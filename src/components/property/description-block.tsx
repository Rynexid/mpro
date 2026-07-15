"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface DescriptionBlockProps {
  text: string;
  className?: string;
}

export function DescriptionBlock({ text, className }: DescriptionBlockProps) {
  const [expanded, setExpanded] = React.useState(false);
  const isLong = text.length > 420;

  return (
    <div
      className={cn("text-muted-foreground text-sm md:text-base", className)}
    >
      <p className="leading-relaxed whitespace-pre-line">
        {isLong && !expanded ? `${text.slice(0, 420).trimEnd()}…` : text}
      </p>
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="text-primary mt-3 inline-flex min-h-[44px] items-center text-sm font-medium hover:underline"
        >
          {expanded ? "Tampilkan Lebih Sedikit" : "Baca Selengkapnya"}
        </button>
      )}
    </div>
  );
}
