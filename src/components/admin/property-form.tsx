"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { Input } from "@/components/shared/input";
import { Label } from "@/components/shared/label";
import { Textarea } from "@/components/shared/textarea";
import { Checkbox } from "@/components/shared/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shared/select";
import { createProperty, updateProperty } from "@/lib/actions";
import type {
  PropertyWithDetails,
  PropertyType,
  Province,
  City,
  District,
} from "@/types";

interface PropertyFormProps {
  initial?: PropertyWithDetails;
  mode: "create" | "edit";
  propertyTypes: PropertyType[];
  provinces: Province[];
  cities: City[];
  districts: District[];
}

interface FormState {
  title: string;
  description: string;
  status: "sale" | "rent";
  propertyTypeId: string;
  price: string;
  priceNegotiable: boolean;
  landArea: string;
  buildingArea: string;
  bedrooms: string;
  bathrooms: string;
  floors: string;
  carport: string;
  certificate: string;
  condition: string;
  furnished: string;
  address: string;
  latitude: string;
  longitude: string;
  provinceId: string;
  cityId: string;
  districtId: string;
  featured: boolean;
  verified: boolean;
  status_published: boolean;
  images: string;
  facilities: string;
}

const EMPTY_STATE: FormState = {
  title: "",
  description: "",
  status: "sale",
  propertyTypeId: "",
  price: "",
  priceNegotiable: false,
  landArea: "",
  buildingArea: "",
  bedrooms: "",
  bathrooms: "",
  floors: "",
  carport: "",
  certificate: "",
  condition: "",
  furnished: "",
  address: "",
  latitude: "",
  longitude: "",
  provinceId: "",
  cityId: "",
  districtId: "",
  featured: false,
  verified: false,
  status_published: true,
  images: "",
  facilities: "",
};

function buildInitialState(initial?: PropertyWithDetails): FormState {
  if (!initial) return EMPTY_STATE;
  return {
    title: initial.title ?? "",
    description: initial.description ?? "",
    status: initial.status,
    propertyTypeId: initial.propertyTypeId ?? "",
    price: initial.price ? String(initial.price) : "",
    priceNegotiable: initial.priceNegotiable ?? false,
    landArea: initial.landArea != null ? String(initial.landArea) : "",
    buildingArea:
      initial.buildingArea != null ? String(initial.buildingArea) : "",
    bedrooms: initial.bedrooms != null ? String(initial.bedrooms) : "",
    bathrooms: initial.bathrooms != null ? String(initial.bathrooms) : "",
    floors: initial.floors != null ? String(initial.floors) : "",
    carport: initial.carport != null ? String(initial.carport) : "",
    certificate: initial.certificate ?? "",
    condition: initial.condition ?? "",
    furnished: initial.furnished ?? "",
    address: initial.address ?? "",
    latitude: initial.latitude ?? "",
    longitude: initial.longitude ?? "",
    provinceId: initial.provinceId ?? "",
    cityId: initial.cityId ?? "",
    districtId: initial.districtId ?? "",
    featured: initial.featured ?? false,
    verified: initial.verified ?? false,
    status_published: initial.status_published ?? true,
    images: (initial.images ?? []).map((img) => img.url).join("\n"),
    facilities: (initial.facilities ?? []).map((f) => f.name).join("\n"),
  };
}

function parseNumber(value: string): number | null {
  if (value.trim() === "") return null;
  const n = Number(value);
  return Number.isNaN(n) ? null : n;
}

function parseOptionalString(value: string): string | null {
  return value.trim() === "" ? null : value;
}

