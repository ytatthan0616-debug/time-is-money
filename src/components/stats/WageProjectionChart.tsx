"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useStudyState } from "@/hooks/useStudyState";
import { formatYen } from "@/lib/format";
import { buildWageChartData } from "@/lib/wage";

export function WageProjectionChart() {
  const { state } = useStudyState();
  const data = buildWageChartData(state.totalStudySeconds, state.hourlyRate, state.genre);
  const currentPoint = data.find((d) => d.isCurrent);

  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="text-sm font-semibold text-zinc-700">学習時間と将来の年収アップの目安</h2>
      <div className="mt-4 h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="wageFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
            <XAxis
              dataKey="hours"
              tickFormatter={(v: number) => `${v}h`}
              tick={{ fontSize: 12, fill: "#71717a" }}
            />
            <YAxis
              tickFormatter={(v: number) => `¥${Math.round(v / 1000)}k`}
              tick={{ fontSize: 12, fill: "#71717a" }}
              width={56}
            />
            <Tooltip
              formatter={(value) => [`¥${formatYen(Number(value))}`, "推定アップ額"]}
              labelFormatter={(label) => `累計 ${label} 時間`}
            />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#f59e0b"
              strokeWidth={2}
              fill="url(#wageFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      {currentPoint && (
        <p className="mt-2 text-center text-xs text-zinc-500">
          現在地点: 累計 {currentPoint.hours} 時間 → ¥{formatYen(currentPoint.amount)}
        </p>
      )}
    </section>
  );
}
