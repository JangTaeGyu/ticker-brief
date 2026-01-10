import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen py-20 px-10 max-md:px-5">
      <div className="max-w-[800px] mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary mb-8 transition-colors"
        >
          ← 홈으로 돌아가기
        </Link>

        <h1 className="text-3xl font-bold mb-8">이용약관</h1>

        <div className="space-y-8 text-text-secondary leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">
              제1조 (목적)
            </h2>
            <p>
              본 약관은 TickerBrief(이하 "서비스")가 제공하는 AI 주식 분석 리포트
              서비스의 이용조건 및 절차, 기타 필요한 사항을 규정함을 목적으로
              합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">
              제2조 (정의)
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                "서비스"란 TickerBrief가 제공하는 AI 기반 주식 분석 리포트 및
                관련 정보 서비스를 의미합니다.
              </li>
              <li>
                "회원"이란 본 약관에 동의하고 서비스를 이용하는 자를 의미합니다.
              </li>
              <li>
                "리포트"란 서비스가 생성하는 주식 분석 자료를 의미합니다.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">
              제3조 (약관의 효력 및 변경)
            </h2>
            <ul className="list-decimal list-inside space-y-2">
              <li>본 약관은 서비스를 이용하고자 하는 모든 회원에게 적용됩니다.</li>
              <li>
                서비스는 필요한 경우 약관을 변경할 수 있으며, 변경된 약관은
                서비스 내 공지사항을 통해 공지합니다.
              </li>
              <li>
                회원은 변경된 약관에 동의하지 않을 경우 서비스 이용을 중단할 수
                있습니다.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">
              제4조 (서비스의 내용)
            </h2>
            <p className="mb-4">서비스는 다음과 같은 내용을 제공합니다:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>AI 기반 주식 분석 리포트 생성</li>
              <li>DCF 적정가, SWOT 분석, 시나리오 분석 등 투자 참고 자료</li>
              <li>기술적 지표 및 백테스트 결과</li>
              <li>뉴스 요약 및 이벤트 캘린더</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">
              제5조 (서비스 이용)
            </h2>
            <ul className="list-decimal list-inside space-y-2">
              <li>
                서비스 이용을 위해 회원은 이메일 주소와 분석을 원하는 종목 정보를
                제공해야 합니다.
              </li>
              <li>
                베타 기간 동안 서비스는 무료로 제공되며, 향후 유료화될 수
                있습니다.
              </li>
              <li>
                서비스는 회원에게 사전 고지 후 서비스 내용을 변경할 수 있습니다.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">
              제6조 (회원의 의무)
            </h2>
            <ul className="list-decimal list-inside space-y-2">
              <li>회원은 정확한 정보를 제공해야 합니다.</li>
              <li>
                회원은 서비스를 통해 제공받은 정보를 상업적 목적으로 무단 배포할
                수 없습니다.
              </li>
              <li>
                회원은 서비스 이용 시 관련 법령 및 본 약관을 준수해야 합니다.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">
              제7조 (서비스의 제한 및 중지)
            </h2>
            <p>
              서비스는 다음의 경우 서비스 제공을 제한하거나 중지할 수 있습니다:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>시스템 정기점검, 증설 및 교체</li>
              <li>국가비상사태, 서비스 설비의 장애</li>
              <li>서비스 이용의 폭주 등으로 정상적인 서비스가 어려운 경우</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">
              제8조 (면책조항)
            </h2>
            <ul className="list-decimal list-inside space-y-2">
              <li>
                서비스가 제공하는 모든 정보는 투자 참고 자료일 뿐이며, 투자 권유나
                조언이 아닙니다.
              </li>
              <li>
                서비스는 리포트의 정확성, 완전성, 신뢰성을 보장하지 않습니다.
              </li>
              <li>
                회원의 투자 결정 및 그에 따른 손실에 대해 서비스는 책임을 지지
                않습니다.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">
              제9조 (분쟁해결)
            </h2>
            <p>
              본 약관에 관한 분쟁은 대한민국 법률에 따라 해결하며, 관할 법원은
              서비스 운영자의 소재지 법원으로 합니다.
            </p>
          </section>

          <section className="pt-4 border-t border-border">
            <p className="text-sm text-text-muted">
              본 약관은 2025년 1월 1일부터 시행됩니다.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
