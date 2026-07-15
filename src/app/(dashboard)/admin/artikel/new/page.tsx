import { PageLayout } from "@/components/layout/page-layout";
import { Container } from "@/components/layout/container";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { ArticleForm } from "@/components/admin/article-form";
import { getArticleCategories } from "@/lib/db/queries";

export default async function NewArtikelPage() {
  const categories = await getArticleCategories();

  return (
    <PageLayout>
      <Container className="py-8">
        <Breadcrumb
          items={[
            { label: "Admin", href: "/admin" },
            { label: "Artikel", href: "/admin/artikel" },
            { label: "Tulis" },
          ]}
        />
        <div className="mt-6">
          <ArticleForm categories={categories} mode="create" />
        </div>
      </Container>
    </PageLayout>
  );
}
