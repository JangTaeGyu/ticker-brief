import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { count, error } = await supabase
      .from("reports")
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error("Stats error:", error);
      return NextResponse.json({ count: 0 });
    }

    return NextResponse.json({ count: count || 0 });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json({ count: 0 });
  }
}
