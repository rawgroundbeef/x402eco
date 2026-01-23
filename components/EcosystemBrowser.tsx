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

const INITIAL_COUNT = 6;
const LOAD_MORE_COUNT = 6;

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
    <div className="flex gap-8">
      {/* Left: Sticky Category Nav */}
      <nav className="hidden md:block w-48 flex-shrink-0">
        <div className="sticky top-24 space-y-1">
          {categoriesWithEntries.map(({ category, entries }) => (
            <button
              key={category.slug}
              onClick={() => setActiveCategory(category.slug)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
                activeCategory === category.slug
                  ? "bg-accent/10 text-accent font-medium"
                  : "text-text-muted hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              {category.title}
              <span className="ml-2 text-xs opacity-60">({entries.length})</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile: Category Dropdown */}
      <div className="md:hidden w-full mb-4">
        <select
          value={activeCategory}
          onChange={(e) => setActiveCategory(e.target.value as typeof activeCategory)}
          className="w-full px-4 py-2 bg-card border border-border rounded-lg text-text"
        >
          {categoriesWithEntries.map(({ category, entries }) => (
            <option key={category.slug} value={category.slug}>
              {category.title} ({entries.length})
            </option>
          ))}
        </select>
      </div>

      {/* Right: Category Content */}
      <div className="flex-1 min-w-0">
        {/* Category Title */}
        <h3 className="text-lg font-medium text-text mb-4">
          {activeData.category.title}
        </h3>

        {/* 2-Column Grid */}
        <div className="grid sm:grid-cols-2 gap-3">
          {visibleEntries.map((entry) => (
            <a
              key={entry.name}
              href={entry.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-card border border-border rounded-xl hover:border-accent/50 transition-colors group"
            >
              <div className="flex items-start justify-between">
                <h4 className="font-medium text-text group-hover:text-accent transition-colors">
                  {entry.name}
                </h4>
                <svg
                  className="w-4 h-4 text-text-muted group-hover:text-accent transition-colors flex-shrink-0 mt-0.5"
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
              <p className="text-sm text-text-muted mt-1 line-clamp-2">
                {entry.description}
              </p>
            </a>
          ))}
        </div>

        {/* Show More Button */}
        {hasMore && (
          <button
            onClick={handleShowMore}
            className="mt-4 w-full py-3 text-sm text-text-muted hover:text-accent border border-border hover:border-accent/50 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            Show {Math.min(remaining, LOAD_MORE_COUNT)} more
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
