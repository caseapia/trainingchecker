import React, { CSSProperties, FC } from "react";
import HomeIcon from "@/icons/components/header/home.svg";
import ListIcon from "@/icons/components/header/list.svg";
import UserIcon from "@/icons/user.svg";
import MedalIcon from "@/icons/medal.svg";
import CopchaseIcon from "@/icons/components/header/copchase.svg";
import AdminIcon from "@/icons/components/header/admin.svg";

type HeaderProps = {
  icon: FC<React.SVGProps<SVGElement>>;
  text: string;
  className?: string;
  link: string;
  id: string;
  style?: CSSProperties;
  isNew: boolean;
  tooltipText?: string;
  isDisabled: boolean;
  isMobileAvailable: boolean;
};


export const Elements: HeaderProps[] = [
  {
    text: "Главная",
    id: "main",
    icon: HomeIcon,
    link: "../",
    isNew: false,
    isDisabled: false,
    isMobileAvailable: true,
  },
  {
    text: "Игроки в сети",
    id: "players",
    icon: UserIcon,
    link: "/players",
    isNew: false,
    isDisabled: false,
    isMobileAvailable: true,
  },
  {
    text: "Список значков",
    id: "badges",
    icon: MedalIcon,
    link: "/badges",
    isNew: false,
    isDisabled: false,
    isMobileAvailable: true,
  },
  {
    text: "Список миров",
    id: "worldlist",
    icon: ListIcon,
    link: "/worldlist",
    isNew: false,
    isDisabled: false,
    isMobileAvailable: true,
  },
  {
    text: "Мониторинг копчейза",
    id: "copchase",
    icon: CopchaseIcon,
    link: "/copchase",
    isNew: false,
    isDisabled: true,
    tooltipText: "Эта вкладка временно недоступна",
    isMobileAvailable: true,
  },
  {
    text: "Администраторы",
    id: "admins",
    icon: AdminIcon,
    link: "/admins",
    isNew: false,
    isDisabled: false,
    isMobileAvailable: true
  }
];