import { AlertTriangle } from "lucide-react";

/* =====================================================================
   Shared auth primitives — EPIC-016.

   The LIVE app ships a Google-only /signin (PRD-001 TASK-155/161); it uses
   AuthShell, GoogleIcon and Spinner from this module. The remaining exports
   (Field, validEmail, MOCK_USERS, GoogleModal, Callout) belong to the parked
   full-suite variant under src/_parked/auth-full-suite/ and are kept here so
   those files keep resolving if restored.

   PRE-WIRING UI ONLY — no Firebase, no backend. Real wiring is TASK-012 /
   EPIC-017, gated on Kate's approval.
===================================================================== */

/** Mock user store. Drives every auth outcome in this prototype. */
export const MOCK_USERS: Record<string, { pass: string; disabled?: boolean }> = {
  "builder@collcon.dev": { pass: "rails123" },
  "disabled@collcon.dev": { pass: "rails123", disabled: true },
};

export type GoogleOutcome = "ok" | "disabled" | "network" | "popup-blocked";

/** Mock Google accounts — each row deterministically drives one outcome.
    Shared between the sign-in card and the standalone /google-picker popup
    so both present the same account list. */
export const GOOGLE_ACCOUNTS: {
  initials: string;
  bg: string;
  name: string;
  email: string;
  sub?: string;
  outcome: GoogleOutcome;
}[] = [
  { initials: "EB", bg: "var(--flame)", name: "E. Builder", email: "builder@collcon.dev", outcome: "ok" },
  { initials: "DA", bg: "var(--ink-muted)", name: "Disabled Account", email: "disabled@collcon.dev", outcome: "disabled" },
  { initials: "NF", bg: "var(--warning)", name: "Flaky Network", email: "flaky@collcon.dev", sub: "simulates network failure", outcome: "network" },
  { initials: "PB", bg: "var(--danger)", name: "Blocked Popup", email: "blocked@collcon.dev", sub: "simulates a blocked popup", outcome: "popup-blocked" },
];

export function validEmail(e: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

/** DevRails wordmark shown above the card title (TASK-155/160: the logo
    belongs inside the card itself, not only in the page chrome). */
export function AuthLogo() {
  return (
    <img
      src="/devrails-logo-black.png"
      alt="DevRails"
      className="mx-auto mb-5 block"
      style={{ height: 28 }}
    />
  );
}

/** Opens a small, centered popup window — the real signInWithPopup(GoogleAuthProvider)
    shape (a separate OS window), not an overlay on the current page. Returns
    null if the browser actually blocked it. */
export function openCenteredPopup(url: string, name: string, width: number, height: number): Window | null {
  const top = window.top ?? window;
  const y = top.outerHeight / 2 + top.screenY - height / 2;
  const x = top.outerWidth / 2 + top.screenX - width / 2;
  return window.open(url, name, `width=${width},height=${height},left=${Math.max(0, x)},top=${Math.max(0, y)},resizable=yes,scrollbars=yes`);
}

/* Multicolour Google "G" — not a Lucide glyph, so inlined. */
export function GoogleIcon({ size = 18 }: { size?: number }) {
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

/** Page chrome: technical grid, bracket labels, header, footer. */
export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="section-grid" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <style>{AUTH_CSS}</style>

      <div className="tech-grid tech-grid-fade" style={{ position: "fixed", inset: 0, pointerEvents: "none", opacity: 0.5 }} />
      <span className="bracket-label" style={{ position: "fixed", left: "6%", top: "16%", pointerEvents: "none" }}>[ AUTH.FIREBASE ]</span>
      <span className="bracket-label" style={{ position: "fixed", right: "7%", top: "22%", pointerEvents: "none" }}>[ SESSION.SECURE ]</span>
      <span className="crosshair" style={{ position: "fixed", left: "12%", bottom: "24%" }} />
      <span className="crosshair" style={{ position: "fixed", right: "14%", bottom: "18%" }} />

      <header style={{ position: "relative", zIndex: 10 }}>
        <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-6">
          <a href="/">
            <img src="/devrails-logo-black.png" alt="DevRails" style={{ height: 26, display: "block" }} />
          </a>
          <span className="font-mono text-[11px] text-ink-muted">// GCP usage guardrails · $1/month</span>
        </div>
      </header>

      <main
        style={{
          position: "relative",
          zIndex: 10,
          flex: 1,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "40px 24px 80px",
        }}
      >
        {children}
      </main>

      <footer
        className="font-mono text-ink-muted"
        style={{ position: "relative", zIndex: 10, padding: "0 24px 24px", textAlign: "center", fontSize: 11 }}
      >
        // an Elmscorp product · firebase auth · © 2026
      </footer>
    </div>
  );
}

/** Card-level error banner (Firebase-code messaging). */
export function Callout({ msg }: { msg: string }) {
  if (!msg) return null;
  return (
    <div className="au-callout">
      <AlertTriangle size={16} />
      <span>{msg}</span>
    </div>
  );
}

/** Labelled input with inline field-level validation error. */
export function Field({
  label,
  required,
  error,
  children,
}: {
  label: React.ReactNode;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`au-field${error ? " show-err" : ""}`}>
      {label}
      {children}
      {error ? <span className="au-field-err">{error}</span> : null}
      {required ? null : null}
    </div>
  );
}

export function Spinner({ dark, size = 16 }: { dark?: boolean; size?: number }) {
  return <span className={`au-spin${dark ? " dark" : ""}`} style={{ height: size, width: size }} />;
}

