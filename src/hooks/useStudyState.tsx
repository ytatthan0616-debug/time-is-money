"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type ReactNode,
} from "react";
import { loadState, saveState, createDefaultState } from "@/lib/storage";
import { POMODORO_CYCLES_BEFORE_LONG_BREAK } from "@/lib/constants";
import { computeLiveElapsedSeconds, useTicker } from "./useTimer";
import type { GenreKey, RunningSession, StudyState, TimerMode } from "@/types";

type Action =
  | { type: "HYDRATE"; state: StudyState }
  | { type: "TICK"; now: number }
  | { type: "SET_MODE"; mode: TimerMode }
  | { type: "START"; now: number }
  | { type: "PAUSE"; now: number }
  | { type: "RESET" }
  | { type: "SET_GENRE"; genre: GenreKey }
  | { type: "SET_HOURLY_RATE"; hourlyRate: number }
  | { type: "SET_POMODORO_FOCUS_MINUTES"; minutes: number }
  | { type: "SET_POMODORO_BREAK_MINUTES"; minutes: number }
  | { type: "SET_POMODORO_LONG_BREAK_MINUTES"; minutes: number }
  | { type: "SET_COUNTDOWN_MINUTES"; minutes: number };

function newSession(mode: TimerMode, state: StudyState, now: number): RunningSession {
  return {
    mode,
    startedAt: now,
    accumulatedSeconds: 0,
    creditedSeconds: 0,
    isRunning: false,
    completed: false,
    pomodoroPhase: "focus",
    pomodoroCycle: 0,
    countdownTargetSeconds: state.countdownMinutes * 60,
  };
}

function isStudyPhase(session: RunningSession): boolean {
  return session.mode !== "pomodoro" || session.pomodoroPhase === "focus";
}

function phaseTargetSeconds(state: StudyState, session: RunningSession): number | null {
  if (session.mode === "countdown") return session.countdownTargetSeconds;
  if (session.mode === "pomodoro") {
    if (session.pomodoroPhase === "focus") return state.pomodoroFocusMinutes * 60;
    const isLong =
      session.pomodoroCycle > 0 &&
      session.pomodoroCycle % POMODORO_CYCLES_BEFORE_LONG_BREAK === 0;
    return isLong ? state.pomodoroLongBreakMinutes * 60 : state.pomodoroBreakMinutes * 60;
  }
  return null;
}

/** 学習として経過した秒数を totalStudySeconds / totalCoins に反映する */
function creditStudySeconds(state: StudyState, addSeconds: number): StudyState {
  if (addSeconds <= 0) return state;
  const prevMinutes = Math.floor(state.totalStudySeconds / 60);
  const totalStudySeconds = state.totalStudySeconds + addSeconds;
  const newMinutes = Math.floor(totalStudySeconds / 60);
  const totalCoins = state.totalCoins + Math.max(0, newMinutes - prevMinutes);
  return { ...state, totalStudySeconds, totalCoins };
}

function tick(state: StudyState, now: number): StudyState {
  const session = state.session;
  if (!session || !session.isRunning || session.completed) return state;

  const elapsed = session.accumulatedSeconds + (now - session.startedAt) / 1000;

  const target = phaseTargetSeconds(state, session);
  const studying = isStudyPhase(session);

  if (target !== null && elapsed >= target) {
    // フェーズ完了
    const creditableDelta = studying ? target - session.creditedSeconds : 0;
    let nextState = creditStudySeconds(state, creditableDelta);

    if (session.mode === "countdown") {
      nextState = {
        ...nextState,
        session: {
          ...session,
          accumulatedSeconds: target,
          creditedSeconds: target,
          isRunning: false,
          completed: true,
        },
      };
      return nextState;
    }

    // pomodoro: 自動でフェーズ切り替え
    const finishedFocus = session.pomodoroPhase === "focus";
    const nextCycle = finishedFocus ? session.pomodoroCycle + 1 : session.pomodoroCycle;
    const nextPhase = finishedFocus ? "break" : "focus";
    const overflow = elapsed - target;

    nextState = {
      ...nextState,
      session: {
        ...session,
        pomodoroPhase: nextPhase,
        pomodoroCycle: nextCycle,
        startedAt: now,
        accumulatedSeconds: Math.max(0, overflow),
        creditedSeconds: 0,
        isRunning: true,
        completed: false,
      },
    };
    return nextState;
  }

  if (!studying) {
    return state;
  }

  const delta = elapsed - session.creditedSeconds;
  if (delta <= 0) return state;

  const nextState = creditStudySeconds(state, delta);
  return {
    ...nextState,
    session: { ...session, creditedSeconds: elapsed },
  };
}

