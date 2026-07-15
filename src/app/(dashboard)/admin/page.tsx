import type { Metadata } from "next";
import Link from "next/link";
import { Building2, Users, FileText, Eye } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { getAdminStats, getLatestProperties, getUsers } from "@/lib/db/queries";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export default async function AdminDashboardPage() {
  const [stats, recentProperties, recentUsers] = await Promise.all([
    getAdminStats(),
    getLatestProperties(5),
    getUsers(5),
  ]);

  const cards = [
    {
      label: "Total Properti",
      value: String(stats.properties),
      icon: Building2,
      color: "text-blue-500",
    },
    {
      label: "Total Pengguna",
      value: String(stats.users),
      icon: Users,
      color: "text-green-500",
    },
    {
      label: "Total Artikel",
      value: String(stats.articles),
      icon: FileText,
      color: "text-purple-500",
    },
    {
      label: "Total Views",
      value: String(stats.views),
      icon: Eye,
      color: "text-orange-500",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-foreground text-2xl font-bold">Dashboard Admin</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="bg-muted flex h-12 w-12 items-center justify-center rounded-xl">
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Properti Terbaru</CardTitle>
            <Button asChild variant="outline" size="sm">
              <Link href="/admin/properti">Lihat Semua</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentProperties.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                Belum ada properti.
              </p>
            ) : (
              recentProperties.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between text-sm"
                >
                  <Link
                    href={`/search/${p.slug}`}
                    className="text-foreground hover:text-primary truncate font-medium"
                  >
                    {p.title}
                  </Link>
                  <span className="text-muted-foreground shrink-0">
                    {formatPrice(p.price)}
                  </span>
                </div>
              ))
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Pengguna Terbaru</CardTitle>
            <Button asChild variant="outline" size="sm">
              <Link href="/admin/pengguna">Lihat Semua</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentUsers.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                Belum ada pengguna.
              </p>
            ) : (
              recentUsers.map((u) => (
                <div
                  key={u.id}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-foreground truncate font-medium">
                    {u.name}
                  </span>
                  <span className="text-muted-foreground shrink-0">
                    {u.email}
                  </span>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
