import { db } from "@/lib/db";
import { users, properties } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";

export async function getUsers(limit = 100) {
  return db.query.users.findMany({
    orderBy: desc(users.createdAt),
    limit,
  });
}

export async function getUserById(id: string) {
  return db.query.users.findFirst({ where: (u, { eq }) => eq(u.id, id) });
}

export async function getUserByUsername(username: string) {
  return db.query.users.findFirst({
    where: (u, { eq }) => eq(u.username, username),
  });
}

export async function getAgents() {
  const agents = await db
    .selectDistinct({
      id: users.id,
      name: users.name,
      email: users.email,
      image: users.image,
      phone: users.phone,
      role: users.role,
    })
    .from(users)
    .innerJoin(properties, eq(properties.agentId, users.id))
    .orderBy(desc(users.createdAt))
    .limit(100);
  return agents;
}
