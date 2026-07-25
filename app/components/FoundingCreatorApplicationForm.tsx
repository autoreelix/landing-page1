"use client";

import Script from "next/script";
import { useEffect, useMemo, useRef, useState } from "react";
import { trackLandingEvent } from "../lib/track";

const PLATFORM_OPTIONS = ["TikTok", "YouTube", "Instagram", "Podcast", "Other"] as const;
const CHALLENGE_OPTIONS = ["Getting views", "Understanding analytics", "Improving videos", "Creating ideas", "Editing faster", "Growing audience", "Monetization"] as const;
const POSTING_OPTIONS = ["Daily", "3-5 times per week", "1-2 times per week", "Weekly", "Less often"] as const;
const ACCESS_OPTIONS = [
  { value: "founding_creator", label: "Founding Creator ($20)" },
  { value: "free_creator", label: "Free Creator Early Access" },
] as const;

type FormStatus = "idle" | "loading" | "success" | "error";

declare global {
  interface Window {
    turnstile?: {
      reset: () => void;
    };
    autoreelixTurnstileSuccess?: (token: string) => void;
    autoreelixTurnstileExpired?: () => void;
    autoreelixTurnstileError?: () => void;
  }
}

export default function FoundingCreatorApplicationForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const [started, setStarted] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const formRef = useRef<HTMLFormElement | null>(null);
  const turnstileSiteKey = process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY;

  useEffect(() => {
    window.autoreelixTurnstileSuccess = (token: string) => {
      setTurnstileToken(typeof token === "string" ? token : "");
      if (status === "error") {
        setStatus("idle");
        setMessage("");
      }
    };

    window.autoreelixTurnstileExpired = () => {
      setTurnstileToken("");
    };

    window.autoreelixTurnstileError = () => {
      setTurnstileToken("");
    };

    return () => {
      delete window.autoreelixTurnstileSuccess;
      delete window.autoreelixTurnstileExpired;
      delete window.autoreelixTurnstileError;
    };
  }, [status]);

  const statusTone = useMemo(() => {
    if (status === "success") {
      return "text-emerald-300";
    }

    if (status === "error") {
      return "text-red-300";
    }

    return "text-slate-400";
  }, [status]);

  const markStarted = () => {
    if (started) {
      return;
    }

    setStarted(true);
    trackLandingEvent("application_started", { location: "founding_creator_form" });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!turnstileSiteKey || !turnstileToken) {
      setStatus("error");
      setMessage("Please complete the security check and try again.");
      return;
    }

    setStatus("loading");
    setMessage("Submitting your application...");

    const formData = new FormData(event.currentTarget);
    const payloadEntries = Object.fromEntries(formData.entries()) as Record<string, FormDataEntryValue>;
    const payload: Record<string, FormDataEntryValue | string> = {
      ...payloadEntries,
      turnstileToken,
    };
    const accessType = String(payload.access_type || "free_creator");

    trackLandingEvent("application_submitted", {
      platform: String(payload.platform || ""),
      category: String(payload.category || ""),
      access_type: accessType,
    });

    try {
      const response = await fetch("/api/early-access", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => null);
        setStatus("error");
        setMessage("We could not submit your application right now. Please try again in a moment.");
        trackLandingEvent("application_failed", { reason: errorPayload?.error || "unknown" });
        return;
      }

      setStatus("success");
      setMessage("Application received. Please check your email for confirmation and next steps.");
      formRef.current?.reset();
      setTurnstileToken("");
      window.turnstile?.reset();
      setStarted(false);
      trackLandingEvent("application_completed", {
        platform: String(payload.platform || ""),
        category: String(payload.category || ""),
      });
    } catch {
      setStatus("error");
      setMessage("We could not submit your application right now. Please try again in a moment.");
      trackLandingEvent("application_failed", { reason: "network_or_server" });
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="turnstileToken" value={turnstileToken} readOnly />

      {turnstileSiteKey ? (
        <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
          <div className="rounded-[1.25rem] border border-slate-800/80 bg-black/35 p-3">
            <div
              className="cf-turnstile"
              data-sitekey={turnstileSiteKey}
              data-theme="dark"
              data-action="autoreelix_founding_creator"
              data-callback="autoreelixTurnstileSuccess"
              data-expired-callback="autoreelixTurnstileExpired"
              data-timeout-callback="autoreelixTurnstileExpired"
              data-error-callback="autoreelixTurnstileError"
            />
          </div>
        </>
      ) : (
        <div className="rounded-[1.25rem] border border-slate-800/80 bg-black/35 p-3 text-sm text-slate-400">
          Security verification runs automatically to protect creator applications.
        </div>
      )}

      <label className="block space-y-2 text-sm">
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-slate-400">
          What type of access are you interested in?
        </span>
        <select
          name="access_type"
          required
          onFocus={markStarted}
          defaultValue=""
          className="w-full rounded-2xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/15"
        >
          <option value="" disabled>
            Select access type
          </option>
          {ACCESS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <p className="text-xs leading-5 text-slate-500">
          This helps us prioritize cohorts. No payment is collected at this stage.
        </p>
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" placeholder="Your name" onFocus={markStarted} required />
        <Field label="Email" name="email" type="email" placeholder="you@example.com" onFocus={markStarted} required />
        <Field label="Creator username" name="creator_handle" placeholder="@creatorname" onFocus={markStarted} required />
        <Field label="Follower count" name="followers" type="number" placeholder="12000" onFocus={markStarted} required />
        <SelectField label="Platform" name="platform" options={PLATFORM_OPTIONS} onFocus={markStarted} required />
        <Field label="Content category" name="category" placeholder="Education, gaming, beauty, etc." onFocus={markStarted} required />
        <SelectField label="Posting frequency" name="posting_frequency" options={POSTING_OPTIONS} onFocus={markStarted} required />
        <SelectField label="Biggest challenge" name="challenge" options={CHALLENGE_OPTIONS} onFocus={markStarted} required />
      </div>

      <Field label="Best content link" name="video_link" type="url" placeholder="https://..." onFocus={markStarted} required />

      <TextAreaField label="What would you want SmartOrb to help you improve?" name="improvement" placeholder="Hooks, pacing, ideas, strategy, storytelling, or something else..." onFocus={markStarted} required />

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400 px-5 py-3 text-sm font-semibold text-black shadow-[0_0_28px_rgba(236,72,153,0.4)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "loading" ? "Submitting..." : "Apply for Beta Access"}
      </button>

      <p className={`text-sm leading-6 ${statusTone}`}>{message || "Each application is reviewed by the AUTOREELIX team."}</p>
    </form>
  );
}

