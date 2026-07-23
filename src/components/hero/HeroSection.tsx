"use client";

import { useEffect, useRef, useState } from "react";
import { useStudyState } from "@/hooks/useStudyState";
import { MouthOfTruthFace } from "@/components/mouth-of-truth/MouthOfTruthFace";
import { CoinPile } from "@/components/mouth-of-truth/CoinPile";
import { FallingCoin, type CoinInstance } from "@/components/mouth-of-truth/FallingCoin";
import { TimerCard } from "@/components/timer/TimerCard";

export function HeroSection() {
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
      drift: (Math.random() - 0.5) * 40,
      duration: 1.5 + Math.random() * 0.5,
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
    <section className="relative flex min-h-[80vh] w-full flex-col items-center overflow-hidden bg-white">
      {/* 真実の口: 背景に薄く存在 */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 flex justify-center opacity-[0.08]"
        aria-hidden="true"
      >
        <MouthOfTruthFace dropping={dropping} className="h-72 w-72 sm:h-[26rem] sm:w-[26rem]" />
      </div>

      {/* タイマー: 前面に大きく */}
      <div className="relative z-10 flex w-full flex-1 items-center justify-center">
        <TimerCard />
      </div>

      {/* コインが口から瓶まで落ちる通り道 */}
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-hidden="true">
        {coins.map((coin) => (
          <FallingCoin key={coin.id} coin={coin} onDone={removeCoin} />
        ))}
      </div>

      <div className="relative z-10">
        <CoinPile totalCoins={totalCoins} totalStudySeconds={state.totalStudySeconds} />
      </div>
    </section>
  );
}
