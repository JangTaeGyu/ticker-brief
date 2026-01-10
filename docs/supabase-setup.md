# Supabase 테이블 설정

Supabase SQL Editor에서 다음 SQL을 실행하세요.

## 테이블 생성

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
```

## RLS (Row Level Security) 설정

```sql
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
