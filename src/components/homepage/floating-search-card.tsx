"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/shared/button";
import { Input } from "@/components/shared/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shared/select";
import type { PropertyType } from "@/types";

interface FloatingSearchCardProps {
  propertyTypes: Pick<PropertyType, "slug" | "name">[];
}

const PRICE_RANGES = [
  { label: "Semua Harga", min: "", max: "" },
  { label: "< Rp 500 Jt", min: "0", max: "500000000" },
  { label: "Rp 500 Jt – 1 M", min: "500000000", max: "1000000000" },
  { label: "Rp 1 M – 2 M", min: "1000000000", max: "2000000000" },
  { label: "Rp 2 M – 5 M", min: "2000000000", max: "5000000000" },
  { label: "> Rp 5 M", min: "5000000000", max: "" },
];

const WHATSAPP_NUMBER = "628139392024";

export function FloatingSearchCard({ propertyTypes }: FloatingSearchCardProps) {
  const router = useRouter();
  const [tab, setTab] = React.useState<"buy" | "rent">("buy");
  const [location, setLocation] = React.useState("");
  const [type, setType] = React.useState("all");
  const [price, setPrice] = React.useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("status", tab === "buy" ? "sale" : "rent");
    if (location.trim()) params.set("query", location.trim());
    if (type !== "all") params.set("propertyType", type);
    const range = PRICE_RANGES.find((r) => r.label === price);
    if (range?.min) params.set("minPrice", range.min);
    if (range?.max) params.set("maxPrice", range.max);
    router.push(`/search?${params.toString()}`);
  };

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Halo Mahaproperti, saya tertarik mencari properti.",
  )}`;

  return (
    <div className="bg-card rounded-3xl border p-4 shadow-2xl sm:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <form onSubmit={onSubmit} className="flex-1">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-[1.4fr_1fr_1fr_auto]">
            <Input
              placeholder="Cari lokasi properti..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="h-12"
            />
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Semua Tipe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Tipe</SelectItem>
                {propertyTypes.map((pt) => (
                  <SelectItem key={pt.slug} value={pt.slug}>
                    {pt.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={price} onValueChange={setPrice}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Semua Harga" />
              </SelectTrigger>
              <SelectContent>
                {PRICE_RANGES.map((r) => (
                  <SelectItem key={r.label} value={r.label}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button type="submit" size="lg" className="h-12 gap-2 px-6">
                <Search className="h-4 w-4" />
                Cari
              </Button>
              <Button
                type="button"
                size="lg"
                variant="outline"
                className="h-12 gap-2 px-4"
                asChild
              >
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </form>

        <div className="flex shrink-0 justify-center md:justify-end">
          <div className="bg-muted relative inline-flex w-full rounded-full p-1 md:w-auto">
            <span
              className={cn(
                "bg-primary absolute inset-y-1 w-[calc(50%-4px)] rounded-full shadow-sm transition-transform duration-300",
                tab === "rent" && "translate-x-[calc(100%+0px)]",
              )}
              style={{ left: 4 }}
              aria-hidden
            />
            <button
              type="button"
              onClick={() => setTab("buy")}
              className={cn(
                "relative z-10 w-28 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                tab === "buy"
                  ? "text-primary-foreground"
                  : "text-muted-foreground",
              )}
            >
              Beli
            </button>
            <button
              type="button"
              onClick={() => setTab("rent")}
              className={cn(
                "relative z-10 w-28 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                tab === "rent"
                  ? "text-primary-foreground"
                  : "text-muted-foreground",
              )}
            >
              Sewa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
