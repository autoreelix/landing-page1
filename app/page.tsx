"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type React from "react";
import SignupForm from "./components/SignupForm";

const START_SIGNUPS = 327;
const MAX_RETENTION = 96;

export default function LandingPage() {
  const [signups, setSignups] = useState(START_SIGNUPS);
  const [retention, setRetention] = useState(82);
  const [viewers, setViewers] = useState(148);
  const [scrollY, setScrollY] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const signupInterval = setInterval(() => {
      setSignups((prev) => prev + Math.floor(Math.random() * 3));
    }, 9000);

    const retentionInterval = setInterval(() => {
      setRetention((prev) => {
        const delta = (Math.random() - 0.5) * 2;
        let next = prev + delta;
        if (next < 82) next = 82;
        if (next > MAX_RETENTION) next = MAX_RETENTION;
        return parseFloat(next.toFixed(1));
      });
    }, 6000);

    const viewerInterval = setInterval(() => {
      setViewers((prev) => {
        const delta = Math.floor((Math.random() - 0.4) * 10);
        const next = Math.min(Math.max(prev + delta, 90), 260);
        return next;
      });
    }, 3500);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      clearInterval(signupInterval);
      clearInterval(retentionInterval);
      clearInterval(viewerInterval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const parallaxOffset = scrollY * 0.04;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black text-slate-50">
      {/* Glow backdrop with subtle parallax */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-fuchsia-500/20 blur-3xl transition-transform duration-300"
          style={{ transform: `translate(-50%, ${parallaxOffset * 0.6}px)` }}
        />
        <div
          className="absolute top-40 -left-10 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl transition-transform duration-300"
          style={{ transform: `translateY(${parallaxOffset * 0.3}px)` }}
        />
        <div
          className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl transition-transform duration-300"
          style={{ transform: `translateY(${parallaxOffset * -0.2}px)` }}
        />
      </div>

      {/* NAV */}
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-6 md:px-6">
        <div className="flex items-center gap-3">
          <div className="relative h-14 w-14 overflow-hidden rounded-2xl bg-slate-900/80 ring-1 ring-slate-700/60 shadow-[0_0_40px_rgba(15,23,42,1)]">
            <Image
              src="/Copilot_20260409_112446.png"
              alt="AUTOREELIX logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Creator OS
            </span>
            <span className="text-lg font-semibold tracking-tight">
              AUTOREELIX
            </span>
          </div>
        </div>

        <div className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          <button className="rounded-full border border-slate-700/70 bg-slate-900/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-slate-300 hover:border-cyan-400/80 hover:text-white hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition">
            Live Sessions
          </button>
          <button className="rounded-full border border-slate-700/70 bg-slate-900/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-slate-300 hover:border-fuchsia-400/80 hover:text-white hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] transition">
            Creator’s Corner
          </button>
          <button className="rounded-full border border-fuchsia-500/70 bg-fuchsia-600/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-fuchsia-100 hover:bg-fuchsia-500/30 hover:shadow-[0_0_40px_rgba(236,72,153,0.7)] transition">
            Collab Mode
          </button>
        </div>

        <button
          type="button"
          onClick={openModal}
          className="rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-black shadow-[0_0_40px_rgba(236,72,153,0.5)] hover:brightness-110 active:scale-95 transition"
        >
          Get Early Access
        </button>
      </header>

      {/* HERO */}
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pb-14 pt-4 md:flex-row md:items-center md:gap-14 md:px-6 lg:pb-16 lg:pt-8">
        <div className="flex-1 space-y-7">
          <div className="relative mb-2 inline-flex items-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-2xl bg-slate-900/80 ring-1 ring-slate-700/60 shadow-[0_0_40px_rgba(15,23,42,1)]">
              <Image
                src="/Copilot_20260409_112446.png"
                alt="AUTOREELIX logo hero"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-slate-400">
                Autoreelix
              </span>
              <span className="text-sm text-slate-300">
                AI creator feedback before you publish
              </span>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/70 px-3 py-1 text-xs text-slate-300 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium uppercase tracking-[0.2em]">
              Built for creators who are tired of guessing
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl lg:text-6xl">
              Create better content by understanding why your videos{" "}
              <span className="bg-gradient-to-r from-fuchsia-400 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
                succeed or fail
              </span>{" "}
              before you post.
            </h1>
            <p className="max-w-2xl text-sm text-slate-300 sm:text-base">
              AUTOREELIX is a live creator workspace for coaches, educators,
              founders, and creators who publish short-form video. SmartOrb gives
              personalized feedback, content analysis, and improvement guidance
              while you record so your decisions get sharper before publishing.
            </p>
          </div>

          <button
            type="button"
            onClick={openModal}
            className="w-full rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-black shadow-[0_0_20px_rgba(236,72,153,0.6)] hover:brightness-110 active:scale-95 transition sm:w-auto"
          >
            Get Early Access
          </button>
          <p className="text-[0.7rem] text-slate-400">
            No spam. Just early access and launch updates.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-6 text-xs text-slate-300 sm:text-sm">
            <div className="space-y-1">
              <div className="text-[0.7rem] uppercase tracking-[0.2em] text-slate-400">
                Early creators onboarded
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-semibold tabular-nums">
                  {signups.toLocaleString()}
                </span>
                <span className="text-xs text-emerald-400">+ live</span>
              </div>
            </div>
            <div className="h-10 w-px bg-slate-800/80" />
            <div className="space-y-1">
              <div className="text-[0.7rem] uppercase tracking-[0.2em] text-slate-400">
                Simulated viewer retention
              </div>
              <div className="flex items-center gap-2">
                <div className="relative h-2 w-32 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-emerald-400 via-fuchsia-400 to-cyan-300 transition-all duration-700"
                    style={{ width: `${retention}%` }}
                  />
                </div>
                <span className="text-sm font-medium tabular-nums">
                  {retention.toFixed(1)}%
                </span>
              </div>
            </div>
            <div className="h-10 w-px bg-slate-800/80" />
            <div className="space-y-1">
              <div className="text-[0.7rem] uppercase tracking-[0.2em] text-slate-400">
                Live session viewers
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-semibold tabular-nums">{viewers}</span>
                <span className="text-xs text-cyan-300">in demo</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <p className="mb-2 text-[0.7rem] uppercase tracking-[0.2em] text-slate-400 text-center md:text-left">
            Product demonstration preview
          </p>
          <div className="relative mx-auto max-w-md rounded-3xl border border-slate-800/80 bg-slate-950/80 p-4 shadow-[0_0_60px_rgba(15,23,42,1)] backdrop-blur">
            <div className="mb-3 flex items-center justify-between text-[0.7rem] text-slate-400">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="uppercase tracking-[0.2em]">
                  SmartOrb Analysis Example
                </span>
              </div>
              <span className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[0.65rem] text-slate-300">
                Illustrative demo
              </span>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(236,72,153,0.18),transparent_55%),radial-gradient(circle_at_90%_100%,rgba(56,189,248,0.18),transparent_55%)]" />
              <div className="relative flex flex-col gap-3 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-fuchsia-500 to-violet-500" />
                    <div className="text-xs">
                      <div className="font-medium text-slate-100">
                        Hook Strength
                      </div>
                      <div className="text-[0.65rem] text-slate-400">
                        Score: 72/100
                      </div>
                    </div>
                  </div>
                  <div className="rounded-full bg-black/60 px-2 py-1 text-[0.65rem] text-slate-300">
                    Viewers:{" "}
                    <span className="font-semibold text-emerald-300 tabular-nums">
                      {viewers}
                    </span>
                  </div>
                </div>

                <div className="rounded-xl border border-fuchsia-500/40 bg-black/60 p-3 text-[0.7rem] text-slate-200">
                  <div className="mb-1 flex items-center gap-2">
                    <div
                      className="h-5 w-5 rounded-full bg-gradient-to-br from-fuchsia-400 via-violet-400 to-cyan-300 shadow-[0_0_20px_rgba(129,140,248,0.8)] transition-transform duration-300"
                      style={{
                        transform: `translateY(${Math.sin(scrollY / 80) * 3}px)`,
                      }}
                    />
                    <span className="text-[0.65rem] uppercase tracking-[0.2em] text-fuchsia-200">
                      SmartOrb • Personal AI Assistant
                    </span>
                  </div>
                  <p>
                    Issue: The payoff arrives too late. Suggested improvement:
                    reveal the outcome earlier to increase viewer curiosity.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-[0.7rem]">
                  <div className="rounded-xl border border-slate-800 bg-black/60 p-3 hover:border-emerald-400/70 hover:shadow-[0_0_30px_rgba(52,211,153,0.5)] transition">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-[0.65rem] uppercase tracking-[0.18em] text-slate-400">
                        Attention pattern
                      </span>
                      <span className="text-[0.65rem] text-emerald-400">
                        Drop at 0:09
                      </span>
                    </div>
                    <div className="mt-1 h-16 w-full rounded-md bg-slate-900 overflow-hidden">
                      <div className="h-full w-full bg-[linear-gradient(120deg,rgba(52,211,153,0.2),rgba(236,72,153,0.4),rgba(56,189,248,0.3))] animate-pulse" />
                    </div>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-black/60 p-3 hover:border-fuchsia-400/70 hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] transition">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-[0.65rem] uppercase tracking-[0.18em] text-slate-400">
                        Next action
                      </span>
                      <span className="text-[0.65rem] text-cyan-300">
                        3 improvements
                      </span>
                    </div>
                    <ul className="space-y-1 text-[0.65rem] text-slate-300">
                      <li>• Move promise to first sentence</li>
                      <li>• Cut 2 seconds of setup</li>
                      <li>• Add one concrete outcome</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-1 flex items-center justify-between text-[0.65rem] text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                    <span>Demo only • Not real customer data</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-3 text-center text-[0.7rem] text-slate-400">
            AUTOREELIX helps you evaluate structure, clarity, and attention
            before you publish.
          </p>
        </div>
      </section>

      {/* SECTION: Value summary */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-14 md:px-6 lg:pb-16">
        <div className="grid gap-4 sm:grid-cols-3 text-xs text-slate-300 sm:text-sm">
          <ValueCard
            title="AI Creator Feedback"
            description="Get pacing, hook, and clarity feedback while recording, not days later."
          />
          <ValueCard
            title="Personalized Analysis"
            description="Spot where attention drops and why, then get specific changes to test."
          />
          <ValueCard
            title="Better Decisions Before Posting"
            description="Publish with confidence from structured feedback, not guessing."
          />
        </div>
      </section>

      {/* SECTION: Differentiation */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-14 md:px-6 lg:pb-16">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
            How AUTOREELIX is different
          </h2>
          <p className="mt-2 text-sm text-slate-300 sm:text-base">
            Most tools help after recording. AUTOREELIX helps you make better
            content decisions before publishing.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3 text-xs text-slate-300 sm:text-sm">
          <ComparisonCard
            title="Traditional Editors"
            description="Great at cutting footage after recording, but they do not explain why a message may underperform."
          />
          <ComparisonCard
            title="AI Generators"
            description="Help create more drafts quickly, but often without context from your delivery and audience attention."
          />
          <ComparisonCard
            title="AUTOREELIX"
            description="Combines SmartOrb guidance, creator-aware analysis, and practical improvements while your session is still live."
            highlighted
          />
        </div>
      </section>

      {/* SECTION: Trust + Founder story */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-16 md:px-6 lg:pb-20">
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-800/80 bg-slate-950/80 p-5 shadow-[0_0_40px_rgba(15,23,42,1)]">
            <div className="text-[0.7rem] uppercase tracking-[0.2em] text-slate-400">
              Honest product stance
            </div>
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-50">
              Built for clarity, not algorithm myths
            </h3>
            <p className="mt-3 text-sm text-slate-300 sm:text-base">
              AUTOREELIX does not claim to know secret platform algorithms. It
              helps creators analyze content structure, audience attention
              patterns, and improvement opportunities before publishing.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-800/80 bg-slate-950/80 p-5 shadow-[0_0_40px_rgba(15,23,42,1)]">
            <div className="text-[0.7rem] uppercase tracking-[0.2em] text-slate-400">
              Why this was built
            </div>
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-50">
              From creator frustration to creator feedback
            </h3>
            <p className="mt-3 text-sm text-slate-300 sm:text-base">
              AUTOREELIX exists because creators are tired of posting blind and
              guessing what failed. The mission is simple: help creators improve
              faster with actionable feedback inside the workflow they already
              use.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION: Why now / FOMO + final CTA */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-20 md:px-6 lg:pb-24">
        <div className="rounded-3xl border border-fuchsia-500/40 bg-gradient-to-r from-slate-950 via-slate-950 to-slate-900 p-6 shadow-[0_0_60px_rgba(236,72,153,0.35)] space-y-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl space-y-3">
              <h3 className="text-xl font-semibold tracking-tight text-slate-50 sm:text-2xl">
                Ready to stop guessing before you post?
              </h3>
              <p className="text-sm text-slate-200 sm:text-base">
                Join early access to shape AUTOREELIX with your real creator
                workflow. Get launch invites, product updates, and first access
                to SmartOrb feedback features.
              </p>
            </div>

            <div className="w-full max-w-xs space-y-4 rounded-2xl border border-slate-800 bg-black/70 p-4 text-xs text-slate-200">
              <div className="flex items-center justify-between">
                <span className="text-[0.7rem] uppercase tracking-[0.2em] text-slate-400">
                  Early access slots
                </span>
                <span className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[0.65rem] text-emerald-300">
                  Filling fast
                </span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-2xl font-semibold tabular-nums">
                    {Math.min(signups, 999).toLocaleString()}
                  </div>
                  <div className="text-[0.7rem] text-slate-400">
                    creators already on the list
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-fuchsia-300">
                    ~{Math.round((signups / 1200) * 100)}% claimed
                  </div>
                  <div className="mt-1 h-2 w-28 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400 transition-all"
                      style={{
                        width: `${Math.min(
                          (signups / 1200) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={openModal}
                className="w-full rounded-xl bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400 px-4 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-black hover:brightness-110 active:scale-95 transition"
              >
                Get Early Access
              </button>

              <p className="text-[0.65rem] text-slate-400">
                You’ll get: early access invites, behind‑the‑scenes build notes,
                and first dibs on creator‑only features.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-900/80 bg-black/60">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 text-[0.7rem] text-slate-500 md:flex-row md:px-6">
          <div className="flex items-center gap-2">
            <div className="relative h-6 w-6 overflow-hidden rounded-lg bg-slate-900/80 ring-1 ring-slate-700/60">
              <Image
                src="/Copilot_20260409_112446.png"
                alt="AUTOREELIX logo small"
                fill
                className="object-cover"
              />
            </div>
            <span>AUTOREELIX — Live Creator OS for Viral Content</span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span>
              © {new Date().getFullYear()} AUTOREELIX. All rights reserved.
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-slate-600 md:inline-block" />
            <span className="text-slate-500">
              Built for humans, not algorithms—SmartOrb just speaks both.
            </span>
          </div>
        </div>
      </footer>

      {/* Modal with existing SignupForm */}
      <EarlyAccessModal isOpen={isModalOpen} onClose={closeModal}>
        <div className="space-y-3 text-center">
          <h2 className="text-xl font-semibold text-slate-50">
            Join Early Access
          </h2>
          <p className="text-sm text-slate-300">
            Be first to use AUTOREELIX before launch. No spam—just early access
            and build notes.
          </p>
        </div>
        <div className="mt-4">
          <SignupForm />
        </div>
      </EarlyAccessModal>
    </main>
  );
}

type ValueCardProps = {
  title: string;
  description: string;
};

function ValueCard({ title, description }: ValueCardProps) {
  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-800 bg-slate-950/80 p-4 shadow-[0_0_30px_rgba(15,23,42,1)] hover:border-cyan-400/70 hover:shadow-[0_0_35px_rgba(34,211,238,0.6)] active:scale-95 transition">
      <div>
        <div className="text-[0.7rem] uppercase tracking-[0.2em] text-slate-400">
          {title}
        </div>
        <p className="mt-2 text-[0.8rem] text-slate-300">{description}</p>
      </div>
    </div>
  );
}

type ComparisonCardProps = {
  title: string;
  description: string;
  highlighted?: boolean;
};

function ComparisonCard({
  title,
  description,
  highlighted = false,
}: ComparisonCardProps) {
  return (
    <div
      className={`rounded-2xl border p-4 text-left shadow-[0_0_25px_rgba(15,23,42,1)] transition ${
        highlighted
          ? "border-fuchsia-500/60 bg-slate-900/80"
          : "border-slate-800 bg-slate-950/80"
      }`}
    >
      <div className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
        {title}
      </div>
      <p className="mt-2 text-[0.8rem] text-slate-300">{description}</p>
    </div>
  );
}

type EarlyAccessModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

function EarlyAccessModal({ isOpen, onClose, children }: EarlyAccessModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-[0_0_50px_rgba(15,23,42,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-slate-900 px-2 py-1 text-xs text-slate-400 hover:bg-slate-800 hover:text-slate-200"
        >
          Close
        </button>
        {children}
      </div>
    </div>
  );
}






