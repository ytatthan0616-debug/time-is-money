export const STORAGE_KEY = "time-is-money:v1";

/** 学習が何秒進むごとにコインが1枚落ちるか */
export const COIN_INTERVAL_SECONDS = 60;

/** 学習1時間あたりの、将来の年収アップ額の目安（円）。設定パネルで調整可能。 */
export const DEFAULT_HOURLY_RATE = 3000;

export const DEFAULT_POMODORO_FOCUS_MINUTES = 25;
export const DEFAULT_POMODORO_BREAK_MINUTES = 5;
export const DEFAULT_POMODORO_LONG_BREAK_MINUTES = 15;
export const POMODORO_CYCLES_BEFORE_LONG_BREAK = 4;

export const DEFAULT_COUNTDOWN_MINUTES = 25;

/** グラフのマイルストーン（累計学習時間, 時間） */
export const WAGE_CHART_MILESTONE_HOURS = [0, 10, 50, 100, 300, 500, 1000];
