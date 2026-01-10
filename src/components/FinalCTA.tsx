"use client";

import { useState, useEffect, useRef } from "react";

interface TickerResult {
  symbol: string;
  name: string;
}

export default function FinalCTA() {
  const [tickerQuery, setTickerQuery] = useState("");
  const [tickerResults, setTickerResults] = useState<TickerResult[]>([]);
  const [selectedTicker, setSelectedTicker] = useState<TickerResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Debounced search
  useEffect(() => {
    if (!tickerQuery || tickerQuery.length < 1 || selectedTicker) {
      setTickerResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const response = await fetch(`/api/search-ticker?q=${encodeURIComponent(tickerQuery)}`);
        const data = await response.json();
        setTickerResults(data);
        setShowDropdown(true);
      } catch (error) {
        console.error("Search error:", error);
        setTickerResults([]);
      }
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [tickerQuery, selectedTicker]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTickerSelect = (ticker: TickerResult) => {
    setSelectedTicker(ticker);
    setTickerQuery(ticker.symbol);
    setShowDropdown(false);
  };

  const handleTickerInputChange = (value: string) => {
    setTickerQuery(value.toUpperCase());
    setSelectedTicker(null);
  };

  return (
    <section
      id="subscribe"
      className="relative z-[1] py-24 px-10 text-center max-md:py-16 max-md:px-5"
    >
      <div className="max-w-[600px] mx-auto">
        <h2 className="font-['Playfair_Display'] text-[clamp(28px,4vw,40px)] font-bold mb-4">
          지금 무료로 리포트 받아보세요
        </h2>
        <p className="text-text-secondary text-lg mb-10">
          이메일과 관심 종목만 입력하면 끝!
        </p>

        <form className="flex gap-3 justify-center flex-wrap max-md:flex-col">
          <input
            type="email"
            name="email"
            placeholder="이메일 주소"
            required
            className="flex-1 min-w-[200px] max-w-[280px] px-5 py-4 bg-bg-card border border-border rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-green transition-colors max-md:max-w-full"
          />

          {/* Ticker Search */}
          <div className="relative" ref={dropdownRef}>
            <input
              type="text"
              name="ticker"
              value={tickerQuery}
              onChange={(e) => handleTickerInputChange(e.target.value)}
              onFocus={() => tickerResults.length > 0 && setShowDropdown(true)}
              placeholder="티커 검색"
              required
              autoComplete="off"
              className="w-[180px] px-5 py-4 bg-bg-card border border-border rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-green transition-colors max-md:w-full"
            />

            {/* Loading indicator */}
            {isSearching && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <div className="w-4 h-4 border-2 border-accent-green border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            {/* Selected ticker badge */}
            {selectedTicker && (
              <div className="absolute left-2 top-1/2 -translate-y-1/2 bg-accent-green/20 text-accent-green text-xs px-2 py-0.5 rounded">
                {selectedTicker.symbol}
              </div>
            )}

            {/* Dropdown */}
            {showDropdown && tickerResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-bg-card border border-border rounded-lg shadow-xl max-h-[240px] overflow-y-auto z-50">
                {tickerResults.map((ticker) => (
                  <button
                    key={ticker.symbol}
                    type="button"
                    onClick={() => handleTickerSelect(ticker)}
                    className="w-full px-4 py-3 text-left hover:bg-white/5 transition-colors border-b border-border last:border-b-0"
                  >
                    <span className="font-['JetBrains_Mono'] font-semibold text-accent-green">
                      {ticker.symbol}
                    </span>
                    <span className="text-sm text-text-muted ml-2 truncate">
                      {ticker.name}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="px-8 py-4 bg-gradient-to-r from-accent-green to-accent-cyan text-black font-semibold rounded-lg text-sm transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent-green/25"
          >
            리포트 신청
          </button>
        </form>
      </div>
    </section>
  );
}
