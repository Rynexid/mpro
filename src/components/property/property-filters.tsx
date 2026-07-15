"use client";

import * as React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/shared/button";
import { Input } from "@/components/shared/input";
import { Label } from "@/components/shared/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shared/select";
import type { PropertySearchParams } from "@/types";

interface PropertyFiltersProps {
  filters: PropertySearchParams;
  onFilterChange?: (filters: PropertySearchParams) => void;
  className?: string;
}

interface FilterControlsProps {
  filters: PropertySearchParams;
  updateFilter: (
    key: keyof PropertySearchParams,
    value: string | number | undefined,
  ) => void;
  controlClassName?: string;
}

function FilterControls({
  filters,
  updateFilter,
  controlClassName = "h-10",
}: FilterControlsProps) {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label>Status</Label>
        <Select
          value={filters.status || "all"}
          onValueChange={(v) =>
            updateFilter(
              "status",
              v === "all" ? undefined : (v as "sale" | "rent"),
            )
          }
        >
          <SelectTrigger className={controlClassName}>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Status</SelectItem>
            <SelectItem value="sale">Dijual</SelectItem>
            <SelectItem value="rent">Disewa</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Tipe Properti</Label>
        <Select
          value={filters.propertyType || "all"}
          onValueChange={(v) =>
            updateFilter("propertyType", v === "all" ? undefined : v)
          }
        >
          <SelectTrigger className={controlClassName}>
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
      </div>

      <div className="space-y-2">
        <Label>Harga (Rp)</Label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            inputMode="numeric"
            placeholder="Min"
            className={controlClassName}
            value={filters.minPrice || ""}
            onChange={(e) =>
              updateFilter(
                "minPrice",
                e.target.value ? Number(e.target.value) : undefined,
              )
            }
          />
          <Input
            type="number"
            inputMode="numeric"
            placeholder="Max"
            className={controlClassName}
            value={filters.maxPrice || ""}
            onChange={(e) =>
              updateFilter(
                "maxPrice",
                e.target.value ? Number(e.target.value) : undefined,
              )
            }
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Luas Tanah (m²)</Label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            inputMode="numeric"
            placeholder="Min"
            className={controlClassName}
            value={filters.minLandArea || ""}
            onChange={(e) =>
              updateFilter(
                "minLandArea",
                e.target.value ? Number(e.target.value) : undefined,
              )
            }
          />
          <Input
            type="number"
            inputMode="numeric"
            placeholder="Max"
            className={controlClassName}
            value={filters.maxLandArea || ""}
            onChange={(e) =>
              updateFilter(
                "maxLandArea",
                e.target.value ? Number(e.target.value) : undefined,
              )
            }
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Luas Bangunan (m²)</Label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            inputMode="numeric"
            placeholder="Min"
            className={controlClassName}
            value={filters.minBuildingArea || ""}
            onChange={(e) =>
              updateFilter(
                "minBuildingArea",
                e.target.value ? Number(e.target.value) : undefined,
              )
            }
          />
          <Input
            type="number"
            inputMode="numeric"
            placeholder="Max"
            className={controlClassName}
            value={filters.maxBuildingArea || ""}
            onChange={(e) =>
              updateFilter(
                "maxBuildingArea",
                e.target.value ? Number(e.target.value) : undefined,
              )
            }
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Kamar Tidur</Label>
        <Select
          value={filters.bedrooms?.toString() || "all"}
          onValueChange={(v) =>
            updateFilter("bedrooms", v === "all" ? undefined : Number(v))
          }
        >
          <SelectTrigger className={controlClassName}>
            <SelectValue placeholder="Semua" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua</SelectItem>
            <SelectItem value="1">1+</SelectItem>
            <SelectItem value="2">2+</SelectItem>
            <SelectItem value="3">3+</SelectItem>
            <SelectItem value="4">4+</SelectItem>
            <SelectItem value="5">5+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Kamar Mandi</Label>
        <Select
          value={filters.bathrooms?.toString() || "all"}
          onValueChange={(v) =>
            updateFilter("bathrooms", v === "all" ? undefined : Number(v))
          }
        >
          <SelectTrigger className={controlClassName}>
            <SelectValue placeholder="Semua" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua</SelectItem>
            <SelectItem value="1">1+</SelectItem>
            <SelectItem value="2">2+</SelectItem>
            <SelectItem value="3">3+</SelectItem>
            <SelectItem value="4">4+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Sertifikat</Label>
        <Select
          value={filters.certificate || "all"}
          onValueChange={(v) =>
            updateFilter("certificate", v === "all" ? undefined : v)
          }
        >
          <SelectTrigger className={controlClassName}>
            <SelectValue placeholder="Semua" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua</SelectItem>
            <SelectItem value="SHM">SHM</SelectItem>
            <SelectItem value="HGB">HGB</SelectItem>
            <SelectItem value="SHGB">SHGB</SelectItem>
            <SelectItem value="AJB">AJB</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Kondisi</Label>
        <Select
          value={filters.condition || "all"}
          onValueChange={(v) =>
            updateFilter("condition", v === "all" ? undefined : v)
          }
        >
          <SelectTrigger className={controlClassName}>
            <SelectValue placeholder="Semua" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua</SelectItem>
            <SelectItem value="baru">Baru</SelectItem>
            <SelectItem value="bekas">Bekas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Urutkan</Label>
        <Select
          value={filters.sort || "latest"}
          onValueChange={(v) =>
            updateFilter(
              "sort",
              v === "latest" ? undefined : (v as PropertySearchParams["sort"]),
            )
          }
        >
          <SelectTrigger className={controlClassName}>
            <SelectValue placeholder="Terbaru" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Terbaru</SelectItem>
            <SelectItem value="price_asc">Harga Termurah</SelectItem>
            <SelectItem value="price_desc">Harga Termahal</SelectItem>
            <SelectItem value="popular">Terpopuler</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export function PropertyFilters({
  filters,
  onFilterChange,
  className,
}: PropertyFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [sheetOpen, setSheetOpen] = React.useState(false);

  const syncUrl = (next: PropertySearchParams) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(next).forEach(([key, value]) => {
      if (
        value === undefined ||
        value === "" ||
        key === "page" ||
        key === "limit" ||
        (key === "sort" && value === "latest")
      ) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  const updateFilter = (
    key: keyof PropertySearchParams,
    value: string | number | undefined,
  ) => {
    const next = { ...filters, [key]: value, page: 1 };
    onFilterChange?.(next);
    syncUrl(next);
  };

  const clearFilters = () => {
    const next: PropertySearchParams = { sort: filters.sort, page: 1 };
    onFilterChange?.(next);
    syncUrl(next);
  };

  const activeCount = Object.entries(filters).filter(
    ([key, value]) =>
      key !== "sort" &&
      key !== "page" &&
      key !== "limit" &&
      value !== undefined &&
      value !== "",
  ).length;

  const hasActiveFilters = activeCount > 0;

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSheetOpen(false);
    };
    if (sheetOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sheetOpen]);

  return (
    <>
      {/* Mobile / tablet: Filter trigger button */}
      <div className="lg:hidden">
        <Button
          type="button"
          variant="outline"
          onClick={() => setSheetOpen(true)}
          className="flex h-12 w-full items-center justify-between gap-2 rounded-xl px-4"
          aria-haspopup="dialog"
          aria-expanded={sheetOpen}
        >
          <span className="flex items-center gap-2 font-medium">
            <SlidersHorizontal className="h-5 w-5" />
            Filter
          </span>
          {activeCount > 0 && (
            <span className="bg-primary text-primary-foreground flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 text-xs font-semibold">
              {activeCount}
            </span>
          )}
        </Button>
      </div>

      {/* Desktop: sticky sidebar */}
      <aside className={cn("hidden self-start lg:block", className)}>
        <div className="bg-muted/40 sticky top-24 rounded-xl border p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold">Filter</h2>
            {hasActiveFilters && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-8 gap-1 px-2 text-xs"
              >
                <X className="h-3.5 w-3.5" />
                Reset
              </Button>
            )}
          </div>
          <FilterControls
            filters={filters}
            updateFilter={updateFilter}
            controlClassName="h-10"
          />
        </div>
      </aside>

      {/* Mobile / tablet: Filter bottom sheet */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          sheetOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!sheetOpen}
      >
        <div
          onClick={() => setSheetOpen(false)}
          className={cn(
            "absolute inset-0 bg-black/50 transition-opacity duration-300 motion-reduce:transition-none",
            sheetOpen ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Filter Properti"
          className={cn(
            "bg-background absolute inset-x-0 bottom-0 flex max-h-[88vh] flex-col rounded-t-2xl shadow-2xl transition-transform duration-300 ease-out motion-reduce:transition-none",
            sheetOpen ? "translate-y-0" : "translate-y-full",
          )}
        >
          <div className="flex items-center justify-between border-b px-5 py-4">
            <h2 className="text-lg font-semibold">Filter Properti</h2>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setSheetOpen(false)}
              aria-label="Tutup"
              className="h-10 w-10"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-5">
            <FilterControls
              filters={filters}
              updateFilter={updateFilter}
              controlClassName="h-14 text-base"
            />
          </div>
          <div className="flex gap-3 border-t px-5 py-4">
            <Button
              type="button"
              variant="outline"
              onClick={clearFilters}
              className="h-12 flex-1"
            >
              Reset
            </Button>
            <Button
              type="button"
              onClick={() => setSheetOpen(false)}
              className="h-12 flex-1"
            >
              Tampilkan Hasil
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
