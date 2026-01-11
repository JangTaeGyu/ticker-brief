#!/usr/bin/env python3
"""
리포트 처리 스크립트
- Supabase에서 pending 상태의 리포트를 가져옴
- 리포트 생성 후 이메일 발송
- 상태를 completed로 업데이트
"""

import os
import time
import smtplib
import subprocess
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
from datetime import datetime
from dotenv import load_dotenv
from supabase import create_client, Client

# 환경 변수 로드
load_dotenv()

# Supabase 설정
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_KEY")  # Service key 사용 (RLS 우회)

# 이메일 설정 (Gmail SMTP 예시)
SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")  # Gmail 앱 비밀번호
FROM_EMAIL = os.getenv("FROM_EMAIL", SMTP_USER)

# 리포트 생성 스크립트 경로 (사용자 환경에 맞게 수정)
REPORT_SCRIPT = os.getenv("REPORT_SCRIPT", "python generate_report.py")
REPORTS_DIR = os.getenv("REPORTS_DIR", "./reports")

# Polling 간격 (초)
POLL_INTERVAL = int(os.getenv("POLL_INTERVAL", "60"))


def get_supabase_client() -> Client:
    """Supabase 클라이언트 생성"""
    if not SUPABASE_URL or not SUPABASE_KEY:
        raise ValueError("SUPABASE_URL과 SUPABASE_SERVICE_KEY 환경 변수를 설정하세요.")
    return create_client(SUPABASE_URL, SUPABASE_KEY)


def fetch_pending_reports(supabase: Client) -> list:
    """pending 상태의 리포트 가져오기"""
    response = supabase.table("reports") \
        .select("*, request_users(email)") \
        .eq("status", "pending") \
        .execute()
    return response.data


def update_report_status(supabase: Client, report_id: str, status: str):
    """리포트 상태 업데이트"""
    supabase.table("reports") \
        .update({"status": status, "updated_at": datetime.utcnow().isoformat()}) \
        .eq("id", report_id) \
        .execute()
    print(f"  → 상태 업데이트: {status}")


def generate_report(ticker: str) -> str | None:
    """리포트 생성 스크립트 실행"""
    try:
        print(f"  → 리포트 생성 중: {ticker}")
        # 기존 리포트 생성 스크립트 호출 (사용자 환경에 맞게 수정)
        result = subprocess.run(
            f"{REPORT_SCRIPT} {ticker}",
            shell=True,
            capture_output=True,
            text=True
        )

        if result.returncode != 0:
            print(f"  → 리포트 생성 실패: {result.stderr}")
            return None

        # 생성된 리포트 파일 경로 반환 (사용자 환경에 맞게 수정)
        report_path = f"{REPORTS_DIR}/{ticker}_report.html"
        if os.path.exists(report_path):
            return report_path

        print(f"  → 리포트 파일을 찾을 수 없음: {report_path}")
        return None

    except Exception as e:
        print(f"  → 리포트 생성 오류: {e}")
        return None


def send_email(to_email: str, ticker: str, report_path: str | None) -> bool:
    """이메일 발송"""
    if not SMTP_USER or not SMTP_PASSWORD:
        print("  → SMTP 설정이 없어 이메일 발송을 건너뜁니다.")
        return True  # 이메일 없이도 완료 처리

    try:
        msg = MIMEMultipart()
        msg["From"] = FROM_EMAIL
        msg["To"] = to_email
        msg["Subject"] = f"[TickerBrief] {ticker} 분석 리포트가 도착했습니다"

        # 본문
        body = f"""
안녕하세요,

요청하신 {ticker} 종목의 AI 분석 리포트가 완성되었습니다.

첨부된 리포트에서 다음 내용을 확인하실 수 있습니다:
- DCF 적정가 분석
- SWOT 분석
- Bull/Base/Bear 시나리오
- 백테스트 결과
- 기술적 지표 분석

투자 결정 시 참고 자료로 활용해 주세요.
본 리포트는 투자 권유가 아닌 정보 제공 목적입니다.

감사합니다.
TickerBrief 팀

---
https://ticker-brief.vercel.app
"""
        msg.attach(MIMEText(body, "plain", "utf-8"))

        # 첨부 파일
        if report_path and os.path.exists(report_path):
            with open(report_path, "rb") as f:
                part = MIMEBase("application", "octet-stream")
                part.set_payload(f.read())
                encoders.encode_base64(part)
                part.add_header(
                    "Content-Disposition",
                    f"attachment; filename={os.path.basename(report_path)}"
                )
                msg.attach(part)

        # 발송
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USER, SMTP_PASSWORD)
            server.send_message(msg)

        print(f"  → 이메일 발송 완료: {to_email}")
        return True

    except Exception as e:
        print(f"  → 이메일 발송 실패: {e}")
        return False


def process_report(supabase: Client, report: dict):
    """단일 리포트 처리"""
    report_id = report["id"]
    ticker = report["ticker"]
    user_data = report.get("request_users", {})
    email = user_data.get("email") if user_data else None

    print(f"\n처리 중: {ticker} (ID: {report_id[:8]}...)")

    if not email:
        print(f"  → 이메일 주소를 찾을 수 없음")
        update_report_status(supabase, report_id, "failed")
        return

    # 상태를 processing으로 변경
    update_report_status(supabase, report_id, "processing")

    # 리포트 생성
    report_path = generate_report(ticker)

    # 이메일 발송
    if send_email(email, ticker, report_path):
        update_report_status(supabase, report_id, "completed")
    else:
        update_report_status(supabase, report_id, "failed")


def main():
    """메인 루프"""
    print("=" * 50)
    print("TickerBrief 리포트 처리 스크립트")
    print("=" * 50)
    print(f"Polling 간격: {POLL_INTERVAL}초")
    print(f"리포트 스크립트: {REPORT_SCRIPT}")
    print(f"리포트 디렉토리: {REPORTS_DIR}")
    print("=" * 50)

    supabase = get_supabase_client()

    while True:
        try:
            pending_reports = fetch_pending_reports(supabase)

            if pending_reports:
                print(f"\n[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] "
                      f"대기 중인 리포트: {len(pending_reports)}개")

                for report in pending_reports:
                    process_report(supabase, report)
            else:
                print(f"[{datetime.now().strftime('%H:%M:%S')}] 대기 중인 리포트 없음", end="\r")

        except Exception as e:
            print(f"\n오류 발생: {e}")

        time.sleep(POLL_INTERVAL)


if __name__ == "__main__":
    main()
