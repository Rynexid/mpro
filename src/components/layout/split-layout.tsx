import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SplitLayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
  className?: string;
  reverse?: boolean;
}

export function SplitLayout({
  children,
  sidebar,
  className,
  reverse,
}: SplitLayoutProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-8 lg:grid-cols-2",
        reverse && "lg:[direction:rtl] lg:[&>*]:[direction:ltr]",
        className,
      )}
    >
      <div>{children}</div>
      {sidebar && <div>{sidebar}</div>}
    </div>
  );
}
