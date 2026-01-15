// 등급별 색상 정의
export const GRADE_COLORS: Record<string, { hex: string; text: string; bg: string }> = {
  A: { hex: "#10b981", text: "text-[#10b981]", bg: "bg-[#10b981]" },
  B: { hex: "#06b6d4", text: "text-[#06b6d4]", bg: "bg-[#06b6d4]" },
  C: { hex: "#facc15", text: "text-[#facc15]", bg: "bg-[#facc15]" },
  D: { hex: "#f97316", text: "text-[#f97316]", bg: "bg-[#f97316]" },
  F: { hex: "#ef4444", text: "text-[#ef4444]", bg: "bg-[#ef4444]" },
};

// 등급 텍스트 색상 반환
export function getGradeTextColor(grade: string | null): string {
  if (!grade) return "text-text-muted";
  const color = GRADE_COLORS[grade.toUpperCase()];
  return color?.text ?? "text-text-muted";
}

// 등급 배경 색상 반환
export function getGradeBgColor(grade: string | null): string {
  if (!grade) return "bg-text-secondary";
  const color = GRADE_COLORS[grade.toUpperCase()];
  return color?.bg ?? "bg-text-secondary";
}

// 등급 배경 색상 (투명도 포함) 반환
export function getGradeBgColorWithOpacity(grade: string | null, opacity: number = 20): string {
  if (!grade) return "bg-text-muted/20";
  const color = GRADE_COLORS[grade.toUpperCase()];
  return color ? `${color.bg}/${opacity}` : "bg-text-muted/20";
}

// 등급 옵션 목록 (필터용)
export const GRADE_OPTIONS = Object.entries(GRADE_COLORS).map(([value, { bg }]) => ({
  value: value as "A" | "B" | "C" | "D" | "F",
  label: value,
  color: bg,
}));
