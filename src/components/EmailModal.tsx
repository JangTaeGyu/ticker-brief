"use client";

import { useState } from "react";
import Modal from "./Modal";

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void;
}

export default function EmailModal({ isOpen, onClose, onSubmit }: EmailModalProps) {
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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="이메일 확인"
      subtitle="리포트를 신청를 이메일을 입력해주세요"
    >
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
    </Modal>
  );
}
