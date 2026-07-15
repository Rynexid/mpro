"use server";

import { db } from "@/lib/db";
import { inquiries } from "@/lib/db/schema";
import { inquirySchema } from "@/lib/validations";
import { generateId } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function createInquiry(input: unknown) {
  const data = inquirySchema.parse(input);
  await db.insert(inquiries).values({
    id: generateId(),
    propertyId: data.propertyId,
    type: "property",
    name: data.name,
    email: data.email,
    phone: data.phone,
    message: data.message,
  });
  revalidatePath("/search");
  return { success: true };
}

export async function submitKprInquiry(input: unknown) {
  const data = inquirySchema.omit({ propertyId: true }).parse(input);
  await db.insert(inquiries).values({
    id: generateId(),
    type: "kpr",
    name: data.name,
    email: data.email,
    phone: data.phone,
    message: data.message,
  });
  return { success: true };
}
