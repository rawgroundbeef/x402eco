/**
 * ServersResourcesSection - ARCHIVED
 *
 * This section was removed from the homepage but kept for future use.
 * It displays servers and resources tables with sparkline trends.
 *
 * To re-enable:
 * 1. Import this component in app/page.tsx
 * 2. Add <ServersResourcesSection /> where the section comment is
 * 3. Uncomment the Servers nav link in the header
 */

import { Sparkline } from "@/components/Sparkline";
import { FadeIn } from "@/components/FadeIn";
import { ServersInfoButtons } from "@/components/HomeClient";
import { servers, resources } from "@/lib/data";

export function ServersResourcesSection() {
  return (
    <section id="servers" className="py-16 md:py-24 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl text-text mb-3">
                Servers and Resources
              </h2>
              <p className="text-text-muted max-w-xl">
                Resources are monetized API endpoints. Servers host and manage
                collections of resources. Together, they form the supply side of
                the x402 economy.
              </p>
            </div>
            <ServersInfoButtons />
          </div>
        </FadeIn>

        {/* Top Servers */}
        <FadeIn delay={0.1}>
          <div className="mb-12">
            <h3 className="text-lg font-medium text-text mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-accent"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2"
                />
              </svg>
              Top Servers
            </h3>
            <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-xs uppercase tracking-wide text-text-muted font-medium">
                      Server
                    </th>
                    <th className="text-left p-4 text-xs uppercase tracking-wide text-text-muted font-medium hidden md:table-cell">
                      Description
                    </th>
                    <th className="text-right p-4 text-xs uppercase tracking-wide text-text-muted font-medium">
                      Resources
                    </th>
                    <th className="text-right p-4 text-xs uppercase tracking-wide text-text-muted font-medium">
                      Calls
                    </th>
                    <th className="text-right p-4 text-xs uppercase tracking-wide text-text-muted font-medium">
                      Revenue
                    </th>
                    <th className="text-right p-4 text-xs uppercase tracking-wide text-text-muted font-medium hidden sm:table-cell">
                      Trend
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {servers.map((server) => (
                    <tr key={server.id} className="table-row-hover border-b border-border last:border-0">
                      <td className="p-4">
                        <span className="font-medium text-text">
                          {server.name}
                        </span>
                      </td>
                      <td className="p-4 text-text-muted text-sm hidden md:table-cell">
                        {server.description}
                      </td>
                      <td className="p-4 text-right text-text">
                        {server.resources}
                      </td>
                      <td className="p-4 text-right text-text">
                        {server.calls}
                      </td>
                      <td className="p-4 text-right text-accent font-medium">
                        {server.revenue}
                      </td>
                      <td className="p-4 text-right hidden sm:table-cell">
                        <div className="inline-block">
                          <Sparkline data={server.sparkline} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </div>
          </div>
        </FadeIn>

        {/* Top Resources */}
        <FadeIn delay={0.2}>
          <div>
            <h3 className="text-lg font-medium text-text mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-accent"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              Top Resources
            </h3>
            <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-xs uppercase tracking-wide text-text-muted font-medium">
                      Resource
                    </th>
                    <th className="text-left p-4 text-xs uppercase tracking-wide text-text-muted font-medium hidden md:table-cell">
                      Server
                    </th>
                    <th className="text-left p-4 text-xs uppercase tracking-wide text-text-muted font-medium hidden sm:table-cell">
                      Category
                    </th>
                    <th className="text-right p-4 text-xs uppercase tracking-wide text-text-muted font-medium">
                      Price
                    </th>
                    <th className="text-right p-4 text-xs uppercase tracking-wide text-text-muted font-medium">
                      Calls (30d)
                    </th>
                    <th className="text-right p-4 text-xs uppercase tracking-wide text-text-muted font-medium hidden sm:table-cell">
                      Trend
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {resources.map((resource) => (
                    <tr key={resource.id} className="table-row-hover border-b border-border last:border-0">
                      <td className="p-4">
                        <span className="font-medium text-text">
                          {resource.name}
                        </span>
                      </td>
                      <td className="p-4 text-text-muted text-sm hidden md:table-cell">
                        {resource.server}
                      </td>
                      <td className="p-4 hidden sm:table-cell">
                        <span className="inline-block px-2 py-1 text-xs bg-border/50 text-text-muted rounded">
                          {resource.category}
                        </span>
                      </td>
                      <td className="p-4 text-right text-text font-mono text-sm">
                        {resource.price}
                      </td>
                      <td className="p-4 text-right text-text">
                        {resource.calls}
                      </td>
                      <td className="p-4 text-right hidden sm:table-cell">
                        <div className="inline-block">
                          <Sparkline data={resource.sparkline} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
