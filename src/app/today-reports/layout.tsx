import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "오늘의 리포트 | TickerBrief",
  description:
    "오늘 생성된 AI 주식 분석 리포트를 확인하세요. 등급별 필터링, 티커 검색, 관심 종목 필터 기능을 제공합니다.",
  openGraph: {
    title: "오늘의 리포트 | TickerBrief",
    description:
      "오늘 생성된 AI 주식 분석 리포트를 확인하세요. 등급별 필터링, 티커 검색 기능 제공.",
  },
  twitter: {
    title: "오늘의 리포트 | TickerBrief",
    description:
      "오늘 생성된 AI 주식 분석 리포트를 확인하세요.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TodayReportsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
