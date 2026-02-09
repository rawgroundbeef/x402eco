import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background text-text">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-header border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <Logo size="sm" />
            <span className="text-2xl text-text leading-none translate-y-[1px] lowercase" style={{ fontFamily: "var(--font-display), 'Bebas Neue', sans-serif", letterSpacing: "2px" }}>x402</span>
          </a>
          <ThemeToggle />
        </div>
      </header>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <h1 className="text-text mb-8">Terms of Use</h1>

        <div className="space-y-8 text-gray leading-relaxed">
          <p className="text-cream">
            Last updated: February 2026
          </p>

          <section className="space-y-4">
            <h2 className="text-text text-2xl">1. Acceptance of Terms</h2>
            <p>
              By accessing and using x402.eco (the "Site"), you accept and agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use the Site.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-text text-2xl">2. Description of Service</h2>
            <p>
              x402.eco is an informational website that provides resources, documentation, and ecosystem information about the x402 protocol. The Site aggregates information about tools, services, and facilitators in the x402 ecosystem.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-text text-2xl">3. No Financial Advice</h2>
            <p>
              Nothing on this Site constitutes financial, investment, legal, or tax advice. The information provided is for general informational purposes only. You should consult with appropriate professionals before making any financial decisions.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-text text-2xl">4. Third-Party Links</h2>
            <p>
              The Site contains links to third-party websites and services. We are not responsible for the content, accuracy, or practices of these external sites. Inclusion of any link does not imply endorsement.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-text text-2xl">5. Intellectual Property</h2>
            <p>
              The x402 protocol is open source. Content on this Site, including text, graphics, and logos, is provided for informational purposes. Trademarks and logos of third-party projects belong to their respective owners.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-text text-2xl">6. Disclaimer of Warranties</h2>
            <p>
              The Site is provided "as is" without warranties of any kind, either express or implied. We do not warrant that the Site will be uninterrupted, error-free, or free of harmful components.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-text text-2xl">7. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Site.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-text text-2xl">8. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use of the Site after changes constitutes acceptance of the modified terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-text text-2xl">9. Contact</h2>
            <p>
              For questions about these Terms of Use, please reach out through our community channels.
            </p>
          </section>
        </div>

        {/* Back link */}
        <div className="mt-16 pt-8 border-t border-border">
          <a href="/" className="text-gray hover:text-accent transition-colors">
            &larr; Back to home
          </a>
        </div>
      </div>
    </main>
  );
}
