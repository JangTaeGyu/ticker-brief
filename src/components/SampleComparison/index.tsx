import {
  ReportSection,
  MetricBox,
  MiniChart,
  LockedContent,
  FeatureTag,
  SwotItem,
  ScenarioItem,
} from "./SampleComponents";

export default function SampleComparison() {
  return (
    <section
      id="samples"
      className="relative z-[1] bg-bg-secondary py-28 px-10 max-md:py-20 max-md:px-5"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="font-['JetBrains_Mono'] text-xs font-semibold text-accent-green uppercase tracking-[2px] mb-3">
            Report Preview
          </div>
          <h2 className="font-['Playfair_Display'] text-[clamp(32px,4vw,44px)] font-bold mb-4">
            기본 분석 vs 전체 분석
          </h2>
          <p className="text-[17px] text-text-secondary max-w-[560px] mx-auto">
            베타 기간 동안 전체 분석을 무료로 제공합니다 (향후 유료 전환 예정)
          </p>
        </div>

        {/* Sample Grid */}
        <div className="grid grid-cols-2 gap-8 max-lg:grid-cols-1 max-lg:max-w-[500px] max-lg:mx-auto">
          {/* Free Sample Card */}
          <FreeSampleCard />

          {/* Pro Sample Card */}
          <ProSampleCard />
        </div>
      </div>
    </section>
  );
}

