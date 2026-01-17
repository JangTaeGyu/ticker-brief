interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-bg-card via-border to-bg-card bg-[length:200%_100%] rounded ${className}`}
    />
  );
}

export function SkeletonText({ className = "" }: SkeletonProps) {
  return <Skeleton className={`h-4 ${className}`} />;
}

export function SkeletonCard() {
  return (
    <div className="p-6 rounded-2xl border border-border bg-bg-card">
      {/* 티커명 */}
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-8 rounded-lg" />
      </div>

      {/* 핵심 지표 */}
      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border">
        {[1, 2, 3].map((i) => (
          <div key={i} className="text-center">
            <Skeleton className="h-3 w-8 mx-auto mb-2" />
            <Skeleton className="h-6 w-10 mx-auto" />
          </div>
        ))}
      </div>

      {/* 투자 요약 */}
      <div className="mt-4 pt-4 border-t border-border">
        <Skeleton className="h-3 w-20 mb-3" />
        <div className="space-y-2">
          <SkeletonText className="w-full" />
          <SkeletonText className="w-full" />
          <SkeletonText className="w-3/4" />
        </div>
      </div>

      {/* 매매 전략 */}
      <div className="mt-4 pt-4 border-t border-border">
        <Skeleton className="h-3 w-20 mb-3" />
        <div className="space-y-2">
          <Skeleton className="h-16 w-full rounded-lg" />
          <Skeleton className="h-16 w-full rounded-lg" />
        </div>
      </div>

      {/* ESG */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-12" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-10" />
            <Skeleton className="h-5 w-8 rounded" />
          </div>
        </div>
      </div>

      {/* 공유 버튼 */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-8" />
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-7 w-7 rounded-md" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonReportGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
