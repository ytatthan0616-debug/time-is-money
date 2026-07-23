"use client";

import { useEffect, useRef, useState } from "react";
import { useStudyState } from "@/hooks/useStudyState";
import { FallingCoin, type CoinInstance } from "./FallingCoin";

export function MouthOfTruth() {
  const { state } = useStudyState();
  const totalCoins = state.totalCoins;
  const [coins, setCoins] = useState<CoinInstance[]>([]);
  const [dropping, setDropping] = useState(false);
  const prevCoins = useRef<number | null>(null);
  const nextId = useRef(0);

  useEffect(() => {
    if (prevCoins.current === null) {
      prevCoins.current = totalCoins;
      return;
    }
    const diff = totalCoins - prevCoins.current;
    prevCoins.current = totalCoins;
    if (diff <= 0) return;

    const newCoins: CoinInstance[] = Array.from({ length: Math.min(diff, 8) }, () => ({
      id: nextId.current++,
      drift: (Math.random() - 0.5) * 70,
      duration: 1.1 + Math.random() * 0.4,
      delay: Math.random() * 0.15,
    }));
    setCoins((c) => [...c, ...newCoins]);

    setDropping(true);
    const t = setTimeout(() => setDropping(false), 500);
    return () => clearTimeout(t);
  }, [totalCoins]);

  const removeCoin = (id: number) => {
    setCoins((c) => c.filter((coin) => coin.id !== id));
  };

  return (
    <section className="relative overflow-hidden rounded-3xl border border-amber-200 bg-gradient-to-b from-amber-50 to-amber-100 p-6 text-center shadow-sm">
      <h2 className="mb-2 text-sm font-semibold text-amber-800">真実の口</h2>

      <div className="relative mx-auto h-56 w-56">
        <svg viewBox="0 0 200 200" className="h-full w-full drop-shadow-md" aria-hidden="true">
          <defs>
            <radialGradient id="stone" cx="35%" cy="30%" r="75%">
              <stop offset="0%" stopColor="#e8ddc7" />
              <stop offset="55%" stopColor="#cdbd9b" />
              <stop offset="100%" stopColor="#a5936c" />
            </radialGradient>
          </defs>

          <circle cx="100" cy="100" r="96" fill="url(#stone)" stroke="#8a7752" strokeWidth="3" />
          <circle
            cx="100"
            cy="100"
            r="96"
            fill="none"
            stroke="#8a7752"
            strokeWidth="1"
            strokeDasharray="2 6"
            opacity="0.5"
          />

          {/* hair / brow */}
          <path
            d="M40 70 Q100 30 160 70"
            fill="none"
            stroke="#7c6a46"
            strokeWidth="6"
            strokeLinecap="round"
            opacity="0.5"
          />

          {/* eyes */}
          <ellipse cx="68" cy="82" rx="12" ry="8" fill="#5b4d34" opacity="0.85" />
          <ellipse cx="132" cy="82" rx="12" ry="8" fill="#5b4d34" opacity="0.85" />
          <circle cx="68" cy="82" r="3" fill="#2b2418" />
          <circle cx="132" cy="82" r="3" fill="#2b2418" />

          {/* nose */}
          <path
            d="M100 88 L92 118 Q100 126 108 118 Z"
            fill="#b7a67e"
            stroke="#7c6a46"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* mouth (opens when a coin drops) */}
          <ellipse
            cx="100"
            cy="146"
            rx={dropping ? 30 : 22}
            ry={dropping ? 20 : 10}
            fill="#2b2013"
            className="transition-all duration-200 ease-out"
          />
          <ellipse cx="100" cy="146" rx="22" ry="4" fill="#4a3a24" opacity="0.6" />

          {/* cheeks texture */}
          <path
            d="M45 120 Q60 150 90 165"
            fill="none"
            stroke="#8a7752"
            strokeWidth="2"
            opacity="0.3"
          />
          <path
            d="M155 120 Q140 150 110 165"
            fill="none"
            stroke="#8a7752"
            strokeWidth="2"
            opacity="0.3"
          />
        </svg>

        {coins.map((coin) => (
          <FallingCoin key={coin.id} coin={coin} onDone={removeCoin} />
        ))}
      </div>

      <p className="mt-4 text-2xl font-bold text-amber-700">
        🪙 {totalCoins.toLocaleString("ja-JP")} <span className="text-sm font-normal">枚</span>
      </p>
      <p className="text-xs text-amber-600">1分勉強するごとにコインが1枚落ちてきます</p>
    </section>
  );
}
