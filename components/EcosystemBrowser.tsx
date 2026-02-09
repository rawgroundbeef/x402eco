"use client";

import { useState } from "react";
import { EcosystemEntry, CategoryMeta } from "@/lib/types/ecosystem";

interface CategoryWithEntries {
  category: CategoryMeta;
  entries: EcosystemEntry[];
}

interface EcosystemBrowserProps {
  categoriesWithEntries: CategoryWithEntries[];
}

const INITIAL_COUNT = 16;
const LOAD_MORE_COUNT = 12;

export function EcosystemBrowser({ categoriesWithEntries }: EcosystemBrowserProps) {
  const [activeCategory, setActiveCategory] = useState(categoriesWithEntries[0]?.category.slug || "");
  const [visibleCounts, setVisibleCounts] = useState<Record<string, number>>(() => {
    const counts: Record<string, number> = {};
    categoriesWithEntries.forEach(({ category }) => {
      counts[category.slug] = INITIAL_COUNT;
    });
    return counts;
  });

  const activeData = categoriesWithEntries.find(
    ({ category }) => category.slug === activeCategory
  );

  const handleShowMore = () => {
    setVisibleCounts((prev) => ({
      ...prev,
      [activeCategory]: prev[activeCategory] + LOAD_MORE_COUNT,
    }));
  };

  if (!activeData) return null;

  const visibleEntries = activeData.entries.slice(0, visibleCounts[activeCategory]);
  const hasMore = visibleCounts[activeCategory] < activeData.entries.length;
  const remaining = activeData.entries.length - visibleCounts[activeCategory];

  return (
    <div>
      {/* Mobile: Category Dropdown */}
      <div className="md:hidden mb-6">
        <select
          value={activeCategory}
          onChange={(e) => setActiveCategory(e.target.value as typeof activeCategory)}
          className="w-full pl-4 pr-10 py-3 bg-surface-card border border-border rounded-lg text-text appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%238a8a8e%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_0.75rem_center] bg-[length:1.25rem]"
        >
          {categoriesWithEntries.map(({ category, entries }) => (
            <option key={category.slug} value={category.slug}>
              {category.title} ({entries.length})
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-8">
        {/* Left: Vertical Sidebar Nav (Desktop only) */}
        <nav className="hidden md:block w-[200px] flex-shrink-0">
          <div className="sticky top-24 space-y-1">
            {categoriesWithEntries.map(({ category, entries }) => (
              <button
                key={category.slug}
                onClick={() => setActiveCategory(category.slug)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer flex items-center justify-between ${
                  activeCategory === category.slug
                    ? "bg-accent text-black"
                    : "text-gray hover:text-white hover:bg-white/5"
                }`}
              >
                <span>{category.title}</span>
                <span className={`text-xs tabular-nums ${
                  activeCategory === category.slug ? "opacity-70" : "opacity-50"
                }`}>
                  {entries.length}
                </span>
              </button>
            ))}
          </div>
        </nav>

        {/* Right: Category Content */}
        <div className="flex-1 min-w-0">
          {/* Cards Grid - 1 col mobile, 2 col desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {visibleEntries.map((entry) => (
              <a
                key={entry.name}
                href={entry.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-surface-card border border-border rounded-xl hover:border-accent/50 transition-colors group"
              >
                <div className="flex items-start gap-3">
                  {entry.logo ? (
                    <img
                      src={entry.logo}
                      alt={`${entry.name} logo`}
                      className="w-10 h-10 rounded-lg object-contain flex-shrink-0 bg-white/5"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-accent font-medium text-sm">
                        {entry.name.substring(0, 2).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <h4 className="font-medium text-text group-hover:text-accent transition-colors">
                        {entry.name}
                      </h4>
                      <svg
                        className="w-4 h-4 text-gray-dim group-hover:text-accent transition-colors flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </div>
                    <p className="text-sm text-gray mt-1 line-clamp-2">
                      {entry.description}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Show More Button */}
          {hasMore && (
            <button
              onClick={handleShowMore}
              className="mt-4 w-full py-3 text-sm text-gray hover:text-accent border border-border hover:border-accent/50 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              Show {Math.min(remaining, LOAD_MORE_COUNT)} more
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
