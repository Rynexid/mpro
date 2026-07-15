import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { PageLayout } from "@/components/layout/page-layout";
import { PropertyFilters } from "@/components/property/property-filters";
import { PropertySearchBar } from "@/components/property/property-search-bar";
import { PropertyCard } from "@/components/property/property-card";
import { Pagination } from "@/components/shared/pagination";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { getProperties } from "@/lib/db/queries";
import { propertySearchSchema } from "@/lib/validations";

export const metadata: Metadata = {
  title: "Cari Properti",
  description:
    "Temukan properti terbaik untuk dijual atau disewa di seluruh Indonesia.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function num(v: string | string[] | undefined): number | undefined {
  if (v === undefined) return undefined;
  const s = Array.isArray(v) ? v[0] : v;
  const n = Number(s);
  return Number.isFinite(n) ? n : undefined;
}

function str(v: string | string[] | undefined): string | undefined {
  if (v === undefined) return undefined;
  const s = Array.isArray(v) ? v[0] : v;
  return s || undefined;
}

function bool(v: string | string[] | undefined): boolean | undefined {
  const s = str(v);
  if (s === undefined) return undefined;
  return s === "true" || s === "1";
}

export default async function PropertySearchPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;

  const parsed = propertySearchSchema.parse({
    query: str(sp.query),
    status: str(sp.status),
    propertyType: str(sp.propertyType),
    provinceId: str(sp.provinceId),
    cityId: str(sp.cityId),
    districtId: str(sp.districtId),
    minPrice: num(sp.minPrice),
    maxPrice: num(sp.maxPrice),
    minLandArea: num(sp.minLandArea),
    maxLandArea: num(sp.maxLandArea),
    minBuildingArea: num(sp.minBuildingArea),
    maxBuildingArea: num(sp.maxBuildingArea),
    bedrooms: num(sp.bedrooms),
    bathrooms: num(sp.bathrooms),
    certificate: str(sp.certificate),
    furnished: str(sp.furnished),
    condition: str(sp.condition),
    featured: bool(sp.featured),
    sort: str(sp.sort),
    page: num(sp.page) ?? 1,
    limit: num(sp.limit) ?? 12,
  });

  const [result] = await Promise.all([getProperties(parsed)]);

  const filters = {
    query: parsed.query,
    status: parsed.status,
    propertyType: parsed.propertyType,
    provinceId: parsed.provinceId,
    cityId: parsed.cityId,
    districtId: parsed.districtId,
    minPrice: parsed.minPrice,
    maxPrice: parsed.maxPrice,
    minLandArea: parsed.minLandArea,
    maxLandArea: parsed.maxLandArea,
    minBuildingArea: parsed.minBuildingArea,
    maxBuildingArea: parsed.maxBuildingArea,
    bedrooms: parsed.bedrooms,
    bathrooms: parsed.bathrooms,
    certificate: parsed.certificate,
    furnished: parsed.furnished,
    condition: parsed.condition,
    featured: parsed.featured,
    sort: parsed.sort,
    page: parsed.page,
    limit: parsed.limit,
  };

  return (
    <PageLayout>
      <Container className="py-6 md:py-8">
        <Breadcrumb items={[{ label: "Properti" }]} />

        <header className="mt-5 md:mt-6">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Cari Properti
          </h1>
          <p className="text-muted-foreground mt-1.5 text-sm md:text-base">
            Temukan properti terbaik untuk dijual atau disewa di seluruh
            Indonesia.
          </p>
        </header>

        <div className="mt-6">
          <PropertySearchBar />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:mt-8 lg:grid-cols-[300px_1fr] lg:gap-8">
          <PropertyFilters filters={filters} />

          <div className="min-w-0">
            <p className="text-muted-foreground text-sm">
              {result.total} properti ditemukan
            </p>

            {result.data.length === 0 ? (
              <div className="text-muted-foreground mt-8 rounded-xl border border-dashed py-16 text-center">
                Belum ada properti yang sesuai dengan filter Anda.
              </div>
            ) : (
              <div className="mt-4 grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
                {result.data.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}

            {result.totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                  currentPage={result.page}
                  totalPages={result.totalPages}
                  buildHref={(page: number) => {
                    const params = new URLSearchParams();
                    Object.entries(filters).forEach(([key, value]) => {
                      if (
                        value !== undefined &&
                        value !== "" &&
                        key !== "page" &&
                        key !== "limit"
                      ) {
                        params.set(key, String(value));
                      }
                    });
                    params.set("page", String(page));
                    return `/search?${params.toString()}`;
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </Container>
    </PageLayout>
  );
}
