# Supabase 테이블 설정

## subscriptions 테이블

리포트 구독 신청 정보를 저장하는 테이블

### 테이블 생성 SQL

```sql
CREATE TABLE subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  tickers TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS 활성화
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- INSERT만 허용하는 정책 (익명 사용자도 신청 가능)
CREATE POLICY "Allow anonymous inserts" ON subscriptions
  FOR INSERT WITH CHECK (true);
```

### 컬럼 설명

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | UUID | 자동 생성되는 고유 식별자 |
| email | TEXT | 사용자 이메일 주소 |
| tickers | TEXT[] | 선택한 종목 티커 배열 (최대 3개) |
| created_at | TIMESTAMPTZ | 신청 일시 |

### 환경 변수

`.env.local`에 추가 필요:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

Supabase 대시보드 → Settings → API에서 확인

### 관련 파일

- `src/lib/supabase.ts` - Supabase 클라이언트
- `src/app/api/subscribe/route.ts` - 구독 API 엔드포인트
- `src/components/FinalCTA.tsx` - 폼 컴포넌트
