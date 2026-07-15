import Link from "next/link";
import { Plus } from "lucide-react";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { Button } from "@/components/shared/button";
import { Card, CardContent } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Container } from "@/components/layout/container";
import { PageLayout } from "@/components/layout/page-layout";
import { DeleteButton } from "@/components/admin/delete-button";
import { getAdminProperties } from "@/lib/db/queries";
import { deleteProperty } from "@/lib/actions";
import { formatPrice } from "@/lib/utils";

export default async function AdminPropertiesPage() {
  const list = await getAdminProperties();

  return (
    <PageLayout>
      <Container className="py-8 md:py-10">
        <Breadcrumb
          items={[{ label: "Admin", href: "/admin" }, { label: "Properti" }]}
        />

        <div className="mt-6 flex items-center justify-between">
          <div>
            <h1 className="text-foreground text-2xl font-bold tracking-tight md:text-3xl">
              Properti
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Kelola seluruh properti yang tersedia di marketplace.
            </p>
          </div>
          <Button asChild>
            <Link href="/admin/properti/new">
              <Plus />
              Tambah Properti
            </Link>
          </Button>
        </div>

        <Card className="mt-6">
          <CardContent className="p-0">
            {list.length === 0 ? (
              <div className="text-muted-foreground p-10 text-center text-sm">
                Belum ada properti
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-border bg-muted/30 text-muted-foreground border-b text-xs tracking-wide uppercase">
                    <tr>
                      <th className="px-4 py-3 font-medium">#</th>
                      <th className="px-4 py-3 font-medium">Judul</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium">Harga</th>
                      <th className="px-4 py-3 font-medium">Lokasi</th>
                      <th className="px-4 py-3 font-medium">Unggulan</th>
                      <th className="px-4 py-3 text-right font-medium">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-border divide-y">
                    {list.map((property, index) => (
                      <tr
                        key={property.id}
                        className="hover:bg-muted/20 transition-colors"
                      >
                        <td className="text-muted-foreground px-4 py-3">
                          {index + 1}
                        </td>
                        <td className="px-4 py-3">
                          {property.slug ? (
                            <Link
                              href={`/search/${property.slug}`}
                              className="text-foreground hover:text-primary font-medium transition-colors hover:underline"
                            >
                              {property.title}
                            </Link>
                          ) : (
                            <span className="text-foreground font-medium">
                              {property.title}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <Badge
                            variant={
                              property.status === "sale" ? "info" : "secondary"
                            }
                          >
                            {property.status === "sale" ? "Dijual" : "Disewa"}
                          </Badge>
                        </td>
                        <td className="text-foreground px-4 py-3">
                          {formatPrice(Number(property.price))}
                        </td>
                        <td className="text-muted-foreground px-4 py-3">
                          {property.city?.name ?? "-"}
                        </td>
                        <td className="px-4 py-3">
                          {property.featured ? (
                            <Badge variant="featured">Unggulan</Badge>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-2">
                            <Button asChild variant="outline" size="sm">
                              <Link href={`/admin/properti/${property.id}`}>
                                Edit
                              </Link>
                            </Button>
                            <DeleteButton
                              action={() => deleteProperty(property.id)}
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
      </Container>
    </PageLayout>
  );
}
