import { PageLayout } from "@/components/layout/page-layout";
import { Container } from "@/components/layout/container";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shared/card";
import { Separator } from "@/components/shared/separator";
import { DeleteButton } from "@/components/admin/delete-button";
import { PropertyTypeForm } from "@/components/admin/property-type-form";
import { getPropertyTypes } from "@/lib/db/queries";
import { deletePropertyType } from "@/lib/actions";

export default async function AdminTipePropertiPage() {
  const list = await getPropertyTypes();

  return (
    <PageLayout>
      <Container className="py-8">
        <Breadcrumb
          items={[
            { label: "Admin", href: "/admin" },
            { label: "Tipe Properti" },
          ]}
        />

        <h2 className="text-foreground mt-6 text-2xl font-bold tracking-tight">
          Tipe Properti
        </h2>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Daftar Tipe Properti</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {list.length === 0 ? (
              <p className="text-muted-foreground px-6 py-10 text-center text-sm">
                Belum ada tipe properti.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-border text-muted-foreground border-b text-left">
                      <th className="px-6 py-3 font-medium">Nama</th>
                      <th className="px-6 py-3 font-medium">Slug</th>
                      <th className="px-6 py-3 font-medium">Ikon</th>
                      <th className="px-6 py-3 font-medium">Urutan</th>
                      <th className="px-6 py-3 text-right font-medium">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((pt) => (
                      <tr
                        key={pt.id}
                        className="border-border border-b last:border-0"
                      >
                        <td className="text-foreground px-6 py-4 font-medium">
                          {pt.name}
                        </td>
                        <td className="text-muted-foreground px-6 py-4">
                          {pt.slug}
                        </td>
                        <td className="text-muted-foreground px-6 py-4">
                          {pt.icon ?? "-"}
                        </td>
                        <td className="text-muted-foreground px-6 py-4">
                          {pt.sortOrder}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end">
                            <DeleteButton
                              action={() => deletePropertyType(pt.id)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        <Separator className="my-8" />

        <PropertyTypeForm mode="create" />
      </Container>
    </PageLayout>
  );
}
