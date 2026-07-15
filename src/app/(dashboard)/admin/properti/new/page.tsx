import { Breadcrumb } from "@/components/shared/breadcrumb";
import { Container } from "@/components/layout/container";
import { PageLayout } from "@/components/layout/page-layout";
import { PropertyForm } from "@/components/admin/property-form";
import {
  getPropertyTypes,
  getProvinces,
  getCities,
  getDistricts,
} from "@/lib/db/queries";

export default async function NewPropertyPage() {
  const [propertyTypes, provinces, cities, districts] = await Promise.all([
    getPropertyTypes(),
    getProvinces(),
    getCities(),
    getDistricts(),
  ]);

  return (
    <PageLayout>
      <Container className="py-8 md:py-10">
        <Breadcrumb
          items={[
            { label: "Admin", href: "/admin" },
            { label: "Properti", href: "/admin/properti" },
            { label: "Tambah" },
          ]}
        />

        <h1 className="text-foreground mt-6 text-2xl font-bold tracking-tight md:text-3xl">
          Tambah Properti
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Isi detail properti baru untuk ditampilkan di marketplace.
        </p>

        <div className="mt-6">
          <PropertyForm
            mode="create"
            propertyTypes={propertyTypes}
            provinces={provinces}
            cities={cities}
            districts={districts}
          />
        </div>
      </Container>
    </PageLayout>
  );
}
