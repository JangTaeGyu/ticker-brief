"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ko">
      <body style={{ backgroundColor: "#0a0f0d", color: "#e5e7eb" }}>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div style={{ textAlign: "center", maxWidth: "400px" }}>
            <div style={{ fontSize: "60px", marginBottom: "24px" }}>😵</div>
            <h1
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "16px",
              }}
            >
              심각한 오류가 발생했습니다
            </h1>
            <p
              style={{
                color: "#9ca3af",
                marginBottom: "32px",
                lineHeight: "1.6",
              }}
            >
              애플리케이션을 불러오는 중 문제가 발생했습니다.
              <br />
              페이지를 새로고침하거나 잠시 후 다시 시도해주세요.
            </p>
            <button
              onClick={reset}
              style={{
                padding: "12px 24px",
                backgroundColor: "#10b981",
                color: "black",
                border: "none",
                borderRadius: "8px",
                fontWeight: "600",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              다시 시도
            </button>
            {error.digest && (
              <p style={{ marginTop: "24px", fontSize: "12px", color: "#6b7280" }}>
                오류 코드: {error.digest}
              </p>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}
