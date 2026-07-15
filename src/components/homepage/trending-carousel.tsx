"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Flame, MapPin, MessageCircle, Share2 } from "lucide-react";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { formatPrice } from "@/lib/utils";
import type { PropertyWithDetails } from "@/types";

const WHATSAPP_NUMBER = "+628139392024".replace(/\D/g, "");
const WHATSAPP_DISPLAY = "+62 813-9392-024";

function TrendingCard({ property }: { property: PropertyWithDetails }) {
  const router = useRouter();
  const primary = property.images[0];
  const location = [property.district?.name, property.city?.name]
    .filter(Boolean)
    .join(", ");

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Halo, saya tertarik dengan properti "${property.title}" seharga ${formatPrice(property.price)}. Boleh info lebih lanjut?`,
  )}`;

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

  const handleCardClick = () => {
    router.push(`/search/${property.slug}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group bg-card block w-[280px] shrink-0 snap-start overflow-hidden rounded-3xl border shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer sm:w-[320px]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {primary ? (
          <Image
            src={primary.url}
            alt={primary.alt || property.title}
            fill
            sizes="300px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="bg-muted text-muted-foreground flex h-full items-center justify-center">
            No Image
          </div>
        )}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <Badge variant="featured" className="backdrop-blur-sm">
            <Flame className="h-3 w-3 mr-1" />
            Trending
          </Badge>
          <Badge
            variant={property.status === "sale" ? "success" : "info"}
            className="backdrop-blur-sm"
          >
            {property.status === "sale" ? "Dijual" : "Disewa"}
          </Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-3">
          <p className="text-primary font-bold">{formatPrice(property.price)}</p>
        </div>

        <Link
          href={`/search/${property.slug}`}
          className="text-foreground hover:text-primary line-clamp-2 text-base leading-tight font-semibold transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          {property.title}
        </Link>
        <div className="text-muted-foreground mt-2 flex items-center gap-1.5 text-sm">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="line-clamp-1">{location}</span>
        </div>

        <div className="border-border/60 mt-4 flex items-center gap-2 border-t pt-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="flex-1 gap-2"
            onClick={handleShare}
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
              onClick={(e) => e.stopPropagation()}
            >
              <MessageCircle className="h-4 w-4" />
              +62 813-9392-024
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

export function TrendingCarousel({
  properties,
}: {
  properties: PropertyWithDetails[];
}) {
  const [current, setCurrent] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const count = properties.length;

  const go = React.useCallback(
    (dir: number) => setCurrent((c) => (c + dir + count) % count),
    [count],
  );

  React.useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setCurrent((c) => (c + 1) % count), 30000);
    return () => clearTimeout(t);
  }, [current, paused, count]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:overflow-visible md:px-0">
        {properties.map((p, i) => (
          <div key={p.id} className="w-full shrink-0 snap-start md:w-auto">
            <TrendingCard property={p} />
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-center gap-1.5">
        {properties.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Ke slide ${i + 1}`}
            aria-current={i === current}
            onClick={() => setCurrent(i)}
            className={[
              "h-1.5 rounded-full bg-white/50 transition-all",
              i === current ? "w-7 bg-white" : "w-2.5 hover:bg-white/80",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  );
}