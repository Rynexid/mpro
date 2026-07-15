import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { createAuthMiddleware } from "better-auth/api";
import { APIError } from "better-auth";
import { dash } from "@better-auth/infra";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import {
  users,
  sessions,
  accounts,
  verifications,
} from "@/lib/db/schema";
import { slugify } from "@/lib/utils";
import type { User } from "@/types";
import { isStrongPassword } from "@/lib/validations/auth";
import { env } from "@/env";

const baseURL =
  env.BETTER_AUTH_URL ?? env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

/**
 * Emails that should be granted the `sudo` role automatically on creation.
 * Used for the project owner's account.
 */
const SUDO_EMAILS = ["echo.adinfauzan@gmail.com"];

async function generateUniqueUsername(name: string): Promise<string> {
  const base = slugify(name || "user").toLowerCase().slice(0, 20) || "user";
  let username = `${base}-${Math.random().toString(36).slice(2, 6)}`;
  const existing = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.username, username))
    .limit(1);
  while (existing.length > 0) {
    username = `${base}-${Math.random().toString(36).slice(2, 6)}`;
  }
  return username;
}

export const auth = betterAuth({
  appName: "Mahaproperti",
  baseURL,
  secret: env.BETTER_AUTH_SECRET,
  trustedOrigins: [
    env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
    "https://mahaproperti.com",
    "https://www.mahaproperti.com",
    "http://localhost:3000",
    "http://localhost:3001",
  ],
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: users,
      session: sessions,
      account: accounts,
      verification: verifications,
    },
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 8,
    // Email verification, reset password, and magic link are future-ready
    // and enabled via the `sendVerificationEmail` / `sendResetPassword` hooks.
    requireEmailVerification: false,
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: env.GOOGLE_CLIENT_SECRET ?? "",
      // Automatically link accounts that share the same verified email.
      scope: ["profile", "email"],
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // refresh once per day
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // cache session for 5 minutes
    },
  },
  rateLimit: {
    enabled: true,
    window: 10, // 10 seconds
    max: 100, // requests per window per identifier
    customRules: {
      "/sign-in/email": { window: 10, max: 10 },
      "/sign-up/email": { window: 10, max: 5 },
      "/forget-password": { window: 60, max: 3 },
    },
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          const username = await generateUniqueUsername(user.name ?? "user");
          const isSudo = SUDO_EMAILS.includes(user.email.toLowerCase());
          await db
            .update(users)
            .set(isSudo ? { username, role: "sudo" } : { username })
            .where(eq(users.id, user.id));
        },
      },
    },
  },
  // Server-side enforcement of the password policy. Runs inside the auth
  // request before any user is created, so it cannot be bypassed client-side.
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/sign-up/email") {
        const password =
          (ctx.body as { password?: string } | undefined)?.password ?? "";
        const result = isStrongPassword(password);
        if (!result.success) {
          throw new APIError("BAD_REQUEST", {
            message: result.errors[0]?.message ?? "Password tidak memenuhi syarat.",
          });
        }
      }
    }),
  },
  plugins: [dash()],
  advanced: {
    // Secure cookies are enabled automatically in production (https baseURL).
    crossSubDomainCookies: {
      enabled: false,
    },
    defaultCookieAttributes: {
      sameSite: "lax",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    },
  },
});

export async function getCurrentUser(): Promise<User | null> {
  const session = await auth.api.getSession({ headers: await headers() });
  return (session?.user as User | undefined) ?? null;
}

export async function requireUser(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");
  return user;
}

export async function requireAdmin(): Promise<User> {
  const user = await getCurrentUser();
  if (!user || (user.role !== "admin" && user.role !== "sudo")) {
    throw new Error("Unauthorized");
  }
  return user;
}
