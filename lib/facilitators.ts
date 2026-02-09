/**
 * Facilitator Data Transformation
 *
 * Transforms raw Allium API data into shapes the UI needs.
 */

export interface AlliumRow {
  ts: string;
  chain: string;
  facilitator: string;
  transactions: number;
  volume: number;
}

export interface DailyDataPoint {
  date: string;
  volume: number;
  transactions: number;
}

export interface FacilitatorCard {
  id: string;
  name: string;
  totalVolume: number;
  totalTransactions: number;
  /** Daily data points for sparkline/chart, sorted chronologically */
  dailyData: DailyDataPoint[];
}

export type TimeRange = '7d' | '30d' | 'all';

/**
 * Get the cutoff date for a given time range
 */
function getCutoffDate(range: TimeRange): Date {
  const cutoff = new Date();
  cutoff.setHours(0, 0, 0, 0);

  if (range === '7d') {
    cutoff.setDate(cutoff.getDate() - 7);
  } else if (range === '30d') {
    cutoff.setDate(cutoff.getDate() - 30);
  } else {
    // 'all' - set to a date far in the past
    cutoff.setFullYear(2000);
  }

  return cutoff;
}

/**
 * Transform raw Allium rows into facilitator card data
 *
 * @param rows - Raw rows from Allium API
 * @param range - Time range to filter by ('7d', '30d', or 'all')
 * @returns Array of FacilitatorCard objects sorted by volume descending
 */
export function transformFacilitatorData(
  rows: AlliumRow[],
  range: TimeRange = '30d'
): FacilitatorCard[] {
  const cutoff = getCutoffDate(range);

  // Filter by date range
  const filtered = rows.filter((r) => new Date(r.ts) >= cutoff);

  // Group by facilitator
  const grouped = new Map<string, AlliumRow[]>();
  for (const row of filtered) {
    const existing = grouped.get(row.facilitator) || [];
    existing.push(row);
    grouped.set(row.facilitator, existing);
  }

  // Build card data for each facilitator
  const cards: FacilitatorCard[] = [];

  for (const [name, facilitatorRows] of grouped) {
    // Aggregate daily data across chains (sum volume/txns per day)
    const dailyMap = new Map<string, { volume: number; transactions: number }>();

    for (const row of facilitatorRows) {
      const existing = dailyMap.get(row.ts) || { volume: 0, transactions: 0 };
      existing.volume += row.volume;
      existing.transactions += row.transactions;
      dailyMap.set(row.ts, existing);
    }

    const dailyData = Array.from(dailyMap.entries())
      .map(([date, stats]) => ({ date, ...stats }))
      .sort((a, b) => a.date.localeCompare(b.date));

    const totalVolume = dailyData.reduce((sum, d) => sum + d.volume, 0);
    const totalTransactions = dailyData.reduce((sum, d) => sum + d.transactions, 0);

    cards.push({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      totalVolume,
      totalTransactions,
      dailyData,
    });
  }

  // Sort by volume descending
  return cards.sort((a, b) => b.totalVolume - a.totalVolume);
}

/**
 * Format volume as a currency string
 * @param volume - Volume in dollars
 * @returns Formatted string like "$1.2M" or "$892K"
 */
export function formatVolume(volume: number): string {
  if (volume >= 1_000_000) {
    return `$${(volume / 1_000_000).toFixed(1)}M`;
  }
  if (volume >= 1_000) {
    return `$${(volume / 1_000).toFixed(0)}K`;
  }
  return `$${volume.toFixed(2)}`;
}

/**
 * Format transaction count
 * @param count - Number of transactions
 * @returns Formatted string like "67K" or "1.2M"
 */
export function formatTransactions(count: number): string {
  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1)}M`;
  }
  if (count >= 1_000) {
    return `${(count / 1_000).toFixed(0)}K`;
  }
  return count.toString();
}

/**
 * Extract sparkline data (volume values) from daily data
 * @param dailyData - Array of daily data points
 * @returns Array of volume numbers for sparkline chart
 */
export function getSparklineData(dailyData: DailyDataPoint[]): number[] {
  return dailyData.map((d) => d.volume);
}

/**
 * Extract transaction sparkline data from daily data
 * @param dailyData - Array of daily data points
 * @returns Array of transaction counts for sparkline chart
 */
export function getTransactionSparklineData(dailyData: DailyDataPoint[]): number[] {
  return dailyData.map((d) => d.transactions);
}
