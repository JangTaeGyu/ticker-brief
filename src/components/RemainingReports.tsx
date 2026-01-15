"use client";

const WEEKLY_LIMIT = 10;

interface RemainingReportsProps {
  remaining: number;
}

export default function RemainingReports({ remaining }: RemainingReportsProps) {
  const used = WEEKLY_LIMIT - remaining;

  return (
    <div className={`flex items-center justify-between text-sm ${remaining === 0 ? "text-red-400" : "text-text-muted"}`}>
      <span>이번 주 남은 리포트</span>
      <span>
        <span className="font-semibold text-accent-green">{used}</span> / {WEEKLY_LIMIT}
      </span>
    </div>
  );
}

export { WEEKLY_LIMIT };
