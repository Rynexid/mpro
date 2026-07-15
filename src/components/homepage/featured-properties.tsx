"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, MessageCircle, Share2 } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/layout/section-header";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { calculateMortgage, formatPrice } from "@/lib/utils";
import { FOOTER_COMPANY } from "@/lib/constants";
import type { PropertyWithDetails } from "@/types";

const MORTGAGE_DP_RATE = 0.2;
const MORTGAGE_INTEREST = 8.5;
const MORTGAGE_YEARS = 15;

const WHATSAPP_NUMBER = FOOTER_COMPANY.whatsapp.replace(/\D/g, "");
const WHATSAPP_DISPLAY = "+62 813-9392-024";

type FeaturedBadge = {
  label: string;
  variant: "featured" | "new" | "hot-deal" | "exclusive";
};

function getBadges(property: PropertyWithDetails): FeaturedBadge[] {
  const badges: FeaturedBadge[] = [];
  const created = property.createdAt ? new Date(property.createdAt) : null;
  const isNew = created && Date.now() - created.getTime() < 30 * 86400000;
  if (isNew && badges.length < 2) {
    badges.push({ label: "Baru", variant: "new" });
  }
  return badges;
}

function FeaturedPropertyCard({ property }: { property: PropertyWithDetails }) {
  const primaryImage = property.images?.[0];
  const badges = getBadges(property);
  const mortgage = calculateMortgage(
    property.price,
    property.price * MORTGAGE_DP_RATE,
    MORTGAGE_INTEREST,
    MORTGAGE_YEARS,
  );
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Halo, saya tertarik dengan properti "${property.title}" seharga ${formatPrice(
      property.price,
    )}. Boleh info lebih lanjut?`,
  )}`;
  const location = [property.district?.name, property.city?.name]
    .filter(Boolean)
    .join(", ");

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({
          title: property.title,
          text: `${property.title} - ${formatPrice(property.price)}`,
          url: shareUrl,
        });
      } catch {
        await navigator.clipboard.writeText(shareUrl);
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
    }
  };

  return (
    <article className="group border-border/50 bg-card relative flex flex-col overflow-hidden rounded-3xl border shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl">
      <div className="relative aspect-video overflow-hidden">
        {primaryImage ? (
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt || property.title}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="bg-muted text-muted-foreground flex h-full items-center justify-center">
            No Image
          </div>
        )}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {badges.map((b) => (
            <Badge
              key={b.label}
              variant={b.variant}
              className="backdrop-blur-sm"
            >
              {b.label}
            </Badge>
          ))}
        </div>
        <div className="absolute top-4 right-4">
          <Badge
            variant={property.status === "sale" ? "success" : "info"}
            className="backdrop-blur-sm"
          >
            {property.status === "sale" ? "Dijual" : "Disewa"}
          </Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3">
          <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
            Mulai dari
          </p>
          <p className="text-foreground text-2xl font-bold">
            {formatPrice(property.price)}
          </p>
          <p className="text-muted-foreground mt-1 text-sm">
            Estimasi cicilan{" "}
            <span className="text-primary font-semibold">
              {formatPrice(Math.round(mortgage))}
            </span>
            /bln
          </p>
        </div>

        <Link
          href={`/search/${property.slug}`}
          className="text-foreground hover:text-primary line-clamp-2 text-lg leading-tight font-semibold transition-colors"
        >
          {property.title}
        </Link>
        <div className="text-muted-foreground mt-2 flex items-center gap-1.5 text-sm">
          <MapPin className="h-4 w-4 shrink-0" />
          <span className="line-clamp-1">{location}</span>
        </div>

        <div className="border-border/60 mt-5 flex items-center gap-3 border-t pt-4">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="flex-1 gap-2"
            onClick={async (e: React.MouseEvent) => {
              e.preventDefault();
              e.stopPropagation();
              const shareUrl = typeof window !== "undefined" ? window.location.href : "";
              if (navigator.share) {
                try {
                  await navigator.share({
                    title: property.title,
                    text: `${property.title} - ${formatPrice(property.price)}`,
                    url: shareUrl,
                  });
                } catch {
                  await navigator.clipboard.writeText(shareUrl);
                }
              } else {
                await navigator.clipboard.writeText(shareUrl);
              }
            }}
            aria-label="Bagikan"
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button asChild className="flex-[1.4] gap-2">
            <a
              href={`https://wa.me/628139392024?text=${encodeURIComponent(
                `Halo, saya tertarik dengan properti "${property.title}" seharga ${formatPrice(property.price)}. Boleh info lebih lanjut?`,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-4 w-4" />
              +62 813-9392-024
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}

interface FeaturedPropertiesProps {
  properties: PropertyWithDetails[];
}

export function FeaturedProperties({ properties }: FeaturedPropertiesProps) {
  if (properties.length === 0) return null;

  return (
    <Container className="py-16 md:py-24">
      <SectionHeader
        title="Properti Unggulan"
        description="Pilihan eksklusif Maha Properti - properti prioritas, proyek terpercaya, dan pengembang terbaik."
        descriptionClassName="hidden md:block"
        action={
          <Button variant="outline" asChild>
            <Link href="/search?featured=true">Lihat Semua</Link>
          </Button>
        }
      />
      <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 xl:grid-cols-4">
        {properties.slice(0, 8).map((property) => (
          <div
            key={property.id}
            className="w-[85%] shrink-0 snap-start sm:w-[60%] md:w-auto"
          >
            <FeaturedPropertyCard property={property} />
          </div>
        ))}
      </div>
    </Container>
  );
}