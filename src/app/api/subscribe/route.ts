import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { headers } from "next/headers";

export async function POST(request: Request) {
  try {
    const { email, tickers } = await request.json();

    // Validation
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "유효한 이메일 주소를 입력해주세요." },
        { status: 400 }
      );
    }

    if (!tickers || !Array.isArray(tickers) || tickers.length === 0) {
      return NextResponse.json(
        { error: "최소 1개의 종목을 선택해주세요." },
        { status: 400 }
      );
    }

    if (tickers.length > 3) {
      return NextResponse.json(
        { error: "최대 3개의 종목만 선택 가능합니다." },
        { status: 400 }
      );
    }

    // Extract user_id from email
    const userId = email.split("@")[0];

    // Get request headers
    const headersList = await headers();
    const ipAddress = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "unknown";
    const userAgent = headersList.get("user-agent") || "unknown";

    // 1. Upsert user (insert if not exists, get id if exists)
    const { data: existingUser } = await supabase
      .from("request_users")
      .select("id")
      .eq("email", email)
      .single();

    let requestUserId: string;

    if (existingUser) {
      requestUserId = existingUser.id;
    } else {
      const { data: newUser, error: userError } = await supabase
        .from("request_users")
        .insert({ user_id: userId, email })
        .select("id")
        .single();

      if (userError) {
        console.error("User insert error:", userError);
        return NextResponse.json(
          { error: "사용자 등록 중 오류가 발생했습니다." },
          { status: 500 }
        );
      }
      requestUserId = newUser.id;
    }

    // 2. Insert reports for each ticker
    const reportsToInsert = tickers.map((ticker: string) => ({
      request_user_id: requestUserId,
      ticker,
    }));

    const { error: reportsError } = await supabase
      .from("reports")
      .insert(reportsToInsert);

    if (reportsError) {
      console.error("Reports insert error:", reportsError);
      return NextResponse.json(
        { error: "리포트 신청 중 오류가 발생했습니다." },
        { status: 500 }
      );
    }

    // 3. Insert request log
    const { error: logError } = await supabase
      .from("request_logs")
      .insert({
        request_user_id: requestUserId,
        ticker_count: tickers.length,
        ip_address: ipAddress,
        user_agent: userAgent,
      });

    if (logError) {
      console.error("Log insert error:", logError);
      // Don't fail the request if logging fails
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
