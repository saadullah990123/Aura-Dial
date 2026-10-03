import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/db/schema/index";
import * as relations from "@/db/schema/relations";
import { env } from "@/lib/env";

const sql = neon(env.DATABASE_URL);

export const db = drizzle({
  client: sql,
  schema: {
    ...schema,
    ...relations,
  },
});