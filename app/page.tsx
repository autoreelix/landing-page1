"use client";
import SignupForm from "./components/SignupForm";

import Image from "next/image";
import { useEffect, useState } from "react";
import type React from "react";

const START_SIGNUPS = 327;
const MAX_RETENTION = 96;

export default function LandingPage() {
  const [signups, setSignups] = useState(START_SIGNUPS);
  const [retention, setRetention] = useState(82);
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
  const [viewers, setViewers] = useState(148);
  const [streakDays, setStreakDays] = useState(7);
  const [streakProgress, setStreakProgress] = useState(70);
  const [scrollY, setScrollY] = useState(0);

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

    const streakInterval = setInterval(() => {
      setStreakDays((prev) => {
        const next = Math.min(prev + 1, 30);
        return next;
      });
      setStreakProgress((prev) => {
        const next = Math.min(prev + Math.random() * 5, 100);
        return parseFloat(next.toFixed(1));
      });
    }, 15000);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      clearInterval(signupInterval);
      clearInterval(retentionInterval);
      clearInterval(viewerInterval);
      clearInterval(streakInterval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleBeehiivSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;

    if (!email) return;

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        alert("Something went wrong. Try again in a moment.");
        return;
      }

      alert("You’re in. Check your inbox for confirmation.");
      form.reset();
    } catch {
      alert("Connection issue. Please try again.");
    }
  };

  const parallaxOffset = scrollY * 0.04;

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

        <button className="rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-black shadow-[0_0_40px_rgba(236,72,153,0.5)] hover:brightness-110 active:scale-95 transition">
          Get Early Access
        </button>
      </header>

      {/* HERO */}
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pb-16 pt-4 md:flex-row md:items-center md:gap-14 md:px-6 lg:pb-24 lg:pt-10">
        {/* Left: copy + form */}
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
                Live Creator OS • Create → Edit → Analyze → Improve → Export →
                Store
              </span>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/70 px-3 py-1 text-xs text-slate-300 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium uppercase tracking-[0.2em]">
              Live Creator OS for Viral Content
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl lg:text-6xl">
              Turn every recording into a{" "}
              <span className="bg-gradient-to-r from-fuchsia-400 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
                viral‑ready reel
              </span>{" "}
              while your AI assistant runs the session.
            </h1>
            <p className="max-w-xl text-sm text-slate-300 sm:text-base">
              AUTOREELIX is your **live, personal AI producer**—guiding your
              sessions, tracking retention in real time, and auto‑building
              clips, hooks, and formats that actually perform on TikTok, Reels,
              Shorts, and beyond. You talk. It orchestrates.
            </p>
          </div>

          {/* Metrics row + creator streak meter */}
          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300 sm:text-sm">
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
                Creator streak
              </div>
              <div className="flex items-center gap-2">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold tabular-nums">
                    {streakDays} days
                  </span>
                  <span className="text-[0.65rem] text-slate-400">
                    Recording streak simulation
                  </span>
                </div>
                <div className="relative h-2 w-24 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-amber-400 via-fuchsia-400 to-emerald-400 transition-all duration-700"
                    style={{ width: `${streakProgress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Beehiiv form */}
          <div className="mt-4">
             <button
              onClick={() => window.location.href =
           "https://autoreelix.beehiiv.com"}
             className="bg-black text-white px-6 py-3 rounded-lg
           text-lg font-semibold w-full"
            >
             Join the Waitlist
            </button>
            
             <p className="mt-2 text-[0.7rem]"> 
              No spam. Just launch updates. 
              </p> 
            </div>
        </div>

        {/* Right: “live session” visual with live viewer simulation */}
        <div className="flex-1">
          <div className="relative mx-auto max-w-md rounded-3xl border border-slate-800/80 bg-slate-950/80 p-4 shadow-[0_0_60px_rgba(15,23,42,1)] backdrop-blur">
            <div className="mb-3 flex items-center justify-between text-[0.7rem] text-slate-400">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="uppercase tracking-[0.2em]">
                  Live Creator Session
                </span>
              </div>
              <span className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[0.65rem] text-slate-300">
                SmartOrb in session
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
                        “Hook Builder” Session
                      </div>
                      <div className="text-[0.65rem] text-slate-400">
                        Topic: Turn one idea into 12 viral hooks
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
                    “Pause here and repeat that line slower—this is your
                    scroll‑stopping moment. I’ll mark this as a clip and test
                    three title angles for Shorts.”
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-[0.7rem]">
                  <div className="rounded-xl border border-slate-800 bg-black/60 p-3 hover:border-emerald-400/70 hover:shadow-[0_0_30px_rgba(52,211,153,0.5)] transition">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-[0.65rem] uppercase tracking-[0.18em] text-slate-400">
                        Retention curve
                      </span>
                      <span className="text-[0.65rem] text-emerald-400">
                        +18% vs baseline
                      </span>
                    </div>
                    <div className="mt-1 h-16 w-full rounded-md bg-slate-900 overflow-hidden">
                      <div className="h-full w-full bg-[linear-gradient(120deg,rgba(52,211,153,0.2),rgba(236,72,153,0.4),rgba(56,189,248,0.3))] animate-pulse" />
                    </div>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-black/60 p-3 hover:border-fuchsia-400/70 hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] transition">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-[0.65rem] uppercase tracking-[0.18em] text-slate-400">
                        Clip queue
                      </span>
                      <span className="text-[0.65rem] text-cyan-300">
                        9 auto‑generated
                      </span>
                    </div>
                    <ul className="space-y-1 text-[0.65rem] text-slate-300">
                      <li>• “You’re doing this backwards…” hook</li>
                      <li>• “Stop posting raw screen recordings”</li>
                      <li>• “The 30‑second retention test”</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-1 flex items-center justify-between text-[0.65rem] text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                    <span>Recording • Auto‑chapters • Live notes</span>
                  </div>
                  <button className="rounded-full bg-slate-900/80 px-2 py-1 text-[0.65rem] text-slate-200 hover:bg-slate-800 active:scale-95 transition">
                    See session summary →
                  </button>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-3 text-center text-[0.7rem] text-slate-400">
            AUTOREELIX simulates viewer behavior while you record—so you leave
            each session with clips that already know how to perform.
          </p>
        </div>
      </section>

      {/* SECTION: What AUTOREELIX actually is */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-16 md:px-6 lg:pb-24">
        <div className="grid gap-10 md:grid-cols-[1.2fr,1fr] md:items-start">
          <div className="space-y-5">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
              Not another editor. A live **Creator OS** that thinks in viral
              formats.
            </h2>
            <p className="text-sm text-slate-300 sm:text-base">
              AUTOREELIX is built for creators who are tired of guessing what
              will hit. It’s a **live operating system for your recording
              sessions**—watching your pacing, marking highlights, and
              structuring your content into clips, carousels, and scripts while
              you talk.
            </p>
            <p className="text-sm text-slate-300 sm:text-base">
              Instead of dumping raw footage into a timeline, you step into a
              guided session. Your **personal AI assistant (SmartOrb)** nudges
              you when you’re onto something, suggests stronger hooks, and
              quietly builds a library of reusable content assets behind the
              scenes.
            </p>

            <div className="grid gap-4 sm:grid-cols-3">
              <FeaturePill
                label="Live retention radar"
                description="See how a real audience would drop or stay—while you’re still recording."
                onHover={setHoveredFeature}
              />
              <FeaturePill
                label="Auto clip intelligence"
                description="Moments that spike interest are auto‑tagged, titled, and queued as clips."
                onHover={setHoveredFeature}
              />
              <FeaturePill
                label="Format‑aware prompts"
                description="SmartOrb speaks in TikTok, Reels, Shorts, and podcast language—not generic AI."
                onHover={setHoveredFeature}
              />
            </div>
          </div>

          {/* SmartOrb explanation */}
          <div className="relative rounded-3xl border border-slate-800/80 bg-slate-950/80 p-5 shadow-[0_0_50px_rgba(15,23,42,1)]">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                Meet SmartOrb
              </div>
              <div className="rounded-full bg-slate-900/80 px-2 py-1 text-[0.65rem] text-slate-300">
                Your personal AI assistant
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-fuchsia-500 via-violet-400 to-cyan-300 blur-md opacity-70 animate-pulse" />
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-slate-950 ring-2 ring-fuchsia-400/70">
                    <div className="h-7 w-7 rounded-full bg-gradient-to-br from-fuchsia-300 via-violet-200 to-cyan-200 shadow-[0_0_30px_rgba(129,140,248,0.9)]" />
                  </div>
                </div>
                <p className="flex-1 text-xs text-slate-300 sm:text-sm">
                  SmartOrb is the **always‑on brain** inside AUTOREELIX. It
                  listens to your session, tracks energy, and surfaces the
                  moments that matter—without ever getting in your way.
                </p>
              </div>

              <ul className="space-y-2 text-xs text-slate-300 sm:text-sm">
                <li>
                  • **Guides your flow** with gentle prompts: “Give me that in
                  one sentence,” “Try a spicier take,” “Pause—this is a hook.”
                </li>
                <li>
                  • **Understands platforms**: it knows what works on TikTok vs
                  YouTube Shorts vs Instagram Reels and adjusts suggestions.
                </li>
                <li>
                  • **Builds assets live**: titles, descriptions, timestamps,
                  and clip ideas are generated while you speak.
                </li>
                <li>
                  • **Feels human**: no robotic walls of text—just short,
                  timely nudges that feel like a producer in your ear.
                </li>
              </ul>

              {hoveredFeature && (
                <div className="mt-2 rounded-2xl border border-fuchsia-500/40 bg-black/70 p-3 text-[0.7rem] text-slate-200">
                  <div className="mb-1 text-[0.65rem] uppercase tracking-[0.2em] text-fuchsia-200">
                    SmartOrb reacts to:
                  </div>
                  <p>{hoveredFeature}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Core loop */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-16 md:px-6 lg:pb-24">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
            One loop. Every feature feeds it.
          </h2>
          <p className="mt-2 text-sm text-slate-300 sm:text-base">
            AUTOREELIX is built around a single, unbreakable loop:
            <span className="font-semibold text-slate-100">
              {" "}
              Create → Edit → Analyze → Improve → Export → Store
            </span>
            . No dead ends. Every action pushes your content forward.
          </p>
        </div>

        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-3 text-xs text-slate-200 sm:text-sm">
          {["Create", "Edit", "Analyze", "Improve", "Export", "Store"].map(
            (step, idx, arr) => (
              <div key={step} className="flex items-center gap-3">
                <div className="rounded-full border border-slate-700/80 bg-slate-950/80 px-4 py-2 shadow-[0_0_25px_rgba(15,23,42,1)] hover:border-fuchsia-400/80 hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] active:scale-95 transition">
                  <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-400">
                    {step}
                  </span>
                </div>
                {idx < arr.length - 1 && (
                  <span className="text-slate-500">➜</span>
                )}
              </div>
            )
          )}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3 text-xs text-slate-300 sm:text-sm">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 hover:border-cyan-400/70 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition">
            <div className="text-[0.7rem] uppercase tracking-[0.2em] text-slate-400 mb-1">
              Create & Edit
            </div>
            <p>
              Capture ideas in **Viral Lab**, then refine them in **Studio** with
              manual controls, full AI edits, or a hybrid of both.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 hover:border-emerald-400/70 hover:shadow-[0_0_30px_rgba(52,211,153,0.5)] transition">
            <div className="text-[0.7rem] uppercase tracking-[0.2em] text-slate-400 mb-1">
              Analyze & Improve
            </div>
            <p>
              **Performance Lab** runs deep analysis, compares before vs after,
              and lets SmartOrb coach you toward better results.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 hover:border-fuchsia-400/70 hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] transition">
            <div className="text-[0.7rem] uppercase tracking-[0.2em] text-slate-400 mb-1">
              Export & Store
            </div>
            <p>
              Export finished assets, then archive everything in **Vault**—clips,
              scripts, thumbnails, and deleted scenes—without losing a single
              version.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION: Core platform map */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-16 md:px-6 lg:pb-24">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
            The AUTOREELIX map: one purpose per room.
          </h2>
          <p className="mt-2 text-sm text-slate-300 sm:text-base">
            Every section has a single job and always points you to the next
            step in the loop.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3 text-xs text-slate-300 sm:text-sm">
          <PlatformCard
            title="Dashboard"
            role="Your command center"
            description="See live session stats, retention trends, credits, and what SmartOrb wants you to do next."
            next="Jump into Viral Lab or resume an in‑progress project."
          />
          <PlatformCard
            title="Viral Lab"
            role="Content creation"
            description="Generate hooks, scripts, and content ideas using OpenAI—tuned for TikTok, Reels, Shorts, and podcasts."
            next="Send winning ideas straight into Studio for recording and editing."
          />
          <PlatformCard
            title="Studio"
            role="Editing"
            description="Hybrid editor: manual mode, full AI, or a blend of both. Non‑destructive timeline, deleted scenes, and FFmpeg‑powered processing."
            next="Push finished cuts into Performance Lab for analysis."
          />
          <PlatformCard
            title="Performance Lab"
            role="Analysis + improvement"
            description="OpenAI analysis + coaching: before vs after scores, improvement breakdowns, and confidence indicators for every change."
            next="Send optimized versions to Export or back to Studio for another pass."
          />
          <PlatformCard
            title="TrendPulse"
            role="Trends + discovery"
            description="NewsAPI + platform signals surface trending topics, sounds, and angles that match your niche."
            next="Turn trends into scripts in Viral Lab in one click."
          />
          <PlatformCard
            title="Creators Corner"
            role="Community"
            description="Save frameworks, share formats, and learn from other creators’ winning sessions—without leaking your raw files."
            next="Pull proven templates into your next live session."
          />
          <PlatformCard
            title="Vault"
            role="Storage"
            description="Backed by Supabase + Cloudflare R2 + Cloudinary. Every asset, version, and deleted scene stays accessible."
            next="Re‑use, remix, or feed old assets into the Legendary System."
          />
        </div>
      </section>

      {/* SECTION: Creator’s Corner & Collab Mode */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-16 md:px-6 lg:pb-24">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
            Creator’s Corner & Collab Mode
          </h2>
          <p className="max-w-md text-xs text-slate-400 sm:text-sm">
            AUTOREELIX isn’t just a tool—it’s a **live space** where creators
            refine ideas together, share formats, and co‑build sessions that
            actually ship.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-950/80 p-5 hover:border-cyan-400/70 hover:shadow-[0_0_40px_rgba(34,211,238,0.5)] transition">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-fuchsia-500/25 to-violet-500/10 blur-3xl" />
            <div className="relative space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-slate-300">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                Creator’s Corner
              </div>
              <p className="text-sm text-slate-200 sm:text-base">
                A dedicated space inside AUTOREELIX where you can **save winning
                hooks, frameworks, and session templates**—and remix them
                whenever you record.
              </p>
              <ul className="space-y-2 text-xs text-slate-300 sm:text-sm">
                <li>• Pin your best hooks and intros as reusable “openers.”</li>
                <li>
                  • Store swipe‑worthy carousels, scripts, and content skeletons
                  for future sessions.
                </li>
                <li>
                  • Let SmartOrb suggest which of your saved formats fits the
                  topic you’re recording today.
                </li>
              </ul>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-950/80 p-5 hover:border-fuchsia-400/70 hover:shadow-[0_0_40px_rgba(236,72,153,0.5)] transition">
            <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-gradient-to-tr from-cyan-400/25 to-violet-500/10 blur-3xl" />
            <div className="relative space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-slate-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                Collab Mode
              </div>
              <p className="text-sm text-slate-200 sm:text-base">
                Bring a co‑host, editor, or brand partner into your session.
                SmartOrb keeps track of **who said what**, where the heat spikes,
                and which moments belong to which person.
              </p>
              <ul className="space-y-2 text-xs text-slate-300 sm:text-sm">
                <li>
                  • Shared live notes and clip markers visible to everyone in
                  the session.
                </li>
                <li>
                  • Role‑aware suggestions: “Let your co‑host react here,”
                  “Pause for a stitchable moment.”
                </li>
                <li>
                  • Export a shared clip board so your editor or team can move
                  straight into production.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: AI engine, hybrid editor, video system */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-16 md:px-6 lg:pb-24">
        <div className="grid gap-8 lg:grid-cols-[1.2fr,1fr]">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
              A stacked AI engine that never ships weak output.
            </h2>
            <p className="text-sm text-slate-300 sm:text-base">
              AUTOREELIX routes every request through a **quality‑first AI
              system**: if an output is weak, it’s auto‑improved before you ever
              see it.
            </p>

            <div className="grid gap-3 sm:grid-cols-2 text-xs text-slate-300 sm:text-sm">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 hover:border-fuchsia-400/70 hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] transition">
                <div className="text-[0.7rem] uppercase tracking-[0.2em] text-slate-400 mb-1">
                  OpenAI
                </div>
                <p>
                  Hooks, scripts, analysis, assistant, and coaching—tuned for
                  creators, not generic chat. Every response passes a quality
                  check before it hits your screen.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 hover:border-cyan-400/70 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition">
                <div className="text-[0.7rem] uppercase tracking-[0.2em] text-slate-400 mb-1">
                  Runway & Kling
                </div>
                <p>
                  Runway as the **default** video engine for balanced cost.
                  Kling as the **premium** tier for cinematic, high‑end outputs.
                  Pexels fills gaps with stock footage when needed.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 hover:border-emerald-400/70 hover:shadow-[0_0_30px_rgba(52,211,153,0.5)] transition">
                <div className="text-[0.7rem] uppercase tracking-[0.2em] text-slate-400 mb-1">
                  ElevenLabs & audio
                </div>
                <p>
                  ElevenLabs powers voice generation and replacement. FFmpeg
                  handles non‑destructive edits, deleted scenes, and
                  export‑ready audio.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4 hover:border-violet-400/70 hover:shadow-[0_0_30px_rgba(129,140,248,0.5)] transition">
                <div className="text-[0.7rem] uppercase tracking-[0.2em] text-slate-400 mb-1">
                  TrendPulse brain
                </div>
                <p>
                  NewsAPI + platform signals feed TrendPulse so your ideas are
                  always anchored to what’s moving **right now**.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 rounded-3xl border border-slate-800 bg-slate-950/80 p-5">
            <div className="text-[0.7rem] uppercase tracking-[0.2em] text-slate-400">
              Studio • Hybrid editor
            </div>
            <p className="text-sm text-slate-200 sm:text-base">
              Choose **Manual Mode**, **Full AI**, or a **Hybrid** where SmartOrb
              suggests edits and you approve them. Every change is reversible.
            </p>
            <ul className="space-y-2 text-xs text-slate-300 sm:text-sm">
              <li>
                • Non‑destructive timeline with deleted scenes and version
                history.
              </li>
              <li>
                • Async processing with background jobs—UI stays smooth while
                FFmpeg works.
              </li>
              <li>
                • Before vs after scores, improvement explanations, and
                confidence indicators.
              </li>
            </ul>
            <div className="mt-3 rounded-2xl border border-fuchsia-500/40 bg-black/70 p-3 text-[0.75rem] text-slate-200">
              <div className="mb-1 text-[0.65rem] uppercase tracking-[0.2em] text-fuchsia-200">
                Output quality system
              </div>
              <p>
                If a script, clip, or edit doesn’t meet the bar, AUTOREELIX
                quietly re‑runs and improves it. You never see the weak
                version—only the best attempt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Why now / FOMO */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-20 md:px-6 lg:pb-24">
        <div className="rounded-3xl border border-fuchsia-500/40 bg-gradient-to-r from-slate-950 via-slate-950 to-slate-900 p-6 shadow-[0_0_60px_rgba(236,72,153,0.35)]">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl space-y-3">
              <h3 className="text-xl font-semibold tracking-tight text-slate-50 sm:text-2xl">
                The creators who win the next 12 months will **treat recording
                like a live lab**, not a guessing game.
              </h3>
              <p className="text-sm text-slate-200 sm:text-base">
                AUTOREELIX is built for that new wave: creators who want to
                **measure retention while they talk**, test hooks in real time,
                and leave every session with a stack of content that already
                knows how to perform.
              </p>
              <p className="text-sm text-slate-200 sm:text-base">
                Early access isn’t just “getting in first.” It means your
                content, your patterns, and your feedback shape how SmartOrb
                thinks about creators. The system literally learns from you.
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
              <button className="mt-2 w-full rounded-xl bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400 px-4 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-black hover:brightness-110 active:scale-95 transition">
                Join the first wave
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
    </main>
  );
}

type FeaturePillProps = {
  label: string;
  description: string;
  onHover: (text: string | null) => void;
};

function FeaturePill({ label, description, onHover }: FeaturePillProps) {
  return (
    <button
      type="button"
      onMouseEnter={() => onHover(description)}
      onMouseLeave={() => onHover(null)}
      onTouchStart={() => onHover(description)}
      onTouchEnd={() => onHover(null)}
      className="group flex h-full flex-col justify-between rounded-2xl border border-slate-800 bg-slate-950/80 p-3 text-left text-xs text-slate-200 shadow-[0_0_30px_rgba(15,23,42,1)] transition hover:border-fuchsia-400/70 hover:bg-slate-900/80 hover:shadow-[0_0_35px_rgba(236,72,153,0.6)] active:scale-95"
    >
      <span className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-400 group-hover:text-fuchsia-300">
        {label}
      </span>
      <span className="text-[0.75rem] text-slate-300">{description}</span>
    </button>
  );
}

type PlatformCardProps = {
  title: string;
  role: string;
  description: string;
  next: string;
};

function PlatformCard({ title, role, description, next }: PlatformCardProps) {
  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-800 bg-slate-950/80 p-4 shadow-[0_0_30px_rgba(15,23,42,1)] hover:border-cyan-400/70 hover:shadow-[0_0_35px_rgba(34,211,238,0.6)] active:scale-95 transition">
      <div>
        <div className="text-[0.7rem] uppercase tracking-[0.2em] text-slate-400">
          {title}
        </div>
        <div className="mt-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-fuchsia-300">
          {role}
        </div>
        <p className="mt-2 text-[0.8rem] text-slate-300">{description}</p>
      </div>
      <p className="mt-3 text-[0.7rem] text-slate-400">
        Next: <span className="text-slate-200">{next}</span>
      </p>
    </div>
  );
}





