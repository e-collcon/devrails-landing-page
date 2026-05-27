import { useState } from "react";
import {
  Flame,
  ArrowRight,
  Github,
  ChevronDown,
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
  Copy,
} from "lucide-react";

/* =====================================================================
   DevRails — Firecrawl-inspired, developer-first coming-soon landing.
   Light mode. All tokens come from src/styles.css.
===================================================================== */

const SECTION_WRAP = "mx-auto w-full max-w-[1200px] px-6";
const SECTION_PAD = "py-24 md:py-32";

function WordMark({ size = "md" }: { size?: "sm" | "md" }) {
  const text = size === "sm" ? "text-[15px]" : "text-base";
  return (
    <div className="flex items-center gap-2">
      <span className="grid h-7 w-7 place-items-center rounded-[7px] bg-flame/10">
        <Flame className="h-4 w-4 text-flame" strokeWidth={2.2} />
      </span>
      <span className={`${text} font-semibold tracking-tight text-ink`}>
        DevRails
      </span>
    </div>
  );
}

/* ---------- Announcement Bar ---------- */
function AnnouncementBar() {
  return (
    <div className="pt-3">
      <div className={SECTION_WRAP}>
        <div className="flex h-10 items-center justify-center gap-2 rounded-[12px] bg-flame px-4 text-[13px] font-medium text-white">
          <span className="hidden h-1.5 w-1.5 animate-pulse-dot rounded-full bg-white/90 sm:block" />
          <span className="truncate">
            DevRails is launching soon. Lock in <strong>$1/month</strong> for life as a founding builder.
          </span>
          <a href="#waitlist" className="font-semibold underline underline-offset-2">
            Join the waitlist →
          </a>
        </div>
      </div>
    </div>
  );
}

