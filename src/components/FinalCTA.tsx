"use client";

import { createPortal } from "react-dom";
import { useTickerSearch } from "@/hooks/useTickerSearch";
import { useSubscriptionForm } from "@/hooks/useSubscriptionForm";

const MAX_TICKERS = 5;
const WEEKLY_LIMIT = 10;

export default function FinalCTA() {
  const {
    tickerQuery,
    selectedTickers,
    isSearching,
    showDropdown,
    dropdownPosition,
    filteredResults,
    dropdownRef,
    inputRef,
    handleTickerInputChange,
    handleTickerSelect,
    handleRemoveTicker,
    setShowDropdown,
    clearSelectedTickers,
  } = useTickerSearch({
    maxTickers: MAX_TICKERS,
    useScrollOffset: true,
    minDropdownWidth: 340,
  });

  const {
    email,
    remainingReports,
    isSubmitting,
    submitStatus,
    setEmail,
    handleSubmit: submitForm,
  } = useSubscriptionForm({
    onSuccess: () => {
      clearSelectedTickers();
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm(selectedTickers.map((t) => t.symbol));
  };

  return (
    <section
      id="subscribe"
      className="relative py-24 px-10 text-center max-md:py-16 max-md:px-5"
    >
      <div className="max-w-[600px] mx-auto">
        <h2 className="font-['Playfair_Display'] text-[clamp(28px,4vw,40px)] font-bold mb-4">
          지금 무료로 리포트 받아보세요
        </h2>
        <p className="text-text-secondary text-lg mb-2">
          이메일과 관심 종목만 입력하면 끝!
        </p>
        <div className="inline-flex items-center gap-2 bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan text-sm px-4 py-2 my-2 rounded-full mb-10">
          <span>📋</span>
          <span>1주일에 최대 <strong>10개</strong> 종목까지 리포트 신청 가능</span>
        </div>

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
              onFocus={() => filteredResults.length > 0 && setShowDropdown(true)}
              placeholder="티커 검색 (최대 5개)"
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

        {/* Remaining Reports Info */}
        {remainingReports !== null && (
          <p className={`mt-4 text-sm ${remainingReports === 0 ? "text-red-400" : "text-text-muted"}`}>
            이번 주 남은 리포트: <span className="font-semibold text-accent-green">{remainingReports}</span> / {WEEKLY_LIMIT}
          </p>
        )}

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
