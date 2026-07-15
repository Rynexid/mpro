"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/shared/button";
import Link from "next/link";
import type { HeroBanner } from "@/lib/constants";

interface DesktopBannerProps {
  banners: HeroBanner[];
  onActiveChange?: (index: number) => void;
}

export function DesktopBanner({ banners, onActiveChange }: DesktopBannerProps) {
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

  return (
    <div className="hidden lg:block">
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
        className="group relative aspect-[16/9] w-full overflow-hidden rounded-[28px] shadow-xl outline-none lg:h-[600px]"
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
          </div>
        );
      })}

      <button
        type="button"
        aria-label="Sebelumnya"
        onClick={() => go(-1)}
        className="absolute top-1/2 left-4 z-20 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white opacity-0 backdrop-blur-sm transition-opacity hover:bg-black/50 group-hover:opacity-100"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="Berikutnya"
        onClick={() => go(1)}
        className="absolute top-1/2 right-4 z-20 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white opacity-0 backdrop-blur-sm transition-opacity hover:bg-black/50 group-hover:opacity-100"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-5 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-2 md:flex">
        {banners.map((_, i) => (
          <button
            key={i}
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
    </div>
    </div>
  );
}