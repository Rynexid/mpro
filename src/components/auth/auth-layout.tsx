import * as React from "react";
import { ShieldCheck, BadgeCheck, Landmark } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { Container } from "@/components/layout/container";
import { SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

const highlights = [
  {
    icon: ShieldCheck,
    title: "Listing Terverifikasi",
    description: "Setiap properti melewati verifikasi ketat oleh tim kami.",
  },
  {
    icon: BadgeCheck,
    title: "Agen Profesional",
    description: "Jaringan agen properti berpengalaman dan terpercaya.",
  },
  {
    icon: Landmark,
    title: "Bantuan KPR",
    description: "Kalkulator KPR dan konsultasi pembiayaan properti.",
  },
];

function MarketingPanel() {
  return (
    <div className="from-primary to-primary/80 relative hidden overflow-hidden bg-gradient-to-br lg:flex lg:flex-col lg:justify-between lg:p-12">
      {/* Decorative three-dot brand motif */}
      <div
        aria-hidden
        className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/10 blur-3xl"
      />

      <div className="relative">
        <span className="text-primary-foreground text-2xl font-bold tracking-tight">
          {SITE_NAME}
        </span>
      </div>

      <div className="relative space-y-8">
        <div>
          <p className="text-primary-foreground/70 mb-3 text-sm font-medium tracking-widest uppercase">
            Marketplace Properti Modern
          </p>
          <h2 className="text-primary-foreground text-3xl font-bold leading-tight tracking-tight xl:text-4xl">
            Temukan properti impian Anda bersama {SITE_NAME}.
          </h2>
          <p className="text-primary-foreground/80 mt-4 max-w-md text-sm">
            Ribuan listing terverifikasi, agen profesional, dan bantuan KPR —
            semua dalam satu platform yang aman dan nyaman.
          </p>
        </div>

        <ul className="space-y-4">
          {highlights.map((item) => (
            <li key={item.title} className="flex items-start gap-3">
              <span className="bg-primary-foreground/15 text-primary-foreground flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
                <item.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-primary-foreground text-sm font-semibold">
                  {item.title}
                </p>
                <p className="text-primary-foreground/75 text-xs">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative flex items-center gap-2 text-primary-foreground/60 text-xs">
        <span className="flex gap-1" aria-hidden>
          <span className="bg-primary-foreground h-1.5 w-1.5 rounded-full" />
          <span className="bg-primary-foreground/60 h-1.5 w-1.5 rounded-full" />
          <span className="bg-primary-foreground/30 h-1.5 w-1.5 rounded-full" />
        </span>
        Dipercaya ribuan pembeli & penjual di Indonesia
      </div>
    </div>
  );
}

export function AuthLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        // Full-screen overlay so the global site header/footer are hidden on
        // the auth routes without restructuring the root layout.
        "bg-background fixed inset-0 z-[60] grid grid-cols-1 overflow-y-auto lg:grid-cols-2",
        className,
      )}
    >
      <MarketingPanel />
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-12">
        <Container className="w-full max-w-md">{children}</Container>
      </div>
    </div>
  );
}
