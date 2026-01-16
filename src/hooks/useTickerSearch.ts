"use client";

import { useState, useEffect, useRef, useCallback, useMemo, RefObject } from "react";

export interface TickerResult {
  symbol: string;
  name: string;
}

interface DropdownPosition {
  top: number;
  left: number;
  width: number;
}

interface UseTickerSearchOptions {
  maxTickers?: number;
  useScrollOffset?: boolean;
  minDropdownWidth?: number;
}

interface UseTickerSearchReturn {
  // State
  tickerQuery: string;
  tickerResults: TickerResult[];
  selectedTickers: TickerResult[];
  isSearching: boolean;
  showDropdown: boolean;
  dropdownPosition: DropdownPosition;
  filteredResults: TickerResult[];

  // Refs
  dropdownRef: RefObject<HTMLDivElement | null>;
  inputRef: RefObject<HTMLInputElement | null>;

  // Actions
  setTickerQuery: (query: string) => void;
  handleTickerInputChange: (value: string) => void;
  handleTickerSelect: (ticker: TickerResult) => void;
  handleRemoveTicker: (symbol: string) => void;
  setShowDropdown: (show: boolean) => void;
  clearSelectedTickers: () => void;
}

const DEFAULT_MAX_TICKERS = 5;

export function useTickerSearch(options: UseTickerSearchOptions = {}): UseTickerSearchReturn {
  const {
    maxTickers = DEFAULT_MAX_TICKERS,
    useScrollOffset = false,
    minDropdownWidth = 0
  } = options;

  const [tickerQuery, setTickerQuery] = useState("");
  const [tickerResults, setTickerResults] = useState<TickerResult[]>([]);
  const [selectedTickers, setSelectedTickers] = useState<TickerResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<DropdownPosition>({ top: 0, left: 0, width: 0 });

  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Update dropdown position when showing
  useEffect(() => {
    if (showDropdown && inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + (useScrollOffset ? window.scrollY : 0) + 4,
        left: rect.left + (useScrollOffset ? window.scrollX : 0),
        width: Math.max(rect.width, minDropdownWidth),
      });
    }
  }, [showDropdown, tickerResults, useScrollOffset, minDropdownWidth]);

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

  const handleTickerInputChange = useCallback((value: string) => {
    setTickerQuery(value.toUpperCase());
  }, []);

  const handleTickerSelect = useCallback((ticker: TickerResult) => {
    setSelectedTickers((prev) => {
      if (prev.some((t) => t.symbol === ticker.symbol)) {
        return prev;
      }
      if (prev.length >= maxTickers) {
        return prev;
      }
      return [...prev, ticker];
    });
    setTickerQuery("");
    setShowDropdown(false);
  }, [maxTickers]);

  const handleRemoveTicker = useCallback((symbol: string) => {
    setSelectedTickers((prev) => prev.filter((t) => t.symbol !== symbol));
  }, []);

  const clearSelectedTickers = useCallback(() => {
    setSelectedTickers([]);
  }, []);

  // 선택되지 않은 검색 결과만 필터링
  const filteredResults = useMemo(() => {
    return tickerResults.filter(
      (ticker) => !selectedTickers.some((t) => t.symbol === ticker.symbol)
    );
  }, [tickerResults, selectedTickers]);

  return {
    // State
    tickerQuery,
    tickerResults,
    selectedTickers,
    isSearching,
    showDropdown,
    dropdownPosition,
    filteredResults,

    // Refs
    dropdownRef,
    inputRef,

    // Actions
    setTickerQuery,
    handleTickerInputChange,
    handleTickerSelect,
    handleRemoveTicker,
    setShowDropdown,
    clearSelectedTickers,
  };
}
