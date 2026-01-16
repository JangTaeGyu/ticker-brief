"use client";

import { createPortal } from "react-dom";
import Modal from "./Modal";
import RemainingReports from "./RemainingReports";
import { useTickerSearch } from "@/hooks/useTickerSearch";
import { useSubscriptionForm } from "@/hooks/useSubscriptionForm";

const MAX_TICKERS = 5;

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SubscribeModal({ isOpen, onClose }: SubscribeModalProps) {
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
  } = useTickerSearch({ maxTickers: MAX_TICKERS, useScrollOffset: false });

  const {
    email,
    hasStoredEmail,
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
            onFocus={() => filteredResults.length > 0 && setShowDropdown(true)}
            placeholder="티커 검색 (최대 5개)"
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
          <RemainingReports remaining={remainingReports} />
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
