import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { RotateCw } from "lucide-react";
import { AUTH_CSS, GOOGLE_ACCOUNTS, GoogleIcon, Spinner, type GoogleOutcome } from "@/components/devrails/auth/authShared";

/* =====================================================================
   /google-picker — standalone popup-window content for the mocked
   signInWithPopup(GoogleAuthProvider) flow (EPIC-016 TASK-157/158).

   This route is never linked to directly; SignInFlow opens it with
   window.open() sized like a real Google account-picker popup, and this
   page posts the outcome back to window.opener before closing itself.

   PRE-WIRING UI ONLY — no Firebase, no real Google OAuth.
===================================================================== */

export const Route = createFileRoute("/google-picker")({
  head: () => ({
    meta: [
      { title: "Sign in with Google" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: GooglePickerPage,
});

function post(outcome: GoogleOutcome | "cancelled", email?: string) {
  window.opener?.postMessage({ source: "devrails-google-picker", outcome, email }, window.location.origin);
  window.close();
}

function GooglePickerPage() {
  const [busy, setBusy] = useState(false);

  function pick(outcome: GoogleOutcome, email: string) {
    setBusy(true);
    // Mock the round-trip to accounts.google.com.
    setTimeout(() => post(outcome, email), 1100);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4">
      <style>{AUTH_CSS}</style>
      <div className="shadow-card" style={{ width: "100%", maxWidth: 400, borderRadius: 18, background: "#fff", overflow: "hidden" }}>
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2.5">
            <GoogleIcon />
            <span className="text-[14px] font-semibold text-ink">Sign in with Google</span>
          </div>
          <button
            onClick={() => post("cancelled")}
            disabled={busy}
            aria-label="Cancel"
            style={{ border: "none", background: "none", cursor: busy ? "default" : "pointer", padding: 4, display: "grid", color: "var(--ink-muted)" }}
          >
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
            {GOOGLE_ACCOUNTS.map((a) => (
              <button key={a.email} className="au-gacct" onClick={() => pick(a.outcome, a.email)}>
                <span
                  className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full text-[12px] font-semibold text-white"
                  style={{ background: a.bg }}
                >
                  {a.initials}
                </span>
                <span>
                  <span className="block text-[14px] font-medium text-ink">{a.name}</span>
                  <span className="block text-[12px] text-ink-muted">
                    {a.email}
                    {a.sub ? ` · ${a.sub}` : ""}
                  </span>
                </span>
              </button>
            ))}
            <div className="mx-2 mb-1 mt-2 border-t border-border pt-2.5">
              <span className="au-link inline-flex items-center gap-1.5" onClick={() => post("cancelled")}>
                <RotateCw size={13} />
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
