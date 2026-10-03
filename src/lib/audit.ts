import { db } from "@/db";
import { auditLogs } from "@/db/schema";

export async function writeAudit(input: {
  adminId: string | null;
  action: string;
  entityType: string;
  entityId?: string | null;
  beforeData?: unknown;
  afterData?: unknown;
}) {
  try {
    await db.insert(auditLogs).values({
      adminId: input.adminId,
      action: input.action,
      entityType: input.entityType,
      entityId: input.entityId ?? null,
      beforeData: input.beforeData ?? null,
      afterData: input.afterData ?? null,
    });
  } catch (error) {
    // Auditing must never break the action being audited.
    console.error("Audit log failed:", error);
  }
}
