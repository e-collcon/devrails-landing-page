import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Mail, Check } from "lucide-react";
import { AuthShell, Spinner, validEmail } from "@/components/devrails/auth/authShared";

/* EPIC-016 /reset — password reset request. Pre-wiring UI only: no email
   is actually sent. Deliberately privacy-safe ("If an account exists…"),
   so it never confirms whether an address is registered. */

export const Route = createFileRoute("/reset")({
  head: () => ({
    meta: [
      { title: "Reset password — DevRails" },
      { name: "description", content: "Reset your DevRails password." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResetPage,
});

function ResetPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [sentTo, setSentTo] = useState("");
  const [resent, setResent] = useState(false);

  function doReset() {
    setEmailErr("");
    const e = email.trim();
    if (!e) {
      setEmailErr("Email is required.");
      return;
    }
    if (!validEmail(e)) {
      setEmailErr("That does not look like a valid email address.");
      return;
    }
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      setSentTo(e);
    }, 900);
  }

  function resend() {
    setResent(true);
    setTimeout(() => setResent(false), 2500);
  }

  return (
    <AuthShell>
      <div className="au-card shadow-card">
        {!sentTo ? (
          <>
            <div className="text-center">
              <span
                className="mx-auto grid h-11 w-11 place-items-center rounded-[12px]"
                style={{ background: "rgba(11,61,145,.1)", color: "var(--flame)" }}
              >
                <Mail size={20} />
              </span>
              <h1 className="mt-4 text-[26px] font-bold tracking-[-0.02em] text-ink">Reset your password</h1>
              <p className="mt-2 text-[14px] leading-[1.55] text-ink-soft">
                Enter your account email and we will send a reset link.
              </p>
            </div>

            <form
              className="mt-5 flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                doReset();
              }}
            >
              <div className={`au-field${emailErr ? " show-err" : ""}`}>
                <label className="au-lbl">Email</label>
                <input
                  className="au-in"
                  type="email"
                  placeholder="you@yourdomain.dev"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailErr ? <span className="au-field-err">{emailErr}</span> : null}
              </div>
              <button className="au-btn au-btn-primary shadow-flame h-11 w-full text-[14px]" type="submit" disabled={busy}>
                {busy ? <Spinner /> : "Send reset link"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <span
              className="mx-auto grid h-11 w-11 place-items-center rounded-full"
              style={{ background: "rgba(53,198,167,.15)", color: "var(--glow)" }}
            >
              <Check size={20} />
            </span>
            <h1 className="mt-4 text-[22px] font-bold tracking-[-0.02em] text-ink">Check your inbox</h1>
            <p className="mt-2 text-[14px] leading-[1.55] text-ink-soft">
              If an account exists for <strong className="text-ink">{sentTo}</strong>, a password reset link is on its way.
            </p>
            <p className="mt-4 font-mono text-[11px] text-ink-muted">// link expires in 60 minutes</p>
            <button className="au-btn au-btn-outline mt-5 h-10 w-full text-[13px]" onClick={resend} disabled={resent}>
              {resent ? "Sent ✓" : "Resend email"}
            </button>
          </div>
        )}

        <p className="mt-5 text-center text-[13px] text-ink-soft">
          <span className="au-link" onClick={() => navigate({ to: "/signin" })}>
            ← Back to sign in
          </span>
        </p>
      </div>
    </AuthShell>
  );
}
