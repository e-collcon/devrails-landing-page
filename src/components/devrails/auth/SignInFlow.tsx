import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { AlertTriangle, Info, LifeBuoy } from "lucide-react";
import { AUTH_CSS, AuthLogo, GoogleIcon, Spinner, openCenteredPopup, type GoogleOutcome } from "@/components/devrails/auth/authShared";

/* =====================================================================
   Shared /signin card logic — EPIC-016, PRD-001 (TASK-154–162).

   Used by both the standalone /signin route (full-page fallback,
   TASK-154's routed page shell) and the on-page auth modal opened from
   the landing page's Get Started / Log In CTAs. Google sign-in itself
   opens a real, separate popup window (src/routes/google-picker.tsx) —
   the same shape as signInWithPopup(GoogleAuthProvider) — rather than an
   overlay drawn on top of this page.

   PRE-WIRING UI ONLY — no Firebase, no backend. Real wiring is TASK-012 /
   EPIC-017.
===================================================================== */

type Phase = "resolving" | "idle" | "connecting" | "redirecting" | "terminal";
type Notice =
  | null
  | { kind: "error"; variant: "cancelled" | "popup-blocked" | "network" }
  | { kind: "info"; variant: "session-expired" };

const ERROR_COPY: Record<"cancelled" | "popup-blocked" | "network", string> = {
  cancelled: "Sign-in was cancelled before it finished. You can try again whenever you're ready.",
  "popup-blocked": "Your browser blocked the Google sign-in window. Allow pop-ups for this site, then try again.",
  network: "We couldn't reach Google. Check your connection and try again.",
};

type PickerMessage = {
  source: "devrails-google-picker";
  outcome: GoogleOutcome | "cancelled";
  email?: string;
};

