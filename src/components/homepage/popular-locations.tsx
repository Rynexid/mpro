import Link from "next/link";
import { MapPin } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/layout/section-header";
import { POPULAR_LOCATIONS } from "@/lib/constants";

export function PopularLocations() {
  return (
    <Container className="py-16 md:py-24">
      <SectionHeader
        title="Lokasi Populer"
        description="Temukan properti di kota-kota besar Indonesia"
        centered
      />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {POPULAR_LOCATIONS.map((location) => (
          <Link
            key={location.city}
            href={`/search?query=${location.city}`}
            className="group bg-card hover:border-primary/50 relative overflow-hidden rounded-xl border p-6 transition-all hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-foreground group-hover:text-primary font-semibold">
                  {location.city}
                </h3>
                <p className="text-muted-foreground mt-1 flex items-center gap-1 text-sm">
                  <MapPin className="h-3.5 w-3.5" />
                  {location.province}
                </p>
              </div>
              <span className="text-muted-foreground text-xs">
                {location.count.toLocaleString("id-ID")} properti
              </span>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
}
