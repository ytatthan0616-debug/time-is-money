import { formatHours } from "@/lib/format";

const MAX_VISIBLE_COINS = 34;
const COIN_RADIUS = 11;
const BASE_ROW_SIZE = 8;
const COL_PITCH = 22;
const ROW_PITCH = 15;
const VIEW_WIDTH = 240;
const BASELINE_Y = 112;

function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

interface CoinSpot {
  cx: number;
  cy: number;
  r: number;
  highlightAngle: number;
}

/** 一番下の行を最大幅にして積み上げる、雑多な山を作る */
function buildPile(count: number): CoinSpot[] {
  const shown = Math.min(count, MAX_VISIBLE_COINS);
  const spots: CoinSpot[] = [];

  let remaining = shown;
  let capacity = BASE_ROW_SIZE;
  let row = 0;
  let index = 0;

  while (remaining > 0 && capacity > 0) {
    const n = Math.min(capacity, remaining);
    const rowWidth = n * COL_PITCH;
    const startX = (VIEW_WIDTH - rowWidth) / 2 + COL_PITCH / 2;
    const stagger = row % 2 === 1 ? COL_PITCH / 2 : 0;

    for (let i = 0; i < n; i++) {
      const seed = index + 1;
      const jitterX = (pseudoRandom(seed * 3.1) - 0.5) * (COL_PITCH * 0.6);
      const jitterY = (pseudoRandom(seed * 5.9) - 0.5) * (ROW_PITCH * 0.8);
      const r = COIN_RADIUS * (0.85 + pseudoRandom(seed * 7.7) * 0.3);
      const highlightAngle = pseudoRandom(seed * 9.3) * Math.PI * 2;

      spots.push({
        cx: startX + i * COL_PITCH + stagger + jitterX,
        cy: BASELINE_Y - row * ROW_PITCH + jitterY,
        r,
        highlightAngle,
      });
      index++;
    }

    remaining -= n;
    capacity -= 1;
    row += 1;
  }

  return spots;
}

export function CoinPile({
  totalCoins,
  totalStudySeconds,
}: {
  totalCoins: number;
  totalStudySeconds: number;
}) {
  const coins = buildPile(totalCoins);

  return (
    <div className="flex w-full flex-col items-center gap-3 pb-8 pt-2">
      <svg viewBox="0 0 240 130" className="h-32 w-60">
        <defs>
          <linearGradient id="coinGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="55%" stopColor="#f5b93f" />
            <stop offset="100%" stopColor="#c2760a" />
          </linearGradient>
          <radialGradient id="shadowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>

        <ellipse cx="120" cy="120" rx="90" ry="9" fill="url(#shadowGrad)" />

        {coins.map((c, i) => (
          <g key={i} transform={`translate(${c.cx} ${c.cy})`}>
            <circle r={c.r} fill="url(#coinGrad)" stroke="#9a5b0f" strokeWidth="1.2" />
            <ellipse
              cx={Math.cos(c.highlightAngle) * c.r * 0.35}
              cy={Math.sin(c.highlightAngle) * c.r * 0.35}
              rx={c.r * 0.4}
              ry={c.r * 0.22}
              fill="#fff8dc"
              opacity="0.55"
              transform={`rotate(${(c.highlightAngle * 180) / Math.PI})`}
            />
          </g>
        ))}
      </svg>

      <div className="flex items-center gap-4 text-base font-medium text-zinc-700">
        <span>🪙 {totalCoins.toLocaleString("ja-JP")} 枚</span>
        <span className="text-zinc-300">|</span>
        <span>⏱ 累計 {formatHours(totalStudySeconds)} 時間</span>
      </div>
    </div>
  );
}
