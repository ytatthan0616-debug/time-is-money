"use client";

import { useStudyState } from "@/hooks/useStudyState";
import { formatHours, formatYen } from "@/lib/format";
import { getGenre } from "@/lib/genres";
import { estimateWageIncrease } from "@/lib/wage";

export function StatsPanel() {
  const { state } = useStudyState();
  const genre = getGenre(state.genre);
  const wage = estimateWageIncrease(state.totalStudySeconds, state.hourlyRate, state.genre);

  return (
    <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm">
      <h2 className="text-sm font-semibold text-emerald-800">推定・将来の年収アップ額</h2>
      <p className="mt-1 text-4xl font-extrabold tracking-tight text-emerald-700">
        ¥{formatYen(wage)}
      </p>
      <p className="mt-1 text-xs text-emerald-600">
        ※シミュレーションです。実際の年収を保証するものではありません。
      </p>

      <dl className="mt-6 grid grid-cols-3 gap-3 text-center">
        <div className="rounded-2xl bg-white/70 p-3">
          <dt className="text-xs text-zinc-500">累計学習時間</dt>
          <dd className="mt-1 text-lg font-bold text-zinc-800">
            {formatHours(state.totalStudySeconds)}
            <span className="text-xs font-normal"> 時間</span>
          </dd>
        </div>
        <div className="rounded-2xl bg-white/70 p-3">
          <dt className="text-xs text-zinc-500">累計コイン</dt>
          <dd className="mt-1 text-lg font-bold text-zinc-800">
            {state.totalCoins.toLocaleString("ja-JP")}
            <span className="text-xs font-normal"> 枚</span>
          </dd>
        </div>
        <div className="rounded-2xl bg-white/70 p-3">
          <dt className="text-xs text-zinc-500">学習ジャンル</dt>
          <dd className="mt-1 text-lg font-bold text-zinc-800">{genre.label}</dd>
        </div>
      </dl>
    </section>
  );
}
