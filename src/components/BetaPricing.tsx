export default function BetaPricing() {
  return (
    <section id="pricing" className="relative z-[1] py-28 px-10 max-md:py-20 max-md:px-5">
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="font-['JetBrains_Mono'] text-xs font-semibold text-accent-green uppercase tracking-[2px] mb-3">
            🎉 Free Beta
          </div>
          <h2 className="font-['Playfair_Display'] text-[clamp(32px,4vw,44px)] font-bold mb-4">
            현재 무료로 운영 중입니다
          </h2>
          <p className="text-[17px] text-text-secondary max-w-[560px] mx-auto">
            베타 기간 동안 모든 기능을 무료로 이용하세요
          </p>
        </div>

        {/* Feature Categories */}
        <div className="grid grid-cols-4 gap-5 mb-16 max-lg:grid-cols-2 max-md:grid-cols-1">
          <FeatureCard
            icon="🎯"
            title="핵심 분석"
            features={[
              "DCF 적정가 분석",
              "Bull/Base/Bear 시나리오",
              "SWOT 경쟁력 분석",
              "매매 전략 가이드",
              "리스크/수익 매트릭스",
              "다중 밸류에이션 비교",
            ]}
          />
          <FeatureCard
            icon="🤖"
            title="AI 분석"
            features={[
              "핵심 투자 논점",
              "산업 분석",
              "리스크 요인 분석",
              "촉매 이벤트 분석",
              "ESG 분석",
              "AI 투자 요약",
              "뉴스 요약",
            ]}
          />
          <FeatureCard
            icon="📊"
            title="데이터 분석"
            features={[
              "주요 지표 카드",
              "기술적 지표",
              "백테스트 분석",
              "점수 산출 상세",
              "리스크 지표 + 게이지",
              "자금 흐름 분석",
            ]}
          />
          <FeatureCard
            icon="🌐"
            title="외부 데이터"
            features={[
              "주가 차트 (6개월)",
              "기업 개요",
              "재무 및 밸류에이션",
              "동종 업계 비교",
              "애널리스트 목표가",
              "실적 서프라이즈 이력",
              "주주 현황",
              "이벤트 캘린더",
              "매크로 환경 (FRED)",
            ]}
          />
        </div>

        {/* Beta Notice */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-accent-green/10 border border-accent-green/30 px-6 py-3 rounded-lg">
            <span className="bg-accent-green text-black px-3 py-1 rounded text-xs font-bold">
              BETA
            </span>
            <span className="text-text-secondary">
              위 <strong className="text-accent-green">31개 분석 항목</strong>을 현재 무료로 제공합니다
            </span>
          </div>
        </div>

        {/* How It Works */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold">리포트 받는 방법</h3>
        </div>
        <div className="flex justify-center items-center gap-6 pb-8 flex-wrap max-md:flex-col">
          <BetaStep num={1} title="이메일 & 종목 등록">
            이메일 주소와 분석 원하는 미국 주식 티커를 입력하세요
          </BetaStep>
          <div className="text-2xl text-text-muted max-md:rotate-90">→</div>
          <BetaStep num={2} title="리포트 생성">
            관리자가 확인 후 AI 분석 리포트를 생성합니다
          </BetaStep>
          <div className="text-2xl text-text-muted max-md:rotate-90">→</div>
          <BetaStep num={3} title="이메일 수신">
            완성된 리포트를 이메일로 받아보세요
          </BetaStep>
        </div>

      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  features,
}: {
  icon: string;
  title: string;
  features: string[];
}) {
  return (
    <div className="bg-bg-card border border-border rounded-xl p-6 transition-all duration-300 hover:border-accent-green/50 hover:-translate-y-1">
      <div className="text-[28px] mb-3">{icon}</div>
      <h3 className="text-base font-bold mb-1">{title}</h3>
      <p className="text-xs text-text-muted mb-4">{features.length}개 항목</p>
      <ul className="space-y-2">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2 text-[13px] text-text-secondary">
            <span className="text-accent-green">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BetaStep({
  num,
  title,
  children,
}: {
  num: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-bg-card border border-border rounded-lg p-7 text-center w-[220px] max-md:w-full max-md:max-w-[280px]">
      <div className="w-10 h-10 bg-accent-green text-black rounded-lg flex items-center justify-center font-['JetBrains_Mono'] text-lg font-bold mx-auto mb-4">
        {num}
      </div>
      <h4 className="text-base font-bold mb-2">{title}</h4>
      <p className="text-[13px] text-text-muted leading-relaxed">{children}</p>
    </div>
  );
}

