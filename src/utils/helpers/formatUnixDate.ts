"use client";
export default function formatUnixDate(unixTimestamp: number): string {
  if (!unixTimestamp) {
    return "Сейчас";
  }

  const date = new Date(unixTimestamp * 1000);
  const now = new Date();

  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };

  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterdayStart = new Date(todayStart);
  yesterdayStart.setDate(todayStart.getDate() - 1);

  if (date >= todayStart) {
    return `сегодня в ${date.toLocaleTimeString("ru-RU", options)}`;
  } else if (date >= yesterdayStart) {
    return `вчера в ${date.toLocaleTimeString("ru-RU", options)}`;
  } else {
    const dateOptions: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      ...options,
    };
    return date.toLocaleString("ru-RU", dateOptions).replace(",", " в");
  }
}