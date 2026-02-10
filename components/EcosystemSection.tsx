import { getEntriesByCategory, getAllEntries } from "@/lib/ecosystem";
import { CATEGORIES } from "@/lib/types/ecosystem";
import { FadeIn } from "@/components/FadeIn";
import { EcosystemBrowser } from "@/components/EcosystemBrowser";

/**
 * EcosystemSection - Server Component
 *
 * Loads ecosystem entries from JSON files at build time and passes
 * them to the client-side browser component.
 *
 * The "Skills" tab is a cross-cutting view: it aggregates entries from
 * ALL categories that have an install_command, plus any standalone
 * entries in the skills directory.
 */
export function EcosystemSection() {
  // Load entries for each category at build time
  const categoriesWithEntries = CATEGORIES.filter(
    (c) => c.slug !== "skills"
  ).map((categoryMeta) => ({
    category: categoryMeta,
    entries: getEntriesByCategory(categoryMeta.slug),
  })).filter(({ entries }) => entries.length > 0);

  // Build the Skills tab by collecting all entries with install_command
  const allEntries = getAllEntries();
  const skillEntries = allEntries.filter((e) => e.install_command);

  const skillsCategory = CATEGORIES.find((c) => c.slug === "skills")!;
  if (skillEntries.length > 0) {
    categoriesWithEntries.push({
      category: skillsCategory,
      entries: skillEntries,
    });
  }

  return (
    <section id="ecosystem" className="py-20 md:py-28 bg-surface-card/50 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <FadeIn>
          <div className="mb-10">
            <div className="flex items-center justify-between">
              <h2 className="text-text mb-3">
                Ecosystem
              </h2>
              <a
                href="https://github.com/rawgroundbeef/x402.eco"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-mono text-gray hover:text-accent transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
                <span className="hidden md:inline">Contribute</span>
              </a>
            </div>
            <p className="text-gray max-w-xl">
              Everything you need to build with x402.
            </p>
          </div>
        </FadeIn>

        <EcosystemBrowser categoriesWithEntries={categoriesWithEntries} />
      </div>
    </section>
  );
}
