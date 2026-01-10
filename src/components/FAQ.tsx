"use client";

import { useState } from "react";

const faqData = [
  {
    question: "정말 무료인가요?",
    answer:
      "네, 베타 기간 동안 모든 기능을 무료로 이용할 수 있습니다. 서버와 AI API 비용은 자체 부담하고 있습니다. 유료화 전환 시에는 사전에 공지드리겠습니다.",
  },
  {
    question: "리포트는 얼마나 걸려서 받나요?",
    answer:
      "현재는 관리자가 수동으로 확인 후 발송하기 때문에 최대 12시간 정도 소요될 수 있습니다. 요청이 많은 경우 더 지연될 수 있는 점 양해 부탁드립니다. 현재 자동화 작업을 진행 중이니 조금만 기다려주세요!",
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

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="relative z-1 bg-bg-secondary py-28 px-10 max-md:py-20 max-md:px-5"
    >
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

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-bg-card border border-border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-white/[0.02] transition-colors"
              >
                <span className="font-semibold text-[15px]">{faq.question}</span>
                <span
                  className={`text-xl text-text-muted transition-transform duration-300 ${
                    activeIndex === index ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeIndex === index ? "max-h-[200px]" : "max-h-0"
                }`}
              >
                <div className="px-6 py-5 text-sm text-text-secondary leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
