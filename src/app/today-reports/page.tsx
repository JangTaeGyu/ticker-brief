"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { VirtuosoGrid } from "react-virtuoso";
import ReportCard from "@/components/ReportCard";
import SubscribeModal from "@/components/SubscribeModal";
import { GRADE_OPTIONS } from "@/lib/gradeColors";

const STORAGE_KEY = "tickerbrief_email";

type GradeFilter = "all" | "A" | "B" | "C" | "D" | "F";

const ALL_GRADE_OPTIONS = [
  { value: "all" as const, label: "전체", color: "bg-text-secondary" },
  ...GRADE_OPTIONS,
];

interface Report {
  id: string;
  ticker: string;
  status: string;
  score: number | null;
  grade: string | null;
  upside: number | null;
  summary: string | null;
  thesis: string | null;
  entry_strategy: string | null;
  exit_strategy: string | null;
  esg_rating: string | null;
  esg_score: number | null;
  created_at: string;
}

export default function TodayReportsPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [myTickers, setMyTickers] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [gradeFilter, setGradeFilter] = useState<GradeFilter>("all");
  const [tickerSearch, setTickerSearch] = useState("");
  const [showMineOnly, setShowMineOnly] = useState(false);
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);

  // localStorage에서 이메일 확인
  useEffect(() => {
    const savedEmail = localStorage.getItem(STORAGE_KEY);
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  // 리포트 목록 조회
  const fetchReports = useCallback(async (userEmail?: string | null) => {
    setIsFetching(true);
    setError(null);

    try {
      const url = userEmail
        ? `/api/today-reports?email=${encodeURIComponent(userEmail)}`
        : `/api/today-reports`;
      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "리포트 조회 실패");
      }

      setReports(data.reports || []);
      setMyTickers(data.myTickers || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다");
    } finally {
      setIsFetching(false);
    }
  }, []);

  // 페이지 로드 시 리포트 조회
  useEffect(() => {
    fetchReports(email);
  }, [email, fetchReports]);

  // 필터링된 리포트
  const filteredReports = useMemo(() => {
    let result = reports;

    // 관심만 보기 필터
    if (showMineOnly) {
      result = result.filter((report) => myTickers.includes(report.ticker));
    }

    // 등급 필터
    if (gradeFilter !== "all") {
      result = result.filter((report) => report.grade === gradeFilter);
    }

    // 티커 검색 필터
    if (tickerSearch.trim()) {
      const search = tickerSearch.trim().toUpperCase();
      result = result.filter((report) => report.ticker.includes(search));
    }

    return result;
  }, [reports, myTickers, showMineOnly, gradeFilter, tickerSearch]);

  // 관심 티커 개수
  const mineCount = reports.filter((report) => myTickers.includes(report.ticker)).length;

  // 등급별 개수
  const gradeCounts = useMemo(() => {
    const counts: Record<string, number> = { all: reports.length };
    reports.forEach((report) => {
      if (report.grade) {
        counts[report.grade] = (counts[report.grade] || 0) + 1;
      }
    });
    return counts;
  }, [reports]);

  return (
    <main className="min-h-screen pt-32 pb-20 px-10 max-md:px-5">
      <div className="max-w-[1200px] mx-auto">
        {/* 페이지 헤더 */}
        <div className="text-center mt-5 mb-8">
          <h1 className="text-4xl font-bold mb-4">
            오늘의 <span className="text-accent-green">리포트</span>
          </h1>
        </div>

        {/* 안내사항 */}
        <div className="max-w-2xl mx-auto mb-10 p-5 rounded-xl bg-bg-card border border-border">
          <h3 className="text-sm font-semibold text-text-primary mb-3">안내사항</h3>
          <ul className="space-y-2 text-sm text-text-muted">
            <li className="flex gap-2">
              <span className="text-accent-green">•</span>
              <span>미국 정규장 마감(한국시간 06:00) 이후 데이터가 반영되어 07:10에 리포트가 자동 생성됩니다.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent-green">•</span>
              <span>오늘의 리포트는 신청된 티커를 기준으로 자동 생성됩니다.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent-green">•</span>
              <span>목록에 없는 티커는 <button onClick={() => setIsSubscribeModalOpen(true)} className="text-accent-green hover:underline">리포트 신청</button>을 통해 추가할 수 있습니다.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent-green">•</span>
              <span>직접 신청한 리포트는 이메일로 더 상세한 분석 내용을 받아보실 수 있습니다.</span>
            </li>
          </ul>
        </div>

        {/* 필터 영역 */}
        {!isFetching && !error && reports.length > 0 && (
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-14 mb-8">
            {/* 좌측: 등급 필터 */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-text-muted mr-1">등급</span>
              {ALL_GRADE_OPTIONS.map((option) => {
                const count = gradeCounts[option.value] || 0;
                return (
                  <button
                    key={option.value}
                    onClick={() => setGradeFilter(option.value)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      gradeFilter === option.value
                        ? `${option.color} text-white`
                        : "bg-bg-card border border-border text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    {option.label}
                    {count > 0 && <small className="ml-1 opacity-70">{count}</small>}
                  </button>
                );
              })}
            </div>

            {/* 우측: 티커 검색 + 관심만 보기 */}
            <div className="flex items-center gap-3">
              {/* 관심만 보기 토글 */}
              {mineCount > 0 && (
                <button
                  onClick={() => setShowMineOnly(!showMineOnly)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    showMineOnly
                      ? "bg-[#f43f5e] text-white"
                      : "bg-bg-card border border-border text-text-secondary hover:text-text-primary"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-3.5 h-3.5"
                  >
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                  <small>{mineCount}</small>
                </button>
              )}

              {/* 티커 검색 */}
              <div className="relative">
                <input
                  type="text"
                  value={tickerSearch}
                  onChange={(e) => setTickerSearch(e.target.value.toUpperCase())}
                  placeholder="티커 검색"
                  className="w-32 px-3 py-1.5 pl-8 bg-bg-card border border-border rounded-full text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-green transition-colors"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* 로딩 상태 */}
        {isFetching && (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-2 border-accent-green border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-text-muted">리포트를 불러오는 중...</p>
          </div>
        )}

        {/* 에러 상태 */}
        {error && !isFetching && (
          <div className="text-center py-12">
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={() => fetchReports(email)}
              className="px-4 py-2 bg-accent-green text-black rounded-lg font-medium hover:bg-emerald-600 transition-colors"
            >
              다시 시도
            </button>
          </div>
        )}

        {/* 빈 목록 상태 */}
        {!isFetching && !error && reports.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-text-muted mb-6">오늘 생성된 리포트가 없습니다</p>
            <button
              onClick={() => setIsSubscribeModalOpen(true)}
              className="px-5 py-2.5 bg-accent-green text-black rounded-lg text-sm font-semibold hover:bg-emerald-600 transition-colors"
            >
              리포트 신청하기
            </button>
          </div>
        )}

        {/* 필터 결과 없음 */}
        {!isFetching && !error && reports.length > 0 && filteredReports.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">
              {tickerSearch ? "🔍" : gradeFilter !== "all" ? "📊" : "💔"}
            </div>
            <p className="text-text-muted mb-6">
              {tickerSearch
                ? `"${tickerSearch}" 티커를 찾을 수 없습니다`
                : gradeFilter !== "all"
                ? `${gradeFilter} 등급의 리포트가 없습니다`
                : "관심 티커가 없습니다"}
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  setShowMineOnly(false);
                  setGradeFilter("all");
                  setTickerSearch("");
                }}
                className="px-5 py-2.5 bg-bg-card border border-border text-text-primary rounded-lg text-sm font-semibold hover:border-accent-green transition-colors"
              >
                전체 보기
              </button>
              <button
                onClick={() => setIsSubscribeModalOpen(true)}
                className="px-5 py-2.5 bg-accent-green text-black rounded-lg text-sm font-semibold hover:bg-emerald-600 transition-colors"
              >
                리포트 신청하기
              </button>
            </div>
          </div>
        )}

        {/* 리포트 목록 - 가상 스크롤 */}
        {!isFetching && !error && filteredReports.length > 0 && (
          <VirtuosoGrid
            useWindowScroll
            totalCount={filteredReports.length}
            overscan={200}
            listClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            itemContent={(index) => {
              const report = filteredReports[index];
              return (
                <ReportCard
                  key={report.id}
                  ticker={report.ticker}
                  status={report.status}
                  grade={report.grade}
                  upside={report.upside}
                  score={report.score}
                  summary={report.summary}
                  thesis={report.thesis}
                  entryStrategy={report.entry_strategy}
                  exitStrategy={report.exit_strategy}
                  esgRating={report.esg_rating}
                  esgScore={report.esg_score}
                  isMine={myTickers.includes(report.ticker)}
                />
              );
            }}
          />
        )}
      </div>

      {/* 구독 모달 */}
      <SubscribeModal
        isOpen={isSubscribeModalOpen}
        onClose={() => setIsSubscribeModalOpen(false)}
      />
    </main>
  );
}
