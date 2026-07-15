"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, ChevronRight, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/shared/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/shared/avatar";
import { NAV_LINKS } from "@/lib/constants";
import { Sheet, SheetContent } from "@/components/shared/sheet";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  user?: {
    name: string;
    email: string;
    image?: string | null;
    username?: string | null;
  } | null;
}

export function MobileNav({ open, onClose, user }: MobileNavProps) {
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={(next) => !next && onClose()}>
      <SheetContent
        side="right"
        aria-label="Menu navigasi"
        className="flex flex-col md:hidden"
      >
        <div className="flex items-center justify-between border-b p-4">
          <span className="text-lg font-semibold">Menu</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Tutup menu"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={cn(
                "hover:bg-accent flex min-h-[48px] items-center justify-between rounded-md px-3 py-3 text-sm font-medium transition-colors",
                pathname === link.href
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground",
              )}
            >
              {link.label}
              <ChevronRight className="h-4 w-4" />
            </Link>
          ))}
        </nav>

        <div className="border-t p-4">
          {user ? (
            <Link
              href={`/${user.username ?? ""}`}
              onClick={onClose}
              className="flex items-center gap-3 rounded-md p-2 hover:bg-accent"
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.image || undefined} alt={user.name} />
                <AvatarFallback>
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{user.name}</span>
                <span className="text-muted-foreground text-xs">
                  Lihat profil
                </span>
              </div>
            </Link>
          ) : (
            <Button asChild className="w-full">
              <Link href="/login" onClick={onClose}>
                Masuk / Daftar
              </Link>
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
