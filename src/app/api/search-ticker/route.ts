import { NextResponse } from "next/server";

const FINNHUB_TIMEOUT_MS = 5000; // 5초 타임아웃

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query || query.length < 1) {
    return NextResponse.json([]);
  }

  // API 키 존재 여부 검증
  const apiKey = process.env.FINNHUB_API_KEY;
  if (!apiKey) {
    console.error("FINNHUB_API_KEY is not configured");
    return NextResponse.json(
      { error: "서버 설정 오류" },
      { status: 500 }
    );
  }

  // AbortController로 타임아웃 처리
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FINNHUB_TIMEOUT_MS);

  try {
    const response = await fetch(
      `https://finnhub.io/api/v1/search?q=${encodeURIComponent(query)}&token=${apiKey}`,
      { signal: controller.signal }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`Finnhub API error: ${response.status}`);
      return NextResponse.json(
        { error: "외부 API 오류" },
        { status: 502 }
      );
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
    clearTimeout(timeoutId);

    // 타임아웃 에러 구분
    if (error instanceof Error && error.name === "AbortError") {
      console.error("Finnhub API timeout");
      return NextResponse.json(
        { error: "요청 시간 초과" },
        { status: 504 }
      );
    }

    console.error("Ticker search error:", error);
    return NextResponse.json(
      { error: "검색 중 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}
