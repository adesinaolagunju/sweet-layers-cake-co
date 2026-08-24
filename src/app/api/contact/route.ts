import { NextResponse } from "next/server";
import type { ContactMessagePayload } from "@/types";

/**
 * General contact message intake endpoint.
 *
 * INTEGRATION NOTE:
 * All submissions funnel through `deliverContactMessage()` below. To wire up
 * a real email/notification service (Formspree, Resend, Postmark, SES…),
 * replace the body of that single function — nothing else here or on the
 * client changes.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const REQUIRED_STRING_KEYS = ["name", "email", "message"] as const satisfies (keyof ContactMessagePayload)[];

function validate(payload: Partial<ContactMessagePayload>): string[] {
  const problems: string[] = [];

  for (const key of REQUIRED_STRING_KEYS) {
    if (!payload[key] || String(payload[key]).trim() === "") {
      problems.push(`Missing required field: ${key}`);
    }
  }
  if (payload.email && !EMAIL_PATTERN.test(payload.email)) {
    problems.push("Invalid email address");
  }

  return problems;
}

async function deliverContactMessage(payload: ContactMessagePayload): Promise<void> {
  // TODO(INTEGRATION): Replace this log with the real delivery call, e.g.:
  //   const resend = new Resend(process.env.RESEND_API_KEY);
  //   await resend.emails.send({
  //     from: "Sweet Layers website <noreply@sweetlayers.example>",
  //     to: process.env.CONTACT_INBOX!,
  //     replyTo: payload.email,
  //     subject: `Website message from ${payload.name}`,
  //     text: payload.message,
  //   });
  console.log("[contact] New message:", JSON.stringify(payload, null, 2));
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const payload = (body ?? {}) as Partial<ContactMessagePayload> & { website?: string };

  // Honeypot: bots fill hidden fields; pretend success and drop the message.
  if (payload.website) {
    return NextResponse.json({ ok: true });
  }

  const problems = validate(payload);
  if (problems.length > 0) {
    return NextResponse.json({ ok: false, error: "Validation failed", problems }, { status: 400 });
  }

  await deliverContactMessage(payload as ContactMessagePayload);
  return NextResponse.json({ ok: true });
}
