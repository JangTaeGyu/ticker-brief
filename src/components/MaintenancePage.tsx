export default function MaintenancePage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-lg w-full text-center">
        {/* Icon */}
        <div className="relative mx-auto mb-8 w-24 h-24">
          <div className="absolute inset-0 rounded-full bg-accent-green/20 animate-ping" />
          <div className="relative w-24 h-24 rounded-full bg-bg-card border border-border flex items-center justify-center">
            <svg
              className="w-12 h-12 text-accent-green"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1
          className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-accent-green to-accent-blue bg-clip-text text-transparent"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          서비스 고도화 중
        </h1>

        {/* Description */}
        <p className="text-text-secondary text-lg leading-relaxed mb-6">
          더 나은 서비스를 제공하기 위해
          <br />
          <span className="text-text-primary font-medium">서비스 고도화 작업</span>을
          진행하고 있습니다.
        </p>

        <p className="text-text-muted text-sm leading-relaxed mb-10">
          빠른 시일 내에 더욱 강력하고 정교한 AI 분석 리포트로
          <br className="hidden sm:block" />
          찾아뵙겠습니다. 잠시만 기다려 주세요.
        </p>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-10">
          <div className="flex-1 h-px bg-border" />
          <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Features coming */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { icon: "🔬", label: "분석 엔진 업그레이드" },
            { icon: "⚡", label: "성능 최적화" },
            { icon: "📊", label: "리포트 고도화" },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-bg-card/60 border border-border rounded-xl px-4 py-3"
            >
              <span className="text-xl mb-1 block">{item.icon}</span>
              <span className="text-text-secondary text-xs">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Contact */}
        <p className="text-text-muted text-xs">
          문의사항은{" "}
          <a
            href="mailto:ttggbbgg2@gmail.com"
            className="text-accent-green hover:underline"
          >
            ttggbbgg2@gmail.com
          </a>
          으로 연락해 주세요.
        </p>
      </div>
    </div>
  );
}
