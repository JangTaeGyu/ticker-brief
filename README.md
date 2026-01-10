# TickerBrief

AI 기반 미국 주식 분석 리포트 서비스의 랜딩 페이지입니다.

## 기능

- 티커 검색 (Finnhub API)
- 리포트 신청 폼 (최대 3개 종목)
- 주간 신청 한도 관리 (사용자당 10개/주)
- Slack 알림 (신청 완료 시)
- Supabase 데이터 저장

## 기술 스택

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: Supabase
- **APIs**: Finnhub (티커 검색), Slack Webhook

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

Supabase SQL Editor에서 다음 SQL을 실행하세요:

```sql
-- 사용자 테이블
CREATE TABLE request_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 리포트 테이블
CREATE TABLE reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  request_user_id UUID REFERENCES request_users(id) ON DELETE CASCADE,
  ticker TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 요청 로그 테이블
CREATE TABLE request_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  request_user_id UUID REFERENCES request_users(id) ON DELETE CASCADE,
  ticker_count INTEGER NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS 활성화
ALTER TABLE request_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE request_logs ENABLE ROW LEVEL SECURITY;

-- RLS 정책
CREATE POLICY "Allow anonymous insert" ON request_users FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous select" ON request_users FOR SELECT USING (true);

CREATE POLICY "Allow anonymous insert" ON reports FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous select" ON reports FOR SELECT USING (true);

CREATE POLICY "Allow anonymous insert" ON request_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous select" ON request_logs FOR SELECT USING (true);
```

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
│   │   └── subscribe/       # 리포트 신청 API
│   ├── terms/               # 이용약관
│   ├── privacy/             # 개인정보처리방침
│   ├── disclaimer/          # 면책조항
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Nav.tsx              # 네비게이션
│   ├── Hero.tsx             # 히어로 섹션
│   ├── SampleComparison.tsx # 리포트 미리보기
│   ├── Comparison.tsx       # 경쟁사 비교
│   ├── BetaPricing.tsx      # 베타 가격 안내
│   ├── FAQ.tsx              # 자주 묻는 질문
│   ├── FinalCTA.tsx         # 리포트 신청 폼
│   └── Footer.tsx           # 푸터
└── lib/
    └── supabase.ts          # Supabase 클라이언트
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
