import type { Metadata } from "next";
import { SettingsForm } from "@/components/admin/settings-form";
import { getSettings } from "@/lib/actions";

export const metadata: Metadata = { title: "Pengaturan" };

export default async function AdminSettingsPage() {
  const rows = await getSettings("general");
  const values: Record<string, string> = {};
  for (const row of rows) values[row.key] = row.value ?? "";

  return (
    <div className="space-y-6">
      <h1 className="text-foreground text-2xl font-bold">Pengaturan</h1>
      <SettingsForm values={values} />
    </div>
  );
}
