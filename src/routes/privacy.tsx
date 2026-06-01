import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — DevRails" },
      { name: "description", content: "DevRails privacy policy. Placeholder while the product is in active development." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[760px] px-6 py-24 text-ink">
      <Link to="/" className="font-mono text-[12px] text-ink-muted hover:text-flame">
        ← back to DevRails
      </Link>
      <h1 className="mt-6 text-[40px] font-bold tracking-[-0.02em]">Privacy Policy</h1>
      <p className="mt-4 text-[15px] text-ink-soft">
        DevRails is currently in active development. A complete privacy policy
        will be published before early access opens.
      </p>
      <p className="mt-4 text-[15px] text-ink-soft">
        While in development, DevRails collects only the minimum information
        required to operate the waitlist (such as your email address) and to
        send updates you have explicitly opted in to receive. We do not sell
        your data. For any privacy question, please contact Coll-Con.
      </p>
    </main>
  );
}