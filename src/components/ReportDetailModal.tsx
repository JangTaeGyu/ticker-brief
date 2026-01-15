"use client";

import { getGradeTextColor, getEsgColor } from "@/lib/gradeColors";
import Modal from "./Modal";

interface ReportDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticker: string;
  grade?: string | null;
  upside?: number | null;
  score?: number | null;
  summary?: string | null;
  thesis?: string | null;
  entryStrategy?: string | null;
  exitStrategy?: string | null;
  esgRating?: string | null;
  esgScore?: number | null;
}

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

export default function ReportDetailModal({
  isOpen,
  onClose,
  ticker,
  grade,
  upside,
  score,
  summary,
  thesis,
  entryStrategy,
  exitStrategy,
  esgRating,
  esgScore,
}: ReportDetailModalProps) {
  const esgColor = getEsgColor(esgRating ?? null);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
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
  );
}
