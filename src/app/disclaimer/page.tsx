import Link from "next/link";

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen py-20 px-10 max-md:px-5">
      <div className="max-w-[800px] mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary mb-8 transition-colors"
        >
          ← 홈으로 돌아가기
        </Link>

        <h1 className="text-3xl font-bold mb-8">면책조항</h1>

        <div className="space-y-8 text-text-secondary leading-relaxed">
          <section className="bg-accent-green/10 border border-accent-green/30 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-accent-green mb-4">
              중요 안내
            </h2>
            <p className="text-text-primary font-medium">
              TickerBrief가 제공하는 모든 정보는 투자 참고 자료일 뿐이며, 투자
              권유, 투자 조언, 또는 투자 추천이 아닙니다. 모든 투자 결정과 그에
              따른 결과는 전적으로 투자자 본인의 책임입니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">
              1. 정보의 정확성
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                TickerBrief는 정보의 정확성, 완전성, 적시성을 보장하지 않습니다.
              </li>
              <li>
                AI가 생성한 분석 결과에는 오류가 포함될 수 있으며, 실제 시장
                상황과 다를 수 있습니다.
              </li>
              <li>
                제공되는 데이터는 지연될 수 있으며, 실시간 정보가 아닐 수
                있습니다.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">
              2. 투자 위험 고지
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                주식 투자는 원금 손실의 위험이 있습니다.
              </li>
              <li>
                과거의 수익률이 미래의 수익률을 보장하지 않습니다.
              </li>
              <li>
                DCF 적정가, 시나리오 분석 등 모든 분석은 특정 가정에 기반한
                추정치이며, 실제 결과와 크게 다를 수 있습니다.
              </li>
              <li>
                백테스트 결과는 가상의 시뮬레이션이며, 실제 투자 결과와 다를 수
                있습니다.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">
              3. AI 분석의 한계
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                AI 모델은 과거 데이터를 기반으로 학습되었으며, 예측하지 못한
                시장 변화에 대응하지 못할 수 있습니다.
              </li>
              <li>
                AI 분석은 인간 전문가의 판단을 대체할 수 없으며, 보조 자료로만
                활용해야 합니다.
              </li>
              <li>
                시장의 급격한 변동, 거시경제적 변화, 지정학적 리스크 등은 AI
                분석에 반영되지 않을 수 있습니다.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">
              4. 제3자 데이터
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                TickerBrief는 제3자로부터 제공받은 데이터를 사용합니다.
              </li>
              <li>
                제3자 데이터의 정확성에 대해 TickerBrief는 책임지지 않습니다.
              </li>
              <li>
                데이터 제공자의 서비스 중단 등으로 인해 서비스가 일시적으로
                중단될 수 있습니다.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">
              5. 법적 책임의 제한
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                TickerBrief는 서비스 이용으로 인한 직접적, 간접적, 부수적,
                결과적 손해에 대해 책임지지 않습니다.
              </li>
              <li>
                이용자의 투자 결정 및 그에 따른 손익에 대해 TickerBrief는 어떠한
                책임도 지지 않습니다.
              </li>
              <li>
                서비스 장애, 데이터 오류, 시스템 오류 등으로 인한 손해에 대해
                책임지지 않습니다.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">
              6. 전문가 상담 권고
            </h2>
            <p>
              투자 결정을 내리기 전에 공인된 투자 전문가, 재무 상담사, 또는 증권
              전문가와 상담하시기 바랍니다. TickerBrief의 리포트는 전문적인 투자
              자문을 대체할 수 없습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">
              7. 법적 규정 준수
            </h2>
            <p>
              TickerBrief는 금융투자업자가 아니며, 투자자문업, 투자일임업,
              집합투자업 등의 인가를 받지 않았습니다. 본 서비스는 자본시장과
              금융투자업에 관한 법률에 따른 투자 권유에 해당하지 않습니다.
            </p>
          </section>

          <section className="bg-bg-card p-6 rounded-lg border border-border">
            <h2 className="text-xl font-semibold text-text-primary mb-4">
              동의 확인
            </h2>
            <p>
              TickerBrief 서비스를 이용함으로써 귀하는 위의 면책조항을 읽고
              이해했으며, 이에 동의하는 것으로 간주됩니다. 위 조항에 동의하지
              않으시면 서비스 이용을 중단해 주시기 바랍니다.
            </p>
          </section>

          <section className="pt-4 border-t border-border">
            <p className="text-sm text-text-muted">
              본 면책조항은 2025년 1월 1일부터 시행됩니다.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
