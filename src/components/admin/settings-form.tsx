"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
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
import { Button } from "@/components/shared/button";
import { upsertSetting } from "@/lib/actions";

interface SettingsFormProps {
  values: Record<string, string>;
}

const FIELDS: { key: string; label: string; textarea?: boolean }[] = [
  { key: "site_name", label: "Nama Situs" },
  { key: "site_description", label: "Deskripsi Situs", textarea: true },
  { key: "contact_email", label: "Email Kontak" },
  { key: "contact_phone", label: "Telepon Kontak" },
  { key: "address", label: "Alamat", textarea: true },
  { key: "social_instagram", label: "Instagram URL" },
  { key: "social_facebook", label: "Facebook URL" },
];

export function SettingsForm({ values }: SettingsFormProps) {
  const router = useRouter();
  const [form, setForm] = React.useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    for (const f of FIELDS) init[f.key] = values[f.key] ?? "";
    return init;
  });
  const [pending, startTransition] = React.useTransition();
  const [saved, setSaved] = React.useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(false);
    startTransition(async () => {
      for (const f of FIELDS) {
        await upsertSetting(f.key, form[f.key] ?? "", "general");
      }
      setSaved(true);
      router.refresh();
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pengaturan Umum</CardTitle>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4">
          {FIELDS.map((f) => (
            <div key={f.key} className="space-y-2">
              <Label htmlFor={f.key}>{f.label}</Label>
              {f.textarea ? (
                <Textarea
                  id={f.key}
                  value={form[f.key]}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, [f.key]: e.target.value }))
                  }
                />
              ) : (
                <Input
                  id={f.key}
                  value={form[f.key]}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, [f.key]: e.target.value }))
                  }
                />
              )}
            </div>
          ))}
          {saved && (
            <p className="text-sm text-green-600">Pengaturan disimpan.</p>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={pending}>
            {pending ? "Menyimpan..." : "Simpan"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
