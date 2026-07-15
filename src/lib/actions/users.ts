"use server";

import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";

export async function updateUserRole(
  id: string,
  role: "user" | "admin" | "sudo",
) {
  await requireAdmin();
  await db
    .update(users)
    .set({ role, updatedAt: new Date() })
    .where(eq(users.id, id));
  revalidatePath("/admin/pengguna");
  return { success: true };
}

export async function deleteUser(id: string) {
  await requireAdmin();
  await db.delete(users).where(eq(users.id, id));
  revalidatePath("/admin/pengguna");
  return { success: true };
}
