"use client";

import { useState } from "react";
import Link from "next/link";

interface EmailModalProps {
  onSubmit: (email: string) => void;
}

export default function EmailModal({ onSubmit }: EmailModalProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("이메일을 입력해주세요");
      return;
    }

    if (!validateEmail(email)) {
      setError("올바른 이메일 형식이 아닙니다");
      return;
    }

    onSubmit(email.trim());
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center">
      {/* 암전된 배경 */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* 모달 박스 */}
      <div className="relative z-10 w-full max-w-md mx-4 p-8 bg-bg-card border border-border rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-bold text-center mb-2">
          이메일 확인
        </h2>
        <p className="text-text-muted text-center mb-6">
          리포트를 신청한 이메일을 입력해주세요
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            className="w-full px-4 py-3 bg-bg-primary border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-green transition-colors"
            autoFocus
          />

          {error && (
            <p className="mt-2 text-sm text-red-400">{error}</p>
          )}

          <button
            type="submit"
            className="w-full mt-4 px-6 py-3 bg-accent-green text-black font-semibold rounded-lg hover:bg-emerald-600 transition-colors"
          >
            확인
          </button>
        </form>

        <p className="mt-4 text-xs text-text-muted text-center">
          입력한 이메일은 브라우저에 저장되어 다시 묻지 않습니다
        </p>

        <Link
          href="/"
          className="block mt-4 text-center text-sm text-text-muted hover:text-text-primary transition-colors"
        >
          ← 메인으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
