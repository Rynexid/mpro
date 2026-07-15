import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/layout/section-header";
import { PropertyCard } from "./property-card";
import type { PropertyWithDetails } from "@/types";
import Link from "next/link";
import { Button } from "@/components/shared/button";

interface RelatedPropertiesProps {
  properties: PropertyWithDetails[];
}

export function RelatedProperties({ properties }: RelatedPropertiesProps) {
  if (properties.length === 0) return null;

  return (
    <Container className="py-12">
      <SectionHeader
        title="Properti Serupa"
        action={
          <Button variant="outline" asChild>
            <Link href="/search">Lihat Semua</Link>
          </Button>
        }
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.slice(0, 3).map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </Container>
  );
}
