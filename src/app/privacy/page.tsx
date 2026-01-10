import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen py-20 px-10 max-md:px-5">
      <div className="max-w-[800px] mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary mb-8 transition-colors"
        >
          ← 홈으로 돌아가기
        </Link>

        <h1 className="text-3xl font-bold mb-8">개인정보처리방침</h1>

        <div className="space-y-8 text-text-secondary leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">
              제1조 (개인정보의 수집 및 이용 목적)
            </h2>
            <p>
              TickerBrief(이하 "서비스")는 다음의 목적을 위해 개인정보를 수집 및
              이용합니다:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>AI 주식 분석 리포트 생성 및 발송</li>
              <li>서비스 관련 공지사항 전달</li>
              <li>서비스 개선 및 신규 서비스 개발</li>
              <li>이용자 문의 응대</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">
              제2조 (수집하는 개인정보 항목)
            </h2>
            <p>서비스는 다음과 같은 개인정보를 수집합니다:</p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>
                <strong>필수 항목:</strong> 이메일 주소
              </li>
              <li>
                <strong>선택 항목:</strong> 관심 종목 정보
              </li>
              <li>
                <strong>자동 수집 항목:</strong> 접속 로그, 쿠키, 접속 IP 정보
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">
              제3조 (개인정보의 보유 및 이용 기간)
            </h2>
            <ul className="list-decimal list-inside space-y-2">
              <li>
                서비스는 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를
                지체 없이 파기합니다.
              </li>
              <li>
                단, 관련 법령에 의해 보존할 필요가 있는 경우 해당 기간 동안
                보관합니다:
                <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                  <li>계약 또는 청약철회 등에 관한 기록: 5년</li>
                  <li>대금결제 및 재화 등의 공급에 관한 기록: 5년</li>
                  <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년</li>
                  <li>표시/광고에 관한 기록: 6개월</li>
                </ul>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">
              제4조 (개인정보의 제3자 제공)
            </h2>
            <p>
              서비스는 원칙적으로 이용자의 개인정보를 제3자에게 제공하지
              않습니다. 다만, 다음의 경우에는 예외로 합니다:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>이용자가 사전에 동의한 경우</li>
              <li>
                법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와
                방법에 따라 수사기관의 요구가 있는 경우
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">
              제5조 (개인정보의 파기)
            </h2>
            <ul className="list-decimal list-inside space-y-2">
              <li>
                서비스는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가
                불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다.
              </li>
              <li>
                전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을
                사용합니다.
              </li>
              <li>
                종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통해
                파기합니다.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">
              제6조 (이용자의 권리와 그 행사 방법)
            </h2>
            <ul className="list-decimal list-inside space-y-2">
              <li>
                이용자는 언제든지 개인정보 열람, 정정, 삭제, 처리정지 요구 등의
                권리를 행사할 수 있습니다.
              </li>
              <li>
                권리 행사는 서비스에 대해 이메일을 통해 요청할 수 있으며,
                서비스는 이에 대해 지체 없이 조치하겠습니다.
              </li>
              <li>
                이용자가 개인정보의 오류 등에 대한 정정 또는 삭제를 요구한
                경우에는 정정 또는 삭제를 완료할 때까지 해당 개인정보를 이용하거나
                제공하지 않습니다.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">
              제7조 (개인정보 보호를 위한 기술적 대책)
            </h2>
            <p>서비스는 개인정보 보호를 위해 다음과 같은 기술적 대책을 강구하고 있습니다:</p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>개인정보의 암호화</li>
              <li>해킹 등에 대비한 기술적 대책</li>
              <li>개인정보에 대한 접근 제한</li>
              <li>접속기록의 보관 및 위변조 방지</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">
              제8조 (개인정보 보호책임자)
            </h2>
            <p className="mb-4">
              서비스는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보
              처리와 관련한 이용자의 불만처리 및 피해구제 등을 위하여 아래와 같이
              개인정보 보호책임자를 지정하고 있습니다:
            </p>
            <div className="bg-bg-card p-4 rounded-lg border border-border">
              <p>
                <strong>개인정보 보호책임자</strong>
              </p>
              <p className="text-text-muted mt-2">
                이메일: support@tickerbrief.com
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">
              제9조 (개인정보 처리방침의 변경)
            </h2>
            <p>
              본 개인정보처리방침은 법령, 정책 또는 보안기술의 변경에 따라 내용의
              추가, 삭제 및 수정이 있을 수 있으며, 변경되는 경우에는 시행일의
              7일 전부터 서비스 내 공지사항을 통해 고지할 것입니다.
            </p>
          </section>

          <section className="pt-4 border-t border-border">
            <p className="text-sm text-text-muted">
              본 개인정보처리방침은 2025년 1월 1일부터 시행됩니다.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
