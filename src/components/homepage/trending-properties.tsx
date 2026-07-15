import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/layout/section-header";
import { Button } from "@/components/shared/button";
import Link from "next/link";
import { getTrendingProperties } from "@/lib/db/queries";
import { TrendingCarousel } from "./trending-carousel";

export async function TrendingProperties() {
  const properties = await getTrendingProperties(10);
  if (properties.length === 0) return null;

  return (
    <section className="mt-12">
      <Container>
        <SectionHeader
          title="Trending Today"
          description="Properti paling banyak dilihat saat ini."
          descriptionClassName="hidden md:block"
          action={
            <Button variant="outline" asChild>
              <Link href="/search?sort=trending">Lihat Semua</Link>
            </Button>
          }
        />
        <TrendingCarousel properties={properties.slice(0, 8)} />
      </Container>
    </section>
  );
}