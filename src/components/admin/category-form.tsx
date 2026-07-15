"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/shared/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shared/card";
import { Input } from "@/components/shared/input";
import { Label } from "@/components/shared/label";
import { Textarea } from "@/components/shared/textarea";
import { createCategory, updateCategory } from "@/lib/actions";
import { slugify } from "@/lib/utils";
import type { Category } from "@/types";

interface CategoryFormProps {
  initial?: Category;
  mode: "create" | "edit";
}

export function CategoryForm({ initial, mode }: CategoryFormProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState(initial?.name ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [sortOrder, setSortOrder] = useState(initial?.sortOrder ?? 0);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsPending(true);
    try {
      const payload = {
        name,
        slug: slug || slugify(name),
        description: description || undefined,
        sortOrder: Number(sortOrder) || 0,
      };
      if (mode === "create") {
        await createCategory(payload);
      } else if (initial) {
        await updateCategory(initial.id, payload);
      }
      router.refresh();
      if (mode === "create") {
        setName("");
        setSlug("");
        setDescription("");
        setSortOrder(0);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {mode === "create" ? "Tambah Kategori" : "Edit Kategori"}
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-5">
          {error && (
            <p className="border-destructive/40 bg-destructive/10 text-destructive rounded-md border px-3 py-2 text-sm">
              {error}
            </p>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Nama</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama kategori"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="Otomatis dari nama jika kosong"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Deskripsi (opsional)"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sortOrder">Urutan</Label>
            <Input
              id="sortOrder"
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(Number(e.target.value))}
              required
            />
          </div>
        </CardContent>

        <CardFooter className="justify-end gap-2">
          {mode === "edit" && (
            <Button
              type="button"
              variant="outline"
              onClick={() => router.refresh()}
            >
              Batal
            </Button>
          )}
          <Button type="submit" disabled={isPending}>
            {isPending
              ? "Menyimpan…"
              : mode === "create"
                ? "Simpan"
                : "Perbarui"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
