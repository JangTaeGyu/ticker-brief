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

  const handleThreadsShare = useCallback(() => {
    const threadsUrl = `https://www.threads.net/intent/post?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`;
    window.open(threadsUrl, "_blank", "width=550,height=420");
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

      {/* Threads */}
      <button
        onClick={handleThreadsShare}
        className={buttonClass}
        title="스레드에 공유"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`${iconClass} text-text-muted`}>
          <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.182.408-2.256 1.33-3.022.88-.73 2.112-1.16 3.475-1.217 1.06-.044 2.06.088 2.99.394.026-.71-.026-1.391-.154-2.023-.263-1.299-.752-2.246-1.46-2.819-.768-.621-1.823-.921-3.228-.918l-.013.002c-1.703.05-2.926.64-3.638 1.753l-1.7-1.127c1.022-1.595 2.785-2.471 5.301-2.633l.019-.001c1.883-.022 3.424.438 4.582 1.364 1.168.936 1.906 2.27 2.263 3.968.166.791.242 1.66.227 2.588.907.452 1.67 1.073 2.27 1.856.988 1.292 1.53 2.942 1.53 4.652-.002 2.133-.818 4.088-2.437 5.828-1.92 2.065-4.676 3.168-8.2 3.28h-.036zm-.09-5.666c1.074-.055 1.864-.467 2.417-1.262.396-.568.663-1.307.79-2.167-.628-.2-1.303-.31-2.014-.31-.497 0-.972.044-1.418.133-.878.174-1.578.512-1.97.952-.345.387-.502.838-.468 1.343.046.67.376 1.186.955 1.494.516.274 1.141.362 1.708.317z" />
        </svg>
      </button>
    </div>
  );
}
