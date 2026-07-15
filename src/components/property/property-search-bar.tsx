"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/shared/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shared/select";
import { Card } from "@/components/shared/card";

export function PropertySearchBar({ className }: { className?: string }) {
  const router = useRouter();
  const [status, setStatus] = React.useState("sale");
  const [propertyType, setPropertyType] = React.useState("all");
  const [location, setLocation] = React.useState("");
  const [priceRange, setPriceRange] = React.useState("all");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("status", status);
    if (propertyType !== "all") params.set("propertyType", propertyType);
    if (location) params.set("query", location);
    if (priceRange !== "all") {
      const [min, max] = priceRange.split("-").map(Number);
      if (min) params.set("minPrice", String(min));
      if (max) params.set("maxPrice", String(max));
    }
    router.push(`/search?${params.toString()}`);
  };

  return (
    <Card className={cn("w-full", className)}>
      <form onSubmit={handleSearch} className="p-3 sm:p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="bg-muted flex shrink-0 gap-1 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setStatus("sale")}
              className={cn(
                "h-12 flex-1 rounded-md px-5 text-sm font-medium transition-colors md:h-11 md:flex-none",
                status === "sale"
                  ? "bg-primary text-primary-foreground shadow"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Beli
            </button>
            <button
              type="button"
              onClick={() => setStatus("rent")}
              className={cn(
                "h-12 flex-1 rounded-md px-5 text-sm font-medium transition-colors md:h-11 md:flex-none",
                status === "rent"
                  ? "bg-primary text-primary-foreground shadow"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Sewa
            </button>
          </div>

          <div className="flex h-12 flex-1 items-center gap-2 rounded-lg border px-3 md:h-11">
            <MapPin className="text-muted-foreground h-5 w-5 shrink-0" />
            <input
              type="text"
              placeholder="Masukkan lokasi atau kata kunci..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="placeholder:text-muted-foreground h-full w-full bg-transparent text-base outline-none md:text-sm"
            />
          </div>

          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger className="h-12 w-full md:h-11 md:w-44">
              <SelectValue placeholder="Tipe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Tipe</SelectItem>
              <SelectItem value="rumah">Rumah</SelectItem>
              <SelectItem value="tanah">Tanah</SelectItem>
              <SelectItem value="ruko">Ruko</SelectItem>
              <SelectItem value="apartemen">Apartemen</SelectItem>
              <SelectItem value="gudang">Gudang</SelectItem>
              <SelectItem value="pabrik">Pabrik</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger className="h-12 w-full md:h-11 md:w-44">
              <SelectValue placeholder="Harga" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Harga</SelectItem>
              <SelectItem value="0-500000000">&lt; Rp 500 Juta</SelectItem>
              <SelectItem value="500000000-1000000000">
                Rp 500 Jt - 1 M
              </SelectItem>
              <SelectItem value="1000000000-3000000000">Rp 1 - 3 M</SelectItem>
              <SelectItem value="3000000000-5000000000">Rp 3 - 5 M</SelectItem>
              <SelectItem value="5000000000-">&gt; Rp 5 M</SelectItem>
            </SelectContent>
          </Select>

          <Button
            type="submit"
            className="h-12 w-full gap-2 md:h-11 md:w-auto md:px-6"
          >
            <Search className="h-4 w-4" />
            Cari
          </Button>
        </div>
      </form>
    </Card>
  );
}
