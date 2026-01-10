"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface TickerResult {
  symbol: string;
  name: string;
}

const MAX_TICKERS = 3;

export default function FinalCTA() {
  const [email, setEmail] = useState("");
  const [tickerQuery, setTickerQuery] = useState("");
  const [tickerResults, setTickerResults] = useState<TickerResult[]>([]);
  const [selectedTickers, setSelectedTickers] = useState<TickerResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Update dropdown position when showing
  useEffect(() => {
    if (showDropdown && inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: Math.max(rect.width, 340),
      });
    }
  }, [showDropdown, tickerResults]);

  // Debounced search
  useEffect(() => {
    if (!tickerQuery || tickerQuery.length < 1) {
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
  }, [tickerQuery]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTickerSelect = (ticker: TickerResult) => {
    if (selectedTickers.some((t) => t.symbol === ticker.symbol)) {
      return;
    }
    if (selectedTickers.length >= MAX_TICKERS) {
      return;
    }
    setSelectedTickers([...selectedTickers, ticker]);
    setTickerQuery("");
    setShowDropdown(false);
  };

  const handleRemoveTicker = (symbol: string) => {
    setSelectedTickers(selectedTickers.filter((t) => t.symbol !== symbol));
  };

  const handleTickerInputChange = (value: string) => {
    setTickerQuery(value.toUpperCase());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus(null);

    if (!email || !email.includes("@")) {
      setSubmitStatus({ type: "error", message: "유효한 이메일 주소를 입력해주세요." });
      return;
    }

    if (selectedTickers.length === 0) {
      setSubmitStatus({ type: "error", message: "최소 1개의 종목을 선택해주세요." });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          tickers: selectedTickers.map((t) => t.symbol),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "신청 중 오류가 발생했습니다.");
      }

      setSubmitStatus({ type: "success", message: "신청이 완료되었습니다! 곧 리포트를 받아보실 수 있습니다." });
      setEmail("");
      setSelectedTickers([]);
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: error instanceof Error ? error.message : "신청 중 오류가 발생했습니다.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredResults = tickerResults.filter(
    (ticker) => !selectedTickers.some((t) => t.symbol === ticker.symbol)
  );

  return (
    <section
      id="subscribe"
      className="relative py-24 px-10 text-center max-md:py-16 max-md:px-5"
    >
      <div className="max-w-[600px] mx-auto">
        <h2 className="font-['Playfair_Display'] text-[clamp(28px,4vw,40px)] font-bold mb-4">
          지금 무료로 리포트 받아보세요
        </h2>
        <p className="text-text-secondary text-lg mb-10">
          이메일과 관심 종목만 입력하면 끝!
        </p>

        <form onSubmit={handleSubmit} className="flex gap-3 justify-center flex-wrap max-md:flex-col">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일 주소"
            required
            className="flex-1 min-w-[200px] max-w-[280px] px-5 py-4 bg-bg-card border border-border rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-green transition-colors max-md:max-w-full"
          />

          {/* Ticker Search */}
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              name="ticker"
              value={tickerQuery}
              onChange={(e) => handleTickerInputChange(e.target.value)}
              onFocus={() => tickerResults.length > 0 && setShowDropdown(true)}
              placeholder="티커 검색 (최대 3개)"
              autoComplete="off"
              className="w-[200px] px-5 py-4 bg-bg-card border border-border rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-green transition-colors max-md:w-full"
            />

            {/* Loading indicator */}
            {isSearching && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <div className="w-4 h-4 border-2 border-accent-green border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={selectedTickers.length === 0 || isSubmitting}
            className="px-8 py-4 bg-gradient-to-r from-accent-green to-accent-cyan text-black font-semibold rounded-lg text-sm transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent-green/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
          >
            {isSubmitting ? "신청 중..." : "리포트 신청"}
          </button>
        </form>

        {/* Dropdown Portal */}
        {showDropdown && filteredResults.length > 0 && typeof document !== "undefined" &&
          createPortal(
            <div
              ref={dropdownRef}
              style={{
                position: "absolute",
                top: dropdownPosition.top,
                left: dropdownPosition.left,
                width: dropdownPosition.width,
                zIndex: 99999,
              }}
              className="bg-[#0d1117] border border-border rounded-lg shadow-2xl max-h-50 overflow-y-auto"
            >
              {filteredResults.map((ticker) => (
                <button
                  key={ticker.symbol}
                  type="button"
                  onClick={() => handleTickerSelect(ticker)}
                  className="w-full px-4 py-3 text-left bg-bg-card hover:bg-[#161b22] transition-colors border-b border-border last:border-b-0"
                >
                  <span className="font-['JetBrains_Mono'] font-semibold text-accent-green">
                    {ticker.symbol}
                  </span>
                  <span className="text-sm text-text-muted ml-2 truncate">
                    {ticker.name}
                  </span>
                </button>
              ))}
            </div>,
            document.body
          )
        }

        {/* Selected tickers badges */}
        {selectedTickers.length > 0 && (
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {selectedTickers.map((ticker) => (
              <div
                key={ticker.symbol}
                className="flex items-center gap-2 bg-accent-green/20 text-accent-green text-xs px-3 py-1.5 rounded-lg"
              >
                <span className="font-['JetBrains_Mono'] font-semibold">{ticker.symbol}</span>
                <span className="text-text-muted hidden sm:inline">{ticker.name}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTicker(ticker.symbol)}
                  className="ml-1 text-text-muted hover:text-text-primary"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Counter */}
        {selectedTickers.length > 0 && (
          <p className="mt-3 text-xs text-text-muted">
            {selectedTickers.length} / {MAX_TICKERS} 종목 선택됨
          </p>
        )}

        {/* Submit Status Message */}
        {submitStatus && (
          <div
            className={`mt-6 p-4 rounded-lg text-sm ${
              submitStatus.type === "success"
                ? "bg-accent-green/20 text-accent-green"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {submitStatus.message}
          </div>
        )}
      </div>
    </section>
  );
}
