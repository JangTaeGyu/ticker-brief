export default function Comparison() {
  return (
    <section
      id="compare"
      className="relative z-[1] bg-bg-secondary py-28 px-10 max-md:py-20 max-md:px-5"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="font-['JetBrains_Mono'] text-xs font-semibold text-accent-green uppercase tracking-[2px] mb-3">
            Why TickerBrief
          </div>
          <h2 className="font-['Playfair_Display'] text-[clamp(32px,4vw,44px)] font-bold mb-4">
            경쟁사 대비 차별점
          </h2>
          <p className="text-[17px] text-text-secondary max-w-[560px] mx-auto">
            해외 유료 서비스와 동등한 분석을, 한국어로, 더 저렴하게
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto mb-12">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="bg-bg-card p-4 text-center font-semibold text-[13px] border-b border-border">
                  기능
                </th>
                <th className="bg-gradient-to-b from-accent-green/15 to-bg-card p-4 text-center font-semibold text-[13px] border-t-2 border-t-accent-green border-b border-border">
                  TickerBrief
                  <span className="block text-[11px] font-normal text-accent-green mt-1">
                    무료 (베타)
                  </span>
                </th>
                <th className="bg-bg-card p-4 text-center font-semibold text-[13px] border-b border-border">
                  Seeking Alpha
                  <span className="block text-[11px] font-normal text-text-muted mt-1">
                    $24.9/월
                  </span>
                </th>
                <th className="bg-bg-card p-4 text-center font-semibold text-[13px] border-b border-border">
                  Morningstar
                  <span className="block text-[11px] font-normal text-text-muted mt-1">
                    $22.95/월
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              <ComparisonRow
                feature="DCF 적정가 분석"
                tickerbrief={true}
                seekingAlpha={false}
                morningstar={true}
              />
              <ComparisonRow
                feature="Bull/Base/Bear 시나리오"
                tickerbrief={true}
                seekingAlpha={false}
                morningstar={true}
              />
              <ComparisonRow
                feature="SWOT 분석"
                tickerbrief={true}
                seekingAlpha={false}
                morningstar={false}
              />
              <ComparisonRow
                feature="백테스트 결과"
                tickerbrief={true}
                seekingAlpha={false}
                morningstar={false}
              />
              <ComparisonRow
                feature="AI 투자 의견"
                tickerbrief={true}
                seekingAlpha={true}
                morningstar={false}
              />
              <ComparisonRow
                feature="급등주 실시간 감지"
                tickerbrief={true}
                seekingAlpha={false}
                morningstar={false}
              />
              <ComparisonRow
                feature="한국어 지원"
                tickerbrief={true}
                seekingAlpha={false}
                morningstar={false}
              />
              <ComparisonRow
                feature="올인원 리포트"
                tickerbrief={true}
                seekingAlpha={false}
                morningstar={false}
              />
            </tbody>
          </table>
        </div>

        {/* Advantage Cards */}
        <div className="grid grid-cols-4 gap-5 mb-10 max-lg:grid-cols-2 max-md:grid-cols-1">
          <AdvantageCard
            icon="🎯"
            title="올인원 통합 리포트"
            description={
              <>
                DCF, SWOT, ESG, 백테스트, 시나리오 분석이{" "}
                <strong className="text-accent-green">
                  한 리포트에 모두 포함
                </strong>
                . 경쟁사는 각각 별도 페이지에서 확인해야 합니다.
              </>
            }
          />
          <AdvantageCard
            icon="🚀"
            title="급등주 자동 감지"
            description={
              <>
                거래량 급증, 가격 돌파 시{" "}
                <strong className="text-accent-green">
                  자동으로 리포트 생성 후 알림
                </strong>
                . 다른 서비스는 직접 검색해야 합니다.
              </>
            }
          />
          <AdvantageCard
            icon="📈"
            title="백테스트 내장"
            description={
              <>
                RSI, MACD 매매 전략의{" "}
                <strong className="text-accent-green">실제 과거 수익률</strong>
                을 확인하세요. 경쟁사에는 없는 기능입니다.
              </>
            }
          />
          <AdvantageCard
            icon="🇰🇷"
            title="완벽한 한국어"
            description={
              <>
                AI 분석 의견, 투자 논점, 리스크 요인까지{" "}
                <strong className="text-accent-green">자연스러운 한국어</strong>
                로 제공합니다.
              </>
            }
          />
        </div>

        {/* Honest Note */}
        <div className="bg-yellow-500/10 border border-yellow-500/25 rounded-[14px] p-6 flex gap-5 items-start max-md:flex-col max-md:gap-3">
          <div className="text-[28px] shrink-0">💬</div>
          <div>
            <h4 className="text-[15px] font-bold text-yellow-500 mb-2">
              솔직한 한계점
            </h4>
            <p className="text-sm text-text-secondary leading-relaxed">
              TickerBrief는 무료 데이터 소스(yfinance, Finnhub)를 활용합니다.
              Morningstar의 20년 트랙레코드나 Seeking Alpha의 18,000+ 전문
              애널리스트 커뮤니티를 대체하지는 않습니다.<br />
              <strong className="text-text-primary">
                아이디어 발굴 → 1차 스크리닝 → 심층 리서치 트리거
              </strong>{" "}
              용도로 활용하세요.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ComparisonRow({
  feature,
  tickerbrief,
  seekingAlpha,
  morningstar,
}: {
  feature: string;
  tickerbrief: boolean;
  seekingAlpha: boolean;
  morningstar: boolean;
}) {
  return (
    <tr>
      <td className="p-4 text-left font-medium text-text-secondary border-b border-border">
        {feature}
      </td>
      <td className="p-4 text-center border-b border-border bg-accent-green/5">
        {tickerbrief ? (
          <span className="text-accent-green font-bold">✓</span>
        ) : (
          <span className="text-text-muted">✗</span>
        )}
      </td>
      <td className="p-4 text-center border-b border-border">
        {seekingAlpha ? (
          <span className="text-accent-green font-bold">✓</span>
        ) : (
          <span className="text-text-muted">✗</span>
        )}
      </td>
      <td className="p-4 text-center border-b border-border">
        {morningstar ? (
          <span className="text-accent-green font-bold">✓</span>
        ) : (
          <span className="text-text-muted">✗</span>
        )}
      </td>
    </tr>
  );
}

function AdvantageCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: React.ReactNode;
}) {
  return (
    <div className="bg-bg-card border border-border rounded-2xl p-7 text-center transition-all duration-300 hover:border-accent-green hover:-translate-y-1">
      <div className="text-[32px] mb-4">{icon}</div>
      <h3 className="text-base font-bold mb-2.5">{title}</h3>
      <p className="text-[13px] text-text-secondary leading-relaxed">
        {description}
      </p>
    </div>
  );
}
