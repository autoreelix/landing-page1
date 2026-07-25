"use client";

const STORAGE_KEY = "autoreelix:distinct-id";

function getDistinctId() {
  if (typeof window === "undefined") {
    return "server";
  }

  const cached = window.localStorage.getItem(STORAGE_KEY);
  if (cached) {
    return cached;
  }

  const id = window.crypto.randomUUID();
  window.localStorage.setItem(STORAGE_KEY, id);
  return id;
}

export function trackLandingEvent(event: string, properties: Record<string, unknown> = {}) {
  if (typeof window === "undefined") {
    return;
  }

  const payload = JSON.stringify({
    event,
    distinctId: getDistinctId(),
    properties: {
      ...properties,
      path: window.location.pathname,
      url: window.location.href,
    },
  });

  if (typeof navigator.sendBeacon === "function") {
    navigator.sendBeacon("/api/track", new Blob([payload], { type: "application/json" }));
    return;
  }

  fetch("/api/track", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: payload,
    keepalive: true,
  }).catch(() => undefined);
}