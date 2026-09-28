// @ts-nocheck
/* eslint-disable */
/* =====================================================================
   PARKED — full-suite (email/password + sign-up + reset) auth variant.

   Removed from the live app on 2026-07-24 to comply with PRD-001 EPIC-016
   scope (TASK-155 / TASK-161): the shipped /signin is Google-only.
   Preserved here (NOT deleted) so these flows can be restored if product
   scope changes. Not routed — lives outside src/routes/.
   Original design source: devrails-uiux ui_kits/auth/index-full-suite.v1.html
===================================================================== */
import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import {
  AuthShell,
  Callout,
  GoogleIcon,
  GoogleModal,
  MOCK_USERS,
  Spinner,
  validEmail,
  type GoogleOutcome,
} from "@/components/devrails/auth/authShared";

/* EPIC-016 /signup — full-suite variant: Google + email/password + consent.
   Pre-wiring UI only; outcomes come from MOCK_USERS. */

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Get Started — DevRails" },
      { name: "description", content: "Create your DevRails account." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SignUpPage,
});

const METER_COLORS = ["var(--danger)", "var(--warning)", "var(--warning)", "var(--glow)"];
const METER_LABELS = ["// weak", "// getting there", "// good", "// strong"];

function scorePassword(v: string) {
  let s = 0;
  if (v.length >= 8) s++;
  if (/[0-9]/.test(v)) s++;
  if (/[a-z]/.test(v) && /[A-Z]/.test(v)) s++;
  if (/[^A-Za-z0-9]/.test(v)) s++;
  return s;
}

function SignUpPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [consent, setConsent] = useState(false);
  const [emailErr, setEmailErr] = useState("");
  const [passErr, setPassErr] = useState("");
  const [consentErr, setConsentErr] = useState("");
  const [callout, setCallout] = useState("");
  const [busy, setBusy] = useState(false);
  const [gOpen, setGOpen] = useState(false);
  const [gBusy, setGBusy] = useState(false);

  const score = scorePassword(pass);

  function signedIn(e: string, provider: string) {
    navigate({ to: "/signed-in", search: { email: e, provider } });
  }

  function doSignUp() {
    setCallout("");
    setEmailErr("");
    setPassErr("");
    setConsentErr("");
    let bad = false;
    if (!email.trim()) {
      setEmailErr("Email is required.");
      bad = true;
    } else if (!validEmail(email.trim())) {
      setEmailErr("That does not look like a valid email address.");
      bad = true;
    }
    if (!pass) {
      setPassErr("Password is required.");
      bad = true;
    } else if (pass.length < 8) {
      setPassErr("Password must be at least 8 characters. (auth/weak-password)");
      bad = true;
    }
    if (!consent) {
      setConsentErr("Please accept the Terms and Privacy Policy to continue.");
      bad = true;
    }
    if (bad) return;

    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      if (MOCK_USERS[email.trim()]) {
        setCallout(
          `An account already exists for ${email.trim()}. Log in instead, or reset your password. (auth/email-already-in-use)`,
        );
        return;
      }
      signedIn(email.trim(), "password");
    }, 900);
  }

  function onGooglePick(acct: string, outcome: GoogleOutcome) {
    setGBusy(true);
    setTimeout(() => {
      setGOpen(false);
      setGBusy(false);
      if (outcome === "ok") {
        setCallout("");
        signedIn(acct, "google.com");
        return;
      }
      if (outcome === "disabled") {
        setCallout(
          "This Google account is linked to a disabled DevRails account. Contact support@thedevrails.com. (auth/user-disabled)",
        );
        return;
      }
      setCallout("Could not reach Google. Check your connection and try again. (auth/network-request-failed)");
    }, 1200);
  }

  function closeGoogle() {
    if (gBusy) return;
    setGOpen(false);
    setCallout("Google sign-in was cancelled before completing. (auth/popup-closed-by-user)");
  }

  return (
    <AuthShell>
      <div>
        <div className="au-card shadow-card">
          <div className="text-center">
            <h1 className="text-[26px] font-bold tracking-[-0.02em] text-ink">Get Started</h1>
            <p className="mt-2 text-[14px] text-ink-soft">
              Guardrails for up to 5 GCP projects.{" "}
              <span className="inline-flex translate-y-[-1px] items-center rounded-full border border-border bg-secondary px-2 py-[1px] text-[12px] font-medium text-ink">
                $1/month
              </span>
            </p>
          </div>

          {callout ? (
            <div className="mt-5">
              <Callout msg={callout} />
            </div>
          ) : null}

          <button className="au-btn au-btn-outline mt-5 h-11 w-full text-[14px] font-medium" onClick={() => setGOpen(true)}>
            <GoogleIcon />
            Continue with Google
          </button>

          <div className="au-divider">
            <span className="line" />
            <span className="font-mono text-[11px] text-ink-muted">or</span>
            <span className="line" />
          </div>

          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              doSignUp();
            }}
          >
            <div className={`au-field${emailErr ? " show-err" : ""}`}>
              <label className="au-lbl">
                Email <span style={{ color: "var(--danger)" }}>*</span>
              </label>
              <input
                className="au-in"
                type="email"
                autoComplete="email"
                placeholder="you@yourdomain.dev"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailErr ? <span className="au-field-err">{emailErr}</span> : null}
            </div>

            <div className={`au-field${passErr ? " show-err" : ""}`}>
              <label className="au-lbl">
                Password <span style={{ color: "var(--danger)" }}>*</span>
              </label>
              <div style={{ position: "relative" }}>
                <input
                  className="au-in"
                  type={showPass ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="At least 8 characters"
                  style={{ paddingRight: 40 }}
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  aria-label={showPass ? "Hide password" : "Show password"}
                  style={{
                    position: "absolute",
                    right: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    color: "var(--ink-muted)",
                    padding: 2,
                    display: "grid",
                  }}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* strength meter */}
              <div className="flex gap-1">
                {[0, 1, 2, 3].map((i) => (
                  <span
                    key={i}
                    style={{
                      flex: 1,
                      height: 3,
                      borderRadius: 99,
                      background: i < score ? METER_COLORS[score - 1] : "var(--secondary)",
                    }}
                  />
                ))}
              </div>
              <span className="font-mono text-[11px] text-ink-muted">
                {pass ? METER_LABELS[Math.max(score - 1, 0)] : "// min 8 chars · mix letters and numbers"}
              </span>
              {passErr ? <span className="au-field-err">{passErr}</span> : null}
            </div>

            <label className="flex cursor-pointer items-start gap-2">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                style={{ marginTop: 2, height: 16, width: 16, accentColor: "var(--flame)" }}
              />
              <span className="text-[13px] leading-[1.5] text-ink-soft">
                I agree to the <a href="/terms">Terms</a> and <a href="/privacy">Privacy Policy</a>.
              </span>
            </label>
            {consentErr ? <span className="au-field-err mt-[-8px]">{consentErr}</span> : null}

            <button className="au-btn au-btn-primary shadow-flame h-11 w-full text-[14px]" type="submit" disabled={busy}>
              {busy ? <Spinner /> : "Create account"}
            </button>
          </form>

          <p className="mt-5 text-center text-[13px] text-ink-soft">
            Already have an account?{" "}
            <span className="au-link" onClick={() => navigate({ to: "/signin" })}>
              Log In
            </span>
          </p>
        </div>

        <p className="mt-4 text-center font-mono text-[11px] text-ink-muted">
          // demo: builder@collcon.dev → email already in use
        </p>
      </div>

      <GoogleModal open={gOpen} busy={gBusy} onPick={onGooglePick} onClose={closeGoogle} />
    </AuthShell>
  );
}
