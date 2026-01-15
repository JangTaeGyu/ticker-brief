"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "tickerbrief_cart";

export interface CartItem {
  ticker: string;
  grade: string | null;
  upside: number | null;
  score: number | null;
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // localStorage에서 장바구니 불러오기
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setItems(parsed);
      } catch (e) {
        console.error("Failed to parse cart from localStorage:", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // 장바구니 변경 시 localStorage에 저장
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, isLoaded]);

  // 장바구니에 추가
  const addItem = useCallback((item: CartItem) => {
    setItems((prev) => {
      if (prev.some((i) => i.ticker === item.ticker)) {
        return prev;
      }
      return [...prev, item];
    });
  }, []);

  // 장바구니에서 제거
  const removeItem = useCallback((ticker: string) => {
    setItems((prev) => prev.filter((i) => i.ticker !== ticker));
  }, []);

  // 장바구니에 있는지 확인
  const isInCart = useCallback(
    (ticker: string) => items.some((i) => i.ticker === ticker),
    [items]
  );

  // 장바구니 토글 (추가/제거)
  const toggleItem = useCallback(
    (item: CartItem) => {
      if (isInCart(item.ticker)) {
        removeItem(item.ticker);
      } else {
        addItem(item);
      }
    },
    [isInCart, removeItem, addItem]
  );

  // 장바구니 비우기
  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  // 티커 목록만 반환
  const getTickers = useCallback(() => items.map((i) => i.ticker), [items]);

  return {
    items,
    count: items.length,
    isLoaded,
    addItem,
    removeItem,
    isInCart,
    toggleItem,
    clearCart,
    getTickers,
  };
}
