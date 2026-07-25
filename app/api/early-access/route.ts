import { NextResponse } from "next/server";

type ApplicationPayload = {
  name?: unknown;
  email?: unknown;
  creator_handle?: unknown;
  creator_username?: unknown;
  access_type?: unknown;
  platform?: unknown;
  followers?: unknown;
  category?: unknown;
  posting_frequency?: unknown;
  challenge?: unknown;
  video_link?: unknown;
  improvement?: unknown;
  turnstileToken?: unknown;
  status?: unknown;
  action?: unknown;
};

const USER_ERROR_MESSAGE = "We could not submit your application right now. Please try again in a moment.";

function readText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function readNumber(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value !== "string") {
    return null;
  }

  const parsed = Number.parseInt(value.trim(), 10);
  return Number.isFinite(parsed) ? parsed : null;
}

async function verifyTurnstile(token: string, remoteIp: string | null) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    return { success: false, "error-codes": ["missing-turnstile-secret"] };
  }

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      secret,
      response: token,
      ...(remoteIp ? { remoteip: remoteIp } : {}),
    }),
  });

  return (await response.json()) as { success?: boolean; "error-codes"?: string[] };
}

async function sendResendEmail({ to, subject, html, text }: { to: string; subject: string; html: string; text: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !from) {
    return { skipped: true };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, subject, html, text }),
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => "");
    throw new Error(`Resend send failed (${response.status}): ${errorBody}`);
  }

  return { ok: true, status: response.status };
}

