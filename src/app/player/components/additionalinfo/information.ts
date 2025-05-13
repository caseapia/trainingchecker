import { ReactNode } from "react";
import { AdditionalUserData } from "@/models/Player";
import textFormatter from "@/utils/helpers/textFormatter";

interface InformationInterface {
  label: string;
  key: ReactNode;
}

export const information = (info: AdditionalUserData | null): InformationInterface[] => [
  {
    label: "Прикрепленное достижение",
    key: textFormatter(String(info?.achievement)),
  },
  {
    label: "Бонусные поинты",
    key: info?.bonus_points,
  },
  {
    label: "Рейтинг Copchase",
    key: info?.cop_chase_rating,
  },
  {
    label: "Префикс",
    key: textFormatter(String(info?.prefix)),
  },
  {
    label: "Социальный кредит",
    key: info?.social_credits,
  },
  // {
  //   label: "Подписи",
  //   key: textFormatter(String(info?.descriptions)),
  // },
];
