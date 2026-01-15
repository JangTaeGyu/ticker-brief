"use client";

import { useState, useEffect } from "react";
import { useCartContext } from "@/contexts/CartContext";
import CartPanel from "./CartPanel";
import { getGradeTextColor } from "@/lib/gradeColors";

const STORAGE_KEY = "tickerbrief_email";

export default function CartButton() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [hasStoredEmail, setHasStoredEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const { items, count, isLoaded, removeItem, clearCart } = useCartContext();

  // localStorage에서 이메일 불러오기
  useEffect(() => {
    const storedEmail = localStorage.getItem(STORAGE_KEY);
    if (storedEmail) {
      setEmail(storedEmail);
      setHasStoredEmail(true);
    }
  }, []);

  // 패널 열릴 때 상태 초기화
  useEffect(() => {
    if (isPanelOpen) {
      setSubmitStatus(null);
    }
  }, [isPanelOpen]);

  const handleSubmit = async () => {
    setSubmitStatus(null);

    if (!email || !email.includes("@")) {
      setSubmitStatus({ type: "error", message: "유효한 이메일 주소를 입력해주세요." });
      return;
    }

    if (items.length === 0) {
      setSubmitStatus({ type: "error", message: "장바구니가 비어있습니다." });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          tickers: items.map((item) => item.ticker),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "신청 중 오류가 발생했습니다.");
      }

      // 이메일 저장
      localStorage.setItem(STORAGE_KEY, email);
      setHasStoredEmail(true);

      setSubmitStatus({
        type: "success",
        message: `${items.length}개 티커 신청이 완료되었습니다!`,
      });

      // 2초 후 장바구니 비우고 패널 닫기
      setTimeout(() => {
        clearCart();
        setIsPanelOpen(false);
      }, 2000);
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: error instanceof Error ? error.message : "신청 중 오류가 발생했습니다.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 로딩 전이거나 장바구니가 비어있으면 렌더링하지 않음
  if (!isLoaded || count === 0) {
    return null;
  }

  return (
    <>
      {/* 플로팅 버튼 */}
      <button
        onClick={() => setIsPanelOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-accent-green text-black rounded-full shadow-lg hover:bg-emerald-600 transition-all hover:scale-105"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
        </svg>
        <span className="font-semibold text-sm">장바구니</span>
        <span className="flex items-center justify-center w-6 h-6 bg-black text-white text-xs font-bold rounded-full">
          {count}
        </span>
      </button>

      {/* 장바구니 패널 */}
      <CartPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        title={<>장바구니 <small className="text-text-muted font-normal">{count}</small></>}
      >
        {/* 장바구니 목록 */}
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.ticker}
              className="p-3 rounded-lg bg-bg-card border border-border"
            >
              <div className="grid grid-cols-4 gap-2 text-center">
                <div>
                  <div className="text-xs text-text-muted mb-1">티커</div>
                  <div className="font-bold">{item.ticker}</div>
                </div>
                <div>
                  <div className="text-xs text-text-muted mb-1">등급</div>
                  <div className={`font-semibold ${item.grade ? getGradeTextColor(item.grade) : "text-text-muted"}`}>
                    {item.grade || "-"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-text-muted mb-1">상승여력</div>
                  <div className={`font-semibold ${
                    item.upside == null ? "text-text-muted" :
                    item.upside >= 0 ? "text-accent-green" : "text-red-400"
                  }`}>
                    {item.upside != null ? `${item.upside >= 0 ? "+" : ""}${item.upside.toFixed(1)}%` : "-"}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-text-muted mb-1">점수</div>
                  <div className="font-semibold text-text-primary">
                    {item.score != null ? item.score : "-"}
                  </div>
                </div>
              </div>
              <button
                onClick={() => removeItem(item.ticker)}
                className="w-full mt-2 pt-2 border-t border-border text-xs text-text-muted hover:text-red-400 transition-colors"
              >
                제거
              </button>
            </div>
          ))}
        </div>

        {/* 하단 액션 영역 */}
        <div className="mt-6 pt-4 border-t border-border space-y-4">
          {/* 이메일 입력 (저장된 이메일이 없을 때만 표시) */}
          {!hasStoredEmail && (
            <div>
              <label className="block text-xs text-text-muted mb-2">
                리포트를 받을 이메일
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일 주소"
                className="w-full px-4 py-3 bg-bg-primary border border-border rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-green transition-colors"
              />
            </div>
          )}

          {/* 저장된 이메일 표시 */}
          {hasStoredEmail && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-muted">리포트 수신 이메일</span>
              <span className="text-text-primary">{email}</span>
            </div>
          )}

          {/* 상태 메시지 */}
          {submitStatus && (
            <div
              className={`p-3 rounded-lg text-sm ${
                submitStatus.type === "success"
                  ? "bg-accent-green/20 text-accent-green"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {submitStatus.message}
            </div>
          )}

          {/* 버튼들 */}
          <div className="space-y-2">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || submitStatus?.type === "success"}
              className="w-full py-3 bg-accent-green text-black font-semibold rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "신청 중..." : "리포트 신청하기"}
            </button>
            <button
              onClick={clearCart}
              disabled={isSubmitting}
              className="w-full py-2.5 text-sm text-text-muted hover:text-red-400 transition-colors disabled:opacity-50"
            >
              전체 비우기
            </button>
          </div>
        </div>
      </CartPanel>
    </>
  );
}
