import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Check, Gauge, Power } from "lucide-react";
import { AuthShell } from "@/components/devrails/auth/authShared";

/* EPIC-016 auth-success stub. Deliberately NOT /dashboard — the real
   dashboard is a separate epic. This only confirms the auth hand-off.
   Session details below are mock values, not a real Firebase session. */

export const Route = createFileRoute("/signed-in")({
  validateSearch: (search: Record<string, unknown>): { email?: string; provider?: string } => ({
    email: typeof search.email === "string" ? search.email : undefined,
    provider: typeof search.provider === "string" ? search.provider : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Signed in — DevRails" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SignedInPage,
});

function SignedInPage() {
  const navigate = useNavigate();
  const { email, provider } = Route.useSearch();

  return (
    <AuthShell>
      <div
        className="shadow-card"
        style={{
          width: 520,
          maxWidth: "calc(100vw - 32px)",
          borderRadius: 22,
          border: "1px solid var(--border)",
          background: "#fff",
          padding: 32,
          textAlign: "center",
        }}
      >
        <span
          className="mx-auto grid h-[52px] w-[52px] place-items-center rounded-full"
          style={{ background: "rgba(53,198,167,.15)", color: "var(--glow)" }}
        >
          <Check size={24} />
        </span>
        <h1 className="mt-4 text-[26px] font-bold tracking-[-0.02em] text-ink">You are signed in</h1>
        <p className="mt-2 text-[14px] text-ink-soft">
          Signed in as <strong className="text-ink">{email || "builder@collcon.dev"}</strong>
        </p>

        <div className="mt-6 rounded-[14px] border border-border bg-surface p-4 text-left">
          <div className="flex items-center justify-between">
            <span className="bracket-label">[ SESSION ]</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2 py-0.5 text-[11px] font-medium text-ink">
              <span
                className="animate-pulse-dot"
                style={{ height: 6, width: 6, borderRadius: 999, background: "var(--glow)" }}
              />
              Active
            </span>
          </div>
          <div className="mt-2.5 font-mono text-[12px] leading-[1.7] text-ink-soft">
            provider: <span className="text-ink">{provider || "password"}</span>
            <br />
            uid: dvr_7f3a…c91e
            <br />
            token: fresh · expires in 60m
          </div>
        </div>

        <div className="mt-6 flex gap-2.5">
          <button
            className="au-btn au-btn-primary shadow-flame h-11 flex-1 text-[14px]"
            onClick={() =>
              alert("Dashboard is a separate epic — this prototype covers EPIC-016 (auth).")
            }
          >
            <Gauge size={16} />
            Go to dashboard
          </button>
          <button className="au-btn au-btn-outline h-11 px-[18px] text-[14px]" onClick={() => navigate({ to: "/signin" })}>
            <Power size={16} />
            Sign out
          </button>
        </div>
      </div>
    </AuthShell>
  );
}
