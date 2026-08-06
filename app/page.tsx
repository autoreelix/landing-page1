"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import FoundingCreatorApplicationForm from "./components/FoundingCreatorApplicationForm";
import { trackLandingEvent } from "./lib/track";

const DEMO_PROMPTS = [
  {
    label: "What are you capable of?",
    response:
      "Hi, I’m SmartOrb. I’m your AI Creative Director inside AUTOREELIX. I learn how you create, understand your goals, and help you improve over time. I can analyze your videos, point out hook problems, pacing issues, storytelling opportunities, and patterns in what your audience responds to. I’m not here to generate noise. I’m here to help you make sharper creative decisions.",
    insight:
      "SmartOrb gets more personal as it learns what works for your channel, not just generic best practices.",
  },
  {
    label: "Why are my videos not growing?",
    response:
      "Usually it is not one big mistake. It is a stack of small ones: the hook takes too long, the main point shows up late, or the audience does not see themselves in the first few seconds. SmartOrb looks for where attention drops, then tells you what to tighten, cut, or test next.",
    insight:
      "Growth problems often show up in the first 3 to 10 seconds, not in the thumbnail alone.",
  },
  {
    label: "How do I improve my videos?",
    response:
      "I’d start by comparing your strongest posts to the ones that stalled. SmartOrb looks for repeatable patterns in pacing, clarity, payoff, and emotional pull. Then it turns those patterns into concrete next steps so you can test one change at a time.",
    insight:
      "Your best content already contains the answer. SmartOrb helps you see it faster.",
  },
  {
    label: "Can you understand my style?",
    response:
      "Yes. Every creator gets their own SmartOrb. It learns your goals, tone, preferences, and the creative moves that keep showing up in your work. Over time it starts sounding less like a tool and more like a director who already knows your playbook.",
    insight:
      "Creator Memory is what makes the feedback feel specific instead of recycled.",
  },
  {
    label: "How is this different from other AI?",
    response:
      "Most AI tools help you make more content. SmartOrb helps you understand yourself as a creator. It is built for analysis, guidance, and decision-making, not just generation. That means the product gets more useful as your creative identity becomes clearer.",
    insight:
      "AUTOREELIX is a creator intelligence system, not another generic chatbot.",
  },
  {
    label: "Can you roast my content?",
    response:
      "Absolutely. A good roast should be funny, specific, and useful. SmartOrb can switch into Roast Mode to make the lesson memorable without being mean.",
    insight:
      "Roast Mode is for engagement and truth-telling, not disrespect.",
  },
  {
    label: "What content ideas should I make next?",
    response:
      "I would look at the topics that already prove your audience cares, then expand them into stronger angles, cleaner hooks, and smarter experiments. SmartOrb can help you find the next idea that fits your style instead of forcing you into someone else’s format.",
    insight:
      "The best ideas usually come from patterns you already own.",
  },
  {
    label: "What should I fix first?",
    response:
      "Start with the first thing your audience experiences. If the opening is weak, everything after it has to work harder. SmartOrb will point to the highest-leverage change first, so you are improving the part of the video that matters most.",
    insight:
      "Small fixes at the start often beat big edits later.",
  },
] as const;

const PERSONA_MODES = [
  { label: "Professional Director", tone: "Clear, structured, and strategic.", ending: "I’ll keep the feedback concise and high signal." },
  { label: "Supportive Coach", tone: "Encouraging and steady.", ending: "I’ll keep the guidance calm and actionable." },
  { label: "Creative Partner", tone: "Collaborative and idea-driven.", ending: "We’ll work through the next move together." },
  { label: "Direct Critic", tone: "Blunt when it helps.", ending: "I’ll say what is working and what is not." },
  { label: "Playful Mode", tone: "Light, smart, and a little cheeky.", ending: "I’ll keep it fun without losing the point." },
  { label: "Roast Mode", tone: "Playful, sharp, and creator-focused.", ending: "I’ll make the lesson memorable." },
] as const;

