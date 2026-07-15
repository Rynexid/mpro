import * as React from "react";
import { Card } from "@/components/shared/card";
import { cn } from "@/lib/utils";

export function AuthCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card
      className={cn(
        "w-full max-w-md border-none bg-transparent shadow-none sm:border sm:bg-card sm:shadow-sm",
        className,
      )}
    >
      <div className="p-1 sm:p-8">{children}</div>
    </Card>
  );
}
