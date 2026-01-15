import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const WEEKLY_LIMIT = 10;
const UNLIMITED_EMAILS = ["zelo82@naver.com", "ttggbbgg2@gmail.com"];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email || !email.includes("@")) {
    return NextResponse.json({ remaining: WEEKLY_LIMIT, limit: WEEKLY_LIMIT });
  }

  // 무제한 이메일 체크
  if (UNLIMITED_EMAILS.includes(email.toLowerCase())) {
    return NextResponse.json({ remaining: 999, limit: 999, unlimited: true });
  }

  try {
    // Find user
    const { data: user } = await supabase
      .from("request_users")
      .select("id")
      .eq("email", email)
      .single();

    if (!user) {
      // New user - full limit available
      return NextResponse.json({ remaining: WEEKLY_LIMIT, limit: WEEKLY_LIMIT });
    }

    // Count reports from last 7 days
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const { count } = await supabase
      .from("reports")
      .select("*", { count: "exact", head: true })
      .eq("request_user_id", user.id)
      .gte("created_at", oneWeekAgo.toISOString());

    const used = count || 0;
    const remaining = Math.max(0, WEEKLY_LIMIT - used);

    return NextResponse.json({ remaining, limit: WEEKLY_LIMIT, used });
  } catch (error) {
    console.error("Check limit error:", error);
    return NextResponse.json({ remaining: WEEKLY_LIMIT, limit: WEEKLY_LIMIT });
  }
}
