import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SidebarLayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
  className?: string;
  sidebarClassName?: string;
  contentClassName?: string;
}

export function SidebarLayout({
  children,
  sidebar,
  className,
  sidebarClassName,
  contentClassName,
}: SidebarLayoutProps) {
  return (
    <div className={cn("flex flex-col gap-8 lg:flex-row", className)}>
      <aside className={cn("w-full shrink-0 lg:w-80", sidebarClassName)}>
        {sidebar}
      </aside>
      <main className={cn("min-w-0 flex-1", contentClassName)}>{children}</main>
    </div>
  );
}
