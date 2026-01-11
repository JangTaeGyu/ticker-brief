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
    // Get completed reports with score, grade, upside
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

    // Remove duplicates, keep latest per ticker
    const tickerMap = new Map<string, TickerData>();
    data?.forEach((row) => {
      if (!tickerMap.has(row.ticker)) {
        tickerMap.set(row.ticker, {
          ticker: row.ticker,
          score: row.score,
          grade: row.grade,
          upside: row.upside,
        });
      }
    });

    const tickers = Array.from(tickerMap.values()).slice(0, 20);

    return NextResponse.json({ tickers });
  } catch (error) {
    console.error("Top tickers error:", error);
    return NextResponse.json({ tickers: [] });
  }
}
