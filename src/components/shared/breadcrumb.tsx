import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav
      className={cn(
        "text-muted-foreground flex items-center space-x-1 text-sm",
        className,
      )}
      aria-label="Breadcrumb"
    >
      <Link
        href="/"
        className="hover:text-foreground flex items-center gap-1 transition-colors"
      >
        <Home className="h-4 w-4" />
        <span>Beranda</span>
      </Link>
      {items.map((item, index) => (
        <span key={index} className="flex items-center space-x-1">
          <ChevronRight className="h-4 w-4" />
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
