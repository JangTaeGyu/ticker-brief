export default function Hero() {
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
        <div className="flex justify-center gap-7 text-text-muted text-[13px] max-md:flex-col max-md:gap-3">
          <span className="flex items-center gap-1.5">✓ 100% 무료</span>
          <span className="flex items-center gap-1.5">✓ 미국 주식 지원</span>
          <span className="flex items-center gap-1.5">✓ 12시간 내 발송</span>
        </div>
      </div>
    </section>
  );
}
