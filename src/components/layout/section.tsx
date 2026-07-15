import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  as?: "section" | "div" | "article";
  id?: string;
}

export function Section({
  children,
  className,
  as: Component = "section",
  id,
}: SectionProps) {
  return (
    <Component id={id} className={cn("py-16 md:py-24", className)}>
      {children}
    </Component>
  );
}
