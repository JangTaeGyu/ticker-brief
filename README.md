# TickerBrief

AI 기반 미국 주식 분석 리포트 서비스의 랜딩 페이지입니다.

🔗 **Live**: [https://ticker-brief.jubrolab.dev](https://ticker-brief.jubrolab.dev)

## 기능

### 핵심 기능
- 티커 검색 (Finnhub API)
- 리포트 신청 폼 (최대 3개 종목)
- 주간 신청 한도 관리 (사용자당 10개/주)
- Slack 알림 (신청 완료 시)
- Supabase 데이터 저장

### UI/UX
- 티커 마퀴 (점수, 등급, 업사이드 실시간 표시)
- 리포트 발송 카운트 (카운트업 애니메이션)
- 반응형 디자인 (모바일 최적화)

### PWA 지원
- Service Worker (오프라인 캐싱)
- 홈 화면 추가 가능 (Android/iOS)
- 오프라인 페이지

### 분석 도구
- Vercel Analytics (트래픽 분석)
- Vercel Speed Insights (Core Web Vitals)

## 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: Supabase
- **APIs**: Finnhub (티커 검색), Slack Webhook
- **Analytics**: Vercel Analytics, Speed Insights
- **Deployment**: Vercel

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.local` 파일을 생성하고 다음 변수를 설정하세요:

```env
# Finnhub API Key (https://finnhub.io/)
FINNHUB_API_KEY=your_finnhub_api_key_here

# Supabase (https://supabase.com/)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Slack Webhook (https://api.slack.com/apps)
SLACK_WEBHOOK_URL=your_slack_webhook_url_here
```

### 3. Supabase 테이블 설정

[docs/supabase-setup.md](docs/supabase-setup.md) 참고

### 4. 개발 서버 실행

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000)에서 확인하세요.

## 프로젝트 구조

```
src/
├── app/
│   ├── api/
│   │   ├── check-limit/     # 주간 한도 확인 API
│   │   ├── search-ticker/   # 티커 검색 API
│   │   ├── stats/           # 리포트 통계 API
│   │   ├── subscribe/       # 리포트 신청 API
│   │   └── top-tickers/     # 상위 티커 API
│   ├── offline/             # 오프라인 페이지
│   ├── terms/               # 이용약관
│   ├── privacy/             # 개인정보처리방침
│   ├── disclaimer/          # 면책조항
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Nav.tsx              # 네비게이션
│   ├── Hero.tsx             # 히어로 섹션 (카운트업)
│   ├── TickerMarquee.tsx    # 티커 마퀴
│   ├── SampleComparison.tsx # 리포트 미리보기
│   ├── Comparison.tsx       # 경쟁사 비교
│   ├── BetaPricing.tsx      # 베타 가격 안내
│   ├── FAQ.tsx              # 자주 묻는 질문
│   ├── FinalCTA.tsx         # 리포트 신청 폼
│   ├── Footer.tsx           # 푸터
│   └── PWARegister.tsx      # PWA 등록
└── lib/
    └── supabase.ts          # Supabase 클라이언트

public/
├── favicon-*.png            # 파비콘
├── apple-touch-icon.png     # iOS 아이콘
├── android-chrome-*.png     # Android 아이콘
├── site.webmanifest         # PWA 매니페스트
├── sw.js                    # Service Worker
└── og-image.png             # OG 이미지
```

## 스크립트

```bash
npm run dev      # 개발 서버
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버
npm run lint     # ESLint 실행
```

## 라이선스

ISC
