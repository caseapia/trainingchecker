export function getDaySuffix(days: number) {
  const lastDigit = days % 10;
  const lastTwoDigits = days % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return "дней";
  if (lastDigit === 1) return "день";
  if (lastDigit >= 2 && lastDigit <= 4) return "дня";
  return "дней";
}

export function getMinuteSuffix(minutes: number) {
  const lastDigit = minutes % 10;
  const lastTwoDigits = minutes % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return "минут";
  if (lastDigit === 1) return "минута";
  if (lastDigit >= 2 && lastDigit <= 4) return "минуты";

  return "минут";
}