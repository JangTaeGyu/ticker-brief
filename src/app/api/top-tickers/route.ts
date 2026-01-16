import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export interface TickerData {
  ticker: string;
  score: number | null;
  grade: string | null;
  upside: number | null;
}

export async function GET() {
  try {
    // SQL DISTINCT ON 최적화 옵션 (Supabase에 RPC 함수 생성 필요):
    // CREATE OR REPLACE FUNCTION get_top_tickers()
    // RETURNS TABLE(ticker TEXT, score NUMERIC, grade TEXT, upside NUMERIC) AS $$
    //   SELECT DISTINCT ON (ticker) ticker, score, grade, upside
    //   FROM reports WHERE status = 'completed'
    //   ORDER BY ticker, created_at DESC
    //   LIMIT 20;
    // $$ LANGUAGE SQL;
    //
    // 사용법: const { data } = await supabase.rpc('get_top_tickers');

    // 현재: JS에서 중복 제거 (50개 데이터로 충분히 빠름)
    const { data, error } = await supabase
      .from("reports")
      .select("ticker, score, grade, upside")
      .eq("status", "completed")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      console.error("Top tickers error:", error);
      return NextResponse.json({ tickers: [] });
    }

    // Remove duplicates, keep latest per ticker (Map preserves insertion order)
    const tickerMap = new Map<string, TickerData>();
    for (const row of data ?? []) {
      if (!tickerMap.has(row.ticker)) {
        tickerMap.set(row.ticker, {
          ticker: row.ticker,
          score: row.score,
          grade: row.grade,
          upside: row.upside,
        });
      }
      // Early exit when we have enough unique tickers
      if (tickerMap.size >= 20) break;
    }

    const tickers = Array.from(tickerMap.values());

    return NextResponse.json(
      { tickers },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
        },
      }
    );
  } catch (error) {
    console.error("Top tickers error:", error);
    return NextResponse.json(
      { tickers: [] },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }
}
