import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface ContentWrapperProps {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "full";
}

const sizeMap = {
  sm: "max-w-2xl",
  md: "max-w-4xl",
  lg: "max-w-6xl",
  full: "max-w-full",
};

export function ContentWrapper({
  children,
  className,
  size = "md",
}: ContentWrapperProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        sizeMap[size],
        className,
      )}
    >
      {children}
    </div>
  );
}
