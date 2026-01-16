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

// ESG 등급별 색상 (text, bg with opacity)
export function getEsgColor(rating: string | null): { text: string; bg: string } {
  if (!rating) return { text: "text-text-muted", bg: "bg-text-muted/20" };
  const color = GRADE_COLORS[rating.toUpperCase()];
  if (color) {
    return { text: color.text, bg: `${color.bg}/20` };
  }
  return { text: "text-text-muted", bg: "bg-text-muted/20" };
}

// 상승여력 색상 반환
export function getUpsideColor(upside: number | null): string {
  if (upside === null) return "text-text-muted";
  if (upside >= 20) return "text-[#10b981]"; // emerald-500 (강한 상승)
  if (upside >= 10) return "text-[#34d399]"; // emerald-400 (상승)
  if (upside >= 0) return "text-[#06b6d4]";  // cyan-500 (약한 상승)
  if (upside >= -10) return "text-[#facc15]"; // yellow-400 (약한 하락)
  if (upside >= -20) return "text-[#f97316]"; // orange-500 (하락)
  return "text-[#ef4444]"; // red-500 (강한 하락)
}

// 점수 색상 반환
export function getScoreColor(score: number | null): string {
  if (score === null) return "text-text-muted";
  if (score >= 80) return "text-[#10b981]"; // emerald-500 (매우 높음)
  if (score >= 70) return "text-[#34d399]"; // emerald-400 (높음)
  if (score >= 60) return "text-[#06b6d4]"; // cyan-500 (중간)
  if (score >= 50) return "text-[#facc15]"; // yellow-400 (낮음)
  if (score >= 40) return "text-[#f97316]"; // orange-500 (매우 낮음)
  return "text-[#ef4444]"; // red-500 (위험)
}

// 리포트 상태별 색상
export const STATUS_COLORS: Record<string, { border: string; text: string; message: string }> = {
  pending: { border: "border-gray-500", text: "text-gray-500", message: "리포트 생성 대기중입니다" },
  processing: { border: "border-blue-500", text: "text-blue-500", message: "리포트를 생성하고 있습니다" },
  failed: { border: "border-red-500", text: "text-red-500", message: "리포트 생성에 실패했습니다" },
  completed: { border: "border-border", text: "text-text-primary", message: "" },
};

// 상태 색상 반환
export function getStatusColor(status: string): { border: string; text: string; message: string } {
  return STATUS_COLORS[status] || STATUS_COLORS.pending;
}
