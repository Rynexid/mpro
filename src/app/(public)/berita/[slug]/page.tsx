import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Calendar, User, ArrowLeft, List } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageLayout } from "@/components/layout/page-layout";
import { SidebarLayout } from "@/components/layout/sidebar-layout";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { Badge } from "@/components/shared/badge";
import { Separator } from "@/components/shared/separator";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shared/card";
import {
  getArticleBySlug,
  getLatestArticles,
  incrementArticleViews,
} from "@/lib/db/queries";
import { formatDate } from "@/lib/utils";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Artikel Tidak Ditemukan" };
  return {
    title: article.metaTitle ?? article.title,
    description: article.metaDescription ?? article.excerpt ?? article.title,
    openGraph: {
      title: article.title,
      description: article.excerpt ?? "",
      images: article.coverImage ? [article.coverImage] : [],
      type: "article",
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article || !article.published) notFound();

  await incrementArticleViews(article.id).catch(() => {});

  const related = (await getLatestArticles(4)).filter(
    (a) => a.id !== article.id,
  );

  const lines = article.content.split("\n");
  const toc = lines
    .map((line, i) => ({ i, text: line.trim() }))
    .filter((l) => l.text)
    .map((l) => ({
      id: `para-${l.i}`,
      label: l.text.length > 46 ? `${l.text.slice(0, 46)}…` : l.text,
    }));

  return (
    <PageLayout>
      <Container className="py-8">
        <Breadcrumb
          items={[
            { label: "Berita", href: "/berita" },
            ...(article.category
              ? [
                  {
                    label: article.category.name,
                    href: `/berita?category=${article.category.slug}`,
                  },
                ]
              : []),
            { label: article.title },
          ]}
        />

        <SidebarLayout
          className="mt-6"
          contentClassName="mx-auto w-full max-w-3xl"
          sidebarClassName="lg:w-72"
          sidebar={
            <div className="space-y-6 lg:sticky lg:top-8">
              {toc.length > 0 && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <List className="text-primary h-4 w-4" />
                      Daftar Isi
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <nav>
                      <ul className="space-y-1">
                        {toc.map((t) => (
                          <li key={t.id}>
                            <a
                              href={`#${t.id}`}
                              className="text-muted-foreground hover:text-primary block min-h-[44px] py-2 text-sm transition-colors"
                            >
                              {t.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </CardContent>
                </Card>
              )}

              {related.length > 0 && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Baca Juga</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {related.slice(0, 3).map((a) => (
                      <Link
                        key={a.id}
                        href={`/berita/${a.slug}`}
                        className="group hover:bg-accent block rounded-lg border p-3 transition-colors"
                      >
                        <p className="text-foreground group-hover:text-primary line-clamp-2 font-semibold">
                          {a.title}
                        </p>
                        <p className="text-muted-foreground mt-1 text-xs">
                          {formatDate(a.publishedAt ?? a.createdAt)}
                        </p>
                      </Link>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>
          }
        >
          <article>
            <Link
              href="/berita"
              className="text-muted-foreground hover:text-primary inline-flex min-h-[44px] items-center gap-1 text-sm transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Berita
            </Link>

            <h1 className="text-foreground mt-4 text-3xl leading-tight font-bold sm:text-4xl">
              {article.title}
            </h1>

            <div className="text-muted-foreground mt-4 flex flex-wrap items-center gap-4 text-sm">
              {article.category && (
                <Badge variant="featured">{article.category.name}</Badge>
              )}
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(article.publishedAt ?? article.createdAt)}
              </span>
              {article.author && (
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {article.author.name}
                </span>
              )}
            </div>

            {article.coverImage && (
              <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-xl">
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 768px"
                />
              </div>
            )}

            <Separator className="my-8" />

            <div className="prose prose-neutral text-foreground max-w-none">
              {lines.map((line, i) =>
                line.trim() ? (
                  <p
                    key={i}
                    id={`para-${i}`}
                    className="mb-4 scroll-mt-24 leading-relaxed"
                  >
                    {line}
                  </p>
                ) : (
                  <br key={i} />
                ),
              )}
            </div>
          </article>
        </SidebarLayout>
      </Container>
    </PageLayout>
  );
}
