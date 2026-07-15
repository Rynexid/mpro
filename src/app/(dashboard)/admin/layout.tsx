import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Card } from "@/components/shared/card";
import {
  LayoutDashboard,
  Building2,
  Tag,
  Home,
  MapPin,
  Users,
  UserCheck,
  FileText,
  Image,
  Settings,
} from "lucide-react";

export const dynamic = "force-dynamic";

const sidebarLinks = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Properti", href: "/admin/properti", icon: Building2 },
  { label: "Kategori", href: "/admin/kategori", icon: Tag },
  { label: "Tipe Properti", href: "/admin/tipe-properti", icon: Home },
  { label: "Lokasi", href: "/admin/lokasi", icon: MapPin },
  { label: "Agen", href: "/admin/agen", icon: UserCheck },
  { label: "Pengguna", href: "/admin/pengguna", icon: Users },
  { label: "Artikel", href: "/admin/artikel", icon: FileText },
  { label: "Media", href: "/admin/media", icon: Image },
  { label: "Pengaturan", href: "/admin/pengaturan", icon: Settings },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <aside className="bg-muted/30 hidden w-64 shrink-0 border-r lg:block">
        <div className="sticky top-16 p-4">
          <h2 className="text-muted-foreground mb-4 px-3 text-xs font-semibold tracking-wider uppercase">
            Admin Panel
          </h2>
          <nav className="flex flex-col gap-1">
            {sidebarLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:bg-accent hover:text-accent-foreground flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors"
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>
      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  );
}