export function SignInFlow({
  initialReason,
  initialState,
}: {
  initialReason?: string;
  initialState?: string;
}) {
  const navigate = useNavigate();

  const [phase, setPhase] = useState<Phase>("resolving");
  const [notice, setNotice] = useState<Notice>(null);
  const redirectEmail = useRef("builder@collcon.dev");
  const popupRef = useRef<Window | null>(null);
  const pollRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const t = setTimeout(() => {
      if (initialState) {
        applyStateParam(initialState);
        return;
      }
      if (initialReason === "session-expired") {
        setNotice({ kind: "info", variant: "session-expired" });
      }
      setPhase("idle");
    }, 650);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Listen for the result posted by the /google-picker popup window, and
     detect the user closing that window without picking anything. */
  useEffect(() => {
    function stopWatchingPopup() {
      if (pollRef.current) window.clearInterval(pollRef.current);
      pollRef.current = undefined;
      popupRef.current = null;
    }

    function handleMessage(e: MessageEvent<PickerMessage>) {
      if (e.origin !== window.location.origin) return;
      if (!e.data || e.data.source !== "devrails-google-picker") return;
      stopWatchingPopup();

      const { outcome, email } = e.data;
      if (outcome === "ok" && email) {
        redirectEmail.current = email;
        setNotice(null);
        setPhase("redirecting");
        setTimeout(() => {
          navigate({ to: "/signed-in", search: { email, provider: "google.com" } });
        }, 900);
        return;
      }
      if (outcome === "disabled") {
        setPhase("terminal");
        return;
      }
      // cancelled | network | popup-blocked → retryable, back to the card
      setPhase("idle");
      setNotice({ kind: "error", variant: outcome === "cancelled" ? "cancelled" : outcome });
    }

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
      stopWatchingPopup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function applyStateParam(s: string) {
    switch (s) {
      case "resolving":
        setPhase("resolving");
        return;
      case "connecting":
        setPhase("connecting");
        return;
      case "redirecting":
        setPhase("redirecting");
        return;
      case "err-disabled":
      case "terminal":
        setPhase("terminal");
        return;
      case "err-cancelled":
        setNotice({ kind: "error", variant: "cancelled" });
        setPhase("idle");
        return;
      case "err-popup-blocked":
        setNotice({ kind: "error", variant: "popup-blocked" });
        setPhase("idle");
        return;
      case "err-network":
        setNotice({ kind: "error", variant: "network" });
        setPhase("idle");
        return;
      case "info-session-expired":
        setNotice({ kind: "info", variant: "session-expired" });
        setPhase("idle");
        return;
      default:
        setPhase("idle");
    }
  }

  function startGoogle() {
    setNotice(null);
    const popup = openCenteredPopup("/google-picker", "devrails-google-signin", 420, 640);
    if (!popup) {
      setNotice({ kind: "error", variant: "popup-blocked" });
      return;
    }
    popupRef.current = popup;
    setPhase("connecting");
    pollRef.current = window.setInterval(() => {
      if (popup.closed) {
        window.clearInterval(pollRef.current);
        pollRef.current = undefined;
        popupRef.current = null;
        setPhase("idle");
        setNotice({ kind: "error", variant: "cancelled" });
      }
    }, 400);
  }

  /* ---- full-card states (replace the default card entirely) ---- */

  if (phase === "resolving") {
    return (
      <>
        <style>{AUTH_CSS}</style>
        <StatusCard label="[ AUTH.RESOLVING ]">
          <Spinner dark size={26} />
          <h1 className="mt-4 text-[20px] font-bold tracking-[-0.02em] text-ink">Checking your session…</h1>
          <p className="mt-2 text-[14px] text-ink-soft">One moment while we confirm whether you're already signed in.</p>
        </StatusCard>
      </>
    );
  }

  if (phase === "redirecting") {
    return (
      <>
        <style>{AUTH_CSS}</style>
        <StatusCard label="[ AUTH.REDIRECTING ]">
          <Spinner dark size={26} />
          <h1 className="mt-4 text-[20px] font-bold tracking-[-0.02em] text-ink">Signing you in…</h1>
          <p className="mt-2 text-[14px] text-ink-soft">
            Signed in as <strong className="text-ink">{redirectEmail.current}</strong>. Redirecting to DevRails.
          </p>
        </StatusCard>
      </>
    );
  }

  if (phase === "terminal") {
    return (
      <>
        <style>{AUTH_CSS}</style>
        <div className="au-card shadow-card text-center">
          <AuthLogo />
          <span
            className="mx-auto grid h-12 w-12 place-items-center rounded-full"
            style={{ background: "var(--danger-soft)", color: "var(--danger-text)" }}
          >
            <AlertTriangle size={22} />
          </span>
          <h1 className="mt-4 text-[24px] font-bold tracking-[-0.02em] text-ink">Account disabled</h1>
          <p className="mt-2 text-[14px] leading-[1.55] text-ink-soft">
            This DevRails account has been disabled. If you think this is a mistake, our team can help sort it out.
          </p>
          <a
            className="au-btn au-btn-outline mt-6 h-11 w-full text-[14px] font-medium"
            href="mailto:support@thedevrails.com?subject=Disabled%20DevRails%20account"
          >
            <LifeBuoy size={16} />
            Contact support
          </a>
          <p className="mt-4 font-mono text-[11px] text-ink-muted">// auth/user-disabled · terminal state</p>
        </div>
      </>
    );
  }

  /* ---- default Google-only card (idle / connecting) ---- */

  return (
    <>
      <style>{AUTH_CSS}</style>
      <div>
        <div className="au-card shadow-card">
          <AuthLogo />
          <div className="text-center">
            <h1 className="text-[26px] font-bold tracking-[-0.02em] text-ink">Sign in to DevRails</h1>
            <p className="mt-2 text-[14px] text-ink-soft">Keep your GCP usage on rails — for $1/month.</p>
          </div>

          {notice ? <div className="mt-5">{renderNotice(notice)}</div> : null}

          <button
            className="au-btn au-btn-outline mt-5 h-11 w-full text-[14px] font-medium"
            onClick={startGoogle}
            disabled={phase === "connecting"}
          >
            {phase === "connecting" ? (
              <>
                <Spinner dark />
                Connecting to Google…
              </>
            ) : (
              <>
                <GoogleIcon />
                {notice?.kind === "error" ? "Try again with Google" : "Continue with Google"}
              </>
            )}
          </button>

          <p className="mt-5 text-center text-[12px] leading-[1.6] text-ink-muted">
            By continuing you agree to the{" "}
            <a href="/terms" className="au-link text-[12px]">
              Terms
            </a>{" "}
            and{" "}
            <a href="/privacy" className="au-link text-[12px]">
              Privacy Policy
            </a>
            .
          </p>
        </div>

        <p className="mt-4 text-center font-mono text-[11px] leading-[1.6] text-ink-muted">
          // preview states: /signin?state=err-network · err-popup-blocked · err-cancelled
          <br />
          // err-disabled · redirecting · resolving · info-session-expired
        </p>
      </div>
    </>
  );
}

function StatusCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="au-card shadow-card text-center">
      <AuthLogo />
      <span className="bracket-label" style={{ display: "block", marginBottom: 18 }}>
        {label}
      </span>
      {children}
    </div>
  );
}

function renderNotice(notice: Exclude<Notice, null>) {
  if (notice.kind === "info") {
    return (
      <div
        className="flex items-start gap-2 rounded-[10px] border p-3 text-[13px] leading-[1.5]"
        style={{ borderColor: "rgba(11,61,145,.25)", background: "rgba(11,61,145,.06)", color: "var(--ink-soft)" }}
      >
        <Info size={16} style={{ flexShrink: 0, color: "var(--flame)" }} />
        <span>Your session expired for security. Please sign in again to pick up where you left off.</span>
      </div>
    );
  }
  return (
    <div className="au-callout">
      <AlertTriangle size={16} />
      <span>{ERROR_COPY[notice.variant]}</span>
    </div>
  );
}
