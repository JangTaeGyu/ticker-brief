"use client";

import { useState, useEffect, memo } from "react";
import { getGradeTextColor, getUpsideColor } from "@/lib/gradeColors";

interface TickerData {
  ticker: string;
  score: number | null;
  grade: string | null;
  upside: number | null;
}

// 메모이제이션된 TickerItem 컴포넌트
const TickerItem = memo(function TickerItem({ item }: { item: TickerData }) {
  return (
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
});

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
