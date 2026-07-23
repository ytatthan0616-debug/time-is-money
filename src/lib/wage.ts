import { WAGE_CHART_MILESTONE_HOURS } from "./constants";
import { getGenre } from "./genres";
import type { GenreKey } from "@/types";

/**
 * シンプルな換算式:
 * 推定年収アップ額(円) = 累計学習時間(時間) × 時給換算レート(円/時間) × ジャンル係数
 *
 * あくまで学習継続のモチベーションのためのシミュレーションであり、
 * 実際の年収を保証するものではない。
 */
export function estimateWageIncrease(
  totalStudySeconds: number,
  hourlyRate: number,
  genre: GenreKey,
): number {
  const hours = totalStudySeconds / 3600;
  const coefficient = getGenre(genre).coefficient;
  return hours * hourlyRate * coefficient;
}

export interface WageChartPoint {
  hours: number;
  amount: number;
  isCurrent?: boolean;
}

export function buildWageChartData(
  totalStudySeconds: number,
  hourlyRate: number,
  genre: GenreKey,
): WageChartPoint[] {
  const currentHours = totalStudySeconds / 3600;
  const currentHoursRounded = Math.round(currentHours * 10) / 10;
  const coefficient = getGenre(genre).coefficient;

  const roundedMilestones = WAGE_CHART_MILESTONE_HOURS.map((h) => Math.round(h * 10) / 10);
  if (currentHoursRounded > 0 && !roundedMilestones.includes(currentHoursRounded)) {
    roundedMilestones.push(currentHoursRounded);
  }
  roundedMilestones.sort((a, b) => a - b);

  return roundedMilestones.map((hours) => ({
    hours,
    amount: Math.round(hours * hourlyRate * coefficient),
    isCurrent: hours === currentHoursRounded,
  }));
}
