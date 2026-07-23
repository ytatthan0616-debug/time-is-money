export type TimerMode = "stopwatch" | "countdown" | "pomodoro";

export type PomodoroPhase = "focus" | "break";

export type GenreKey =
  | "general"
  | "programming"
  | "language"
  | "certification"
  | "reading";

export interface RunningSession {
  mode: TimerMode;
  /** Epoch ms when the current phase started (only valid while isRunning). */
  startedAt: number;
  /** Seconds already accumulated in this phase before the current start (for pause/resume). */
  accumulatedSeconds: number;
  /** How much of accumulatedSeconds/live-elapsed has already been credited to totalStudySeconds. */
  creditedSeconds: number;
  isRunning: boolean;
  /** True once a countdown phase has reached its target. */
  completed: boolean;
  /** Only meaningful for pomodoro mode. */
  pomodoroPhase: PomodoroPhase;
  /** Number of focus phases completed so far. */
  pomodoroCycle: number;
  /** Only meaningful for countdown mode: target duration in seconds. */
  countdownTargetSeconds: number;
}

export interface StudyState {
  totalStudySeconds: number;
  totalCoins: number;
  genre: GenreKey;
  hourlyRate: number;
  pomodoroFocusMinutes: number;
  pomodoroBreakMinutes: number;
  pomodoroLongBreakMinutes: number;
  countdownMinutes: number;
  session: RunningSession | null;
}

export interface CoinDropEvent {
  id: number;
}
