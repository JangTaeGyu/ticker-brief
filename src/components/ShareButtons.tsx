"use client";

import { useState, useCallback } from "react";

interface ShareButtonsProps {
  ticker: string;
  grade?: string | null;
  upside?: number | null;
  compact?: boolean;
}

export default function ShareButtons({ ticker, grade, upside, compact = false }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const siteUrl = "https://ticker-brief.jubrolab.dev";
  const shareUrl = `${siteUrl}/today-reports`;

  const gradeText = grade ? `등급 ${grade}` : "";
  const upsideText = upside !== null && upside !== undefined
    ? `상승여력 ${upside >= 0 ? "+" : ""}${upside.toFixed(1)}%`
    : "";

  const shareText = `[TickerBrief] ${ticker} AI 분석 리포트${gradeText ? ` - ${gradeText}` : ""}${upsideText ? `, ${upsideText}` : ""}\n\n무료로 AI 주식 분석 리포트를 받아보세요!`;

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = `${shareText}\n${shareUrl}`;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [shareText, shareUrl]);

  const handleTwitterShare = useCallback(() => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, "_blank", "width=550,height=420");
  }, [shareText, shareUrl]);

  const handleFacebookShare = useCallback(() => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
    window.open(facebookUrl, "_blank", "width=550,height=420");
  }, [shareText, shareUrl]);

  const buttonClass = compact
    ? "p-1.5 rounded-md hover:bg-white/5 transition-colors"
    : "p-2 rounded-lg bg-bg-card border border-border hover:border-accent-green/50 transition-colors";

  const iconClass = compact ? "w-3.5 h-3.5" : "w-4 h-4";

  return (
    <div className={`flex items-center ${compact ? "gap-1" : "gap-2"}`}>
      {!compact && <span className="text-xs text-text-muted mr-1">공유</span>}

      {/* Copy Link */}
      <button
        onClick={handleCopyLink}
        className={buttonClass}
        title="링크 복사"
      >
        {copied ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`${iconClass} text-accent-green`}>
            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`${iconClass} text-text-muted`}>
            <path d="M12.232 4.232a2.5 2.5 0 013.536 3.536l-1.225 1.224a.75.75 0 001.061 1.06l1.224-1.224a4 4 0 00-5.656-5.656l-3 3a4 4 0 00.225 5.865.75.75 0 00.977-1.138 2.5 2.5 0 01-.142-3.667l3-3z" />
            <path d="M11.603 7.963a.75.75 0 00-.977 1.138 2.5 2.5 0 01.142 3.667l-3 3a2.5 2.5 0 01-3.536-3.536l1.225-1.224a.75.75 0 00-1.061-1.06l-1.224 1.224a4 4 0 105.656 5.656l3-3a4 4 0 00-.225-5.865z" />
          </svg>
        )}
      </button>

      {/* Twitter/X */}
      <button
        onClick={handleTwitterShare}
        className={buttonClass}
        title="X(트위터)에 공유"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`${iconClass} text-text-muted`}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </button>

      {/* Facebook */}
      <button
        onClick={handleFacebookShare}
        className={buttonClass}
        title="페이스북에 공유"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`${iconClass} text-text-muted`}>
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </button>
    </div>
  );
}
