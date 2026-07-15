import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { Container } from "./container";

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

export function PageLayout({
  children,
  title,
  description,
  className,
}: PageLayoutProps) {
  return (
    <div className={cn("min-h-screen", className)}>
      {(title || description) && (
        <div className="border-border bg-muted/30 border-b">
          <Container className="py-8 md:py-12">
            {title && (
              <h1 className="text-foreground text-3xl font-bold tracking-tight md:text-4xl">
                {title}
              </h1>
            )}
            {description && (
              <p className="text-muted-foreground mt-2 text-lg">
                {description}
              </p>
            )}
          </Container>
        </div>
      )}
      {children}
    </div>
  );
}
