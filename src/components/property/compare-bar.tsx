"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GitCompare, X } from "lucide-react";
import { Button } from "@/components/shared/button";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "mpro_compare";
const EVENT = "mpro:compare-change";

function readIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function writeIds(ids: string[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  window.dispatchEvent(new Event(EVENT));
}

export function useCompareIds() {
  const [ids, setIds] = React.useState<string[]>([]);
  React.useEffect(() => {
    const handler = () => setIds(readIds());
    queueMicrotask(handler);
    window.addEventListener(EVENT, handler);
    return () => window.removeEventListener(EVENT, handler);
  }, []);
  return ids;
}

export function CompareButton({
  propertyId,
  className,
}: {
  propertyId: string;
  className?: string;
}) {
  const ids = useCompareIds();
  const active = ids.includes(propertyId);

  const toggle = () => {
    const current = readIds();
    const next = active
      ? current.filter((id) => id !== propertyId)
      : [...current, propertyId].slice(-4);
    writeIds(next);
  };

  return (
    <Button
      type="button"
      variant={active ? "default" : "outline"}
      onClick={toggle}
      className={cn("gap-2", className)}
    >
      <GitCompare className="h-4 w-4" />
      {active ? "Dalam Perbandingan" : "Bandingkan"}
    </Button>
  );
}

export function CompareBar() {
  const router = useRouter();
  const ids = useCompareIds();
  if (ids.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[min(94vw,640px)] -translate-x-1/2 px-1">
      <div className="bg-background/95 border-border flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 shadow-lg backdrop-blur">
        <span className="text-foreground text-sm font-medium">
          {ids.length} properti dipilih
        </span>
        <div className="flex items-center gap-2">
          <Button asChild size="xl" className="gap-2">
            <Link href={`/search/compare?ids=${ids.join(",")}`}>
              Bandingkan
            </Link>
          </Button>
          <Button
            variant="ghost"
            aria-label="Hapus semua"
            onClick={() => writeIds([])}
            className="h-12 w-12 shrink-0 rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
