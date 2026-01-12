export default function OfflinePage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-5">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">📡</div>
        <h1 className="text-2xl font-bold mb-4">오프라인 상태입니다</h1>
        <p className="text-text-secondary mb-8">
          인터넷 연결이 끊어졌습니다.
          <br />
          연결 상태를 확인하고 다시 시도해 주세요.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-accent-green text-black px-6 py-3 rounded-lg font-semibold hover:bg-emerald-600 transition-colors"
        >
          다시 시도
        </button>
      </div>
    </main>
  );
}
