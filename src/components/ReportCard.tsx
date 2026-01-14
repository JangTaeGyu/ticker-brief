"use client";

interface ReportCardProps {
  ticker: string;
  status: string;
  grade?: string | null;
  upside?: number | null;
  score?: number | null;
  isMine: boolean;
}

// 상태별 서술형 메시지
const statusMessages: Record<string, { message: string; borderColor: string; textColor: string }> = {
  pending: { message: "리포트 생성 대기중입니다", borderColor: "border-gray-500", textColor: "text-gray-500" },
  processing: { message: "리포트를 생성하고 있습니다", borderColor: "border-blue-500", textColor: "text-blue-500" },
  failed: { message: "리포트 생성에 실패했습니다", borderColor: "border-red-500", textColor: "text-red-500" },
};

// 등급별 색상 (TickerMarquee와 동일)
function getGradeColor(grade: string | null): { text: string; bg: string } {
  switch (grade?.toUpperCase()) {
    case "A+급":
    case "A급":
      return { text: "text-[#10b981]", bg: "bg-[#10b981]/20" }; // green
    case "A-급":
    case "B+급":
      return { text: "text-[#34d399]", bg: "bg-[#34d399]/20" }; // emerald
    case "B급":
    case "B-급":
      return { text: "text-[#06b6d4]", bg: "bg-[#06b6d4]/20" }; // cyan
    case "C+급":
    case "C급":
      return { text: "text-[#facc15]", bg: "bg-[#facc15]/20" }; // yellow
    case "C-급":
    case "D+급":
      return { text: "text-[#f97316]", bg: "bg-[#f97316]/20" }; // orange
    case "D급":
    case "D-급":
    case "F급":
      return { text: "text-[#ef4444]", bg: "bg-[#ef4444]/20" }; // red
    default:
      return { text: "text-text-muted", bg: "bg-text-muted/20" };
  }
}

// 업사이드별 색상 (TickerMarquee와 동일)
function getUpsideColor(upside: number | null): string {
  if (upside === null) return "text-text-muted";
  if (upside >= 20) return "text-[#10b981]"; // green
  if (upside >= 10) return "text-[#34d399]"; // emerald
  if (upside >= 0) return "text-[#06b6d4]"; // cyan
  if (upside >= -10) return "text-[#facc15]"; // yellow
  if (upside >= -20) return "text-[#f97316]"; // orange
  return "text-[#ef4444]"; // red
}

// 점수별 색상 (등급 색상과 연동)
function getScoreColor(score: number | null): string {
  if (score === null) return "text-text-muted";
  if (score >= 80) return "text-[#10b981]"; // green
  if (score >= 70) return "text-[#34d399]"; // emerald
  if (score >= 60) return "text-[#06b6d4]"; // cyan
  if (score >= 50) return "text-[#facc15]"; // yellow
  if (score >= 40) return "text-[#f97316]"; // orange
  return "text-[#ef4444]"; // red
}

export default function ReportCard({
  ticker,
  status,
  grade,
  upside,
  score,
  isMine,
}: ReportCardProps) {
  const gradeStyle = getGradeColor(grade ?? null);
  const isNotCompleted = status !== "completed";
  const statusInfo = statusMessages[status];

  return (
    <div className={`relative p-6 rounded-2xl border bg-bg-card transition-colors ${
      isNotCompleted
        ? `opacity-50 ${statusInfo?.borderColor || "border-border"}`
        : "border-border hover:border-accent-green/50"
    }`}>
      {/* 관심 티커 아이콘 */}
      {isMine && (
        <div
          className="absolute top-3 right-3"
          title="관심 티커"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#f43f5e"
            className="w-6 h-6"
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        </div>
      )}

      {/* 티커 */}
      <div className="text-2xl font-bold mb-4">{ticker}</div>

      {/* 완료된 경우 상세 정보 표시 */}
      {status === "completed" && (
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border">
          {/* 등급 */}
          <div className="text-center">
            <div className="text-xs text-text-muted mb-1">등급</div>
            {grade ? (
              <div className={`text-lg font-bold ${gradeStyle.text}`}>
                {grade}
              </div>
            ) : (
              <div className="text-text-muted">-</div>
            )}
          </div>

          {/* 업사이드 */}
          <div className="text-center">
            <div className="text-xs text-text-muted mb-1">업사이드</div>
            {upside !== null && upside !== undefined ? (
              <div className={`text-lg font-bold ${getUpsideColor(upside)}`}>
                {upside >= 0 ? "+" : ""}
                {upside.toFixed(1)}%
              </div>
            ) : (
              <div className="text-text-muted">-</div>
            )}
          </div>

          {/* 점수 */}
          <div className="text-center">
            <div className="text-xs text-text-muted mb-1">점수</div>
            {score !== null && score !== undefined ? (
              <div className={`text-lg font-bold ${getScoreColor(score)}`}>
                {score.toFixed(0)}
              </div>
            ) : (
              <div className="text-text-muted">-</div>
            )}
          </div>
        </div>
      )}

      {/* 대기/처리중/실패 상태 서술형 메시지 */}
      {isNotCompleted && (
        <div className={`pt-4 border-t text-center text-sm ${statusInfo?.borderColor || "border-border"} ${statusInfo?.textColor || "text-text-muted"}`}>
          {statusInfo?.message || "상태를 확인할 수 없습니다"}
        </div>
      )}
    </div>
  );
}
