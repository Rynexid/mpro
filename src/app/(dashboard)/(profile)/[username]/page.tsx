import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CalendarDays, Mail, Phone } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/layout/section-header";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/shared/avatar";
import { Badge } from "@/components/shared/badge";
import { PropertyCard } from "@/components/property/property-card";
import { getUserByUsername, getPropertiesByAgentId } from "@/lib/db/queries";
import { formatDate } from "@/lib/utils";

interface ProfilePageProps {
  params: Promise<{ username: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: ProfilePageProps): Promise<Metadata> {
  const { username } = await params;
  const user = await getUserByUsername(username);
  if (!user) return { title: "Profil Tidak Ditemukan" };
  return {
    title: `${user.name} (@${user.username})`,
    description: `Profil ${user.name} di Maha Properti.`,
  };
}

const roleLabels: Record<string, string> = {
  user: "User",
  admin: "Admin",
  sudo: "Sudo",
};

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;
  const user = await getUserByUsername(username);

  if (!user) notFound();

  const listings = await getPropertiesByAgentId(user.id, 12);

  return (
    <Container className="py-10 md:py-14">
      <nav className="text-muted-foreground mb-6 flex items-center gap-2 text-sm">
        <Link href="/" className="hover:text-foreground">
          Beranda
        </Link>
        <span>/</span>
        <span className="text-foreground">Profil</span>
        <span>/</span>
        <span className="text-foreground">@{user.username}</span>
      </nav>

      <div className="bg-card rounded-3xl border p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <Avatar className="h-20 w-20 text-lg">
            {user.image && <AvatarImage src={user.image} alt={user.name} />}
            <AvatarFallback>{initials(user.name)}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-foreground text-2xl font-bold">
                {user.name}
              </h1>
              <Badge variant={user.role === "user" ? "secondary" : "default"}>
                {roleLabels[user.role] ?? "Member"}
              </Badge>
            </div>
            <p className="text-muted-foreground mt-1 text-sm">
              @{user.username}
            </p>
            <div className="text-muted-foreground mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" />
                Bergabung {formatDate(user.createdAt)}
              </span>
              {user.email && (
                <span className="flex items-center gap-1.5">
                  <Mail className="h-4 w-4" />
                  {user.email}
                </span>
              )}
              {user.phone && (
                <span className="flex items-center gap-1.5">
                  <Phone className="h-4 w-4" />
                  {user.phone}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <SectionHeader
          title="Properti yang Dipasarkan"
          description={`${listings.length} properti dipasarkan oleh ${user.name}`}
        />
        {listings.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <p className="bg-muted/30 text-muted-foreground rounded-xl border border-dashed p-10 text-center text-sm">
            Belum ada properti yang dipasarkan.
          </p>
        )}
      </div>
    </Container>
  );
}
