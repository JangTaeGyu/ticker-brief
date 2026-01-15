"use client";

import { useState, useEffect } from "react";
import { getGradeTextColor } from "@/lib/gradeColors";

interface TickerData {
  ticker: string;
  score: number | null;
  grade: string | null;
  upside: number | null;
}

function getUpsideColor(upside: number | null): string {
  if (upside === null) return "text-text-muted";
  if (upside >= 20) return "text-[#10b981]"; // green
  if (upside >= 10) return "text-[#34d399]"; // emerald
  if (upside >= 0) return "text-[#06b6d4]"; // cyan
  if (upside >= -10) return "text-[#facc15]"; // yellow
  if (upside >= -20) return "text-[#f97316]"; // orange
  return "text-[#ef4444]"; // red
}

export default function TickerMarquee() {
  const [tickers, setTickers] = useState<TickerData[]>([]);

  useEffect(() => {
    async function fetchTickers() {
      try {
        const response = await fetch("/api/top-tickers");
        const data = await response.json();
        setTickers(data.tickers);
      } catch (error) {
        console.error("Tickers fetch error:", error);
      }
    }
    fetchTickers();
  }, []);

  if (tickers.length === 0) return null;

  const TickerItem = ({ item }: { item: TickerData }) => (
    <span className="mx-6 text-xs font-['JetBrains_Mono'] flex items-center gap-2 shrink-0">
      <span className="text-text-primary font-semibold">{item.ticker}</span>
      {item.score !== null && (
        <span className={`${getGradeTextColor(item.grade)}`}>
          {item.score.toFixed(1)}
        </span>
      )}
      {item.grade && (
        <span className={`font-bold ${getGradeTextColor(item.grade)}`}>
          {item.grade}
        </span>
      )}
      {item.upside !== null && (
        <span className={`${getUpsideColor(item.upside)}`}>
          {item.upside >= 0 ? "+" : ""}{item.upside.toFixed(1)}%
        </span>
      )}
    </span>
  );

  return (
    <div className="fixed top-[72px] left-0 right-0 z-[999] bg-bg-secondary border-b border-border overflow-hidden py-2 max-md:top-[60px] max-md:pt-4">
      <div className="flex animate-marquee">
        <div className="flex shrink-0">
          {tickers.map((item, index) => (
            <TickerItem key={`a-${item.ticker}-${index}`} item={item} />
          ))}
        </div>
        <div className="flex shrink-0">
          {tickers.map((item, index) => (
            <TickerItem key={`b-${item.ticker}-${index}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
