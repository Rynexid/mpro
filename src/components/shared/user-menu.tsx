"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Settings, Heart, Clock, LogOut, User } from "lucide-react";
import { Button } from "@/components/shared/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shared/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shared/dropdown-menu";
import { authClient } from "@/lib/auth-client";

interface UserMenuProps {
  user?: {
    name: string;
    email: string;
    image?: string | null;
    username?: string | null;
  } | null;
}

export function UserMenu({ user }: UserMenuProps) {
  const router = useRouter();

  if (!user) {
    return (
      <div className="hidden items-center gap-2 sm:flex">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/login">Masuk</Link>
        </Button>
        <Button size="sm" asChild>
          <Link href="/register">Daftar</Link>
        </Button>
      </div>
    );
  }

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const profileHref = `/${user.username ?? ""}`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.image || undefined} alt={user.name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <Link href={profileHref} className="flex items-center gap-2 p-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.image || undefined} alt={user.name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-muted-foreground text-xs">@{user.username}</p>
          </div>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={profileHref} className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profil Saya
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/favorit" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Favorit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/riwayat" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Riwayat
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/pengaturan" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Pengaturan
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive flex items-center gap-2"
          onClick={async () => {
            await authClient.signOut();
            router.push("/");
            router.refresh();
          }}
        >
          <LogOut className="h-4 w-4" />
          Keluar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
