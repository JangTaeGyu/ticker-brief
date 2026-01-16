"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "tickerbrief_email";

interface SubmitStatus {
  type: "success" | "error";
  message: string;
}

interface UseSubscriptionFormOptions {
  onSuccess?: () => void;
}

interface UseSubscriptionFormReturn {
  // State
  email: string;
  hasStoredEmail: boolean;
  remainingReports: number | null;
  isSubmitting: boolean;
  submitStatus: SubmitStatus | null;

  // Actions
  setEmail: (email: string) => void;
  setSubmitStatus: (status: SubmitStatus | null) => void;
  handleSubmit: (tickers: string[]) => Promise<boolean>;
  updateRemainingReports: (decrement: number) => void;
}

export function useSubscriptionForm(options: UseSubscriptionFormOptions = {}): UseSubscriptionFormReturn {
  const { onSuccess } = options;

  const [email, setEmail] = useState("");
  const [hasStoredEmail, setHasStoredEmail] = useState(false);
  const [remainingReports, setRemainingReports] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus | null>(null);

  // Load email from localStorage
  useEffect(() => {
    const storedEmail = localStorage.getItem(STORAGE_KEY);
    if (storedEmail) {
      setEmail(storedEmail);
      setHasStoredEmail(true);
    }
  }, []);

  // Check remaining reports when email changes
  useEffect(() => {
    if (!email || !email.includes("@")) {
      setRemainingReports(null);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const response = await fetch(`/api/check-limit?email=${encodeURIComponent(email)}`);
        const data = await response.json();
        setRemainingReports(data.remaining);
      } catch (error) {
        console.error("Check limit error:", error);
        setRemainingReports(null);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [email]);

  const updateRemainingReports = (decrement: number) => {
    if (remainingReports !== null) {
      setRemainingReports(Math.max(0, remainingReports - decrement));
    }
  };

  const handleSubmit = async (tickers: string[]): Promise<boolean> => {
    setSubmitStatus(null);

    if (!email || !email.includes("@")) {
      setSubmitStatus({ type: "error", message: "유효한 이메일 주소를 입력해주세요." });
      return false;
    }

    if (tickers.length === 0) {
      setSubmitStatus({ type: "error", message: "최소 1개의 종목을 선택해주세요." });
      return false;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, tickers }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "신청 중 오류가 발생했습니다.");
      }

      // Save email to localStorage
      localStorage.setItem(STORAGE_KEY, email);
      setHasStoredEmail(true);

      setSubmitStatus({ type: "success", message: "신청이 완료되었습니다! 곧 리포트를 받아보실 수 있습니다." });
      updateRemainingReports(tickers.length);

      onSuccess?.();
      return true;
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: error instanceof Error ? error.message : "신청 중 오류가 발생했습니다.",
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    // State
    email,
    hasStoredEmail,
    remainingReports,
    isSubmitting,
    submitStatus,

    // Actions
    setEmail,
    setSubmitStatus,
    handleSubmit,
    updateRemainingReports,
  };
}
