"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { HeroBanner } from "@/lib/constants";

interface TabletBannerProps {
  banners: HeroBanner[];
  onActiveChange?: (index: number) => void;
}

export function TabletBanner({ banners, onActiveChange }: TabletBannerProps) {
  const [current, setCurrent] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
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
    <div className="hidden md:block lg:hidden">
      <div
        className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl shadow-xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onKeyDown={onKeyDown}
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
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </div>
          );
        })}

        <button
          type="button"
          aria-label="Sebelumnya"
          onClick={() => go(-1)}
          className="absolute top-1/2 left-3 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-black/50 md:hidden"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Berikutnya"
          onClick={() => go(1)}
          className="absolute top-1/2 right-3 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-black/50 md:hidden"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 md:flex">
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

        <div className="absolute bottom-3 left-1/2 z-10 flex w-[80%] max-w-sm -translate-x-1/2 items-center gap-1.5 md:hidden">
          {banners.map((_, i) => (
            <div
              key={i}
              className="relative h-1 flex-1 overflow-hidden rounded-full bg-white/30"
            >
              {i === current && (
                <div
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
