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
  textColor: string;
};

export const staffBadges: BadgeProps[] = [
  {
    id: 1,
    title: "Разработчик TRAINING SANDBOX",
    description: "Этот игрок учавствует в разработке TRAINING SERVER",
    icon: React.createElement(FaUserCog),
    accid: 1 || 2 || 99 || 104599,
    color: "#B72A2A",
    textColor: "#B72A2A"
  },
  {
    id: 2,
    title: "Команда TRAINING SANDBOX",
    description: "Этот игрок является подтвержденным членом команды TRAINING SERVER",
    icon: React.createElement(FaUserShield),
    minModer: 1,
    maxModer: 9999,
    color: "#0f4c816c",
    textColor: "rgb(96 158 213)"
  },
  {
    id: 3,
    title: "Команда сайта",
    description: "Этот игрок является или являлся разработчиком сайта TRAINING CHECKER",
    icon: React.createElement(FaCode),
    accid: 113145,
    color: "rgb(42 170 104 / 42%)",
    textColor: "rgb(42 170 104)"
  },
  {
    id: 4,
    title: "Администратор TRAINING SANDBOX",
    description: "Этот игрок является администратором TRAINING SANDBOX",
    icon: React.createElement(FaUserShield),
    minModer: 999,
    maxModer: 9999,
    color: "#B72A2A",
    textColor: "#B72A2A",
  }
]
export const playerBadges: BadgeProps[] = [
  {
    id: 1,
    title: "Ветеран",
    description: "Этот значок вручается игрокам, зарегистрировавшим свой аккаунт в числе первых 150000",
    icon: React.createElement(FaMedal),
    color: "#00a5a26c",
    minAccId: 0,
    maxAccId: 150000,
    textColor: "#00a5a2"
  }
]
export const allBadges = [
  ...staffBadges, ...playerBadges,
]