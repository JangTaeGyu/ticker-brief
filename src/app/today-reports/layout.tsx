import type { Metadata } from "next";

const siteUrl = "https://ticker-brief.jubrolab.dev";

// WebPage 구조화 데이터
const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${siteUrl}/today-reports#webpage`,
  url: `${siteUrl}/today-reports`,
  name: "오늘의 리포트 | TickerBrief",
  description:
    "오늘 생성된 AI 주식 분석 리포트를 확인하세요. 등급별 필터링, 티커 검색, 관심 종목 필터 기능을 제공합니다.",
  isPartOf: {
    "@id": `${siteUrl}/#website`,
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "홈",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "오늘의 리포트",
        item: `${siteUrl}/today-reports`,
      },
    ],
  },
  inLanguage: "ko-KR",
};

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
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      {children}
    </>
  );
}
