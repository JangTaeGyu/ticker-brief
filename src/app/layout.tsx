import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Ticker Brief - AI 주식 분석 리포트",
  description: "AI가 분석하는 프리미엄 주식 리포트. DCF 적정가, SWOT, 백테스트, Bull/Bear 시나리오까지.",
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
        {children}
      </body>
    </html>
  );
}
