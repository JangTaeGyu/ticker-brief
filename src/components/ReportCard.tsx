"use client";

import { useState } from "react";
import { getGradeTextColor, getEsgColor } from "@/lib/gradeColors";
import { useCartContext } from "@/contexts/CartContext";
import ReportDetailModal from "./ReportDetailModal";

interface ReportCardProps {
  ticker: string;
  status: string;
  grade?: string | null;
  upside?: number | null;
  score?: number | null;
  summary?: string | null;
  thesis?: string | null;
  entryStrategy?: string | null;
  exitStrategy?: string | null;
  esgRating?: string | null;
  esgScore?: number | null;
  isMine: boolean;
}

// 상태별 서술형 메시지
const statusMessages: Record<string, { message: string; borderColor: string; textColor: string }> = {
  pending: { message: "리포트 생성 대기중입니다", borderColor: "border-gray-500", textColor: "text-gray-500" },
  processing: { message: "리포트를 생성하고 있습니다", borderColor: "border-blue-500", textColor: "text-blue-500" },
  failed: { message: "리포트 생성에 실패했습니다", borderColor: "border-red-500", textColor: "text-red-500" },
};

// 상승여력별 색상
function getUpsideColor(upside: number | null): string {
  if (upside === null) return "text-text-muted";
  if (upside >= 20) return "text-[#10b981]";
  if (upside >= 10) return "text-[#34d399]";
  if (upside >= 0) return "text-[#06b6d4]";
  if (upside >= -10) return "text-[#facc15]";
  if (upside >= -20) return "text-[#f97316]";
  return "text-[#ef4444]";
}

// 점수별 색상
function getScoreColor(score: number | null): string {
  if (score === null) return "text-text-muted";
  if (score >= 80) return "text-[#10b981]";
  if (score >= 70) return "text-[#34d399]";
  if (score >= 60) return "text-[#06b6d4]";
  if (score >= 50) return "text-[#facc15]";
  if (score >= 40) return "text-[#f97316]";
  return "text-[#ef4444]";
}