function reducer(state: StudyState, action: Action): StudyState {
  switch (action.type) {
    case "HYDRATE":
      return action.state;
    case "TICK":
      return tick(state, action.now);
    case "SET_MODE": {
      if (state.session?.mode === action.mode) return state;
      return { ...state, session: newSession(action.mode, state, Date.now()) };
    }
    case "START": {
      const base = state.session ?? newSession("stopwatch", state, action.now);
      if (base.completed) {
        return {
          ...state,
          session: newSession(base.mode, state, action.now),
        };
      }
      return {
        ...state,
        session: { ...base, isRunning: true, startedAt: action.now },
      };
    }
    case "PAUSE": {
      if (!state.session || !state.session.isRunning) return state;
      const elapsed = computeLiveElapsedSeconds(state.session);
      return {
        ...state,
        session: { ...state.session, isRunning: false, accumulatedSeconds: elapsed },
      };
    }
    case "RESET": {
      const mode = state.session?.mode ?? "stopwatch";
      return { ...state, session: newSession(mode, state, Date.now()) };
    }
    case "SET_GENRE":
      return { ...state, genre: action.genre };
    case "SET_HOURLY_RATE":
      return { ...state, hourlyRate: action.hourlyRate };
    case "SET_POMODORO_FOCUS_MINUTES":
      return { ...state, pomodoroFocusMinutes: action.minutes };
    case "SET_POMODORO_BREAK_MINUTES":
      return { ...state, pomodoroBreakMinutes: action.minutes };
    case "SET_POMODORO_LONG_BREAK_MINUTES":
      return { ...state, pomodoroLongBreakMinutes: action.minutes };
    case "SET_COUNTDOWN_MINUTES": {
      const next = { ...state, countdownMinutes: action.minutes };
      if (next.session && next.session.mode === "countdown" && !next.session.isRunning) {
        next.session = {
          ...next.session,
          countdownTargetSeconds: action.minutes * 60,
        };
      }
      return next;
    }
    default:
      return state;
  }
}

interface StudyStateContextValue {
  state: StudyState;
  mode: TimerMode;
  phaseElapsedSeconds: number;
  phaseTargetSeconds: number | null;
  phaseRemainingSeconds: number | null;
  isStudying: boolean;
  isRunning: boolean;
  isCompleted: boolean;
  setMode: (mode: TimerMode) => void;
  start: () => void;
  pause: () => void;
  reset: () => void;
  setGenre: (genre: GenreKey) => void;
  setHourlyRate: (rate: number) => void;
  setPomodoroFocusMinutes: (minutes: number) => void;
  setPomodoroBreakMinutes: (minutes: number) => void;
  setPomodoroLongBreakMinutes: (minutes: number) => void;
  setCountdownMinutes: (minutes: number) => void;
}

const StudyStateContext = createContext<StudyStateContextValue | null>(null);

export function StudyStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, () => createDefaultState());
  const hydratedRef = useRef(false);

  useEffect(() => {
    dispatch({ type: "HYDRATE", state: loadState() });
    hydratedRef.current = true;
  }, []);

  useEffect(() => {
    if (!hydratedRef.current) return;
    saveState(state);
  }, [state]);

  const running = Boolean(state.session?.isRunning);
  useTicker(running);

  useEffect(() => {
    if (!running) return;
    dispatch({ type: "TICK", now: Date.now() });
    const id = setInterval(() => dispatch({ type: "TICK", now: Date.now() }), 250);
    return () => clearInterval(id);
  }, [running]);

  const value = useMemo<StudyStateContextValue>(() => {
    const session = state.session;
    const mode = session?.mode ?? "stopwatch";
    const elapsed = session ? computeLiveElapsedSeconds(session) : 0;
    const target = session ? phaseTargetSeconds(state, session) : null;
    const remaining = target !== null ? Math.max(0, target - elapsed) : null;

    return {
      state,
      mode,
      phaseElapsedSeconds: elapsed,
      phaseTargetSeconds: target,
      phaseRemainingSeconds: remaining,
      isStudying: session ? isStudyPhase(session) : false,
      isRunning: Boolean(session?.isRunning),
      isCompleted: Boolean(session?.completed),
      setMode: (mode) => dispatch({ type: "SET_MODE", mode }),
      start: () => dispatch({ type: "START", now: Date.now() }),
      pause: () => dispatch({ type: "PAUSE", now: Date.now() }),
      reset: () => dispatch({ type: "RESET" }),
      setGenre: (genre) => dispatch({ type: "SET_GENRE", genre }),
      setHourlyRate: (hourlyRate) => dispatch({ type: "SET_HOURLY_RATE", hourlyRate }),
      setPomodoroFocusMinutes: (minutes) =>
        dispatch({ type: "SET_POMODORO_FOCUS_MINUTES", minutes }),
      setPomodoroBreakMinutes: (minutes) =>
        dispatch({ type: "SET_POMODORO_BREAK_MINUTES", minutes }),
      setPomodoroLongBreakMinutes: (minutes) =>
        dispatch({ type: "SET_POMODORO_LONG_BREAK_MINUTES", minutes }),
      setCountdownMinutes: (minutes) => dispatch({ type: "SET_COUNTDOWN_MINUTES", minutes }),
    };
  }, [state]);

  return <StudyStateContext.Provider value={value}>{children}</StudyStateContext.Provider>;
}

export function useStudyState(): StudyStateContextValue {
  const ctx = useContext(StudyStateContext);
  if (!ctx) throw new Error("useStudyState must be used within StudyStateProvider");
  return ctx;
}
