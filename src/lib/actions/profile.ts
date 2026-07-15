"use server";

import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { userUpdateSchema } from "@/lib/validations";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";

export async function updateProfile(input: unknown) {
  const user = await requireUser();
  const data = userUpdateSchema.parse(input);
  await db
    .update(users)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(users.id, user.id));
  revalidatePath("/dashboard/profil");
  return { success: true };
}
