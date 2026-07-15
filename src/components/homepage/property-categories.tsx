import Link from "next/link";
import {
  LandPlot,
  Home,
  Store,
  Warehouse,
  Factory,
  Calculator,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { PROPERTY_CATEGORIES } from "@/lib/constants";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LandPlot,
  Home,
  Store,
  Warehouse,
  Factory,
  Calculator,
};

export function PropertyCategories() {
  return (
    <Container id="kategori" className="scroll-mt-24 py-16 md:py-24">
      <div className="flex gap-5 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible lg:grid-cols-6">
        {PROPERTY_CATEGORIES.map((category) => {
          const Icon = iconMap[category.icon];
          return (
            <Link
              key={category.slug}
              href={
                category.slug === "simulasi-kpr"
                  ? "/kpr"
                  : `/search?propertyType=${category.slug}`
              }
              className="group hover:text-primary flex min-w-[160px] flex-col items-center gap-4 p-5 text-center transition-colors md:min-w-0"
            >
              <div className="bg-primary/10 group-hover:bg-primary/20 flex h-16 w-16 items-center justify-center rounded-2xl transition-colors">
                {Icon && <Icon className="text-primary h-8 w-8" />}
              </div>
              <span className="text-foreground text-sm leading-tight font-medium">
                {category.label}
              </span>
            </Link>
          );
        })}
      </div>
    </Container>
  );
}
