import { env } from "@/lib/env";

/**
 * Sends a transactional email through Resend's HTTP API (no SDK needed).
 * Without RESEND_API_KEY the message is printed to the server console in
 * development so flows like password reset stay usable locally.
 */
export async function sendEmail(input: {
  to: string;
  subject: string;
  text: string;
}): Promise<boolean> {
  if (!env.RESEND_API_KEY) {
    if (env.NODE_ENV !== "production") {
      console.info(`[email:dev] To: ${input.to}\nSubject: ${input.subject}\n${input.text}`);
    } else {
      console.warn("[email] RESEND_API_KEY is not set; email was not sent.");
    }
    return false;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.EMAIL_FROM,
        to: [input.to],
        subject: input.subject,
        text: input.text,
      }),
    });
    if (!response.ok) {
      console.error("[email] Resend rejected the message:", response.status);
    }
    return response.ok;
  } catch (error) {
    console.error("[email] Sending failed:", error);
    return false;
  }
}
