import { eq } from "drizzle-orm";
import { stdin as input, stdout as output } from "node:process";
import readline from "node:readline/promises";

import { db } from "@/db";
import { admins } from "@/db/schema";
import { hashPassword } from "@/lib/auth/password";

async function main() {
  const terminal = readline.createInterface({ input, output });

  try {
    const name = (await terminal.question("Admin name: ")).trim();
    const email = (await terminal.question("Admin email: "))
      .trim()
      .toLowerCase();
    const password = await terminal.question(
      "Admin password (minimum 10 characters): ",
    );

    if (!name || !email || password.length < 10) {
      throw new Error(
        "Name, valid email, and password of at least 10 characters are required.",
      );
    }

    const existing = await db
      .select({ id: admins.id })
      .from(admins)
      .where(eq(admins.email, email))
      .limit(1);

    if (existing[0]) {
      throw new Error("An admin with this email already exists.");
    }

    const passwordHash = await hashPassword(password);

    await db.insert(admins).values({
      name,
      email,
      passwordHash,
      role: "admin",
      isActive: true,
    });

    console.log(`Admin created successfully for ${email}.`);
  } finally {
    terminal.close();
  }
}

main()
  .then(() => process.exit(0))
  .catch((error: unknown) => {
    console.error(
      "Unable to create admin:",
      error instanceof Error ? error.message : error,
    );
    process.exit(1);
  });