"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Modal from "./Modal";

interface TickerResult {
  symbol: string;
  name: string;
}

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MAX_TICKERS = 3;
const WEEKLY_LIMIT = 10;
const STORAGE_KEY = "tickerbrief_email";

export default function SubscribeModal({ isOpen, onClose }: SubscribeModalProps) {
  const [email, setEmail] = useState("");
  const [hasStoredEmail, setHasStoredEmail] = useState(false);
  const [tickerQuery, setTickerQuery] = useState("");
  const [tickerResults, setTickerResults] = useState<TickerResult[]>([]);
  const [selectedTickers, setSelectedTickers] = useState<TickerResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [remainingReports, setRemainingReports] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load email from localStorage
  useEffect(() => {
    const storedEmail = localStorage.getItem(STORAGE_KEY);
    if (storedEmail) {
      setEmail(storedEmail);
      setHasStoredEmail(true);
    }
  }, []);

  // Update dropdown position when showing
  useEffect(() => {
    if (showDropdown && inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width,
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

  // Check remaining reports when email changes
  useEffect(() => {
    if (!email || !email.includes("@")) {
      setRemainingReports(null);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const response = await fetch(`/api/check-limit?email=${encodeURIComponent(email)}`);
        const data = await response.json();
        setRemainingReports(data.remaining);
      } catch (error) {
        console.error("Check limit error:", error);
        setRemainingReports(null);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [email]);

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
      if (remainingReports !== null) {
        setRemainingReports(Math.max(0, remainingReports - selectedTickers.length));
      }
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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="리포트 신청"
      subtitle="이메일과 관심 종목만 입력하면 끝!"
    >
      <div className="flex justify-center mb-6">
        <span className="inline-flex items-center gap-2 bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan text-xs px-3 py-1.5 rounded-full">
          <span>📋</span>
          <span>1주일에 최대 <strong>10개</strong> 종목까지</span>
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 이메일 입력 - localStorage에 없을 때만 표시 */}
        {!hasStoredEmail && (
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일 주소"
            required
            className="w-full px-4 py-3 bg-bg-primary border border-border rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-green transition-colors"
          />
        )}

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
            className="w-full px-4 py-3 bg-bg-primary border border-border rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-green transition-colors"
          />

          {/* Loading indicator */}
          {isSearching && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <div className="w-4 h-4 border-2 border-accent-green border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Dropdown - rendered via Portal */}
          {showDropdown && filteredResults.length > 0 && createPortal(
            <div
              ref={dropdownRef}
              style={{
                position: "fixed",
                top: dropdownPosition.top,
                left: dropdownPosition.left,
                width: dropdownPosition.width,
                zIndex: 2100,
              }}
              className="bg-bg-primary border border-border rounded-lg shadow-xl max-h-48 overflow-y-auto"
            >
              {filteredResults.map((ticker) => (
                <button
                  key={ticker.symbol}
                  type="button"
                  onClick={() => handleTickerSelect(ticker)}
                  className="w-full px-4 py-3 text-left hover:bg-bg-card transition-colors border-b border-border last:border-b-0"
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
          )}
        </div>

        {/* Selected tickers badges */}
        {selectedTickers.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedTickers.map((ticker) => (
              <div
                key={ticker.symbol}
                className="flex items-center gap-2 bg-accent-green/20 text-accent-green text-xs px-3 py-1.5 rounded-lg"
              >
                <span className="font-['JetBrains_Mono'] font-semibold">{ticker.symbol}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTicker(ticker.symbol)}
                  className="text-text-muted hover:text-text-primary"
                >
                  ✕
                </button>
              </div>
            ))}
            <span className="text-xs text-text-muted self-center">
              {selectedTickers.length} / {MAX_TICKERS}
            </span>
          </div>
        )}

        {/* Remaining Reports Info */}
        {remainingReports !== null && (
          <p className={`text-sm ${remainingReports === 0 ? "text-red-400" : "text-text-muted"}`}>
            이번 주 남은 리포트: <span className="font-semibold text-accent-green">{remainingReports}</span> / {WEEKLY_LIMIT}
          </p>
        )}

        <button
          type="submit"
          disabled={selectedTickers.length === 0 || isSubmitting}
          className="w-full py-3 bg-accent-green text-black font-semibold rounded-lg transition-all hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "신청 중..." : "신청"}
        </button>
      </form>

      {/* Submit Status Message */}
      {submitStatus && (
        <div
          className={`mt-4 p-3 rounded-lg text-sm ${
            submitStatus.type === "success"
              ? "bg-accent-green/20 text-accent-green"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          {submitStatus.message}
        </div>
      )}
    </Modal>
  );
}
