import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// 오늘 7시 ~ 내일 7시 범위 계산 (KST 기준)
function getTodayRange() {
  const now = new Date();

  // KST 기준 현재 시간
  const kstOffset = 9 * 60; // UTC+9
  const kstNow = new Date(now.getTime() + kstOffset * 60 * 1000);

  // 오늘 날짜 (KST)
  const kstYear = kstNow.getUTCFullYear();
  const kstMonth = kstNow.getUTCMonth();
  const kstDate = kstNow.getUTCDate();
  const kstHour = kstNow.getUTCHours();

  // 기준 시작일 계산
  // 현재 7시 이전이면 어제 7시부터, 7시 이후면 오늘 7시부터
  let startDate: Date;
  if (kstHour < 7) {
    // 어제 7시 KST = 어제 7시 - 9시간 = 어제 22시 UTC (전날)
    startDate = new Date(Date.UTC(kstYear, kstMonth, kstDate - 1, 7 - 9));
  } else {
    // 오늘 7시 KST = 오늘 7시 - 9시간 = 오늘 22시 UTC (전날)
    startDate = new Date(Date.UTC(kstYear, kstMonth, kstDate, 7 - 9));
  }

  // 종료일은 시작일 + 24시간
  const endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000);

  return {
    start: startDate.toISOString(),
    end: endDate.toISOString(),
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    // 시간 범위 계산
    const { start, end } = getTodayRange();

    // 오늘의 완료된 리포트 조회 (7시 ~ 다음날 7시)
    const { data: reports, error } = await supabase
      .from("reports")
      .select("id, ticker, status, score, grade, upside, summary, thesis, entry_strategy, exit_strategy, esg_rating, esg_score, created_at")
      .eq("status", "completed")
      .gte("created_at", start)
      .lt("created_at", end)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "리포트 조회 중 오류가 발생했습니다" },
        { status: 500 }
      );
    }

    // 사용자가 신청한 티커 목록 조회 (이메일이 있는 경우에만)
    let myTickers: string[] = [];
    if (email) {
      const { data: user } = await supabase
        .from("request_users")
        .select("id")
        .eq("email", email)
        .single();

      if (user) {
        const { data: userReports } = await supabase
          .from("reports")
          .select("ticker")
          .eq("request_user_id", user.id);

        if (userReports) {
          myTickers = [...new Set(userReports.map((r) => r.ticker))];
        }
      }
    }

    // 중복 티커 제거 (최신 리포트만 유지)
    const tickerMap = new Map<string, typeof reports[0]>();
    reports?.forEach((report) => {
      if (!tickerMap.has(report.ticker)) {
        tickerMap.set(report.ticker, report);
      }
    });
    const uniqueReports = Array.from(tickerMap.values());

    return NextResponse.json({
      reports: uniqueReports,
      myTickers,
      range: { start, end },
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}
