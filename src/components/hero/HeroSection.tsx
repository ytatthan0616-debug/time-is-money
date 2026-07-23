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
      drift: (Math.random() - 0.5) * 60,
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
    <section className="relative flex min-h-[75vh] w-full flex-col items-center bg-white">
      <div className="pt-8">
        <MouthOfTruthFace dropping={dropping} />
      </div>

      <div className="relative flex w-full flex-1 items-center justify-center">
        <TimerCard />
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          {coins.map((coin) => (
            <FallingCoin key={coin.id} coin={coin} onDone={removeCoin} />
          ))}
        </div>
      </div>

      <CoinPile totalCoins={totalCoins} totalStudySeconds={state.totalStudySeconds} />
    </section>
  );
}
