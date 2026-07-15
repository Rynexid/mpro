import Link from "next/link";
import Image from "next/image";
import { Calendar, User } from "lucide-react";
import { Card, CardContent } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { formatDate } from "@/lib/utils";
import type { ArticleWithDetails } from "@/types";

interface ArticleCardProps {
  article: ArticleWithDetails;
  className?: string;
}

export function ArticleCard({ article, className }: ArticleCardProps) {
  return (
    <Card
      className={`group overflow-hidden transition-shadow hover:shadow-md ${className ?? ""}`}
    >
      <Link href={`/berita/${article.slug}`} className="block">
        <div className="relative aspect-[16/9] overflow-hidden">
          {article.coverImage ? (
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="bg-muted text-muted-foreground flex h-full items-center justify-center">
              Berita
            </div>
          )}
          {article.category && (
            <div className="absolute top-3 left-3">
              <Badge variant="featured">{article.category.name}</Badge>
            </div>
          )}
        </div>
        <CardContent className="p-5">
          <div className="text-muted-foreground flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(article.publishedAt ?? article.createdAt)}
            </span>
            {article.author && (
              <span className="flex items-center gap-1">
                <User className="h-3.5 w-3.5" />
                {article.author.name}
              </span>
            )}
          </div>
          <h3 className="text-foreground group-hover:text-primary mt-2 line-clamp-2 text-lg leading-tight font-semibold transition-colors">
            {article.title}
          </h3>
          {article.excerpt && (
            <p className="text-muted-foreground mt-2 line-clamp-2 text-sm">
              {article.excerpt}
            </p>
          )}
        </CardContent>
      </Link>
    </Card>
  );
}
