import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Maximize, BedDouble, Bath } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageLayout } from "@/components/layout/page-layout";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { Card, CardContent } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { Badge } from "@/components/shared/badge";
import { PropertyCard } from "@/components/property/property-card";
import { getPropertiesByIds } from "@/lib/db/queries";
import { formatPrice, formatArea } from "@/lib/utils";
import type { PropertyWithDetails } from "@/types";

export const metadata: Metadata = { title: "Bandingkan Properti" };

type SearchParams = Promise<{ ids?: string }>;

type Row = {
  label: string;
  icon?: ReactNode;
  render: (p: PropertyWithDetails) => ReactNode;
};

const iconClass = "text-muted-foreground h-4 w-4 shrink-0";

const ROWS: Row[] = [
  {
    label: "Harga",
    render: (p) => (
      <span className="text-primary font-semibold">{formatPrice(p.price)}</span>
    ),
  },
  { label: "Tipe", render: (p) => p.propertyType?.name ?? "-" },
  {
    label: "Luas Tanah",
    icon: <Maximize className={iconClass} />,
    render: (p) => (p.landArea ? formatArea(p.landArea) : "-"),
  },
  {
    label: "Luas Bangunan",
    icon: <Maximize className={iconClass} />,
    render: (p) => (p.buildingArea ? formatArea(p.buildingArea) : "-"),
  },
  {
    label: "Kamar Tidur",
    icon: <BedDouble className={iconClass} />,
    render: (p) => (p.bedrooms ? `${p.bedrooms} KT` : "-"),
  },
  {
    label: "Kamar Mandi",
    icon: <Bath className={iconClass} />,
    render: (p) => (p.bathrooms ? `${p.bathrooms} KM` : "-"),
  },
  { label: "Lokasi", render: (p) => locationOf(p) },
];

function locationOf(p: PropertyWithDetails) {
  return [p.district?.name, p.city?.name].filter(Boolean).join(", ") || "-";
}

function HeaderCell({ label }: { label: string }) {
  return (
    <th className="text-muted-foreground bg-background sticky top-0 left-0 z-10 w-44 p-4 text-left align-top text-sm font-medium">
      {label}
    </th>
  );
}

function CompareTable({ properties }: { properties: PropertyWithDetails[] }) {
  return (
    <div className="hidden overflow-x-auto rounded-xl border lg:block">
      <table className="w-full min-w-[640px] border-collapse">
        <tbody>
          <tr className="border-b">
            <HeaderCell label="Properti" />
            {properties.map((p) => (
              <td key={p.id} className="w-[260px] p-4 align-top">
                <PropertyCard property={p} />
              </td>
            ))}
          </tr>
          {ROWS.map((row) => (
            <tr key={row.label} className="border-b last:border-0">
              <HeaderCell label={row.label} />
              {properties.map((p) => (
                <td key={p.id} className="p-4 align-top text-sm">
                  {row.render(p)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CompareCards({ properties }: { properties: PropertyWithDetails[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:hidden">
      {properties.map((p) => {
        const image = p.images?.[0];
        return (
          <Card key={p.id} className="overflow-hidden">
            <div className="relative aspect-[4/3] w-full">
              {image ? (
                <Image
                  src={image.url}
                  alt={image.alt || p.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="bg-muted text-muted-foreground flex h-full items-center justify-center">
                  No Image
                </div>
              )}
              <div className="absolute top-3 left-3">
                <Badge variant={p.status === "sale" ? "success" : "info"}>
                  {p.status === "sale" ? "Dijual" : "Disewa"}
                </Badge>
              </div>
            </div>
            <CardContent className="p-5">
              <p className="text-primary text-xl font-bold">
                {formatPrice(p.price)}
              </p>
              <Link
                href={`/search/${p.slug}`}
                className="text-foreground hover:text-primary mt-1 block text-lg leading-tight font-semibold transition-colors"
              >
                {p.title}
              </Link>
              <div className="text-muted-foreground mt-1 flex items-center gap-1 text-sm">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span className="line-clamp-1">{locationOf(p)}</span>
              </div>
              <dl className="mt-4 divide-y border-t">
                {ROWS.filter(
                  (r) => r.label !== "Harga" && r.label !== "Lokasi",
                ).map((r) => (
                  <div
                    key={r.label}
                    className="flex items-center justify-between gap-3 py-3 text-sm"
                  >
                    <dt className="text-muted-foreground flex items-center gap-2">
                      {r.icon}
                      {r.label}
                    </dt>
                    <dd className="text-foreground text-right font-medium">
                      {r.render(p)}
                    </dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export default async function ComparePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const ids = (sp.ids ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 4);

  const properties = await getPropertiesByIds(ids);

  return (
    <PageLayout>
      <Container className="py-8 md:py-10">
        <Breadcrumb
          items={[
            { label: "Properti", href: "/search" },
            { label: "Bandingkan" },
          ]}
        />
        <h1 className="text-foreground mt-6 text-2xl font-bold md:text-3xl">
          Bandingkan Properti
        </h1>

        {properties.length < 2 ? (
          <Card className="mt-8">
            <CardContent className="text-muted-foreground py-12 text-center">
              Pilih minimal 2 properti untuk dibandingkan.{" "}
              <Link
                href="/search"
                className="text-primary font-medium hover:underline"
              >
                Cari properti
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="mt-8">
            <CompareCards properties={properties} />
            <CompareTable properties={properties} />
          </div>
        )}

        <div className="mt-8">
          <Button asChild variant="outline">
            <Link href="/search">Kembali ke Pencarian</Link>
          </Button>
        </div>
      </Container>
    </PageLayout>
  );
}
