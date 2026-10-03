import { NextResponse } from "next/server";

export function badRequest(message = "Invalid request.") {
  return NextResponse.json({ error: message }, { status: 400 });
}

export function validationError(
  message = "Some submitted fields are invalid.",
  details?: unknown,
) {
  return NextResponse.json(
    {
      error: message,
      details,
    },
    { status: 422 },
  );
}

export function tooManyRequests(retryAfterSeconds: number) {
  return NextResponse.json(
    {
      error: "Too many requests. Please try again later.",
    },
    {
      status: 429,
      headers: {
        "Retry-After": String(retryAfterSeconds),
      },
    },
  );
}

export function internalServerError() {
  return NextResponse.json(
    {
      error: "Something went wrong. Please try again later.",
    },
    { status: 500 },
  );
}