const ROAST_LINES = [
  "You do not have an idea problem. You have a posted-4-out-of-400 problem.",
  "Your hook took so long to arrive the viewer thought they were in the outro.",
  "Your video has potential. The first three seconds are just hiding from it.",
  "You asked the audience to care before giving them a reason to stay.",
  "The edit is fine. The opening is doing the creative equivalent of locking the front door.",
  "Your strongest moment is buried under too much setup.",
] as const;

const VALUE_LAYERS = [
  { title: "Video Intelligence", description: "SmartOrb identifies hook problems, pacing issues, storytelling gaps, and audience connection misses." },
  { title: "Creator Memory", description: "SmartOrb learns your goals, preferences, style, and the patterns behind your best work." },
  { title: "Creative Guidance", description: "Get ideas, strategy, improvements, and experiments that fit the way you already make content." },
  { title: "Growth Intelligence", description: "See what is working, what is weakening the video, and where the next opportunity lives." },
] as const;

const BEFORE_AFTER = {
  before: "I posted a video but do not know why it failed.",
  after: "Your viewers are leaving early because the main idea appears too late. Your strongest videos create curiosity faster. Let’s tighten the opening.",
};

const FOUNDING_BENEFITS = [
  "Early access to SmartOrb and the beta pipeline",
  "Influence product direction before launch",
  "Founder recognition inside the first creator cohort",
] as const;

