import { useState } from "react";
import {
  ArrowRight,
  Hexagon,
  Github,
  Check,
  Bell,
  Gauge,
  ShieldCheck,
  Zap,
  Plug,
  Cloud,
  LineChart,
  Lock,
  Plus,
  Minus,
  Linkedin,
  Youtube,
  MessageCircle,
  Twitter,
  AlertTriangle,
  Activity,
  Database,
  HardDrive,
  Network,
  RefreshCw,
  Layers,
  FileText,
  Power,
  Users,
  GraduationCap,
  Rocket,
  FlaskConical,
  Briefcase,
  Code2,
} from "lucide-react";

/* =====================================================================
   DevRails — GCP usage guardrails for builders.
   Light mode. All tokens come from src/styles.css.
===================================================================== */

const SECTION_WRAP = "mx-auto w-full max-w-[1200px] px-6";
const SECTION_PAD = "py-24 md:py-32";

function WordMark({ size = "md" }: { size?: "sm" | "md" }) {
  const text = size === "sm" ? "text-[15px]" : "text-base";
  return (
    <div className="flex items-center gap-2">
      <span className="grid h-7 w-7 place-items-center rounded-[7px] bg-flame/10">
        <Hexagon className="h-4 w-4 text-flame" strokeWidth={2.2} />
      </span>
      <span className={`${text} font-semibold tracking-tight text-ink`}>
        DevRails
      </span>
    </div>
  );
}

/* ---------- Announcement Bar ---------- */
const ANNOUNCEMENT = {
  enabled: true,
  message: "DevRails is currently in active development.",
  ctaText: "Join the early access waitlist",
  ctaHref: "#waitlist",
};

// GitHub button config.
// TODO: Point this to the public DevRails GitHub repository (or public
// roadmap repository) once it is published. While empty, the button stays
// visually present but is non-navigating — DevRails is NOT open source
// unless/until this URL points to a public, ready repository.
const GITHUB_REPO_URL = "";

