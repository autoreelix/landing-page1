import { NextResponse } from "next/server";

type TrackBody = {
  event?: unknown;
  distinctId?: unknown;
  properties?: unknown;
};

function readText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function readRecord(value: unknown) {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
}

async function forwardToPosthog(event: string, distinctId: string, properties: Record<string, unknown>) {
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
          distinct_id: distinctId,
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
    const body = (await req.json()) as TrackBody;
    const event = readText(body.event);

    if (!event) {
      return NextResponse.json({ error: "Missing event name" }, { status: 400 });
    }

    const distinctId = readText(body.distinctId) || "autoreelix-visitor";
    const properties = readRecord(body.properties);

    await forwardToPosthog(event, distinctId, properties);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}