export default function LandingPage() {
  const [activePromptIndex, setActivePromptIndex] = useState(0);
  const [activePersonaIndex, setActivePersonaIndex] = useState(0);
  const didTrackVisit = useRef(false);

  useEffect(() => {
    if (didTrackVisit.current) {
      return;
    }

    didTrackVisit.current = true;
    trackLandingEvent("landing_visit", { section: "hero", product: "SmartOrb" });
  }, []);

  const activePrompt = DEMO_PROMPTS[activePromptIndex];
  const activePersona = PERSONA_MODES[activePersonaIndex];

  const activeResponse = useMemo(() => {
    if (activePromptIndex === 5) {
      const roastIndex = activePersonaIndex % ROAST_LINES.length;
      return `${activePrompt.response} ${ROAST_LINES[roastIndex]} ${activePersona.ending}`;
    }

    const extraLine =
      activePromptIndex === 0
        ? "I will help you become a better creator, not just a faster one."
        : activePromptIndex === 3
          ? "Your style is part of the model, not a separate setting."
          : activePersona.ending;

    return `${activePrompt.response} ${extraLine}`;
  }, [activePersona.ending, activePersonaIndex, activePrompt.response, activePromptIndex]);

  const handleOrbClick = () => {
    const nextIndex = (activePromptIndex + 1) % DEMO_PROMPTS.length;
    setActivePromptIndex(nextIndex);
    trackLandingEvent("smartorb_click", { prompt: DEMO_PROMPTS[nextIndex].label });
  };

  const handlePromptSelect = (index: number) => {
    setActivePromptIndex(index);
    trackLandingEvent("demo_prompt_selected", { prompt: DEMO_PROMPTS[index].label });
  };

  const handlePersonaSelect = (index: number) => {
    setActivePersonaIndex(index);
    trackLandingEvent("persona_selected", { persona: PERSONA_MODES[index].label });
  };

  const scrollToApplication = () => {
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
    trackLandingEvent("cta_clicked", { location: "hero" });
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#020617] text-slate-100">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_top,rgba(217,70,239,0.20),transparent_45%),radial-gradient(circle_at_80%_18%,rgba(34,211,238,0.14),transparent_32%),radial-gradient(circle_at_20%_22%,rgba(139,92,246,0.14),transparent_28%)]" />
        <div className="absolute left-1/2 top-20 h-80 w-80 -translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <header className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/80 shadow-[0_0_40px_rgba(15,23,42,1)]">
            <Image src="/logo.png" alt="AUTOREELIX logo" fill className="object-cover" priority />
          </div>
          <div className="leading-tight">
            <div className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-slate-400">Creator Intelligence System</div>
            <div className="text-lg font-semibold tracking-tight text-slate-50">AUTOREELIX</div>
          </div>
        </div>

        <nav className="hidden items-center gap-2 lg:flex">
          <AnchorButton href="#smartorb">Meet SmartOrb</AnchorButton>
          <AnchorButton href="#demo">Experience SmartOrb</AnchorButton>
          <AnchorButton href="#apply">Apply</AnchorButton>
        </nav>

        <button
          type="button"
          onClick={scrollToApplication}
          className="rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-black shadow-[0_0_30px_rgba(236,72,153,0.5)] transition hover:brightness-110 active:scale-95"
        >
          Apply for Early Access
        </button>
      </header>

      <section id="smartorb" className="mx-auto grid w-full max-w-7xl gap-12 px-4 pb-16 pt-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-20 lg:pt-10">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-800/90 bg-slate-950/70 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.24em] text-slate-300 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)] animate-pulse" />
            Meet SmartOrb
          </div>

          <div className="space-y-5">
            <h1 className="max-w-3xl text-balance text-5xl font-semibold tracking-tight text-slate-50 sm:text-6xl lg:text-7xl">
              Your personal creator intelligence system.
            </h1>
            <p className="max-w-2xl text-pretty text-base leading-7 text-slate-300 sm:text-lg">
              AUTOREELIX is built around SmartOrb, your AI Creative Director. It learns how you create and helps you understand what is working, what is not, and what to improve next.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleOrbClick}
              className="rounded-full border border-slate-700/80 bg-slate-950/80 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-400/70 hover:bg-slate-900/90"
            >
              Click SmartOrb
            </button>
            <button
              type="button"
              onClick={scrollToApplication}
              className="rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-black shadow-[0_0_30px_rgba(236,72,153,0.45)] transition hover:brightness-110 active:scale-95"
            >
              Apply for Early Access
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <StatPill label="Founding creators" value="First 100" />
            <StatPill label="Early access" value="Beta pipeline" />
            <StatPill label="SmartOrb" value="Personalized" />
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top,rgba(217,70,239,0.16),transparent_42%),radial-gradient(circle_at_bottom,rgba(34,211,238,0.14),transparent_38%)] blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-slate-800/90 bg-slate-950/80 p-5 shadow-[0_0_60px_rgba(15,23,42,1)] backdrop-blur">
            <div className="mb-4 flex items-center justify-between text-[0.7rem] uppercase tracking-[0.22em] text-slate-400">
              <span>Click SmartOrb</span>
              <span className="rounded-full border border-slate-700/80 bg-slate-900/80 px-2.5 py-1 text-[0.6rem] text-slate-300">Live experience</span>
            </div>

            <button
              type="button"
              onClick={handleOrbClick}
              className="group relative mx-auto grid aspect-square w-full max-w-[22rem] place-items-center rounded-full border border-slate-700/80 bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.22),transparent_18%),radial-gradient(circle_at_center,rgba(217,70,239,0.30),rgba(15,23,42,0.9)_42%,rgba(2,6,23,0.96)_68%)] shadow-[0_0_80px_rgba(217,70,239,0.28)] transition duration-300 hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
              aria-label="Click SmartOrb"
            >
              <span className="absolute inset-4 rounded-full border border-slate-500/20" />
              <span className="absolute inset-10 rounded-full border border-cyan-400/10" />
              <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,transparent_42%,rgba(217,70,239,0.12)_58%,transparent_72%)] opacity-90 animate-pulse" />
              <span className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-400/20 blur-3xl" />
              <div className="relative flex flex-col items-center gap-3 px-8 text-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-cyan-300/30 blur-xl" />
                  <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-slate-200/20 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.24),rgba(34,211,238,0.10)_35%,rgba(2,6,23,0.96)_78%)] shadow-[0_0_60px_rgba(34,211,238,0.18)]">
                    <Image src="/logo.png" alt="AUTOREELIX logo inside SmartOrb" fill className="rounded-full object-cover p-5" />
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-200">SmartOrb</div>
                  <p className="mt-2 max-w-xs text-sm leading-6 text-slate-300">A personal AI Creative Director that feels intelligent, approachable, and clickable.</p>
                </div>
              </div>
              <span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full border border-slate-700/80 bg-black/65 px-3 py-1 text-[0.62rem] font-medium uppercase tracking-[0.22em] text-slate-300 shadow-[0_0_16px_rgba(34,211,238,0.15)]">Tap to explore responses</span>
            </button>

            <div className="mt-5 rounded-2xl border border-slate-800/90 bg-black/50 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-[0.65rem] font-semibold uppercase tracking-[0.26em] text-slate-400">Personality mode</div>
                  <p className="mt-1 text-sm text-slate-200">{activePersona.label}</p>
                </div>
                <div className="rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.22em] text-fuchsia-100">{activePersona.tone}</div>
              </div>

              <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {PERSONA_MODES.map((persona, index) => (
                  <button
                    key={persona.label}
                    type="button"
                    onClick={() => handlePersonaSelect(index)}
                    className={`rounded-2xl border px-3 py-2 text-left text-xs transition ${
                      index === activePersonaIndex
                        ? "border-cyan-400/70 bg-cyan-400/10 text-white"
                        : "border-slate-800 bg-slate-950/80 text-slate-300 hover:border-slate-600 hover:bg-slate-900/90"
                    }`}
                  >
                    <div className="font-semibold uppercase tracking-[0.18em]">{persona.label}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 rounded-[2rem] border border-slate-800/80 bg-slate-950/70 p-6 shadow-[0_0_50px_rgba(15,23,42,1)] lg:grid-cols-3">
          <div className="lg:col-span-1">
            <div className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-slate-400">The creator problem</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">Tools do not understand the creator.</h2>
          </div>
          <div className="grid gap-4 lg:col-span-2 md:grid-cols-3">
            <ProblemCard title="They help you make more" description="But they rarely explain why one video worked and another quietly died." />
            <ProblemCard title="They stop at output" description="Creators need judgment, pattern recognition, and creative memory, not just more drafts." />
            <ProblemCard title="They do not adapt" description="SmartOrb learns the creator over time, so the guidance gets more personal with use." />
          </div>
        </div>
      </section>

      <section id="demo" className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-slate-400">Experience SmartOrb</div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">Let SmartOrb answer like a real creative partner.</h2>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-slate-300 sm:text-right">Pick a question, switch SmartOrb’s communication style, and feel how personal creator intelligence responds.</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-slate-800/80 bg-slate-950/75 p-4 shadow-[0_0_50px_rgba(15,23,42,1)]">
            <div className="text-[0.65rem] font-semibold uppercase tracking-[0.26em] text-slate-400">SmartOrb prompts</div>
            <div className="mt-4 space-y-2">
              {DEMO_PROMPTS.map((prompt, index) => (
                <button
                  key={prompt.label}
                  type="button"
                  onClick={() => handlePromptSelect(index)}
                  className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                    index === activePromptIndex
                      ? "border-fuchsia-400/70 bg-fuchsia-500/10 text-white shadow-[0_0_30px_rgba(236,72,153,0.18)]"
                      : "border-slate-800 bg-black/35 text-slate-300 hover:border-slate-600 hover:bg-slate-900/70"
                  }`}
                >
                  <div className="text-sm font-medium">{prompt.label}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-800/80 bg-slate-950/75 p-5 shadow-[0_0_60px_rgba(15,23,42,1)]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-black/55 px-3 py-1 text-[0.65rem] uppercase tracking-[0.22em] text-slate-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                SmartOrb response
              </div>
              <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.22em] text-cyan-100">{activePrompt.label}</div>
            </div>

            <div className="mt-4 rounded-[1.5rem] border border-slate-800 bg-[radial-gradient(circle_at_top_left,rgba(217,70,239,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.10),transparent_32%),linear-gradient(145deg,rgba(15,23,42,0.9),rgba(2,6,23,0.98))] p-5">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 rounded-full border border-slate-200/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),rgba(34,211,238,0.16)_35%,rgba(2,6,23,0.95)_80%)] shadow-[0_0_35px_rgba(34,211,238,0.18)]">
                  <Image src="/logo.png" alt="SmartOrb icon" fill className="rounded-full object-cover p-2" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-50">SmartOrb</div>
                  <div className="text-xs text-slate-400">{activePersona.label} mode</div>
                </div>
              </div>

              <p className="mt-4 text-sm leading-7 text-slate-200 sm:text-[0.98rem]">{activeResponse}</p>

              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <DemoInsightCard label="What SmartOrb notices" value={activePrompt.insight} />
                <DemoInsightCard label="What you can do next" value="Ask for ideas, a tighter opening, a better structure, or a roast that makes the lesson stick." />
              </div>

              <div className="mt-4 rounded-2xl border border-slate-800 bg-black/45 p-4">
                <div className="text-[0.65rem] font-semibold uppercase tracking-[0.26em] text-slate-400">Roast style examples</div>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  {ROAST_LINES.slice(0, 4).map((line) => (
                    <div key={line} className="rounded-2xl border border-fuchsia-500/20 bg-fuchsia-500/5 px-3 py-2 text-sm leading-6 text-slate-200">
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-[1fr_1.1fr]">
          <div className="rounded-[2rem] border border-slate-800/80 bg-slate-950/75 p-6 shadow-[0_0_50px_rgba(15,23,42,1)]">
            <div className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-slate-400">Understand the value</div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-50">SmartOrb gives creators a memory, not just a reply.</h2>
            <div className="mt-5 grid gap-4">
              {VALUE_LAYERS.map((layer) => (
                <ValueCard key={layer.title} title={layer.title} description={layer.description} />
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[2rem] border border-slate-800/80 bg-slate-950/75 p-6 shadow-[0_0_50px_rgba(15,23,42,1)]">
              <div className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-slate-400">Before and after</div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <BeforeAfterCard label="Before" copy={BEFORE_AFTER.before} muted />
                <BeforeAfterCard label="After SmartOrb" copy={BEFORE_AFTER.after} highlighted />
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-800/80 bg-slate-950/75 p-6 shadow-[0_0_50px_rgba(15,23,42,1)]">
              <div className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-slate-400">Creator mythology, simplified</div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <MiniQuote title="Creator Genome" copy="Understanding creator identity and repeatable behavior." />
                <MiniQuote title="Creator Mythology" copy="Tracking how the brand story evolves as the creator grows." />
                <MiniQuote title="Creator Multiverse" copy="Exploring creative directions without losing the core voice." />
                <MiniQuote title="Reality Distortion" copy="Spotting opportunities the creator has not noticed yet." />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="apply" className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-24">
        <div className="grid gap-5 rounded-[2rem] border border-fuchsia-500/20 bg-[linear-gradient(135deg,rgba(2,6,23,0.98),rgba(15,23,42,0.94))] p-6 shadow-[0_0_70px_rgba(217,70,239,0.18)] lg:grid-cols-[0.9fr_1.1fr] lg:p-8">
          <div className="space-y-5">
            <div className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-slate-400">Founding Creator Program</div>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">Become one of the first 100 AUTOREELIX Founding Creators.</h2>
            <p className="max-w-xl text-sm leading-7 text-slate-300 sm:text-base">Early creators help shape the product, the language, and the way SmartOrb learns. This is the first cohort, not a waitlist that gets forgotten.</p>

            <div className="space-y-3 rounded-[1.5rem] border border-slate-800/80 bg-black/45 p-4">
              {FOUNDING_BENEFITS.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3 text-sm text-slate-200">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.6)]" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

          </div>

          <div className="rounded-[1.75rem] border border-slate-800/80 bg-black/45 p-5 shadow-[0_0_50px_rgba(15,23,42,1)]">
            <div className="flex flex-col gap-2">
              <div className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-slate-400">Founding Creator Application</div>
              <h3 className="text-2xl font-semibold tracking-tight text-slate-50">Tell SmartOrb how you create.</h3>
            </div>
            <div className="mt-5">
              <FoundingCreatorApplicationForm />
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-900/80 bg-black/50">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-6 text-sm text-slate-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <div className="relative h-7 w-7 overflow-hidden rounded-lg border border-slate-800 bg-slate-950/80">
              <Image src="/logo.png" alt="AUTOREELIX logo small" fill className="object-cover" />
            </div>
            <span>AUTOREELIX | SmartOrb for creators who want better decisions</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-600">
            <span>Built for humans, not algorithms</span>
            <span className="hidden h-1 w-1 rounded-full bg-slate-700 sm:inline-block" />
            <span>© {new Date().getFullYear()} AUTOREELIX</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

type AnchorButtonProps = { href: string; children: React.ReactNode };

function AnchorButton({ href, children }: AnchorButtonProps) {
  return (
    <a href={href} className="rounded-full border border-slate-800/90 bg-slate-950/70 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-300 transition hover:border-cyan-400/50 hover:text-white">
      {children}
    </a>
  );
}

type StatPillProps = { label: string; value: string };

function StatPill({ label, value }: StatPillProps) {
  return (
    <div className="rounded-2xl border border-slate-800/80 bg-slate-950/70 px-4 py-3">
      <div className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-slate-500">{label}</div>
      <div className="mt-2 text-sm font-semibold text-slate-100">{value}</div>
    </div>
  );
}

type ProblemCardProps = { title: string; description: string };

function ProblemCard({ title, description }: ProblemCardProps) {
  return (
    <div className="rounded-[1.5rem] border border-slate-800/80 bg-black/35 p-4">
      <div className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-slate-400">{title}</div>
      <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
    </div>
  );
}

type DemoInsightCardProps = { label: string; value: string };

function DemoInsightCard({ label, value }: DemoInsightCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-black/45 p-4">
      <div className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-slate-400">{label}</div>
      <p className="mt-2 text-sm leading-6 text-slate-200">{value}</p>
    </div>
  );
}

type ValueCardProps = { title: string; description: string };

function ValueCard({ title, description }: ValueCardProps) {
  return (
    <div className="rounded-[1.5rem] border border-slate-800/80 bg-black/35 p-4 transition hover:border-cyan-400/40">
      <div className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-slate-400">{title}</div>
      <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
    </div>
  );
}

type BeforeAfterCardProps = { label: string; copy: string; highlighted?: boolean; muted?: boolean };

function BeforeAfterCard({ label, copy, highlighted = false, muted = false }: BeforeAfterCardProps) {
  return (
    <div className={`rounded-[1.5rem] border p-4 ${highlighted ? "border-cyan-400/40 bg-cyan-400/10" : muted ? "border-slate-800/80 bg-black/35" : "border-slate-800/80 bg-black/35"}`}>
      <div className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-slate-400">{label}</div>
      <p className="mt-3 text-sm leading-7 text-slate-200">{copy}</p>
    </div>
  );
}

type MiniQuoteProps = { title: string; copy: string };

function MiniQuote({ title, copy }: MiniQuoteProps) {
  return (
    <div className="rounded-[1.5rem] border border-slate-800/80 bg-black/35 p-4">
      <div className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-slate-400">{title}</div>
      <p className="mt-3 text-sm leading-6 text-slate-300">{copy}</p>
    </div>
  );
}






