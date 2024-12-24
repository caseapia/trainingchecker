import React from "react";
import HomeIcon from '@/icons/components/header/home.svg';
import ListIcon from '@/icons/components/header/list.svg';
import UserIcon from '@/icons/user.svg';
import MedalIcon from '@/icons/medal.svg';
import CopyIcon from '@/icons/copy.svg';

type HeaderProps = {
  icon: React.ReactNode;
  text: string;
  className?: string;
  link: string;
  id: string;
  style?: React.CSSProperties;
  isNew: boolean;
  tooltipText?: string;
  isDisabled: boolean;
  isMobileAvailable: boolean;
};


export const Elements: HeaderProps[] = [
  {
    text: "Главная",
    id: "main",
    icon: React.createElement(HomeIcon),
    link: "../",
    isNew: false,
    isDisabled: false,
    isMobileAvailable: true,
  },
  {
    text: "Игроки в сети",
    id: "players",
    icon: React.createElement(UserIcon),
    link: "/players",
    isNew: false,
    isDisabled: false,
    isMobileAvailable: true,
  },
  {
    text: "Список значков",
    id: "badges",
    icon: React.createElement(MedalIcon),
    link: "/badges",
    isNew: false,
    isDisabled: false,
    isMobileAvailable: true,
  },
  {
    text: "Список миров",
    id: "worldlist",
    icon: React.createElement(ListIcon),
    link: "/worldlist",
    isNew: false,
    isDisabled: false,
    tooltipText: "Эта вкладка временно недоступна и отключена на серверной части. Мы оповестим вас, когда все ошибки будут исправлены.",
    isMobileAvailable: true,
  },
  {
    text: "Список изменений",
    id: "changelog",
    icon: React.createElement(CopyIcon),
    link: "/changelog",
    isNew: false,
    isDisabled: false,
    isMobileAvailable: true,
  },
];
