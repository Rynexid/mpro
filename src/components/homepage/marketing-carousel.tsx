"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, MapPin } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { Button } from "@/components/shared/button";
import type { HeroBanner, FloatingHighlight } from "@/lib/constants";

export function MarketingCarousel({
  banners,
  featured,
  onActiveChange,
}: {
  banners: HeroBanner[];
  featured?: FloatingHighlight;
  onActiveChange?: (index: number) => void;
}) {
  const [current, setCurrent] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const touchX = React.useRef<number | null>(null);
  const count = banners.length;

  const go = React.useCallback(
    (dir: number) => setCurrent((c) => (c + dir + count) % count),
    [count],
  );

  React.useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setCurrent((c) => (c + 1) % count), 5000);
    return () => clearTimeout(t);
  }, [current, paused, count]);

  React.useEffect(() => {
    onActiveChange?.(current);
  }, [current, onActiveChange]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") go(-1);
    if (e.key === "ArrowRight") go(1);
  };

  const textItem = (active: boolean, delay: number, className?: string) =>
    cn(
      "transition-all duration-700 ease-out",
      active ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
      className,
    );

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Banner Mahaproperti"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (dx > 50) go(-1);
        else if (dx < -50) go(1);
        touchX.current = null;
      }}
      className="group relative aspect-[16/9] w-full overflow-hidden rounded-[32px] shadow-2xl outline-none sm:aspect-auto sm:h-[460px] md:h-[600px] lg:h-[680px]"
    >
      {banners.map((banner, i) => {
        const active = i === current;
        return (
          <div
            key={banner.id}
            aria-hidden={!active}
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-out",
              active ? "opacity-100" : "pointer-events-none opacity-0",
            )}
          >
            <div
              className={cn(
                "absolute inset-0 transition-transform duration-[1500ms] ease-out",
                active ? "scale-[1.02]" : "scale-100",
              )}
            >
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                priority={i === 0}
                sizes="(max-width: 1280px) 100vw, 1200px"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />

            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-14">
              <div className="max-w-2xl">
                <span
                  className={textItem(
                    active,
                    0,
                    "bg-primary/90 text-primary-foreground inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide uppercase",
                  )}
                >
                  {banner.badge}
                </span>
                <h2
                  className={textItem(
                    active,
                    120,
                    "mt-3 text-2xl leading-tight font-bold tracking-tight text-white sm:text-4xl lg:text-5xl",
                  )}
                >
                  {banner.title}
                </h2>
                <p
                  className={textItem(
                    active,
                    240,
                    "mt-2 hidden max-w-xl text-sm text-white/80 sm:mt-3 sm:block sm:text-base",
                  )}
                >
                  {banner.description}
                </p>
                <div
                  className={textItem(
                    active,
                    360,
                    "mt-4 flex flex-wrap items-center gap-3 sm:mt-6",
                  )}
                >
                  <Button asChild size="lg" className="gap-2">
                    <Link href={banner.primary.href}>
                      {banner.primary.label}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="hidden border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white sm:inline-flex"
                  >
                    <Link href={banner.secondary.href}>
                      {banner.secondary.label}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Floating featured property highlight (desktop) */}
      {featured && (
        <Link
          href={`/search/${featured.slug}`}
          className="absolute right-6 bottom-6 z-20 hidden w-72 overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-xl backdrop-blur-md transition-transform hover:-translate-y-1 md:flex"
        >
          <div className="bg-muted relative h-20 w-20 shrink-0">
            {featured.image ? (
              <Image
                src={featured.image}
                alt={featured.name}
                fill
                sizes="80px"
                className="object-cover"
              />
            ) : null}
          </div>
          <div className="p-3">
            <span className="bg-primary/90 text-primary-foreground inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase">
              Featured
            </span>
            <p className="mt-1 truncate text-sm font-semibold text-white">
              {featured.name}
            </p>
            <p className="flex items-center gap-1 truncate text-xs text-white/70">
              <MapPin className="h-3 w-3 shrink-0" />
              {featured.location}
            </p>
            <p className="mt-1 text-xs font-medium text-white">
              Mulai {formatPrice(featured.price)}
            </p>
          </div>
          <span className="absolute right-3 bottom-3 text-white/80">
            <ArrowRight className="h-4 w-4" />
          </span>
        </Link>
      )}

      <button
        type="button"
        aria-label="Sebelumnya"
        onClick={() => go(-1)}
        className="absolute top-1/2 left-4 z-20 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-black/50"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="Berikutnya"
        onClick={() => go(1)}
        className="absolute top-1/2 right-4 z-20 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-black/50"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Desktop pagination dots */}
      <div className="absolute bottom-5 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-2 md:flex">
        {banners.map((banner, i) => (
          <button
            key={banner.id}
            type="button"
            aria-label={`Ke banner ${i + 1}`}
            aria-current={i === current}
            onClick={() => setCurrent(i)}
            className={cn(
              "h-1.5 rounded-full bg-white/50 transition-all",
              i === current ? "w-7 bg-white" : "w-2.5 hover:bg-white/80",
            )}
          />
        ))}
      </div>

      {/* Mobile progress bars */}
      <div className="absolute bottom-4 left-1/2 z-20 flex w-[80%] max-w-sm -translate-x-1/2 items-center gap-1.5 md:hidden">
        {banners.map((banner, i) => (
          <div
            key={banner.id}
            className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/30"
          >
            {i === current && (
              <div
                key={current}
                className="absolute inset-y-0 left-0 rounded-full bg-white"
                style={{
                  animation: "heroProgress 5s linear forwards",
                  animationPlayState: paused ? "paused" : "running",
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