export function PropertyForm({
  initial,
  mode,
  propertyTypes,
  provinces,
  cities,
  districts,
}: PropertyFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(() => buildInitialState(initial));
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const images = form.images
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((url, i) => ({ url, sortOrder: i }));

    const facilities = form.facilities
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const payload = {
      title: form.title,
      description: form.description,
      status: form.status,
      propertyTypeId: form.propertyTypeId,
      price: parseNumber(form.price) ?? 0,
      priceNegotiable: form.priceNegotiable,
      landArea: parseNumber(form.landArea),
      buildingArea: parseNumber(form.buildingArea),
      bedrooms: parseNumber(form.bedrooms),
      bathrooms: parseNumber(form.bathrooms),
      floors: parseNumber(form.floors),
      carport: parseNumber(form.carport),
      certificate: parseOptionalString(form.certificate),
      condition: parseOptionalString(form.condition),
      furnished: parseOptionalString(form.furnished),
      address: parseOptionalString(form.address),
      latitude: parseOptionalString(form.latitude),
      longitude: parseOptionalString(form.longitude),
      provinceId: parseOptionalString(form.provinceId),
      cityId: parseOptionalString(form.cityId),
      districtId: parseOptionalString(form.districtId),
      featured: form.featured,
      verified: form.verified,
      status_published: form.status_published,
      images,
      facilities,
    };

    try {
      if (mode === "create") {
        await createProperty(payload);
      } else {
        await updateProperty(initial!.id, payload);
      }
      router.push("/admin/properti");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat menyimpan.",
      );
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent className="space-y-6 pt-6">
          {error && (
            <div className="border-destructive/40 bg-destructive/10 text-destructive rounded-md border px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="title">Judul</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                placeholder="Contoh: Rumah Minimalis 2 Lantai"
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                placeholder="Deskripsi properti"
                rows={5}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={form.status}
                onValueChange={(value) =>
                  update("status", value as "sale" | "rent")
                }
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sale">Dijual</SelectItem>
                  <SelectItem value="rent">Disewa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="propertyTypeId">Tipe Properti</Label>
              <Select
                value={form.propertyTypeId}
                onValueChange={(value) => update("propertyTypeId", value)}
              >
                <SelectTrigger id="propertyTypeId">
                  <SelectValue placeholder="Pilih tipe" />
                </SelectTrigger>
                <SelectContent>
                  {propertyTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Harga (Rp)</Label>
              <Input
                id="price"
                type="number"
                value={form.price}
                onChange={(e) => update("price", e.target.value)}
                placeholder="0"
                min={0}
                required
              />
            </div>

            <div className="flex items-end pb-1">
              <label className="text-foreground flex items-center gap-2 text-sm">
                <Checkbox
                  checked={form.priceNegotiable}
                  onCheckedChange={(checked) =>
                    update("priceNegotiable", checked === true)
                  }
                />
                Harga Nego
              </label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="landArea">Luas Tanah (m²)</Label>
              <Input
                id="landArea"
                type="number"
                value={form.landArea}
                onChange={(e) => update("landArea", e.target.value)}
                placeholder="0"
                min={0}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="buildingArea">Luas Bangunan (m²)</Label>
              <Input
                id="buildingArea"
                type="number"
                value={form.buildingArea}
                onChange={(e) => update("buildingArea", e.target.value)}
                placeholder="0"
                min={0}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bedrooms">Kamar Tidur</Label>
              <Input
                id="bedrooms"
                type="number"
                value={form.bedrooms}
                onChange={(e) => update("bedrooms", e.target.value)}
                placeholder="0"
                min={0}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bathrooms">Kamar Mandi</Label>
              <Input
                id="bathrooms"
                type="number"
                value={form.bathrooms}
                onChange={(e) => update("bathrooms", e.target.value)}
                placeholder="0"
                min={0}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="floors">Jumlah Lantai</Label>
              <Input
                id="floors"
                type="number"
                value={form.floors}
                onChange={(e) => update("floors", e.target.value)}
                placeholder="0"
                min={0}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="carport">Carport</Label>
              <Input
                id="carport"
                type="number"
                value={form.carport}
                onChange={(e) => update("carport", e.target.value)}
                placeholder="0"
                min={0}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="certificate">Sertifikat</Label>
              <Select
                value={form.certificate}
                onValueChange={(value) => update("certificate", value)}
              >
                <SelectTrigger id="certificate">
                  <SelectValue placeholder="Pilih sertifikat" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SHM">SHM</SelectItem>
                  <SelectItem value="HGB">HGB</SelectItem>
                  <SelectItem value="SHGB">SHGB</SelectItem>
                  <SelectItem value="AJB">AJB</SelectItem>
                  <SelectItem value="Lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="condition">Kondisi</Label>
              <Select
                value={form.condition}
                onValueChange={(value) => update("condition", value)}
              >
                <SelectTrigger id="condition">
                  <SelectValue placeholder="Pilih kondisi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="baru">Baru</SelectItem>
                  <SelectItem value="bekas">Bekas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="furnished">Furnishing</Label>
              <Select
                value={form.furnished}
                onValueChange={(value) => update("furnished", value)}
              >
                <SelectTrigger id="furnished">
                  <SelectValue placeholder="Pilih furnishing" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="furnished">Fully Furnished</SelectItem>
                  <SelectItem value="semi_furnished">Semi Furnished</SelectItem>
                  <SelectItem value="unfurnished">Unfurnished</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="provinceId">Provinsi</Label>
              <Select
                value={form.provinceId}
                onValueChange={(value) => update("provinceId", value)}
              >
                <SelectTrigger id="provinceId">
                  <SelectValue placeholder="Pilih provinsi" />
                </SelectTrigger>
                <SelectContent>
                  {provinces.map((province) => (
                    <SelectItem key={province.id} value={province.id}>
                      {province.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cityId">Kota</Label>
              <Select
                value={form.cityId}
                onValueChange={(value) => update("cityId", value)}
              >
                <SelectTrigger id="cityId">
                  <SelectValue placeholder="Pilih kota" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city.id} value={city.id}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="districtId">Kecamatan</Label>
              <Select
                value={form.districtId}
                onValueChange={(value) => update("districtId", value)}
              >
                <SelectTrigger id="districtId">
                  <SelectValue placeholder="Pilih kecamatan" />
                </SelectTrigger>
                <SelectContent>
                  {districts.map((district) => (
                    <SelectItem key={district.id} value={district.id}>
                      {district.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Alamat</Label>
              <Textarea
                id="address"
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
                placeholder="Alamat lengkap"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                value={form.latitude}
                onChange={(e) => update("latitude", e.target.value)}
                placeholder="-6.200000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                id="longitude"
                value={form.longitude}
                onChange={(e) => update("longitude", e.target.value)}
                placeholder="106.800000"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="images">Gambar (satu URL per baris)</Label>
              <Textarea
                id="images"
                value={form.images}
                onChange={(e) => update("images", e.target.value)}
                placeholder="https://example.com/image-1.jpg"
                rows={4}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="facilities">Fasilitas (satu per baris)</Label>
              <Textarea
                id="facilities"
                value={form.facilities}
                onChange={(e) => update("facilities", e.target.value)}
                placeholder="Kolam Renang&#10;Garasi&#10;Taman"
                rows={4}
              />
            </div>
          </div>

          <div className="border-border flex flex-wrap gap-6 border-t pt-6">
            <label className="text-foreground flex items-center gap-2 text-sm">
              <Checkbox
                checked={form.featured}
                onCheckedChange={(checked) =>
                  update("featured", checked === true)
                }
              />
              Unggulan
            </label>
            <label className="text-foreground flex items-center gap-2 text-sm">
              <Checkbox
                checked={form.verified}
                onCheckedChange={(checked) =>
                  update("verified", checked === true)
                }
              />
              Terverifikasi
            </label>
            <label className="text-foreground flex items-center gap-2 text-sm">
              <Checkbox
                checked={form.status_published}
                onCheckedChange={(checked) =>
                  update("status_published", checked === true)
                }
              />
              Publikasikan
            </label>
          </div>
        </CardContent>

        <CardFooter className="justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/properti")}
          >
            Batal
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Menyimpan..."
              : mode === "create"
                ? "Simpan Properti"
                : "Perbarui Properti"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
