import { createFileRoute } from "@tanstack/react-router";
import { AuthShell } from "@/components/devrails/auth/authShared";
import { SignInFlow } from "@/components/devrails/auth/SignInFlow";

/* =====================================================================
   EPIC-016 /signin — GOOGLE-ONLY sign-in card (PRD-001 scope), routed
   page shell (TASK-154). This full page is the fallback for direct
   links/reloads; the landing page's Get Started / Log In CTAs open the
   same SignInFlow inside an on-page modal (see
   src/components/devrails/auth/AuthModal.tsx) instead of navigating
   here. All state-machine logic lives in SignInFlow so both surfaces
   stay in sync.
===================================================================== */

export const Route = createFileRoute("/signin")({
  validateSearch: (search: Record<string, unknown>): { reason?: string; state?: string } => ({
    reason: typeof search.reason === "string" ? search.reason : undefined,
    state: typeof search.state === "string" ? search.state : undefined,
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

function SignInPage() {
  const { reason, state } = Route.useSearch();
  return (
    <AuthShell>
      <SignInFlow initialReason={reason} initialState={state} />
    </AuthShell>
  );
}
