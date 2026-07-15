import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  MapPin,
  Ruler,
  Maximize,
  BedDouble,
  Bath,
  Layers,
  Car,
  BadgeCheck,
  Building2,
  Home,
  Eye,
  CalendarDays,
  Tag,
  Route,
  School,
  Hospital,
  ShoppingBag,
  Train,
  Plane,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Wifi,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { Container } from "@/components/layout/container";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { PropertyGallery } from "@/components/property/property-gallery";
import { DescriptionBlock } from "@/components/property/description-block";
import { FacilityGrid } from "@/components/property/facility-grid";
import { MortgageCalculator } from "@/components/property/mortgage-calculator";
import { ContactPanel } from "@/components/property/contact-panel";
import { MobileActionBar } from "@/components/property/mobile-action-bar";
import { ScheduleVisitDialog } from "@/components/property/schedule-visit-dialog";
import { FavoriteButton } from "@/components/property/favorite-button";
import { ShareButton } from "@/components/property/share-button";
import { RelatedProperties } from "@/components/property/related-properties";
import {
  getPropertyBySlug,
  getRelatedProperties,
  incrementPropertyViews,
  recordRecentlyViewed,
} from "@/lib/db/queries";
import { getCurrentUser } from "@/lib/auth";
import {
  formatPrice,
  formatArea,
  formatDate,
  calculateMortgage,
} from "@/lib/utils";
import { FOOTER_COMPANY } from "@/lib/constants";
import type { PropertyWithDetails } from "@/types";

type Params = Promise<{ slug: string }>;

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) return { title: "Properti Tidak Ditemukan" };
  return {
    title: property.title,
    description: property.description.slice(0, 160),
    openGraph: {
      title: property.title,
      description: property.description.slice(0, 160),
      images: property.images?.[0]?.url ? [property.images[0].url] : [],
      type: "website",
    },
  };
}

function buildOverview(property: PropertyWithDetails) {
  const items: { icon: LucideIcon; label: string; value: string }[] = [
    {
      icon: Ruler,
      label: "Luas Tanah",
      value: formatArea(property.landArea ?? 0),
    },
    {
      icon: Maximize,
      label: "Luas Bangunan",
      value: formatArea(property.buildingArea ?? 0),
    },
    {
      icon: BedDouble,
      label: "Kamar Tidur",
      value: `${property.bedrooms ?? 0}`,
    },
    { icon: Bath, label: "Kamar Mandi", value: `${property.bathrooms ?? 0}` },
    { icon: Layers, label: "Jumlah Lantai", value: `${property.floors ?? 0}` },
    { icon: Car, label: "Carport", value: `${property.carport ?? 0}` },
  ];
  if (property.certificate)
    items.push({
      icon: BadgeCheck,
      label: "Sertifikat",
      value: property.certificate,
    });
  if (property.condition)
    items.push({
      icon: Building2,
      label: "Kondisi",
      value: property.condition === "baru" ? "Baru" : "Bekas",
    });
  if (property.furnished)
    items.push({
      icon: Home,
      label: "Interior",
      value:
        property.furnished === "furnished"
          ? "Fully Furnished"
          : property.furnished === "semi_furnished"
            ? "Semi Furnished"
            : "Unfurnished",
    });
  return items;
}

function buildSnapshot(property: PropertyWithDetails) {
  const items: { icon: LucideIcon; label: string }[] = [];
  if (property.certificate)
    items.push({
      icon: BadgeCheck,
      label: `Sertifikat ${property.certificate}`,
    });
  if (property.condition === "baru" || property.furnished === "furnished")
    items.push({ icon: CheckCircle2, label: "Siap Huni" });
  if (property.officialDeveloper)
    items.push({ icon: Building2, label: "Pengembang Resmi" });
  if (property.verified)
    items.push({ icon: ShieldCheck, label: "Terverifikasi" });
  items.push({ icon: Route, label: "Dekat Jalan Tol" });
  if (property.facilities.some((f) => /smart/i.test(f.name)))
    items.push({ icon: Wifi, label: "Smart Home Ready" });
  if (property.facilities.some((f) => /keamanan|security/i.test(f.name)))
    items.push({ icon: ShieldCheck, label: "Area Aman" });
  return items;
}

const locationInsights = [
  { icon: Route, label: "Jalan Tol", value: "5 menit" },
  { icon: School, label: "Sekolah", value: "3 menit" },
  { icon: Hospital, label: "Rumah Sakit", value: "6 menit" },
  { icon: ShoppingBag, label: "Pusat Perbelanjaan", value: "8 menit" },
  { icon: Train, label: "Stasiun", value: "12 menit" },
  { icon: Plane, label: "Bandara", value: "45 menit" },
];

/**
 * Mobile: collapsible <details> accordion. Desktop (md+): always-visible section.
 * Children are rendered in both trees; one is hidden per breakpoint via CSS.
 */
