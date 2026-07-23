import {
  DEFAULT_COUNTDOWN_MINUTES,
  DEFAULT_HOURLY_RATE,
  DEFAULT_POMODORO_BREAK_MINUTES,
  DEFAULT_POMODORO_FOCUS_MINUTES,
  DEFAULT_POMODORO_LONG_BREAK_MINUTES,
  STORAGE_KEY,
} from "./constants";
import type { StudyState } from "@/types";

export function createDefaultState(): StudyState {
  return {
    totalStudySeconds: 0,
    totalCoins: 0,
    genre: "general",
    hourlyRate: DEFAULT_HOURLY_RATE,
    pomodoroFocusMinutes: DEFAULT_POMODORO_FOCUS_MINUTES,
    pomodoroBreakMinutes: DEFAULT_POMODORO_BREAK_MINUTES,
    pomodoroLongBreakMinutes: DEFAULT_POMODORO_LONG_BREAK_MINUTES,
    countdownMinutes: DEFAULT_COUNTDOWN_MINUTES,
    session: null,
  };
}

export function loadState(): StudyState {
  const defaults = createDefaultState();
  if (typeof window === "undefined") return defaults;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw) as Partial<StudyState>;
    return { ...defaults, ...parsed };
  } catch {
    return defaults;
  }
}

export function saveState(state: StudyState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorageが使えない環境（プライベートモード等）では静かに無視する
  }
}
