"use client";

import type { TimerMode } from "@/types";

const MODES: { key: TimerMode; label: string }[] = [
  { key: "stopwatch", label: "ストップウォッチ" },
  { key: "countdown", label: "カウントダウン" },
  { key: "pomodoro", label: "ポモドーロ" },
];

export function ModeTabs({
  mode,
  disabled,
  onChange,
}: {
  mode: TimerMode;
  disabled: boolean;
  onChange: (mode: TimerMode) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="タイマーモード"
      className="grid grid-cols-3 gap-1 rounded-full bg-amber-100 p-1 text-sm font-medium"
    >
      {MODES.map((m) => {
        const active = m.key === mode;
        return (
          <button
            key={m.key}
            type="button"
            role="tab"
            aria-selected={active}
            disabled={disabled && !active}
            onClick={() => onChange(m.key)}
            className={`rounded-full px-2 py-2 transition-colors sm:px-4 ${
              active
                ? "bg-amber-500 text-white shadow"
                : "text-amber-900 hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-50"
            }`}
          >
            {m.label}
          </button>
        );
      })}
    </div>
  );
}
