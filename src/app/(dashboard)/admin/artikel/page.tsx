import Link from "next/link";
import { Plus } from "lucide-react";
import { PageLayout } from "@/components/layout/page-layout";
import { Container } from "@/components/layout/container";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { Button } from "@/components/shared/button";
import { Card, CardContent } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { DeleteButton } from "@/components/admin/delete-button";
import { getAdminArticles } from "@/lib/db/queries";
import { deleteArticle } from "@/lib/actions";
import { formatDate } from "@/lib/utils";

export default async function AdminArtikelPage() {
  const list = await getAdminArticles();

  return (
    <PageLayout>
      <Container className="py-8">
        <Breadcrumb
          items={[{ label: "Admin", href: "/admin" }, { label: "Artikel" }]}
        />

        <div className="mt-6 flex items-center justify-between gap-4">
          <h2 className="text-foreground text-2xl font-bold tracking-tight">
            Artikel
          </h2>
          <Button asChild>
            <Link href="/admin/artikel/new">
              <Plus />
              Tulis Artikel
            </Link>
          </Button>
        </div>

        <Card className="mt-6">
          <CardContent className="p-0">
            {list.length === 0 ? (
              <p className="text-muted-foreground px-6 py-10 text-center text-sm">
                Belum ada artikel. Klik “Tulis Artikel” untuk membuat yang
                pertama.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-border text-muted-foreground border-b text-left">
                      <th className="px-6 py-3 font-medium">Judul</th>
                      <th className="px-6 py-3 font-medium">Kategori</th>
                      <th className="px-6 py-3 font-medium">Status</th>
                      <th className="px-6 py-3 font-medium">Diperbarui</th>
                      <th className="px-6 py-3 text-right font-medium">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((article) => (
                      <tr
                        key={article.id}
                        className="border-border border-b last:border-0"
                      >
                        <td className="text-foreground px-6 py-4 font-medium">
                          {article.title}
                        </td>
                        <td className="text-muted-foreground px-6 py-4">
                          {article.category?.name ?? "-"}
                        </td>
                        <td className="px-6 py-4">
                          {article.published ? (
                            <Badge variant="success">Published</Badge>
                          ) : (
                            <Badge variant="outline">Draft</Badge>
                          )}
                        </td>
                        <td className="text-muted-foreground px-6 py-4">
                          {formatDate(article.updatedAt)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <Button asChild variant="outline" size="sm">
                              <Link href={`/admin/artikel/${article.id}`}>
                                Edit
                              </Link>
                            </Button>
                            <DeleteButton
                              action={() => deleteArticle(article.id)}
                              label="Hapus"
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
