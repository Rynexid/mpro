"use client";

import * as React from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  BadgeCheck,
  GitCompareArrows,
  MapPin,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { FavoriteButton } from "@/components/property/favorite-button";
import { ShareButton } from "@/components/property/share-button";

interface GalleryImage {
  url: string;
  alt?: string | null;
}

interface PropertyGalleryProps {
  images: GalleryImage[];
  propertyId: string;
  title: string;
  featured?: boolean;
  verified?: boolean;
  officialDeveloper?: boolean;
  price?: string;
  location?: string;
  propertyType?: string;
  monthly?: string;
}

const overlayPill =
  "rounded-full bg-white/85 text-foreground backdrop-blur-sm transition-colors hover:bg-white";

export function PropertyGallery({
  images,
  propertyId,
  title,
  featured,
  verified,
  officialDeveloper,
  price,
  location,
  propertyType,
  monthly,
}: PropertyGalleryProps) {
  const safe: GalleryImage[] =
    images.length > 0 ? images : [{ url: "", alt: title }];
  const main = safe[0];
  const stacked = safe.slice(1, 3);
  const restCount = safe.length - 3;

  const [modalOpen, setModalOpen] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const [current, setCurrent] = React.useState(0);
  const touchX = React.useRef<number | null>(null);

  const openAt = (i: number) => {
    setIndex(i);
    setModalOpen(true);
  };

  const go = (dir: number) =>
    setIndex((i) => (i + dir + safe.length) % safe.length);

  React.useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen, safe.length]);

  // Mobile swipe / tap handling
  const start = React.useRef<{ x: number; y: number } | null>(null);
  const moved = React.useRef(false);
  const onTouchStart = (e: React.TouchEvent) => {
    start.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    moved.current = false;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!start.current) return;
    const dx = e.touches[0].clientX - start.current.x;
    const dy = e.touches[0].clientY - start.current.y;
    if (Math.abs(dx) > 8 || Math.abs(dy) > 8) moved.current = true;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!start.current) return;
    const dx = e.changedTouches[0].clientX - start.current.x;
    if (!moved.current) {
      openAt(current);
    } else if (Math.abs(dx) > 50) {
      if (dx < 0) setCurrent((c) => Math.min(safe.length - 1, c + 1));
      else setCurrent((c) => Math.max(0, c - 1));
    }
    start.current = null;
  };

  const topLeft = (
    <div
      className="absolute top-4 left-4 z-10 flex flex-wrap gap-2"
      onTouchEnd={(e) => e.stopPropagation()}
    >
      {featured && (
        <Badge variant="featured" className="gap-1 shadow-sm">
          <Sparkles className="h-3 w-3" />
          Unggulan
        </Badge>
      )}
      {verified && (
        <Badge variant="success" className="gap-1 shadow-sm">
          <BadgeCheck className="h-3 w-3" />
          Terverifikasi
        </Badge>
      )}
      {officialDeveloper && (
        <Badge
          variant="default"
          className="text-foreground gap-1 border border-white/30 bg-white/85 shadow-sm"
        >
          Pengembang Resmi
        </Badge>
      )}
    </div>
  );

  const topRight = (
    <div
      className="absolute top-4 right-4 z-10 flex items-center gap-2"
      onTouchEnd={(e) => e.stopPropagation()}
    >
      <FavoriteButton propertyId={propertyId} />
      <ShareButton
        title={title}
        className={overlayPill}
        variant="ghost"
        size="icon"
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={overlayPill}
        aria-label="Bandingkan"
        title="Bandingkan"
      >
        <GitCompareArrows className="h-4 w-4" />
      </Button>
    </div>
  );

  const glassSummary = price ? (
    <div className="absolute bottom-4 left-4 z-10 max-w-[80%] rounded-2xl border border-white/20 bg-white/10 p-4 text-white shadow-lg backdrop-blur-md sm:max-w-sm">
      <p className="line-clamp-1 text-sm font-semibold">{title}</p>
      <p className="mt-0.5 text-lg font-bold">{price}</p>
      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/85">
        {location && (
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {location}
          </span>
        )}
        {propertyType && <span>{propertyType}</span>}
      </div>
      {monthly && (
        <p className="mt-1.5 flex items-center gap-1 text-xs text-white/85">
          <Wallet className="h-3.5 w-3.5" />
          Cicilan {monthly}/bln
        </p>
      )}
    </div>
  ) : null;

  const imgEl = (img: GalleryImage) => (
    <Image
      src={img.url}
      alt={img.alt || title}
      fill
      sizes="(max-width: 768px) 100vw, 70vw"
      className="object-cover"
    />
  );

  return (
    <>
      {/* Mobile: swipeable carousel */}
      <div className="md:hidden">
        <div className="bg-muted relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-sm">
          <div
            className="flex h-full touch-pan-y transition-transform duration-300 ease-out motion-reduce:transition-none"
            style={{ transform: `translateX(-${current * 100}%)` }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {safe.map((img, i) => (
              <div
                key={i}
                className="relative h-full w-full shrink-0"
                aria-hidden={i !== current}
              >
                {img.url ? (
                  imgEl(img)
                ) : (
                  <div className="text-muted-foreground flex h-full items-center justify-center">
                    Tidak ada gambar
                  </div>
                )}
              </div>
            ))}
          </div>
          {topLeft}
          {topRight}
          {glassSummary}
          {safe.length > 1 && (
            <div
              className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-1.5"
              onTouchEnd={(e) => e.stopPropagation()}
            >
              {safe.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Lihat gambar ${i + 1}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrent(i);
                  }}
                  className={cn(
                    "h-1.5 rounded-full transition-all motion-reduce:transition-none",
                    i === current
                      ? "w-5 bg-white"
                      : "w-1.5 bg-white/60 hover:bg-white/80",
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tablet / Desktop: editorial 70/30 grid */}
      <div className="hidden grid-cols-[1.7fr_1fr] gap-3 md:grid md:h-[460px]">
        <button
          type="button"
          onClick={() => openAt(0)}
          className="group relative block min-h-[260px] overflow-hidden rounded-3xl shadow-sm md:h-full"
        >
          {main.url ? (
            <Image
              src={main.url}
              alt={main.alt || title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 70vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="bg-muted text-muted-foreground flex h-full min-h-[260px] items-center justify-center">
              Tidak ada gambar
            </div>
          )}
          {topLeft}
          {topRight}
          {glassSummary}
        </button>

        <div className="hidden grid-rows-2 gap-3 md:grid md:h-full">
          {[0, 1].map((slot) => {
            const img = stacked[slot];
            if (!img) {
              return (
                <div
                  key={slot}
                  className="bg-muted text-muted-foreground flex items-center justify-center overflow-hidden rounded-3xl"
                >
                  Tidak ada gambar
                </div>
              );
            }
            return (
              <button
                key={slot}
                type="button"
                onClick={() => openAt(slot + 1)}
                className="group relative block overflow-hidden rounded-3xl shadow-sm"
              >
                <Image
                  src={img.url}
                  alt={img.alt || title}
                  fill
                  sizes="30vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {slot === 1 && restCount > 0 && (
                  <span className="absolute inset-0 flex items-center justify-center bg-black/50 text-lg font-semibold text-white">
                    +{restCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-black/95">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setModalOpen(false)}
            className="absolute top-4 right-4 z-20 rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Tutup"
          >
            <X className="h-5 w-5" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => go(-1)}
            className="absolute top-1/2 left-4 z-20 -translate-y-1/2 rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Sebelumnya"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => go(1)}
            className="absolute top-1/2 right-4 z-20 -translate-y-1/2 rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Berikutnya"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          <div
            className="relative flex-1"
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (dx > 50) go(-1);
              else if (dx < -50) go(1);
              touchX.current = null;
            }}
          >
            <Image
              src={safe[index].url}
              alt={safe[index].alt || title}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto p-4">
            {safe.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={cn(
                  "relative h-16 w-24 shrink-0 overflow-hidden rounded-lg ring-2 transition",
                  i === index ? "ring-primary" : "opacity-70 ring-transparent",
                )}
              >
                <Image
                  src={img.url}
                  alt={img.alt || title}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
