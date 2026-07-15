"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/shared/button";

interface DeleteButtonProps {
  action: () => Promise<unknown>;
  label?: string;
  className?: string;
}

export function DeleteButton({
  action,
  label = "Hapus",
  className,
}: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <Button
      variant="destructive"
      size="sm"
      disabled={isPending}
      className={className}
      onClick={() => {
        if (!confirm("Apakah Anda yakin ingin menghapus item ini?")) return;
        startTransition(async () => {
          await action();
          router.refresh();
        });
      }}
    >
      {isPending ? "Menghapus…" : label}
    </Button>
  );
}
