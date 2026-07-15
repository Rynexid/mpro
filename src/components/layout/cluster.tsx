import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface ClusterProps {
  children: ReactNode;
  className?: string;
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  wrap?: boolean;
  as?: "div" | "nav" | "ul";
  align?: "start" | "center" | "end";
  justify?: "start" | "center" | "end" | "between";
}

const gapMap = {
  none: "gap-0",
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
};

const alignMap = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
};

const justifyMap = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
};

export function Cluster({
  children,
  className,
  gap = "md",
  wrap = true,
  as: Component = "div",
  align = "center",
  justify = "start",
}: ClusterProps) {
  return (
    <Component
      className={cn(
        "flex",
        wrap && "flex-wrap",
        gapMap[gap],
        alignMap[align],
        justifyMap[justify],
        className,
      )}
    >
      {children}
    </Component>
  );
}
