import { NextResponse } from 'next/server';

interface CacheEntry {
  data: AlliumResponse;
  timestamp: number;
}

interface AlliumRow {
  ts: string;
  chain: string;
  facilitator: string;
  transactions: number;
  volume: number;
}

interface AlliumResponse {
  data: AlliumRow[];
}

let cache: CacheEntry | null = null;
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

const ALLIUM_ENDPOINT = 'https://api.allium.so/api/v1/explorer/queries/tZrCe3GI79Yym6eG0glp/run';

export async function GET() {
  // Return cache if fresh
  if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
    return NextResponse.json(cache.data, {
      headers: {
        'X-Cache': 'HIT',
        'X-Cache-Age': String(Math.floor((Date.now() - cache.timestamp) / 1000)),
      },
    });
  }

  const apiKey = process.env.ALLIUM_API_KEY;

  if (!apiKey) {
    console.error('ALLIUM_API_KEY environment variable is not set');
    // Return stale cache if available
    if (cache) {
      return NextResponse.json(cache.data, {
        headers: {
          'X-Cache': 'STALE',
          'X-Cache-Reason': 'missing-api-key',
        },
      });
    }
    return NextResponse.json(
      { error: 'API configuration error' },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(ALLIUM_ENDPOINT, {
      method: 'POST',
      headers: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    if (!res.ok) {
      throw new Error(`Allium API error: ${res.status} ${res.statusText}`);
    }

    const data = (await res.json()) as AlliumResponse;

    // Validate response structure
    if (!data || !Array.isArray(data.data)) {
      throw new Error('Invalid response structure from Allium API');
    }

    cache = { data, timestamp: Date.now() };

    return NextResponse.json(data, {
      headers: {
        'X-Cache': 'MISS',
      },
    });
  } catch (error) {
    console.error('Failed to fetch from Allium:', error);

    // Return stale cache if available
    if (cache) {
      return NextResponse.json(cache.data, {
        headers: {
          'X-Cache': 'STALE',
          'X-Cache-Reason': 'fetch-error',
        },
      });
    }

    return NextResponse.json(
      { error: 'Failed to fetch facilitator data' },
      { status: 500 }
    );
  }
}
