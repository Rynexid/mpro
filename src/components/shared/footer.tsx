"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Logo } from "@/components/shared/logo";
import { Separator } from "@/components/shared/separator";
import { Rss } from "lucide-react";
import {
  FOOTER_COMPANY,
  FOOTER_SERVICES,
  FOOTER_COMPANY_LINKS,
} from "@/lib/constants";

type IconProps = { className?: string };

const InstagramIcon = ({ className }: IconProps) => (
  <svg
    viewBox="96 96 448 448"
    fill="currentColor"
    className={className}
    aria-hidden
  >
    <path d="M320.3 205C256.8 204.8 205.2 256.2 205 319.7C204.8 383.2 256.2 434.8 319.7 435C383.2 435.2 434.8 383.8 435 320.3C435.2 256.8 383.8 205.2 320.3 205zM319.7 245.4C360.9 245.2 394.4 278.5 394.6 319.7C394.8 360.9 361.5 394.4 320.3 394.6C279.1 394.8 245.6 361.5 245.4 320.3C245.2 279.1 278.5 245.6 319.7 245.4zM413.1 200.3C413.1 185.5 425.1 173.5 439.9 173.5C454.7 173.5 466.7 185.5 466.7 200.3C466.7 215.1 454.7 227.1 439.9 227.1C425.1 227.1 413.1 215.1 413.1 200.3zM542.8 227.5C541.1 191.6 532.9 159.8 506.6 133.6C480.4 107.4 448.6 99.2 412.7 97.4C375.7 95.3 264.8 95.3 227.8 97.4C192 99.1 160.2 107.3 133.9 133.5C107.6 159.7 99.5 191.5 97.7 227.4C95.6 264.4 95.6 375.3 97.7 412.3C99.4 448.2 107.6 480 133.9 506.2C160.2 532.4 191.9 540.6 227.8 542.4C264.8 544.5 375.7 544.5 412.7 542.4C448.6 540.7 480.4 532.5 506.6 506.2C532.8 480 541 448.2 542.8 412.3C544.9 375.3 544.9 264.5 542.8 227.5zM495 452C487.2 471.6 472.1 486.7 452.4 494.6C422.9 506.3 352.9 503.6 320.3 503.6C287.7 503.6 217.6 506.2 188.2 494.6C168.6 486.8 153.5 471.7 145.6 452C133.9 422.5 136.6 352.5 136.6 319.9C136.6 287.3 134 217.2 145.6 187.8C153.4 168.2 168.5 153.1 188.2 145.2C217.7 133.5 287.7 136.2 320.3 136.2C352.9 136.2 423 133.6 452.4 145.2C472 153 487.1 168.1 495 187.8C506.7 217.3 504 287.3 504 319.9C504 352.5 506.7 422.6 495 452z" />
  </svg>
);

const FacebookIcon = ({ className }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden
  >
    <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v6h3v-6h3l1-3h-4v-2c0-.6.4-1 1-1Z" />
  </svg>
);

const YoutubeIcon = ({ className }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden
  >
    <path d="M23 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.8-1.8C19.3 5 12 5 12 5s-7.3 0-8.8.5A2.5 2.5 0 0 0 1.4 7.3C1 8.8 1 12 1 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.8 1.8C4.7 19 12 19 12 19s7.3 0 8.8-.5a2.5 2.5 0 0 0 1.8-1.8C23 15.2 23 12 23 12Zm-13 3V9l5 3-5 3Z" />
  </svg>
);

