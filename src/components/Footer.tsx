import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-0 border-t border-border py-12 px-10 max-md:py-8 max-md:px-5">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-accent-green to-accent-cyan rounded-lg flex items-center justify-center text-sm">
            📊
          </div>
          <div className="text-lg font-bold">
            Ticker<span className="text-accent-green">Brief</span>
          </div>
        </Link>

        {/* Links */}
        <div className="flex gap-6 text-sm text-text-muted">
          <Link href="/terms" className="hover:text-text-primary transition-colors">
            이용약관
          </Link>
          <Link href="/privacy" className="hover:text-text-primary transition-colors">
            개인정보처리방침
          </Link>
          <Link href="/disclaimer" className="hover:text-text-primary transition-colors">
            면책조항
          </Link>
          <a
            href="mailto:support@tickerbrief.com"
            className="hover:text-text-primary transition-colors"
          >
            문의하기
          </a>
        </div>

        {/* Copyright */}
        <div className="text-xs text-text-muted text-center">
          © 2025 TickerBrief. 본 서비스는 투자 권유가 아닌 참고 자료입니다.
        </div>
      </div>
    </footer>
  );
}
