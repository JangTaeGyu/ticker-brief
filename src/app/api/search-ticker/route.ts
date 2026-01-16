import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query || query.length < 1) {
    return NextResponse.json([]);
  }

  try {
    // Finnhub Symbol Search API
    const response = await fetch(
      `https://finnhub.io/api/v1/search?q=${encodeURIComponent(query)}&token=${process.env.FINNHUB_API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Finnhub API error");
    }

    const data = await response.json();

    // Filter for US stocks only (common stock types)
    const usStocks = (data.result || [])
      .filter((item: { type: string; symbol: string }) =>
        item.type === "Common Stock" &&
        !item.symbol.includes(".") // Exclude foreign exchanges
      )
      .slice(0, 10)
      .map((item: { symbol: string; description: string }) => ({
        symbol: item.symbol,
        name: item.description,
      }));

    return NextResponse.json(usStocks, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("Ticker search error:", error);
    return NextResponse.json([], {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  }
}
