"use client";

import { useState, createContext, useContext, ReactNode, useMemo } from "react";
import useSWR from "swr";
import { EducationalDialog } from "@/components/EducationalDialog";
import { InfoButton } from "@/components/InfoButton";
import { Sparkline } from "@/components/Sparkline";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/FadeIn";
import { type Facilitator, educationalContent } from "@/lib/data";
import {
  transformFacilitatorData,
  formatVolume,
  formatTransactions,
  formatCount,
  getTransactionSparklineData,
  deriveStatsBar,
  type AlliumRow,
  type FacilitatorCard,
  type TimeRange,
  type StatsBarData,
} from "@/lib/facilitators";

type DialogType = keyof typeof educationalContent | null;

interface HomeClientContextValue {
  dialogOpen: DialogType;
  openDialog: (type: DialogType) => void;
  closeDialog: () => void;
  featuredFacilitator: Facilitator;
  setFeaturedFacilitator: (facilitator: Facilitator) => void;
  facilitators: Facilitator[];
  educationalContent: typeof import("@/lib/data").educationalContent;
}

const HomeClientContext = createContext<HomeClientContextValue | null>(null);

function useHomeClient() {
  const context = useContext(HomeClientContext);
  if (!context) {
    throw new Error("useHomeClient must be used within HomeClientProvider");
  }
  return context;
}

interface HomeClientProviderProps {
  children: ReactNode;
  facilitators: Facilitator[];
  educationalContent: typeof import("@/lib/data").educationalContent;
}

/**
 * HomeClientProvider - Context provider for interactive state
 */
export function HomeClientProvider({ children, facilitators, educationalContent }: HomeClientProviderProps) {
  const [dialogOpen, setDialogOpen] = useState<DialogType>(null);
  const [featuredFacilitator, setFeaturedFacilitator] = useState<Facilitator>(
    facilitators[0]
  );

  const openDialog = (type: DialogType) => setDialogOpen(type);
  const closeDialog = () => setDialogOpen(null);

  return (
    <HomeClientContext.Provider
      value={{
        dialogOpen,
        openDialog,
        closeDialog,
        featuredFacilitator,
        setFeaturedFacilitator,
        facilitators,
        educationalContent,
      }}
    >
      {children}
    </HomeClientContext.Provider>
  );
}

/**
 * EducationalDialogContainer - Renders the dialog when open
 */
export function EducationalDialogContainer() {
  const { dialogOpen, closeDialog, educationalContent } = useHomeClient();

  if (!dialogOpen) return null;

  return (
    <EducationalDialog
      isOpen={!!dialogOpen}
      onClose={closeDialog}
      title={educationalContent[dialogOpen].title}
      content={educationalContent[dialogOpen].content}
    />
  );
}

/**
 * HeroInfoButtons - Info buttons for hero section
 */
export function HeroInfoButtons() {
  const { openDialog } = useHomeClient();

  return (
    <FadeIn delay={0.2}>
      <div className="flex flex-wrap justify-center gap-3 text-sm">
        <button
          onClick={() => openDialog("whatIsX402")}
          className="text-gray hover:text-accent transition-colors"
        >
          What is x402?
        </button>
        <span className="text-border">|</span>
        <button
          onClick={() => openDialog("whatIsResource")}
          className="text-gray hover:text-accent transition-colors"
        >
          What&apos;s a resource?
        </button>
        <span className="text-border">|</span>
        <button
          onClick={() => openDialog("whatIsFacilitator")}
          className="text-gray hover:text-accent transition-colors"
        >
          What&apos;s a facilitator?
        </button>
      </div>
    </FadeIn>
  );
}

/**
 * ServersInfoButtons - Info buttons for servers section
 */
export function ServersInfoButtons() {
  const { openDialog } = useHomeClient();

  return (
    <div className="mt-4 md:mt-0 flex gap-3">
      <InfoButton
        label="What's a resource?"
        onClick={() => openDialog("whatIsResource")}
      />
      <InfoButton
        label="What's a server?"
        onClick={() => openDialog("whatIsServer")}
      />
    </div>
  );
}

/**
 * StatsBar - Live stats derived from Allium data
 */
const STATS_RANGES: { value: TimeRange; label: string }[] = [
  { value: "24h", label: "24H" },
  { value: "7d", label: "7D" },
  { value: "30d", label: "30D" },
  { value: "all", label: "ALL" },
];

