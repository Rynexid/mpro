ALTER TABLE "Mpro"."inquiries" ALTER COLUMN "property_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "Mpro"."inquiries" ADD COLUMN "type" text DEFAULT 'property' NOT NULL;