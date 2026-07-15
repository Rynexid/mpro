CREATE TABLE "Mpro"."recently_viewed" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"property_id" text NOT NULL,
	"viewed_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "Mpro"."recently_viewed" ADD CONSTRAINT "recently_viewed_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "Mpro"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Mpro"."recently_viewed" ADD CONSTRAINT "recently_viewed_property_id_properties_id_fk" FOREIGN KEY ("property_id") REFERENCES "Mpro"."properties"("id") ON DELETE cascade ON UPDATE no action;