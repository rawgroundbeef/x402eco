import { getEntriesByCategory } from "@/lib/ecosystem";
import { CATEGORIES } from "@/lib/types/ecosystem";
import { FadeIn } from "@/components/FadeIn";
import { EcosystemBrowser } from "@/components/EcosystemBrowser";

/**
 * EcosystemSection - Server Component
 *
 * Loads ecosystem entries from JSON files at build time and passes
 * them to the client-side browser component.
 */
export function EcosystemSection() {
  // Load entries for each category at build time
  const categoriesWithEntries = CATEGORIES.map((categoryMeta) => ({
    category: categoryMeta,
    entries: getEntriesByCategory(categoryMeta.slug),
  })).filter(({ entries }) => entries.length > 0);

  return (
    <section id="ecosystem" className="py-16 md:py-24 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <FadeIn>
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl text-text mb-3">
              Ecosystem
            </h2>
            <p className="text-text-muted max-w-xl">
              Everything you need to build with x402.
            </p>
          </div>
        </FadeIn>

        <EcosystemBrowser categoriesWithEntries={categoriesWithEntries} />
      </div>
    </section>
  );
}
