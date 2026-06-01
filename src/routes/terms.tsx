import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms — DevRails" },
      { name: "description", content: "DevRails terms of service. Placeholder while the product is in active development." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[760px] px-6 py-24 text-ink">
      <Link to="/" className="font-mono text-[12px] text-ink-muted hover:text-flame">
        ← back to DevRails
      </Link>
      <h1 className="mt-6 text-[40px] font-bold tracking-[-0.02em]">Terms</h1>
      <p className="mt-4 text-[15px] text-ink-soft">
        DevRails is currently in active development. Final terms of service
        will be published before early access opens.
      </p>
      <p className="mt-4 text-[15px] text-ink-soft">
        Joining the waitlist does not guarantee access or pricing. Pricing,
        features, and availability may change before launch.
      </p>
    </main>
  );
}