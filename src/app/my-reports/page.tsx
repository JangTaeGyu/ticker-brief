"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import Link from "next/link";
import EmailModal from "@/components/EmailModal";
import ReportCard from "@/components/ReportCard";

const STORAGE_KEY = "tickerbrief_email";
const ITEMS_PER_PAGE = 6;

type FilterType = "all" | "mine";

interface Report {
  id: string;
  ticker: string;
  status: string;
  score: number | null;
  grade: string | null;
  upside: number | null;
  created_at: string;
}

export default function MyReportsPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reports, setReports] = useState<Report[]>([]);
  const [myTickers, setMyTickers] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [filter, setFilter] = useState<FilterType>("all");
  const loaderRef = useRef<HTMLDivElement>(null);

  // localStorage에서 이메일 확인
  useEffect(() => {
    const savedEmail = localStorage.getItem(STORAGE_KEY);
    if (savedEmail) {
      setEmail(savedEmail);
    }
    setIsLoading(false);
  }, []);

  // 리포트 목록 조회
  const fetchReports = useCallback(async (userEmail: string) => {
    setIsFetching(true);
    setError(null);

    try {
      const res = await fetch(`/api/my-reports?email=${encodeURIComponent(userEmail)}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "리포트 조회 실패");
      }

      setReports(data.reports || []);
      setMyTickers(data.myTickers || []);
      setVisibleCount(ITEMS_PER_PAGE);
    } catch (err) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다");
    } finally {
      setIsFetching(false);
    }
  }, []);

  // 이메일이 설정되면 리포트 조회
  useEffect(() => {
    if (email) {
      fetchReports(email);
    }
  }, [email, fetchReports]);

  // 필터링된 리포트
  const filteredReports = useMemo(() => {
    if (filter === "mine") {
      return reports.filter((report) => myTickers.includes(report.ticker));
    }
    return reports;
  }, [reports, myTickers, filter]);

  // 필터 변경 시 visibleCount 초기화
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [filter]);

  // 무한 스크롤 - Intersection Observer
  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < filteredReports.length) {
          setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, filteredReports.length));
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(loader);

    return () => observer.disconnect();
  }, [visibleCount, filteredReports.length]);

  // 이메일 저장 핸들러
  const handleEmailSubmit = (inputEmail: string) => {
    localStorage.setItem(STORAGE_KEY, inputEmail);
    setEmail(inputEmail);
  };

  // 표시할 리포트
  const visibleReports = filteredReports.slice(0, visibleCount);
  const hasMore = visibleCount < filteredReports.length;

  // 관심 티커 개수
  const mineCount = reports.filter((report) => myTickers.includes(report.ticker)).length;

  // 초기 로딩 중
  if (isLoading) {
    return (
      <main className="min-h-screen pt-32 pb-20 px-10 max-md:px-5">
        <div className="max-w-[1200px] mx-auto text-center">
          <div className="animate-pulse text-text-muted">로딩 중...</div>
        </div>
      </main>
    );
  }

  return (
    <>
      {/* 이메일 미입력 시 모달 표시 */}
      {!email && <EmailModal onSubmit={handleEmailSubmit} />}

      <main className="min-h-screen pt-32 pb-20 px-10 max-md:px-5">
        <div className="max-w-[1200px] mx-auto">
          {/* 페이지 헤더 */}
          <div className="text-center mt-5 mb-8">
            <h1 className="text-4xl font-bold mb-4">
              오늘의 <span className="text-accent-green">리포트</span>
            </h1>
            <p className="text-text-muted">
              매일 오전 7시 10분에 새로운 리포트가 생성됩니다
            </p>
          </div>

          {/* 필터 탭 */}
          {!isFetching && !error && reports.length > 0 && (
            <div className="flex justify-center gap-4 mt-14 mb-8">
              <button
                onClick={() => setFilter("all")}
                className={`relative px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === "all"
                    ? "bg-accent-green text-black"
                    : "bg-bg-card border border-border text-text-secondary hover:text-text-primary"
                }`}
              >
                전체
                {reports.length > 0 && (
                  <span className={`absolute -top-7 left-1/2 -translate-x-1/2 w-6 h-6 text-xs font-bold rounded-full flex items-center justify-center border-2 leading-none ${
                    filter === "all"
                      ? "bg-accent-green text-black border-bg-primary"
                      : "bg-bg-card text-text-secondary border-accent-green"
                  }`}>
                    {reports.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setFilter("mine")}
                className={`relative px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === "mine"
                    ? "bg-[#f43f5e] text-white"
                    : "bg-bg-card border border-border text-text-secondary hover:text-text-primary"
                }`}
              >
                관심
                {mineCount > 0 && (
                  <span className={`absolute -top-7 left-1/2 -translate-x-1/2 w-6 h-6 text-xs font-bold rounded-full flex items-center justify-center border-2 leading-none ${
                    filter === "mine"
                      ? "bg-[#f43f5e] text-white border-bg-primary"
                      : "bg-bg-card text-text-secondary border-[#f43f5e]"
                  }`}>
                    {mineCount}
                  </span>
                )}
              </button>
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
                onClick={() => email && fetchReports(email)}
                className="px-4 py-2 bg-accent-green text-black rounded-lg font-medium hover:bg-emerald-600 transition-colors"
              >
                다시 시도
              </button>
            </div>
          )}

          {/* 빈 목록 상태 */}
          {!isFetching && !error && reports.length === 0 && email && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-text-muted mb-6">오늘 생성된 리포트가 없습니다</p>
              <Link
                href="/#subscribe"
                className="inline-block px-6 py-3 bg-accent-green text-black rounded-lg font-semibold hover:bg-emerald-600 transition-colors"
              >
                리포트 신청하기
              </Link>
            </div>
          )}

          {/* 필터 결과 없음 */}
          {!isFetching && !error && reports.length > 0 && filteredReports.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">💔</div>
              <p className="text-text-muted mb-6">관심 티커가 없습니다</p>
              <button
                onClick={() => setFilter("all")}
                className="px-6 py-3 bg-accent-green text-black rounded-lg font-semibold hover:bg-emerald-600 transition-colors"
              >
                전체 보기
              </button>
            </div>
          )}

          {/* 리포트 목록 */}
          {!isFetching && !error && filteredReports.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleReports.map((report) => (
                  <ReportCard
                    key={report.id}
                    ticker={report.ticker}
                    status={report.status}
                    grade={report.grade}
                    upside={report.upside}
                    score={report.score}
                    isMine={myTickers.includes(report.ticker)}
                  />
                ))}
              </div>

              {/* 더 보기 로더 */}
              {hasMore && (
                <div ref={loaderRef} className="text-center py-8">
                  <div className="animate-spin w-6 h-6 border-2 border-accent-green border-t-transparent rounded-full mx-auto" />
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
}
