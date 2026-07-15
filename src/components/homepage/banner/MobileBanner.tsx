"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { HeroBanner } from "@/lib/constants";

interface MobileBannerProps {
  banners: HeroBanner[];
  onActiveChange?: (index: number) => void;
}

export function MobileBanner({ banners, onActiveChange }: MobileBannerProps) {
  const [current, setCurrent] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const touchX = React.useRef<number | null>(null);

  // Filter out commercial banner on mobile
  const mobileBanners = banners.filter((b) => b.id !== "commercial");
  const count = mobileBanners.length;

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

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.touches[0].clientX - touchX.current;
    if (Math.abs(dx) > 8) e.currentTarget.dispatchEvent(new Event("pan"));
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) go(dx > 0 ? -1 : 1);
    touchX.current = null;
  };

  return (
    <div className="md:hidden">
      <div
        className="relative w-full overflow-hidden rounded-2xl"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {mobileBanners.map((banner, i) => (
            <div
              key={banner.id}
              className="relative aspect-[4/3] w-full shrink-0"
            >
              {banner.image ? (
                <Image
                  src={banner.image}
                  alt={banner.title}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="object-cover"
                />
              ) : (
                <div className="bg-muted text-muted-foreground flex h-full items-center justify-center">
                  Tidak ada gambar
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </div>
          ))}
        </div>

        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
          {mobileBanners.map((_, i) => (
            <div
              key={i}
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
    </div>
  );
}