function AccordionSection({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <>
      <details
        className="bg-card border-border group rounded-3xl border shadow-sm md:hidden"
        open={defaultOpen}
      >
        <summary className="text-foreground flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-lg font-bold [&::-webkit-details-marker]:hidden">
          {title}
          <ChevronDown className="text-muted-foreground h-5 w-5 shrink-0 transition-transform duration-300 group-open:rotate-180 motion-reduce:transition-none" />
        </summary>
        <div className="border-border border-t p-5">{children}</div>
      </details>
      <section className="hidden md:block">
        <h2 className="text-foreground mb-5 text-xl font-bold">{title}</h2>
        {children}
      </section>
    </>
  );
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) notFound();

  const user = await getCurrentUser();
  await incrementPropertyViews(property.id).catch(() => {});
  if (user) await recordRecentlyViewed(user.id, property.id).catch(() => {});

  const images = [...property.images].sort((a, b) => a.sortOrder - b.sortOrder);
  const related = await getRelatedProperties(
    property.propertyTypeId,
    property.id,
    8,
  );

  const locationText = [
    property.district?.name,
    property.city?.name,
    property.province?.name,
  ]
    .filter(Boolean)
    .join(", ");

  const overview = buildOverview(property);
  const snapshot = buildSnapshot(property);
  const monthly = calculateMortgage(
    property.price,
    property.price * 0.2,
    8.5,
    15,
  );

  const waNumber = (property.agent?.phone || FOOTER_COMPANY.whatsapp).replace(
    /\D/g,
    "",
  );
  const whatsappHref = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    `Halo, saya tertarik dengan properti "${property.title}" seharga ${formatPrice(
      property.price,
    )}. Boleh info lebih lanjut?`,
  )}`;

  const mapQuery =
    property.latitude && property.longitude
      ? `${property.latitude},${property.longitude}`
      : locationText;
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    mapQuery,
  )}&z=15&output=embed`;

  return (
    <>
      <Container className="pt-6 pb-28 md:py-8">
        <Breadcrumb
          items={[
            { label: "Properti", href: "/search" },
            {
              label: property.propertyType.name,
              href: `/search?propertyType=${property.propertyType.slug}`,
            },
            {
              label: property.city?.name ?? "Lokasi",
              href: `/search?cityId=${property.cityId ?? ""}`,
            },
            { label: property.title },
          ]}
        />

        <div className="mt-6">
          <PropertyGallery
            images={images}
            propertyId={property.id}
            title={property.title}
            featured={property.featured}
            verified={property.verified}
            officialDeveloper={property.officialDeveloper}
            price={formatPrice(property.price)}
            location={locationText}
            propertyType={property.propertyType.name}
            monthly={formatPrice(Math.round(monthly))}
          />
        </div>

        {/* Quick Summary */}
        <div className="bg-card mt-8 rounded-3xl border p-6 shadow-sm md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant={property.status === "sale" ? "success" : "info"}
                >
                  {property.status === "sale" ? "Dijual" : "Disewa"}
                </Badge>
                {property.featured && (
                  <Badge variant="featured" className="gap-1">
                    <Sparkles className="h-3 w-3" />
                    Unggulan
                  </Badge>
                )}
              </div>
              <h1 className="text-foreground mt-3 text-2xl font-bold md:text-3xl">
                {property.title}
              </h1>
              <p className="text-muted-foreground mt-2 flex items-center gap-1.5 text-sm">
                <MapPin className="h-4 w-4 shrink-0" />
                {locationText}
              </p>
            </div>
            <div className="text-right">
              <p className="text-muted-foreground text-xs tracking-wide uppercase">
                Mulai dari
              </p>
              <p className="text-primary text-2xl font-bold md:text-3xl">
                {formatPrice(property.price)}
              </p>
              <p className="text-muted-foreground mt-1 text-sm">
                Cicilan {formatPrice(Math.round(monthly))}/bln
              </p>
            </div>
          </div>

          <div className="text-muted-foreground mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 border-t pt-4 text-sm">
            <span className="flex items-center gap-1.5">
              <Tag className="h-4 w-4" />
              {property.propertyType.name}
            </span>
            <span className="flex items-center gap-1.5">
              <Eye className="h-4 w-4" />
              {property.viewCount} dilihat
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" />
              Dipublikasi {formatDate(property.createdAt)}
            </span>
            {property.updatedAt > property.createdAt && (
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" />
                Diperbarui {formatDate(property.updatedAt)}
              </span>
            )}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Button asChild className="h-12 gap-2">
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </Button>
            <ScheduleVisitDialog
              propertyId={property.id}
              propertyTitle={property.title}
              variant="outline"
              className="h-12"
            />
            <FavoriteButton
              propertyId={property.id}
              variant="full"
              className="h-12"
            />
            <ShareButton
              title={property.title}
              variant="outline"
              className="h-12"
            />
          </div>
        </div>

        {/* Property Snapshot */}
        {snapshot.length > 0 && (
          <div className="bg-card mt-6 grid grid-cols-2 gap-3 rounded-3xl border p-4 shadow-sm sm:grid-cols-3 md:p-5 lg:grid-cols-4">
            {snapshot.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-2.5 rounded-2xl border border-emerald-500/15 bg-emerald-500/5 p-3"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-foreground text-sm leading-tight font-medium">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Main content + agent */}
        <div className="mt-10 space-y-8 md:space-y-12 lg:grid lg:grid-cols-[1fr_360px] lg:gap-10">
          <main className="space-y-8 md:space-y-12">
            {/* Overview */}
            <AccordionSection title="Spesifikasi Properti" defaultOpen>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {overview.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="bg-card hover:border-primary/40 flex items-center gap-3 rounded-2xl border p-4 transition-colors"
                    >
                      <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">
                          {item.label}
                        </p>
                        <p className="text-foreground font-semibold">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </AccordionSection>

            {/* Description */}
            <AccordionSection title="Deskripsi Properti" defaultOpen>
              <DescriptionBlock text={property.description} />
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="bg-card rounded-2xl border p-5">
                  <p className="text-foreground text-sm font-semibold">
                    Catatan Pengembang
                  </p>
                  <p className="text-muted-foreground mt-2 text-sm">
                    Properti ini dikembangkan dengan standar konstruksi premium
                    dan lokasi strategis untuk kenyamanan jangka panjang.
                  </p>
                </div>
                <div className="bg-card rounded-2xl border p-5">
                  <p className="text-foreground text-sm font-semibold">
                    Peluang Investasi
                  </p>
                  <p className="text-muted-foreground mt-2 text-sm">
                    area {property.city?.name ?? "ini"} mencatat permintaan sewa
                    dan beli yang stabil, cocok untuk investasi jangka panjang.
                  </p>
                </div>
                <div className="bg-card rounded-2xl border p-5">
                  <p className="text-foreground text-sm font-semibold">
                    Lingkungan Sekitar
                  </p>
                  <p className="text-muted-foreground mt-2 text-sm">
                    Didukung akses mudah ke fasilitas publik, transportasi, dan
                    pusat komersial terdekat.
                  </p>
                </div>
              </div>
            </AccordionSection>

            {/* Facilities */}
            {property.facilities.length > 0 && (
              <AccordionSection title="Fasilitas" defaultOpen>
                <FacilityGrid facilities={property.facilities} />
              </AccordionSection>
            )}

            {/* Location */}
            <AccordionSection title="Lokasi & Sekitar" defaultOpen>
              <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
                <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border shadow-sm">
                  <iframe
                    title="Peta Lokasi"
                    className="h-full w-full border-0"
                    loading="lazy"
                    src={mapSrc}
                  />
                </div>
                <div className="bg-card rounded-3xl border p-6">
                  <p className="text-foreground mb-4 text-sm font-medium">
                    Waktu Tempuh
                  </p>
                  <ul className="space-y-3">
                    {locationInsights.map((item) => {
                      const Icon = item.icon;
                      return (
                        <li
                          key={item.label}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-muted-foreground flex items-center gap-2">
                            <Icon className="text-primary h-4 w-4" />
                            {item.label}
                          </span>
                          <span className="text-foreground font-medium">
                            {item.value}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                  <p className="text-muted-foreground mt-4 text-xs">
                    Waktu tempuh ilustratif dan akan terintegrasi dengan Google
                    Places API.
                  </p>
                </div>
              </div>
              {property.address && (
                <p className="text-muted-foreground mt-3 flex items-center gap-1.5 text-sm">
                  <MapPin className="h-4 w-4 shrink-0" />
                  {property.address}
                </p>
              )}
            </AccordionSection>

            {/* Mortgage */}
            <AccordionSection title="Simulasi KPR" defaultOpen>
              <MortgageCalculator price={property.price} />
            </AccordionSection>
          </main>

          {/* Agent — mobile/tablet inline, desktop sticky sidebar */}
          <ContactPanel
            agent={{
              name: property.agent?.name ?? "Agen Maha Properti",
              image: property.agent?.image,
              phone: property.agent?.phone,
              email: property.agent?.email,
            }}
            propertyId={property.id}
            propertyTitle={property.title}
            whatsappHref={whatsappHref}
            className="lg:hidden"
          />

          <aside className="hidden lg:block">
            <div className="lg:sticky lg:top-24">
              <ContactPanel
                agent={{
                  name: property.agent?.name ?? "Agen Maha Properti",
                  image: property.agent?.image,
                  phone: property.agent?.phone,
                  email: property.agent?.email,
                }}
                propertyId={property.id}
                propertyTitle={property.title}
                whatsappHref={whatsappHref}
              />
            </div>
          </aside>
        </div>

        {/* Related */}
        {related.length > 0 && <RelatedProperties properties={related} />}
      </Container>

      <MobileActionBar
        propertyId={property.id}
        propertyTitle={property.title}
        whatsappHref={whatsappHref}
      />
    </>
  );
}
