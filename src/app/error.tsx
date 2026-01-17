"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-5">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">😵</div>
        <h1 className="text-2xl font-bold text-text-primary mb-4">
          문제가 발생했습니다
        </h1>
        <p className="text-text-muted mb-8">
          페이지를 불러오는 중 오류가 발생했습니다.
          <br />
          잠시 후 다시 시도해주세요.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-accent-green text-black rounded-lg font-semibold hover:bg-emerald-600 transition-colors"
          >
            다시 시도
          </button>
          <button
            onClick={() => (window.location.href = "/")}
            className="px-6 py-3 bg-bg-card border border-border text-text-primary rounded-lg font-semibold hover:border-accent-green transition-colors"
          >
            홈으로 이동
          </button>
        </div>
        {error.digest && (
          <p className="mt-6 text-xs text-text-muted">
            오류 코드: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
