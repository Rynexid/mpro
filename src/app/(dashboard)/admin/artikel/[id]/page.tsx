import { notFound } from "next/navigation";
import { PageLayout } from "@/components/layout/page-layout";
import { Container } from "@/components/layout/container";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { ArticleForm } from "@/components/admin/article-form";
import { getArticleById, getArticleCategories } from "@/lib/db/queries";

export default async function EditArtikelPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await getArticleById(id);
  if (!article) notFound();

  const categories = await getArticleCategories();

  return (
    <PageLayout>
      <Container className="py-8">
        <Breadcrumb
          items={[
            { label: "Admin", href: "/admin" },
            { label: "Artikel", href: "/admin/artikel" },
            { label: "Edit" },
          ]}
        />
        <div className="mt-6">
          <ArticleForm categories={categories} initial={article} mode="edit" />
        </div>
      </Container>
    </PageLayout>
  );
}
