import { Logo } from "@/components/shared/logo";
import { cn } from "@/lib/utils";

interface AuthHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function AuthHeader({ title, description, className }: AuthHeaderProps) {
  return (
    <div className={cn("flex flex-col items-center gap-3 text-center", className)}>
      <Logo size="lg" />
      <h1 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
        {title}
      </h1>
      {description ? (
        <p className="text-muted-foreground max-w-sm text-sm">{description}</p>
      ) : null}
    </div>
  );
}
