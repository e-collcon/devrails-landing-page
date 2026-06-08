import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — DevRails" },
      {
        name: "description",
        content:
          "DevRails privacy policy for the early-access GCP usage monitoring, alerting, and guardrail automation tool.",
      },
    ],
  }),
  component: PrivacyPage,
});

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-[24px] font-semibold tracking-[-0.01em] text-ink">
        {title}
      </h2>
      <div className="space-y-4 text-[15px] leading-7 text-ink-soft">
        {children}
      </div>
    </section>
  );
}

function BulletList({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc space-y-2 pl-6">{children}</ul>;
}

function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto w-full max-w-[820px] px-6 py-16 md:py-24">
        <Link
          to="/"
          className="font-mono text-[12px] text-ink-muted transition-colors hover:text-flame"
        >
          ← back to DevRails
        </Link>

        <header className="mt-8 border-b border-border pb-8">
          <h1 className="text-[40px] font-bold tracking-[-0.02em] text-ink md:text-[52px]">
            DevRails Privacy Policy
          </h1>
          <p className="mt-4 text-[15px] text-ink-muted">
            Effective Date: June 9, 2026
          </p>
          <div className="mt-6 space-y-4 text-[16px] leading-7 text-ink-soft">
            <p>
              Welcome to DevRails! This Privacy Policy explains how DevRails
              (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects,
              uses, shares, and handles your information. DevRails is an
              early-stage cloud usage monitoring, alerting, and automated
              guardrail tool.
            </p>
            <p>
              DevRails is part of the Coll-Con ecosystem and is currently
              operated by the founder of Coll-Con as a sole proprietorship. If
              Coll-Con later incorporates, reorganizes, or transfers operation
              of DevRails to a legal entity, all references to &quot;we,&quot;
              &quot;us,&quot; or &quot;our&quot; in this policy will refer to
              that successor entity.
            </p>
            <p>
              <strong className="text-ink">Important Note:</strong> DevRails is
              an independent software product. We are not affiliated with,
              endorsed by, sponsored by, or governed by Google LLC or Google
              Cloud Platform (GCP).
            </p>
          </div>
        </header>

        <div className="mt-10 space-y-12">
          <Section title="1. Information We Collect Today (Waitlist Phase)">
            <p>
              Because DevRails is currently in active development and early
              access, our data collection is currently limited to waitlist
              operations and basic website hosting.
            </p>

            <BulletList>
              <li>
                <strong className="text-ink">
                  Information you provide directly:
                </strong>{" "}
                When you join our waitlist, we collect your email address
                (required), as well as optional information you choose to share,
                such as your name, role, primary GCP concerns, the number of GCP
                projects you manage, and your consent to receive early-access
                updates.{" "}
                <strong className="text-ink">
                  Please do not submit sensitive personal information through
                  the waitlist form or support channels unless we specifically
                  request it.
                </strong>
              </li>
              <li>
                <strong className="text-ink">
                  Information collected automatically:
                </strong>{" "}
                Our hosting and database providers, such as Vercel and
                Supabase, automatically collect basic technical metadata when
                you visit our site. This includes your IP address, browser type,
                device information, timestamp data, and standard server logs
                necessary for security and debugging.
              </li>
              <li>
                <strong className="text-ink">Storage Location:</strong> Our
                current waitlist database is hosted through Supabase in the
                United States, us-east-1 / North Virginia.
              </li>
            </BulletList>
          </Section>

          <Section title="2. Information We May Collect Later (Product Launch Phase)">
            <p>
              As we launch product access, our data collection will expand to
              operate the DevRails tool. We may collect:
            </p>

            <BulletList>
              <li>
                <strong className="text-ink">Account & Billing Data:</strong>{" "}
                Authentication details, subscription status, and payment
                metadata, processed via third parties; we do not store full
                credit card numbers.
              </li>
              <li>
                <strong className="text-ink">GCP Environment Data:</strong> GCP
                project identifiers, connection metadata, threshold
                configurations, guardrail/killswitch settings, and specific
                usage metrics, such as Cloud Run traffic and Cloud Functions
                invocations, needed to trigger alerts.
              </li>
              <li>
                <strong className="text-ink">Operational Logs:</strong> Alert
                histories, automated action histories, audit logs, support
                messages, and basic product usage analytics, such as which
                features are used or where errors occur.
              </li>
              <li>
                <strong className="text-ink">Community Feedback:</strong>{" "}
                Information you share if you participate in our Discord or pilot
                feedback groups.
              </li>
            </BulletList>

            <p className="rounded-[16px] border border-border bg-white p-4 italic text-ink-soft shadow-soft">
              Security Note: DevRails will not require you to submit raw GCP
              secret keys through our public landing page. Future GCP
              connections will utilize supported mechanisms like OAuth, service
              accounts, or Workload Identity Federation.
            </p>
          </Section>

          <Section title="3. How We Use Your Information">
            <p>We use the information we collect to:</p>

            <BulletList>
              <li>
                Manage waitlist signups and send early-access or product
                updates. We may use your email address to prevent duplicate
                waitlist submissions and manage your waitlist status.
              </li>
              <li>
                Understand product demand to improve the DevRails roadmap.
              </li>
              <li>
                Operate, secure, and debug the{" "}
                <a
                  href="https://www.thecollcon.com"
                  className="text-flame hover:text-flame-hover"
                >
                  www.thecollcon.com
                </a>{" "}
                website.
              </li>
              <li>
                Provide product access, monitor supported GCP usage signals,
                send alerts, and trigger user-enabled guardrails once the
                product is live.
              </li>
              <li>Manage subscriptions and process payments.</li>
              <li>
                Provide customer support and detect platform abuse or security
                threats.
              </li>
              <li>Comply with legal and accounting obligations.</li>
            </BulletList>
          </Section>

          <Section title="4. Legal Bases & Your Privacy Rights">
            <p>
              We process your data based on several legal grounds: your{" "}
              <strong className="text-ink">consent</strong>, such as joining the
              waitlist; to fulfill a{" "}
              <strong className="text-ink">contract</strong>, such as providing
              the DevRails service to registered users; for our{" "}
              <strong className="text-ink">legitimate interests</strong>, such
              as security, debugging, and product improvement; and to comply
              with <strong className="text-ink">legal obligations</strong>.
            </p>

            <p>
              Depending on your location, including users protected by the GDPR
              or California privacy laws, you may have the right to:
            </p>

            <BulletList>
              <li>
                <strong className="text-ink">Access</strong> the personal
                information we hold about you.
              </li>
              <li>
                <strong className="text-ink">Correct</strong> inaccurate or
                incomplete data.
              </li>
              <li>
                <strong className="text-ink">Delete</strong> your personal
                information.
              </li>
              <li>
                <strong className="text-ink">Restrict or Object</strong> to
                certain processing of your data.
              </li>
              <li>
                <strong className="text-ink">Export</strong> your data in a
                portable format.
              </li>
              <li>
                <strong className="text-ink">Withdraw Consent</strong> at any
                time, such as unsubscribing from emails.
              </li>
              <li>
                <strong className="text-ink">Non-Discrimination:</strong> You
                will not be penalized or charged different rates for exercising
                your privacy rights.
              </li>
            </BulletList>

            <p>
              <strong className="text-ink">
                We do not sell your personal information.
              </strong>{" "}
              We also do not share it for cross-context behavioral advertising
              unless clearly disclosed in the future. To exercise any of these
              rights, please contact us at{" "}
              <a
                href="mailto:support@thecollcon.com"
                className="text-flame hover:text-flame-hover"
              >
                support@thecollcon.com
              </a>
              . We may ask for information reasonably necessary to verify your
              identity before fulfilling a privacy request.
            </p>
          </Section>

          <Section title="5. Sharing and Third-Party Service Providers">
            <p>
              We do not operate our own physical servers. We share data only
              with third-party service providers necessary to run DevRails:
            </p>

            <BulletList>
              <li>
                <strong className="text-ink">Supabase:</strong> For database
                and waitlist storage.
              </li>
              <li>
                <strong className="text-ink">Vercel:</strong> For website
                hosting and deployment.
              </li>
              <li>
                <strong className="text-ink">Future Providers:</strong> We may
                integrate providers like Stripe for payments, email delivery
                services, Telegram for alert delivery, or product analytics
                tools as the platform grows. We will also interact with Google
                Cloud APIs specifically to provide the monitoring features you
                request.
              </li>
            </BulletList>

            <p>
              These providers are authorized to process your data only as
              necessary to provide their specific services to us.
            </p>
          </Section>

          <Section title="6. International Data Transfers">
            <p>
              DevRails is operated from the Republic of Indonesia, but our
              infrastructure relies on global cloud providers. Currently, our
              Supabase database is hosted in the United States, us-east-1 /
              North Virginia. By using our website or joining our waitlist, you
              understand and acknowledge that your information may be transferred
              to, stored, and processed in the United States and other regions
              outside your country of residence.
            </p>
          </Section>

          <Section title="7. Data Retention">
            <BulletList>
              <li>
                <strong className="text-ink">Waitlist Data:</strong> Retained
                until you unsubscribe, request deletion, or we no longer need it
                to communicate early access updates.
              </li>
              <li>
                <strong className="text-ink">Future Product Data:</strong>{" "}
                Account data is retained while your account is active. Billing
                records are kept as required by tax and accounting laws. GCP
                usage metrics will be designed for short retention periods where
                practical. Audit and action logs may be retained longer to help
                you trace alerts and security events. Routine backups are kept
                for a limited time before being overwritten.
              </li>
            </BulletList>

            <p>
              We may delete records that are no longer needed for early access,
              security, operations, or legal purposes.
            </p>
          </Section>

          <Section title="8. Security">
            <p>
              We use reasonable technical safeguards to protect your data,
              including limited access controls, Row Level Security (RLS) on
              databases, and secure environment variables for system
              configurations. However, no method of digital transmission or
              storage is perfectly secure, and we cannot guarantee absolute
              security. Data collected through our service will be handled as
              described in this Privacy Policy.
            </p>
          </Section>

          <Section title="9. GCP Data Boundaries">
            <p>If you connect GCP projects to DevRails in the future:</p>

            <BulletList>
              <li>
                We only access the metrics and data signals strictly needed to
                provide supported features.
              </li>
              <li>
                You control which environments you connect and are responsible
                for reviewing the permissions you grant.
              </li>
              <li>
                We recommend a least-privilege approach to granting permissions.
              </li>
              <li>
                DevRails does not claim any ownership over your GCP data, source
                code, or cloud architecture.
              </li>
            </BulletList>
          </Section>

          <Section title="10. Communications">
            <p>
              We may send you waitlist updates, early-access invitations,
              product announcements, and service messages. You can unsubscribe
              from marketing or waitlist updates at any time by clicking the
              link at the bottom of our emails. Please note that this
              unsubscribe mechanism may not apply to operational notices. If you
              become an active product user, we may still send you mandatory
              operational, security, and billing notices.
            </p>
          </Section>

          <Section title="11. Children's Privacy">
            <p>
              DevRails is a business and developer tool. It is not intended for
              use by children, and we do not knowingly collect personal
              information from children. You must be legally able to enter into
              binding agreements to use our services.
            </p>
          </Section>

          <Section title="12. Changes to This Policy">
            <p>
              Because DevRails is in active development, this Privacy Policy
              will evolve. We will update this page as our data practices
              change, and we will notify active users of material changes where
              reasonable, for example, via email.
            </p>
          </Section>

          <Section title="13. Contact Us">
            <p>
              If you have any questions about this Privacy Policy or your data
              rights, please contact us at{" "}
              <a
                href="mailto:support@thecollcon.com"
                className="text-flame hover:text-flame-hover"
              >
                support@thecollcon.com
              </a>
              .
            </p>
          </Section>
        </div>
      </section>
    </main>
  );
}