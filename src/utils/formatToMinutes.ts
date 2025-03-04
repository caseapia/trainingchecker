export function formatToMinutes(seconds: number): number {
  const time = seconds / 60;

  return Math.round(time)
}