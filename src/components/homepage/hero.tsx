"use client";

import * as React from "react";
import { Container } from "@/components/layout/container";
import { ResponsiveBanner } from "@/components/homepage/banner/ResponsiveBanner";
import { HeroSearch } from "@/components/homepage/hero-search";
import { HERO_BANNERS } from "@/lib/constants";

export function Hero({
  featured,
}: {
  featured?:
    | {
        name: string;
        slug: string;
        location: string;
        price: number;
        image: string;
      }
    | undefined;
}) {
  const [active, setActive] = React.useState(0);

  return (
    <section className="relative pt-6 md:pt-8">
      <Container>
        <ResponsiveBanner banners={HERO_BANNERS} onActiveChange={setActive} />

        <div className="relative z-20 -mt-[60px] px-3 sm:px-6 md:px-10 lg:px-16">
          <HeroSearch key={active} />
        </div>
      </Container>
    </section>
  );
}