export default function ReportCard({
  ticker,
  status,
  grade,
  upside,
  score,
  summary,
  thesis,
  entryStrategy,
  exitStrategy,
  esgRating,
  esgScore,
  isMine,
}: ReportCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isInCart, toggleItem } = useCartContext();
  const isNotCompleted = status !== "completed";
  const statusInfo = statusMessages[status];
  const esgColor = getEsgColor(esgRating ?? null);
  const inCart = isInCart(ticker);

  const handleCartToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (status === "completed") {
      toggleItem({ ticker, grade: grade ?? null, upside: upside ?? null, score: score ?? null });
    }
  };

  return (
    <>
      <div className={`relative p-6 rounded-2xl border bg-bg-card transition-all ${
        isNotCompleted
          ? `opacity-50 ${statusInfo?.borderColor || "border-border"}`
          : inCart
          ? "border-accent-green ring-1 ring-accent-green/30"
          : "border-border hover:border-accent-green/50"
      }`}>
        {/* 티커 + 관심 아이콘 + 장바구니 버튼 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold">{ticker}</div>
            {isMine && (
              <span title="관심 티커">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#f43f5e"
                  className="w-5 h-5"
                >
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
              </span>
            )}
          </div>
          {/* 장바구니 추가/제거 버튼 */}
          {status === "completed" && (
            <button
              onClick={handleCartToggle}
              className={`p-1.5 rounded-lg transition-colors ${
                inCart
                  ? "text-accent-green hover:bg-accent-green/10"
                  : "text-text-muted hover:text-text-primary hover:bg-bg-card"
              }`}
              title={inCart ? "장바구니에서 제거" : "장바구니에 담기"}
            >
              {inCart ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          )}
        </div>

        {/* 완료된 경우 상세 정보 표시 */}
        {status === "completed" && (
          <>
            {/* 핵심 지표 */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border">
              <div className="text-center">
                <div className="text-xs text-text-muted mb-1">등급</div>
                {grade ? (
                  <div className={`text-lg font-bold ${getGradeTextColor(grade)}`}>
                    {grade}
                  </div>
                ) : (
                  <div className="text-text-muted">-</div>
                )}
              </div>
              <div className="text-center">
                <div className="text-xs text-text-muted mb-1">상승여력</div>
                {upside !== null && upside !== undefined ? (
                  <div className={`text-lg font-bold ${getUpsideColor(upside)}`}>
                    {upside >= 0 ? "+" : ""}
                    {upside.toFixed(1)}%
                  </div>
                ) : (
                  <div className="text-text-muted">-</div>
                )}
              </div>
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

            {/* 투자 요약 - 클릭 가능 */}
            {summary && (
              <div
                className="mt-4 pt-4 border-t border-border cursor-pointer group"
                onClick={() => setIsModalOpen(true)}
              >
                <div className="text-xs text-text-muted mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <span>💡</span> 투자 요약
                  </span>
                  <span className="text-accent-green text-xs max-md:opacity-100 opacity-0 group-hover:opacity-100 transition-opacity">
                    자세히 보기 →
                  </span>
                </div>
                <p className="text-sm text-text-secondary line-clamp-3 leading-relaxed group-hover:text-text-primary transition-colors">
                  {summary}
                </p>
              </div>
            )}

            {/* 투자 논거 - 클릭 가능 */}
            {thesis && !summary && (
              <div
                className="mt-4 pt-4 border-t border-border cursor-pointer group"
                onClick={() => setIsModalOpen(true)}
              >
                <div className="text-xs text-text-muted mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <span>📊</span> 투자 논거
                  </span>
                  <span className="text-accent-green text-xs max-md:opacity-100 opacity-0 group-hover:opacity-100 transition-opacity">
                    자세히 보기 →
                  </span>
                </div>
                <p className="text-sm text-text-secondary line-clamp-3 leading-relaxed group-hover:text-text-primary transition-colors">
                  {thesis}
                </p>
              </div>
            )}

            {/* 매매 전략 */}
            {(entryStrategy || exitStrategy) && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="text-xs text-text-muted mb-3">📋 매매 전략</div>
                <div className="space-y-2">
                  {entryStrategy && (
                    <div className="p-2.5 rounded-lg bg-[#10b981]/10 border border-[#10b981]/20">
                      <div className="text-xs text-[#10b981] font-medium mb-1">진입 전략</div>
                      <p className="text-xs text-text-secondary line-clamp-2">{entryStrategy}</p>
                    </div>
                  )}
                  {exitStrategy && (
                    <div className="p-2.5 rounded-lg bg-[#ef4444]/10 border border-[#ef4444]/20">
                      <div className="text-xs text-[#ef4444] font-medium mb-1">청산 전략</div>
                      <p className="text-xs text-text-secondary line-clamp-2">{exitStrategy}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ESG 정보 */}
            {(esgRating || esgScore !== null) && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-text-muted flex items-center gap-1">
                    <span>🌱</span> ESG
                  </div>
                  <div className="flex items-center gap-2">
                    {esgScore !== null && esgScore !== undefined && (
                      <span className="text-sm text-text-secondary">
                        {esgScore}점
                      </span>
                    )}
                    {esgRating && (
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${esgColor.bg} ${esgColor.text}`}>
                        {esgRating}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* 대기/처리중/실패 상태 서술형 메시지 */}
        {isNotCompleted && (
          <div className={`pt-4 border-t text-center text-sm ${statusInfo?.borderColor || "border-border"} ${statusInfo?.textColor || "text-text-muted"}`}>
            {statusInfo?.message || "상태를 확인할 수 없습니다"}
          </div>
        )}
      </div>

      {/* 상세 정보 모달 */}
      <ReportDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        ticker={ticker}
        grade={grade}
        upside={upside}
        score={score}
        summary={summary}
        thesis={thesis}
        entryStrategy={entryStrategy}
        exitStrategy={exitStrategy}
        esgRating={esgRating}
        esgScore={esgScore}
      />
    </>
  );
}
