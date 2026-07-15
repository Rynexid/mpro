"use server";

import { toggleFavorite } from "./properties";
import { requireUser } from "@/lib/auth";

export async function toggleFavoriteAction(propertyId: string) {
  const user = await requireUser();
  return toggleFavorite(propertyId, user.id);
}
