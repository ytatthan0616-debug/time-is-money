"use client";

import { useEffect, useRef } from "react";

const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * Google AdSense枠。NEXT_PUBLIC_ADSENSE_CLIENTが未設定の間はプレースホルダーを表示する。
 * 本番運用時は .env に発行されたクライアントIDとスロットIDを設定するだけで有効化される。
 */
export function AdSlot({
  slot,
  className = "",
  label = "広告",
}: {
  slot: string;
  className?: string;
  label?: string;
}) {
  const insRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (!ADSENSE_CLIENT || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // AdSenseスクリプトが未ロードの場合は無視
    }
  }, []);

  if (!ADSENSE_CLIENT) {
    return (
      <div
        className={`flex items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 text-xs text-zinc-400 ${className}`}
      >
        {label}枠（AdSense未設定）
      </div>
    );
  }

  return (
    <ins
      ref={insRef}
      className={`adsbygoogle block ${className}`}
      style={{ display: "block" }}
      data-ad-client={ADSENSE_CLIENT}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
