import { ReactNode } from "react";
import { AdditionalUserData } from "@/models/Player";
import textFormatter from "@/utils/helpers/textFormatter";

type TranslationKeys =
  | "achievement"
  | "bonus_points"
  | "copchase_rate"
  | "prefix"
  | "social_credits"
  | "signs";

interface InformationInterface {
  labelKey: TranslationKeys;
  key: ReactNode;
}

type InformationElement = Omit<InformationInterface, "label"> & { labelKey: TranslationKeys }

export const information = (info: AdditionalUserData | null): InformationElement[] => [
  {
    labelKey: "achievement",
    key: textFormatter(String(info?.achievement)),
  },
  {
    labelKey: "bonus_points",
    key: info?.bonus_points,
  },
  {
    labelKey: "copchase_rate",
    key: info?.cop_chase_rating,
  },
  {
    labelKey: "prefix",
    key: textFormatter(String(info?.prefix)),
  },
  {
    labelKey: "social_credits",
    key: info?.social_credits,
  },
  // {
  //   label: "signs",
  //   key: textFormatter(String(info?.descriptions)),
  // },
];
