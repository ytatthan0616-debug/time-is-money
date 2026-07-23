export function formatClock(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const seconds = safe % 60;

  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");

  if (hours > 0) {
    return `${hours}:${mm}:${ss}`;
  }
  return `${mm}:${ss}`;
}

export function formatHours(totalSeconds: number): string {
  const hours = totalSeconds / 3600;
  return hours.toLocaleString("ja-JP", {
    maximumFractionDigits: hours < 10 ? 1 : 0,
  });
}

export function formatYen(amount: number): string {
  return Math.round(amount).toLocaleString("ja-JP");
}
