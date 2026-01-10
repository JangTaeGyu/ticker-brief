import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

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

    // Insert into Supabase
    const { error } = await supabase.from("subscriptions").insert({
      email,
      tickers,
    });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "신청 중 오류가 발생했습니다. 다시 시도해주세요." },
        { status: 500 }
      );
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
