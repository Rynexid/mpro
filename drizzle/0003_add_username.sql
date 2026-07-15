ALTER TABLE "Mpro"."users" ADD COLUMN "username" text;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "users_username_unique" ON "Mpro"."users" ("username");
