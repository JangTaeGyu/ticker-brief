import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { count, error } = await supabase
      .from("reports")
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error("Stats DB error:", error);
      return NextResponse.json(
        { count: 0, error: "데이터 조회 실패" },
        {
          status: 500,
          headers: {
            "Cache-Control": "no-store",
          },
        }
      );
    }

    return NextResponse.json(
      { count: count || 0 },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
        },
      }
    );
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json(
      { count: 0, error: "서버 오류" },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }
}
