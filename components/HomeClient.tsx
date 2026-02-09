"use client";

import { useState, createContext, useContext, ReactNode, useMemo } from "react";
import useSWR from "swr";
import { FacilitatorChart } from "@/components/FacilitatorChart";
import { EducationalDialog } from "@/components/EducationalDialog";
import { InfoButton } from "@/components/InfoButton";
import { Sparkline } from "@/components/Sparkline";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/FadeIn";
import { type Facilitator, educationalContent } from "@/lib/data";
import {
  transformFacilitatorData,
  formatVolume,
  formatTransactions,
  getTransactionSparklineData,
  type AlliumRow,
  type FacilitatorCard,
  type TimeRange,
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
      <div className="flex flex-wrap justify-center gap-3">
        <InfoButton
          label="What is x402?"
          onClick={() => openDialog("whatIsX402")}
        />
        <span className="text-border">|</span>
        <InfoButton
          label="What's a resource?"
          onClick={() => openDialog("whatIsResource")}
        />
        <span className="text-border">|</span>
        <InfoButton
          label="What's a facilitator?"
          onClick={() => openDialog("whatIsFacilitator")}
        />
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
      <section id="facilitators" className="py-16 md:py-24 bg-card/50 scroll-mt-16">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl text-text mb-3">
                  Facilitators
                </h2>
                <p className="text-text-muted max-w-xl">
                  Facilitators handle the payment flow between agents and servers.
                  They abstract away blockchain complexity and provide instant,
                  verifiable payments.
                </p>
              </div>
            </div>
          </FadeIn>
          <div className="flex items-center justify-center h-64">
            <div className="animate-pulse text-text-muted">Loading facilitator data...</div>
          </div>
        </div>
      </section>
    );
  }

  // Show error state or empty state - fall back to mock data description
  if (error || facilitatorCards.length === 0) {
    return (
      <section id="facilitators" className="py-16 md:py-24 bg-card/50 scroll-mt-16">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl text-text mb-3">
                  Facilitators
                </h2>
                <p className="text-text-muted max-w-xl">
                  Facilitators handle the payment flow between agents and servers.
                  They abstract away blockchain complexity and provide instant,
                  verifiable payments.
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <InfoButton
                  label="How facilitation works"
                  onClick={() => openDialog("whatIsFacilitator")}
                />
              </div>
            </div>
          </FadeIn>
          <div className="bg-card border border-border rounded-xl p-8 text-center">
            <p className="text-text-muted">
              {error ? "Unable to load facilitator metrics." : "No facilitator data available yet."}
            </p>
            <p className="text-sm text-text-muted mt-2">
              Check back soon for live transaction data.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="facilitators" className="py-16 md:py-24 bg-card/50 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl text-text mb-3">
                Facilitators
              </h2>
              <p className="text-text-muted max-w-xl">
                Facilitators handle the payment flow between agents and servers.
                They abstract away blockchain complexity and provide instant,
                verifiable payments.
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-3">
              {/* Time Range Selector */}
              <div className="flex rounded-lg border border-border overflow-hidden">
                {(["7d", "30d"] as TimeRange[]).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 py-1.5 text-sm transition-colors ${
                      timeRange === range
                        ? "bg-accent text-white"
                        : "bg-card text-text-muted hover:text-text"
                    }`}
                  >
                    {range === "7d" ? "7 Days" : "30 Days"}
                  </button>
                ))}
              </div>
              <InfoButton
                label="How facilitation works"
                onClick={() => openDialog("whatIsFacilitator")}
              />
            </div>
          </div>
        </FadeIn>

        {/* Featured Facilitator Chart */}
        {selectedFacilitator && (
          <FadeIn delay={0.1}>
            <div className="bg-card border border-border rounded-xl p-6 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-serif text-text">
                    {selectedFacilitator.name}
                  </h3>
                  <p className="text-sm text-text-muted">
                    Transaction volume over {timeRange === "7d" ? "7" : "30"} days
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-3 sm:mt-0">
                  <div className="text-right">
                    <p className="text-2xl font-serif text-text">
                      {formatVolume(selectedFacilitator.totalVolume)}
                    </p>
                    <p className="text-xs text-text-muted">Total Volume</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-serif text-accent">
                      {formatTransactions(selectedFacilitator.totalTransactions)}
                    </p>
                    <p className="text-xs text-text-muted">Transactions</p>
                  </div>
                </div>
              </div>
              {/* Use a sparkline-based chart for the featured view */}
              <div className="h-[200px]">
                <Sparkline
                  data={getTransactionSparklineData(selectedFacilitator.dailyData)}
                  width="100%"
                  height={200}
                  showTooltip={true}
                />
              </div>
            </div>
          </FadeIn>
        )}

        {/* Facilitator Cards */}
        <FadeInStagger key={`facilitators-page-${page}`} className="grid md:grid-cols-3 gap-4 items-stretch" staggerDelay={0.1}>
          {visibleFacilitators.map((facilitator) => (
            <FadeInStaggerItem key={facilitator.id} className="h-full">
              <button
                onClick={() => setSelectedFacilitatorId(facilitator.id)}
                className={`w-full h-full text-left p-5 rounded-xl border transition-all outline-none focus:ring-2 focus:ring-accent/50 flex flex-col ${
                  selectedFacilitator?.id === facilitator.id
                    ? "bg-card border-accent shadow-lg shadow-accent/10"
                    : "bg-card/50 border-border hover:border-accent/50"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-medium text-text">{facilitator.name}</h4>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4 mt-auto">
                  <div>
                    <p className="text-lg font-serif text-text">
                      {formatVolume(facilitator.totalVolume)}
                    </p>
                    <p className="text-xs text-text-muted">Volume</p>
                  </div>
                  <div>
                    <p className="text-lg font-serif text-text">
                      {formatTransactions(facilitator.totalTransactions)}
                    </p>
                    <p className="text-xs text-text-muted">Txns</p>
                  </div>
                </div>
                <div className="pt-3 border-t border-border w-full">
                  <Sparkline
                    data={getTransactionSparklineData(facilitator.dailyData)}
                    width="100%"
                    height={28}
                  />
                </div>
              </button>
            </FadeInStaggerItem>
          ))}
        </FadeInStagger>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="p-2 rounded-lg border border-border bg-card hover:border-accent/50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous page"
            >
              <svg className="w-5 h-5 text-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-sm text-text-muted">
              {page + 1} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="p-2 rounded-lg border border-border bg-card hover:border-accent/50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
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
        <InfoButton
          label="Why should I care?"
          onClick={() => openDialog("whyShouldICare")}
        />
      </div>
    </FadeIn>
  );
}
