"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { createProvince, createCity, createDistrict } from "@/lib/actions";
import { slugify } from "@/lib/utils";
import type { City, Province } from "@/types";

interface LocationFormProps {
  kind: "province" | "city" | "district";
  provinces?: Province[];
  cities?: City[];
}

const KIND_LABEL: Record<LocationFormProps["kind"], string> = {
  province: "Provinsi",
  city: "Kota",
  district: "Kecamatan",
};

export function LocationForm({
  kind,
  provinces = [],
  cities = [],
}: LocationFormProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [provinceId, setProvinceId] = useState("");
  const [cityId, setCityId] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsPending(true);
    try {
      const payload: Record<string, unknown> = {
        name,
        slug: slug || slugify(name),
      };
      if (kind === "city") payload.provinceId = provinceId;
      if (kind === "district") payload.cityId = cityId;

      if (kind === "province") await createProvince(payload);
      if (kind === "city") await createCity(payload);
      if (kind === "district") await createDistrict(payload);

      router.refresh();
      setName("");
      setSlug("");
      setProvinceId("");
      setCityId("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card space-y-3 rounded-xl border p-4"
    >
      <p className="text-foreground text-sm font-semibold">
        Tambah {KIND_LABEL[kind]}
      </p>
      {error && (
        <p className="border-destructive/40 bg-destructive/10 text-destructive rounded-md border px-3 py-2 text-sm">
          {error}
        </p>
      )}

      <div className="space-y-1.5">
        <Label htmlFor={`${kind}-name`}>Nama</Label>
        <Input
          id={`${kind}-name`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={`Nama ${KIND_LABEL[kind].toLowerCase()}`}
          required
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor={`${kind}-slug`}>Slug</Label>
        <Input
          id={`${kind}-slug`}
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="Otomatis dari nama jika kosong"
        />
      </div>

      {kind === "city" && (
        <div className="space-y-1.5">
          <Label htmlFor="province">Provinsi</Label>
          <Select value={provinceId} onValueChange={setProvinceId} required>
            <SelectTrigger id="province">
              <SelectValue placeholder="Pilih provinsi" />
            </SelectTrigger>
            <SelectContent>
              {provinces.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {kind === "district" && (
        <div className="space-y-1.5">
          <Label htmlFor="city">Kota</Label>
          <Select value={cityId} onValueChange={setCityId} required>
            <SelectTrigger id="city">
              <SelectValue placeholder="Pilih kota" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <Button type="submit" size="sm" disabled={isPending} className="w-full">
        {isPending ? "Menyimpan…" : "Simpan"}
      </Button>
    </form>
  );
}
