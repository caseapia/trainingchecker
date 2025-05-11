import React, { ReactNode } from "react";
import CodeIcon from "@/icons/badges/code.svg";
import MedalIcon from "@/icons/medal.svg";
import RobotIcon from "@/icons/badges/robot.svg";
import SatelLiteIcon from "@/icons/badges/satelLite.svg";
import UserCogIcon from "@/icons/badges/userCog.svg";
import UserShieldIcon from "@/icons/badges/userShield.svg";
import UserSlashIcon from "@/icons/badges/userSlash.svg";
import YoutubeIcon from "@/icons/badges/youtube.svg";
import PullRequestIcon from "@/icons/badges/pullRequest.svg"
import TrainingLogoIcon from "@/icons/badges/traininglogo.svg";

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
    icon: React.createElement(TrainingLogoIcon),
    accid: [1, 2],
    color: "#000000",
    textColor: "red",
  },
  {
    id: 2,
    title: "Администратор TRAINING SANDBOX",
    category: "staff",
    description: "Этот игрок является администратором TRAINING SANDBOX",
    icon: React.createElement(UserCogIcon),
    minModer: 999,
    maxModer: 9999,
    color: "#B72A2A",
    textColor: "#B72A2A",
  },
  {
    id: 3,
    title: "Команда TRAINING SANDBOX",
    category: "staff",
    description: "Этот игрок является подтвержденным членом команды TRAINING SANDBOX",
    icon: React.createElement(UserShieldIcon),
    minModer: 1,
    maxModer: 9999,
    color: "rgb(96 158 213)",
    textColor: "rgb(96 158 213)"
  },
  {
    id: 4,
    title: "Команда сайта",
    category: "staff",
    description: "Этот игрок является разработчиком или помогал в разработке сайта TRAINING CHECKER",
    icon: React.createElement(CodeIcon),
    accid: [113145, 125043, 271552],
    color: "rgb(42 170 104)",
    textColor: "rgb(42 170 104)"
  },
]
export const playerBadges: BadgeProps[] = [
  {
    id: 1,
    title: "Ветеран",
    category: "player",
    description: `Этот значок вручается игрокам, зарегистрировавшим свой аккаунт в числе первых 130000`,
    icon: React.createElement(MedalIcon),
    color: "#00a5a2",
    minAccId: 0,
    maxAccId: 130000,
    textColor: "#00a5a2"
  },
  {
    id: 2,
    title: "Ютубер",
    category: "player",
    description: "Значок был вручен игроку за поддержку сообщества в части рекламы посредством создания контента",
    icon: React.createElement(YoutubeIcon),
    color: "#fe0032",
    verify: 1,
    textColor: "#fe0032"
  },
  {
    id: 5,
    title: "Бывший член команды TRAINING SANDBOX",
    category: "player",
    description: "Значок был вручен игроку за поддержку сервера в качестве члена команды проекта",
    icon: React.createElement(UserSlashIcon),
    color: "#ababab",
    verify: 4,
    textColor: "#ababab"
  },
  {
    id: 6,
    title: "Бот",
    category: "player",
    description: "Этот аккаунт управляется не человеком, а ботом и является официальным пользовательским ботом TRAINING SANDBOX",
    icon: React.createElement(RobotIcon),
    color: "rgb(144, 203, 255)",
    accid: [605187, 659622, 659678, 37707],
    textColor: "rgb(144, 203, 255)"
  },
  {
    id: 7,
    title: "Легион Хроноса",
    category: "player",
    description: "Объединение, воплощающее власть, контроль и абсолютный порядок. Управляемый системой Хронос, легион стремится к доминированию над временем и пространством, обеспечивая строгую дисциплину и непреклонную власть.",
    icon: React.createElement(SatelLiteIcon),
    color: "#b22424",
    nicknameIncludes: "czo.ooo",
    textColor: "#b22424"
  },
]
export const allBadges = [
  ...staffBadges, ...playerBadges,
];
export default BadgeProps;