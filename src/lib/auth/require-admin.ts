import { NextResponse } from "next/server";

import { getCurrentAdmin } from "@/lib/auth/session";
import type { CurrentAdmin } from "@/types/auth";

export class UnauthorizedError extends Error {
  constructor(message = "Authentication required.") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends Error {
  constructor(message = "Admin access required.") {
    super(message);
    this.name = "ForbiddenError";
  }
}

export async function requireAdmin(): Promise<CurrentAdmin> {
  const admin = await getCurrentAdmin();

  if (!admin) {
    throw new UnauthorizedError();
  }

  if (admin.role !== "admin") {
    throw new ForbiddenError();
  }

  return admin;
}

export function unauthorizedResponse() {
  return NextResponse.json(
    { error: "Authentication required." },
    { status: 401 },
  );
}

export function forbiddenResponse() {
  return NextResponse.json(
    {
      error: "You do not have permission to perform this action.",
    },
    { status: 403 },
  );
}