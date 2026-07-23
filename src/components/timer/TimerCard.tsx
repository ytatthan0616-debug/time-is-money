"use client";

import { useStudyState } from "@/hooks/useStudyState";
import { formatClock } from "@/lib/format";
import { ModeTabs } from "./ModeTabs";

export function TimerCard() {
  const {
    mode,
    setMode,
    start,
    pause,
    reset,
    isRunning,
    isCompleted,
    isStudying,
    phaseElapsedSeconds,
    phaseRemainingSeconds,
    state,
    setCountdownMinutes,
    setPomodoroFocusMinutes,
    setPomodoroBreakMinutes,
    setPomodoroLongBreakMinutes,
  } = useStudyState();

  const displaySeconds =
    mode === "stopwatch" ? phaseElapsedSeconds : phaseRemainingSeconds ?? 0;

  const pomodoroPhase = state.session?.pomodoroPhase;
  const pomodoroCycle = state.session?.pomodoroCycle ?? 0;

  return (
    <section className="relative w-full max-w-lg px-6 py-4 text-center">
      <ModeTabs mode={mode} disabled={isRunning} onChange={setMode} />

      {mode === "pomodoro" && (
        <p className="mt-4 text-center text-sm font-semibold text-amber-700">
          {pomodoroPhase === "break" ? "☕ 休憩中" : "📖 集中中"}
          <span className="ml-2 text-amber-500">（完了{pomodoroCycle}サイクル目）</span>
        </p>
      )}
      {mode === "countdown" && isCompleted && (
        <p className="mt-4 text-center text-sm font-semibold text-emerald-600">
          🎉 タイマーが終了しました
        </p>
      )}

      <div className="my-8 text-center">
        <span className="font-mono text-8xl font-bold tabular-nums text-zinc-900 drop-shadow-sm sm:text-9xl">
          {formatClock(displaySeconds)}
        </span>
        {!isStudying && mode === "pomodoro" && (
          <p className="mt-2 text-xs text-zinc-500">休憩中はコインは貯まりません</p>
        )}
      </div>

      <div className="flex justify-center gap-3">
        {isRunning ? (
          <button
            type="button"
            onClick={pause}
            className="rounded-full bg-zinc-900 px-10 py-4 text-lg font-semibold text-white transition-colors hover:bg-zinc-700"
          >
            一時停止
          </button>
        ) : (
          <button
            type="button"
            onClick={start}
            className="rounded-full bg-amber-500 px-10 py-4 text-lg font-semibold text-white shadow-md transition-colors hover:bg-amber-600"
          >
            {isCompleted ? "もう一度スタート" : "スタート"}
          </button>
        )}
        <button
          type="button"
          onClick={reset}
          className="rounded-full border border-zinc-300 px-10 py-4 text-lg font-semibold text-zinc-700 transition-colors hover:bg-zinc-100"
        >
          リセット
        </button>
      </div>

      {mode === "countdown" && (
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-zinc-600">
          <label htmlFor="countdown-minutes">目標時間（分）</label>
          <input
            id="countdown-minutes"
            type="number"
            min={1}
            max={600}
            disabled={isRunning}
            value={state.countdownMinutes}
            onChange={(e) => setCountdownMinutes(Math.max(1, Number(e.target.value) || 1))}
            className="w-20 rounded-lg border border-zinc-300 px-2 py-1 text-center disabled:opacity-50"
          />
        </div>
      )}

      {mode === "pomodoro" && (
        <div className="mt-6 grid grid-cols-3 gap-3 text-sm text-zinc-600">
          <label className="flex flex-col items-center gap-1">
            集中(分)
            <input
              type="number"
              min={1}
              max={180}
              disabled={isRunning}
              value={state.pomodoroFocusMinutes}
              onChange={(e) =>
                setPomodoroFocusMinutes(Math.max(1, Number(e.target.value) || 1))
              }
              className="w-16 rounded-lg border border-zinc-300 px-2 py-1 text-center disabled:opacity-50"
            />
          </label>
          <label className="flex flex-col items-center gap-1">
            休憩(分)
            <input
              type="number"
              min={1}
              max={60}
              disabled={isRunning}
              value={state.pomodoroBreakMinutes}
              onChange={(e) =>
                setPomodoroBreakMinutes(Math.max(1, Number(e.target.value) || 1))
              }
              className="w-16 rounded-lg border border-zinc-300 px-2 py-1 text-center disabled:opacity-50"
            />
          </label>
          <label className="flex flex-col items-center gap-1">
            長休憩(分)
            <input
              type="number"
              min={1}
              max={60}
              disabled={isRunning}
              value={state.pomodoroLongBreakMinutes}
              onChange={(e) =>
                setPomodoroLongBreakMinutes(Math.max(1, Number(e.target.value) || 1))
              }
              className="w-16 rounded-lg border border-zinc-300 px-2 py-1 text-center disabled:opacity-50"
            />
          </label>
        </div>
      )}
    </section>
  );
}