export function StatsBar() {
  const [statsRange, setStatsRange] = useState<TimeRange>("30d");

  // Fetch real data from our API route
  const { data, error, isLoading } = useSWR<{ data: AlliumRow[] }>(
    "/api/facilitators",
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // 1 minute
    }
  );

  // Derive stats from the data
  const stats = useMemo(() => {
    if (!data?.data) return null;
    return deriveStatsBar(data.data, statsRange);
  }, [data, statsRange]);

  // Loading state
  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="stats-bar backdrop-blur-xl border border-border rounded-xl overflow-hidden">
          <div className="grid grid-cols-3 gap-px bg-border">
            {[1, 2, 3].map((i) => (
              <div key={i} className="stats-bar-cell p-5 md:p-6">
                <div className="h-4 w-20 bg-border rounded animate-pulse mb-2" />
                <div className="h-10 w-24 bg-border rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error or no data - show placeholder
  if (error || !stats) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="stats-bar backdrop-blur-xl border border-border rounded-xl overflow-hidden">
          <div className="grid grid-cols-3 gap-px bg-border">
            <div className="stats-bar-cell p-5 md:p-6">
              <p className="stat-label mb-2">Total Volume</p>
              <span className="stat-value-lg text-text">—</span>
            </div>
            <div className="stats-bar-cell p-5 md:p-6">
              <p className="stat-label mb-2">Transactions</p>
              <span className="stat-value-lg text-text">—</span>
            </div>
            <div className="stats-bar-cell p-5 md:p-6">
              <p className="stat-label mb-2">Facilitators</p>
              <span className="stat-value-lg text-text">—</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderDelta = (delta: number | null, isPercentage: boolean) => {
    if (delta === null) return null;

    const isPositive = delta >= 0;
    const prefix = isPositive ? "+" : "−";
    const displayValue = isPercentage
      ? `${prefix}${Math.abs(delta)}%`
      : `${prefix}${Math.abs(delta)}`;

    return (
      <span className={`font-mono text-xs ${isPositive ? "text-accent" : "text-red-400"}`}>
        {displayValue}
      </span>
    );
  };

  const formatDateRange = (from: string | null, to: string | null): string | null => {
    if (!from || !to) return null;
    const fmt = (iso: string) => {
      const d = new Date(iso + "T00:00:00");
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    };
    return `${fmt(from)} – ${fmt(to)}`;
  };

  const dateRange = formatDateRange(stats.dateFrom, stats.dateTo);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="stats-bar backdrop-blur-xl border border-border rounded-xl overflow-hidden">
        <div className="grid grid-cols-3 gap-px bg-border">
          {/* Total Volume */}
          <div className="stats-bar-cell p-5 md:p-6">
            <p className="stat-label mb-2">Total Volume</p>
            <div className="flex items-baseline gap-2">
              <span className="stat-value-lg text-text">
                {formatVolume(stats.totalVolume)}
              </span>
              {renderDelta(stats.volumeDelta, true)}
            </div>
          </div>

          {/* Transactions */}
          <div className="stats-bar-cell p-5 md:p-6">
            <p className="stat-label mb-2">Transactions</p>
            <div className="flex items-baseline gap-2">
              <span className="stat-value-lg text-text">
                {formatCount(stats.totalTransactions)}
              </span>
              {renderDelta(stats.txnDelta, true)}
            </div>
          </div>

          {/* Facilitators */}
          <div className="stats-bar-cell p-5 md:p-6">
            <p className="stat-label mb-2">Facilitators</p>
            <div className="flex items-baseline gap-2">
              <span className="stat-value-lg text-text">
                {stats.facilitatorCount}
              </span>
              {renderDelta(stats.facilitatorDelta, false)}
            </div>
          </div>
        </div>
        <div className="border-t border-border px-5 py-2 flex items-center justify-between">
          {dateRange ? (
            <span className="font-mono text-xs text-gray">{dateRange}</span>
          ) : (
            <span className="font-mono text-xs text-gray">Lifetime</span>
          )}
          <div className="flex rounded-lg border border-border overflow-hidden">
            {STATS_RANGES.map((r) => (
              <button
                key={r.value}
                onClick={() => setStatsRange(r.value)}
                className={`px-2.5 py-1 text-xs font-mono transition-colors ${
                  statsRange === r.value
                    ? "bg-accent text-dark"
                    : "bg-transparent text-gray hover:text-text"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Fetcher for SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

/**
 * FacilitatorsSection - Full facilitators section with real Allium data
 */
const FACILITATORS_PER_PAGE = 3;

export function FacilitatorsSection() {
  const { openDialog, facilitators: mockFacilitators } = useHomeClient();
  const [timeRange, setTimeRange] = useState<TimeRange>("30d");
  const [selectedFacilitatorId, setSelectedFacilitatorId] = useState<string | null>(null);
  const [page, setPage] = useState(0);

  // Fetch real data from our API route
  const { data, error, isLoading } = useSWR<{ data: AlliumRow[] }>(
    "/api/facilitators",
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // 1 minute
    }
  );

  // Transform the data based on selected time range
  const facilitatorCards = useMemo(() => {
    if (!data?.data) return [];
    return transformFacilitatorData(data.data, timeRange);
  }, [data, timeRange]);

  // Get selected facilitator or default to first one
  const selectedFacilitator = useMemo(() => {
    if (facilitatorCards.length === 0) return null;
    if (selectedFacilitatorId) {
      return facilitatorCards.find((f) => f.id === selectedFacilitatorId) || facilitatorCards[0];
    }
    return facilitatorCards[0];
  }, [facilitatorCards, selectedFacilitatorId]);

  // Pagination
  const totalPages = Math.ceil(facilitatorCards.length / FACILITATORS_PER_PAGE);
  const visibleFacilitators = useMemo(() => {
    const start = page * FACILITATORS_PER_PAGE;
    return facilitatorCards.slice(start, start + FACILITATORS_PER_PAGE);
  }, [facilitatorCards, page]);

  // Reset page when data changes
  useMemo(() => {
    if (page >= totalPages && totalPages > 0) {
      setPage(0);
    }
  }, [totalPages, page]);

  // Show loading state
  if (isLoading) {
    return (
      <section id="facilitators" className="py-20 md:py-28 scroll-mt-16">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
              <div>
                <h2 className="text-text mb-3">
                  Facilitators
                </h2>
                <p className="text-gray max-w-xl">
                  Facilitators handle the payment flow between agents and servers.
                  They abstract away blockchain complexity and provide instant,
                  verifiable payments.
                </p>
              </div>
            </div>
          </FadeIn>
          <div className="flex items-center justify-center h-64">
            <div className="animate-pulse text-gray">Loading facilitator data...</div>
          </div>
        </div>
      </section>
    );
  }

  // Show error state or empty state - fall back to mock data description
  if (error || facilitatorCards.length === 0) {
    return (
      <section id="facilitators" className="py-20 md:py-28 scroll-mt-16">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
              <div>
                <h2 className="text-text mb-3">
                  Facilitators
                </h2>
                <p className="text-gray max-w-xl">
                  Facilitators handle the payment flow between agents and servers.
                  They abstract away blockchain complexity and provide instant,
                  verifiable payments.
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <button
                  onClick={() => openDialog("whatIsFacilitator")}
                  className="text-sm text-gray hover:text-accent transition-colors"
                >
                  How facilitation works
                </button>
              </div>
            </div>
          </FadeIn>
          <div className="bg-surface-card border border-border rounded-xl p-8 text-center">
            <p className="text-gray">
              {error ? "Unable to load facilitator metrics." : "No facilitator data available yet."}
            </p>
            <p className="text-sm text-gray-dim mt-2">
              Check back soon for live transaction data.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="facilitators" className="py-20 md:py-28 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <h2 className="text-text mb-3">
                Facilitators
              </h2>
              <p className="text-gray max-w-xl">
                Facilitators handle the payment flow between agents and servers.
                They abstract away blockchain complexity and provide instant,
                verifiable payments.
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-4">
              {/* Time Range Selector */}
              <div className="flex rounded-lg border border-border overflow-hidden">
                {(["7d", "30d"] as TimeRange[]).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 py-2 text-sm font-mono transition-colors ${
                      timeRange === range
                        ? "bg-accent text-black"
                        : "bg-surface-card text-gray hover:text-white"
                    }`}
                  >
                    {range === "7d" ? "7D" : "30D"}
                  </button>
                ))}
              </div>
              <button
                onClick={() => openDialog("whatIsFacilitator")}
                className="text-sm text-gray hover:text-accent transition-colors"
              >
                How facilitation works
              </button>
            </div>
          </div>
        </FadeIn>

        {/* Featured Facilitator Chart */}
        {selectedFacilitator && (
          <FadeIn delay={0.1}>
            <div className="bg-surface-card border border-border rounded-xl p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                <div>
                  <h3 className="text-text">
                    {selectedFacilitator.name}
                  </h3>
                  <p className="text-sm text-gray-dim">
                    Transaction volume over {timeRange === "7d" ? "7" : "30"} days
                  </p>
                </div>
                <div className="flex items-center gap-6 mt-4 sm:mt-0">
                  <div className="text-right">
                    <p className="stat-value text-text">
                      {formatVolume(selectedFacilitator.totalVolume)}
                    </p>
                    <p className="stat-label">Volume</p>
                  </div>
                  <div className="text-right">
                    <p className="stat-value text-accent">
                      {formatTransactions(selectedFacilitator.totalTransactions)}
                    </p>
                    <p className="stat-label">Txns</p>
                  </div>
                </div>
              </div>
              {/* Area chart with lime line and gradient fill */}
              <div className="h-[240px]">
                <Sparkline
                  data={getTransactionSparklineData(selectedFacilitator.dailyData)}
                  width="100%"
                  height={240}
                  showTooltip={true}
                />
              </div>
              {/* X-axis labels */}
              <div className="flex justify-between text-xs font-mono text-gray-dim mt-2 px-1">
                <span>Day 1</span>
                <span>Day {timeRange === "7d" ? "4" : "15"}</span>
                <span>Day {timeRange === "7d" ? "7" : "30"}</span>
              </div>
            </div>
          </FadeIn>
        )}

        {/* Facilitator Cards Grid */}
        <FadeInStagger key={`facilitators-page-${page}`} className="grid md:grid-cols-3 gap-4 items-stretch" staggerDelay={0.1}>
          {visibleFacilitators.map((facilitator) => (
            <FadeInStaggerItem key={facilitator.id} className="h-full">
              <button
                onClick={() => setSelectedFacilitatorId(facilitator.id)}
                className={`w-full h-full text-left p-5 rounded-xl border transition-all outline-none focus:ring-2 focus:ring-accent/50 flex flex-col ${
                  selectedFacilitator?.id === facilitator.id
                    ? "bg-surface-card border-accent active-glow"
                    : "bg-surface-card/50 border-border hover:border-accent/50"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <h4 className="font-medium text-text">{facilitator.name}</h4>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4 mt-auto">
                  <div>
                    <p className="text-xl text-text" style={{ fontFamily: "var(--font-display), 'Bebas Neue', sans-serif", letterSpacing: "0.5px" }}>
                      {formatVolume(facilitator.totalVolume)}
                    </p>
                    <p className="stat-label">Volume</p>
                  </div>
                  <div>
                    <p className="text-xl text-text" style={{ fontFamily: "var(--font-display), 'Bebas Neue', sans-serif", letterSpacing: "0.5px" }}>
                      {formatTransactions(facilitator.totalTransactions)}
                    </p>
                    <p className="stat-label">Txns</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-border w-full">
                  <Sparkline
                    data={getTransactionSparklineData(facilitator.dailyData)}
                    width="100%"
                    height={32}
                  />
                </div>
              </button>
            </FadeInStaggerItem>
          ))}
        </FadeInStagger>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="p-2 rounded-lg border border-border bg-surface-card hover:border-accent/50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous page"
            >
              <svg className="w-5 h-5 text-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-sm font-mono text-gray">
              {page + 1} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="p-2 rounded-lg border border-border bg-surface-card hover:border-accent/50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Next page"
            >
              <svg className="w-5 h-5 text-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * ThesisInfoButton - Info button for thesis section
 */
export function ThesisInfoButton() {
  const { openDialog } = useHomeClient();

  return (
    <FadeIn delay={0.2}>
      <div className="mt-10">
        <button
          onClick={() => openDialog("whyShouldICare")}
          className="text-sm text-gray hover:text-accent transition-colors"
        >
          Why should I care?
        </button>
      </div>
    </FadeIn>
  );
}
