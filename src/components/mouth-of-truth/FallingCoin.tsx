"use client";

export interface CoinInstance {
  id: number;
  drift: number;
  duration: number;
  delay: number;
}

export function FallingCoin({
  coin,
  onDone,
}: {
  coin: CoinInstance;
  onDone: (id: number) => void;
}) {
  const { id, drift, duration, delay } = coin;

  return (
    <span
      onAnimationEnd={() => onDone(id)}
      style={
        {
          "--drift": `${drift}px`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
        } as React.CSSProperties
      }
      className="coin-fall pointer-events-none absolute left-1/2 top-[38%] h-6 w-6 -translate-x-1/2 rounded-full border-2 border-amber-300 bg-gradient-to-br from-yellow-300 to-amber-500 text-center text-[10px] font-bold leading-5 text-amber-800 shadow"
    >
      ¥
    </span>
  );
}
