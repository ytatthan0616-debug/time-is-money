import { formatHours } from "@/lib/format";

const JAR_COLUMNS = 6;
const JAR_ROWS = 5;
const MAX_VISIBLE_COINS = JAR_COLUMNS * JAR_ROWS;
const COIN_RADIUS = 10;
const COIN_PITCH = 24;
const BODY = { x: 30, y: 90, width: 160, height: 150, rx: 20 };

function coinCenters(count: number): { cx: number; cy: number }[] {
  const shown = Math.min(count, MAX_VISIBLE_COINS);
  const leftPad = (BODY.width - JAR_COLUMNS * COIN_PITCH) / 2;
  const bottomPad = 15;
  const centers: { cx: number; cy: number }[] = [];
  for (let i = 0; i < shown; i++) {
    const row = Math.floor(i / JAR_COLUMNS);
    const col = i % JAR_COLUMNS;
    centers.push({
      cx: BODY.x + leftPad + COIN_RADIUS + col * COIN_PITCH,
      cy: BODY.y + BODY.height - bottomPad - COIN_RADIUS - row * COIN_PITCH,
    });
  }
  return centers;
}

export function CoinJar({
  totalCoins,
  totalStudySeconds,
}: {
  totalCoins: number;
  totalStudySeconds: number;
}) {
  const centers = coinCenters(totalCoins);

  return (
    <div className="flex w-full flex-col items-center gap-3 pb-8 pt-2">
      <svg viewBox="0 0 220 260" className="h-56 w-48" aria-hidden="true">
        <defs>
          <clipPath id="jarBodyClip">
            <rect x={BODY.x} y={BODY.y} width={BODY.width} height={BODY.height} rx={BODY.rx} />
          </clipPath>
          <linearGradient id="coinGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
        </defs>

        {/* lid */}
        <rect x="65" y="38" width="90" height="20" rx="6" fill="#b45309" />
        <rect x="65" y="50" width="90" height="6" fill="#92400e" opacity="0.5" />

        {/* neck */}
        <rect
          x="75"
          y="55"
          width="70"
          height="45"
          rx="10"
          fill="#eef6fb"
          stroke="#94a3b8"
          strokeWidth="3"
          opacity="0.5"
        />

        {/* body glass */}
        <rect
          x={BODY.x}
          y={BODY.y}
          width={BODY.width}
          height={BODY.height}
          rx={BODY.rx}
          fill="#eef6fb"
          stroke="#94a3b8"
          strokeWidth="3"
          opacity="0.55"
        />

        {/* coins, clipped to the jar body so they never spill outside the glass */}
        <g clipPath="url(#jarBodyClip)">
          {centers.map((c, i) => (
            <circle
              key={i}
              cx={c.cx}
              cy={c.cy}
              r={COIN_RADIUS}
              fill="url(#coinGrad)"
              stroke="#b45309"
              strokeWidth="1.5"
            />
          ))}
        </g>

        {/* glass highlight */}
        <rect x="40" y="100" width="14" height="120" rx="7" fill="white" opacity="0.35" />

        {/* crisp outline on top */}
        <rect
          x={BODY.x}
          y={BODY.y}
          width={BODY.width}
          height={BODY.height}
          rx={BODY.rx}
          fill="none"
          stroke="#64748b"
          strokeWidth="3"
        />
      </svg>

      <div className="flex items-center gap-4 text-base font-medium text-zinc-700">
        <span>🪙 {totalCoins.toLocaleString("ja-JP")} 枚</span>
        <span className="text-zinc-300">|</span>
        <span>⏱ 累計 {formatHours(totalStudySeconds)} 時間</span>
      </div>
    </div>
  );
}
