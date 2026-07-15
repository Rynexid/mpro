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
import { CategoryForm } from "@/components/admin/category-form";
import { getCategories } from "@/lib/db/queries";
import { deleteCategory } from "@/lib/actions";

export default async function AdminKategoriPage() {
  const list = await getCategories();

  return (
    <PageLayout>
      <Container className="py-8">
        <Breadcrumb
          items={[{ label: "Admin", href: "/admin" }, { label: "Kategori" }]}
        />

        <h2 className="text-foreground mt-6 text-2xl font-bold tracking-tight">
          Kategori
        </h2>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Daftar Kategori</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {list.length === 0 ? (
              <p className="text-muted-foreground px-6 py-10 text-center text-sm">
                Belum ada kategori.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-border text-muted-foreground border-b text-left">
                      <th className="px-6 py-3 font-medium">Nama</th>
                      <th className="px-6 py-3 font-medium">Slug</th>
                      <th className="px-6 py-3 font-medium">Urutan</th>
                      <th className="px-6 py-3 text-right font-medium">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((cat) => (
                      <tr
                        key={cat.id}
                        className="border-border border-b last:border-0"
                      >
                        <td className="text-foreground px-6 py-4 font-medium">
                          {cat.name}
                        </td>
                        <td className="text-muted-foreground px-6 py-4">
                          {cat.slug}
                        </td>
                        <td className="text-muted-foreground px-6 py-4">
                          {cat.sortOrder}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end">
                            <DeleteButton
                              action={() => deleteCategory(cat.id)}
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

        <CategoryForm mode="create" />
      </Container>
    </PageLayout>
  );
}
