import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { PageLayout } from "@/components/layout/page-layout";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { SectionHeader } from "@/components/layout/section-header";
import { ArticleCard } from "@/components/news/article-card";
import { Pagination } from "@/components/shared/pagination";
import { getArticles, getArticleCategories } from "@/lib/db/queries";

export const metadata: Metadata = {
  title: "Artikel & Berita",
  description:
    "Baca artikel dan berita terbaru seputar properti, investasi, dan tips rumah.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const category = typeof sp.category === "string" ? sp.category : undefined;
  const page =
    typeof sp.page === "string" ? Math.max(1, Number(sp.page) || 1) : 1;

  const [result, categories] = await Promise.all([
    getArticles({ published: true, category, sort: "latest", page, limit: 9 }),
    getArticleCategories(),
  ]);

  return (
    <PageLayout>
      <Container className="py-8">
        <Breadcrumb items={[{ label: "Berita" }]} />
        <div className="mt-6">
          <SectionHeader
            title="Artikel & Berita"
            description="Tips, tren, dan wawasan seputar properti Indonesia."
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            href="/berita"
            className={`inline-flex min-h-[44px] items-center rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              !category
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent border"
            }`}
          >
            Semua
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/berita?category=${cat.slug}`}
              className={`inline-flex min-h-[44px] items-center rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                category === cat.slug
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent"
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {result.data.length === 0 ? (
          <div className="text-muted-foreground mt-10 py-12 text-center">
            Belum ada artikel pada kategori ini.
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {result.data.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}

        {result.totalPages > 1 && (
          <div className="mt-10">
            <Pagination
              currentPage={result.page}
              totalPages={result.totalPages}
              buildHref={(p) => {
                const params = new URLSearchParams();
                if (category) params.set("category", category);
                params.set("page", String(p));
                return `/berita?${params.toString()}`;
              }}
            />
          </div>
        )}
      </Container>
    </PageLayout>
  );
}
