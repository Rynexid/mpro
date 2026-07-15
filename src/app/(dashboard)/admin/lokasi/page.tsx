import { PageLayout } from "@/components/layout/page-layout";
import { Container } from "@/components/layout/container";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shared/card";
import { DeleteButton } from "@/components/admin/delete-button";
import { LocationForm } from "@/components/admin/location-form";
import { getProvinces, getCities, getDistricts } from "@/lib/db/queries";
import { deleteLocation } from "@/lib/actions";

export default async function AdminLokasiPage() {
  const [provinces, cities, districts] = await Promise.all([
    getProvinces(),
    getCities(),
    getDistricts(),
  ]);

  return (
    <PageLayout>
      <Container className="py-8">
        <Breadcrumb
          items={[{ label: "Admin", href: "/admin" }, { label: "Lokasi" }]}
        />

        <h2 className="text-foreground mt-6 text-2xl font-bold tracking-tight">
          Lokasi
        </h2>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Provinsi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-1 text-sm">
                {provinces.length === 0 ? (
                  <li className="text-muted-foreground">Belum ada provinsi.</li>
                ) : (
                  provinces.map((p) => (
                    <li
                      key={p.id}
                      className="border-border flex items-center justify-between gap-2 border-b py-1.5 last:border-0"
                    >
                      <span className="text-foreground">{p.name}</span>
                      <DeleteButton
                        action={() => deleteLocation("province", p.id)}
                        label="Hapus"
                      />
                    </li>
                  ))
                )}
              </ul>
              <LocationForm kind="province" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kota</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-1 text-sm">
                {cities.length === 0 ? (
                  <li className="text-muted-foreground">Belum ada kota.</li>
                ) : (
                  cities.map((c) => (
                    <li
                      key={c.id}
                      className="border-border flex items-center justify-between gap-2 border-b py-1.5 last:border-0"
                    >
                      <span className="text-foreground">{c.name}</span>
                      <DeleteButton
                        action={() => deleteLocation("city", c.id)}
                        label="Hapus"
                      />
                    </li>
                  ))
                )}
              </ul>
              <LocationForm kind="city" provinces={provinces} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kecamatan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-1 text-sm">
                {districts.length === 0 ? (
                  <li className="text-muted-foreground">
                    Belum ada kecamatan.
                  </li>
                ) : (
                  districts.map((d) => (
                    <li
                      key={d.id}
                      className="border-border flex items-center justify-between gap-2 border-b py-1.5 last:border-0"
                    >
                      <span className="text-foreground">{d.name}</span>
                      <DeleteButton
                        action={() => deleteLocation("district", d.id)}
                        label="Hapus"
                      />
                    </li>
                  ))
                )}
              </ul>
              <LocationForm kind="district" cities={cities} />
            </CardContent>
          </Card>
        </div>
      </Container>
    </PageLayout>
  );
}
