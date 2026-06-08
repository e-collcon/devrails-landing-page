import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms — DevRails" },
      {
        name: "description",
        content:
          "DevRails terms of service for the early-access GCP usage monitoring, alerting, and guardrail automation tool.",
      },
    ],
  }),
  component: TermsPage,
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

function Subsection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <h3 className="text-[18px] font-semibold tracking-[-0.01em] text-ink">
        {title}
      </h3>
      <div className="space-y-3 text-[15px] leading-7 text-ink-soft">
        {children}
      </div>
    </div>
  );
}

function BulletList({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc space-y-2 pl-6">{children}</ul>;
}

function TermsPage() {
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
            DevRails Terms of Service
          </h1>
          <p className="mt-4 text-[15px] text-ink-muted">
            Last Updated: June 9, 2026
          </p>
          <p className="mt-6 text-[16px] leading-7 text-ink-soft">
            Welcome to DevRails! Please read these Terms of Service
            (&quot;Terms&quot;) carefully before using our platform.
          </p>
        </header>

        <div className="mt-10 space-y-12">
          <Section title="1. About the Service and Operating Status">
            <p>
              DevRails is a cloud usage monitoring, alerting, reporting, and
              optional guardrail automation tool for Google Cloud Platform (GCP)
              users. It is designed to help builders, indie hackers, and
              development teams detect and mitigate unexpected resource usage
              spikes.
            </p>

            <BulletList>
              <li>
                <strong className="text-ink">Operating Status:</strong>{" "}
                DevRails is currently operated by the founder of Coll-Con as a
                sole proprietorship. If Coll-Con later incorporates,
                reorganizes, or transfers operation of DevRails to a legal
                entity, references to &quot;Coll-Con,&quot; &quot;DevRails,&quot;
                &quot;we,&quot; &quot;us,&quot; or &quot;our&quot; will
                automatically refer to that successor entity.
              </li>
              <li>
                <strong className="text-ink">Early Access Phase:</strong>{" "}
                DevRails is currently in active development, early access, and
                pilot phases. Features, dashboard tools, polling loops, and
                supported integrations are subject to frequent updates and
                experimentation.
              </li>
              <li>
                <strong className="text-ink">Relationship to Google:</strong>{" "}
                DevRails is an independent software tool.{" "}
                <strong className="text-ink">
                  Google is not an arbitrator, governing body,
                  dispute-resolution authority, partner, sponsor, or legal
                  authority for DevRails.
                </strong>
              </li>
            </BulletList>
          </Section>

          <Section title="2. Eligibility">
            <p>
              You must be legally able to enter into these Terms and use cloud
              infrastructure services in your jurisdiction. If you use DevRails
              on behalf of a team, company, school, or organization, you
              represent and warrant that you have the explicit authority to bind
              that entity to these Terms.
            </p>
          </Section>

          <Section title="3. Service Scope and Supported Services Only">
            <p>
              DevRails does not manage your cloud architecture or act as a
              financial insurer against your cloud bills. It reduces risk but
              does not eliminate it.
            </p>

            <BulletList>
              <li>
                <strong className="text-ink">Supported Coverage:</strong>{" "}
                DevRails only monitors explicitly supported GCP metrics and
                modules. Our active early-access scope targets:
                <ul className="mt-2 list-disc space-y-2 pl-6">
                  <li>
                    <strong className="text-ink">Cloud Run:</strong> To catch
                    zombie traffic loops or high-volume execution surges.
                  </li>
                  <li>
                    <strong className="text-ink">Cloud Functions:</strong> To
                    detect runaway recursive execution chains.
                  </li>
                  <li>
                    <strong className="text-ink">App Engine:</strong> To
                    support basic legacy application monitoring.
                  </li>
                  <li>
                    <strong className="text-ink">Pub/Sub:</strong> To avoid
                    bill spikes stemming from unexpected high-velocity messaging
                    volume.
                  </li>
                </ul>
              </li>
              <li>
                <strong className="text-ink">Exclusions:</strong> Coll-Con is
                not responsible for cloud costs generated by unsupported GCP
                services, unsupported metrics, GCP API changes, or billing
                bursts occurring outside our supported modules.
              </li>
            </BulletList>

            <p className="rounded-[16px] border border-danger-border bg-danger-soft p-4 text-danger-text">
              <strong>Critical Production Warning:</strong> DevRails is not
              intended to be blindly enabled on critical production workloads
              without thorough testing, review, and a complete understanding of
              the potential technical and operational consequences.
            </p>
          </Section>

          <Section title="4. GCP Connection and Permissions">
            <p>
              Users must connect their GCP environments to DevRails using our
              supported connection mechanisms, such as automated service
              accounts, APIs, OAuth, or Workload Identity Federation.
            </p>

            <BulletList>
              <li>
                <strong className="text-ink">Least Privilege:</strong> Users
                are responsible for reviewing requested permissions and should
                follow industry least-privilege practices when connecting
                environments.
              </li>
              <li>
                <strong className="text-ink">Configuration Failure:</strong>{" "}
                DevRails can only monitor or act within the exact permissions
                granted by the user. Missing, revoked, excessive, or
                misconfigured permissions may cause DevRails to fail entirely,
                behave unexpectedly, or execute guardrail actions in an
                unintended manner.
              </li>
            </BulletList>
          </Section>

          <Section title="5. Data Polling and Service Availability">
            <p>
              DevRails does not offer real-time infrastructure enforcement. We
              poll usage signals periodically, typically every 5 to 10 minutes,
              but intervals fluctuate based on system health and API boundaries.
              Massive cloud billing spikes can occur completely between polling
              windows.
            </p>

            <p>
              We do not guarantee uninterrupted or error-free operations.
              DevRails availability or performance may become degraded or
              temporarily unavailable due to:
            </p>

            <BulletList>
              <li>
                Scheduled or emergency maintenance, deployment updates, or
                system upgrades.
              </li>
              <li>
                Unexpected software bugs, errors, or early-access instability.
              </li>
              <li>
                Third-party infrastructure provider outages, security incidents,
                or deployment errors.
              </li>
              <li>
                GCP API changes, response timeouts, or temporary cloud network
                failures.
              </li>
            </BulletList>
          </Section>

          <Section title="6. Alert Mechanisms and Delivery Dependencies">
            <p>
              When thresholds are breached, DevRails attempts to distribute
              alerts through channels like Email or Telegram. However,
              notifications can fail, bounce, or experience delays due to:
            </p>

            <BulletList>
              <li>
                Third-party network outages, messaging rate limits, or webhook
                transmission failures.
              </li>
              <li>
                Overzealous local email filters, spam folders, or incorrect user
                routing configurations.
              </li>
            </BulletList>

            <p>
              Users are solely responsible for keeping their destination alert
              channels active, verified, and consistently monitored.
            </p>
          </Section>

          <Section title="7. Soft Killswitch and Hard Killswitch Guardrails">
            <p>
              If you choose to activate automated guardrail actions, you
              acknowledge and agree to the following operational behaviors:
            </p>

            <BulletList>
              <li>
                <strong className="text-ink">Soft Killswitch:</strong> May
                reduce selected configuration quotas, set designated API quotas
                to zero, limit baseline usage, or apply other reversible
                guardrail limits. This is intended to mitigate runaways but will
                cause localized service degradation and application errors.
              </li>
              <li>
                <strong className="text-ink">Hard Killswitch:</strong> May
                detach billing profiles, disable selected services, scale
                compute resources completely down to zero, or perform other
                highly disruptive actions depending on implementation.{" "}
                <strong className="text-ink">
                  A hard killswitch requires your explicit opt-in and manual
                  confirmation.
                </strong>{" "}
                This action will cause immediate application downtime and
                potential process data disruption.
              </li>
            </BulletList>

            <p>
              <strong className="text-ink">
                Coll-Con is not responsible for any downtime, lost revenue, lost
                data, system interruption, or business impact caused by
                guardrail actions enabled by the user.
              </strong>{" "}
              Users must thoroughly test these behaviors before relying on them.
            </p>
          </Section>

          <Section title="8. Pricing, Subscription, and Fair Use">
            <Subsection title="A. Pricing">
              <p>
                Our early access base plan is set at $1/month or $10/year,
                covering up to 5 monitored GCP projects. Additional blocks of 5
                monitored environments are priced at an added +$1/month or
                +$10/year.
              </p>
            </Subsection>

            <Subsection title="B. No Refunds">
              <p>
                Unless required by applicable law or expressly stated otherwise,
                all payments made to DevRails are strictly non-refundable.
              </p>
            </Subsection>

            <Subsection title="C. Fair Use">
              <p>
                Our ultra-low price structure assumes normal, lightweight
                infrastructure monitoring. To preserve system stability, we may
                enforce caps on environment complexity, polling frequency,
                metric coverage, or notification volume. Abusive, excessive, or
                unusually massive cloud environments may result in plan changes,
                account throttling, or service limitations.
              </p>
            </Subsection>

            <Subsection title="D. Payment Processing">
              <p>
                Payments may be processed securely by third-party payment
                processors, including Stripe or other enterprise transaction
                providers we choose to utilize in the future.
              </p>
            </Subsection>

            <Subsection title="E. Pricing and Service Changes">
              <p>
                We reserve the right to change our pricing, plan structures,
                asset limits, or fair-use policies in the future. Where required
                or reasonable, we will provide you with clear advance notice
                before material pricing updates take effect.
              </p>
            </Subsection>
          </Section>

          <Section title="9. Account Cancellation and Deletion">
            <p>
              You may cancel active subscriptions, stop using the platform,
              request waitlist removal, or ask for account deletion at any time
              via your settings panel or by contacting support.
            </p>
            <p>
              Upon an account closure request, we delete personal records in
              accordance with our system design. However, please note that some
              technical records may be securely retained where reasonably
              necessary for fraud prevention, legal compliance, billing
              verification, dispute resolution, or essential operational backups.
            </p>
          </Section>

          <Section title="10. Acceptable Use">
            <p>
              You agree that you will not use DevRails to engage in harmful,
              disruptive, or unlawful activities. Specifically, you must not:
            </p>

            <BulletList>
              <li>
                Attack, probe, or attempt to overload the DevRails application
                or infrastructure.
              </li>
              <li>
                Connect GCP environments or billing projects that you do not
                legally own or manage.
              </li>
              <li>
                Attempt unauthorized access to other user accounts, servers, or
                metadata layers.
              </li>
              <li>
                Scrape, crawl, harvest data from, or reverse engineer any
                portion of the service.
              </li>
              <li>
                Intentionally submit false, altered, or malicious metric and
                logging data.
              </li>
              <li>
                Bypass system resource limits, abuse access APIs, or use the
                platform to violate regional laws.
              </li>
            </BulletList>
          </Section>

          <Section title="11. Third-Party Dependencies">
            <p>
              DevRails relies on external third-party infrastructure providers
              to run its core systems, including cloud hosting platforms,
              database managers, payment processors, email deployment engines,
              analytics suites, and chat applications like Telegram. You
              acknowledge that these external dependencies directly affect the
              delivery, timing, performance, and data processing of our
              application features.
            </p>
          </Section>

          <Section title="12. Intellectual Property and Feedback Rights">
            <p>
              Coll-Con owns all rights, titles, source code, design elements,
              visual branding, and system property linked to DevRails. You
              retain full ownership over your cloud account data and
              infrastructure project metadata.
            </p>
            <p>
              If you submit product feedback, feature requests, or optimization
              suggestions, you grant Coll-Con an unrestricted, perpetual,
              royalty-free license to implement those ideas to improve the
              software without any financial obligation to you.
            </p>
          </Section>

          <Section title="13. Privacy Cross-Reference">
            <p>
              Our collection, storage, and use of your personal information is
              described comprehensively in our{" "}
              <Link to="/privacy" className="text-flame hover:text-flame-hover">
                Privacy Policy
              </Link>
              . By using DevRails, joining our launch waitlists, or linking your
              developer configurations, you acknowledge that your data will be
              handled in accordance with that Privacy Policy.
            </p>
          </Section>

          <Section title="14. Warranty Disclaimer and Limitation of Liability">
            <p className="font-semibold uppercase text-ink">
              DevRails is provided on an “as is” and “as available” basis. To
              the maximum extent permitted by applicable law, Coll-Con disclaims
              all warranties, express or implied. In no event shall Coll-Con be
              liable for any indirect, incidental, special, or consequential
              damages—including, but not limited to, actual Google Cloud billing
              surges, lost revenue, project business downtime, corrupted data,
              or total infrastructure interruption—arising out of or connected
              to your operation of this software.
            </p>
          </Section>

          <Section title="15. Governing Law and Dispute Resolution">
            <p>
              These Terms are governed entirely by the laws of the Republic of
              Indonesia. Any operational legal disputes or claims arising out of
              your relationship with DevRails will be resolved exclusively in the
              competent courts of Jakarta, Indonesia, unless applicable regional
              law strictly requires otherwise.
            </p>
          </Section>

          <Section title="16. Contact Information">
            <p>
              For questions regarding these terms, subscription cancellations,
              or data requests, please contact us directly at our official
              support email:{" "}
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