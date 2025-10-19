import React, { CSSProperties, FC } from "react";
import HomeIcon from "@/icons/components/header/home.svg";
import ListIcon from "@/icons/components/header/list.svg";
import UserIcon from "@/icons/user.svg";
import MedalIcon from "@/icons/medal.svg";
import CopchaseIcon from "@/icons/components/header/copchase.svg";
import AdminIcon from "@/icons/components/header/admin.svg";

type TranslationKeys =
  | "home"
  | "players"
  | "badges"
  | "worldlist"
  | "copchase"
  | "admins";

type HeaderProps = {
  icon: FC<React.SVGProps<SVGElement>>;
  textKey: TranslationKeys;
  className?: string;
  link: string;
  id: string;
  style?: CSSProperties;
  isNew: boolean;
  isDisabled: boolean;
  isMobileAvailable: boolean;
};

type HeaderElement = Omit<HeaderProps, "text"> & { textKey: TranslationKeys };

export const Elements: HeaderElement[] = [
  {
    textKey: "home",
    id: "main",
    icon: HomeIcon,
    link: "../",
    isNew: false,
    isDisabled: false,
    isMobileAvailable: true,
  },
  {
    textKey: "players",
    id: "players",
    icon: UserIcon,
    link: "/players",
    isNew: false,
    isDisabled: false,
    isMobileAvailable: true,
  },
  {
    textKey: "badges",
    id: "badges",
    icon: MedalIcon,
    link: "/badges",
    isNew: false,
    isDisabled: false,
    isMobileAvailable: true,
  },
  {
    textKey: "worldlist",
    id: "worldlist",
    icon: ListIcon,
    link: "/worldlist",
    isNew: false,
    isDisabled: true,
    isMobileAvailable: false,
  },
  {
    textKey: "copchase",
    id: "copchase",
    icon: CopchaseIcon,
    link: "/copchase",
    isNew: false,
    isDisabled: true,
    isMobileAvailable: false,
  },
  {
    textKey: "admins",
    id: "admins",
    icon: AdminIcon,
    link: "/admins",
    isNew: false,
    isDisabled: false,
    isMobileAvailable: true
  }
];