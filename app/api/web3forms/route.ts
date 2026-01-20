import sgMail from "@sendgrid/mail";
import { NextRequest, NextResponse } from "next/server";

type ApiOk = { success: true };
type ApiErr = { success: false; code: string; message: string };

const sendgridApiKey = process.env.SENDGRID_API_KEY;
const ownerEmail = process.env.OWNER_EMAIL;
const senderEmail = process.env.SENDER_EMAIL;

const turnstileSecretKey = process.env.TURNSTILE_SECRET_KEY;
const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

declare global {
  // eslint-disable-next-line no-var
  var __enovateContactRateLimit:
    | Map<string, { timestamps: number[] }>
    | undefined;
}

function jsonError(code: string, message: string, status = 400) {
  return NextResponse.json<ApiErr>({ success: false, code, message }, { status });
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function isValidEmail(email: string) {
  // pragmatic email check (server-side)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function looksLikeGibberish(text: string) {
  const t = text.trim();
  if (!t) return false;

  // lots of repeated characters, e.g. "aaaaaaa" or "!!!!!!!!"
  if (/(.)\1{6,}/.test(t)) return true;

  // no letters at all (numbers/symbols only)
  if (!/[a-zA-Z]/.test(t)) return true;

  // too many links
  const urlCount = (t.match(/https?:\/\//g) ?? []).length;
  if (urlCount >= 3) return true;

  return false;
}

function getClientIp(req: NextRequest) {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]?.trim() || "unknown";
  return req.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(ip: string) {
  if (!globalThis.__enovateContactRateLimit) {
    globalThis.__enovateContactRateLimit = new Map();
  }
  const store = globalThis.__enovateContactRateLimit;
  const now = Date.now();

  const entry = store.get(ip) ?? { timestamps: [] };
  entry.timestamps = entry.timestamps.filter(
    (ts) => now - ts < RATE_LIMIT_WINDOW_MS
  );

  if (entry.timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    store.set(ip, entry);
    return true;
  }

  entry.timestamps.push(now);
  store.set(ip, entry);
  return false;
}

async function verifyTurnstile(token: string, ip: string) {
  if (!turnstileSecretKey) return true; // allow dev/local if not configured
  if (!token) return false;

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: turnstileSecretKey,
        response: token,
        remoteip: ip,
      }),
    }
  );
  const data = (await res.json()) as { success?: boolean };
  return data?.success === true;
}

