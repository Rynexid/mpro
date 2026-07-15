import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  description?: string;
  descriptionClassName?: string;
  action?: ReactNode;
  className?: string;
  centered?: boolean;
}

export function SectionHeader({
  title,
  description,
  descriptionClassName,
  action,
  className,
  centered,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-8 md:mb-12", centered && "text-center", className)}>
      <div
        className={cn(
          "flex items-end justify-between",
          centered && "flex-col items-center",
        )}
      >
        <div>
          <h2 className="text-foreground text-2xl font-bold tracking-tight md:text-3xl">
            {title}
          </h2>
          {description && (
            <p className={cn("text-muted-foreground mt-2", descriptionClassName)}>
              {description}
            </p>
          )}
        </div>
        {action && <div className="mt-4 md:mt-0">{action}</div>}
      </div>
    </div>
  );
}
