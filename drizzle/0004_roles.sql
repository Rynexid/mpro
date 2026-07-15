CREATE TYPE "Mpro"."role_new" AS ENUM('sudo', 'admin', 'user');
--> statement-breakpoint
UPDATE "Mpro"."users" SET role = 'sudo' WHERE role = 'super_admin';
--> statement-breakpoint
ALTER TABLE "Mpro"."users" ALTER COLUMN role DROP DEFAULT;
--> statement-breakpoint
ALTER TABLE "Mpro"."users" ALTER COLUMN role TYPE "Mpro"."role_new" USING role::text::"Mpro"."role_new";
--> statement-breakpoint
ALTER TABLE "Mpro"."users" ALTER COLUMN role SET DEFAULT 'user';
--> statement-breakpoint
DROP TYPE "Mpro"."role";
--> statement-breakpoint
ALTER TYPE "Mpro"."role_new" RENAME TO "role";
