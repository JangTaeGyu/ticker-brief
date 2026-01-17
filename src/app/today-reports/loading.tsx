import { SkeletonReportGrid, Skeleton } from "@/components/Skeleton";

export default function TodayReportsLoading() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-10 max-md:px-5">
      <div className="max-w-[1200px] mx-auto">
        {/* 페이지 헤더 */}
        <div className="text-center mt-5 mb-8">
          <Skeleton className="h-10 w-60 mx-auto mb-4" />
        </div>

        {/* 안내사항 스켈레톤 */}
        <div className="max-w-2xl mx-auto mb-10 p-5 rounded-xl bg-bg-card border border-border">
          <Skeleton className="h-4 w-20 mb-3" />
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>

        {/* 필터 영역 스켈레톤 */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-14 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <Skeleton className="h-4 w-8 mr-1" />
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-8 w-14 rounded-full" />
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-32 rounded-full" />
          </div>
        </div>

        {/* 리포트 그리드 스켈레톤 */}
        <SkeletonReportGrid count={6} />
      </div>
    </main>
  );
}
