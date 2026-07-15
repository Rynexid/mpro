import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface StackProps {
  children: ReactNode;
  className?: string;
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  as?: "div" | "section" | "nav" | "ul" | "ol";
}

const gapMap = {
  none: "gap-0",
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
};

export function Stack({
  children,
  className,
  gap = "md",
  as: Component = "div",
}: StackProps) {
  return (
    <Component className={cn("flex flex-col", gapMap[gap], className)}>
      {children}
    </Component>
  );
}
