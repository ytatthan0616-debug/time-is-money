"use client";

import { useStudyState } from "@/hooks/useStudyState";
import { GENRES } from "@/lib/genres";

export function SettingsPanel() {
  const { state, setGenre, setHourlyRate } = useStudyState();

  return (
    <details className="group rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <summary className="cursor-pointer list-none text-sm font-semibold text-zinc-700 marker:content-none">
        ⚙️ 換算設定
        <span className="ml-2 text-xs font-normal text-zinc-400 group-open:hidden">
          （タップして開く）
        </span>
      </summary>

      <div className="mt-4 space-y-4">
        <div>
          <label
            htmlFor="hourly-rate"
            className="mb-1 block text-xs font-medium text-zinc-600"
          >
            学習1時間あたりの将来の年収アップ目安（円/時間）
          </label>
          <input
            id="hourly-rate"
            type="number"
            min={0}
            step={100}
            value={state.hourlyRate}
            onChange={(e) => setHourlyRate(Math.max(0, Number(e.target.value) || 0))}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label htmlFor="genre" className="mb-1 block text-xs font-medium text-zinc-600">
            学習ジャンル（任意・換算係数が変わります）
          </label>
          <select
            id="genre"
            value={state.genre}
            onChange={(e) => setGenre(e.target.value as typeof state.genre)}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          >
            {GENRES.map((g) => (
              <option key={g.key} value={g.key}>
                {g.label}（係数 ×{g.coefficient}）
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-zinc-400">
            {GENRES.find((g) => g.key === state.genre)?.description}
          </p>
        </div>
      </div>
    </details>
  );
}
