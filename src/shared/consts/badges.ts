import React, { ReactNode } from "react";
import { FaRobot, FaUserCog, FaUserSlash } from "react-icons/fa";
import { FaCode, FaCrown, FaMedal, FaUserShield, FaYoutube } from "react-icons/fa6";

type BadgeProps = {
  id: number;
  title: string;
  description?: string;
  moder?: number;
  accid?: number | number[];
  verify?: number;
  minModer?: number;
  maxModer?: number;
  minAccId?: number;
  maxAccId?: number;
  minRegDate?: string;
  maxRegDate?: string;
  nicknameIncludes?: string | string[];
  color: string;
  icon: ReactNode;
  textColor: string;
  category: string;
};

export const staffBadges: BadgeProps[] = [
  {
    id: 1,
    title: "Создатель TRAINING SANDBOX",
    category: "staff",
    description: "Когда-то этот игрок создал LSGOV TRAINING — ныне TRAINING SANDBOX",
    icon: React.createElement(FaCrown),
    accid: [1, 2],
    color: "#000000",
    textColor: "red",
  },
  {
    id: 2,
    title: "Разработчик TRAINING SANDBOX",
    category: "staff",
    description: "Этот игрок учавствует в разработке TRAINING SANDBOX",
    icon: React.createElement(FaUserCog),
    verify: 3,
    color: "#B72A2A",
    textColor: "#B72A2A"
  },
  {
    id: 3,
    title: "Администратор TRAINING SANDBOX",
    category: "staff",
    description: "Этот игрок является администратором TRAINING SANDBOX",
    icon: React.createElement(FaUserShield),
    minModer: 999,
    maxModer: 9999,
    color: "#B72A2A",
    textColor: "#B72A2A",
  },
  {
    id: 4,
    title: "Команда TRAINING SANDBOX",
    category: "staff",
    description: "Этот игрок является подтвержденным членом команды TRAINING SANDBOX",
    icon: React.createElement(FaUserShield),
    minModer: 1,
    maxModer: 9999,
    color: "#0f4c816c",
    textColor: "rgb(96 158 213)"
  },
  {
    id: 5,
    title: "Команда сайта",
    category: "staff",
    description: "Этот игрок является разработчиком или помогал в разработке сайта TRAINING CHECKER",
    icon: React.createElement(FaCode),
    accid: [113145, 125043, 271552],
    color: "rgb(42 170 104 / 42%)",
    textColor: "rgb(42 170 104)"
  },
]
export const playerBadges: BadgeProps[] = [
  {
    id: 1,
    title: "Ветеран",
    category: "player",
    description: `Этот значок вручается игрокам, зарегистрировавшим свой аккаунт в числе первых 130000`,
    icon: React.createElement(FaMedal),
    color: "#00a5a26c",
    minAccId: 0,
    maxAccId: 130000,
    textColor: "#00a5a2"
  },
  {
    id: 2,
    title: "Ютубер",
    category: "player",
    description: "Значок был вручен игроку за поддержку сообщества в части рекламы посредством создания контента",
    icon: React.createElement(FaYoutube),
    color: "#fe0032",
    verify: 1,
    textColor: "#fe0032"
  },
  {
    id: 5,
    title: "Бывший член команды TRAINING SANDBOX",
    category: "player",
    description: "Значок был вручен игроку за поддержку сервера в качестве члена команды проекта",
    icon: React.createElement(FaUserSlash),
    color: "#ababab",
    verify: 4,
    textColor: "#ababab"
  },
  {
    id: 6,
    title: "Бот",
    category: "player",
    description: "Этот аккаунт управляется не человеком, а ботом и является официальным пользовательским ботом TRAINING SANDBOX",
    icon: React.createElement(FaRobot),
    color: "rgb(144, 203, 255)",
    accid: [605187, 659622, 659678],
    textColor: "rgb(144, 203, 255)"
  },
  {
    id: 7,
    title: "Легион Хроноса",
    category: "player",
    description: "Легион Хроноса — это объединение, воплощающее власть, контроль и абсолютный порядок. Управляемый системой Хронос, легион стремится к доминированию над временем и пространством, обеспечивая строгую дисциплину и непреклонную власть.",
    icon: React.createElement(FaRobot),
    color: "#b22424",
    nicknameIncludes: "czo.ooo",
    textColor: "#b22424"
  },
]
export const allBadges = [
  ...staffBadges, ...playerBadges,
]