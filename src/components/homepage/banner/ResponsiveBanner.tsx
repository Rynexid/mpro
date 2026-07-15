"use client";

import { MobileBanner } from "./MobileBanner";
import { TabletBanner } from "./TabletBanner";
import { DesktopBanner } from "./DesktopBanner";
import type { HeroBanner } from "@/lib/constants";

export function ResponsiveBanner({
  banners,
  onActiveChange,
}: {
  banners: HeroBanner[];
  onActiveChange?: (index: number) => void;
}) {
  return (
    <>
      <MobileBanner banners={banners} onActiveChange={onActiveChange} />
      <TabletBanner banners={banners} onActiveChange={onActiveChange} />
      <DesktopBanner banners={banners} onActiveChange={onActiveChange} />
    </>
  );
}