type FieldProps = {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  onFocus?: () => void;
};

function Field({ label, name, placeholder, type = "text", required = false, onFocus }: FieldProps) {
  return (
    <label className="block space-y-2 text-sm">
      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-slate-400">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        onFocus={onFocus}
        className="w-full rounded-2xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/15"
      />
    </label>
  );
}

type SelectFieldProps = {
  label: string;
  name: string;
  options: readonly string[];
  required?: boolean;
  onFocus?: () => void;
};

function SelectField({ label, name, options, required = false, onFocus }: SelectFieldProps) {
  return (
    <label className="block space-y-2 text-sm">
      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-slate-400">{label}</span>
      <select
        name={name}
        required={required}
        onFocus={onFocus}
        className="w-full rounded-2xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/15"
        defaultValue=""
      >
        <option value="" disabled>
          Select one
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

type TextAreaFieldProps = {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  onFocus?: () => void;
};

function TextAreaField({ label, name, placeholder, required = false, onFocus }: TextAreaFieldProps) {
  return (
    <label className="block space-y-2 text-sm">
      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-slate-400">{label}</span>
      <textarea
        name={name}
        placeholder={placeholder}
        required={required}
        onFocus={onFocus}
        rows={5}
        className="w-full rounded-2xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/15"
      />
    </label>
  );
}