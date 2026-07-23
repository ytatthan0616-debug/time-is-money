import { formatHours } from "@/lib/format";

const MAX_VISIBLE_COINS = 45;
const BOTTOM_ROW_SIZE = 9;

function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/** ボトム行(最大)から積み上げていく三角形のコイン枚数配列を返す */
function buildPileRows(coinCount: number): number[] {
  const shown = Math.min(coinCount, MAX_VISIBLE_COINS);
  const rows: number[] = [];
  let remaining = shown;
  let capacity = BOTTOM_ROW_SIZE;
  while (remaining > 0 && capacity > 0) {
    const n = Math.min(capacity, remaining);
    rows.push(n);
    remaining -= n;
    capacity -= 1;
  }
  return rows;
}

export function CoinPile({
  totalCoins,
  totalStudySeconds,
}: {
  totalCoins: number;
  totalStudySeconds: number;
}) {
  const rows = buildPileRows(totalCoins);

  return (
    <div className="flex w-full flex-col items-center gap-3 pb-8 pt-2">
      <div className="flex h-24 flex-col-reverse items-center justify-start gap-0.5" aria-hidden="true">
        {rows.map((rowCount, rowIndex) => (
          <div key={rowIndex} className="flex -space-x-1.5">
            {Array.from({ length: rowCount }).map((_, i) => {
              const seed = rowIndex * 13 + i * 7 + 1;
              const jitter = (pseudoRandom(seed) - 0.5) * 3;
              return (
                <span
                  key={i}
                  style={{ transform: `translateY(${jitter}px)` }}
                  className="h-3.5 w-3.5 rounded-full border border-amber-300 bg-gradient-to-br from-yellow-300 to-amber-500 shadow-sm"
                />
              );
            })}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 text-sm font-medium text-zinc-700">
        <span>🪙 {totalCoins.toLocaleString("ja-JP")} 枚</span>
        <span className="text-zinc-300">|</span>
        <span>⏱ 累計 {formatHours(totalStudySeconds)} 時間</span>
      </div>
    </div>
  );
}
