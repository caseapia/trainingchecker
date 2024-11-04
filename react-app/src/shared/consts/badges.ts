import React, { ReactNode } from "react";
import { FaUserCog } from "react-icons/fa";
import { FaCode, FaMedal, FaUserShield } from "react-icons/fa6";

type BadgeProps = {
  id: number;
  title: string;
  description?: string;
  moder?: number;
  accid?: number;
  verify?: number;
  minModer?: number;
  maxModer?: number;
  minAccId?: number;
  maxAccId?: number;
  minRegDate?: string;
  maxRegDate?: string;
  color: string;
  icon: ReactNode;
};

export const staffBadges: BadgeProps[] = [
  {
    id: 1,
    title: "Разработчик TRAINING SANDBOX",
    description: "Этот человек учавствует в разработке TRAINING SERVER",
    icon: React.createElement(FaUserCog),
    moder: 999,
    color: "#B72A2A",
  },
  {
    id: 2,
    title: "Команда TRAINING SANDBOX",
    description: "Этот человек является подтвержденным членом команды TRAINING SERVER",
    icon: React.createElement(FaUserShield),
    minModer: 1,
    maxModer: 9999,
    color: "#0f4c816c",
  },
  {
    id: 3,
    title: "Команда сайта",
    description: "Этот человек является или являлся разработчиком сайта TRAINING CHECKER",
    icon: React.createElement(FaCode),
    accid: 113145,
    color: "rgb(42 170 104 / 42%)",
  },
]
export const playerBadges: BadgeProps[] = [
  {
    id: 1,
    title: "Ветеран",
    icon: React.createElement(FaMedal),
    color: "#00a5a26c",
    minAccId: 0,
    maxAccId: 150000,
  }
]
export const allBadges = [
  ...staffBadges, ...playerBadges,
]