const NAV_LINKS: { label: string; href: string }[] = [
  { label: "Product", href: "#product" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

function AnnouncementBar() {
  if (!ANNOUNCEMENT.enabled) return null;
  return (
    <div className="pt-3">
      <div className={SECTION_WRAP}>
        <div className="flex h-10 items-center justify-center gap-2 rounded-[12px] bg-flame px-4 text-[13px] font-medium text-white">
          <span className="hidden h-1.5 w-1.5 animate-pulse-dot rounded-full bg-white/90 sm:block" />
          <span className="truncate">{ANNOUNCEMENT.message}</span>
          <a href={ANNOUNCEMENT.ctaHref} className="font-semibold underline underline-offset-2">
            {ANNOUNCEMENT.ctaText} →
          </a>
        </div>
      </div>
    </div>
  );
}

/* ---------- Nav ---------- */
function Nav() {
  const githubHref = GITHUB_REPO_URL || "#";
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/75 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className={`${SECTION_WRAP} flex h-[72px] items-center justify-between`}>
        <a href="/" aria-label="DevRails home" className="flex items-center">
          <WordMark />
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[14px] font-medium text-ink transition-colors hover:text-flame"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={githubHref}
            {...(GITHUB_REPO_URL
              ? { target: "_blank", rel: "noreferrer noopener" }
              : { "aria-disabled": true, onClick: (e: React.MouseEvent) => e.preventDefault() })}
            className="hidden items-center gap-2 rounded-[10px] border border-border bg-white px-3 py-2 text-[13px] font-medium text-ink transition-colors hover:bg-secondary sm:flex"
          >
            <Github className="h-4 w-4" />
            <span>Star</span>
            <span className="font-mono text-ink-muted">·</span>
            <span className="font-mono">soon</span>
          </a>
          <a
            href="#waitlist"
            className="rounded-[10px] bg-ink px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-black"
          >
            Get early access
          </a>
        </div>
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section id="product" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 tech-grid tech-grid-fade" />
      <div className="pointer-events-none absolute inset-0">
        <span className="bracket-label absolute left-[6%] top-[18%]">[ GCP.USAGE ]</span>
        <span className="bracket-label absolute right-[8%] top-[14%]">[ ALWAYS FREE ]</span>
        <span className="bracket-label absolute left-[10%] bottom-[18%]">[ LOWER THRESHOLD ]</span>
        <span className="bracket-label absolute right-[10%] bottom-[22%]">[ SOFT KILLSWITCH ]</span>
        <span className="bracket-label absolute left-[44%] bottom-[8%]">[ BILLING GUARDRAIL ]</span>
        <span className="crosshair absolute left-[14%] top-[40%]" />
        <span className="crosshair absolute right-[16%] top-[58%]" />
        <span className="crosshair absolute left-[22%] bottom-[28%]" />
      </div>

      <div className={`${SECTION_WRAP} relative z-10 pt-14 pb-28 md:pt-20 md:pb-36`}>
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/70 px-3 py-1.5 text-[13px] font-medium text-ink backdrop-blur-sm">
            <span className="grid h-4 w-4 place-items-center rounded-full bg-flame text-white">
              <ShieldCheck className="h-2.5 w-2.5" />
            </span>
            GCP usage guardrails for builders
          </span>
        </div>

        <h1 className="mx-auto mt-7 max-w-[920px] text-center text-[44px] font-bold leading-[1.05] tracking-[-0.02em] text-ink sm:text-[60px] md:text-[72px]">
          Keep your GCP usage{" "}
          <span className="text-flame">on rails.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-[720px] text-center text-[18px] leading-[1.55] text-ink-soft md:text-[20px]">
          DevRails watches billable Google Cloud usage, warns you before experiments turn
          expensive, and can trigger guardrails before runaway usage becomes a surprise
          invoice — starting at{" "}
          <span className="inline-flex translate-y-[-1px] items-center gap-1.5 rounded-full border border-border bg-secondary px-2.5 py-0.5 text-[14px] font-medium text-ink">
            $1/month
          </span>
          .
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#waitlist"
            className="inline-flex items-center gap-2 rounded-[10px] bg-flame px-5 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-flame-hover shadow-flame"
          >
            Get early access <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 rounded-[10px] border border-border bg-white px-5 py-3 text-[14px] font-semibold text-ink hover:bg-secondary"
          >
            See how it works
          </a>
        </div>

        <p className="mt-4 text-center font-mono text-[12px] text-ink-muted">
          // GCP-only · $1/month · built for builders, indie projects, and small teams
        </p>

        {/* Hero product simulation */}
        <div className="relative mx-auto mt-16 max-w-[860px]">
          <HeroDashboard />
        </div>
      </div>
    </section>
  );
}

function HeroDashboard() {
  const [tab, setTab] = useState<"usage" | "alerts" | "guardrails">("usage");
  return (
    <div className="relative rounded-[22px] border border-border bg-white p-5 shadow-card">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-[7px] bg-flame/10">
            <Gauge className="h-4 w-4 text-flame" />
          </span>
          <span className="text-[14px] font-semibold text-ink">prod-builder-01</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[11px] font-medium text-ink">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-flame" />
            Active
          </span>
        </div>
        <div className="flex items-center gap-1">
          {(["usage", "alerts", "guardrails"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={
                tab === t
                  ? "rounded-[8px] border border-border bg-white px-3 py-1.5 text-[12px] font-medium capitalize text-ink shadow-soft"
                  : "rounded-[8px] px-3 py-1.5 text-[12px] font-medium capitalize text-ink-muted hover:text-ink"
              }
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 gap-4 pt-5 md:grid-cols-5">
        {/* Usage meter */}
        <div className="rounded-[14px] border border-border bg-surface p-4 md:col-span-3">
          <div className="flex items-center justify-between">
            <span className="bracket-label">[ GCP.USAGE · 7 DAY WINDOW ]</span>
            <span className="font-mono text-[11px] text-ink-muted">cloud run · requests</span>
          </div>
          <div className="mt-4">
            <div className="flex items-end justify-between">
              <div>
                <div className="text-[28px] font-bold tracking-tight text-ink">1.42M</div>
                <div className="font-mono text-[11px] text-ink-muted">of 2.00M always-free</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-[11px] text-flame">71% used</div>
                <div className="font-mono text-[11px] text-ink-muted">+18% vs last week</div>
              </div>
            </div>
            <div className="relative mt-3 h-2.5 w-full overflow-hidden rounded-full bg-secondary">
              {/* lower threshold marker at 60% */}
              <div className="absolute top-0 bottom-0 left-[60%] w-px bg-ink-muted/60" />
              {/* higher threshold marker at 90% */}
              <div className="absolute top-0 bottom-0 left-[90%] w-px bg-flame" />
              <div className="h-full w-[71%] rounded-full bg-flame" />
            </div>
            <div className="mt-2 flex justify-between font-mono text-[10px] text-ink-muted">
              <span>0</span>
              <span className="ml-[58%]">lower</span>
              <span>higher</span>
            </div>
          </div>

          {/* mini bars */}
          <div className="mt-5 flex items-end gap-1.5">
            {[18, 22, 30, 26, 38, 52, 71].map((h, i) => (
              <div key={i} className="flex-1">
                <div
                  className={`w-full rounded-t-sm ${h >= 60 ? "bg-flame" : "bg-ink/30"}`}
                  style={{ height: `${h}px` }}
                />
                <div className="mt-1 text-center font-mono text-[9px] text-ink-muted">
                  {["M", "T", "W", "T", "F", "S", "S"][i]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rules panel */}
        <div className="rounded-[14px] border border-border bg-white p-4 md:col-span-2">
          <div className="flex items-center justify-between">
            <span className="bracket-label">[ RULES · IF X → DO Y ]</span>
            <span className="font-mono text-[11px] text-flame">2 active</span>
          </div>
          <ul className="mt-3 space-y-2.5 font-mono text-[12px] text-ink-soft">
            <li className="rounded-[10px] border border-border bg-surface p-3">
              <div className="text-ink-muted">if</div>
              <div className="text-ink">cloud_run.requests &gt; lower</div>
              <div className="mt-1 text-ink-muted">→ then</div>
              <div className="text-flame">alert(email, slack)</div>
            </li>
            <li className="rounded-[10px] border border-border bg-surface p-3">
              <div className="text-ink-muted">if</div>
              <div className="text-ink">cloud_run.requests &gt; higher</div>
              <div className="mt-1 text-ink-muted">→ then</div>
              <div className="text-flame">quota.set_zero("run.googleapis.com")</div>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4 font-mono text-[11px] text-ink-muted">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded bg-secondary px-1.5 py-0.5 text-ink">[ CLOUD RUN ]</span>
          <span className="rounded bg-secondary px-1.5 py-0.5 text-ink">[ BIGQUERY ]</span>
          <span className="rounded bg-secondary px-1.5 py-0.5 text-ink">[ EGRESS ]</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-flame" />
          watching 5 projects
        </div>
      </div>
    </div>
  );
}

/* ---------- Section header ---------- */
function SectionHeader({
  index,
  eyebrow,
  title,
  accent,
  subtitle,
}: {
  index?: string;
  eyebrow: string;
  title: string;
  accent?: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-[820px] text-center">
      <div className="font-mono text-[12px] uppercase tracking-[0.08em] text-ink-muted">
        {index ? `[ ${index} ] · ` : ""}{eyebrow}
      </div>
      <h2 className="mt-5 text-[36px] font-bold leading-[1.1] tracking-[-0.02em] text-ink md:text-[52px]">
        {title}{" "}
        {accent && <span className="text-flame">{accent}</span>}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-5 max-w-[680px] text-[17px] leading-[1.55] text-ink-soft md:text-[18px]">
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ---------- 03 Trust / Credibility ---------- */
function TrustCredibility() {
  const cards = [
    {
      icon: <Cloud className="h-4 w-4" />,
      title: "GCP-native focus",
      body: "DevRails is built around Google Cloud usage patterns first. No multi-cloud bloat, no enterprise maze.",
    },
    {
      icon: <Gauge className="h-4 w-4" />,
      title: "Usage-first guardrails",
      body: "Budgets tell you what you spent. DevRails watches the usage signals that create the bill.",
    },
    {
      icon: <ShieldCheck className="h-4 w-4" />,
      title: "Builder-priced",
      body: "$1/month or $10/year. No free tier, no fake complexity, no enterprise tax.",
    },
    {
      icon: <Layers className="h-4 w-4" />,
      title: "Designed to stay lightweight",
      body: "Short retention, compact reporting, and practical dashboards built to avoid turning monitoring into another cost center.",
    },
  ];
  return (
    <section className={`${SECTION_PAD} border-y border-border bg-surface`}>
      <div className={SECTION_WRAP}>
        <SectionHeader
          eyebrow="// BUILT FOR BUILDERS"
          title="Built for builders who"
          accent="ship on GCP."
          subtitle="DevRails starts small on purpose: usage monitoring, practical alerts, simple guardrails, and pricing that does not punish side projects."
        />
        <div className="mx-auto mt-14 grid max-w-[1100px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <div
              key={c.title}
              className="glass rounded-[18px] p-6 shadow-soft transition-colors hover:border-ink/15"
            >
              <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-flame/10 text-flame">
                {c.icon}
              </span>
              <h3 className="mt-5 text-[16px] font-semibold tracking-tight text-ink">{c.title}</h3>
              <p className="mt-2 text-[14px] leading-[1.55] text-ink-soft">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 04 Problem ---------- */
function Problem() {
  const cards = [
    {
      icon: <Network className="h-4 w-4" />,
      tag: "EGRESS",
      title: "The egress explosion",
      body: "Outbound traffic from downloads, streaming, or unintended data movement can quietly become the hidden GCP killer.",
    },
    {
      icon: <RefreshCw className="h-4 w-4" />,
      tag: "RECURSION",
      title: "The recursive loop",
      body: "A Cloud Function or Cloud Run service triggers itself until usage runs away.",
    },
    {
      icon: <FileText className="h-4 w-4" />,
      tag: "LOGS",
      title: "The log bloat",
      body: "DEBUG logs stay on, storage grows, and the bill follows.",
    },
    {
      icon: <Database className="h-4 w-4" />,
      tag: "BIGQUERY",
      title: "The BigQuery one-shot",
      body: "One unoptimized query scans far more data than expected.",
    },
    {
      icon: <HardDrive className="h-4 w-4" />,
      tag: "ORPHANED",
      title: "The orphaned resource",
      body: "Static IPs, disks, or other resources keep billing after the experiment is already dead.",
    },
    {
      icon: <Activity className="h-4 w-4" />,
      tag: "READS",
      title: "The read storm",
      body: "A frontend bug creates excessive reads per session before anyone notices.",
    },
  ];
  return (
    <section className={SECTION_PAD}>
      <div className={SECTION_WRAP}>
        <SectionHeader
          eyebrow="// THE PROBLEM"
          title="Cloud bills do not explode all at once."
          accent="Usage does."
          subtitle="Most surprise GCP bills start as small usage mistakes: a recursive function, a noisy log setting, an oversized query, or outbound traffic nobody noticed."
        />
        <div className="mx-auto mt-14 grid max-w-[1100px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <div key={c.title} className="rounded-[18px] border border-border bg-white p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-secondary text-ink">
                  {c.icon}
                </span>
                <span className="bracket-label">[ {c.tag} ]</span>
              </div>
              <h3 className="mt-5 text-[17px] font-semibold tracking-tight text-ink">{c.title}</h3>
              <p className="mt-2 text-[14px] leading-[1.55] text-ink-soft">{c.body}</p>
              <div className="mt-4 flex items-center gap-2 font-mono text-[11px] text-ink-muted">
                <span>root cause</span>
                <ArrowRight className="h-3 w-3" />
                <span className="text-flame">bill risk</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 05 How it works ---------- */
function HowItWorks() {
  const steps = [
    {
      n: "01",
      icon: <Plug className="h-4 w-4" />,
      title: "Connect your GCP project",
      body: "Add a GCP environment you own and let DevRails watch the billable usage signals that matter.",
      tag: "[ CONNECT ]",
    },
    {
      n: "02",
      icon: <Gauge className="h-4 w-4" />,
      title: "Set your usage rails",
      body: "Choose lower and higher thresholds based on Always Free limits or your own safe operating range.",
      tag: "[ LOWER · HIGHER ]",
    },
    {
      n: "03",
      icon: <Bell className="h-4 w-4" />,
      title: "Get warned early",
      body: "When usage crosses the lower threshold, DevRails sends a configurable alert so you can act before panic mode.",
      tag: "[ ALERT ]",
    },
    {
      n: "04",
      icon: <ShieldCheck className="h-4 w-4" />,
      title: "Trigger guardrails",
      body: "When usage crosses the higher threshold, DevRails can alert again, set selected API quotas to zero, or disable billing if you explicitly enable hard protection.",
      tag: "[ QUOTA.ZERO ]",
    },
    {
      n: "05",
      icon: <LineChart className="h-4 w-4" />,
      title: "Review the situation",
      body: "Use short-window dashboards and situation reports to understand what happened without storing unnecessary data forever.",
      tag: "[ 7 DAY WINDOW ]",
    },
  ];
  return (
    <section id="how-it-works" className={`${SECTION_PAD} border-y border-border bg-surface`}>
      <div className={SECTION_WRAP}>
        <SectionHeader
          eyebrow="// HOW IT WORKS"
          title="If usage hits X,"
          accent="DevRails does Y."
          subtitle="Set your rails once. DevRails watches the usage signals and reacts before your cloud experiment becomes an expensive lesson."
        />

        {/* Threshold legend */}
        <div className="mx-auto mt-12 flex max-w-[900px] flex-wrap items-center justify-center gap-3 font-mono text-[11px] text-ink-muted">
          <span className="rounded-full bg-white border border-border px-2.5 py-1">normal</span>
          <ArrowRight className="h-3 w-3" />
          <span className="rounded-full bg-white border border-border px-2.5 py-1">lower threshold</span>
          <ArrowRight className="h-3 w-3" />
          <span className="rounded-full bg-white border border-border px-2.5 py-1 text-ink">alert</span>
          <ArrowRight className="h-3 w-3" />
          <span className="rounded-full bg-white border border-border px-2.5 py-1">higher threshold</span>
          <ArrowRight className="h-3 w-3" />
          <span className="rounded-full bg-flame px-2.5 py-1 text-white">guardrail action</span>
        </div>

        <div className="mx-auto mt-10 grid max-w-[1100px] grid-cols-1 gap-4 md:grid-cols-5">
          {steps.map((s) => (
            <div
              key={s.n}
              className="relative rounded-[18px] border border-border bg-white p-5 shadow-soft"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[12px] text-ink-muted">{s.n}</span>
                <span className="grid h-8 w-8 place-items-center rounded-[8px] bg-flame/10 text-flame">
                  {s.icon}
                </span>
              </div>
              <h3 className="mt-4 text-[15px] font-semibold tracking-tight text-ink">{s.title}</h3>
              <p className="mt-2 text-[13.5px] leading-[1.55] text-ink-soft">{s.body}</p>
              <div className="mt-4 bracket-label">{s.tag}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 06 Features ---------- */
function Features() {
  const buckets = [
    {
      title: "Usage Clones",
      desc: "Cloud Run, Cloud Functions, App Engine, and Pub/Sub metrics that behave like count-based usage signals.",
      tag: "[ COUNTS ]",
    },
    {
      title: "Usage Translators",
      desc: "Cloud Storage, BigQuery, Compute Engine, and Network metrics that require translating bytes, seconds, or utilization into risk.",
      tag: "[ BYTES · SECONDS ]",
    },
    {
      title: "Deep Intel",
      desc: "Cloud Asset, Quotas, Billing, and IAM insights for future optimization reports.",
      tag: "[ ROADMAP ]",
    },
  ];

  const caps = [
    { icon: <Activity className="h-4 w-4" />, title: "Near real-time usage monitoring", body: "Put a meter on GCP usage signals that can turn into billable spend." },
    { icon: <Bell className="h-4 w-4" />, title: "Lower-threshold alerts", body: "Get notified when usage starts moving beyond the safe range." },
    { icon: <Zap className="h-4 w-4" />, title: "Higher-threshold actions", body: "Choose what happens next: alert, soft killswitch, or hard killswitch." },
    { icon: <ShieldCheck className="h-4 w-4" />, title: "Soft killswitch", body: "Set selected API quotas to zero to stop runaway usage without immediately disabling the whole billing setup." },
    { icon: <Power className="h-4 w-4" />, title: "Hard killswitch", body: "Disable billing only when explicitly enabled, with a clear warning before activation." },
    { icon: <LineChart className="h-4 w-4" />, title: "7-day dashboard", body: "See recent usage trends without turning DevRails into another long-term data warehouse." },
    { icon: <Layers className="h-4 w-4" />, title: "Multiple environments", body: "Monitor up to 5 GCP environments/projects on the base plan, with simple expansion pricing." },
    { icon: <FileText className="h-4 w-4" />, title: "Situation reports", body: "Receive periodic summaries so you can understand usage patterns while keeping data retention lightweight." },
    { icon: <Cloud className="h-4 w-4" />, title: "GCP coverage roadmap", body: "Start with usage metrics, then expand into deeper GCP intelligence where it creates clear value." },
  ];

  return (
    <section id="features" className={SECTION_PAD}>
      <div className={SECTION_WRAP}>
        <SectionHeader
          eyebrow="// FEATURES"
          title="Small enough for $1."
          accent="Useful enough to matter."
          subtitle="DevRails bundles the practical guardrails builders need first, then expands across GCP modules as the product matures."
        />

        {/* Buckets */}
        <div className="mx-auto mt-12 grid max-w-[1100px] grid-cols-1 gap-4 md:grid-cols-3">
          {buckets.map((b) => (
            <div key={b.title} className="rounded-[18px] border border-border bg-surface p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-[15px] font-semibold text-ink">{b.title}</h3>
                <span className="bracket-label">{b.tag}</span>
              </div>
              <p className="mt-2 text-[13.5px] leading-[1.55] text-ink-soft">{b.desc}</p>
            </div>
          ))}
        </div>

        {/* Capabilities */}
        <div className="mx-auto mt-8 grid max-w-[1100px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {caps.map((c) => (
            <div key={c.title} className="rounded-[18px] border border-border bg-white p-6 shadow-soft">
              <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-flame/10 text-flame">
                {c.icon}
              </span>
              <h3 className="mt-4 text-[16px] font-semibold tracking-tight text-ink">{c.title}</h3>
              <p className="mt-2 text-[14px] leading-[1.55] text-ink-soft">{c.body}</p>
            </div>
          ))}
        </div>

        {/* Killswitch mock */}
        <div className="mx-auto mt-12 grid max-w-[1100px] grid-cols-1 gap-5 md:grid-cols-2">
          <div className="rounded-[18px] border border-border bg-white p-6 shadow-soft">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-flame" />
                <span className="text-[15px] font-semibold text-ink">Soft killswitch</span>
              </div>
              <span className="bracket-label">[ QUOTA.ZERO ]</span>
            </div>
            <p className="mt-2 text-[13.5px] text-ink-soft">
              Set selected API quotas to zero to stop runaway usage. Reversible.
            </p>
            <div className="mt-4 flex items-center justify-between rounded-[12px] border border-border bg-surface p-3 font-mono text-[12px] text-ink">
              <span>run.googleapis.com</span>
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-flame" />
                armed
              </span>
            </div>
          </div>

          <div className="rounded-[18px] border border-border bg-white p-6 shadow-soft">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Power className="h-4 w-4 text-flame" />
                <span className="text-[15px] font-semibold text-ink">Hard killswitch</span>
              </div>
              <span className="bracket-label">[ BILLING.OFF ]</span>
            </div>
            <p className="mt-2 text-[13.5px] text-ink-soft">
              Disable billing entirely. Requires explicit opt-in.
            </p>
            <div className="mt-4 flex items-start gap-2 rounded-[12px] border border-flame/30 bg-flame/5 p-3 text-[12px] text-ink">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-flame" />
              <span>
                Disruptive action. Will detach the billing account from the project.
                Confirmation required.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 07 Use cases ---------- */
function UseCases() {
  const cases = [
    { icon: <Code2 className="h-4 w-4" />, title: "Solo builders", body: "Keep experiments safe while you test ideas on GCP." },
    { icon: <Rocket className="h-4 w-4" />, title: "Indie hackers", body: "Stay lean while validating a product before revenue catches up." },
    { icon: <GraduationCap className="h-4 w-4" />, title: "Students", body: "Learn cloud infrastructure without turning practice projects into accidental invoices." },
    { icon: <FlaskConical className="h-4 w-4" />, title: "Prototype teams", body: "Give small teams a safety layer while they move fast." },
    { icon: <Briefcase className="h-4 w-4" />, title: "Small startups", body: "Keep early cloud usage disciplined before formal FinOps becomes necessary." },
    { icon: <Cloud className="h-4 w-4" />, title: "GCP experimenters", body: "Try Cloud Run, Functions, BigQuery, Pub/Sub, and Storage with clearer guardrails." },
  ];
  return (
    <section className={`${SECTION_PAD} border-y border-border bg-surface`}>
      <div className={SECTION_WRAP}>
        <SectionHeader
          eyebrow="// USE CASES"
          title="Guardrails for the ways"
          accent="GCP actually gets expensive."
          subtitle="DevRails focuses on the usage patterns that hurt builders most: runaway loops, egress, bloat, oversized queries, and forgotten resources."
        />
        <div className="mx-auto mt-14 grid max-w-[1100px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => (
            <div key={c.title} className="rounded-[18px] border border-border bg-white p-6 shadow-soft">
              <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-flame/10 text-flame">
                {c.icon}
              </span>
              <h3 className="mt-4 text-[16px] font-semibold tracking-tight text-ink">{c.title}</h3>
              <p className="mt-2 text-[14px] leading-[1.55] text-ink-soft">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 08 Pricing ---------- */
function Pricing() {
  const included = [
    "Up to 5 monitored GCP environments/projects",
    "Usage monitoring for supported GCP services",
    "Lower-threshold alerts",
    "Higher-threshold guardrail actions",
    "7-day usage dashboard",
    "Periodic situation reports",
    "Access to early GCP coverage expansions",
  ];
  return (
    <section id="pricing" className={SECTION_PAD}>
      <div className={SECTION_WRAP}>
        <SectionHeader
          eyebrow="// PRICING"
          title="One dollar."
          accent="Plain and simple."
          subtitle="DevRails is priced for builders who need a practical GCP safety layer, not another expensive cloud platform."
        />

        <div className="mx-auto mt-14 max-w-[560px]">
          <div className="relative rounded-[22px] border border-ink bg-ink p-7 text-white shadow-card">
            <span className="absolute -top-3 right-5 rounded-full bg-flame px-3 py-1 text-[11px] font-semibold tracking-wide text-white">
              BUILDER PLAN
            </span>
            <div className="flex items-center justify-between">
              <h3 className="text-[20px] font-semibold">Builder</h3>
              <span className="font-mono text-[12px] text-white/60">[ 5 PROJECTS ]</span>
            </div>
            <p className="mt-1 text-[14px] text-white/70">A practical GCP safety layer.</p>
            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-[48px] font-bold tracking-tight">$1</span>
              <span className="text-[14px] text-white/60">/ month</span>
              <span className="ml-2 rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-medium text-white/80">
                or $10/year
              </span>
            </div>
            <ul className="mt-6 space-y-2.5 text-[14px] text-white/85">
              {included.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-flame" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-[12px] border border-white/15 bg-white/5 p-3 text-[13px] text-white/80">
              Need more? Add <span className="text-white">5 more environments</span> for{" "}
              <span className="text-flame">+$1/month</span>.
            </div>
            <a
              href="#waitlist"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-[10px] bg-flame px-4 py-2.5 text-[14px] font-semibold text-white hover:bg-flame-hover shadow-flame"
            >
              Get early access <ArrowRight className="h-4 w-4" />
            </a>
            <p className="mt-3 text-center font-mono text-[11px] text-white/50">
              // no free tier · no enterprise tax · just a tiny tool for avoiding not-so-tiny mistakes
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 09 Coll-Con context ---------- */
function CollCon() {
  return (
    <section className={`${SECTION_PAD} border-y border-border bg-surface`}>
      <div className={SECTION_WRAP}>
        <div className="mx-auto max-w-[820px] text-center">
          <div className="font-mono text-[12px] uppercase tracking-[0.08em] text-ink-muted">
            // FROM COLL-CON
          </div>
          <h2 className="mt-5 text-[32px] font-bold leading-[1.15] tracking-[-0.02em] text-ink md:text-[44px]">
            DevRails is the first rail in the{" "}
            <span className="text-flame">Coll-Con ecosystem.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[640px] text-[16px] leading-[1.6] text-ink-soft">
            Coll-Con is the broader product ecosystem for builder-focused tools. DevRails
            comes first because cloud usage discipline is the foundation: before builders
            scale, they need to know which usage is productive and which usage is just
            leaking money.
          </p>
          <p className="mx-auto mt-4 max-w-[640px] text-[15px] leading-[1.6] text-ink-muted">
            Future Coll-Con products may help builders grow GCP usage. DevRails makes sure
            that growth starts from a safe, intentional baseline.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- 10 FAQ ---------- */
const FAQS: { q: string; a: string }[] = [
  { q: "What is DevRails?", a: "DevRails is a lightweight GCP-only FinOps guardrail tool. It monitors billable usage signals, sends alerts, and can trigger configurable actions when usage crosses defined thresholds." },
  { q: "Is DevRails only for Google Cloud?", a: "Yes. DevRails is focused on Google Cloud Platform first. There are no current plans to support AWS or Azure." },
  { q: "Is DevRails just a budget alert tool?", a: "No. Budget alerts tell you about money. DevRails focuses on usage signals that create the bill, such as requests, bytes, scanned data, utilization, and resource states." },
  { q: "Can DevRails help me stay inside GCP Always Free?", a: "That is one of the core use cases. DevRails helps you define safe usage rails around Always Free limits or your own custom thresholds." },
  { q: "Are you encouraging people to stay on free tiers forever?", a: "No. DevRails helps builders spend intentionally. The goal is to avoid waste and surprise bills, then grow cloud usage when that usage creates real value." },
  { q: "What happens when usage crosses a threshold?", a: "At a lower threshold, DevRails can send alerts. At a higher threshold, it can send another alert, trigger a soft killswitch by setting selected quotas to zero, or trigger a hard killswitch by disabling billing if that option is explicitly enabled." },
  { q: "What is the difference between soft and hard killswitch?", a: "A soft killswitch limits selected services by setting quotas to zero. A hard killswitch disables billing and is more disruptive, so it should only be enabled with a clear warning." },
  { q: "How many GCP environments can I monitor?", a: "The base plan includes up to 5 monitored GCP environments or projects. Each additional block of 5 environments costs +$1/month." },
  { q: "How much does DevRails cost?", a: "DevRails costs $1/month or $10/year. There is no free tier." },
  { q: "Does DevRails store my cloud usage data?", a: "DevRails is designed to stay lightweight. The dashboard focuses on a short recent window, and situation reports are designed to reduce unnecessary long-term data retention." },
  { q: "When does DevRails launch?", a: "DevRails is currently in active development. Join the early access waitlist to follow progress and get notified when access opens." },
  { q: "Is my cloud data safe?", a: "DevRails should request only the permissions needed to monitor usage and apply configured guardrails. Harder actions, such as disabling billing, should always require explicit user configuration." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className={SECTION_PAD}>
      <div className={SECTION_WRAP}>
        <SectionHeader
          eyebrow="// FAQ"
          title="Questions,"
          accent="answered."
          subtitle="Everything you need to know before you trust DevRails with your GCP usage."
        />
        <div className="mx-auto mt-12 max-w-[800px] divide-y divide-border border-y border-border">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-[17px] font-semibold text-ink md:text-[18px]">
                    {item.q}
                  </span>
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border text-ink">
                    {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                  </span>
                </button>
                {isOpen && (
                  <div className="pb-6 pr-10 text-[15px] leading-[1.65] text-ink-soft">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- 11 Final CTA ---------- */
function FinalCTA() {
  return (
    <section id="waitlist" className="relative overflow-hidden border-y border-border bg-surface">
      <div className="pointer-events-none absolute inset-0 tech-grid tech-grid-fade opacity-60" />
      <div className="pointer-events-none absolute inset-0">
        <span className="bracket-label absolute left-[8%] top-[24%]">[ USAGE WATCHED ]</span>
        <span className="bracket-label absolute right-[10%] top-[18%]">[ ALERT READY ]</span>
        <span className="bracket-label absolute left-[18%] bottom-[22%]">[ GUARDRAIL ACTIVE ]</span>
        <span className="bracket-label absolute right-[14%] bottom-[28%]">[ $1/MONTH ]</span>
        <span className="crosshair absolute left-[26%] top-[44%]" />
        <span className="crosshair absolute right-[24%] bottom-[40%]" />
      </div>
      <div className={`${SECTION_WRAP} relative z-10 py-24 text-center md:py-32`}>
        <h2 className="mx-auto mt-2 max-w-[760px] text-[40px] font-bold leading-[1.1] tracking-[-0.02em] text-ink md:text-[56px]">
          Build on GCP without{" "}
          <span className="text-flame">bill anxiety.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-[600px] text-[17px] text-ink-soft">
          DevRails helps you watch usage, catch runaway patterns, and keep experiments on
          rails — for $1/month.
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="mx-auto mt-8 flex w-full max-w-[480px] items-center gap-2 rounded-[14px] border border-border bg-white p-2 shadow-soft"
        >
          <input
            type="email"
            required
            placeholder="you@yourstartup.dev"
            className="h-11 flex-1 bg-transparent px-3 text-[15px] text-ink placeholder:text-ink-muted focus:outline-none"
          />
          <button
            type="submit"
            className="inline-flex h-11 items-center gap-2 rounded-[10px] bg-flame px-4 text-[14px] font-semibold text-white hover:bg-flame-hover shadow-flame"
          >
            Get early access <ArrowRight className="h-4 w-4" />
          </button>
        </form>
        <p className="mt-4 font-mono text-[12px] text-ink-muted">
          // founding builder access opens soon
        </p>
      </div>
    </section>
  );
}

/* ---------- 12 Footer ---------- */
type FooterLink = { label: string; href?: string };

function Footer() {
  const product: FooterLink[] = [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
    { label: "Waitlist", href: "#waitlist" },
  ];
  const resources: FooterLink[] = [
    { label: "GitHub soon" },
    { label: "Docs soon" },
    { label: "Changelog soon" },
  ];
  const company: FooterLink[] = [
    { label: "Coll-Con" },
    { label: "Contact" },
    { label: "Status soon" },
  ];
  const legal: FooterLink[] = [
    { label: "Privacy Policy soon" },
    { label: "Terms soon" },
  ];

  return (
    <footer className="border-t border-border bg-background">
      <div className={`${SECTION_WRAP} pt-16 pb-12`}>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <WordMark />
            <p className="mt-3 text-[14px] text-ink-soft">A Coll-Con product.</p>
          </div>

          <FooterCol heading="Product" links={product} />
          <FooterCol heading="Resources" links={resources} />
          <FooterCol heading="Company" links={company} />
        </div>

        <div className="mt-10">
          <FooterCol heading="Legal" links={legal} inline />
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 md:flex-row md:items-center">
          <span className="text-[13px] text-ink-muted">
            © 2026 Coll-Con. DevRails is currently in active development.
          </span>
          <div className="flex items-center gap-3">
            <SocialIcon label="GitHub"><Github className="h-4 w-4" /></SocialIcon>
            <SocialIcon label="X / Twitter"><Twitter className="h-4 w-4" /></SocialIcon>
            <SocialIcon label="LinkedIn"><Linkedin className="h-4 w-4" /></SocialIcon>
            <SocialIcon label="YouTube"><Youtube className="h-4 w-4" /></SocialIcon>
            <SocialIcon label="Discord"><MessageCircle className="h-4 w-4" /></SocialIcon>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  heading,
  links,
  inline,
}: {
  heading: string;
  links: FooterLink[];
  inline?: boolean;
}) {
  return (
    <div>
      <h4 className="font-mono text-[12px] font-semibold uppercase tracking-[0.08em] text-ink-muted">
        {heading}
      </h4>
      <ul className={inline ? "mt-3 flex flex-wrap gap-x-5 gap-y-2" : "mt-4 space-y-2.5"}>
        {links.map((l) => (
          <li key={l.label}>
            {l.href ? (
              <a href={l.href} className="text-[14px] text-ink-soft transition-colors hover:text-flame">
                {l.label}
              </a>
            ) : (
              <span className="cursor-default text-[14px] text-ink-muted">{l.label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="grid h-9 w-9 place-items-center rounded-full border border-border bg-white text-ink transition-colors hover:border-flame hover:text-flame"
    >
      {children}
    </a>
  );
}

/* ---------- Page ---------- */
export function DevRailsLanding() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <AnnouncementBar />
      <Nav />
      <Hero />
      <TrustCredibility />
      <Problem />
      <HowItWorks />
      <Features />
      <UseCases />
      <Pricing />
      <CollCon />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
