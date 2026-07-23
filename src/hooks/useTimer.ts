"use client";

import { useEffect, useState } from "react";
import type { RunningSession } from "@/types";

/** タブがバックグラウンドでスロットリングされてもDate.now()差分で正確に復元できるよう、
 * 定期的に再レンダーをトリガーするだけの軽量ティッカー。 */
export function useTicker(active: boolean, intervalMs = 250): number {
  const [nonce, setNonce] = useState(0);
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setNonce((n) => n + 1), intervalMs);
    return () => clearInterval(id);
  }, [active, intervalMs]);
  return nonce;
}

export function computeLiveElapsedSeconds(session: RunningSession | null): number {
  if (!session) return 0;
  if (!session.isRunning) return session.accumulatedSeconds;
  return session.accumulatedSeconds + (Date.now() - session.startedAt) / 1000;
}
