/**
 * Pre-launch environment check. Run: npm run preflight
 * Reads .env.local / .env, prints PASS/WARN/FAIL per item. Never prints secret values.
 */
import { config } from "dotenv";
import { resolve } from "node:path";

config({ path: resolve(process.cwd(), ".env.local") });
config({ path: resolve(process.cwd(), ".env") });

type Level = "PASS" | "WARN" | "FAIL";
const results: { level: Level; msg: string }[] = [];
const add = (level: Level, msg: string) => results.push({ level, msg });
const v = (k: string) => (process.env[k] ?? "").trim();

// Database
const db = v("DATABASE_URL");
if (!db) add("FAIL", "DATABASE_URL is empty.");
else if (db.includes("USER:PASSWORD@HOST") || db.includes("user:password@ep-xxxx")) add("FAIL", "DATABASE_URL is still the placeholder.");
else if (!/^postgres(ql)?:\/\//.test(db)) add("FAIL", "DATABASE_URL must start with postgresql://");
else {
  add("PASS", "DATABASE_URL is set.");
  if (!/sslmode=require/.test(db)) add("WARN", "DATABASE_URL has no sslmode=require (Neon needs it).");
}

// Session secret
const secret = v("SESSION_SECRET");
if (secret.length < 64) add("FAIL", `SESSION_SECRET must be 64+ characters (now ${secret.length}). Generate: openssl rand -hex 48`);
else add("PASS", "SESSION_SECRET is long enough.");

// Cloudinary
const cl = ["CLOUDINARY_CLOUD_NAME", "CLOUDINARY_API_KEY", "CLOUDINARY_API_SECRET"].filter((k) => !v(k));
if (cl.length === 3) add("FAIL", "Cloudinary is not configured: product image uploads will not work.");
else if (cl.length > 0) add("FAIL", `Cloudinary is partly configured. Missing: ${cl.join(", ")}`);
else add("PASS", "Cloudinary variables are set.");

// Site URL
const site = v("NEXT_PUBLIC_SITE_URL");
if (!site || site.startsWith("http://localhost")) add("WARN", "NEXT_PUBLIC_SITE_URL is localhost. Set your real https:// domain before launch (used in emails, sitemap, metadata).");
else if (!site.startsWith("https://")) add("WARN", "NEXT_PUBLIC_SITE_URL should use https://");
else add("PASS", "NEXT_PUBLIC_SITE_URL is set.");

// Email (optional)
const from = v("EMAIL_FROM");
if (!v("RESEND_API_KEY")) add("WARN", "RESEND_API_KEY is empty: admin password-reset emails will NOT be sent (the link only prints to the server console).");
else if (!from || from.includes("example.com") || from.includes("yourdomain.com")) add("FAIL", "RESEND_API_KEY is set but EMAIL_FROM is still a placeholder domain.");
else add("PASS", "Resend is configured.");

if (v("NODE_ENV") === "production" && v("ALLOW_SEED") === "1") add("FAIL", "ALLOW_SEED=1 is set in production. Remove it.");

const icon = { PASS: "[ OK ]", WARN: "[WARN]", FAIL: "[FAIL]" } as const;
for (const r of results) console.log(`${icon[r.level]} ${r.msg}`);
const fails = results.filter((r) => r.level === "FAIL").length;
console.log(fails ? `\n${fails} problem(s) to fix before launch.` : "\nNo blocking problems found. Still do the manual tests: one image upload, one real order.");
process.exit(fails ? 1 : 0);
