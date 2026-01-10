import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { headers } from "next/headers";

async function sendSlackNotification(email: string, tickers: string[]) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) return;

  try {
    const message = {
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "📊 새로운 리포트 신청",
            emoji: true,
          },
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*이메일:* ${email}`,
            },
            {
              type: "mrkdwn",
              text: `*종목:* ${tickers.join(", ")}`,
            },
          ],
        },
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: `신청 시간: ${new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}`,
            },
          ],
        },
      ],
    };

    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });
  } catch (error) {
    console.error("Slack notification error:", error);
  }
}

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

      // Check weekly report limit (10 reports per week)
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      const { count: weeklyReportCount } = await supabase
        .from("reports")
        .select("*", { count: "exact", head: true })
        .eq("request_user_id", requestUserId)
        .gte("created_at", oneWeekAgo.toISOString());

      const currentCount = weeklyReportCount || 0;
      const remainingSlots = 10 - currentCount;

      if (remainingSlots <= 0) {
        return NextResponse.json(
          { error: "주간 리포트 신청 한도(10개)를 초과했습니다. 다음 주에 다시 시도해주세요." },
          { status: 429 }
        );
      }

      if (tickers.length > remainingSlots) {
        return NextResponse.json(
          { error: `이번 주 남은 신청 가능 리포트는 ${remainingSlots}개입니다. 종목 수를 줄여주세요.` },
          { status: 429 }
        );
      }
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

    // 4. Send Slack notification
    await sendSlackNotification(email, tickers);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
