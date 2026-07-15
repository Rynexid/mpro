"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { Button } from "@/components/shared/button";
import { toggleFavoriteAction } from "@/lib/actions";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  propertyId: string;
  initialFavorited?: boolean;
  variant?: "icon" | "full";
  className?: string;
}

export function FavoriteButton({
  propertyId,
  initialFavorited = false,
  variant = "icon",
  className,
}: FavoriteButtonProps) {
  const router = useRouter();
  const [favorited, setFavorited] = React.useState(initialFavorited);
  const [pending, startTransition] = React.useTransition();

  const onClick = () => {
    startTransition(async () => {
      try {
        const res = await toggleFavoriteAction(propertyId);
        setFavorited(res.favorited);
        router.refresh();
      } catch {
        router.push("/login");
      }
    });
  };

  if (variant === "full") {
    return (
      <Button
        type="button"
        variant={favorited ? "default" : "outline"}
        onClick={onClick}
        disabled={pending}
        className={cn("gap-2", className)}
      >
        <Heart className={cn("h-4 w-4", favorited && "fill-current")} />
        {favorited ? "Tersimpan" : "Simpan"}
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={onClick}
      disabled={pending}
      aria-label={favorited ? "Hapus dari favorit" : "Tambah ke favorit"}
      className={cn(
        "text-foreground rounded-full bg-white/80 backdrop-blur-sm hover:bg-white",
        favorited && "text-red-500",
        className,
      )}
    >
      <Heart className={cn("h-4 w-4", favorited && "fill-current")} />
    </Button>
  );
}