export async function POST(req: NextRequest) {
  // Optional origin lock (recommended in production)
  if (allowedOrigins.length > 0) {
    const origin = req.headers.get("origin");
    if (!origin || !allowedOrigins.includes(origin)) {
      return jsonError(
        "ORIGIN_NOT_ALLOWED",
        "This request is not allowed.",
        403
      );
    }
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return jsonError(
      "RATE_LIMITED",
      "Too many submissions. Please wait a few minutes and try again.",
      429
    );
  }

  const body = (await req.json().catch(() => null)) as
    | Record<string, unknown>
    | null;
  if (!body) {
    return jsonError(
      "INVALID_JSON",
      "Could not read your submission. Please try again."
    );
  }

  const name = String(body.name ?? "").trim();
  const gotToKnowEnovate = String(body.gotToKnowEnovate ?? "").trim();
  const service = String(body.service ?? "").trim();
  const budget = String(body.budget ?? "").trim();
  const email = String(body.email ?? "").trim();
  const moreDetails = String(body.moreDetails ?? "").trim();
  const website = String(body.website ?? "").trim(); // honeypot
  const turnstileToken = String(body.turnstileToken ?? "").trim();

  // Honeypot: if filled, treat as spam (don't reveal details)
  if (website) {
    return jsonError(
      "SPAM_DETECTED",
      "Unable to send your message. Please try again."
    );
  }

  // Turnstile: only enforced if TURNSTILE_SECRET_KEY is configured
  if (turnstileSecretKey) {
    if (!turnstileToken) {
      return jsonError(
        "TURNSTILE_REQUIRED",
        "Please complete the verification and try again."
      );
    }
    const ok = await verifyTurnstile(turnstileToken, ip);
    if (!ok) {
      return jsonError(
        "TURNSTILE_FAILED",
        "Verification failed. Please try again."
      );
    }
  }

  // Basic validation (user-facing)
  if (!name || name.length < 2 || name.length > 100) {
    return jsonError(
      "INVALID_NAME",
      "Please enter your name (at least 2 characters)."
    );
  }
  if (!email || email.length > 254 || !isValidEmail(email)) {
    return jsonError("INVALID_EMAIL", "Please enter a valid email address.");
  }
  if (!service || service.length > 120) {
    return jsonError(
      "MISSING_SERVICE",
      "Please select the service you need help with."
    );
  }
  if (gotToKnowEnovate.length > 120) {
    return jsonError(
      "INVALID_REFERRAL",
      "Please shorten how you found us and try again."
    );
  }
  if (budget.length > 120) {
    return jsonError(
      "INVALID_BUDGET",
      "Please select a valid budget option."
    );
  }
  if (moreDetails && moreDetails.length < 10) {
    return jsonError(
      "DETAILS_TOO_SHORT",
      "Please add a bit more detail (at least 10 characters) or leave it empty."
    );
  }
  if (moreDetails.length > 4000) {
    return jsonError(
      "DETAILS_TOO_LONG",
      "Your details are too long. Please shorten your message and try again."
    );
  }
  if (
    looksLikeGibberish(name) ||
    looksLikeGibberish(service) ||
    looksLikeGibberish(moreDetails)
  ) {
    return jsonError(
      "GIBBERISH_DETECTED",
      "Your message looks incomplete or invalid. Please edit it and try again."
    );
  }

  try {
    if (!sendgridApiKey || !ownerEmail || !senderEmail) {
      return jsonError(
        "SERVER_MISCONFIG",
        "Email service is not configured. Please try again later.",
        500
      );
    }
    sgMail.setApiKey(sendgridApiKey);

    const safeName = escapeHtml(name);
    const safeGotToKnow = escapeHtml(gotToKnowEnovate || "—");
    const safeService = escapeHtml(service);
    const safeBudget = escapeHtml(budget || "—");
    const safeEmail = escapeHtml(email);
    const safeDetails = escapeHtml(moreDetails || "—");

    const msg = {
      to: ownerEmail,
      from: senderEmail,
      subject: "Lead - New Message from Enovate Studio Visitor",
      html: `
        <h2> New Message received </h2>
        <p>You have a new message from <b>${safeName}</b>.</p>
        <p><b>How they found Enovate</b>: ${safeGotToKnow}</p>
        <p><b>Service</b>: ${safeService}</p>
        <p><b>Budget</b>: ${safeBudget}</p>
        <p><b>Email</b>: ${safeEmail}</p>
        <p><b>More details</b>:</p>
        <pre style="white-space: pre-wrap; font-family: inherit;">${safeDetails}</pre>
      `,
    };
    const autoResponse = {
      to: email,
      from: senderEmail,
      subject: "We have Received Your Message — Thanks for Reaching Out 🚀",
      html: `
        <p>Good day ${safeName},</p>
        <p> Thank you for contacting Enovate — your message has been successfully received!</p>
        <p>One of our team members is already reviewing your request, and we will get back to you shortly with the next steps.
        We typically respond within a few hours, but no later than 24 hours on business days.</p>
        <br/>
        <p>Looking forward to connecting with you,</p>
        <p><b>The Enovate Team</b></p>
      `,
    };

    await Promise.all([sgMail.send(msg), sgMail.send(autoResponse)]);
    return NextResponse.json<ApiOk>({ success: true });
  } catch (error: any) {
    return jsonError(
      "SEND_FAILED",
      "We couldn’t send your message right now. Please try again later.",
      500
    );
  }
}
