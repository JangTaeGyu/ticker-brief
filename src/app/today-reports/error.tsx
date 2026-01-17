"use client";

import { useEffect } from "react";

export default function TodayReportsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Today Reports Error:", error);
  }, [error]);

  return (
    <main className="min-h-screen pt-32 pb-20 px-10 max-md:px-5">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center">
          <div className="text-6xl mb-6">📊</div>
          <h1 className="text-2xl font-bold text-text-primary mb-4">
            리포트를 불러올 수 없습니다
          </h1>
          <p className="text-text-muted mb-8 max-w-md mx-auto">
            오늘의 리포트를 불러오는 중 문제가 발생했습니다.
            <br />
            네트워크 연결을 확인하고 다시 시도해주세요.
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
    </main>
  );
}
