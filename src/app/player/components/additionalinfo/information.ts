import { ReactNode } from "react";
import UserData from "@/shared/models/Player";
import { TFunction } from "i18next";

type TranslationKeys =
  | "achievement"
  | "bonus_points"
  | "copchase_rate"
  | "prefix"
  | "social_credits"
  | "premium"
  | "premium_expires"
  | "signs";

interface InformationInterface {
  labelKey: TranslationKeys;
  key: ReactNode;
  condition?: boolean;
}

type InformationElement = Omit<InformationInterface, "label"> & { labelKey: TranslationKeys }

export const information = (info: UserData | null, t: TFunction<"common">): InformationElement[] => {
  if (!info) return [];

  return [
    {
      labelKey: "bonus_points" as const,
      key: info.bonuspoints,
    },
    {
      labelKey: "copchase_rate" as const,
      key: info.chase_rating,
    },
    {
      labelKey: "premium" as const,
      key: info.premium ? t("yes") : t("no"),
    },
    {
      labelKey: "premium_expires" as const,
      key: info.premium_expdate,
      condition: info.premium !== 0,
    },
  ].filter(item => item.condition ?? true);
};