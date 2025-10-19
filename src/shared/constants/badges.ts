import React, { ReactNode } from "react";
import CodeIcon from "@/icons/badges/code.svg";
import MedalIcon from "@/icons/medal.svg";
import RobotIcon from "@/icons/badges/robot.svg";
import UserCogIcon from "@/icons/badges/userCog.svg";
import UserShieldIcon from "@/icons/badges/userShield.svg";
import UserSlashIcon from "@/icons/badges/userSlash.svg";
import YoutubeIcon from "@/icons/badges/youtube.svg";
import TrainingLogoIcon from "@/icons/badges/traininglogo.svg";

type BadgeTranslationKey =
  | "creator"
  | "admin"
  | "team"
  | "site"
  | "veteran"
  | "youtuber"
  | "exteam"
  | "bot"

type BadgeProps = {
  id: number;
  translationKey: BadgeTranslationKey;
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
    translationKey: "creator",
    category: "staff",
    icon: React.createElement(TrainingLogoIcon),
    accid: [1, 2],
    color: "#000000",
    textColor: "red",
  },
  {
    id: 2,
    translationKey: "admin",
    category: "staff",
    icon: React.createElement(UserCogIcon),
    minModer: 999,
    maxModer: 9999,
    color: "#B72A2A",
    textColor: "#B72A2A",
  },
  {
    id: 3,
    translationKey: "team",
    category: "staff",
    icon: React.createElement(UserShieldIcon),
    minModer: 1,
    maxModer: 9999,
    color: "rgb(96 158 213)",
    textColor: "rgb(96 158 213)"
  },
  {
    id: 4,
    translationKey: "site",
    category: "staff",
    icon: React.createElement(CodeIcon),
    accid: [113145, 125043, 271552],
    color: "rgb(42 170 104)",
    textColor: "rgb(42 170 104)"
  },
]
export const playerBadges: BadgeProps[] = [
  {
    id: 1,
    translationKey: "veteran",
    category: "player",
    icon: React.createElement(MedalIcon),
    color: "#00a5a2",
    minAccId: 0,
    maxAccId: 130000,
    textColor: "#00a5a2"
  },
  {
    id: 2,
    translationKey: "youtuber",
    category: "player",
    icon: React.createElement(YoutubeIcon),
    color: "#fe0032",
    verify: 1,
    textColor: "#fe0032"
  },
  {
    id: 5,
    translationKey: "exteam",
    category: "player",
    icon: React.createElement(UserSlashIcon),
    color: "#ababab",
    verify: 4,
    textColor: "#ababab"
  },
  {
    id: 6,
    translationKey: "bot",
    category: "player",
    icon: React.createElement(RobotIcon),
    color: "rgb(144, 203, 255)",
    accid: [605187, 659622, 659678, 37707],
    textColor: "rgb(144, 203, 255)"
  },
]
export const allBadges = [
  ...staffBadges, ...playerBadges,
];
export default BadgeProps;