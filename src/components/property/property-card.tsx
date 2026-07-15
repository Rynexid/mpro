import Link from "next/link";
import Image from "next/image";
import { MapPin, BedDouble, Bath, Maximize, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice, formatArea } from "@/lib/utils";
import { Card, CardContent } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import type { PropertyWithDetails } from "@/types";

interface PropertyCardProps {
  property: PropertyWithDetails;
  className?: string;
  variant?: "grid" | "list";
}

const statusColors: Record<string, string> = {
  sale: "bg-emerald-500",
  rent: "bg-blue-500",
};

const labelColors: Record<
  string,
  "featured" | "new" | "hot-deal" | "exclusive"
> = {
  Featured: "featured",
  New: "new",
  "Hot Deal": "hot-deal",
  Exclusive: "exclusive",
};

export function PropertyCard({
  property,
  className,
  variant = "grid",
}: PropertyCardProps) {
  const primaryImage = property.images?.[0];

  if (variant === "list") {
    return (
      <Card
        className={cn(
          "group overflow-hidden transition-shadow hover:shadow-md",
          className,
        )}
      >
        <div className="flex flex-col sm:flex-row">
          <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden sm:w-72">
            {primaryImage ? (
              <Image
                src={primaryImage.url}
                alt={primaryImage.alt || property.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 288px"
              />
            ) : (
              <div className="bg-muted text-muted-foreground flex h-full items-center justify-center">
                No Image
              </div>
            )}
            <div className="absolute top-3 left-3">
              <Badge variant={property.status === "sale" ? "success" : "info"}>
                {property.status === "sale" ? "Dijual" : "Disewa"}
              </Badge>
            </div>
          </div>
          <CardContent className="flex flex-1 flex-col justify-between p-4 sm:p-6">
            <div>
              <div className="flex items-start justify-between gap-2">
                <Link
                  href={`/search/${property.slug}`}
                  className="text-foreground hover:text-primary text-lg leading-tight font-semibold transition-colors"
                >
                  {property.title}
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 shrink-0"
                  aria-label="Simpan"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-muted-foreground mt-1 flex items-center gap-1 text-sm">
                <MapPin className="h-3.5 w-3.5" />
                <span>
                  {property.district?.name}, {property.city?.name}
                </span>
              </div>
              <p className="text-muted-foreground mt-2 line-clamp-2 text-sm">
                {property.description}
              </p>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <p className="text-primary text-xl font-bold">
                {formatPrice(property.price)}
              </p>
              <div className="text-muted-foreground flex items-center gap-3 text-xs">
                {property.landArea && (
                  <span className="flex items-center gap-1">
                    <Maximize className="h-3.5 w-3.5" />
                    {formatArea(property.landArea)}
                  </span>
                )}
                {property.bedrooms && (
                  <span className="flex items-center gap-1">
                    <BedDouble className="h-3.5 w-3.5" />
                    {property.bedrooms}
                  </span>
                )}
                {property.bathrooms && (
                  <span className="flex items-center gap-1">
                    <Bath className="h-3.5 w-3.5" />
                    {property.bathrooms}
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "group overflow-hidden transition-shadow hover:shadow-md",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {primaryImage ? (
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt || property.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="bg-muted text-muted-foreground flex h-full items-center justify-center">
            No Image
          </div>
        )}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant={property.status === "sale" ? "success" : "info"}>
            {property.status === "sale" ? "Dijual" : "Disewa"}
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-foreground absolute top-3 right-3 h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
          aria-label="Simpan"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <p className="text-primary text-base font-bold sm:text-lg">
            {formatPrice(property.price)}
          </p>
          {property.priceNegotiable && (
            <Badge variant="outline" className="text-[10px]">
              Nego
            </Badge>
          )}
        </div>
        <Link
          href={`/search/${property.slug}`}
          className="text-foreground hover:text-primary mt-1 line-clamp-1 block text-base leading-tight font-semibold transition-colors"
        >
          {property.title}
        </Link>
        <div className="text-muted-foreground mt-1 flex items-center gap-1 text-sm">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="line-clamp-1">
            {property.district?.name}, {property.city?.name}
          </span>
        </div>
        <div className="text-muted-foreground mt-3 flex items-center gap-3 border-t pt-3 text-xs">
          {property.landArea && (
            <span className="flex items-center gap-1">
              <Maximize className="h-3.5 w-3.5" />
              {formatArea(property.landArea)}
            </span>
          )}
          {property.buildingArea && (
            <span className="flex items-center gap-1">
              <Maximize className="h-3.5 w-3.5" />
              {formatArea(property.buildingArea)}
            </span>
          )}
          {property.bedrooms && (
            <span className="flex items-center gap-1">
              <BedDouble className="h-3.5 w-3.5" />
              {property.bedrooms} KT
            </span>
          )}
          {property.bathrooms && (
            <span className="flex items-center gap-1">
              <Bath className="h-3.5 w-3.5" />
              {property.bathrooms} KM
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
