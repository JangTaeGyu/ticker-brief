import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import TickerMarquee from "@/components/TickerMarquee";

const siteUrl = "https://ticker-brief.jubrolab.dev";

export const metadata: Metadata = {
  title: "TickerBrief - AI 주식 분석 리포트 | 무료 미국 주식 분석",
  description:
    "AI가 분석하는 프리미엄 미국 주식 리포트. DCF 적정가, SWOT 분석, 백테스트, Bull/Base/Bear 시나리오, ESG, 피어 비교까지 한 번에. 현재 무료 베타 운영 중!",
  keywords: [
    "주식 분석",
    "AI 주식",
    "미국 주식",
    "주식 리포트",
    "DCF 분석",
    "적정가 분석",
    "SWOT 분석",
    "주식 백테스트",
    "투자 분석",
    "NVIDIA",
    "AAPL",
    "TSLA",
    "주식 투자",
    "가치 투자",
    "기술적 분석",
    "TickerBrief",
    "티커브리프",
  ],
  authors: [{ name: "TickerBrief" }],
  creator: "TickerBrief",
  publisher: "TickerBrief",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    siteName: "TickerBrief",
    title: "TickerBrief - AI 주식 분석 리포트",
    description:
      "AI가 분석하는 프리미엄 미국 주식 리포트. DCF 적정가, SWOT, 백테스트, 시나리오 분석까지. 무료 베타 운영 중!",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TickerBrief - AI 주식 분석 리포트",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TickerBrief - AI 주식 분석 리포트",
    description:
      "AI가 분석하는 프리미엄 미국 주식 리포트. DCF 적정가, SWOT, 백테스트까지. 무료 베타!",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "구글서치콘솔_인증코드_여기에_입력",
    // naver: "네이버서치어드바이저_인증코드",
  },
  category: "finance",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700;900&family=Playfair+Display:wght@600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="overflow-x-hidden leading-relaxed">
        <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(16,185,129,0.15),transparent),radial-gradient(ellipse_60%_40%_at_100%_50%,rgba(59,130,246,0.1),transparent),radial-gradient(ellipse_60%_40%_at_0%_80%,rgba(139,92,246,0.08),transparent)]" />
        <Nav />
        <TickerMarquee />
        {children}
      </body>
    </html>
  );
}
