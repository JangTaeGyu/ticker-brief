"use client";

import { useState, useEffect, useRef } from "react";

function useCountUp(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (end <= 0) return;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = timestamp - startTimeRef.current;
      const percentage = Math.min(progress / duration, 1);

      // easeOutQuad for smooth deceleration
      const eased = 1 - (1 - percentage) * (1 - percentage);
      const currentCount = Math.floor(eased * end);

      if (currentCount !== countRef.current) {
        countRef.current = currentCount;
        setCount(currentCount);
      }

      if (percentage < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration]);

  return count;
}

export default function Hero() {
  const [reportCount, setReportCount] = useState<number | null>(null);
  const animatedCount = useCountUp(reportCount || 0, 1500);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("/api/stats");
        const data = await response.json();
        setReportCount(data.count);
      } catch (error) {
        console.error("Stats fetch error:", error);
      }
    }
    fetchStats();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-10 pt-32 pb-20 z-[1] max-md:px-5 max-md:pt-24 max-md:pb-16">
      <div className="max-w-[900px] text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-accent-green-dim border border-accent-green/30 px-4 py-2 rounded-full text-[13px] font-medium text-accent-green mb-7">
          <span className="w-2 h-2 bg-accent-green rounded-full animate-pulse" />
          🎉 현재 무료 베타 운영 중
        </div>

        {/* Title */}
        <h1 className="font-['Playfair_Display'] text-[clamp(40px,7vw,68px)] font-bold leading-[1.15] mb-6">
          AI가 분석하는
          <br />
          <span className="bg-gradient-to-r from-accent-green via-accent-cyan to-accent-blue bg-clip-text text-transparent">
            프리미엄 주식 리포트
          </span>
        </h1>

        {/* Description */}
        <p className="text-lg text-text-secondary max-w-[650px] mx-auto mb-8 leading-relaxed">
          DCF 적정가, SWOT, 투자 시나리오, 기술적 지표,
          <br />
          ESG, 피어 비교, 리스크 분석, 이벤트 캘린더 까지 한 번에 확인하세요.
        </p>

        {/* Trust indicators */}
        <div className="flex justify-center gap-7 text-text-muted text-[13px] max-md:flex-col max-md:gap-3 max-md:items-center">
          <span className="flex items-center gap-1.5">✓ 100% 무료</span>
          <span className="flex items-center gap-1.5">✓ 미국 주식 지원</span>
          <span className="flex items-center gap-1.5">✓ 10분 내 발송</span>
        </div>

        {/* Report Count Badge */}
        {reportCount !== null && reportCount > 0 && (
          <div className="mt-8 inline-flex items-baseline gap-2 text-sm text-text-secondary">
            <span className="bg-accent-green text-black px-2 py-1 rounded text-xs font-bold translate-y-[-1px]">
              현재
            </span>
            <span>
              <span className="text-accent-green font-bold text-lg">{animatedCount.toLocaleString()}+</span> 리포트 발송 완료
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
