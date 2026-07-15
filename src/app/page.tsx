import { Hero } from "@/components/homepage/hero";
import { PropertyCategories } from "@/components/homepage/property-categories";
import { FeaturedProperties } from "@/components/homepage/featured-properties";
import { TrendingProperties } from "@/components/homepage/trending-properties";
import { LatestProperties } from "@/components/homepage/latest-properties";
import { KprSimulator } from "@/components/homepage/kpr-simulator";
import { LatestArticles } from "@/components/homepage/latest-articles";
import { CtaSection } from "@/components/homepage/cta-section";
import { MobileBottomNav } from "@/components/shared/mobile-bottom-nav";
import {
  getFeaturedProperties,
  getLatestProperties,
  getLatestArticles,
} from "@/lib/db/queries";

export default async function HomePage() {
  const [featuredProps, latest, articles] = await Promise.all([
    getFeaturedProperties(8),
    getLatestProperties(15),
    getLatestArticles(5),
  ]);

  const heroHighlight = featuredProps[0]
    ? {
        name: featuredProps[0].title,
        slug: featuredProps[0].slug,
        location:
          [featuredProps[0].city?.name, featuredProps[0].province?.name]
            .filter(Boolean)
            .join(", ") ||
          featuredProps[0].address ||
          "",
        price: featuredProps[0].price,
        image: featuredProps[0].images?.[0]?.url ?? "",
      }
    : undefined;

  return (
    <>
      <Hero featured={heroHighlight} />
      <PropertyCategories />
      <TrendingProperties />
      <FeaturedProperties properties={featuredProps} />
      <LatestProperties properties={latest} />
      <KprSimulator />
      <LatestArticles articles={articles} />
      <CtaSection />
      <MobileBottomNav />
    </>
  );
}
