import Link from "next/link";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/layout/section-header";
import { PropertyCard } from "@/components/property/property-card";
import { Button } from "@/components/shared/button";
import type { PropertyWithDetails } from "@/types";

interface LatestPropertiesProps {
  properties: PropertyWithDetails[];
}

export function LatestProperties({ properties }: LatestPropertiesProps) {
  if (properties.length === 0) return null;

  return (
    <Container className="bg-muted/30 py-16 md:py-24">
      <SectionHeader
        title="Properti Terbaru"
        description="Properti baru yang baru saja diunggah"
        action={
          <Button variant="outline" asChild>
            <Link href="/search?sort=latest">Lihat Semua</Link>
          </Button>
        }
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-4">
        {properties.slice(0, 15).map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </Container>
  );
}
