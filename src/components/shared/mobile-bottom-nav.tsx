"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Heart, MessageCircle, Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const items = [
  { label: "Home", href: "/", icon: Home },
  { label: "Explore", href: "/search", icon: Compass },
  { label: "Saved", href: "/search?view=saved", icon: Heart },
  { label: "Messages", href: "/kontak", icon: MessageCircle },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <>
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 md:hidden",
          "bg-background/80 rounded-t-2xl border-t border-white/10 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] backdrop-blur-xl",
          "transition-transform duration-300",
          menuOpen ? "translate-y-0" : "translate-y-0",
        )}
      >
        {menuOpen && (
          <div className="border-border/60 border-b px-4 py-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-foreground text-sm font-semibold">
                Menu
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Tutup"
                className="text-muted-foreground hover:bg-muted rounded-full p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-foreground hover:bg-muted rounded-lg px-3 py-2.5 text-sm font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}

        <nav className="flex items-stretch justify-around px-2 py-2">
          {items.map((item) => {
            const Icon = item.icon;
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href.split("?")[0]) &&
                  item.href !== "/";
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex flex-1 flex-col items-center gap-1 rounded-xl py-1.5 text-[11px] font-medium transition-colors",
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className={cn(
              "flex flex-1 flex-col items-center gap-1 rounded-xl py-1.5 text-[11px] font-medium transition-colors",
              menuOpen
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Menu className="h-5 w-5" />
            Menu
          </button>
        </nav>
      </div>
    </>
  );
}
