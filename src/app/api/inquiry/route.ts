import { NextResponse } from "next/server";
import type { InquiryPayload } from "@/types";

/**
 * Custom order inquiry intake endpoint.
 *
 * INTEGRATION NOTE:
 * All submissions funnel through `deliverInquiry()` below. To wire up a real
 * email/notification service (Formspree, Resend, Postmark, SES…), replace the
 * body of that single function — nothing else here or on the client changes.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const REQUIRED_STRING_KEYS = [
  "occasion",
  "eventDate",
  "servings",
  "description",
  "contactName",
  "email",
] as const satisfies (keyof InquiryPayload)[];

function validate(payload: Partial<InquiryPayload>): string[] {
  const problems: string[] = [];

  for (const key of REQUIRED_STRING_KEYS) {
    if (!payload[key] || String(payload[key]).trim() === "") {
      problems.push(`Missing required field: ${key}`);
    }
  }
  if (!Array.isArray(payload.flavors) || payload.flavors.length === 0) {
    problems.push("Missing required field: flavors");
  }
  if (payload.email && !EMAIL_PATTERN.test(payload.email)) {
    problems.push("Invalid email address");
  }

  return problems;
}

async function deliverInquiry(payload: InquiryPayload): Promise<void> {
  // TODO(INTEGRATION): Replace this log with the real delivery call.
  // Example with Resend:
  //   const { Resend } = await import("resend");
  //   const resend = new Resend(process.env.RESEND_API_KEY);
  //   await resend.emails.send({
  //     from: "Sweet Layers <orders@sweetlayers.example>",
  //     to: process.env.INQUIRY_INBOX!,
  //     subject: `New cake inquiry — ${payload.contactName}`,
  //     text: JSON.stringify(payload, null, 2),
  //   });
  console.log("[inquiry] New submission:", JSON.stringify(payload, null, 2));
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const payload = (body ?? {}) as Partial<InquiryPayload> & { website?: string };

  // Honeypot: bots fill hidden fields; pretend success and drop the message.
  if (payload.website) {
    return NextResponse.json({ ok: true });
  }

  const problems = validate(payload);
  if (problems.length > 0) {
    return NextResponse.json({ ok: false, error: "Validation failed", problems }, { status: 400 });
  }

  await deliverInquiry(payload as InquiryPayload);
  return NextResponse.json({ ok: true });
}