/* ---------- Nav ---------- */
function Nav() {
  const links = ["Product", "How it works", "Pricing", "FAQ", "Coll-Con"];
  return (
    <header className="relative z-20">
      <div className={`${SECTION_WRAP} flex h-[80px] items-center justify-between`}>
        <a href="/" aria-label="DevRails home" className="flex items-center">
          <WordMark />
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(/\s/g, "-")}`}
              className="text-[14px] font-medium text-ink transition-colors hover:text-flame"
            >
              {l}
            </a>
          ))}
          <a
            href="#docs"
            className="flex items-center gap-1 text-[14px] font-medium text-ink transition-colors hover:text-flame"
          >
            Docs <ChevronDown className="h-3.5 w-3.5" />
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com"
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
    <section className="relative overflow-hidden">
      {/* Grid background */}
      <div className="pointer-events-none absolute inset-0 tech-grid tech-grid-fade" />
      {/* Decorative labels */}
      <div className="pointer-events-none absolute inset-0">
        <span className="bracket-label absolute left-[6%] top-[18%]">[ 200 OK ]</span>
        <span className="bracket-label absolute right-[8%] top-[14%]">[ .JSON ]</span>
        <span className="bracket-label absolute left-[10%] bottom-[18%]">[ GCP.BUDGET ]</span>
        <span className="bracket-label absolute right-[10%] bottom-[22%]">[ $0.00 / $1.00 ]</span>
        <span className="crosshair absolute left-[14%] top-[40%]" />
        <span className="crosshair absolute right-[16%] top-[58%]" />
        <span className="crosshair absolute left-[22%] bottom-[28%]" />
      </div>

      <div className={`${SECTION_WRAP} relative z-10 pt-14 pb-28 md:pt-20 md:pb-36`}>
        {/* Eyebrow pill */}
        <div className="flex justify-center">
          <a
            href="#waitlist"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/70 px-3 py-1.5 text-[13px] font-medium text-ink backdrop-blur-sm transition-colors hover:bg-secondary"
          >
            <span className="grid h-4 w-4 place-items-center rounded-full bg-ink text-white">
              <ArrowRight className="h-2.5 w-2.5" />
            </span>
            Founding builders — $1/month for life
          </a>
        </div>

        {/* H1 */}
        <h1 className="mx-auto mt-7 max-w-[920px] text-center text-[44px] font-bold leading-[1.05] tracking-[-0.02em] text-ink sm:text-[60px] md:text-[72px]">
          Stay in the GCP free tier.{" "}
          <span className="text-flame">Or under a dollar.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-[680px] text-center text-[18px] leading-[1.55] text-ink-soft md:text-[20px]">
          DevRails is lightweight FinOps for Google Cloud. Watch every project, kill
          runaway spend, and ship without bill anxiety —{" "}
          <span className="inline-flex translate-y-[-1px] items-center gap-1.5 rounded-full border border-border bg-secondary px-2.5 py-0.5 text-[14px] font-medium text-ink">
            for $1/month
          </span>
          .
        </p>

        {/* Waitlist demo card */}
        <div className="relative mx-auto mt-14 max-w-[720px]">
          {/* Faint browser wireframe behind */}
          <BrowserWireframe />

          <div className="relative rounded-[22px] border border-border bg-white p-3 shadow-card">
            {/* Mode tabs */}
            <div className="flex items-center gap-1 px-2 pb-3 pt-1">
              <ModeTab label="Budget" active />
              <ModeTab label="Alerts" />
              <ModeTab label="Projects" />
              <ModeTab label="Rules" />
              <div className="ml-auto bracket-label hidden sm:block">[ FREE-TIER MODE ]</div>
            </div>

            <form
              id="waitlist"
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center gap-2 rounded-[14px] border border-border bg-white p-2"
            >
              <span className="grid h-10 w-10 place-items-center text-ink-muted">
                <Bell className="h-4 w-4" />
              </span>
              <input
                type="email"
                required
                placeholder="you@yourstartup.dev"
                className="h-12 flex-1 bg-transparent text-[15px] text-ink placeholder:text-ink-muted focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Join waitlist"
                className="grid h-12 w-12 place-items-center rounded-[12px] bg-flame text-white transition-colors hover:bg-flame-hover shadow-flame"
              >
                <ArrowRight className="h-5 w-5" strokeWidth={2.4} />
              </button>
            </form>

            <div className="flex items-center justify-between px-2 pb-1 pt-3 text-[12px] text-ink-muted">
              <span className="font-mono">// no credit card • no spam • leave any time</span>
              <span className="hidden items-center gap-1.5 sm:flex">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-flame" />
                <span className="font-mono">Waitlist open</span>
              </span>
            </div>
          </div>

          {/* Mini code/status floating cards */}
          <FloatingStatusCard className="absolute -right-4 top-6 hidden md:block" />
          <FloatingBudgetCard className="absolute -left-6 -bottom-10 hidden md:block" />
        </div>
      </div>
    </section>
  );
}

function ModeTab({ label, active }: { label: string; active?: boolean }) {
  return (
    <button
      type="button"
      className={
        active
          ? "flex items-center gap-1.5 rounded-[10px] border border-border bg-white px-3 py-1.5 text-[13px] font-medium text-ink shadow-soft"
          : "flex items-center gap-1.5 rounded-[10px] px-3 py-1.5 text-[13px] font-medium text-ink-muted hover:text-ink"
      }
    >
      {active && <span className="h-1.5 w-1.5 rounded-full bg-flame" />}
      {label}
    </button>
  );
}

function BrowserWireframe() {
  return (
    <div
      className="pointer-events-none absolute -inset-x-10 -top-8 -bottom-20 rounded-[26px] border border-border bg-surface/60 opacity-60"
      aria-hidden="true"
    >
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="ml-3 h-3 w-40 rounded bg-border/70" />
      </div>
      <div className="grid grid-cols-12 gap-3 p-6">
        <div className="col-span-3 space-y-2">
          <div className="h-3 w-20 rounded bg-border/70" />
          <div className="h-3 w-16 rounded bg-border/60" />
          <div className="h-3 w-24 rounded bg-border/60" />
        </div>
        <div className="col-span-9 space-y-2">
          <div className="h-3 w-3/4 rounded bg-border/70" />
          <div className="h-3 w-2/3 rounded bg-border/60" />
          <div className="h-3 w-1/2 rounded bg-border/60" />
        </div>
      </div>
    </div>
  );
}

function FloatingStatusCard({ className = "" }: { className?: string }) {
  return (
    <div className={`w-[260px] rounded-[16px] border border-border bg-white p-4 shadow-soft ${className}`}>
      <div className="flex items-center justify-between">
        <span className="bracket-label">[ GUARDRAIL ]</span>
        <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[11px] font-medium text-ink">
          <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-flame" />
          Active
        </span>
      </div>
      <div className="mt-3 font-mono text-[13px] leading-relaxed text-ink-soft">
        <div><span className="text-ink-muted">01</span>  rule: <span className="text-ink">"free-tier-only"</span></div>
        <div><span className="text-ink-muted">02</span>  cap:  <span className="text-flame">$0.00</span></div>
        <div><span className="text-ink-muted">03</span>  on_breach: <span className="text-ink">disable_billing()</span></div>
      </div>
    </div>
  );
}

function FloatingBudgetCard({ className = "" }: { className?: string }) {
  return (
    <div className={`w-[280px] rounded-[16px] border border-border bg-white p-4 shadow-soft ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-medium text-ink">November · this-month</span>
        <span className="bracket-label">[ $0.00 / $1.00 ]</span>
      </div>
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div className="h-full w-[2%] bg-flame" />
      </div>
      <div className="mt-3 flex items-center justify-between text-[12px] text-ink-soft">
        <span>3 projects watched</span>
        <span className="font-mono text-ink-muted">2% used</span>
      </div>
    </div>
  );
}