function FreeSampleCard() {
  return (
    <div className="bg-bg-card border border-border rounded-[20px] overflow-hidden opacity-85">
      {/* Card Header */}
      <div className="px-7 py-6 border-b border-border flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="font-['JetBrains_Mono'] text-lg font-bold">
            NVDA
          </span>
          <span className="text-[13px] text-text-muted">NVIDIA Corp</span>
        </div>
        <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-text-muted/20 text-text-muted">
          기본 분석
        </span>
      </div>

      {/* Card Body */}
      <div className="p-7">
        {/* Basic Metrics */}
        <ReportSection icon="📊" title="기본 지표">
          <div className="grid grid-cols-3 gap-3 max-md:grid-cols-2">
            <MetricBox label="현재가" value="$142.87" />
            <MetricBox label="등락률" value="+8.4%" variant="up" />
            <MetricBox label="시가총액" value="$3.5T" />
            <MetricBox label="거래량" value="412M" variant="up" />
            <MetricBox label="PER" value="65.2x" />
            <MetricBox label="52주 고가" value="$152.89" />
          </div>
        </ReportSection>

        {/* Price Chart */}
        <ReportSection icon="📈" title="가격 추이 (30일)">
          <MiniChart />
        </ReportSection>

        {/* Locked: AI Analysis */}
        <ReportSection icon="🤖" title="AI 투자 의견">
          <LockedContent>
            Pro 플랜에서 AI가 분석한
            <br />
            투자 논점과 핵심 모니터링 포인트를 확인하세요
          </LockedContent>
        </ReportSection>

        {/* Locked: DCF */}
        <ReportSection icon="💰" title="DCF 적정가 분석">
          <LockedContent>
            현금흐름 할인 모델 기반
            <br />
            적정 주가와 상승 여력을 확인하세요
          </LockedContent>
        </ReportSection>

        {/* Locked: SWOT */}
        <ReportSection icon="🎯" title="SWOT / 시나리오 분석">
          <LockedContent>
            강점/약점/기회/위협 분석과
            <br />
            Bull/Base/Bear 목표가를 확인하세요
          </LockedContent>
        </ReportSection>

        {/* Features Included */}
        <div className="mt-6 pt-5 border-t border-border">
          <h4 className="text-xs text-text-muted mb-3">
            기본 분석만 포함
          </h4>
          <div className="flex flex-wrap gap-2">
            <FeatureTag included>기본 지표</FeatureTag>
            <FeatureTag included>가격 차트</FeatureTag>
            <FeatureTag included>거래량</FeatureTag>
            <FeatureTag>AI 분석</FeatureTag>
            <FeatureTag>DCF 적정가</FeatureTag>
            <FeatureTag>SWOT</FeatureTag>
            <FeatureTag>백테스트</FeatureTag>
            <FeatureTag>시나리오</FeatureTag>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProSampleCard() {
  return (
    <div className="bg-bg-card border-2 border-accent-green rounded-[20px] overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.25)]">
      {/* Card Header */}
      <div className="px-7 py-6 border-b border-border flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="font-['JetBrains_Mono'] text-lg font-bold">
            NVDA
          </span>
          <span className="text-[13px] text-text-muted">NVIDIA Corp</span>
        </div>
        <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-accent-green-dim text-accent-green">
          ✨ 전체 분석
        </span>
      </div>

      {/* Card Body */}
      <div className="p-7">
        {/* Basic Metrics */}
        <ReportSection icon="📊" title="기본 지표">
          <div className="grid grid-cols-3 gap-3 max-md:grid-cols-2">
            <MetricBox label="현재가" value="$142.87" />
            <MetricBox label="등락률" value="+8.4%" variant="up" />
            <MetricBox label="시가총액" value="$3.5T" />
            <MetricBox label="거래량 비율" value="3.2x ↑" variant="up" />
            <MetricBox label="RSI (14)" value="72.4" variant="up" />
            <MetricBox label="종합점수" value="78.5" variant="up" />
          </div>
        </ReportSection>

        {/* AI Analysis */}
        <ReportSection icon="🤖" title="AI 투자 의견">
          <div className="bg-gradient-to-br from-accent-green/10 to-accent-cyan/10 border border-accent-green/20 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2.5 text-xs font-semibold text-accent-green">
              <span>🤖</span> AI Analysis
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              NVIDIA는 AI 가속기 시장에서 독보적 지위를 유지하고 있으며,
              Blackwell 아키텍처 출시로 데이터센터 매출 성장이 가속화될
              전망입니다. 현재 밸류에이션은 높지만, FCF 성장률을 고려하면
              정당화 가능합니다.{" "}
              <strong className="text-text-primary">
                핵심 모니터링:
              </strong>{" "}
              중국 수출 규제 영향, 경쟁사 AMD MI300 점유율.
            </p>
          </div>
        </ReportSection>

        {/* DCF */}
        <ReportSection icon="💰" title="DCF 적정가 분석">
          <div className="bg-accent-blue/10 border border-accent-blue/20 rounded-xl p-4">
            <div className="flex justify-between items-center mb-3">
              <div>
                <div className="text-xs text-text-muted">DCF 적정가</div>
                <div className="font-['JetBrains_Mono'] text-2xl font-bold text-accent-blue">
                  $168.50
                </div>
              </div>
              <div className="text-[13px] text-accent-green">
                +18% 상승 여력
              </div>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden mt-3">
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent-red via-accent-orange to-accent-green"
                style={{ width: "35%" }}
              />
            </div>
            <div className="flex justify-between mt-1.5 text-[10px] text-text-muted">
              <span>Bear $95</span>
              <span>현재가 $142.87</span>
              <span>Bull $210</span>
            </div>
          </div>
        </ReportSection>

        {/* SWOT */}
        <ReportSection icon="🎯" title="SWOT 분석">
          <div className="grid grid-cols-2 gap-2.5">
            <SwotItem variant="strength" label="STRENGTH">
              AI 가속기 시장 80%+ 점유율
            </SwotItem>
            <SwotItem variant="weakness" label="WEAKNESS">
              고객 집중도 (빅테크 의존)
            </SwotItem>
            <SwotItem variant="opportunity" label="OPPORTUNITY">
              엣지 AI, 자율주행 시장 확대
            </SwotItem>
            <SwotItem variant="threat" label="THREAT">
              중국 수출 규제 강화
            </SwotItem>
          </div>
        </ReportSection>

        {/* Scenario */}
        <ReportSection icon="📐" title="Bull / Base / Bear 시나리오">
          <div className="grid grid-cols-3 gap-2.5">
            <ScenarioItem
              variant="bull"
              label="🐂 BULL"
              price="$210"
              change="+47%"
            />
            <ScenarioItem
              variant="base"
              label="📊 BASE"
              price="$165"
              change="+15%"
            />
            <ScenarioItem
              variant="bear"
              label="🐻 BEAR"
              price="$95"
              change="-33%"
            />
          </div>
        </ReportSection>

        {/* Features Included */}
        <div className="mt-6 pt-5 border-t border-border">
          <h4 className="text-xs text-text-muted mb-3">포함된 분석</h4>
          <div className="flex flex-wrap gap-2">
            <FeatureTag included>기본 지표</FeatureTag>
            <FeatureTag included>기술적 분석</FeatureTag>
            <FeatureTag included>AI 투자 의견</FeatureTag>
            <FeatureTag included>DCF 적정가</FeatureTag>
            <FeatureTag included>SWOT</FeatureTag>
            <FeatureTag included>ESG</FeatureTag>
            <FeatureTag included>피어 비교</FeatureTag>
            <FeatureTag included>백테스트</FeatureTag>
            <FeatureTag included>시나리오</FeatureTag>
            <FeatureTag included>리스크 분석</FeatureTag>
          </div>
        </div>

        {/* Beta Notice Banner */}
        <div className="mt-5 bg-gradient-to-r from-accent-green to-accent-cyan rounded-xl py-4 px-6 text-center">
          <p className="text-black text-sm">
            🎉 <strong className="font-bold">베타 기간 한정!</strong> 현재
            전체 분석을 무료로 제공합니다
          </p>
          <p className="text-black/70 text-xs mt-1.5">
            정식 서비스 오픈 시 기본 분석은 무료, 전체 분석은 유료로 전환됩니다
          </p>
        </div>
      </div>
    </div>
  );
}
