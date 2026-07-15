import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import { db } from "./index";
import { sql } from "drizzle-orm";

function deepStringify(value: unknown): string {
  const parts: string[] = [];
  const seen = new WeakSet<object>();
  const walk = (v: unknown) => {
    if (v === null || v === undefined) return;
    if (typeof v === "string") {
      parts.push(v);
      return;
    }
    if (typeof v === "number" || typeof v === "boolean") {
      parts.push(String(v));
      return;
    }
    if (typeof v !== "object") return;
    if (seen.has(v as object)) return;
    seen.add(v as object);
    for (const [k, val] of Object.entries(v as Record<string, unknown>)) {
      parts.push(k);
      walk(val);
    }
  };
  walk(value);
  return parts.join(" ");
}

async function main() {
  const drizzleDir = join(process.cwd(), "drizzle");
  const files = readdirSync(drizzleDir)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  for (const file of files) {
    const content = readFileSync(join(drizzleDir, file), "utf-8");
    const statements = content
      .split("--> statement-breakpoint")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    console.log(`Applying ${file} (${statements.length} statements)...`);
    for (let i = 0; i < statements.length; i++) {
      const stmt = statements[i];
      try {
        await db.execute(sql.raw(stmt));
        process.stdout.write(".");
      } catch (err: unknown) {
        const text = deepStringify(err);
        const ignorable =
          text.includes("already exists") ||
          text.includes("already present") ||
          text.includes("duplicate") ||
          text.includes("42P06") ||
          text.includes("42P07") ||
          text.includes("42710");
        if (ignorable) {
          process.stdout.write("s");
          continue;
        }
        console.error(`\n✗ statement ${i + 1} failed: ${text.slice(0, 500)}`);
        console.error(`SQL: ${stmt.slice(0, 200)}`);
        throw err;
      }
    }
    console.log(`\n✓ ${file} applied`);
  }
  console.log("Migration complete");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
