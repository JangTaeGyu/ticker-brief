// Sub-components for SampleComparison

export function ReportSection({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5 pb-5 border-b border-border last:mb-0 last:pb-0 last:border-b-0">
      <div className="text-[13px] font-semibold text-text-muted mb-3 flex items-center gap-2">
        <span className="text-sm">{icon}</span> {title}
      </div>
      {children}
    </div>
  );
}

export function MetricBox({
  label,
  value,
  variant = "neutral",
}: {
  label: string;
  value: string;
  variant?: "up" | "down" | "neutral";
}) {
  const valueColor = {
    up: "text-accent-green",
    down: "text-accent-red",
    neutral: "text-text-primary",
  }[variant];

  return (
    <div className="bg-white/[0.03] rounded-[10px] p-3.5 text-center">
      <div className="text-[11px] text-text-muted mb-1">{label}</div>
      <div className={`font-['JetBrains_Mono'] text-base font-semibold ${valueColor}`}>
        {value}
      </div>
    </div>
  );
}

export function MiniChart() {
  return (
    <div className="h-20 bg-gradient-to-b from-accent-green/10 to-transparent rounded-lg relative overflow-hidden">
      <svg
        className="absolute bottom-4 left-2.5 right-2.5 h-10 w-[calc(100%-20px)]"
        viewBox="0 0 300 50"
        preserveAspectRatio="none"
      >
        <path
          d="M0,40 Q30,35 60,38 T120,25 T180,30 T240,15 T300,10"
          stroke="#10b981"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
  );
}

export function LockedContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-text-muted/10 border border-dashed border-text-muted/30 rounded-xl p-6 text-center text-text-muted">
      <div className="text-[28px] mb-2 opacity-50">🔒</div>
      <p className="text-[13px] leading-relaxed">{children}</p>
    </div>
  );
}

export function FeatureTag({
  children,
  included = false,
}: {
  children: React.ReactNode;
  included?: boolean;
}) {
  return (
    <span
      className={`px-3 py-1.5 rounded-md text-[11px] font-medium ${
        included
          ? "bg-accent-green-dim text-accent-green"
          : "bg-text-muted/10 text-text-muted line-through"
      }`}
    >
      {included && "✓ "}
      {children}
    </span>
  );
}

export function SwotItem({
  variant,
  label,
  children,
}: {
  variant: "strength" | "weakness" | "opportunity" | "threat";
  label: string;
  children: React.ReactNode;
}) {
  const styles = {
    strength: "bg-accent-green/10 text-accent-green",
    weakness: "bg-accent-red/10 text-accent-red",
    opportunity: "bg-accent-blue/10 text-accent-blue",
    threat: "bg-yellow-500/10 text-yellow-500",
  }[variant];

  return (
    <div className={`p-3 rounded-lg text-xs ${styles}`}>
      <div className="font-bold text-[10px] mb-1 opacity-80">{label}</div>
      {children}
    </div>
  );
}

export function ScenarioItem({
  variant,
  label,
  price,
  change,
}: {
  variant: "bull" | "base" | "bear";
  label: string;
  price: string;
  change: string;
}) {
  const bgStyles = {
    bull: "bg-accent-green/10",
    base: "bg-accent-blue/10",
    bear: "bg-accent-red/10",
  }[variant];

  const labelColor = {
    bull: "text-accent-green",
    base: "text-accent-blue",
    bear: "text-accent-red",
  }[variant];

  const changeColor = {
    bull: "text-accent-green",
    base: "text-accent-blue",
    bear: "text-accent-red",
  }[variant];

  return (
    <div className={`p-3.5 rounded-[10px] text-center ${bgStyles}`}>
      <div className={`text-[10px] font-bold mb-1.5 ${labelColor}`}>{label}</div>
      <div className="font-['JetBrains_Mono'] text-base font-bold text-text-primary">
        {price}
      </div>
      <div className={`text-[11px] mt-0.5 ${changeColor}`}>{change}</div>
    </div>
  );
}
