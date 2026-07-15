"use server";

import { db } from "@/lib/db";
import { settings } from "@/lib/db/schema";
import { generateId } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (!session?.user || (role !== "admin" && role !== "sudo")) {
    throw new Error("Unauthorized");
  }
}

export async function upsertSetting(
  key: string,
  value: string,
  group = "general",
) {
  await requireAdmin();
  const existing = await db.query.settings.findFirst({
    where: eq(settings.key, key),
  });
  if (existing) {
    await db
      .update(settings)
      .set({ value, group, updatedAt: new Date() })
      .where(eq(settings.id, existing.id));
  } else {
    await db.insert(settings).values({ id: generateId(), key, value, group });
  }
  revalidatePath("/admin/pengaturan");
  return { success: true };
}

export async function getSettings(group?: string) {
  if (group) {
    return db.query.settings.findMany({ where: eq(settings.group, group) });
  }
  return db.query.settings.findMany();
}
