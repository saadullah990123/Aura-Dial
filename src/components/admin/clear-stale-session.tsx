"use client";

import { useEffect } from "react";

/** Removes the invalid session cookie so the person lands on a clean sign-in. */
export function ClearStaleSession() {
  useEffect(() => {
    void fetch("/api/admin/auth/logout", { method: "POST" }).catch(() => {});
  }, []);
  return null;
}
