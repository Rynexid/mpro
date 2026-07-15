import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/layout/section-header";
import { Card, CardContent } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { formatDate } from "@/lib/utils";
import type { ArticleWithDetails } from "@/types";

interface LatestArticlesProps {
  articles: ArticleWithDetails[];
}

export function LatestArticles({ articles }: LatestArticlesProps) {
  if (articles.length === 0) return null;

  const [featured, ...rest] = articles;

  return (
    <Container className="py-16 md:py-24">
      <SectionHeader
        title="Artikel & Berita"
        description="Informasi dan tips seputar properti"
        action={
          <Button variant="outline" asChild>
            <Link href="/berita">Lihat Semua</Link>
          </Button>
        }
      />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Link href={`/berita/${featured.slug}`}>
          <Card className="group h-full overflow-hidden transition-shadow hover:shadow-md">
            <div className="relative aspect-[16/9] overflow-hidden">
              {featured.coverImage ? (
                <Image
                  src={featured.coverImage}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="bg-muted text-muted-foreground flex h-full items-center justify-center">
                  No Image
                </div>
              )}
            </div>
            <CardContent className="p-6">
              <Badge variant="secondary" className="mb-2">
                {featured.category.name}
              </Badge>
              <h3 className="text-foreground group-hover:text-primary line-clamp-2 text-xl font-semibold">
                {featured.title}
              </h3>
              {featured.excerpt && (
                <p className="text-muted-foreground mt-2 line-clamp-2 text-sm">
                  {featured.excerpt}
                </p>
              )}
              <div className="text-muted-foreground mt-4 flex items-center gap-2 text-xs">
                <Clock className="h-3.5 w-3.5" />
                <span>
                  {formatDate(featured.publishedAt || featured.createdAt)}
                </span>
              </div>
            </CardContent>
          </Card>
        </Link>

        <div className="flex flex-col gap-4">
          {rest.slice(0, 4).map((article) => (
            <Link key={article.id} href={`/berita/${article.slug}`}>
              <Card className="group overflow-hidden transition-shadow hover:shadow-md">
                <div className="flex">
                  <div className="relative h-32 w-32 shrink-0 overflow-hidden">
                    {article.coverImage ? (
                      <Image
                        src={article.coverImage}
                        alt={article.title}
                        fill
                        className="object-cover"
                        sizes="128px"
                      />
                    ) : (
                      <div className="bg-muted text-muted-foreground flex h-full items-center justify-center text-xs">
                        No Image
                      </div>
                    )}
                  </div>
                  <CardContent className="flex flex-col justify-center p-4">
                    <Badge
                      variant="secondary"
                      className="mb-1 w-fit text-[10px]"
                    >
                      {article.category.name}
                    </Badge>
                    <h4 className="text-foreground group-hover:text-primary line-clamp-2 font-medium">
                      {article.title}
                    </h4>
                    <div className="text-muted-foreground mt-2 flex items-center gap-2 text-xs">
                      <Clock className="h-3 w-3" />
                      <span>
                        {formatDate(article.publishedAt || article.createdAt)}
                      </span>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}