const TiktokIcon = ({ className }: IconProps) => (
  <svg
    viewBox="0 0 640 640"
    fill="currentColor"
    className={className}
    aria-hidden
  >
    <path d="M544.5 273.9C500.5 274 457.5 260.3 421.7 234.7L421.7 413.4C421.7 446.5 411.6 478.8 392.7 506C373.8 533.2 347.1 554 316.1 565.6C285.1 577.2 251.3 579.1 219.2 570.9C187.1 562.7 158.3 545 136.5 520.1C114.7 495.2 101.2 464.1 97.5 431.2C93.8 398.3 100.4 365.1 116.1 336C131.8 306.9 156.1 283.3 185.7 268.3C215.3 253.3 248.6 247.8 281.4 252.3L281.4 342.2C266.4 337.5 250.3 337.6 235.4 342.6C220.5 347.6 207.5 357.2 198.4 369.9C189.3 382.6 184.4 398 184.5 413.8C184.6 429.6 189.7 444.8 199 457.5C208.3 470.2 221.4 479.6 236.4 484.4C251.4 489.2 267.5 489.2 282.4 484.3C297.3 479.4 310.4 469.9 319.6 457.2C328.8 444.5 333.8 429.1 333.8 413.4L333.8 64L421.8 64C421.7 71.4 422.4 78.9 423.7 86.2C426.8 102.5 433.1 118.1 442.4 131.9C451.7 145.7 463.7 157.5 477.6 166.5C497.5 179.6 520.8 186.6 544.6 186.6L544.6 274z" />
  </svg>
);

const socials = [
  { label: "Instagram", icon: InstagramIcon, href: "https://instagram.com" },
  { label: "Facebook", icon: FacebookIcon, href: "https://facebook.com" },
  { label: "TikTok", icon: TiktokIcon, href: "https://tiktok.com" },
  { label: "YouTube", icon: YoutubeIcon, href: "https://youtube.com" },
  {
    label: "RSS",
    icon: Rss,
    href: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://mahaproperti.com"}/feed.xml`,
  },
];

const linkClass =
  "text-sm text-muted-foreground transition-colors hover:text-primary";

/**
 * A footer column that collapses into an accordion on mobile (below `md`)
 * and renders as a static list on larger screens.
 */
function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="border-b md:border-none">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="text-foreground flex min-h-[48px] w-full items-center justify-between py-3 text-left text-sm font-semibold md:pointer-events-none md:mb-4 md:min-h-0 md:py-0"
      >
        {title}
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 transition-transform duration-200 motion-reduce:transition-none md:hidden",
            open && "rotate-180",
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-all duration-200 motion-reduce:transition-none md:grid-rows-1 md:opacity-100",
          open
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0 md:grid-rows-[1fr] md:opacity-100",
        )}
      >
        <div className="overflow-hidden">
          <ul className="flex flex-col gap-3 pb-4 md:pb-0">{children}</ul>
        </div>
      </div>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 mt-16 border-t">
      <Container className="py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="flex flex-col items-start gap-6 md:col-span-2 lg:col-span-1">
            <Logo size="lg" />
            <p className="text-muted-foreground max-w-xl text-sm">
              {FOOTER_COMPANY.description}
            </p>
            <div className="flex items-center gap-2">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="text-muted-foreground hover:text-primary flex h-11 w-11 items-center justify-center transition-colors"
                  >
                    <Icon className="h-7 w-7" />
                  </Link>
                );
              })}
            </div>
          </div>

          <FooterColumn title="Layanan">
            {FOOTER_SERVICES.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Perusahaan">
            {FOOTER_COMPANY_LINKS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Kontak">
            <li>{FOOTER_COMPANY.address}</li>
            <li>
              <a href={`tel:${FOOTER_COMPANY.phone}`} className={linkClass}>
                {FOOTER_COMPANY.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${FOOTER_COMPANY.email}`} className={linkClass}>
                {FOOTER_COMPANY.email}
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${FOOTER_COMPANY.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                {FOOTER_COMPANY.whatsapp}
              </a>
            </li>
          </FooterColumn>
        </div>
      </Container>

      <Separator />

      <Container className="py-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-muted-foreground text-xs">
            © {year} Mahaproperti. Hak cipta dilindungi.
          </p>
          <p className="text-muted-foreground text-xs">
            Dibangun oleh{" "}
            <a
              href="https://rynexdev.vercel.app?ref=myriudesu.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary font-medium transition-colors hover:underline"
            >
              Rynex Team
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
