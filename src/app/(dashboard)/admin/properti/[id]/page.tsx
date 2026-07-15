import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { Container } from "@/components/layout/container";
import { PageLayout } from "@/components/layout/page-layout";
import { PropertyForm } from "@/components/admin/property-form";
import { getPropertyById } from "@/lib/db/queries";
import {
  getPropertyTypes,
  getProvinces,
  getCities,
  getDistricts,
} from "@/lib/db/queries";

interface EditPropertyPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPropertyPage({
  params,
}: EditPropertyPageProps) {
  const { id } = await params;
  const property = await getPropertyById(id);
  if (!property) notFound();

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
            { label: "Edit" },
          ]}
        />

        <h1 className="text-foreground mt-6 text-2xl font-bold tracking-tight md:text-3xl">
          Edit Properti
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Perbarui detail properti &quot;{property.title}&quot;.
        </p>

        <div className="mt-6">
          <PropertyForm
            mode="edit"
            initial={property}
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
