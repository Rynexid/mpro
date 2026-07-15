"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  ChevronDown,
  Home,
  Mountain,
  Store,
  Warehouse,
  Factory,
  Calculator,
} from "lucide-react";
import { Button } from "@/components/shared/button";
import {
  QUICK_CATEGORIES,
  PROPERTY_TYPE_OPTIONS,
  PRICE_RANGES,
} from "@/lib/constants";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  home: Home,
  mountain: Mountain,
  store: Store,
  warehouse: Warehouse,
  factory: Factory,
  calculator: Calculator,
};

export function HeroSearch() {
  const router = useRouter();
  const [tab, setTab] = React.useState<"beli" | "sewa">("beli");
  const [location, setLocation] = React.useState("");
  const [propertyType, setPropertyType] = React.useState("all");
  const [price, setPrice] = React.useState("all");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("status", tab === "beli" ? "sale" : "rent");
    if (propertyType !== "all") params.set("propertyType", propertyType);
    if (location) params.set("query", location);
    if (price !== "all") {
      const range = PRICE_RANGES.find((r) => r.value === price);
      if (range?.min) params.set("minPrice", range.min);
      if (range?.max) params.set("maxPrice", range.max);
    }
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="mx-auto max-w-[1200px] rounded-3xl bg-white p-5 shadow-xl ring-1 ring-black/5 md:p-8">
      <div className="mb-5">
        <h2 className="text-foreground text-xl font-bold tracking-tight md:text-2xl">
          Temukan Properti Impian Anda
        </h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Cari ribuan properti residensial &amp; komersial terverifikasi.
        </p>
      </div>

      {/* Tabs */}
      <div className="border-border/70 relative mb-5 flex w-fit gap-6 border-b">
        {(
          [
            { key: "beli", label: "Beli" },
            { key: "sewa", label: "Sewa" },
          ] as const
        ).map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={cnTab(tab === t.key)}
          >
            {t.label}
          </button>
        ))}
        <span
          className="bg-primary absolute -bottom-px h-0.5 rounded-full transition-all duration-300"
          style={{
            width: tab === "beli" ? "2.25rem" : "2.5rem",
            left: tab === "beli" ? "0rem" : "4.75rem",
          }}
        />
      </div>

      {/* Fields */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col gap-3 md:flex-row md:items-stretch"
      >
        <div className="border-border bg-muted/40 focus-within:border-primary flex h-[52px] flex-1 items-center gap-2 rounded-xl border px-4">
          <MapPin className="text-muted-foreground h-5 w-5 shrink-0" />
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Masukkan lokasi..."
            className="text-foreground placeholder:text-muted-foreground w-full bg-transparent text-sm outline-none"
          />
        </div>

        <SelectField
          value={propertyType}
          onChange={setPropertyType}
          options={PROPERTY_TYPE_OPTIONS}
        />
        <SelectField value={price} onChange={setPrice} options={PRICE_RANGES} />

        <Button
          type="submit"
          size="lg"
          className="h-[52px] w-full gap-2 md:w-auto md:px-8"
        >
          <Search className="h-4 w-4" />
          Cari
        </Button>
      </form>

      {/* Quick categories */}
      <div className="scrollbar-hide mt-5 flex items-center gap-2 overflow-x-auto pb-1">
        {QUICK_CATEGORIES.map((cat) => {
          const Icon = ICONS[cat.icon];
          return (
            <Link
              key={cat.label}
              href={cat.href}
              className="text-muted-foreground hover:text-primary hover:border-primary border-border bg-muted/40 flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors"
            >
              {Icon ? <Icon className="h-4 w-4" /> : null}
              {cat.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function SelectField({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: readonly { value: string; label: string }[];
}) {
  return (
    <div className="relative h-[52px] flex-1">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-foreground border-border bg-muted/40 focus:border-primary h-full w-full appearance-none rounded-xl border px-4 pr-10 text-sm outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="text-muted-foreground pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2" />
    </div>
  );
}

function cnTab(active: boolean) {
  return [
    "pb-2 text-sm font-semibold transition-colors",
    active ? "text-primary" : "text-muted-foreground hover:text-foreground",
  ].join(" ");
}
