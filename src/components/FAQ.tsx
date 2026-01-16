const faqData = [
  {
    question: "정말 무료인가요?",
    answer:
      "네, 베타 기간 동안 모든 기능을 무료로 이용할 수 있습니다. 서버와 AI API 비용은 자체 부담하고 있습니다. 유료화 전환 시에는 사전에 공지드리겠습니다.",
  },
  {
    question: "리포트는 얼마나 걸려서 받나요?",
    answer:
      "신청 후 약 10분 내에 이메일로 리포트를 받아보실 수 있습니다. 요청이 많은 경우 다소 지연될 수 있습니다.",
  },
  {
    question: "어떤 종목을 분석할 수 있나요?",
    answer:
      "NASDAQ, NYSE에 상장된 미국 주식을 지원합니다. yfinance에서 데이터를 가져올 수 있는 모든 종목이 분석 가능합니다.",
  },
  {
    question: "데이터는 어디서 가져오나요?",
    answer:
      "yfinance(주가/재무), Finnhub(뉴스/실적), FRED(경제지표) 등 무료 API를 활용합니다. 유료 데이터 소스 대비 정확도가 낮을 수 있으니, 투자 결정 전 반드시 다른 소스와 교차 확인하시기 바랍니다.",
  },
  {
    question: "투자 조언인가요?",
    answer:
      "아니요, TickerBrief는 투자 참고 자료일 뿐 투자 권유나 조언이 아닙니다. 모든 투자 결정은 본인의 판단과 책임 하에 이루어져야 합니다.",
  },
];

// FAQ 구조화 데이터 (Google 검색 리치 스니펫)
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqData.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function FAQ() {
  return (
    <section
      id="faq"
      className="relative z-1 bg-bg-secondary py-28 px-10 max-md:py-20 max-md:px-5"
    >
      {/* FAQ 구조화 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-200 mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="font-['JetBrains_Mono'] text-xs font-semibold text-accent-green uppercase tracking-[2px] mb-3">
            FAQ
          </div>
          <h2 className="font-['Playfair_Display'] text-[clamp(32px,4vw,44px)] font-bold">
            자주 묻는 질문
          </h2>
        </div>

        {/* FAQ Items - CSS-only accordion with details/summary */}
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <details
              key={index}
              className="group bg-bg-card border border-border rounded-xl overflow-hidden"
            >
              <summary className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-white/[0.02] transition-colors cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <span className="font-semibold text-[15px]">{faq.question}</span>
                <span className="text-xl text-text-muted transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="px-6 py-5 text-sm text-text-secondary leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
