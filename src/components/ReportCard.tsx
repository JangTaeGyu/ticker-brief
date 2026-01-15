"use client";

import { useState } from "react";
import { getGradeTextColor, getEsgColor } from "@/lib/gradeColors";
import Modal from "./Modal";

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
  const isNotCompleted = status !== "completed";
  const statusInfo = statusMessages[status];
  const esgColor = getEsgColor(esgRating ?? null);

  return (
    <>
      <div className={`relative p-6 rounded-2xl border bg-bg-card transition-colors ${
        isNotCompleted
          ? `opacity-50 ${statusInfo?.borderColor || "border-border"}`
          : "border-border hover:border-accent-green/50"
      }`}>
        {/* 티커 + 관심 아이콘 */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold">{ticker}</div>
          {isMine && (
            <span title="관심 티커">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#f43f5e"
                className="w-6 h-6"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </span>
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
                  <span className="text-accent-green opacity-0 group-hover:opacity-100 transition-opacity text-xs">
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
                  <span className="text-accent-green opacity-0 group-hover:opacity-100 transition-opacity text-xs">
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
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`${ticker} 리포트 요약`}
        maxWidth="max-w-2xl"
      >
        <div className="space-y-6">
          {/* 핵심 지표 */}
          <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-bg-card border border-border">
            <div className="text-center">
              <div className="text-xs text-text-muted mb-1">등급</div>
              {grade ? (
                <div className={`text-2xl font-bold ${getGradeTextColor(grade)}`}>
                  {grade}
                </div>
              ) : (
                <div className="text-text-muted">-</div>
              )}
            </div>
            <div className="text-center">
              <div className="text-xs text-text-muted mb-1">상승여력</div>
              {upside !== null && upside !== undefined ? (
                <div className={`text-2xl font-bold ${getUpsideColor(upside)}`}>
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
                <div className={`text-2xl font-bold ${getScoreColor(score)}`}>
                  {score.toFixed(0)}
                </div>
              ) : (
                <div className="text-text-muted">-</div>
              )}
            </div>
          </div>

          {/* 투자 요약 */}
          {summary && (
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
                <span>💡</span> 투자 요약
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
                {summary}
              </p>
            </div>
          )}

          {/* 투자 논거 */}
          {thesis && (
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
                <span>📊</span> 투자 논거
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
                {thesis}
              </p>
            </div>
          )}

          {/* 매매 전략 */}
          {(entryStrategy || exitStrategy) && (
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
                <span>📋</span> 매매 전략
              </h3>
              <div className="space-y-3">
                {entryStrategy && (
                  <div className="p-4 rounded-xl bg-[#10b981]/10 border border-[#10b981]/20">
                    <div className="text-sm text-[#10b981] font-semibold mb-2">🟢 진입 전략</div>
                    <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
                      {entryStrategy}
                    </p>
                  </div>
                )}
                {exitStrategy && (
                  <div className="p-4 rounded-xl bg-[#ef4444]/10 border border-[#ef4444]/20">
                    <div className="text-sm text-[#ef4444] font-semibold mb-2">🔴 청산 전략</div>
                    <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
                      {exitStrategy}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ESG 정보 */}
          {(esgRating || esgScore !== null) && (
            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
                <span>🌱</span> ESG 평가
              </h3>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-bg-card border border-border">
                {esgRating && (
                  <div className="text-center">
                    <div className="text-xs text-text-muted mb-1">등급</div>
                    <span className={`inline-block px-3 py-1 rounded text-lg font-bold ${esgColor.bg} ${esgColor.text}`}>
                      {esgRating}
                    </span>
                  </div>
                )}
                {esgScore !== null && esgScore !== undefined && (
                  <div className="text-center">
                    <div className="text-xs text-text-muted mb-1">점수</div>
                    <span className="text-lg font-bold text-text-primary">
                      {esgScore}점
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}