function toAccessTypeLabel(accessType: "founding_creator" | "free_creator") {
  return accessType === "founding_creator" ? "Founding Creator ($20)" : "Free Creator Early Access";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function trackPosthogEvent(event: string, properties: Record<string, unknown>) {
  const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY || process.env.POSTHOG_API_KEY;
  if (!apiKey) {
    return { skipped: true };
  }

  const host = (process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com").replace(/\/$/, "");

  const response = await fetch(`${host}/batch/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      api_key: apiKey,
      batch: [
        {
          event,
          distinct_id: String(properties.distinct_id || properties.email || "autoreelix-visitor"),
          timestamp: new Date().toISOString(),
          properties,
        },
      ],
    }),
  });

  return { ok: response.ok, status: response.status };
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ApplicationPayload;
    const { turnstileToken: rawTurnstileToken } = body;

    const name = readText(body.name);
    const email = readText(body.email).toLowerCase();
    const creatorHandle = readText(body.creator_handle || body.creator_username);
    const accessType = readText(body.access_type) === "founding_creator" ? "founding_creator" : "free_creator";
    const platform = readText(body.platform);
    const category = readText(body.category);
    const postingFrequency = readText(body.posting_frequency);
    const challenge = readText(body.challenge);
    const videoLink = readText(body.video_link);
    const improvement = readText(body.improvement);
    const turnstileToken = readText(rawTurnstileToken);
    const followers = readNumber(body.followers);
    const safeAccessType = toAccessTypeLabel(accessType);

    if (!name || !email || !creatorHandle || !platform || !category || !postingFrequency || !challenge || !videoLink || !improvement || followers === null) {
      console.error("Application validation failed", {
        hasName: Boolean(name),
        hasEmail: Boolean(email),
        hasCreatorHandle: Boolean(creatorHandle),
        hasPlatform: Boolean(platform),
        hasCategory: Boolean(category),
        hasPostingFrequency: Boolean(postingFrequency),
        hasChallenge: Boolean(challenge),
        hasVideoLink: Boolean(videoLink),
        hasImprovement: Boolean(improvement),
        hasFollowers: followers !== null,
      });
      return NextResponse.json({ error: USER_ERROR_MESSAGE }, { status: 400 });
    }

    if (!turnstileToken) {
      console.error("Missing Turnstile token on application submit", { email, creatorHandle });
      return NextResponse.json({ error: USER_ERROR_MESSAGE }, { status: 400 });
    }

    const remoteIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null;
    const turnstile = await verifyTurnstile(turnstileToken, remoteIp);
    if (!turnstile.success) {
      console.error("Turnstile verification failed", {
        email,
        creatorHandle,
        errorCodes: turnstile["error-codes"] || [],
      });
      return NextResponse.json({ error: USER_ERROR_MESSAGE }, { status: 403 });
    }

    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error("Supabase configuration missing", {
        hasSupabaseUrl: Boolean(supabaseUrl),
        hasSupabaseKey: Boolean(supabaseKey),
      });
      return NextResponse.json({ error: USER_ERROR_MESSAGE }, { status: 500 });
    }

    const application = {
      name,
      email,
      creator_handle: creatorHandle,
      platform,
      followers,
      category,
      posting_frequency: postingFrequency,
      challenge,
      video_link: videoLink,
      improvement,
      access_type: accessType,
      status: readText(body.status) || "submitted",
      created_at: new Date().toISOString(),
    };

    const insertResponse = await fetch(`${supabaseUrl.replace(/\/$/, "")}/rest/v1/early_access_applications`, {
      method: "POST",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify(application),
    });

    if (!insertResponse.ok) {
      const supabaseError = await insertResponse.text().catch(() => "");
      console.error("Supabase insert failed", {
        status: insertResponse.status,
        body: supabaseError,
        email,
        creatorHandle,
      });
      return NextResponse.json({ error: USER_ERROR_MESSAGE }, { status: 500 });
    }

    const savedRows = (await insertResponse.json().catch(() => [])) as Array<Record<string, unknown>>;
    const savedApplication = savedRows[0] || application;

    const adminEmail = process.env.RESEND_ADMIN_EMAIL;

    try {
      await sendResendEmail({
        to: email,
        subject: "Your AUTOREELIX beta application has been received",
        html: `
          <div style="font-family:Arial,sans-serif;background:#020617;color:#e2e8f0;padding:32px;border-radius:12px">
            <h1 style="margin:0 0 14px;font-size:24px;letter-spacing:0.02em;color:#ffffff">AUTOREELIX Application Received</h1>
            <p style="line-height:1.7;margin:0 0 12px">Thanks for applying to join the AUTOREELIX beta creator cohort.</p>
            <p style="line-height:1.7;margin:0 0 12px">Your application is now in review by our team.</p>
            <p style="line-height:1.7;margin:0 0 16px">Selected access type: <strong>${escapeHtml(safeAccessType)}</strong></p>
            <p style="line-height:1.7;margin:0;color:#94a3b8">We appreciate your interest in building with SmartOrb.</p>
          </div>
        `,
        text: `Thanks for applying to AUTOREELIX. Your beta application has been received and is currently being reviewed. Selected access type: ${safeAccessType}.`,
      });

      if (adminEmail) {
        await sendResendEmail({
          to: adminEmail,
          subject: "New AUTOREELIX Creator Application",
          html: `
            <div style="font-family:Arial,sans-serif;background:#020617;color:#e2e8f0;padding:32px;border-radius:12px">
              <h1 style="margin:0 0 14px;font-size:22px;color:#ffffff">New Creator Application</h1>
              <p><strong>Name:</strong> ${escapeHtml(name)}</p>
              <p><strong>Email:</strong> ${escapeHtml(email)}</p>
              <p><strong>Creator Handle:</strong> ${escapeHtml(creatorHandle)}</p>
              <p><strong>Platform:</strong> ${escapeHtml(platform)}</p>
              <p><strong>Followers:</strong> ${escapeHtml(String(followers))}</p>
              <p><strong>Access Type:</strong> ${escapeHtml(safeAccessType)}</p>
              <p><strong>Creator Goals:</strong> ${escapeHtml(improvement)}</p>
            </div>
          `,
          text: `New AUTOREELIX Creator Application\nName: ${name}\nEmail: ${email}\nCreator Handle: ${creatorHandle}\nPlatform: ${platform}\nFollowers: ${followers}\nAccess Type: ${safeAccessType}\nCreator Goals: ${improvement}`,
        });
      }
    } catch (emailError) {
      console.error("Resend email dispatch failed", {
        error: emailError,
        email,
        creatorHandle,
        hasAdminEmail: Boolean(adminEmail),
      });
    }

    await trackPosthogEvent("founding_creator_application_completed", {
      distinct_id: email,
      name,
      access_type: accessType,
      platform,
      category,
      challenge,
      posting_frequency: postingFrequency,
    });

    return NextResponse.json({ ok: true, application: savedApplication });
  } catch (error) {
    console.error("Early access submission failed", error);
    return NextResponse.json({ error: USER_ERROR_MESSAGE }, { status: 500 });
  }
}