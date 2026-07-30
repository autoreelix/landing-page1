import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type LegalPageShellProps = {
  title: string;
  description: string;
  lastUpdated: string;
  children: ReactNode;
};

export default function LegalPageShell({
  title,
  description,
  lastUpdated,
  children,
}: LegalPageShellProps) {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#020617] text-slate-100">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_top,rgba(217,70,239,0.20),transparent_45%),radial-gradient(circle_at_80%_18%,rgba(34,211,238,0.14),transparent_32%),radial-gradient(circle_at_20%_22%,rgba(139,92,246,0.14),transparent_28%)]" />
        <div className="absolute left-1/2 top-20 h-80 w-80 -translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <header className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-6 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 transition hover:opacity-90">
          <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/80 shadow-[0_0_40px_rgba(15,23,42,1)]">
            <Image src="/Copilot_20260409_112446.png" alt="AUTOREELIX logo" fill className="object-cover" priority />
          </div>
          <div className="leading-tight">
            <div className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-slate-400">
              Creator Intelligence System
            </div>
            <div className="text-lg font-semibold tracking-tight text-slate-50">AUTOREELIX</div>
          </div>
        </Link>

        <nav className="flex items-center gap-2">
          <Link
            href="/privacy"
            className="rounded-full border border-slate-800/90 bg-slate-950/70 px-3 py-2 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-slate-300 transition hover:border-cyan-400/50 hover:text-white sm:px-4 sm:text-xs sm:tracking-[0.2em]"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="rounded-full border border-slate-800/90 bg-slate-950/70 px-3 py-2 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-slate-300 transition hover:border-cyan-400/50 hover:text-white sm:px-4 sm:text-xs sm:tracking-[0.2em]"
          >
            Terms
          </Link>
          <Link
            href="/"
            className="rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400 px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-black shadow-[0_0_30px_rgba(236,72,153,0.5)] transition hover:brightness-110 active:scale-95 sm:px-4 sm:text-[0.7rem] sm:tracking-[0.22em]"
          >
            Home
          </Link>
        </nav>
      </header>

      <section className="mx-auto w-full max-w-3xl px-4 pb-16 pt-4 sm:px-6 lg:px-8 lg:pb-20 lg:pt-10">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-800/90 bg-slate-950/70 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.24em] text-slate-300 backdrop-blur">
            Legal
          </div>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl">
            {title}
          </h1>
          <p className="max-w-2xl text-pretty text-base leading-7 text-slate-300">{description}</p>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-slate-500">
            Last updated: {lastUpdated}
          </p>
        </div>

        <article className="mt-10 space-y-8 rounded-[2rem] border border-slate-800/80 bg-slate-950/75 p-6 shadow-[0_0_50px_rgba(15,23,42,1)] sm:p-8">
          {children}
        </article>
      </section>

      <footer className="border-t border-slate-900/80 bg-black/50">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-6 text-sm text-slate-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <div className="relative h-7 w-7 overflow-hidden rounded-lg border border-slate-800 bg-slate-950/80">
              <Image src="/Copilot_20260409_112446.png" alt="AUTOREELIX logo small" fill className="object-cover" />
            </div>
            <span>AUTOREELIX | SmartOrb for creators who want better decisions</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-600">
            <Link href="/privacy" className="transition hover:text-slate-300">
              Privacy
            </Link>
            <span className="hidden h-1 w-1 rounded-full bg-slate-700 sm:inline-block" />
            <Link href="/terms" className="transition hover:text-slate-300">
              Terms
            </Link>
            <span className="hidden h-1 w-1 rounded-full bg-slate-700 sm:inline-block" />
            <span>© {new Date().getFullYear()} AUTOREELIX</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

type LegalSectionProps = {
  title: string;
  children: ReactNode;
};

export function LegalSection({ title, children }: LegalSectionProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold tracking-tight text-slate-50">{title}</h2>
      <div className="space-y-3 text-sm leading-7 text-slate-300">{children}</div>
    </section>
  );
}