/* ---------- Trust strip ---------- */
function TrustStrip() {
  const items = [
    "Cloud Run", "Firestore", "Cloud Functions", "BigQuery", "Pub/Sub",
    "GKE", "Cloud Storage", "Cloud SQL", "Artifact Registry", "Vertex AI",
  ];
  return (
    <section className="border-y border-border bg-surface">
      <div className={`${SECTION_WRAP} py-10`}>
        <p className="text-center text-[14px] text-ink-soft">
          Built for the GCP services you actually use
        </p>
        <div className="mt-6 overflow-hidden">
          <div className="flex w-max animate-marquee gap-12">
            {[...items, ...items, ...items].map((s, i) => (
              <span
                key={i}
                className="whitespace-nowrap font-mono text-[13px] tracking-tight text-ink-muted"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
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
  index: string;
  eyebrow: string;
  title: string;
  accent?: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-[820px] text-center">
      <div className="font-mono text-[12px] uppercase tracking-[0.08em] text-ink-muted">
        [ {index} ] · {eyebrow} //
      </div>
      <h2 className="mt-5 text-[36px] font-bold leading-[1.1] tracking-[-0.02em] text-ink md:text-[52px]">
        {title}{" "}
        {accent && <span className="text-flame">{accent}</span>}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-5 max-w-[640px] text-[17px] leading-[1.55] text-ink-soft md:text-[18px]">
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ---------- 02 // Developer First (code demo) ---------- */
function DeveloperFirst() {
  const [tab, setTab] = useState<"yaml" | "cli" | "node">("yaml");

  const code: Record<typeof tab, string> = {
    yaml: `# devrails.yaml
project: my-side-project
mode: free-tier            # stay in GCP always-free
monthly_cap_usd: 1.00      # hard ceiling
on_breach:
  - notify: email
  - action: disable_billing
services:
  - cloud_run
  - firestore
  - cloud_functions`,
    cli: `$ devrails init
✓ Detected 3 GCP projects
✓ Linked billing account
✓ Applied "free-tier" guardrail

$ devrails status
  my-side-project   $0.00 / $1.00   ●  on track
  weekend-hack      $0.12 / $1.00   ●  on track
  client-demo       PAUSED          ○  capped`,
    node: `import { DevRails } from "devrails";

const rails = new DevRails({ apiKey: process.env.DEVRAILS_KEY });

await rails.projects.guard("my-side-project", {
  monthlyCapUsd: 1.0,
  mode: "free-tier",
  onBreach: ["notify:email", "disable_billing"],
});`,
  };

  return (
    <section id="product" className={SECTION_PAD}>
      <div className={SECTION_WRAP}>
        <SectionHeader
          index="01 / 04"
          eyebrow="Built for builders // Developer First"
          title="Guardrails as"
          accent="config, not anxiety."
          subtitle="Declare a budget, declare a mode, ship the project. DevRails watches your billing API and pulls the plug before the surprise."
        />

        <div className="mx-auto mt-14 grid max-w-[1100px] gap-6 md:grid-cols-5">
          {/* Tabs + code */}
          <div className="md:col-span-3">
            <div className="rounded-[18px] border border-border bg-white shadow-soft overflow-hidden">
              <div className="flex items-center gap-1 border-b border-border bg-surface px-2 py-2">
                {(["yaml", "cli", "node"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={
                      tab === t
                        ? "rounded-[8px] bg-white px-3 py-1.5 font-mono text-[12px] text-ink shadow-soft border border-border"
                        : "rounded-[8px] px-3 py-1.5 font-mono text-[12px] text-ink-muted hover:text-ink"
                    }
                  >
                    {t === "yaml" ? "devrails.yaml" : t === "cli" ? "cli" : "node.js"}
                  </button>
                ))}
                <button
                  type="button"
                  className="ml-auto inline-flex items-center gap-1.5 rounded-[8px] px-2 py-1 font-mono text-[12px] text-ink-muted hover:text-ink"
                >
                  <Copy className="h-3.5 w-3.5" /> Copy
                </button>
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-[1.7] text-ink">
                {code[tab].split("\n").map((line, i) => (
                  <div key={i} className="flex">
                    <span className="mr-4 w-6 select-none text-right text-ink-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{line || "\u00A0"}</span>
                  </div>
                ))}
              </pre>
            </div>
          </div>

          {/* Output card */}
          <div className="md:col-span-2">
            <div className="h-full rounded-[18px] border border-border bg-surface p-5 shadow-soft">
              <div className="flex items-center justify-between">
                <span className="bracket-label">[ EVENT.STREAM ]</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[11px] font-medium text-ink border border-border">
                  <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-flame" />
                  live
                </span>
              </div>
              <ul className="mt-4 space-y-3 text-[13px]">
                <LogRow time="09:14" tag="ok" text="Polled billing — 3 projects · $0.12 month-to-date" />
                <LogRow time="11:42" tag="warn" text='weekend-hack reached 80% of $1.00 cap' />
                <LogRow time="11:42" tag="act" text='Sent email + Slack alert to @you' />
                <LogRow time="11:43" tag="ok" text="Auto-throttle armed for next breach" />
                <LogRow time="14:08" tag="stop" text="client-demo hit cap → billing disabled" />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LogRow({
  time,
  tag,
  text,
}: {
  time: string;
  tag: "ok" | "warn" | "act" | "stop";
  text: string;
}) {
  const tagStyle =
    tag === "ok"
      ? "bg-secondary text-ink"
      : tag === "warn"
      ? "bg-flame/15 text-flame"
      : tag === "act"
      ? "bg-ink text-white"
      : "bg-ink text-white";
  return (
    <li className="flex items-start gap-3 font-mono text-ink-soft">
      <span className="text-ink-muted">{time}</span>
      <span className={`rounded px-1.5 py-0.5 text-[10px] uppercase tracking-wide ${tagStyle}`}>
        {tag}
      </span>
      <span className="flex-1 leading-[1.5]">{text}</span>
    </li>
  );
}

/* ---------- 03 // How it works (bento) ---------- */
function HowItWorks() {
  return (
    <section id="how-it-works" className={`${SECTION_PAD} bg-surface border-y border-border`}>
      <div className={SECTION_WRAP}>
        <SectionHeader
          index="02 / 04"
          eyebrow="Zero configuration // How it works"
          title="The boring parts"
          accent="we already handled."
          subtitle="No dashboards to babysit. No spreadsheets. DevRails plugs straight into the GCP billing API and runs in the background."
        />

        <div className="mx-auto mt-14 grid max-w-[1100px] grid-cols-1 gap-5 md:grid-cols-6">
          <Bento className="md:col-span-4" icon={<Gauge />} title="Free-tier mode" eyebrow="Default rail">
            <p>
              Pick the always-free posture and DevRails keeps every project at{" "}
              <span className="font-mono text-ink">$0.00</span>. Touch the line, billing gets disabled. Sleep easy.
            </p>
            <div className="mt-5 rounded-[12px] border border-border bg-white p-4 font-mono text-[12px] text-ink-soft">
              <div className="flex items-center justify-between">
                <span>my-side-project</span>
                <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] text-ink">FREE-TIER</span>
              </div>
              <div className="mt-2 h-1.5 w-full rounded-full bg-secondary">
                <div className="h-full w-[8%] rounded-full bg-flame" />
              </div>
              <div className="mt-2 flex justify-between text-ink-muted">
                <span>0.00 used</span><span>cap 0.00</span>
              </div>
            </div>
          </Bento>

          <Bento className="md:col-span-2" icon={<ShieldCheck />} title="Hard caps" eyebrow="Cap mode">
            <p>Set any monthly ceiling — $1, $20, $200. We won&apos;t let it through.</p>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              {["$1", "$20", "$200"].map((v) => (
                <div key={v} className="rounded-[10px] border border-border bg-white py-3 font-mono text-[13px] text-ink">
                  {v}
                </div>
              ))}
            </div>
          </Bento>

          <Bento className="md:col-span-2" icon={<Bell />} title="Smart alerts">
            <p>Email, Slack, or webhook — pinged at 50/80/95% of your cap with the exact SKU that&apos;s burning.</p>
          </Bento>

          <Bento className="md:col-span-2" icon={<Zap />} title="Auto-throttle">
            <p>On breach: disable billing, pause Cloud Run, or run a custom action. Your call.</p>
          </Bento>

          <Bento className="md:col-span-2" icon={<LineChart />} title="One-glance status">
            <p>Every GCP project on a single line. No 14-tab Console dance.</p>
            <div className="mt-4 space-y-1.5 font-mono text-[12px]">
              <Row name="api-prod" used="0.42" cap="1.00" />
              <Row name="weekend-hack" used="0.00" cap="0.00" />
              <Row name="client-demo" used="—" cap="paused" muted />
            </div>
          </Bento>

          <Bento className="md:col-span-3" icon={<Plug />} title="Plugs in in 60 seconds" eyebrow="Setup">
            <p>Sign in with Google, pick your billing account, choose a rail. That&apos;s it — no agents, no terraform.</p>
            <ol className="mt-4 space-y-2 text-[14px]">
              {["Sign in with Google", "Pick billing account", "Choose your rail"].map((s, i) => (
                <li key={s} className="flex items-center gap-3">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-secondary font-mono text-[11px] text-ink">
                    {i + 1}
                  </span>
                  <span className="text-ink-soft">{s}</span>
                </li>
              ))}
            </ol>
          </Bento>

          <Bento className="md:col-span-3" icon={<Lock />} title="Least-privilege by design" eyebrow="Security">
            <p>
              Read billing, toggle a budget. That&apos;s the only scope DevRails asks for. We can&apos;t deploy
              your code, can&apos;t see your data, can&apos;t move money.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 font-mono text-[11px]">
              {["billing.viewer", "billing.budgets.editor", "iam.read"].map((s) => (
                <span key={s} className="rounded-md border border-border bg-white px-2 py-1 text-ink">
                  {s}
                </span>
              ))}
            </div>
          </Bento>
        </div>
      </div>
    </section>
  );
}

function Bento({
  className = "",
  icon,
  title,
  eyebrow,
  children,
}: {
  className?: string;
  icon: React.ReactNode;
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`group rounded-[22px] border border-border bg-white p-7 shadow-soft transition-all hover:border-ink/20 ${className}`}
    >
      <div className="flex items-center justify-between">
        <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-secondary text-ink">
          <span className="[&_svg]:h-4 [&_svg]:w-4">{icon}</span>
        </span>
        {eyebrow && <span className="bracket-label">[ {eyebrow.toUpperCase()} ]</span>}
      </div>
      <h3 className="mt-5 text-[20px] font-semibold tracking-tight text-ink">{title}</h3>
      <div className="mt-2 text-[15px] leading-[1.6] text-ink-soft">{children}</div>
    </div>
  );
}

function Row({
  name,
  used,
  cap,
  muted,
}: {
  name: string;
  used: string;
  cap: string;
  muted?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between rounded-md border border-border bg-white px-2.5 py-1.5 ${
        muted ? "text-ink-muted" : "text-ink"
      }`}
    >
      <span className="truncate">{name}</span>
      <span className="text-ink-muted">
        <span className={muted ? "text-ink-muted" : "text-ink"}>{used}</span> / {cap}
      </span>
    </div>
  );
}

/* ---------- 04 // Pricing ---------- */
function Pricing() {
  return (
    <section id="pricing" className={SECTION_PAD}>
      <div className={SECTION_WRAP}>
        <SectionHeader
          index="03 / 04"
          eyebrow="Pricing // One plan, one dollar"
          title="One dollar."
          accent="That's the pitch."
          subtitle="No tiers. No seats. No 'contact sales'. DevRails costs less than the coffee you'd buy to console yourself over a surprise GCP bill."
        />

        <div className="mx-auto mt-14 grid max-w-[920px] grid-cols-1 gap-5 md:grid-cols-2">
          {/* Free tier card */}
          <div className="rounded-[22px] border border-border bg-white p-7 shadow-soft">
            <div className="flex items-center justify-between">
              <h3 className="text-[20px] font-semibold text-ink">Free Tier Guard</h3>
              <span className="bracket-label">[ FREE ]</span>
            </div>
            <p className="mt-1 text-[14px] text-ink-soft">For the always-free crowd.</p>
            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-[48px] font-bold tracking-tight text-ink">$0</span>
              <span className="text-[14px] text-ink-muted">/ forever</span>
            </div>
            <ul className="mt-6 space-y-2.5 text-[14px] text-ink-soft">
              {[
                "1 GCP project",
                "Free-tier mode only",
                "Email alerts",
                "Disable-billing on breach",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-flame" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <a
              href="#waitlist"
              className="mt-7 inline-flex w-full items-center justify-center rounded-[10px] border border-border bg-white px-4 py-2.5 text-[14px] font-medium text-ink hover:bg-secondary"
            >
              Start free at launch
            </a>
          </div>

          {/* Pro */}
          <div className="relative rounded-[22px] border border-ink bg-ink p-7 text-white shadow-card">
            <span className="absolute -top-3 right-5 rounded-full bg-flame px-3 py-1 text-[11px] font-semibold tracking-wide text-white">
              FOUNDING BUILDERS · LIFETIME
            </span>
            <div className="flex items-center justify-between">
              <h3 className="text-[20px] font-semibold">DevRails</h3>
              <span className="font-mono text-[12px] text-white/60">[ PRO ]</span>
            </div>
            <p className="mt-1 text-[14px] text-white/70">Everything. Every project.</p>
            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-[48px] font-bold tracking-tight">$1</span>
              <span className="text-[14px] text-white/60">/ month</span>
              <span className="ml-2 rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-medium text-white/80 line-through">
                $9
              </span>
            </div>
            <ul className="mt-6 space-y-2.5 text-[14px] text-white/85">
              {[
                "Unlimited GCP projects",
                "Custom monthly caps ($1 → $200+)",
                "Slack + webhook alerts",
                "Auto-throttle & custom actions",
                "API + CLI access",
                "Lifetime price lock",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-flame" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <a
              href="#waitlist"
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-[10px] bg-flame px-4 py-2.5 text-[14px] font-semibold text-white hover:bg-flame-hover shadow-flame"
            >
              Claim $1/month for life <ArrowRight className="h-4 w-4" />
            </a>
            <p className="mt-3 text-center font-mono text-[11px] text-white/50">
              // billed monthly · cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 05 // Final CTA ---------- */
function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-surface">
      <div className="pointer-events-none absolute inset-0 tech-grid tech-grid-fade opacity-60" />
      <div className="pointer-events-none absolute inset-0">
        <span className="bracket-label absolute left-[8%] top-[24%]">[ FREE-TIER ]</span>
        <span className="bracket-label absolute right-[10%] top-[18%]">[ $1/mo ]</span>
        <span className="bracket-label absolute left-[18%] bottom-[22%]">[ COLL-CON ]</span>
        <span className="bracket-label absolute right-[14%] bottom-[28%]">[ COMING SOON ]</span>
        <span className="crosshair absolute left-[26%] top-[44%]" />
        <span className="crosshair absolute right-[24%] bottom-[40%]" />
      </div>
      <div className={`${SECTION_WRAP} relative z-10 py-24 text-center md:py-32`}>
        <div className="font-mono text-[12px] uppercase tracking-[0.08em] text-ink-muted">
          // Get started
        </div>
        <h2 className="mx-auto mt-5 max-w-[760px] text-[40px] font-bold leading-[1.1] tracking-[-0.02em] text-ink md:text-[56px]">
          Ship without bill anxiety.
        </h2>
        <p className="mx-auto mt-4 max-w-[560px] text-[17px] text-ink-soft">
          Join the founding-builders waitlist. Be first in, lock in $1/month for life.
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="mx-auto mt-8 flex w-full max-w-[460px] items-center gap-2 rounded-[14px] border border-border bg-white p-2 shadow-soft"
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
            Join waitlist <ArrowRight className="h-4 w-4" />
          </button>
        </form>
        <p className="mt-4 font-mono text-[12px] text-ink-muted">
          // by builders, for builders · part of the Coll-Con ecosystem
        </p>
      </div>
    </section>
  );
}

/* ---------- 06 // FAQ ---------- */
const FAQS: { q: string; a: string }[] = [
  {
    q: "What is DevRails?",
    a: "DevRails is lightweight FinOps for Google Cloud. It watches your billing API, enforces a rail you choose (free-tier or a monthly cap), and pulls the plug before a surprise bill lands.",
  },
  {
    q: "Why does it cost $1/month?",
    a: "Because GCP surprise bills cost a lot more than that, and tools that prevent them cost a lot more too. Founding builders lock in $1/month for life — after launch the price goes up.",
  },
  {
    q: "Will it really keep me in the GCP free tier?",
    a: "In free-tier mode, DevRails sets a $0.00 budget on each project you connect and a billing-disable action on breach. The instant something tips past free, billing gets killed — no overage, no charges from us either.",
  },
  {
    q: "What permissions does DevRails need?",
    a: "Billing read access and the ability to edit budgets. That's it. We can't deploy code, read your data, or move money. Scopes are listed in the consent screen and in the docs.",
  },
  {
    q: "Does it support AWS or Azure?",
    a: "Not yet. DevRails launches with GCP only. Other clouds come once the core rail story is rock-solid.",
  },
  {
    q: "What's Coll-Con?",
    a: "Coll-Con (thecollcon.com) is the ecosystem of small, sharp builder tools I'm shipping. DevRails is the first one. Get on the list and you'll hear about the rest first.",
  },
  {
    q: "When is launch?",
    a: "Soon. Waitlist members get early access and a founding-builder invite before the public release.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className={SECTION_PAD}>
      <div className={SECTION_WRAP}>
        <SectionHeader
          index="04 / 04"
          eyebrow="FAQ // Frequently asked"
          title="Questions, answered."
          subtitle="Everything you need to know before you trust DevRails with your billing."
        />
        <div className="mx-auto mt-12 max-w-[760px] divide-y divide-border border-y border-border">
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

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer id="coll-con" className="border-t border-border bg-surface">
      <div className={`${SECTION_WRAP} pt-20 pb-12`}>
        <h3 className="max-w-[820px] text-[32px] font-bold leading-[1.1] tracking-[-0.02em] text-ink md:text-[44px]">
          The easiest way to keep your{" "}
          <span className="text-flame">GCP bill</span> under a dollar.
        </h3>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1.5 text-[13px] text-ink">
            <Cloud className="h-3.5 w-3.5 text-flame" /> Built on GCP
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1.5 text-[13px] text-ink">
            <Lock className="h-3.5 w-3.5 text-flame" /> Least-privilege access
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1.5 text-[13px] text-ink">
            <Flame className="h-3.5 w-3.5 text-flame" /> Part of Coll-Con
          </span>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-10 md:grid-cols-4">
          <FooterCol
            heading="Product"
            links={["Overview", "How it works", "Pricing", "Changelog", "Status"]}
          />
          <FooterCol
            heading="Resources"
            links={["Docs", "Why $1/month", "GCP free-tier guide", "Roadmap"]}
          />
          <FooterCol
            heading="Coll-Con"
            links={["About thecollcon.com", "All products", "Builder log", "Contact"]}
          />
          <FooterCol
            heading="Legal"
            links={["Terms of Service", "Privacy Policy", "Report Abuse"]}
          />
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-border pt-8 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <WordMark size="sm" />
            <span className="text-[13px] text-ink-muted">
              © 2026 Coll-Con · thecollcon.com
            </span>
          </div>
          <div className="flex items-center gap-4">
            <SocialIcon label="GitHub"><Github className="h-4 w-4" /></SocialIcon>
            <SocialIcon label="X / Twitter"><Twitter className="h-4 w-4" /></SocialIcon>
            <SocialIcon label="LinkedIn"><Linkedin className="h-4 w-4" /></SocialIcon>
            <SocialIcon label="YouTube"><Youtube className="h-4 w-4" /></SocialIcon>
            <SocialIcon label="Discord"><MessageCircle className="h-4 w-4" /></SocialIcon>
            <span className="ml-2 inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1.5 text-[12px] font-medium text-ink">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-flame" />
              All systems normal
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ heading, links }: { heading: string; links: string[] }) {
  return (
    <div>
      <h4 className="font-mono text-[12px] font-semibold uppercase tracking-[0.08em] text-ink-muted">
        {heading}
      </h4>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="text-[14px] text-ink-soft transition-colors hover:text-flame">
              {l}
            </a>
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

/* ---------- Floating chat ---------- */
function FloatingChat() {
  return (
    <a
      href="#waitlist"
      aria-label="Talk to us"
      className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-flame text-white shadow-flame transition-transform hover:scale-105"
    >
      <MessageCircle className="h-6 w-6" />
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
      <TrustStrip />
      <DeveloperFirst />
      <HowItWorks />
      <Pricing />
      <FinalCTA />
      <FAQ />
      <Footer />
      <FloatingChat />
    </main>
  );
}