/** Mock of signInWithPopup(GoogleAuthProvider) — same three branch accounts
    as the prototype: success, disabled account, network failure. */
export function GoogleModal({
  open,
  busy,
  onPick,
  onClose,
}: {
  open: boolean;
  busy: boolean;
  onPick: (email: string, outcome: GoogleOutcome) => void;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div
      className="au-modal-bg"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="shadow-card" style={{ width: 400, maxWidth: "calc(100vw - 32px)", borderRadius: 18, background: "#fff", overflow: "hidden" }}>
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2.5">
            <GoogleIcon />
            <span className="text-[14px] font-semibold text-ink">Sign in with Google</span>
          </div>
          <button onClick={onClose} style={{ border: "none", background: "none", cursor: "pointer", padding: 4, display: "grid", color: "var(--ink-muted)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        {!busy ? (
          <div className="p-3">
            <p className="mx-2 mb-2.5 mt-1 text-[13px] text-ink-soft">
              Choose an account to continue to <strong className="text-ink">DevRails</strong>
            </p>
            <GAcct initials="EB" bg="var(--flame)" name="E. Builder" email="builder@collcon.dev" onClick={() => onPick("builder@collcon.dev", "ok")} />
            <GAcct initials="DA" bg="var(--ink-muted)" name="Disabled Account" email="disabled@collcon.dev" onClick={() => onPick("disabled@collcon.dev", "disabled")} />
            <GAcct
              initials="NF"
              bg="var(--warning)"
              name="Flaky Network"
              email="flaky@collcon.dev · simulates network failure"
              onClick={() => onPick("flaky@collcon.dev", "network")}
            />
            <div className="mx-2 mb-1 mt-2 border-t border-border pt-2.5">
              <span className="au-link" onClick={onClose}>
                Use another account (cancel)
              </span>
            </div>
          </div>
        ) : (
          <div className="px-5 py-9 text-center">
            <Spinner dark size={24} />
            <p className="mt-3.5 text-[13px] text-ink-soft">Contacting accounts.google.com…</p>
          </div>
        )}

        <div className="border-t border-border bg-surface px-5 py-2.5 font-mono text-[10px] text-ink-muted">
          // popup flow · signInWithPopup(GoogleAuthProvider)
        </div>
      </div>
    </div>
  );
}

function GAcct({
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
    <button className="au-gacct" onClick={onClick}>
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

export const AUTH_CSS = `
.au-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;border-radius:10px;font-weight:600;cursor:pointer;text-decoration:none;transition:background-color .15s,color .15s,border-color .15s;border:1px solid transparent;font-family:var(--font-sans)}
.au-btn-primary{background:var(--flame);color:#fff}
.au-btn-primary:hover{background:var(--flame-hover);color:#fff}
.au-btn-primary:disabled{opacity:.6;cursor:default}
.au-btn-outline{background:#fff;color:var(--ink);border-color:var(--border)}
.au-btn-outline:hover{border-color:var(--flame);color:var(--flame);background:rgba(11,61,145,.05)}
.au-in{height:44px;width:100%;border-radius:10px;border:1px solid var(--border);background:#fff;padding:0 12px;font-size:15px;color:var(--ink);font-family:var(--font-sans);outline:none}
.au-in::placeholder{color:var(--ink-muted)}
.au-in:focus{border-color:var(--flame);box-shadow:0 0 0 2px rgba(11,61,145,.2)}
.au-field{display:flex;flex-direction:column;gap:6px}
.au-lbl{font-size:13px;font-weight:500;color:var(--ink)}
.au-field-err{display:flex;align-items:flex-start;gap:6px;font-size:12px;line-height:1.4;color:var(--danger-text)}
.au-field.show-err .au-in{border-color:var(--danger);box-shadow:0 0 0 2px rgba(239,68,68,.15)}
.au-callout{display:flex;align-items:flex-start;gap:8px;border-radius:10px;border:1px solid var(--danger-border);background:var(--danger-soft);padding:12px;font-size:13px;line-height:1.5;color:var(--danger-text)}
.au-callout svg{flex-shrink:0}
.au-link{font-size:13px;font-weight:500;color:var(--flame);cursor:pointer}
.au-link:hover{color:var(--flame-hover);text-decoration:underline;text-underline-offset:2px}
.au-gacct{display:flex;width:100%;align-items:center;gap:12px;border-radius:10px;border:1px solid transparent;background:none;padding:10px 12px;cursor:pointer;text-align:left;font-family:var(--font-sans)}
.au-gacct:hover{background:var(--surface)}
.au-spin{display:inline-block;border-radius:999px;border:2px solid rgba(255,255,255,.35);border-top-color:#fff;animation:au-sp .7s linear infinite}
.au-spin.dark{border-color:rgba(11,61,145,.25);border-top-color:var(--flame);border-width:3px}
@keyframes au-sp{to{transform:rotate(360deg)}}
.au-modal-bg{position:fixed;inset:0;z-index:50;display:flex;align-items:center;justify-content:center;background:rgba(8,18,31,.45);backdrop-filter:blur(2px)}
.au-card{width:440px;max-width:calc(100vw - 32px);border-radius:22px;border:1px solid var(--border);background:#fff;padding:32px}
.au-divider{margin:20px 0;display:flex;align-items:center;gap:12px}
.au-divider span.line{flex:1;height:1px;background:var(--border)}
`;
