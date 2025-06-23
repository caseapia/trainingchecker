import i18n from "i18next";

export function getDaySuffix(days: number) {
  const lastDigit = days % 10;
  const lastTwoDigits = days % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return i18n.t("days", { ns: "suffixes" });
  if (lastDigit === 1) return i18n.t("day", { ns: "suffixes" });
  if (lastDigit >= 2 && lastDigit <= 4) return i18n.t("days1", { ns: "suffixes" });
  return i18n.t("days", { ns: "suffixes" });
}

export function getMinuteSuffix(minutes: number) {
  const lastDigit = minutes % 10;
  const lastTwoDigits = minutes % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return i18n.t("minutes", { ns: "suffixes" });
  if (lastDigit === 1) return i18n.t("minute", { ns: "suffixes" });
  if (lastDigit >= 2 && lastDigit <= 4) return i18n.t("minute1", { ns: "suffixes" });

  return i18n.t("minutes", { ns: "suffixes" });
}
