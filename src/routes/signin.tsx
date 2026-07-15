import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, ExternalLink, Info, Ban, X, Check } from "lucide-react";

/* =====================================================================
   DevRails — EPIC-016 /signin entry point (TASK-153..162).
   Google-Sign-In-only surface, ported from the devrails-uiux prototype
   (ui_kits/auth/index.html). This is PRE-WIRING UI ONLY — no Firebase,
   no backend, no data fetching (TASK-154). Firebase Auth is wired later
   in TASK-012, pending Kate's green light.

   States (flip via the bottom-right reviewer rail, a prototype-only
   affordance to remove once real auth lands):
     - default        TASK-155
     - button loading TASK-157
     - resolving      TASK-156
     - redirecting    TASK-156
     - cancelled / popup blocked / network error   TASK-158
     - disabled account / session expired          TASK-159
===================================================================== */

type TopState = "card" | "resolving" | "redirecting";
type Variant = "" | "cancelled" | "popup" | "network" | "expired" | "disabled";
type RailKey =
  | "default"
  | "loading"
  | "resolving"
  | "redirecting"
  | "cancelled"
  | "popup"
  | "network"
  | "disabled"
  | "expired";

export const Route = createFileRoute("/signin")({
  validateSearch: (search: Record<string, unknown>): { intent?: "signup" } => ({
    intent: search.intent === "signup" ? "signup" : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Sign in — DevRails" },
      { name: "description", content: "Sign in to DevRails with Google." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SignInPage,
});

/* Multicolour Google "G" — not a Lucide glyph, so inlined. */
function GoogleIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
      />
      <path
        fill="#FF3D00"
        d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
      />
    </svg>
  );
}

const RAIL: [RailKey, string][] = [
  ["default", "default · TASK-155"],
  ["loading", "button loading · 157"],
  ["resolving", "resolving · 156"],
  ["redirecting", "redirecting · 156"],
  ["cancelled", "cancelled · 158"],
  ["popup", "popup blocked · 158"],
  ["network", "network error · 158"],
  ["disabled", "disabled acct · 159"],
  ["expired", "session expired · 159"],
];

function VariantCallout({ variant }: { variant: Variant }) {
  if (variant === "cancelled")
    return (
      <div className="si-callout warn">
        <AlertTriangle size={16} />
        <span>
          <strong>Sign-in cancelled.</strong> You closed the Google window before finishing. You
          can try again.
        </span>
      </div>
    );
  if (variant === "popup")
    return (
      <div className="si-callout warn">
        <ExternalLink size={16} />
        <span>
          <strong>Pop-up blocked.</strong> Allow pop-ups for app.thedevrails.com, then try again.
        </span>
      </div>
    );
  if (variant === "network")
    return (
      <div className="si-callout danger">
        <AlertTriangle size={16} />
        <span>
          <strong>Couldn't reach Google.</strong> Check your connection and try again.
          (auth/network-request-failed)
        </span>
      </div>
    );
  if (variant === "expired")
    return (
      <div className="si-callout info">
        <Info size={16} />
        <span>
          <strong>Your session has expired.</strong> Please sign in again to continue.
        </span>
      </div>
    );
  return null;
}

function GoogleAccount({
  initials,
  bg,
  name,
  email,
  onClick,
}: {
  initials: string;
  bg: string;
  name: string;
  email: string;
  onClick: () => void;
}) {
  return (
    <button className="si-gacct" onClick={onClick}>
      <span
        className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full text-[12px] font-semibold text-white"
        style={{ background: bg }}
      >
        {initials}
      </span>
      <span>
        <span className="block text-[14px] font-medium text-ink">{name}</span>
        <span className="block text-[12px] text-ink-muted">{email}</span>
      </span>
    </button>
  );
}

function SignInPage() {
  const { intent } = Route.useSearch();
  const isSignup = intent === "signup";

  const [topState, setTopState] = useState<TopState>("card");
  const [variant, setVariant] = useState<Variant>("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [rail, setRail] = useState<RailKey>("default");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalBusy, setModalBusy] = useState(false);

  const title = isSignup ? "Create your DevRails account" : "Sign in to DevRails";
  const sub = isSignup
    ? "Sign up with Google to get started — $1/month, GCP-only."
    : "Keep your GCP usage on rails.";

  function showState(s: RailKey) {
    setRail(s);
    setBtnLoading(false);
    setVariant("");
    if (s === "resolving") {
      setTopState("resolving");
      return;
    }
    if (s === "redirecting") {
      setTopState("redirecting");
      return;
    }
    setTopState("card");
    if (s === "loading") {
      setBtnLoading(true);
      return;
    }
    if (s === "default") return;
    setVariant(s); // cancelled | popup | network | disabled | expired
  }

  function openGoogle() {
    setModalBusy(false);
    setModalOpen(true);
  }
  function cancelGoogle() {
    if (modalBusy) return;
    setModalOpen(false);
    showState("cancelled");
  }
  function pick(outcome: "ok" | "disabled" | "network") {
    setModalBusy(true);
    setTimeout(() => {
      setModalOpen(false);
      setModalBusy(false);
      if (outcome === "ok") showState("redirecting");
      else if (outcome === "disabled") showState("disabled");
      else showState("network");
    }, 1300);
  }

  const showButton = variant !== "disabled";

  return (
    <div className="section-grid" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <style>{SIGNIN_CSS}</style>

      <div className="tech-grid tech-grid-fade" style={{ position: "fixed", inset: 0, pointerEvents: "none", opacity: 0.5 }} />
      <span className="bracket-label" style={{ position: "fixed", left: "6%", top: "15%", pointerEvents: "none" }}>[ AUTH.FIREBASE ]</span>
      <span className="bracket-label" style={{ position: "fixed", right: "7%", top: "21%", pointerEvents: "none" }}>[ /SIGNIN ]</span>
      <span className="crosshair" style={{ position: "fixed", left: "12%", bottom: "24%" }} />
      <span className="crosshair" style={{ position: "fixed", right: "14%", bottom: "20%" }} />

      <main
        style={{
          position: "relative",
          zIndex: 10,
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 16px",
        }}
      >
        {topState === "resolving" && (
          <div className="flex flex-col items-center text-center">
            <span className="si-spin lg" />
            <p className="mt-5 text-[14px] text-ink-soft">Checking your session…</p>
            <span className="bracket-label mt-2.5">[ AUTH.RESOLVING ]</span>
          </div>
        )}

        {topState === "redirecting" && (
          <div className="flex flex-col items-center text-center">
            <span className="si-tile" style={{ background: "rgba(53,198,167,.15)", color: "var(--glow)" }}>
              <Check size={26} />
            </span>
            <h1 className="mt-[18px] text-[22px] font-bold tracking-[-0.02em] text-ink">Signed in</h1>
            <p className="mt-2 flex items-center gap-2 text-[14px] text-ink-soft">
              <span className="si-spin" style={{ height: 14, width: 14 }} />
              Redirecting to your dashboard…
            </p>
            <span className="bracket-label mt-3">[ AUTH.OK · REDIRECT ]</span>
          </div>
        )}

        {topState === "card" && (
          <div className="flex flex-col items-center text-center">
            <div className="si-card">
              <img
                src="/devrails-logo-black.png"
                alt="DevRails"
                className="mx-auto block"
                style={{ height: 30 }}
              />
              <h1 className="mt-6 text-center text-[24px] font-bold tracking-[-0.02em] text-ink">{title}</h1>
              <p className="mt-2 text-center text-[14px] leading-[1.55] text-ink-soft">{sub}</p>

              {(variant === "cancelled" || variant === "popup" || variant === "network" || variant === "expired") && (
                <div className="mt-[22px]">
                  <VariantCallout variant={variant} />
                </div>
              )}

              {variant === "disabled" && (
                <div className="mt-[22px]">
                  <div className="si-callout danger">
                    <Ban size={16} />
                    <span>
                      <strong>This account is disabled.</strong> Access to DevRails has been turned
                      off for this Google account. Contact{" "}
                      <a href="mailto:support@thedevrails.com" style={{ color: "var(--danger-text)", textDecoration: "underline" }}>
                        support@thedevrails.com
                      </a>{" "}
                      if you think this is a mistake.
                    </span>
                  </div>
                </div>
              )}

              {showButton && (
                <div className="mt-[22px]">
                  <button className="si-btn si-btn-google" onClick={openGoogle} disabled={btnLoading}>
                    {btnLoading ? (
                      <span className="inline-flex items-center gap-2.5">
                        <span className="si-spin" style={{ height: 16, width: 16 }} />
                        Signing in…
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2.5">
                        <GoogleIcon />
                        Continue with Google
                      </span>
                    )}
                  </button>
                </div>
              )}

              <p className="mt-[22px] text-center font-mono text-[11px] leading-[1.6] text-ink-muted">
                // Google is the only sign-in method
                <br />
                // by continuing you agree to the{" "}
                <a href="/terms" className="underline underline-offset-2">
                  Terms of Service
                </a>{" "}
                &amp;{" "}
                <a href="/privacy" className="underline underline-offset-2">
                  Privacy Policy
                </a>
              </p>
            </div>
            <p className="mt-[18px] text-center font-mono text-[11px] text-ink-muted">
              // EPIC-016 · pre-wiring UI · Firebase Auth wired in TASK-012
            </p>
          </div>
        )}
      </main>

      <footer
        className="font-mono text-ink-muted"
        style={{ position: "relative", zIndex: 10, padding: "0 24px 24px", textAlign: "center", fontSize: 11 }}
      >
        // an Elmscorp product · app.thedevrails.com/signin · © 2026
      </footer>

      {/* Mock of signInWithPopup(new GoogleAuthProvider()) */}
      {modalOpen && (
        <div
          className="si-modal-bg"
          onClick={(e) => {
            if (e.target === e.currentTarget) cancelGoogle();
          }}
        >
          <div
            style={{
              width: 400,
              maxWidth: "calc(100vw - 32px)",
              borderRadius: 18,
              background: "#fff",
              overflow: "hidden",
              boxShadow: "0 20px 60px -20px rgba(15,23,42,0.18)",
            }}
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div className="flex items-center gap-2.5">
                <GoogleIcon />
                <span className="text-[14px] font-semibold text-ink">Sign in with Google</span>
              </div>
              <button onClick={cancelGoogle} className="grid cursor-pointer border-none bg-none p-1 text-ink-muted" style={{ background: "none" }}>
                <X size={16} />
              </button>
            </div>

            {!modalBusy ? (
              <div className="p-3">
                <p className="mx-2 mb-2.5 mt-1 text-[13px] text-ink-soft">
                  Choose an account to continue to <strong className="text-ink">DevRails</strong>
                </p>
                <GoogleAccount initials="EB" bg="var(--flame)" name="E. Builder" email="builder@collcon.dev" onClick={() => pick("ok")} />
                <GoogleAccount initials="DA" bg="var(--ink-muted)" name="Disabled Account" email="disabled@collcon.dev" onClick={() => pick("disabled")} />
                <GoogleAccount
                  initials="NF"
                  bg="var(--warning)"
                  name="Flaky Network"
                  email="flaky@collcon.dev · simulates network failure"
                  onClick={() => pick("network")}
                />
                <div className="mx-2 mb-1 mt-2 border-t border-border pt-2.5">
                  <button className="si-btn-ghost" onClick={cancelGoogle}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="px-5 py-10 text-center">
                <span className="si-spin lg" />
                <p className="mt-3.5 text-[13px] text-ink-soft">Contacting accounts.google.com…</p>
              </div>
            )}

            <div className="border-t border-border bg-surface px-5 py-2.5 font-mono text-[10px] text-ink-muted">
              // signInWithPopup(new GoogleAuthProvider())
            </div>
          </div>
        </div>
      )}

      {/* Reviewer state rail — prototype only, not part of shipped UI. */}
      <div className="si-rail">
        <b>/signin states</b>
        {RAIL.map(([key, label]) => (
          <button key={key} className={rail === key ? "act" : undefined} onClick={() => showState(key)}>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

const SIGNIN_CSS = `
.si-btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;border-radius:10px;font-weight:600;cursor:pointer;text-decoration:none;transition:background-color .15s,color .15s,border-color .15s;border:1px solid transparent;font-family:var(--font-sans)}
.si-btn-google{background:#fff;color:var(--ink);border-color:var(--border);height:48px;width:100%;font-size:15px}
.si-btn-google:hover{border-color:var(--flame);background:rgba(11,61,145,.04)}
.si-btn-google:disabled{cursor:default;color:var(--ink-muted)}
.si-btn-google:disabled:hover{border-color:var(--border);background:#fff}
.si-btn-ghost{background:none;border:none;color:var(--flame);font-size:13px;font-weight:600;cursor:pointer;font-family:var(--font-sans)}
.si-btn-ghost:hover{color:var(--flame-hover);text-decoration:underline;text-underline-offset:2px}
.si-spin{display:inline-block;height:18px;width:18px;border-radius:999px;border:2px solid rgba(11,61,145,.22);border-top-color:var(--flame);animation:si-sp .7s linear infinite}
.si-spin.lg{height:30px;width:30px;border-width:3px}
@keyframes si-sp{to{transform:rotate(360deg)}}
.si-card{width:400px;max-width:calc(100vw - 32px);border-radius:22px;border:1px solid var(--border);background:#fff;padding:36px 32px}
.si-callout{display:flex;align-items:flex-start;gap:10px;border-radius:12px;padding:12px 14px;font-size:13px;line-height:1.5;text-align:left;width:100%}
.si-callout.warn{border:1px solid rgba(245,158,11,.35);background:rgba(245,158,11,.07);color:#8a5a06}
.si-callout.danger{border:1px solid var(--danger-border);background:var(--danger-soft);color:var(--danger-text)}
.si-callout.info{border:1px solid rgba(11,61,145,.2);background:rgba(11,61,145,.05);color:var(--ink-soft)}
.si-callout svg{flex-shrink:0}
.si-tile{display:grid;place-items:center;height:52px;width:52px;border-radius:14px;margin:0 auto}
.si-modal-bg{position:fixed;inset:0;z-index:60;display:flex;align-items:center;justify-content:center;background:rgba(8,18,31,.45);backdrop-filter:blur(2px)}
.si-gacct{display:flex;width:100%;align-items:center;gap:12px;border:1px solid transparent;background:none;padding:10px 12px;cursor:pointer;text-align:left;font-family:var(--font-sans);border-radius:10px}
.si-gacct:hover{background:var(--surface)}
.si-rail{position:fixed;right:16px;bottom:16px;z-index:40;display:flex;flex-direction:column;gap:4px;max-width:200px;border-radius:12px;border:1px solid var(--border);background:rgba(255,255,255,.92);backdrop-filter:blur(8px);padding:10px;box-shadow:0 10px 30px rgba(0,0,0,.04)}
.si-rail b{font-family:var(--font-mono);font-size:9px;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:2px}
.si-rail button{text-align:left;border:none;background:none;font-family:var(--font-mono);font-size:11px;color:var(--ink-soft);padding:3px 6px;border-radius:6px;cursor:pointer}
.si-rail button:hover{background:var(--surface);color:var(--ink)}
.si-rail button.act{background:var(--flame);color:#fff}
`;
