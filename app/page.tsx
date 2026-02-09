import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/FadeIn";
import { EcosystemSection } from "@/components/EcosystemSection";
import {
  HomeClientProvider,
  EducationalDialogContainer,
  HeroInfoButtons,
  FacilitatorsSection,
  ThesisInfoButton,
} from "@/components/HomeClient";
import {
  stats,
  facilitators,
  educationalContent,
} from "@/lib/data";

export default function Home() {
  return (
    <HomeClientProvider facilitators={facilitators} educationalContent={educationalContent}>
      <main className="min-h-screen bg-background text-text">
        <EducationalDialogContainer />

      {/* Sticky Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-header">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size="sm" />
            <span className="text-xl font-serif text-text">x402</span>
          </div>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6">
              <a href="#ecosystem" className="text-sm text-text-muted hover:text-text transition-colors">
                Ecosystem
              </a>
              <a href="#facilitators" className="text-sm text-text-muted hover:text-text transition-colors">
                Facilitators
              </a>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* ============================================ */}
      {/* SECTION 1: HERO */}
      {/* ============================================ */}
      <section className="relative overflow-hidden noise-texture">
        <div className="max-w-6xl mx-auto px-4 md:px-8 pt-12 pb-20 md:pt-16 md:pb-28">

          {/* Hero Content */}
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <h1 className="text-4xl md:text-6xl lg:text-7xl text-text mb-6">
                The Payment Layer
                <br />
                for AI Agents
              </h1>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-lg md:text-xl text-text-muted leading-relaxed mb-8 text-balance">
                x402 enables AI agents to autonomously pay for resources and
                services across the internet. No API keys. No subscriptions.
                Just seamless, pay-per-use access to any monetized endpoint.
              </p>
            </FadeIn>
            <HeroInfoButtons />
          </div>

          {/* Stats Row */}
          <FadeInStagger className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            {[
              { label: "Total Volume", ...stats.totalVolume },
              { label: "Active Resources", ...stats.activeResources },
              { label: "Transactions (24h)", ...stats.transactions24h },
              { label: "Facilitators", ...stats.facilitators },
            ].map((stat) => (
              <FadeInStaggerItem
                key={stat.label}
                className="bg-card border border-border rounded-xl p-4 md:p-6 card-hover"
              >
                <p className="text-xs md:text-sm text-text-muted uppercase tracking-wide mb-1">
                  {stat.label}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl md:text-3xl font-serif text-text">
                    {stat.value}
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      stat.positive ? "text-success" : "text-warning"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
              </FadeInStaggerItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 2: RESOURCES & SERVERS - ARCHIVED */}
      {/* See components/ServersResourcesSection.tsx to re-enable */}
      {/* ============================================ */}

      {/* ============================================ */}
      {/* SECTION 3: ECOSYSTEM */}
      {/* ============================================ */}
      <EcosystemSection />

      {/* ============================================ */}
      {/* SECTION 4: FACILITATORS */}
      {/* ============================================ */}
      <FacilitatorsSection />

      {/* ============================================ */}
      {/* SECTION 5: THESIS */}
      {/* ============================================ */}
      <section className="py-16 md:py-24 bg-card/50">
        <div className="max-w-3xl mx-auto px-4 md:px-8 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl text-text mb-8">
              Why This Matters
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="prose prose-lg mx-auto text-text-muted">
              <p className="text-lg leading-relaxed mb-6">
                The internet was built for humans. Pages, forms, subscriptions,
                API keys—all designed for people to navigate and negotiate. But
                AI agents don&apos;t work like that. They need to access resources
                programmatically, instantly, and at massive scale.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                x402 creates a new primitive: the ability for any software agent
                to pay for any resource, in real-time, with no pre-negotiation.
                It&apos;s HTTP extended with native payments.
              </p>
              <p className="text-xl leading-relaxed mb-8 text-text font-serif italic">
                &ldquo;In five years, more economic activity will happen between
                machines than between humans and machines.&rdquo;
              </p>
              <p className="text-lg leading-relaxed">
                x402 is the infrastructure that makes this possible. It&apos;s how
                agents will pay for compute, data, inference, and every other
                resource they need to be useful.
              </p>
            </div>
          </FadeIn>
          <ThesisInfoButton />
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 6: GET STARTED */}
      {/* ============================================ */}
      <section id="get-started" className="py-16 md:py-24 bg-dark-bg text-white relative overflow-hidden scroll-mt-16">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-8 relative">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl mb-3">Get Started</h2>
              <p className="text-white/60">Three paths into the x402 ecosystem</p>
            </div>
          </FadeIn>

          <FadeInStagger className="grid md:grid-cols-3 gap-6" staggerDelay={0.15}>
            {/* Build with x402 */}
            <FadeInStaggerItem>
              <div className="bg-dark-card rounded-xl p-6 border border-white/10">
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-serif mb-2">Build with x402</h3>
              <p className="text-white/60 text-sm mb-6">
                Add payment capabilities to your AI agents with our SDKs and
                tooling.
              </p>
              <div className="space-y-3">
                <a
                  href="https://x402.org/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/80 hover:text-accent transition-colors"
                >
                  <span>Documentation</span>
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
                <a
                  href="https://github.com/anthropics/x402-fetch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/80 hover:text-accent transition-colors"
                >
                  <span>x402-fetch SDK</span>
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
                <a
                  href="https://github.com/coinbase/agentkit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/80 hover:text-accent transition-colors"
                >
                  <span>AgentKit</span>
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
                </div>
              </div>
            </FadeInStaggerItem>

            {/* Monetize Your API */}
            <FadeInStaggerItem>
              <div className="bg-dark-card rounded-xl p-6 border border-white/10">
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-serif mb-2">Monetize Your API</h3>
              <p className="text-white/60 text-sm mb-6">
                Turn any API into a paid resource with our server middleware
                and facilitator integrations.
              </p>
              <div className="space-y-3">
                <a
                  href="https://github.com/anthropics/x402-server"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/80 hover:text-accent transition-colors"
                >
                  <span>Server SDK</span>
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
                <a
                  href="https://x402jobs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/80 hover:text-accent transition-colors"
                >
                  <span>List on x402jobs</span>
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
                <a
                  href="https://openfacilitator.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/80 hover:text-accent transition-colors"
                >
                  <span>OpenFacilitator</span>
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                    </svg>
                  </a>
                </div>
              </div>
            </FadeInStaggerItem>

            {/* Join the Community */}
            <FadeInStaggerItem>
              <div className="bg-dark-card rounded-xl p-6 border border-white/10">
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-serif mb-2">Join the Community</h3>
                <p className="text-white/60 text-sm mb-6">
                  Connect with builders, learn from experts, and shape the future
                  of agent payments.
                </p>
                <div className="space-y-3">
                  <a
                    href="https://agentbuilders.club"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-white/80 hover:text-accent transition-colors"
                  >
                    <span>Agent Builders Club</span>
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
                <a
                  href="https://discord.gg/x402"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/80 hover:text-accent transition-colors"
                >
                  <span>Discord</span>
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
                <a
                  href="https://twitter.com/x402protocol"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/80 hover:text-accent transition-colors"
                >
                  <span>Twitter</span>
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                    </svg>
                  </a>
                </div>
              </div>
            </FadeInStaggerItem>
          </FadeInStagger>

          {/* Footer */}
          <FadeIn delay={0.3}>
            <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Logo size="sm" />
                <span className="text-white/60 text-sm">
                  x402.eco — The Payment Layer for AI Agents
                </span>
              </div>
              <div className="flex items-center gap-6">
                <a
                  href="https://www.x402.org/x402-whitepaper.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Whitepaper
                </a>
                <a
                  href="https://x402.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  x402.org
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
    </HomeClientProvider>
  );
}
