"use client";

import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[1000] px-10 py-4 flex justify-between items-center bg-bg-primary/85 backdrop-blur-[20px] border-b border-border max-md:px-5 max-md:py-3.5">
      <Link href="/" className="flex items-center gap-1.5 no-underline">
        <Image
          src="/favicon-512.png"
          alt="TickerBrief"
          width={40}
          height={40}
          className="rounded-[10px]"
        />
        <div className="text-[22px] font-bold text-text-primary tracking-tight">
          Ticker<span className="text-accent-green">Brief</span>
        </div>
      </Link>
      <div className="flex items-center gap-8">
        <Link
          href="#samples"
          className="text-text-secondary no-underline text-sm font-medium transition-colors hover:text-text-primary max-md:hidden"
        >
          리포트 미리보기
        </Link>
        <Link
          href="#compare"
          className="text-text-secondary no-underline text-sm font-medium transition-colors hover:text-text-primary max-md:hidden"
        >
          경쟁사 비교
        </Link>
        <Link
          href="#pricing"
          className="text-text-secondary no-underline text-sm font-medium transition-colors hover:text-text-primary max-md:hidden"
        >
          무료 베타
        </Link>
        <Link
          href="#faq"
          className="text-text-secondary no-underline text-sm font-medium transition-colors hover:text-text-primary max-md:hidden"
        >
          FAQ
        </Link>
        <Link
          href="#subscribe"
          className="bg-accent-green text-black px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-emerald-600 transition-colors"
        >
          리포트 신청
        </Link>
      </div>
    </nav>
  );
}
