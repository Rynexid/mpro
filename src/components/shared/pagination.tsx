"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  buildHref?: (page: number) => string;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  buildHref,
  className,
}: PaginationProps) {
  const pages: (number | "...")[] = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  const go = (page: number) => {
    if (onPageChange) onPageChange(page);
  };

  const prevHref = buildHref?.(currentPage - 1);
  const nextHref = buildHref?.(currentPage + 1);

  return (
    <nav
      className={cn("flex items-center justify-center gap-1", className)}
      aria-label="Pagination"
    >
      {prevHref ? (
        <Link href={prevHref} aria-label="Previous page">
          <Button variant="outline" size="icon" disabled={currentPage <= 1}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </Link>
      ) : (
        <Button
          variant="outline"
          size="icon"
          onClick={() => go(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}
      {pages.map((page, i) =>
        page === "..." ? (
          <span
            key={`ellipsis-${i}`}
            className="flex h-9 w-9 items-center justify-center"
          >
            <MoreHorizontal className="text-muted-foreground h-4 w-4" />
          </span>
        ) : buildHref ? (
          <Link key={page} href={buildHref(page)} aria-label={`Page ${page}`}>
            <Button
              variant={page === currentPage ? "default" : "outline"}
              size="icon"
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </Button>
          </Link>
        ) : (
          <Button
            key={page}
            variant={page === currentPage ? "default" : "outline"}
            size="icon"
            onClick={() => go(page)}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </Button>
        ),
      )}
      {nextHref ? (
        <Link href={nextHref} aria-label="Next page">
          <Button
            variant="outline"
            size="icon"
            disabled={currentPage >= totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      ) : (
        <Button
          variant="outline"
          size="icon"
          onClick={() => go(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </nav>
  );
}
