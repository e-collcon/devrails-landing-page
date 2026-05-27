import { createFileRoute } from "@tanstack/react-router";
import { DevRailsLanding } from "@/components/devrails/DevRailsLanding";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DevRails — Stay in GCP free tier for $1/month" },
      {
        name: "description",
        content:
          "DevRails is lightweight GCP FinOps for builders. Stay inside the free tier — or under your own monthly cap — for $1/month. Coming soon from Coll-Con.",
      },
      { property: "og:title", content: "DevRails — GCP FinOps for builders" },
      {
        property: "og:description",
        content:
          "Stay inside the GCP free tier or cap your monthly bill — for $1/month. By builders, for builders.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: DevRailsLanding,
});
